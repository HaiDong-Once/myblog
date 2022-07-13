

# vue开发案例


## 一、实现六边形进度条环绕动画效果

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