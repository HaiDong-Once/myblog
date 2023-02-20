

# javaScript
[[toc]]


## 防抖节流

### 防抖函数
::: tip 介绍
- 特点：延迟执行
- debounce 函数返回一个可执行函数。这个可执行函数的作用域链上保存了定时器变量。
- 当重复执行的时候，会先清空掉上次生成的定时器，从而实现延迟执行的效果
- 举例：电梯门感应，打开电梯有人进入，电梯门设置定时器，若10秒内没有人再进入，就关闭门，若有人再次进入则重新进入10秒倒计时；
:::

```ts
debounce(func, wait) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  }
}
```

### 节流函数
::: tip 介绍
- 特点：约定时间间隔执行一次
- 原理与 防抖函数相同，通过 closure 存储上次执行的时间戳，
- 当前时间戳和之前的时间戳相比较，如果超过约定时间，则执行一次函数。
- 举例：鲸鱼每隔30分钟，上浮唤气一次，或者给某人发消息，某人只每天恢复一条
:::

```ts
 throttle(func, interval) {
  let lastTimeStamp = 0;
  return function () {
    let curDate = Date.now();
    const diff = curDate - lastTimeStamp;
    if (diff > interval) {
      func.apply(this, arguments);
      lastTimeStamp = curDate;
    }
  };
}
```

### requestAnimationFrame 防抖
- 由于RAF本身的机制，在使用RAF进行防抖时，我们需要记录上一次RAF回调函数的时间戳，
- 然后在下一次RAF回调时检查当前时间戳是否大于某个特定的时间间隔，从而确定是否执行回调函数。
- 这样会导致RAF的回调函数执行频率并不稳定，而是随着浏览器的渲染帧率而变化，这对于防抖并不是非常合适。

### requestAnimationFrame 节流
- RAF 会尽量以每秒60帧的频率执行回调函数，以确保最佳性能和流畅度。
- 使用RAF做节流，可以在不阻塞UI线程的情况下限制函数调用的频率，以提高页面的性能和响应速度。
- 也可以自适应浏览器的帧率。如果浏览器的帧率下降，RAF的频率也会相应下降，这样可以避免浪费过多的 CPU 时间和电量
```ts
/**
 * 默认浏览器刷新率执行函数，
 * @param func
 * @returns {(function(...[*]): void)|*}
 */
rafThrottle(func) {
  let lock = false;
  return function (...args) {
    if (lock) return;
    lock = true;
    window.requestAnimationFrame(() => {
      func.apply(this, args);
      lock = false;
    });
  };
}
```





## promise.all

::: tip 作用:
  获取多个接口回调状态
:::

```ts
/**
 * 请求首页数据
 */
async getData(){
    this.setData({ loading: true })
    let p1 = this.getHomeData()
    let p2 = this.getCompanyCredit()
    let p3 = this.getCreditArchive()
    let p4 = await this.getCompanyData()
    let p5 = this.getLicenseInfo()
    Promise.all([p1,p2,p3,p4,p5]).then(()=>{
        this.setData({ loading: false })
    }).catch(reason => {
      console.log(reason)
    });
},


/**
 * home接口
 */
getHomeData(){
    return api.home().then( res => {
        if(res && res.status == 0){
            this.setData({ 
                datas: res.data
            })
        }
    })
},
```



## 浅拷贝与深拷贝

::: tip 说明:
- 浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，
**如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。**
- 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且**修改新对象不会影响原对象。**
- 总而言之，浅拷贝只复制指向某个对象的指针，而不复制对象本身，**新旧对象还是共享同一块内存。**
但深拷贝会另外创造一个一模一样的对象，**新对象跟原对象不共享内存**，修改新对象不会改到原对象。
:::

```ts
var a1 = {b: {c: {}};
// 浅拷贝方法a2.b.c === a1.b.c // true 新旧对象还是共享同一块内存
var a2 = shallowClone(a1); 
// 深拷贝方法a3.b.c === a1.b.c // false 新对象跟原对象不共享内存
var a3 = deepClone(a3); 
```

![图片](/images/frontEnd/js/img.png)

### 赋值和深/浅拷贝的区别
- 当我们把一个对象赋值给一个新的变量时，**赋的其实是该对象的在栈中的地址，而不是堆中的数据。**也就是两个对象指向的是同一个存储空间，
无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。
- 浅拷贝：重新在堆中创建内存，拷贝前后对象的基本数据类型互不影响，但拷贝前后对象的引用类型因共享同一块内存，会相互影响。
- 深拷贝：从堆内存中开辟一个新的区域存放新对象，对对象中的子对象进行递归拷贝,拷贝前后的两个对象互不影响。

```ts
/*******************对象赋值********************/
let obj1 = {
    name : '浪里行舟',
    arr : [1,[2,3],4],
};
let obj2 = obj1;
obj2.name = "阿浪";
obj2.arr[1] =[5,6,7] ;
console.log('obj1',obj1) 
// obj1 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log('obj2',obj2) 
// obj2 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }


/*******************浅拷贝********************/
let obj1 = {
    name : '浪里行舟',
    arr : [1,[2,3],4],
};
let obj3=shallowClone(obj1)
obj3.name = "阿浪";
obj3.arr[1] = [5,6,7] ; // 新旧对象还是共享同一块内存
// 这是个浅拷贝的方法
function shallowClone(source) {
    var target = {};
    for(var i in source) {
        if (source.hasOwnProperty(i)) {
            target[i] = source[i];
        }
    }
    return target;
}
console.log('obj1',obj1) 
// obj1 { name: '浪里行舟', arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log('obj3',obj3) 
// obj3 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }


/*******************深拷贝********************/
let obj1 = {
    name : '浪里行舟',
    arr : [1,[2,3],4],
};
let obj4=deepClone(obj1)
obj4.name = "阿浪";
obj4.arr[1] = [5,6,7] ; // 新对象跟原对象不共享内存
// 这是个深拷贝的方法
function deepClone(obj) {
    if (obj === null) return obj; 
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== "object") return obj;
    let cloneObj = new obj.constructor();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 实现一个递归拷贝
        cloneObj[key] = deepClone(obj[key]);
      }
    }
    return cloneObj;
}
console.log('obj1',obj1) 
// obj1 { name: '浪里行舟', arr: [ 1, [ 2, 3 ], 4 ] }
console.log('obj4',obj4) 
// obj4 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

### 浅拷贝的方案
#### 1、Array.prototype.concat(),   Array.prototype.slice()
- 使用`concat,slice()`合并数组，会返回一个新的数组。

```ts
let arr = [1, 3, {    username: 'kobe'    }];
let arr2 = arr.concat();    
arr2[2].username = 'wade';
console.log(arr); 
//[ 1, 3, { username: 'wade' } ]

let arr = [1, 3, {    username: ' kobe'    }];
let arr3 = arr.slice();
arr3[2].username = 'wade'console.log(arr); 
// [ 1, 3, { username: 'wade' } ]
```

#### 2、展开运算符
- 展开运算符是一个 `es6 / es2015`特性，它提供了一种非常方便的方式来执行浅拷贝，这与 `Object.assign ()`的功能相同。

```ts
let obj1 = { name: 'Kobe', address:{x:100,y:100}}
let obj2= {... obj1}obj1.address.x = 200;
obj1.name = 'wade'console.log('obj2',obj2)
// obj2 { name: 'Kobe', address: { x: 200, y: 100 } }
```

#### 3、Object.assign(target, source1, source2)
- es6新增的方法，可用于对象合并，将源对象的所有可枚举属性，复制到目标对象上。

```ts
var data = {
  a: "123",
  b: 123,
  c: true,
  d: [43, 2],
  e: undefined,
  f: null,
  g: function() {    console.log("g");  },
  h: new Set([3, 2, null]),
  i: Symbol("fsd"),
  k: new Map([    ["name", "张三"],    ["title", "Author"]  ])
};

var newData = Object.assign({},data)
console.log(newData)  
```

- 注释：如果源目标对象中某个属性值是对另一个对象的引用，那么这个属性的拷贝仍然是对引用的拷贝。

```ts
var test = {  name: '张三' }
var data = { 
              a: 123,
              b: test
            }
var newData = Object.assign({},data)
console.log(newData) 
// {  a: 123,  b: {    name: '张三'  }}
test.age = 18
console.log(newData)
// {  a: 123,  b: {    name: '张三',   age: 18  }}
```

#### 4、通过for in实现
```ts
function deepCopy1(obj) {
  let o = {}
  for(let key in obj) {
    o[key] = obj[key]
  }
  return o
}
 
let obj = {
  a:1,
  b: undefined,
  c:function() {},
}
console.log(deepCopy1(obj))
```

### 深拷贝
::: tip 定义：
改变新的数组（对象）的时候，不改变原数组（对象）
:::

#### JSON.parse(   JSON.stringify()   ) 序列化和反序列
- 循环引用：`JSON.stringify()` 的对象中如果有循环引用会抛出异常 `Converting circular structure to JSON`。
- 其他数据类型：`JSON.stringify()` 无法拷贝 `Map、Set、RegExp` 这些特殊数据类型。
- 函数：`JSON.stringify()` 会默认移除函数。`undefined、function、symbol`非安全值过滤

- **所以使用JSON序列化这种方式时，要注意避免包含上述那几种数据类型**

```ts
// 测试
var test = {  name: "test"};
var test2 = JSON.parse(   JSON.stringify(test)  )

// 方法封装
function deepCopy(obj){ 
   if(typeof obj === 'function'){   
     throw new TypeError('请传入正确的数据类型格式')
    }
    try {
        let data = JSON.stringify(obj)
        let newData = JSON.parse(data)
        return newData
     } catch(e) {
      console.log(e)
      }
}
```

#### 2、递归方法
```ts
function deepClone1(obj) {
  // 判断拷贝的要进行深拷贝的是数组还是对象，
  // 是数组的话进行数组拷贝，对象的话进行对象拷贝
  var objClone = Array.isArray(obj) ? [] : {};
  //进行深拷贝的不能为空，并且是对象或者是
  if (obj && typeof obj === "object") {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone1(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}  
```

#### 3、structuredClone  API实现（性能更好），兼容性未完全开放
- 现在，`structuredClone API` 已经成为了一个 `HTML` 规范中的标准提案，用它可以轻松实现一个深拷贝，
并且也默认解决了循环引用等问题、支持了很多默认的数据类型。性能更好

::: tip 缺点：
- 原型：无法拷贝对象的原型链。
- 函数：无法拷贝函数。
- 不可克隆：并没有支持所有类型的拷贝，比如 `Error`。
:::

```ts
const original = { name: "MDN" };
original.itself = original;

// Clone it
const clone = structuredClone(original);

console.assert(clone !== original); // the objects are not the same (not same identity)
console.assert(clone.name === "MDN"); // they do have the same values
console.assert(clone.itself === clone); // and the circular reference is preserved

```

### 遇到的相关问题
#### 1、涉及问题 (全局对象拷贝操作影响原对象数据)
```ts
// globalMarketParams：{ app.global全局对象
//    open_type: 7,
//    product_type: 77,
// }
// 原方法
let params = this.globalMarketParams;
params.open_type = '';
params.product_type = '';
// this.globalMarketParams 里 open_type, product_type,也为空了

// 使用JSON转换实现深拷贝
let params = JSON.stringify(this.globalMarketParams);
params = JSON.parse(params)
params.open_type = '';
params.product_type = '';
// this.globalMarketParams 内值不变
```

#### 2、原因分析
```ts
var a = {name:'张三'};
var b = a;
// a,b都引用了同一个堆空间， 及a和b共享同一对象
// 修改a或b, a和b引用的堆空间值都会修改；
```

![图片](/images/frontEnd/js/img_1.png)


## 监听元素滚动事件及滚动位置距离

### 滚动事件监听
- 原生监听滚动事件：
```js
// 监听页面滚动
window.addEventListener('scroll', function(e) {
    // dosomething
});

// 使用 requestAnimationFrame 节流
let ticking = false;
window.addEventListener('scroll', function(e) {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      // dosomething
      ticking = false;
    });
    ticking = true;
  }
});
```

- vue监听滚动事件：
```html
<div @scroll="scroll"  // 滚动事件
     @scroll.once="scroll2"  // 开始滚动
     ref="resListRef">
</div>
```

### 滚动位置
```js
// 原生获取位置
window.addEventListener('scroll', function(e) {
    e.target.scrollTop
});
document.querySelector("#scroller").scrollTop

// vue
// <div ref="resListRef"></div>
let toTop = this.$refs.resListRef.scrollTop;
```

- `Element.scrollHeight`：元素内容高度
- `Element.scrollLeft`：读取或设置元素滚动条到元素左边的距离
- `Element.scrollTop`：获取或设置一个元素的内容垂直滚动的像素数
- `Element.scrollWidth`：只读属性是元素内容宽度

### onscrollend 新属性
- 目前仅火狐支持：

![图片](/images/frontEnd/js/img_2.png)

```js
this.$refs.scrollfather.onscrollend = function() {
  console.log("scrolling");
};
```


## js截取指定字符串前后的字符
```js
// 截取指定字符串前的字符
item.url = item.url.split('jpg')[0] + 'jpg';

// 截取指定字符串后的字符
item.url = item.url.split('/img/')[1];

// js判断是否包含字符串 png
item.url.match(RegExp(/png/))
```
