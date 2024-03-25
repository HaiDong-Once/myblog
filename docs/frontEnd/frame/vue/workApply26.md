
# vue 曝光埋点上报解决方案
[[toc]]


## 曝光埋点概念
曝光埋点：统计具体区域是否被用户浏览到，如活动的引流入口的显示、投放广告的显示等。比如需要计算推荐区域的点击率（点击次数/曝光次数）。


## 有效曝光概念
为了数据准确性，我们必须确保用户真正的看到了这些区域，比如保证区域全部展示，避免重复曝光上报，兼容大于屏幕可是高度的元素等。
所以我们需要制定一套逻辑来规定何时进行曝光埋点的数据上报。比如：
1. 曝光元素必须完全出现在浏览器可视区域内。
2. 元素必须在可视区域内停留1s以上。
3. 用户进入页面到离开页面同一元素不重复上报。
4. 对于元素大于屏幕可视高度的元素兼容处理，让超过视口的元素
<br><br>满足以上规定的曝光就是一次**有效曝光**


## 判断元素出现在页面的可视化区域内
### getBoundingClientRect
类似于图片懒加载的形式，通过监听 scroll 事件，通过`Element.getBoundingClientRect() `
方法以获取相关元素的边界信息，然后判断元素是否出现在页面的可视化区域内。由于 scroll 事件频发触发，计算量很大，
所以很容易造成性能问题，虽然我们可以采用防抖节流等方式去解决。此外，如果我原地变更，而不滚动，

**大致思路**：
1. 依赖收集：通过 DOM 特征挂载，使用 `MutationObservable` 去使用一个 `set` 进行管理
2. 滚动监听：监听滚动事件
3. 计算位置：`getBoundingClientRect()` 计算每个埋点的 `DOM` 元素与视口的相对位置，如果在视口范围内，则上报
4. 清除数据：已上报的点位在 `set` 中删除，下次曝光不再上报

###  IntersectionObserver API
异步检测目标元素与祖先元素或 viewport（可视窗口）相交情况变化的方法
#### 基本用法：
```js
let options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 1.0
}
let callback =(entries, observer) => {
  entries.forEach(entry => {});
};
let observer = new IntersectionObserver(callback, options);
```

#### 介绍:
`IntersectionObserver` 是浏览器原生提供的构造函数，接受两个参数：`callback` 是可见性变化时的回调函数，`option` 是配置对象（该参数可选），
返回一个 `observer` 实例。我们可以看到，创建一个 `IntersectionObserver` 对象，接受两个参数：`callback` 可见性变化时的回调函数，
该回调函数将会在目标`（target）`元素和根`（root）`元素的交集大小超过阈值`（threshold）`规定的大小时候被执行。<br><br>

**options 是配置对象，它有以下字段：**
- root：指定根 (root) 元素，用于检查目标的可见性。必须是目标元素的父级元素。如果未指定或者为 null，则默认为浏览器视窗。
- rootMargin：根 (root) 元素的外边距。类似于 CSS 中的 margin 属性。默认值为 0。
- threshold：target 元素和 root 元素相交程度达到该值的时候 callback 函数将会被执行，可以是单一的Number 也可以是 Number 数组，
当为数组时每达到该值都会执行 callback 函数。

**我们通过实例的方法可以指定观察哪个 DOM 节点。实例的方法有：**
- IntersectionObserver.observe()：使 IntersectionObserver 开始监听一个目标元素。
- IntersectionObserver.disconnect()：使 IntersectionObserver 对象停止监听工作。
- IntersectionObserver.takeRecords()：返回所有观察目标的 IntersectionObserverEntry 对象数组。
- IntersectionObserver.unobserve()：使 IntersectionObserver 停止监听特定目标元素。

#### 兼容问题：
对于ie浏览器的兼容问题，已经有了兼容的 polyfill
当前浏览器不支持 Intersection Observer API 时，使用 Element.getBoundingClientRect() 去实现 Intersection Observer API。
<br>地址：[https://github.com/w3c/IntersectionObserver/tree/master/polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)


## vue中使用指令实现曝光埋点
- 支持弹窗曝光
- 支持ie兼容问题
- 支持曝光延迟 1s

### 代码思路
#### 先定义一个 exposure 指令，当指令第一次绑定在元素上使用IntersectionObserver 监听目标元素，当指令从元素解绑就停止监听目标元素
```js
const options = {
    root: null, //默认浏览器视窗
    threshold: 1 //元素完全出现在浏览器视窗内才执行callback函数。
}
const callback =(entries, observer) => {
  entries.forEach(entry => {});
};
const observer = new IntersectionObserver(callback, options);
const addListenner = (ele, binding) => {
 observer.observe(ele);
};
const removeListener = (ele) => {
  observer.unobserve(ele);
};
//自定义曝光指令
Vue.directive('exposure', {
  bind: addListenner,
  unbind: removeListener,
});
```

#### 记录已经上报的埋点，防止重复曝光
```js
let exposureList = []; //记录已经上报过的埋点信息
const addListenner = (ele, binding) => {
 if(exposureList.indexOf(binding.value) !== -1) return;
 
 observer.observe(ele);
};
```

#### 将上报信息绑定在目标元素的'exposure-data' 属性中，当目标元素出现在视窗内时，并停留1s以上，上报埋点信息
```js
let timer = {}; //增加定时器对象
const callback = entries => {
  entries.forEach(entry => {
    let exposureData = null;
    try {
        exposureData = JSON.parse(entry.target.getAttribute('exposure-data'));
    } catch (e) {
        exposureData = null;
      console.error('埋点数据格式异常', e);
    }
    //没有埋点数据取消上报
    if (!exposureData) {
      observer.unobserve(entry.target);
      return;
    }
    
    if (entry.isIntersecting) {
      timer[exposureData.id] = setTimeout(function() {
        //上报埋点信息
        sendUtm(exposureData).then(res => {
          if (res.success) {
            //上报成功后取消监听
            observer.unobserve(entry.target);
            exposureList.push(exposureData.id);
            timer[visuallyData.id] = null;
          }
        });
      }, 1000);
  } else {
    if (timer[exposureData.id]) {
      clearTimeout(timer[exposureData.id]);
      timer[exposureData.id] = null;
    }
  }
  });
};
```

#### 引入 polyfill 实现 IE 的兼容
polyfill 地址：https://github.com/GoogleChromeLabs/intersection-observer
```shell
npm install intersection-observer
```
```js
require('intersection-observer');

export default Vue => {
 ...
  //自定义曝光指令
  Vue.directive('exposure', {
    bind: addListenner,
    unbind: removeListener,
  });
};
```

#### 通过 Vue.use() 引入组件后，就可以在业务代码中直接通过指令实现曝光埋点。曝光数据 visuallyData 中必须要有一个唯一 ID。
```html
<div v-exposure="exposureData.id" :exposure-data="JSON.stringify(visuallyData)" class="browse"></div>
```

#### 元素本身大于视口
- 思路一：判断元素高度大于屏幕高度，立即上报   待定
- 思路二：创建两个监听器，设置不同的threshold值来触发监听器
- 思路三：高度大于屏幕使用交叉算法单独验证

```js
entry.boundingClientRect.height >= entry.rootBounds.height 
entry.boundingClientRect.width >= entry.rootBounds.width

var remain = Math.min(windowHeight,domBottomY) - Math.max(domTop,0);
if(remain >0 && ( remain / domHeight > 0.6 || remain /windowHeight >0.6 )) {
    
}
```

#### 元素 fixed 时无法触发曝光埋点，比如fixed弹窗: 
**已支持**


###  最终代码
- 优化直接只用指令传参，无需单独设置参数
- 注册方法，在main.js中全局注册指令，或者按需注入指令
```js
let timer = {}; // 增加定时器对象
let exposureList = []; // 记录已经上报过的埋点信息


/**
 * 构造IntersectionObserver观察器
 * @type {IntersectionObserver}
 * @description <h3 v-exposure="{position:2222}">4.测试</h3>
 * @说明：position：曝光点说明（必传），...param 其他参数扩展
 */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        let exposureData = null;
        try {
            exposureData = JSON.parse(
                entry.target.getAttribute('exposure-data')
            );
        } catch (e) {
            exposureData = null;
            console.error('埋点数据格式异常', e);
        }
        //没有埋点数据取消上报
        if (!exposureData || !exposureData.position) {
            console.error('埋点数据格式异常');
            observer.unobserve(entry.target);
            return;
        }

        // 曝光时间超过1秒为有效曝光
        if (entry.isIntersecting) {
            timer[exposureData.position] = setTimeout(function() {
                //上报埋点信息
                console.warn(exposureData)
                sendPosition(exposureData)

                // 上报后取消监听
                observer.unobserve(entry.target);
                exposureList.push(exposureData.position);
                timer[exposureData.position] = null;
            }, 1000);
        } else {
            if (timer[exposureData.position]) {
                clearTimeout(timer[exposureData.position]);
                timer[exposureData.position] = null;
            }
        }
    });
}, {
    root: null, //默认浏览器视窗
    threshold: 1 //元素完全出现在浏览器视窗内才执行callback函数。
});


/**
 * 上报曝光埋点数据
 * @param exposureData
 */
const sendPosition = (exposureData) => {
    const {position} = exposureData ?? {}
    console.log(position)
}


/**
 * 曝光埋点指令
 * @type {{bind: exposure.bind, unbind: exposure.unbind}}
 */
const exposure = {
    bind: (ele, binding) => {
        // 参数添加到dom属性中
        if(binding.value){
            const exposureData = binding.value;
            ele.setAttribute(
                'exposure-data',
                JSON.stringify(exposureData)
            );
            const {position} = exposureData ?? {}
            if (exposureList.includes(position)) return;
        }

        // dom IntersectionObserver 监听
        observer.observe(ele);
    },

    unbind: (ele) => {
        // 移除监听
        observer.unobserve(ele);
    }
};


export default exposure;
```

改造class类
```js
// ie兼容  Intersection Observer polyfill
// require('intersection-observer');

/**
 * 曝光埋点class类
 */
class Exposure {
    constructor() {
        this.timer = {}; // 增加定时器对象
        this.exposureList = []; // 记录已经上报过的埋点信息

        // 构造IntersectionObserver观察器
        this.observer = new IntersectionObserver(this.handleIntersection, {
            root: null, // 默认浏览器视窗
            threshold: 1 // 元素完全出现在浏览器视窗内才执行callback函数。
        });
    }

    /**
     * IntersectionObserver callback
     * @param entries
     */
    handleIntersection = (entries) => {
        entries.forEach(entry => {
            let exposureData = null;
            try {
                exposureData = JSON.parse(
                    entry.target.getAttribute('exposure-data')
                );
            } catch (e) {
                exposureData = null;
                console.error('埋点数据格式异常', e);
            }
            // 没有埋点数据取消上报
            if (!exposureData || !exposureData.position) {
                console.error('埋点数据格式异常');
                this.observer.unobserve(entry.target);
                return;
            }

            // 曝光时间超过1秒为有效曝光
            if (entry.isIntersecting) {
                this.timer[exposureData.position] = setTimeout(() => {
                    // 上报埋点信息
                    this.sendPosition(exposureData);

                    // 上报后取消监听
                    this.observer.unobserve(entry.target);
                    this.exposureList.push(exposureData.position);
                    this.timer[exposureData.position] = null;
                }, 1000);
            } else {
                if (this.timer[exposureData.position]) {
                    clearTimeout(this.timer[exposureData.position]);
                    this.timer[exposureData.position] = null;
                }
            }
        });
    };


    /**
     * 上报曝光埋点数据
     * @param exposureData
     * @tips: 利用setTimeout将上报任务放到任务队列末尾，以免占用主进程资源
     */
    sendPosition(exposureData) {
        setTimeout(()=>{
            const { position } = exposureData ?? {};
            console.log(position);
        },0)
    }


    /**
     * 添加监听
     * @param ele
     * @param prams
     */
    addDom = (ele, prams) => {
        // 参数添加到dom中
        if (prams) {
            const exposureData = prams;
            ele.setAttribute(
                'exposure-data',
                JSON.stringify(exposureData)
            );
            const { position } = exposureData ?? {};
            if (this.exposureList.includes(position)) return;
        }

        // dom IntersectionObserver 监听
        this.observer.observe(ele);
    };


    /**
     * 移除监听
     * @param ele
     */
    removeDom = (ele) => {
        // 移除监听
        this.observer.unobserve(ele);
    };
}



const exposure = new Exposure();

// 创建vue指令
const exposureDirective = {
    bind(ele, binding) {
        exposure.addDom(ele, binding.value)
    },
    unbind(ele){
        exposure.removeDom(ele)
    }
}

export default exposureDirective;
```

公用指令文件 导入 曝光埋点指令
```js
// directives/index.js

import exposure from "./exposure";
const directives = {
    exposure,
};

export default {
    install(Vue) {
        Object.keys(directives).forEach((item) => {
            Vue.directive(item, directives[item]);
        });
    },
};
```

 全局全部公共指令
```js
// main.js

import Directives from "./directives";
Vue.use(Directives);
```