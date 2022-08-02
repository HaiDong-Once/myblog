
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