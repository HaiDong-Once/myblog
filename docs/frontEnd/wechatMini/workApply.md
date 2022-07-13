

# 小程序开发案例


## 一、小程序登录状态管理（原生）

### 管家小程序登录流程分析
![图片](/images/frontEnd/20220713222830.png)

### 解决方案
#### 短信——冷启动 app.js
```ts
App({
  globalData: {
    // 管家小程序全局变量
    userParam: {
      id: '', // 批次id
      uid: '', // 用户id
      token: '', // 登录token
      digest: '', // 企业digest
      product_type: '', // 版本类型
      phone: '', // 手机号码
    }
  },
  
    
  onLaunch: function (options) {
      /**
       * 全局登录绑定状态管理
       * @param {object} options 初始化参数
       * @param shuidi_user_map_status 企业绑定状态 值：当前用户id
       */
      bindUserInfo: function(options){//知晓哪个用户登录，并绑定公司用户
        if(wx.getStorageSync('shuidi_user_map_status') != options.query.id){
          if(options.query.uid){
            this.globalData.userParam.uid = options.query.uid;
            wx.setStorageSync("shuidi_user_id", options.query.uid);
          }
          if(options.query.token){
            this.globalData.userParam.token = options.query.token;
            wx.setStorageSync("shuidi_uid_token", options.query.token);
          }
          if(options.query.id){
            this.globalData.userParam.id = options.query.id;
            wx.setStorageSync("shuidi_assoc_id", options.query.id);
          }
          if(options.query.product_type){
            this.globalData.userParam.product_type = options.query.product_type;
            wx.setStorageSync("shuidi_product_type", options.query.product_type);
          }
          if(options.query.digest){
            this.globalData.userParam.digest = options.query.digest;
            wx.setStorageSync("shuidi_digest", options.query.digest);
          }
          if(options.query.uid && options.query.token && options.query.digest && options.query.product_type){
            api.save_user_company_map({
              digest: options.query.digest,
              source: options.query.product_type,
              kp_id: options.query.id?options.query.id:''
            }).then(res=>{
              if(res && res.status == 0){
                wx.setStorageSync('shuidi_user_map_status', options.query.id)
              }
              api.user_info().then(res =>{
                if(res && +res.status === 0){
                  this.globalData.userParam.phone = res.data?.phone ?? '';
                  wx.setStorageSync("user_name", this.globalData.userParam.phone);
                }
              })
            })
          }else if(options.query.uid && options.query.token){    
            api.user_info().then(res =>{
              if(res && +res.status === 0){
                this.globalData.userParam.phone = res.data?.phone ?? '';
                wx.setStorageSync("user_name", this.globalData.userParam.phone);
              }
            })
          }
        }
      }
  }
})
```

#### 短信——热启动 shuidi-page.js
```ts
const app = getApp()
const api = app.globalData.api;


/**
 * 重写 Page 对象
 * @param {*} pageConfig 修改页面 page 对象
 * @使用方式：
    导入： import Page from '/common/shuidi-page'
 */

export function ShuidiPage(pageConfig){

    // onLond函数赋值
    let onLoad = pageConfig.onLoad;
    pageConfig.onLoad = function(options){

        /**
         * 全局登录绑定状态管理
         * @param {object} options 初始化参数
         * @param shuidi_user_map_status 企业绑定状态 值：当前用户id
         */
        if (wx.getStorageSync('shuidi_user_map_status') != options.id) {
          if (options.uid) {
              app.globalData.userParam.uid = options.uid;
              wx.setStorageSync("shuidi_user_id", options.uid);
          }
          if (options.token) {
              app.globalData.userParam.token = options.token;
              wx.setStorageSync("shuidi_uid_token", options.token);
          }
          if (options.id) {
              app.globalData.userParam.id = options.id;
              wx.setStorageSync("shuidi_assoc_id", options.id);
          }
          if (options.product_type) {
              app.globalData.userParam.product_type = options.product_type;
              wx.setStorageSync("shuidi_product_type", options.product_type);
          }
          if (options.digest) {
              app.globalData.userParam.digest = options.digest;
              wx.setStorageSync("shuidi_digest", options.digest);
          }
          if (options.uid && options.token && options.digest && options.product_type) {
              api.save_user_company_map({
                  digest: options.digest,
                  source: options.product_type,
                  kp_id: options.id ? options.id : ''
              }).then(res => {
                  if (res && res.status == 0) {
                      wx.setStorageSync('shuidi_user_map_status', options.id)
                  }
                  api.user_info().then(res =>{
                    if(res && +res.status === 0){
                      app.globalData.userParam.phone = res.data?.phone ?? '';
                      wx.setStorageSync("user_name", app.globalData.userParam.phone);
                    }
                  })
              })
          } else if (options.uid && options.token) {
            api.user_info().then(res =>{
              if(res && +res.status === 0){
                app.globalData.userParam.phone = res.data?.phone ?? '';
                wx.setStorageSync("user_name", app.globalData.userParam.phone);
              }
            })
          }
      }

      
        onLoad.call(this,options);
    }

    Page(pageConfig);
}
export default ShuidiPage;
```

#### 授权登录api.js
```ts
    // 拦截 decode_data 授权登录获取登录信息接口
    if (res.data?.user_token?.user_id) {
        getApp().globalData.userParam.uid = res.data.user_token.user_id;
        wx.setStorageSync("shuidi_user_id", res.data.user_token.user_id);
      }
      if (res.data?.user_token?.token) {
        getApp().globalData.userParam.token = res.data.user_token.token;
          wx.setStorageSync("shuidi_uid_token", res.data.user_token.token);
      }
      if(res.data?.phoneNumber){
        getApp().globalData.userParam.phone = res.data.phoneNumber;
        wx.setStorageSync("user_name", res.data.phoneNumber);
      }
      http.request({
        url: `${config.baseUrl}/mobile/active/base`,
        data: { action: 'home'}
      }).then(res => {
        if (res?.data?.digest) {
          getApp().globalData.userParam.digest = res.data.digest;
          wx.setStorageSync("shuidi_digest", res.data.digest);
        }
      }
    )
```

#### 退出登录清除全局和缓存
```ts
wx.clearStorage()
app.globalData.userParam = {};
```

#### 使用： 登录状态数据获取
```ts
const app = getApp();
const api = app.globalData.api;

/*
  @description: 全局参数获取封装
  @author: hhd (2022-06-17)
  @使用方式：
    导入： import getData from '...../common/getData';
    调用获取全局变量： getData.getUid()
 */


var getData = {

  /*************** 获取全局参数 *****************/
  /**
   * 获取user_id
   * @returns {string, number}
   */
  getUid: function () {
    if (app.globalData.userParam.uid) {
      return app.globalData.userParam.uid
    } else {
      return wx.getStorageSync('shuidi_user_id')
    }
  },


  /**
   * 获取token
   * @returns {string, number}
   */
  getToken: function () {
    if (app.globalData.userParam.token) {
      return app.globalData.userParam.token
    } else {
      return wx.getStorageSync('shuidi_uid_token')
    }
  },


  /**
   * 获取id
   * @returns {string, number}
   */
  getId: function () {
    if (app.globalData.userParam.id) {
      return app.globalData.userParam.id
    } else {
      return wx.getStorageSync('shuidi_assoc_id')
    }
  },

  /**
   * 获取product_type
   * @returns {string, number}
   */
  getProductType: function () {
    if (app.globalData.userParam.product_type) {
      return app.globalData.userParam.product_type
    } else {
      return wx.getStorageSync('shuidi_product_type')
    }
  },


  /**
   * 获取digest
   * @returns {string, number}
   */
  getDigest: function () {
    if (app.globalData.userParam.digest) {
      return app.globalData.userParam.digest
    } else {
      return wx.getStorageSync('shuidi_digest')
    }
  },


  /**
   * 获取手机号码: phone
   * @returns {string, number}
   */
  getPhone: function () {
    if (app.globalData.userParam.digest) {
      return app.globalData.userParam.phone
    } else {
      return wx.getStorageSync('user_name')
    }
  },


}

module.exports = getData;
```


## 二、小程序本地缓存二次封装（过期，续期，获取全部）
```ts
/*
  @description: 本地缓存二次封装
  @title: wxCache.js
  @author: hhd
  @Time: 2022-6-27 17:30
  @last: 2022-6-30 10:00
  @导入方式：
    import wxCache from './common/wxCache.js' // 导入wxCache.js
    App({
      data:{},
      wxCache: new wxCache(), // 全局导入
    })
  @使用方式：
    app.wxCache.set('time','123', 1, true);
    app.wxCache.get('time');

  @局部引用： 
    import wxCache from '/common/wxCache.js'
    wxCache.set('time','123', 1, true)
 */

// export default class WxCache {   // undifend

var wxCache = {

  /**
   * 设置缓存数据
   * @param {String} key 缓存字段名
   * @param {*} value 缓存字段值
   * @param {Number} expire  缓存过期时间 单位：秒
   * @param {Boolean} isRenewal 是否开启持续使用中续期：默认开启
   */
  set: function(key, value, expire, isRenewal=true) {
      console.log(expire)
      value = value ?? '';
      if(!key) throw new Error("key cannot be empty") 

      let data;
      if(expire) {
        if(isNaN(expire) || expire < 1) throw new Error("Expire must be a number")
        let expirefrom = parseInt(Number(expire) * 1000); // 秒转化毫秒
        data = {
          value: value, // 存储值
          time: new Date().getTime(), // 存储时时间戳
          expire: expirefrom, // 过期时间
          isRenewal, // 是否开启续期功能
        }
      }else {
        data = value;
      }

      wx.setStorageSync(key, JSON.stringify(data));
  },
  

  /**
   * 获取缓存数据
   * @param {String} key 缓存字段名
   * @returns {String}
   */
  get: function(key) {
      if(!wx.getStorageSync(key)) return ""; // 判断key是否存在
      const now = new Date().getTime(); // 获取当前时间
      let storage;
      try{
        storage = JSON.parse(wx.getStorageSync(key)) // 获取缓存数据JSON
      }catch{
        storage = wx.getStorageSync(key) // 获取缓存数据非JSON
      }
      
    if(storage?.expire) {
        if (parseInt(storage?.time + storage?.expire) >= now ) {
          // 未过期期间被调用 则自动续期 进行保活
          if(storage?.isRenewal) {
            storage.time = now;
            wx.setStorageSync(key, JSON.stringify(storage));
          }
          // 未过期获取
          return storage?.value
        }else {
          // 已过期删除
          this.remove(key);
          return ""
        }
    }else {
        // 没有设置时间处理返回
        return storage
    }

  },


  /**
   * 获取全部storage
   * @param {string} dataType 返回数据类型 object(默认), array
   * @returns {object,array} 
   */
  getAll: function(dataType){
    try {
      const info = wx.getStorageInfoSync()
      let allStorageArr = [];
      let allStorageObj = {};
      for(let item of info.keys){
        allStorageArr.push({
          key: item,
          value: this.get(item)
        })
        allStorageObj[item] = this.get(item)
      }
      if(dataType === "array"){
        return allStorageArr
      }else{
        return allStorageObj
      }
    } catch (err) {
      console.log(err)
    }
  },


  /**
   * 移除缓存数据
   * @param {String} key 
   */
  remove: function(key) {
      wx.removeStorageSync(key);
  },


  /**
   * 清空所有缓存数据
   */
  clearAll: function() {
    wx.clearStorageSync();
  },


}

module.exports = wxCache;
```


## 三、小程序页面栈

### 解决小程序返回按钮和物理返回跳转指定页面
- A -> B
- 点击头部 navigator 返回键可通过重写 navigator bar
  自定义返回键 handler 进行拦截
- 侧滑、安卓机底部物理返回键可以在 B 页 onUnload 生命周期通过事件或其他方法
  通知前置 A 页当前发生回退行为，在 A 页 onShow 生命周期触发拦截如再次返回 B 页，
  虽然逻辑层发生了回退但从交互、视觉角度当前仍停留在 B 页

```ts
const pages = getCurrentPages();    //获取当前页面信息栈
const prevPage1 = pages[pages.length - 1]     //获取当前页面信息
const prevPage2 = pages[pages.length - 2]     //获取上一个页面信息

const page = getCurrentPages()
if (page.length > 1) {
  page[page.length - 2].setData({
    收货人: 选中的某个收货人详情   //[object]
  })
  wx.navigateBack({
    delta: 1
  })
}
```

- 页面栈信息
![图片](/images/frontEnd/img.png)

### 中转页方案（中转页——目标页）

### 页面栈详情

![图片](/images/frontEnd/img_1.png)
![图片](/images/frontEnd/img_2.png)
![图片](/images/frontEnd/img_3.png)



## 四、小程序性能优化
![图片](/images/frontEnd/img_4.png)

### 图片优化
- 使用图片懒加载，未显示的部分不加载（适用于滑动加载长页面）
- 雪碧图技术，整张图片切出icon（不利于后期维护）
- 拆分域名，接口，文件，图片使用不同域名 （图片单独域名）
- cdn内容分发 （已使用）
- 图片开启http缓存，在服务器端配置请求头cache-control（已配置）
- 开发阶段尽量控制图片请求量，icon用字体或者组件库代替
- 开发图片icon转字体插件,减少http请求和本地资源大小 (未实现）

### 未使用依赖清除
- 依赖分析和清除
  ![图片](/images/frontEnd/img_5.png)
- - 分包echarts,完成手写蜘蛛图后替换  替换后减少960kb（已完成）

### 减重后数据统计
- （使用小程序助手数据分析）
- 减重后数据统计：减重比例：42%；
- 减重量：3253-1892=1361KB
- 打开率：从平均92%—94%以上 ；  低端机从低于88%—90%以上
- 小程序总体启动时间：从平均4.7s—4.4s;   安卓机从5.3s—5秒以内

### 打开小程序按需注入
- 使用真机调试查看注入量
```ts
// app.json文件
{
  lazyCodeLoading: "requiredComponents"
}
```

### 使用分包加载
- 独立分包无法使用主包内公共依赖和组件
- 分包预加载使用局限较大，不适用信用管家项目


### 数据预拉取
- 说明：在冷启动时通过微信后台向服务器拉取业务数据，减少了首屏渲染等待时间；
- 除首页其他页接口量较小

### 数据持久化：全局数据和缓存的合理利用

### 小程序状态管理



## 五、小程序体验优化
1.取消 :active使用，滑动页面时效果不清除
- 用hover-class=""  代替

2.设置页面滚动 overflow:scroll要同时开启惯性滚动
- -webkit-overflow-scrolling: touch  (适配ios端）

3.可点击区域过小问题
- 点击icon宽高应该大于20px

4.存在定时器未回收的问题，定时器是全局的，需要手动回收（未生效）
- 跳转下一页是清除上一页定时器
```ts
let interval1 = setInterval(_=>{
      this.start2(++time2)
},1000)  
this.setData({
      interval1: interval1,
})
onUnload: function () {
    // 清除定时器
    this.data.interval1 && clearInterval(this.data.interval1)
}
```

5.setData使用过于频繁，减少setData使用频次，降低性能消耗



## 六、小程序canvas实现多边形雷达图，蜘蛛图
![图片](/images/frontEnd/img_6.png)

```ts
/*
  @description: 多边形，雷达图，蜘蛛图canvas组件
  @author: hhd (2021-12-17)
  @使用方式：
    导入： import myCanvas from '/common/myCanvas';
    雷达图数据配置：
        const configData = {
          canvasW: 700, // canvas宽
          canvasH: 600, // canvas高
          canvasRadius: 200, // 外框半径
          canvasLineWidth: 2, // 外框线宽
          rBorderColor: '#999', // 外框颜色
          rBorderBg: '#e8f9f0', // 外框背景颜色
          rLinklineColor: '#999', // 连接线颜色
          titleFont: 26, // 字体大小
          titleColor: '#999', // 字体颜色
          radarData : [  // 雷达图配置 radarData数量 = 雷达图数量
            {
              color : '#63d798', // 雷达图1颜色
              lineWidth: 2, // 雷达图1线宽
              isFull: false, // 是否填充背景
              mData : [ // mData数量 = 雷达图边数
                { title: "诚信意愿", score: 10, fullScore: 10},
                { title: "合规履约", score: 9, fullScore: 10 },
                { title: "经营能力", score: 6, fullScore: 10 },
              ]
            },
            {
              color : '#dd3239', // 雷达图2颜色
              lineWidth: 2, // 雷达图2线宽
              isFull: false, // 是否填充背景
              mData : [
                { title: "诚信意愿", score: 10, fullScore: 10},
                { title: "合规履约", score: 1, fullScore: 10 },
                { title: "经营能力", score: 2, fullScore: 10 },
              ]
            },
          ]
        }
    调用： myCanvas.radar(configData)
 */


var myCanvas = { 

    radar(configData) {
        const ctx = wx.createCanvasContext("canvas");
        const canvasW = configData.canvasW / this.getRatio(); // canvas宽
        const canvasH = configData.canvasH / this.getRatio(); //canvas高
        const L_RADIUS = configData.canvasRadius / this.getRatio(); // 大圆半径
        const LINE_WIDTH = configData.canvasLineWidth / this.getRatio(); // 线宽
        const rBorderColor = configData.renderBorder; // 外框颜色
        const rBorderBg = configData.rBorderBg; // 外框背景色
        const rLinklineColor = configData.rLinklineColor; // 连接线颜色
        const titleFont = configData.titleFont; // 字体大小
        const titleColor = configData.titleColor; // 字体大小

        //清空画布
        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.save();
        // 重新映射 canvas的 (0, 0)，映射的结果是让canvas的坐标原点位于 canvas的中心位
        ctx.translate(canvasW / 2, canvasH / 2);
        // 多边形的边数
        const mCount = configData.radarData[0].mData.length;
        // 需要旋转多少度，才能将多边形旋转到底边平行于 X轴，奇多边形才需要，偶多边形不需要旋转
        const sAngle = (90 / mCount / 180) * Math.PI;
        let rotateAngle = mCount % 2 === 0 ? 0 : sAngle * (mCount % 4 === 3 ? -1 : 1); //底边平行x轴
        // 多边形外接圆半径
        const lCoordinates = this.getCoordinatesByRadius(L_RADIUS,mCount,-rotateAngle);
        // 绘制边框线
        this.renderBorder(ctx,rBorderColor, LINE_WIDTH, L_RADIUS, -rotateAngle, mCount,rBorderBg);
        // 绘制连接线
        this.renderLinkLine(ctx, 0,0,lCoordinates,rLinklineColor,LINE_WIDTH);
        // 绘制文字
        this.drawText(ctx,lCoordinates, configData.radarData[0].mData, titleFont / this.getRatio(),titleColor);
        // 绘制雷达图
        configData.radarData.forEach((item) => {
          console.log(item)
          this.drawRadar(ctx,item.mData,L_RADIUS,-rotateAngle,item.color,item.lineWidth,item.isFull);
        });
        ctx.draw();
      },
    

      /**
       * 获取多边形坐标
       * @param mRadius 半径
       * @param mCount 边数
       * @param rotateAngle 旋转角度
       * @return {Array}
       */
      getCoordinatesByRadius(mRadius, mCount, rotateAngle = 0) {
        const mAngle = (Math.PI * 2) / mCount;
        let coordinates = [];
        for (let i = 1; i <= mCount + 1; i++) {
          let x = mRadius * Math.cos(mAngle * (i - 1) + rotateAngle);
          let y = mRadius * Math.sin(mAngle * (i - 1) + rotateAngle);
          coordinates.push([x, y]);
        }
        return coordinates;
      },
    
    
      /**
       * 绘制边框
       * @param cxt 上下文
       * @param color 线框颜色
       * @param lineWidth 线宽
       * @param radius 半径
       * @param rotateAngle 旋转角度
       * @param background 背景色
       */
      renderBorder(ctx,color,lineWidth,radius,rotateAngle,mCount,background) {
        let coordinates = this.getCoordinatesByRadius(radius,mCount,rotateAngle);
        ctx.beginPath();
        coordinates.forEach((coordinate, index) => {
          if (index == 0) {
            ctx.moveTo(coordinate[0], coordinate[1]);
          } else {
            ctx.lineTo(coordinate[0], coordinate[1]);
          }
        });
        ctx.setStrokeStyle(color);
        ctx.setLineWidth(lineWidth);
        ctx.stroke();
        if (background) {
          ctx.setFillStyle(background);
          ctx.fill();
        }
        ctx.closePath();
      },
    
    
      /**
       * 绘制连接线
       * @param ctx 上下文
       * @param centerX 中心x
       * @param centerY 中心y
       * @param coordinates 外边框坐标
       * @param color 连线颜色
       * @param lineWidth 连线宽度
       */
      renderLinkLine(ctx, centerX, centerY, coordinates, color, lineWidth) {
        coordinates.forEach((coordinate, index) => {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(coordinate[0], coordinate[1]);
          ctx.setStrokeStyle(color);
          ctx.setLineWidth(lineWidth);
          ctx.stroke();
          ctx.closePath();
        });
      },
    
    
      /**
       * 绘制雷达图
       * @param ctx 上下文
       * @param mData 企业参数
       * @param lRadius 半径
       * @param rotateAngle 旋转角度
       * @param color 雷达图颜色
       * @param lineWidth 雷达图线宽
       * @param isFill 是否填充
       */
      drawRadar(ctx, mData, lRadius, rotateAngle = 0, color,lineWidth = 2, isFill = false,) {
        const mCount = mData.length;
        let radius = [];
        mData.forEach((item, index) => {
          radius.push((item.score / item.fullScore) * lRadius);
        });
        radius.push((mData[0].score / mData[0].fullScore) * lRadius);
        const mAngle = (Math.PI * 2) / mCount;
        let coordinates = [];
        for (let i = 1; i <= mCount + 1; i++) {
          let x = radius[i - 1] * Math.cos(mAngle * (i - 1) + rotateAngle);
          let y = radius[i - 1] * Math.sin(mAngle * (i - 1) + rotateAngle);
          coordinates.push([x, y]);
        }
        ctx.beginPath();
        coordinates.forEach((coordinate, index) => {
          if (index == 0) {
            ctx.moveTo(coordinate[0], coordinate[1]);
          } else {
            ctx.lineTo(coordinate[0], coordinate[1]);
          }
        });
        ctx.setStrokeStyle(color);
        ctx.setLineWidth(lineWidth);
        ctx.stroke();
        if(isFill){
          ctx.setFillStyle(color);
          ctx.fill();
        }
        ctx.closePath();
        this.drawCircle(ctx,coordinates,color)
      },
    

      /**
       * 绘制圆点
       * @param ctx 上下文
       * @param coordinates 圆点坐标
       * @param color 圆点颜色
       */
      drawCircle: function(ctx,coordinates,color){
        ctx.fillStyle = color;
        ctx.beginPath();
        coordinates.forEach((coordinate, index) => {
          ctx.arc(coordinate[0], coordinate[1], 4, 0, Math.PI * 2, true);
          ctx.closePath()
        });
        ctx.fill();
      },
    
    
      /**
       * 绘制文字
       * @param ctx 上下文
       * @param coordinates 文字坐标
       * @param mData 文字数据
       * @param fontSize 文字大小
       * @param color 文字颜色
       */
      drawText(ctx, coordinates, mData, fontSize, color) {
        const yArr = coordinates.map(coordinate => {
          return coordinate[1];
        });
        const maxY = Math.max(...yArr); //最高点
        const minY = Math.min(...yArr); // 最低点
        const moveDistance = 15 / this.getRatio();
        ctx.setFontSize(fontSize);
        ctx.setFillStyle(color);
        coordinates.forEach((coordinate, index) => {
          if (mData[index]) {
            let x = coordinate[0];
            let y = coordinate[1];
            if (maxY == coordinate[1]) {
              y += moveDistance;
              ctx.setTextAlign("center");
              ctx.setTextBaseline("top");
            } else if (minY == coordinate[1]) {
              ctx.setTextBaseline("bottom");
              ctx.setTextAlign("center");
              y -= moveDistance;
            } else if (coordinate[0] < 0) {
              ctx.setTextAlign("right");
              ctx.setTextBaseline("middle");
              x -= moveDistance;
            } else if (coordinate[0] > 0) {
              ctx.setTextAlign("left");
              ctx.setTextBaseline("middle");
              x += moveDistance;
            }
            ctx.fillText(mData[index].title, x, y);
          }
        });
      },


      /**
       * 获取系统信息
       */
      getRatio() {
        let systemInfo = wx.getSystemInfoSync();
        let ratio = 750 / systemInfo.windowWidth; // rpx/px比例
        return ratio;
      },

}


module.exports = myCanvas;
```



## 七、接口数据缓存方案

### data数据缓存
```ts
// 声明Map对象缓存数据******
const dataCache = new Map()

    let key = name
    // 从data 缓存中获取 数据******
    let data = dataCache.get(key)
    if(data){
      // 返回缓存数据******
      console.log(name)
      console.log(data)
      return new Promise ((resolve, reject) => {
        return resolve(data)
      })
    }else{
      // 没有缓存重新请求接口******
      console.log(dataCache)
      
      return new Promise((resolve, reject) => {
        http.request(
        ).then(res => {
            
          dataCache.set(key, res) // 设置缓存******
          
          return resolve(res)
        }).catch(err => {
            
          dataCache.delete(key) // 清除异常数据******
          
          hideLoading()
          return reject(err)
        })
      })
    }

```

### 接口缓存promise方案
- 开关控制，设置有效期，惰性+主动删除过期数据，key名=接口名+参数，map()，promise缓存同一时间同一接口并发
```ts
// promise方案

class ItemCache {
  constructor(promise, timeout) {
      // data可存返回数据，也可存promise
      this.promise = promise
      // 设定超时时间，设定为多少秒
      this.timeout = timeout
      // 创建对象时候的时间，大约设定为数据获得的时间
      this.cacheTime = (new Date()).getTime()
  }
}
class ExpriesCache {
  // 定义静态数据map来作为缓存池
  static cacheMap =  new Map()
  // 数据是否超时
  static isOverTime(name) {
      const promise = ExpriesCache.cacheMap.get(name)
      // 没有数据 判定超时
      if (!promise) return true
      // 获取系统当前时间戳
      const currentTime = (new Date()).getTime()        
      // 获取当前时间与存储时间的过去的秒数
      const overTime = (currentTime - promise.cacheTime) / 1000
      // 如果过去的秒数大于当前的超时时间，也返回null让其去服务端取数据
      if (Math.abs(overTime) > promise.timeout) {
          // 惰性清除过期数据
          ExpriesCache.cacheMap.delete(name)
          return true
      }
      // 不超时
      return false
  }
  // 当前data在 cache 中是否超时
  static has(name) {
      return !ExpriesCache.isOverTime(name)
  }
  // 删除 cache 中的 data
  static delete(name) {
      return ExpriesCache.cacheMap.delete(name) 
  }
  // 获取缓存
  static get(name) {
      const isDataOverTiem = ExpriesCache.isOverTime(name)
      console.log(isDataOverTiem)
      //如果 数据超时，返回null，但是没有超时，返回promise
      return isDataOverTiem ? null : ExpriesCache.cacheMap.get(name).promise
  }
  // 设置存储，默认过期时间600秒
  static set(name, promise, timeout = 600) {
      // 设置 itemCache
      const itemCache = new ItemCache(promise, timeout)
      // 缓存
      ExpriesCache.cacheMap.set(name, itemCache)
      // 定时器主动清除过期数据
      setTimeout(()=>{
        console.log('删除改过期数据',name)
        ExpriesCache.delete(name)
      }, timeout*1000)
      console.log(ExpriesCache.cacheMap)
  }
  // 声明key接口名 name+参数拼接
  static getName(name,params) {
    const paramsUrl = tool.paramsUrl(params)
    const key = name + paramsUrl
    return key
  }
}


actions.forEach(item => {
  let name = item.name || item.action;
  api[name] = async params => {
    params = params || {}
    for (let i in params) {
      params[i] = params[i] != 0 ? params[i] || '' : params[i];
    }
    let result = await api.getopenid();
    let opendata = {
      openid: result["openid"],
      sign: result["sign"]
    }
    if (item.action === 'get_union_id' || item.action === 'wx_decode_data') {
      opendata["session_key"] = result['session_key'];
    }

    // 是否开启缓存,获取属性后删除
    // let isCache = params && params.isCache
    // params && params.isCache && delete params.isCache

    let isCache = true
    // 生成key
    let key = ExpriesCache.getName(name,params);
    // 获得数据
    let promise = ExpriesCache.get(key)
    if(isCache && promise){
      // 返回缓存数据******
      console.log(key)
      return promise
    }else{
      const promise = new Promise((resolve, reject) => {
        http.request({
          url: item.url,
          data: {
            action: item.action,
            t: Date.now(),
            ...opendata,
            ...params,
          }
        }).then(res => {
          return resolve(res)
        }).catch(err => {
          hideLoading()
          return reject(err)
        })
      })
      // 添加请求状态
      isCache && ExpriesCache.set(key, promise, 10,) 
      return promise
    }
  }
})
```



## 八、小程序工具函数封装
```ts
/*
  @description: 工具函数模块
  @author: hhd (2021-11-23)
  @使用方式：
    导入： import tool from '/common/tool';
    调用： tool.isTelMobile(this.data.phone)
 */


var tool = { 

  /************************ 正则验证函数 ***********************/
  /**
   * 身份证号码验证
   * @param {number} value 
   * @returns {boolean}
   */
  checkIdCard: function (value) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(value);
  },


  /**
   * 手机号码+固定电话验证
   * @param {number} value 
   * @returns {boolean}
   */
  isTelMobile: function (value) {
    let reg = /^((0\d{2,3}-?\d{7,8})|(1[3465789]\d{9}))$/;
    return reg.test(value);
  },


  /**
   * 手机号码验证
   * @param {number} value 
   * @returns {boolean}
   */
  isMobile: function (value) {
    let reg = /^1[3456789]\d{9}$/;
    return reg.test(value);
  },


  /**
   * 固定电话验证
   * @param {number} value 
   * @returns {boolean}
   */
  isTel: function (value) {
    let reg = /^0\d{2,3}-?\d{7,8}$/;
    return reg.test(value);
  },


  /**
   * 邮箱验证
   * @param {number} value 
   * @returns {boolean}
   */
  isEmail: function (value) {
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(value);
  },


  /**
   * 数字验证
   * @param {number} value 
   * @returns {boolean}
   */
  isNumber: function (value) {
    let reg = /^[0-9]*$/;
    return reg.test(value);
  },


  /**
   * 中文汉字验证
   * @param {number} value 
   * @returns {boolean}
   */
  isChinese: function (value) {
    let reg = /^[\u4e00-\u9fa5]{0,}$/;
    return reg.test(value);
  },


  /************************* 字符串处理函数 ************************/
  /**
   * 手机号中间四位变成*, 手机号隐藏
   * @param {string,number} value 
   * @returns {string}
   */ 
  telFormat : function (value) {
    let tel = String(value); 
    return tel.substr(0,3) + "****" + tel.substr(7);
  },


  /**
   * 获取url链接参数，返回参数对象
   * @param {string} url 
   * @returns {object}
   */  
  getUrlOptions : function (url) {
    let params = url.split("?")[1].split("&")
    let obj = {}
    params.map(item => obj[item.split("=")[0]] = item.split("=")[1])
    return obj
  },


  /**
   * 键值对拼接成URL参数
   * @param {object} obj 键值对参数
   * @returns {string} url参数
   */  
  paramsUrl : function (obj) {
    let params = []
     for (let key in obj) {
       params.push(`${key}=${obj[key]}`);
     }
     return params.join('&')
  },


  /************************** 时间操作函数 ************************/
  /**
   * 获取当前时间
   * @returns {string}
   */  
  getNowTime : function () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate() >= 10 ? now.getDate() : ('0' + now.getDate());
    const hour = now.getHours() >= 10 ? now.getHours() : ('0' + now.getHours());
    const miu = now.getMinutes() >= 10 ? now.getMinutes() : ('0' + now.getMinutes());
    const sec = now.getSeconds() >= 10 ? now.getSeconds() : ('0' + now.getSeconds());
    return +year + "年" + (month + 1) + "月" + date + "日 " + hour + ":" + miu + ":" + sec;
  },


  /**
   * 格式化时间
   * @param {string} formater 时间格式 YYYY-MM-DD HH:mm:ss
   * @param {string,Date} time 传入时间
   * @returns {string}
   * @description dateFormater('YYYY-MM-DD HH:mm:ss')  默认取当前时间
   * @description dateFormater('YYYY年MM月DD日', this.data.time)
   */  
  dateFormater : function (formater, time) {
    let date = time ? new Date(time) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
    return formater.replace(/YYYY|yyyy/g, Y)
      .replace(/YY|yy/g, Y.substr(2, 2))
      .replace(/MM/g,(M<10 ? '0' : '') + M)
      .replace(/DD/g,(D<10 ? '0' : '') + D)
      .replace(/HH|hh/g,(H<10 ? '0' : '') + H)
      .replace(/mm/g,(m<10 ? '0' : '') + m)
      .replace(/ss/g,(s<10 ? '0' : '') + s)
  },

}

module.exports = tool;
```



## 九、全局loading解决方案
- 未解决同步请求闪烁问题
- 可以用axios拦截器，或者函数工具封装
```ts
let loadingCount = 0 // 记录当前正在请求的数量
let isLoading = false // 是否存着loading
return new Promise(function (res, rej) {
  if (loadingCount === 0 && !isLoading) {
    wx.showLoading({
      title: '加载中',
    })
    isLoading = true
  }
  loadingCount += 1;
  wx.request({
    url: obj.url ? obj.url : baseApi,
    data: obj.data ? obj.data : {},
    method: obj.method ? obj.method : 'GET',
    header: header,
    success: function (response) {
      res(response.data);
    },
    fail: function (err) {
      rej(err);
    },
    complete: function(){
      if (loadingCount <= 0) {
        return;
      }
      console.log(loadingCount)
      loadingCount -= 1;
      if (loadingCount === 0 && isLoading) {
        wx.hideLoading()
        isLoading = false
      }
    }
  })
})
```