
# 高德地图选点组件应用
## vue应用

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
    key:"46b4...........................", 
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
  securityJsCode:'.......................................',
}
  let that = this;
  // 加载地图js
  AMapLoader.load({
    key: "010ba...................,
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

### 高德地图选点接口调用节流
::: tip 背景
因为业务需要，高德地图选点组件每个用户调用量达到20次以上，因为访问量大，需要开启企业年费才够用，20000元/年。
实际测试拖拽过程中稍有停顿就会调用一次api,导致调用量特别大。
:::
::: tip 解决方法
利用start()，和stop(),方法，初始化不调用start()方法；因为不调用strat方法，定位点不会打开，所以写一个模拟的定位点覆盖到组件定位点上方，
拖拽完用户确认地址时，再调用start()方法触发回调获取当前选点信息，回调成功后调用stop()方法停止选点。这样理论上用户只有最后一次确认地址才会调用一次，
拖拽过程中不会调用api,大大节省调用api次数。 调用量降低15倍。
:::

![图片](/images/frontEnd/vue/img_8.png)

#### 代码实现
```html
<div id="container"></div> // 地图组件
<div class="drag-icon-top"> // 模拟marker点
  <img src="https://staticcdn.shuidi.cn/shuidi/images/map/location-icon2.png" alt="">
</div>
```
```ts
// 选点组件回调
positionPicker.on("success", function(positionResult) {
    // 获取标记点信息
    positionPicker.stop();  // 关闭选点
},
    
/**
 * 确认标记地点
 */
openPop(type){
    this.positionPicker.start(); // 打开标记获取标记点信息
}
```
```scss
.drag-icon-top{
  position: absolute;
  top: 546px;
  left: 468px;
  img{
    width: 150px;
    height: 150px;
  }
}
```


## 高德地图选址组件iframe版本

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
            '&radius=1000&total=20&key=............&platform=mobile',
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