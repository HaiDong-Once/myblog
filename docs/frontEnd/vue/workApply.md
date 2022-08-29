
# vue开发案例
[[toc]]


## 一、实现六边形进度条环绕动画效果
![图片](/images/frontEnd/img_16.png)

### clip-path属性实现六边形
```html
<div class="import-icon gradient-border">
    <div class="animation"></div>
    <div class="icon2">重要<br>提醒</div>
</div>
```

```css
/** 六边形背景 **/
.import-tip .import-icon {
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px 0 40px;
    background-color: rgba(244, 151, 20, 0.2);
    font-size: 36px;
    font-weight: bold;
    color: #ffffff;
    width: 169px;
    height: 196px;
    clip-path: polygon(
            0 25%,
            50% 0,
            100% 25%,
            100% 75%,
            50% 100%,
            0 75%
    );
}
/** 六边形顶层 **/
.import-icon .icon2 {
    text-align: center;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 152px;
    height: 176px;
    background-color: #f49714;
    clip-path: polygon(
            0 25%,
            50% 0,
            100% 25%,
            100% 75%,
            50% 100%,
            0 75%
    );
}

/** 三角形旋转层 **/
.import-icon .animation {
    width: 100px;
    height: 100px;
    background-image: linear-gradient(-90deg,
    rgba(255, 180, 109, 0.11),
    rgba(255, 123, 0, 0.41));
    border-radius: 50%;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    position: absolute;
    top: 98px;
    left: 36px;
    animation: loading 1.5s linear infinite;
    transform-origin: 50px 0;
}
/** 动画 **/
@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
```


## 二、H5调起APP以及适配问题
![图片](/images/frontEnd/img_17.png)

### 调起水滴APP代码示例
```ts
/**
 * 下载水滴app
 * ios使用Universal Link，安卓使用URL Scheme
 */
 function uploadApp(){
  this.addRecord();
  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    var loadDateTime = new Date();
    window.setTimeout(function () {
      var timeOutDateTime = new Date();
      if (timeOutDateTime - loadDateTime < 5000) {
        window.location =
            "https://itunes.apple.com/us/app/%E6%B0%B4%E6%BB%B4%E4%BF%A1%E7%94%A8/id1075736286?l=zh&ls=1&mt=8"; //ios下载地址
      } else {
        window.close();
      }
    }, 1500);
    window.location = "https://shuidi.cn/ulink/";
  } else if (navigator.userAgent.match(/android/i)) {
    try {
      window.location = "shuidi://";
      setTimeout(() => {
        window.location =
            "https://filecdn.shuidi.cn/file/upload/files/38/7c/62/20/387c62205938acda32e9690d946a486d.apk/%E6%B0%B4%E6%BB%B4%E4%BF%A1%E7%94%A8.version.153(3).apk";
      }, 500);
    } catch (e) {
      console.log(e)
    }
  }
}
```


## 三、vue高德地图js api 应用

### 引入方法
```html
<div class="page">
  <div id="container">
    <div class="map-tip">地图搜索精准定位</div>
  </div>
</div>
```

```css
.page{
  font-weight: normal;
  letter-spacing: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100vh;
  background-color: #f4f4f4;
}
#container{
  height: 100vh;
  width: 100%
}
```

```ts
// npm install amap-jsapi-loader --save
import AMapLoader from '@amap/amap-jsapi-loader';

this.geo ='116.39, 39.9'

/**
 * 高德地图初始化
 */
function initMap(){
  AMapLoader.load({
    key:"46b438232abd32f4e5bc4a3dd8e8f85d", 
    // 申请好的Web端开发者Key，首次调用 load 时必填
    version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap)=>{
    this.map = new AMap.Map("container",{  //设置地图容器id
      viewMode:"3D",    //是否为3D地图模式
      zoom:16,           //初始化地图级别
      center:[+this.geo.split(',')[0], +this.geo.split(',')[1]], 
      //初始化地图中心点位置
    });
    const marker = new AMap.Marker({
      position: new AMap.LngLat(116.39, 39.9), 
      // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: '北京'
    });
    this.map.add(marker);
  }).catch(e=>{
    console.log(e);
  })
}
```

### 自定义标注点，传入图片
```ts
const marker = new AMap.Marker({
  position: new AMap.LngLat(+this.location.split(',')[0], +this.location.split(',')[1]),
  // position: [116.39, 39.9],
  offset: new AMap.Pixel(0,0), // 设置点标记偏移量
  anchor:'bottom-center', // 设置锚点方位
  icon: 'https://staticcdn.shuidi.cn/shuidi/images/map/location-icon.png',
});
```


### 自定义拖拽选点组件
```ts
<!--aMapUIjs 引入-->
// <script src="//webapi.amap.com/ui/1.0/main.js"></script>


/**
 * 地图拖拽组件初始化
 */
function positionPicker() {
   window._AMapSecurityConfig = {
  securityJsCode:'ef7ee93fe0ce14c3dae22a2d3e9ae843',
}
  let that = this;
  // 加载地图js
  AMapLoader.load({
    key: "010bac8f887bf63ff0d0d5c71b29e4bb",
    version:"2.0",
    plugins:[],
    AMapUI: {
      version: '1.1',
      plugins:['misc/PositionPicker']
    }
  }).then((AMap)=>{
    // 拖拽地图组件
    AMapUI.loadUI(["misc/PositionPicker"], function(PositionPicker) {
      const map = new AMap.Map("container", {
        zoom: 16,
        center: [+that.location.split(',')[0], +that.location.split(',')[1]],
      });
      const positionPicker = new PositionPicker({
        mode: "dragMap",
        map: map,
        // center: [116.39, 39.9],
        center: [+that.location.split(',')[0], +that.location.split(',')[1]],
        iconStyle:{  // 自定义标注点样式
          url:'https://staticcdn.shuidi.cn/shuidi/images/map/location-icon2.png',//图片地址
          // url:'http://static.test.pingansec.com/shuidi/images/map/location-icon2.png',//图片地址
          size:[50,50],  //要显示的点大小，将缩放图片
          ancher:[25,52],// 锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
        }
      });
      positionPicker.on("success", function(positionResult) {
        that.mapDragNum++;
        if( that.mapDragNum > 2 ){
          that.smsClick('click_6') // 是否拖拽地图
        }
        console.log(positionResult.position.lng, positionResult.position.lat)
        console.log(positionResult.address)
        that.address = positionResult.address;
        that.location = `${positionResult.position.lng},${positionResult.position.lat}`
      });
      positionPicker.on("fail", function(positionResult) {
        console.log(`定位失败:` + positionResult);
      });
      positionPicker.start();
      map.panBy(0, 1);
    });
  });
}
```


## 四、高德地图选址组件iframe版本

### 代码实现
```html
<div class="page">
    <div id="iframe">
        <iframe
                class="map-item"
                id="getAddress"
                @load="loadIframe"
                :src="mapUrl">
        </iframe>
    </div>
</div>
```

```css
/*通用样式 */
.page{
  font-weight: normal;
  letter-spacing: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100vh;
  background-color: #f4f4f4;
}

#getAddress{
  width:100%;
  height:100vh;
  position: relative;
  z-index:1;
}
```

```ts

data:{
    return{
        mapUrl: '//m.amap.com/picker/?keywords=写字楼,' +
            '小区&zoom=15&center=116.470098,39.992838' +
            '&radius=1000&total=20&key=d3f5d8b3b05231fa6a11375492310e3a&platform=mobile',
        geo: this.$route.query.geo ?? '', // 企业地址坐标
        address: this.$route.query.address ?? '', // 企业地址坐标
    }
}

/**
 * 选中地址回调
 */
function loadIframe() {
  let iframe = document.getElementById('getAddress').contentWindow;
  iframe.postMessage('hello', 'https://m.amap.com/picker/');
  window.addEventListener("message", function (e) {
    console.log(e.data)
    if (e.data.command !== "COMMAND_GET_TITLE") {
      console.log(e.data.address)
      console.log(e.data.location)
      this.$dialog.confirm({
        title: '地址确认',
        message: '您选中的地址为：' + e.data.address,
      }).then(() => {
        this.$router.push({
          path: '/markServe/form',
          query: {
            geo: e.data.location,
            address: this.address,
          }
        });
      }).catch();
    }
  }.bind(this), false);
}
```


## 五、vue应用swiper轮播图
### swiper依赖安装
```shell
npm install swiper --save
```

### 文件导入
```ts
import Swiper from "swiper";
import "../../../../public/swiper.css";  // 或者
import 'swiper/dist/css/swiper.css';  // 或者
```

### 应用
```html
<!--轮播图组件-->
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img
          class="banner1"
          src="../../../../assets/imgs/activityTest/map-mark/banner1.png"
          alt=""
      />
    </div>
    <div class="swiper-slide">
      <img
          class="banner2"
          src="../../../../assets/imgs/activityTest/map-mark/banner2.png"
          alt=""
      />
    </div>
  </div>
</div>
```

```ts
/**
 * 初始化轮播图
 * js 请求数据完成后再初始化，否则或数据轮播时数据丢失
 */
async function getPublicData(){
  let p1 = this.getMapData();
  let p2 = this.getCompanyInfo();
  Promise.all([p1,p2]).then(()=>{
    // 声明swiper组件
    new Swiper ('.swiper-container', {
      loop: true, // 循环模式选项
      autoplay: true,//自动循环
    })
  }).catch()
}
```


## 六、vue环境监听手机键盘弹出事件
```ts
data: {    
	return {        
		docmHeight: '0',  //默认屏幕高度       
		showHeight:  '0',   //实时屏幕高度        
		hidshow:true , //显示或者隐藏footer,      
		isResize:false //默认屏幕高度是否已获取   
	};  
}

mounted: {    // window.onresize监听页面高度的变化   
	 window.onresize = ()=>{        
       return(()=>{                     
		if (!this.isResize) {                               
			// 默认屏幕高度                              
			this.docmHeight = document.documentElement.clientHeight                                
			this.isResize = true                       
		}                        
		// 实时屏幕高度                       
		this.showHeight = document.body.clientHeight         
        })()    
	 }  
 }

// watch监听
function showHeight() {        
	if(this.docmHeight > this.showHeight){    
           // 键盘顶起        
		this.hidshow=false        
	}else{            
		this.hidshow=true        
	}    
}
```


## 七、微信浏览器放大字体样式兼容

### 产生原因
- 安卓手动调整字体的话，会使根元素的字体变化，导致整个页面内的元素的一些属性变化，包括宽高字体等样式属性
- ios 手动调整字体，只是单纯的把文字的字体改变，并没有改变根元素字体

### 解决方法：禁止用户调整字体
```css
/* ios 通过重写样式控制*/
body { -webkit-text-size-adjust:100%!important; } 
```
```ts
// android 通过重写事件控制
(function() {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        });
    }
})();
```



## 八、解决vue跳转新页面不置顶问题
- router.js中配置路由
```ts
// 方法一
/* 解决vue页面之间跳转，页面不是在顶部的问题,一定要调用 next 方法，否则钩子就不会被销毁
*  即将进入的路由 from 即将离开的路由 next 放行
*/
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
  window.pageYOffset = 0;
  next();
});

// 方法二
const router = new VueRouter({
    scrollBehavior(to, from,savedPosition) {
        //if判断可加可不加、根据自己需求
        //savedPosition当且仅当通过浏览器的前进/后退按钮触发时才可用
        if (savedPosition) {
            return savedPosition
        }
        return {x: 0, y: 0}
    }
})
```



## 九、动态列表自动滚动实现

### 自定义方案

- 效果预览

![图片](/images/frontEnd/vue/img.png)

- 实现：自动向下滚动，可设定滚动速度，触摸暂停，松开继续滚动
- 问题：滚动真机会有些卡顿，不能循环滚动
- 代码：
```html
<div class="list-box">
    <div class="title-box"><div>检测类型 共63类</div><div>检测时间</div><div>检测结果</div></div>
    <div class="scroll"  id="review_box" @touchstart="rollStop()" @touchend="rollStart(30)">
        <ul id="comment1">
            <div class="list" v-for="item in titleList">
                <div>{{item}}</div>
                <div>{{getTimeNow2}}</div>
                <div>未发现相关纠纷</div>
            </div>
        </ul>
    </div>
</div>
```

```ts
/**
 * 列表滚动初始化
 * @param time: 滚动速度
 */
roll(time) {
  const review_box = document.getElementById("review_box");
  review_box.scrollTop = 0;
  this.rollStart(time);
},

/**
 * 开始滚动
 * @param time
 */
rollStart(time) {
  const comment1 = document.getElementById("comment1");
  const review_box = document.getElementById("review_box");
  this.rollStop();
  this.timer = setInterval(()=>{
    // 当滚动高度大于列表内容高度时恢复为0
    if (review_box.scrollTop >= comment1.scrollHeight) {
      review_box.scrollTop = 0;
    } else {
      review_box.scrollTop++;
    }
  }, time);
},

/**
 * 停止滚动
 */
rollStop(){
  const review_box = document.getElementById("review_box");
  review_box.scrollTop = 0;
  clearInterval(this.timer);
},

mounted() {
  // 初始化触发滚动
  this.roll(30);
},


beforeDestroy() {
  // 销毁清掉滚动
  if (this.timer) clearInterval(this.timer);
},
```

```sass
.list-box{
  width: 940px;
  height: 364px;
  background-color: #f8f6ee;
  border-radius: 15px;
  margin: 40px auto;
  color: #999999;
  box-sizing: border-box;

  .title-box{
    height: 88px;
    font-size: 36px;
    line-height: 88px;
    color: #999999;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #d8d7d3;
    padding: 0 20px;
    div{
      width: 317px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    div:nth-child(1){
      width: 430px;
    }
    div:nth-child(2){
      width: 265px;
    }
  }
  .scroll{
    overflow-y: scroll;
    overflow-x: hidden;
    height: 240px;
    .list{
      color: #333333;
      height: 88px;
      font-size: 36px;
      line-height: 88px;
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #d8d7d3;
      padding: 0 20px;
      div{
        width: 317px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      div:nth-child(1){
        width: 430px;
      }
      div:nth-child(2){
        width: 265px;
      }
    }
  }
}
```

### vue-seamless-scroll组件
- 文档地址：[vue-seamless-scroll组件文档地址](https://chenxuan1993.gitee.io/component-document/index_prod#/component/seamless-default)
- 依赖安装：
```shell
npm install vue-seamless-scroll --save
```

- 组件引入
```ts
import vueSeamlessScroll from 'vue-seamless-scroll'  // vue2引入方式
import scroll from "vue-seamless-scroll/src"  // vue3引入方式
 
components: {
        vueSeamlessScroll
},
```

- 示例：
![图片](/images/frontEnd/vue/img_1.png)
```vue
<template>
    <vue-seamless-scroll :data="listData" :class-option="classOption" class="seamless-warp">
        <ul class="item">
            <li v-for="item in listData">
                <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
            </li>
        </ul>
    </vue-seamless-scroll>
</template>
<style lang="scss" scoped>
    .seamless-warp {
        height: 229px;
        overflow: hidden;
    }
</style>
<script>
    export default {
        data () {
            return {
                listData: [{
                   'title': '无缝滚动第一行无缝滚动第一行',
                   'date': '2017-12-16'
                 }, {
                    'title': '无缝滚动第二行无缝滚动第二行',
                    'date': '2017-12-16'
                    }
                 ]
                }
            },
            computed: {
                classOption () {
                    return {
                            direction: 0
                        }
                }
             }
       }
</script>
```




## 十、vue项目引用字体包和压缩

### 字体包引用
- 下载字体包
- 字体包放到静态文件中`src/assets/font`下
- 在项目中新增字体包css文件`@/public/style.css`
```css
@font-face{
  font-family:'Adorable';
  src:url('@/assets/font/Adorable.TTF')
}
```
- 字体包使用
```css
import  '@/public/style.css'
.demo{
  font-family:'Adorable'
}
```

### 字体包压缩
::: tip 原因
字体包太大，导致服务器压力太大
:::

- `font-spider`：手动命令提取字体包（适用静态文字）
- `Fontmin`工具，打包配置生成压缩字体包（使用静态文字）
- 常用基础汉字2500-3000，导出字体包（体积相对较小，部分适用于动态文字）





## 十一、style中spcoed的问题

### 侵入组件问题
- 加入scoped, 入侵组件class时会失败；
- 解决方法：新增一个style无scoped标签控制组件样式
```scss
<style lang="scss" scoped>

</style>

/*样式入侵*/
<style>
.tabs .van-sticky{
  overflow: hidden;
  border-radius: 22px;
}
</style>
```

### 样式继承问题
- vue路由跳转新页面样式继承了上一页
- 解决方法： style新增scoped属性
```scss
<style lang="scss" scoped>

</style>
```



## 十二、Vue中transition过渡动画组件

### 概述
- Vue 提供了 `transition` 的封装组件，可以给任何元素和组件添加进入/离开过渡。
主要用于 `v-show, v-if` 或 `router-view` 的过渡动画；

### 过度类名
**在进入/离开的过渡中，会有 6 个 class 切换。**
- `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
- `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
- `v-enter-to`：2.1.8 版及以上定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
- `v-leave`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
- `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
- `v-leave-to`：2.1.8 版及以上定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

![图片](/images/frontEnd/vue/img_2.png)

### name属性
- 给transition组件设置不同的name， name名及class类名的前缀
```html
<transition name="plus-icon">
      <div class="icon-plus"
           v-if="flag">
           <img />
      </div>
</transition>
```
```css
/*过度后效果以本身class样式决定,*/
  .icon-plus {
      opacity: 1;
  }
  .plus-icon-enter-active{
    transition: all.5s;
  }
  .plus-icon-enter{
     opacity: 0;
  }
  .plus-icon-leave-active{
    transition: all.5s;
  }
  .plus-icon-leave-to{
    opacity: 0;
  }
```

### css的transition属性
- **transition简介：** css属性transition能让页面元素不是立即的、而是慢慢的从一种状态变成另外一种状态，
从而表现出一种动画过程。根据开始状态和结束状态的具体数值，计算出中间状态。
- **transition属性语法：** css属性transition能让页面元素不是立即的、而是慢慢的从一种状态变成另外一种状态，
从而表现出一种动画过程。根据开始状态和结束状态的具体数值，计算出中间状态。


| 属性                         | 介绍                                                                                  |
|----------------------------|-------------------------------------------------------------------------------------|
| transition-property        | 规定设置过渡效果的 CSS 属性的名称。例如, opacity,color。默认值是all。                                      |
| transition-duration        | 规定完成过渡效果需要多少秒或毫秒。例如，1s。默认值是0s。                                                      |
| transition-timing-function | 规定速度效果的速度曲线。例如, linear、 ease-in、steps动画分段函数或自定义的 cubic-bezier 函数)。默认值是ease，中间快，两头慢。 |
| transition-delay           | 定义过渡效果何时开始。例如，1s。默认值是0s。                                                            |

- **过度速度曲线：**
![图片](/images/frontEnd/vue/img_3.png)

- **简写语法：**
```css
transition: property duration timing-function delay;
transition: opacity 1s linear 2s;
```

### 浏览器支持
- `Internet Explorer 10+`
- `Firefox`
- `Opera`
- `Chrome`
- `Internet Explorer 9` 以及更早版本的浏览器不支持 `transition` 属性。

参考文章： [https://juejin.cn/post/7038404182516187173](https://juejin.cn/post/7038404182516187173)



## 十三、vue手写签名插件vue-esign

- 生成base64图片文件，自定义base64图片旋转函数
- github地址 [https://github.com/JaimeCheng/vue-esign](https://github.com/JaimeCheng/vue-esign)

![图片](/images/frontEnd/vue/img_4.png)

### 安装
```shell
npm install vue-esign --save
```

### 注入组件
```ts
import vueEsign from 'vue-esign'
components: { vueEsign }
```

### 组件封装
```vue
<!--
  @description: 手写签名弹窗组件
  @author: hhd (2022-08-16)
  @说明：
      @getImgBase64： 获取签名base64文件；
      @closePop：关闭弹窗回调；
      imgEdg: 生成签名图片旋转角度（必须是90的倍数）
  @使用方式：
      import autographPop from "@guanjia/components/autographPop/index.vue"
      components: {autographPop,},

     <autographPop
          v-if="autographPopFlag"
          @getImgBase64="getImgBase64"
          @closePop="autographPopFlag=false"
          imgEdg="-90">
      </autographPop>

      /**
       * 获取手写img
       * @param url
       */
      getImgBase64(url) {
        this.autographImg = url;
      },
-->


<template>
  <div class="pop-page">
    <div class="pop-box">
      <div class="close" @click="closePop">
        <img src="@guanjia/assets/imgs/plaque/afterPay/close-icon.png" alt="">
      </div>
      <div class="title">手写签名</div>
      <div class="button1" @click="handleReset">重写</div>
      <div class="button2" @click="handleGenerate">使用</div>
      <div class="graph-box">
        <vueEsign
            ref="esign"
            :width="500"
            :height="1120"
            :isCrop="isCrop"
            :lineWidth="lineWidth"
            :lineColor="lineColor"
            :bgColor.sync="bgColor">
        </vueEsign>
      </div>
    </div>
  </div>
</template>


<script>
import vueEsign from 'vue-esign'


export default {
  name: "index",
  components: {vueEsign},
  props:{
    imgEdg:{ // 生成签名图片旋转角度
      type: String,
      required: ''
    },
  },

  data(){
    return{
      lineWidth: 6, // 画笔边框宽度
      lineColor: '#000', // 画笔颜色
      bgColor: '', // 背景颜色
      resultImg: '', // 生成签名图片文件
      isCrop: true, // 是否裁切
    }
  },


  computed: {

  },


  methods: {
    /**
     * 清空签名画板
     */
    handleReset () {
      this.$refs.esign.reset()
    },


    /**
     * 创建签名base64 img文件
     */
    handleGenerate () {
      this.$refs.esign.generate().then(res => {
        this.resultImg = res;
        if(this.imgEdg){
          this.rotateBase64Img(this.resultImg, +this.imgEdg)
        }else{
          this.$emit("getImgBase64", this.resultImg);
          this.closePop()
        }
      }).catch(err => {
        alert(err) // 画布没有签字时会执行这里 'Not Signned'
      })
    },


    /**
     * 关闭签名弹窗回调
     */
    closePop(){
      this.$emit('closePop', false)
    },


    /**
     * base64图片旋转
     * @param src base64图片文件
     * @param edg 图片旋转角度：必须是90的倍数
     */
    rotateBase64Img(src, edg) {
      let that = this;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let imgW;//图片宽度
      let imgH;//图片高度
      let size;//canvas初始大小
      if (edg % 90 !== 0) {
        console.error("旋转角度必须是90的倍数!");
      }
      (edg < 0) && (edg = (edg % 360) + 360)
      const quadrant = (edg / 90) % 4; //旋转象限
      const cutCoor = {sx: 0, sy: 0, ex: 0, ey: 0}; //裁剪坐标
      const image = new Image();
      image.crossOrigin = "anonymous"
      image.src = src;
      image.onload = function () {
        imgW = image.width;
        imgH = image.height;
        size = imgW > imgH ? imgW : imgH;
        canvas.width = size * 2;
        canvas.height = size * 2;
        switch (quadrant) {
          case 0:
            cutCoor.sx = size;
            cutCoor.sy = size;
            cutCoor.ex = size + imgW;
            cutCoor.ey = size + imgH;
            break;
          case 1:
            cutCoor.sx = size - imgH;
            cutCoor.sy = size;
            cutCoor.ex = size;
            cutCoor.ey = size + imgW;
            break;
          case 2:
            cutCoor.sx = size - imgW;
            cutCoor.sy = size - imgH;
            cutCoor.ex = size;
            cutCoor.ey = size;
            break;
          case 3:
            cutCoor.sx = size;
            cutCoor.sy = size - imgW;
            cutCoor.ex = size + imgH;
            cutCoor.ey = size + imgW;
            break;
        }
        ctx.translate(size, size);
        ctx.rotate(edg * Math.PI / 180);
        ctx.drawImage(image, 0, 0);
        const imgData = ctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey);
        if (quadrant % 2 === 0) {
          canvas.width = imgW;
          canvas.height = imgH;
        } else {
          canvas.width = imgH;
          canvas.height = imgW;
        }
        ctx.putImageData(imgData, 0, 0);
        that.resultImg = canvas.toDataURL();
        that.$emit("getImgBase64", canvas.toDataURL());
        that.closePop()
      };
    }
  },

}
</script>


<style lang="scss" scoped>
.pop-page{
  width: 100%;
  overflow: hidden;
  background: rgba(0,0,0, 0.6);
  min-height: calc(100vh + 1px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  .pop-box{
    width: 966px;
    height: 1858px;
    background-color: #ffffff;
    border-radius: 22px;
    position: relative;
    .close{
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 120px;
      width: 120px;
      img{
        width: 34px;
        height: 34px;
      }
    }
    .title{
      position: absolute;
      right: -20px;
      top: 840px;
      transform: rotate(90deg);
      font-size: 46px;
      line-height: 44px;
      color: #333333;
    }
    .button1{
      position: absolute;
      right: -40px;
      bottom: 360px;
      transform: rotate(90deg);
      height: 79px;
      width: 202px;
      background-color: #ffffff;
      border: solid 3px #1f81f8;
      font-size: 40px;
      line-height: 79px;
      text-align: center;
      color: #1f81f8;
      border-radius: 16px;
      box-sizing: border-box;

    }
    .button1:active{
      opacity: 0.6;
    }
    .button2{
      position: absolute;
      right: -40px;
      bottom: 120px;
      transform: rotate(90deg);
      height: 79px;
      width: 202px;
      background-color: #1f81f8;
      border: solid 3px #1f81f8;
      font-size: 40px;
      line-height: 79px;
      text-align: center;
      color: #ffffff;
      border-radius: 16px;
      box-sizing: border-box;
    }
    .button2:active{
      opacity: 0.6;
    }
    .graph-box{
      position: absolute;
      top: 40px;
      left: 40px;
      width: 787px;
      height: 1758px;
      background-color: #ffffff;
      border: dashed 3px #999999;
      box-sizing: border-box;
      border-radius: 8px;
    }
  }
}

</style>
```


## 十四、vuex数据持久化实现

### vuex状态管理设计和实现
#### 安装引用
```shell
yarn add vuex@next --save
```

#### 构建
```ts
import { createApp } from 'vue'
import { createStore } from 'vuex'


// 创建一个新的 store 实例
const store = createStore({
    
  state () {
    return {
      id: '', // 批次id
      uid: '', // 用户id
      token: '', // 登录token 
      digest: '', // 企业digest
      phone: '', // 电话号码
      kp_signature: '', // 批次id签名认证
      product_type: '', // 产品类型
    }
  },
  
  // 使用set+驼峰命名设置状态，未使用官网推荐的大写方案
  mutations: {
    // 设置批次id
    setId (state, value) {
        state.id = value;
    },
    
    // 设置用户id
    setUid (state, value) {
        state.uid = value;
    },
    
    // 设置用户id
    setToken (state, value) {
        state.token = value;
    },
    
    // 设置企业digest
    setDigest (state, value) {
        state.digest = value;
    },
    
    // 设置电话号码
    setPhone (state, value) {
        state.phone = value;
    },
    
    // 设置批次id签名认证
    setKp_signature (state, value) {
        state.kp_signature = value;
    },
    
    // 设置产品类型
    setProduct_type (state, value) {
        state.product_type = value;
    },
  }
})

const app = createApp({ /* 根组件 */ })

// 将 store 实例作为插件安装
app.use(store)
```

#### vuex绑定data数据同步方案
::: tip 思路分析
- **问题**：vuex和data数据都是响应式的，状态同步，但是vuex数据赋值到data中，vuex数据更新，data中的数据不会响应；
- **解决方法**：使用watch监听vuex状态，然后赋值给data，从而data做出响应
- **新的问题**：watch监听有延迟，修改vuex状态，data状态不会同步更新，获取data状态的任务需要排列到队列最后，才能取到数据更新后的状态，体验不佳；
:::

```ts
data() {
    return {
      id: this.$store.state.id, // 默认id=""
    }
}

created() {
    console.log(this.id) // id = ""
    this.$store.commit('setId', this.$route.query.id) // id = 111111
   console.log(this.id) // id = ""
   setTimeout(()=>{
      console.log(this.id) // id = 111111
   },0)
   // 如果同步使用需要把任务滞后
}

watch: {
  "$store.state.id"() {
    this.id = this.$store.state.id;
  },
},
```

#### vuex与data数据独立使用
- **缺点**：旧版本使用需要重新写入变量

```ts
// 独立获取，独立赋值；
html使用vuex: {{$store.state.id}}
html使用data: {{id}}
js中使用vuex: this.$store.state.id;
js中使用data: this.id;
```

#### 统一设置全局状态
```ts
// tools工具
import store from '../store'

/**
 * 全局数据存储
 * @param {object} query : 传入用户数据对象
 * 用于vuex全局数据统一存储
 */
setUserStore(query){
    if(query){
        if(query.uid) localStorage.setItem("local_userid", query.uid);
        if(query.token) localStorage.setItem("local_token", query.token);
        if(query.id) store.commit('setId', query.id);
        if(query.uid) store.commit('setUid', query.uid);
        if(query.token) store.commit('setToken', query.token);
        if(query.digest) store.commit('setDigest', query.digest);
        if(query.phone) store.commit('setPhone', query.phone)
        if(query.kp_signature) store.commit('setKp_signature', query.kp_signature)
        if(query.product_type) store.commit('setProduct_type', query.product_type)
    }
},
```

```ts
// 使用
created() {
  // 全部更新状态  
  this.$tools.setUserStore(this.$route.query);
  // 指定更新状态
  this.$tools.setUserStore({
      uid: res.data?.user_id,
      token: res.data?.token,
      digest: res.data?.digest,
     phone: res.data?.phone,
     product_type: res.data?.product_type,
  });
}
```

### vuex数据持久化：vuex-persistedstate
#### 安装
```shell
npm install --save vuex-persistedstate
```

#### 引用并配置
```ts
import persistedState from 'vuex-persistedstate'

export default new Vuex.Store({
    
  plugins: [
      persistedState({
        // 默认为localStorage
        storage: window.sessionStorage,
      })
  ]

})
```


#### 其他配置
```ts
 // 存储到 localStorege
 plugins: [createPersistedState()]
 // 或者
  plugins: [createPersistedState({
    storage:window.localStorege
  })]
 

// 存储到  sessionStorage
plugins: [createPersistedState({
  storage:window.sessionStorage
})]

// 缓存state下指定的部分数据
 plugins: [createPersistedState({
 storage:window.sessionStorage,
     reducer(val)  {
         return {
             // 只储存state中的token
             assessmentData: val.token,
         }
     }
 })]
```

- 缓存Vuex多个模块下的指定某个模块的state，通过修改path配置来实现

```ts
/* user-module */
export const user = {
  state: {
    token: '',
    role: ''
  }
}
/* profile-module */
export const profile = {
  state: {
    name: '',
    company: ''
  }
}
/* modules目录下的index.js */
import user from './user'
import profile from './profile'
export default {
  user,
  profile
}

/* store.js */
import modules from './modules'
let store = new Vuex.Store({
    modules,
     plugins: [
    createPersistedState({
      key: 'zdao',
      paths: ['user'] // 这里便只会缓存user下的state值
    })
  ]
}) 
```

### 手动在vuex中缓存全局数据
- **缺点**：只能实现简单的缓存功能，需要利用`getter`来获取缓存数据

```ts
const state = () => {
  return {
    token: ''
  }
}
const actions = {
  async login ({ commit }, param) {
    // 在这里获取用户的登录信息，返回值包含token，uid等信息
    const userInfo = await userService.login(param)
    commit('setUser', userInfo)
    return userInfo
  }
}
const mutations = {
  setUser (state, data) {
    state.token = data.token
    // 在这里设置用户token, 同步存储数据
    localStorage.setItem('user-token', data.token)
  }
}
const getter= {
  getUser () {
    // 在这里获取用户token, 从缓存中
    return localStorage.getItem('user-token')
  }
} 
```



## 十五、vue input输入联想实现
::: tip 分析
- **问题**：input事件输入太快会造成发起请求太多的问题，并且可能上一个请求返回事件比最后一个请求返回事件还慢，导致联想到的数据不是最新的；
- **解决方法**：使用防抖函数，控制接口请求频率；或者使用请求中断，只要发起新请求，上一个请求还没有完成的话，就中断上一个请求，保证列表反显的数据是最后一个请求返回的数据；
:::

![图片](/images/frontEnd/vue/img_5.png)

### 利用防抖处理@Input请求联想接口
- **缺点**：响应会有些慢，而且也能绝对保证数据没有延迟；

```html
<div class="form-box">
  <input
      type="text"
      placeholder="请输入申请企业名称"
      v-on:input="getCompanyList"
      v-model="companyForm.company_name"
  />
  <div class="company-scroll" v-if="companyScrollFlag">
    <div
        v-for="item of bindSourceList"
        @click="selectCompany(item.company_name)">
        {{item.company_name}}
    </div>
  </div>
</div>
```

```ts
data() {
  return {
    companyForm:{ // 企业信息
      company_name: '', // 企业名
    },
    bindSourceList: [], // 企业联想表单
    timeout: null, // 防抖函数定时器
    companyScrollFlag: false, // 企业联想框控制
    cancel: null, // 取消请求
  }
},

methods: {
    /**
     * 获取企业联想信息（调用防抖函数）
     */
    getCompanyList(){
      this.debounce(()=>{
        this.$http.get('/b-search', {
          params: {
            action: 'company_name_notice',
            key: this.companyForm.company_name,
          },
        }).then(res => {
          if (res && res.status === 0) {
            this.companyScrollFlag = true;
            this.bindSourceList = res.data?.company_list ?? [];
          } else {
            res.message && this.$toast(res.message)
          }
        })
      }, 200)
    },
    
    
    /**
     * 防抖函数
     * @param fn 防抖处理的函数
     * @param wait 防抖延迟时间 ms
     */
    debounce(fn, wait) {
       // 只要定时器非空，就清掉定时器，重新创建一个新的重新倒计时 
      if(this.timeout !== null) clearTimeout(this.timeout)
      this.timeout = setTimeout(fn, wait)
    },
    
    
    /**
     * 选中企业
     */
    selectCompany(company){
      this.companyScrollFlag = false;
      this.companyForm.company_name = company;
    },
}
```

### 使用请求中断中断上一个请求
- **缺点**：仅使用请求中断，请求量还是过于频繁；
- 红色的请求就是中断的请求

![图片](/images/frontEnd/vue/img_6.png)

```ts
import axios from 'axios'
const CancelToken = axios.CancelToken;

/**
 * 获取企业联想信息
 */
getCompanyList(){
    if(typeof this.cancel ==='function'){
      this.cancel();
    }
    let that = this;
    this.$http.get('/b-search', {
      params: {
        action: 'company_name_notice',
        key: this.companyForm.company_name,
      },
      cancelToken: new CancelToken(function executor(c) {
        that.cancel = c;
        console.log(c)
        // c是一个函数
        // cancel(message) {
        //   if (token.reason) {
        //     // Cancellation has already been requested
        //     return;
        //   }
        //
        //   token.reason = new Cancel(message);
        //   resolvePromise(token.reason);
        // }
      })
    }).then(res => {
      if (res && res.status === 0) {
        this.companyScrollFlag = true;
        this.bindSourceList = res.data?.company_list ?? [];
      } else {
        res.message && this.$toast(res.message)
      }
    })
},
```

### 最终方案： 防抖+过期请求中断
```ts
import axios from 'axios'
const CancelToken = axios.CancelToken;

data() {
  return {
    timeout: null, // 防抖函数定时器
    companyScrollFlag: false, // 企业联想框控制
    cancel: null, // 取消请求
  }
},


methods: {
    /**
     * 获取企业联想信息
     */
    getCompanyList(){
      this.debounce(()=>{
        if(typeof this.cancel ==='function'){
          this.cancel();
        }
        let that = this;
        this.$http.get('/b-search', {
          params: {
            action: 'company_name_notice',
            key: this.companyForm.company_name,
          },
          cancelToken: new CancelToken(function executor(c) {
            that.cancel = c;
          })
        }).then(res => {
          if (res && res.status === 0) {
            this.companyScrollFlag = true;
            this.bindSourceList = res.data?.company_list ?? [];
          } else {
            res.message && this.$toast(res.message)
          }
        })
      }, 200)
    },
    
    
    /**
     * 函数防抖
     * @param fn 防抖处理的函数
     * @param wait 防抖延迟时间 ms
     */
    debounce(fn, wait) {
      // 只要定时器非空，就清掉定时器，重新创建一个新的重新倒计时 
      if(this.timeout !== null) clearTimeout(this.timeout)
      this.timeout = setTimeout(fn, wait)
    },
}
```