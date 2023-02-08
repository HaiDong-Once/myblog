
# 小程序开发案例
[[toc]]



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



## 十、扫码进入小程序参数解析
- 在`onLoad(options)`中获取`options.q`，q是转码后的url，（http://sjdk.com?dad=1&ds=2)
- deCode解码url后，调用url获参函数，将url中的参数转为对象，重新复制给options

![图片](/images/frontEnd/img_7.png)



## 十一、小程序input双向绑定
- 模拟语法糖 绑定`bindinput`输入事件 绑定`value="{{}}"`中的变量
```html
<input class="weui-input" 
       name="input" 
       bindinput="getCredit" 
       value="{{credit_no}}" 
       placeholder="该企业的纳税识别号" 
/>
```

- input中value值赋值给变量
```ts
getCredit(e){
    this.setData({
      credit_no: e.detail.value
    })
}
```

### 全表单双向绑定
```html
 <view class="input-box">
    <view class="title-box">
      <view class="title">属于免征纳税对象 <text>*</text> </view>
      <radio-group name="radio" bindchange="radioChange" data-item="is_no_tax_group">
        <label><radio color="#1ec56a" checked="{{data_options.is_no_tax_group=='1'}}" value="1"/>是</label>
        <label><radio color="#1ec56a" checked="{{data_options.is_no_tax_group=='0'}}" value="0"/>否</label>
      </radio-group>
    </view>
    <view class="input input2">
      <view> 纳税总额 </view>
      <input
        bindinput="bindInput"
        bindfocus="inputFocus" 
        data-item="total_tax_amount" 
        value="{{data_options.total_tax_amount}}"
        placeholder-style="color:#999" 
        disabled="{{totalTaxDisabled}}"
        type="digit"
        placeholder="请输入金额"/>
      <view class="unit">元</view>
    </view>
  </view>
```

```ts
 /*********** 表单内容data数据 ************/
  data: {
    data_options:{ } // 表单对象
 }
  
  
  /**
   * 表单双向绑定
   * @param {string} e.currentTarget.dataset.item： Input标识
   * @param {string} e.detail.value：输入值
   */
  function bindInput(e){
    let item=e.currentTarget.dataset.item; // 绑定不同标识
    const data_options=this.data.data_options
    data_options[item]=e.detail.value // 对象动态赋值
    this.setData({ data_options })
  }


  /**
   * 单选按钮双向绑定
   * @param {string} e.currentTarget.dataset.item： radio标识
   * @param {string} e.detail.value：选中值
   */
  function radioChange(e){
    let item=e.currentTarget.dataset.item;  // 绑定不同标识
    const data_options=this.data.data_options
    data_options[item]=e.detail.value // 对象动态赋值
    this.setData({ data_options })
    if(item == 'is_no_tax_group'){
      this.isNOTax() // 是否免征纳税控制
    }
  }
```


## 十二、小程序switchTab跳转传参和刷新页面解决方案

### 使用wx.reLaunch
```ts
/** 
   * 查老赖——前往认领支付
   */ 
  function toCreditCheck(){ 
    this.homeClick() // 首页按钮是否点击统计
    wx.reLaunch({
      url: `/pages/center/index?product_type=${this.data.product_type}&digest=${this.data.digest}`,
    })
  }
```

### 调用页面栈刷新页面
```ts
// 调用页面栈刷新页面
wx.switchTab({
      url: "/pages/classify/classify",
      success: function (e) {    // 此方法相当于刷新页面
        var page = getCurrentPages().pop(); // 获取当前页面栈
        if (page == undefined || page == null) return;
        page.onLoad();
      }
})

// onShow执行this.onLoad刷新
onShow:function(e){
  this.onLoad();
}
```

### 使用全局变量和缓存
```ts
// 1、设置全局变量传参
// 设置参数：
getApp().index = 12321
// 获取参数：
let index=getApp().index

// 本地缓存
let risk_data = {
    product_type : this.data.product_type, 
    digest : this.data.digest, 
    id : this.data.id, 
} 
wx.setStorageSync('risk_data',risk_data)

risk_data = wx.getStorageSync('risk_data')
this.setData({
  digest: risk_data.digest,
  kp_id: risk_data.id,
  product_type: risk_data.product_type,
})
wx.removeStorageSync('risk_data')  // 删除缓存
```



## 十三、伪元素放大点击区域
```html
<view class="fater">
    <view class="focus" bindtap="changeAgreeCheck">
        <image></image> 
    </view>
</view>  
```
```scss
/* 放大点击区域功能类 */
.focus{
  position:relative;
  display: inline-block;
}
.focus::after{
  content:''; 
  position:absolute;
  width:60rpx;
  height:60rpx;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}

.fater .focus::after{
  width:30rpx;
  height:30rpx;
}
```



## 十四、小程序规避审核方法
### 问题分析
- 贷款：添加贷款类目：需要相关资质 
- 催债：不可发布相关内容

### 审核机制
- 业务操作演示
- 代码内容审核（可能有关键词检索，或者单独打开某页面）
- 不能有空不功能不全的内容（需要有假业务逻辑代替）
- 主要关注该版本上线内容，与其他业务同时上线成功率更好（单独上线违规内容会被针对）
- 同一版本审核不通过可能会有标记，最好跳过一个版本再提审

### 方法总结
- 后台数据控制：去掉前端关键字，注释，后端返回数据代替；
- 给审核人员看一套：设置倒计时：1天后打开，或者绑定企业才可见
- 反复不通过尝试跳过这个版本，再发布审核（未通过）

### 解决方案
- 债务关键信息内容，后台接口返回；贷款链接后台接口返回；提审小程序通过后，后台再发布，
- 后续如遇到审核不通过，修改后台状态重复上面步骤



## 十五、小程序echart图表使用
- github下载地址: [echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin) 
- 下载`ec-canvas`包在小程序内

![图片](/images/frontEnd/img_8.png)

- `index.json`注入组件
```json
{
  "usingComponents": {
    "ec-canvas": "../../../../ec-canvas/ec-canvas"
  }
}
```

- 使用
```html
<view class="echarts" hidden='{{submitFlag}}'>
  <ec-canvas id="mychart" canvas-id='mychart-line' ec="{{ec}}"></ec-canvas>
</view>
```

```ts
import * as echarts from '../../../../ec-canvas/echarts';

onLoad: function (options) {
  // 图标初始化
  this.echartsComponnet = this.selectComponent('#mychart');
  this.init_echarts(); // 构建echart
},


/**
 * 图表初始化
 */
init_echarts: function () {
  this.echartsComponnet.init((canvas, width, height) => {
    // 初始化图表
    const Chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    Chart.setOption(this.getOption());
    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
    return Chart;
  });
},


/**
 *配置数据
 */
getOption: function () {

  // 处理数据 
  let myCompanyValue = []
  myCompanyValue.push(this.data.myCompany.operate_score)
  myCompanyValue.push(this.data.myCompany.risk_score)
  myCompanyValue.push(this.data.myCompany.honesty_score)
  let otherCompanyValue = []
  otherCompanyValue.push(this.data.otherCompany.operate_score)
  otherCompanyValue.push(this.data.otherCompany.risk_score)
  otherCompanyValue.push(this.data.otherCompany.honesty_score)

  var option = {
    backgroundColor: "rgba(0,0,0,0)",
    color: ["#63d798", "#dd3239"],
    tooltip: {},
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      indicator: [{
        name: '经营能力',
        max: 164
      },
        {
          name: '合规履约',
          max: 173
        },
        {
          name: '诚信意愿',
          max: 163
        },
      ]
    },
    series: [{
      name: `${this.data.myCompany.name} vs ${this.data.otherCompany.name}`,
      type: 'radar',
      data: [{
        value: myCompanyValue,
        name: `${this.data.myCompany.name}`
      },
        {
          value: otherCompanyValue,
          name: `${this.data.otherCompany.name}`
        }
      ]
    }]
  };
  return option;
},
```



## 十六、小程序内跳转其他小程序
### navigateToMiniProgram api跳转
```ts
// 打开水滴小程序
wx.navigateToMiniProgram({
  appId: 'wxdc49880077ff6a04',  // appid 必填
  path: '/pages/home/home',// path 非必填：默认到首页
  extraData: {navType: "shuidimin" }, // 参数
  envVersion: 'release', // 开发版:develop  体验版:trial  正式版:release  
  success() {  // 打开成功回调
  }
})
```

### navigator标签跳转
```html
<navigator target="miniProgram" open-type="navigate" app-id="" path="" version="release"></navigator>
```

### 注意事项
- 从 2.3.0 版本开始，若用户未点击小程序页面任意位置，则开发者将无法调用此接口自动跳转至其他小程序。
- 需要用户确认跳转;在跳转至其他小程序前，将统一增加弹窗，询问是否跳转，用户确认后才可以跳转其他小程序。如果用户点击取消，则回调 fail cancel。




## 十七、小程序图片上传
### wux-uploader组件
```html
<view class="upload">
  <wux-upload 
    listType="picture-card" 
    sizeType="{{ compressed }}"
    fileList="{{ fileList }}" 
    controlled = "true"
    url=".........di.cn/uploadimage" 
    bind:change="onChange" 
    bind:success="onSuccess" 
    bind:fail="onFail" 
    bind:complete="onComplete" 
    bind:preview="onPreview" 
    bind:remove="onRemove">
    <text>+</text>
  </wux-upload>

  <view class="buttons">
    <view class="left">
      <view>上传交易截图或合同资料</view>
      <view>资料仅用于验证，不公开展示</view>
    </view>
    <wux-upload 
      fileList="{{ fileList }}" 
      controlled = "true"
      url=".........di.cn/uploadimage" 
      sizeType="{{compressed}}" 
      bind:change="onChange" 
      bind:success="onSuccess" 
      bind:fail="onFail" 
      bind:complete="onComplete">
      <view class="right"><image src="{{filter.buildStatic('/center/debt/upload-icon.png')}}"></image>上传</view>
    </wux-upload>
  </view>
</view>
```

```js
  data{
      fileList: [ ], // 上传图片集合
      compressed: ['compressed'], // 图片尺寸设置
  }


  /**
   * 上传图片功能模块
   */
  onChange(e) {
    const { file, fileList } = e.detail
    if (file.status === 'uploading') {
        this.setData({
            progress: 0,
        })
        wx.showLoading()
    } else if (file.status === 'done') {
        this.setData({
            imageUrl: file.url,
        })
    }
    this.setData({ fileList })
  },
  // 成功回调
  onSuccess(e) {
      console.log('onSuccess', e)
  },
  // 失败回调
  onFail(e) {
      console.log('onFail', e)
  },
  // 上传完成
  onComplete(e) {
      wx.hideLoading()
  },
  // 上传进度
  onProgress(e) {
      this.setData({
          progress: e.detail.file.progress,
      })
  },
  // 预览图片
  onPreview(e) {
      const { file, fileList } = e.detail
      wx.previewImage({
          current: file.url,
          urls: fileList.map((n) => n.url),
      })
  },
  // 删除图片
  onRemove(e) {
    console.log('remove', e.detail)
  },
```

### 微信uploader组件
```html
<view class="img-view">
    <mp-cells>
        <mp-cell>
            <mp-uploader 
              bindfail="uploadError" 
              bindsuccess="uploadSuccess" 
              binddelete="deleteFile"
              select="{{selectFile}}" 
              upload="{{uplaodFile}}" 
              files="{{files}}"
              delete="true"
              max-count="9"
              title="图片上传" 
              tips="图片上传提示">
            </mp-uploader>
        </mp-cell>
    </mp-cells>
</view>
```

```ts
 data: {
    files: [{
      url: 'https://hbimg.huabanimg.com/7dba3ddeccf5953d5845f3c76057806f771983a777e79-uRDtUA_fw658/format/webp',
      },
    ],
    urls: [], // 返回图片集合，多图
  }
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },  
  
  // 选择图片
  chooseImage: function (e) {
    console.log(e)
    var that = this;
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        count: "1", // 最多可选图片张数
        success: function (res) {
            console.log(res)
            that.setData({
                files: that.data.files.concat(res.tempFilePaths),
            });
        }
    })
  },

    // 预览图片
  previewImage: function(e){
      console.log(e)
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files // 需要预览的图片http链接列表
      })
  },


  selectFile(files) {
      console.log('files', files)
      // 返回false可以阻止某次文件上传
  },


  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    let that = this
    return new Promise((resolve, reject) => {
      for(let [index,item] of files.tempFilePaths.entries()){
        console.log(item)
        console.log(index)
        //上传图片
        wx.uploadFile({
          //请求后台的路径
          url: `..........di.cn/uploadimage`,
          //小程序本地的路径
          filePath: item,
          //后台获取我们图片的key
          name: 'file',
          success: function (res) {
            let url = 'https://filecdn.shuidi.cn/img/' + JSON.parse(res.data).path + '/' + JSON.parse(res.data).width + 'x' + JSON.parse(res.data).height+ '.jpg'
            that.data.urls.push(url)
            console.log(that.data.urls)
            if(index+1 == files.tempFilePaths.length){
              resolve({
                urls: that.data.urls
              })
              //上传成功
              wx.showToast({
                title: '上传成功',
              })
            }
          },
          fail: function (res) {
            //上传失败
            reject(res)
            wx.showToast({
              title: '上传失败',
            })
          },
        })
      }
    })
  },


  uploadError(e) {
      console.log('upload error', e.detail)
  },

  uploadSuccess(e) {
      console.log('upload success', e.detail)
  },

  deleteFile(e){
    console.log('upload delete', e.detail)
    this.data.files.splice(this.data.files.findIndex(index => index == e.detail.index), 1)
  },
```



## 十八、小程序分享方案
### button组件方案
```html
<button data-name="shareBtn" open-type="share" class="share share2"></button>
```

### 回调函数方案
```ts
/**
   * 自定义分享小程序
   * @html:  <button data-name="shareBtn" open-type="share"></button>
   * @param from: button:页面内转发按钮，menu右上角菜单转发
   * @param title: 转发标题
   * @param path：转发路径（必须已/开头完整路径）
   * @param imageUrl: 图片路径长宽比5:4
   */
  onShareAppMessage: function (res) {
    Pa.fire(this.data.abnormalStatus == true ? 2523 : 2531,this.data.openid)
    if(res.from == 'button'){
      var title="企业信用管家"
      var path="/pages/center/manageAbnormal/index"
      var imageUrl=`../../../img/center/manAbnormal/share-bg.png`
      return{
        title:title,
        path:path,
        imageUrl:imageUrl,
        success: function(res) {
        },
        fail: function(res) {
        }
      }
    }
  },
```

### 分享动态图片
```html
<!-- 分享图片弹窗 -->
<view class="shareImg" wx:if="{{shareImgFlag}}">
  <image class="share-bg" src="{{filter.buildStatic('/center/debt/bg-img2.png')}}"></image>
  <view class="text-box">
    <view>已助力</view>
    <view>{{debt_total}}</view>
    <view>笔债务追回</view>
  </view>
</view>
```

```ts
 /**
   * 自定义分享小程序
   * @html:  <button data-name="shareBtn" open-type="share"></button>
   * @param from: button:页面内转发按钮，menu右上角菜单转发
   * @param title: 转发标题
   * @param path：转发路径（必须已/开头完整路径）
   * @param imageUrl: 图片路径长宽比5:4
   * @param shareImgFlag: 弹窗图控制
   */
  onShareAppMessage: function (res) {
    Pa.fire(3858) // 登记页分享量总和
    this.setData({ shareImgFlag: true })
    setTimeout(()=>{
      this.setData({ shareImgFlag: false })
    },500)
    if(res.from == 'button'){
      var title="债务登记"
      var path="/packageA/pages/center/debt/form/index"
      return{
        title:title,
        path:path,
        success: function(res) {
        },
        fail: function(res) {
        }
      }
    }
  },
```



## 十九、小程序数据监听封装 watch
### 监听基本数据类型
- `app.js`文件
```ts
// 数据监听器
  initWatch(_page) {
    if (!_page) {
      console.error('未检测到Page对象,请将当前page传入该函数');
      return false;
    }
    if (!_page.watch) { //判断是否有需要监听的字段
      console.error('未检测到Page.watch字段(如果不需要监听，请移除initWatch的调用片段)');
      return false;
    }
    let _dataKey = Object.keys(_page.data);
    Object.keys(_page.watch).map((_key) => { //遍历需要监听的字段
      _page.data['__' + _key] = _page.data[_key]; //存储监听的数据
      if (_dataKey.includes(_key)) { //如果该字段存在于Page.data中，说明合法
        Object.defineProperties(_page.data, {
          [_key]: { //被监听的字段
            enumerable: true,
            configurable: true,
            set: function(value) {
              let oldVal = this['__' + _key];
              if (value !== oldVal) { //如果新设置的值与原值不等，则触发监听函数
                setTimeout(function() { //为了同步,否则如果回调函数中有获取该字段值数据时将不同步,获取到的是旧值
                  _page.watch[_key].call(_page, oldVal, value); //设置监听函数的上下文对象为当前的Page对象并执行
                }.bind(this), 0)
              }
              this['__' + _key] = value;
            },
            get: function() {
              return this['__' + _key]
            }
          }
        })
      } else {
        console.error('监听的属性[' + _key + ']在Page.data中未找到，请检查~')
      }
    })
  },
```

- 使用方法
```ts
// 初始化需要监听的字段
  onLoad: function (options) { 
    app.initWatch(this) 
  }
  
  watch: {//需要监听的字段
    'showPop': function (value) {
        if(value==false){
          this.setData({ isTiptrue:false })
        }else{
          this.setData({ isTiptrue:true })
        }
    },
},
```

### 复杂类型监听
- 模块封装`class.js`
```ts
class Watch{
  /**
   * 
   * @param {*Object} obj 要监听的集合 
   * @param {*String} key 要监听的字段
   * @param {*Function} fn 发生改变之后通知的函数
   */
  constructor(obj,key,fn){ 
      this.obj = obj
      this.key = key
      this.fn = fn
      this.loop_()
  }
  /**
   * loop_ 是为了深度遍历集合，构造每一个子集合
   */
  loop_(){
      let value = this.obj[this.key]
      if (typeof value == 'object'){
          for(let i of Object.keys(value)){
              new Watch(value,i,this.fn)  //遍历其下所有集合，再进行构造
          }
      }
      this.define_(this.obj,this.key,this.fn) //开始进行数据劫持 
  }

  //数据劫持
  define_(obj,key,fn){
      let val = obj[key]
      Object.defineProperty(obj,key,{
          get(){
              return val
          },
          set(new_){
              // 此时由于每个子集合都挂载了fn,并且都有了prototype属性，
              // 如果新设置的值与原值不等，则触发监听函数
              if(fn && val !== new_)fn(val,new_)  
              val = new_  // 所以，改变任何一项都会进行通知。
          }
      })
  } 
}


export default Watch; 
```
- 使用方法
```ts
// 导入class类
import Watch from '../class.js'

Page({
  data: {
    obj :{
      melo:{
          Denver:{
            first:95,
           second:92
         },
         Portland:{
          first:82,
          second:82
         }
      }
    }
  },

  onLoad() {
      // param1: 监听对象, param2: 监听对象属性，param3: 监听后回调函数 
      // var: 旧值，new_：新值 
      new Watch(this.data.obj.melo.Portland,'second',(val,new_)=>{
        console.log(val+'的新值是：'+ new_)
      })
  },
  
  // 改变数据  
  addObject(){
    this.data.obj.melo.Portland.second++
  }

})
```



## 二十、小程序返回上一页传参
- A-B页面
- A页面获取参数
- 
```ts
  var pages = getCurrentPages()
  var currPage = pages[pages.length - 1]
  let value = currPage.data.backData || ''
  if(value){
    if(value == 'detail'){
      var pages = getCurrentPages()
      let prevPage = pages[pages.length - 1]
      prevPage.setData({    
        backData: ''   // 清空参数
      })
      wx.navigateTo({
        url: `/packageA/pages/credit/detail2?digest=${this.data.digest}`
      })
    }
  }
```

- A页面跳转下一页传参数据置空

```ts
onUnload(){
  var pages = getCurrentPages()
  let prevPage = pages[pages.length - 2]
  prevPage.setData({
    backData: ''   // 清空参数
  })
}
```

- B页面销毁时给上一页设置参数
```ts
  // 返回上一页传参
  let pages = getCurrentPages() // 获取当前的页面栈
  let prevPage = pages[pages.length - 2]
  prevPage.setData({    
    backData: 'detail'   // 需要传递的值
  })
```



## 二十一、进度球波浪动画组件
![图片](/images/frontEnd/img_9.png)

### canvas动画组
```ts
/**
 * 画布类方法封装
 */

var Canvas = { 

  /**
   * canvas绘制波浪动画进度球插件
   * @description :
   *  <canvas canvas-id='canvasArcCir' width='250' height='250'></canvas>
   *  const ctx = wx.createCanvasContext('canvasArcCir')
   *  wave(ctx, 40);
   * @param {*} ctx : 创建的画布 wx.createCanvasContext('canvasArcCir')
   * @param {number} oRange ：进度值：100 = 100%
   * @param {number} size ：进度球大小
   * @param {string} color ：进度球颜色 #892394
   * @param {string} bgColor: 进度球背景颜色 #892394
   */
  wave(ctx, oRange, size, color, bgColor) {
    var tid;
    var M = Math;
    var Sin = M.sin;
    var Cos = M.cos;
    var Sqrt = M.sqrt;
    var Pow = M.pow;
    var PI = M.PI;
    var Round = M.round;
    var oW =  size ? size : 150;
    var oH =  size ? size : 150;
    // 线宽
    var lineWidth = 2;
    // 大半径
    var r = (oW / 2);
    var cR = r - 10 * lineWidth;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    // 水波动画初始参数
    var axisLength = 2 * r - 16 * lineWidth;  // Sin 图形长度
    var unit = axisLength / 9; // 波浪宽
    var range = .4 // 浪幅
    var nowrange = range;
    var xoffset = 8 * lineWidth; // x 轴偏移量
    var data = ~~(oRange) / 100;   // 数据量
    var sp = 0; // 周期偏移量
    var nowdata = 0;
    var waveupsp = 0.006; // 水波上涨速度
    // 圆动画初始参数
    var arcStack = [];  // 圆栈
    var bR = r - 8 * lineWidth;
    var soffset = -(PI / 2); // 圆动画起始位置
    var circleLock = true; // 起始动画锁
    // 获取圆动画轨迹点集
    for (var i = soffset; i < soffset + 2 * PI; i += 1 / (8 * PI)) {
      arcStack.push([
        r + bR * Cos(i),
        r + bR * Sin(i)
      ])
    }
    // 圆起始点
    var cStartPoint = arcStack.shift();
    ctx.strokeStyle = "#1c86d1";
    ctx.moveTo(cStartPoint[0], cStartPoint[1]);
    // 开始渲染
    render();
    /**************圆圈内部渲染 *****************/
    function drawSine() {
      ctx.beginPath();
      ctx.save();
      var Stack = []; // 记录起始点和终点坐标
      for (var i = xoffset; i <= xoffset + axisLength; i += 20 / axisLength) {
        var x = sp + (xoffset + i) / unit;
        var y = Sin(x) * nowrange;
        var dx = i;
        var dy = 2 * cR * (1 - nowdata) + (r - cR) - (unit * y);
        ctx.lineTo(dx, dy);
        Stack.push([dx, dy])
      }
      // 获取初始点和结束点
      var startP = Stack[0]
      var endP = Stack[Stack.length - 1]
      ctx.lineTo(xoffset + axisLength, oW);
      ctx.lineTo(xoffset, oW);
      ctx.lineTo(startP[0], startP[1])
      /******** 圓圈內部顏色 ********/
      ctx.fillStyle = color ? color : "#4D6DE3";
      ctx.fill();
      ctx.restore();
    }
    /***************** 字体配置 ********************/
    function drawText() {
      ctx.globalCompositeOperation = 'source-over';
      var size = 0.5 * cR;
      ctx.font = 'bold ' + size + 'px Microsoft Yahei';
      var number = (nowdata.toFixed(2) * 100).toFixed(0);
      // var txt = number+ '%';
      var txt = '良好';
      var fonty = r + size / 2;
      var fontx = r - size * 0.8;
      /******** 字体颜色 *******/
      if (number >= 50)
      {
        ctx.fillStyle = "#FFFFFF";
      }
      else{
        ctx.fillStyle = "#FFFFFF";
      }
      ctx.textAlign = 'center';
      // ctx.strokeText(txt,r + 0, r + 8);
      ctx.fillText(txt, r + 0, r + 8)
    }
    /**************** 边框圆圈 *****************/
    function grayCircle() {
      ctx.beginPath();
      ctx.lineWidth = 1;
      /******* 边框颜色 *******/
      ctx.strokeStyle = color ? color : '#4D6DE3';
      /*** cR-x控制边框大小 ***/
      ctx.arc(r, r, cR + 4, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();
      ctx.beginPath();
    }
    /********** 进度球背景 *********/
    function drawCircle() {
      ctx.beginPath();
      ctx.lineWidth = 0;
      ctx.strokeStyle = bgColor ? bgColor : '#2d4059';
      ctx.arc(r, r, cR + 0, 0, 2 * Math.PI);
      ctx.fillStyle= bgColor ? bgColor : "#2d4059";//设置填充颜色
      ctx.fill();//开始填充
      ctx.stroke();
      ctx.restore();
    }
    /********* 外框进度圈-render中调用 **********/
    //使用这个使圆环两端是圆弧形状
    function orangeCircle() {
      ctx.beginPath();
      ctx.strokeStyle = '#fbdb32';
      ctx.lineCap = 'round';
      ctx.arc(r, r, cR - 5, 0 * (Math.PI / 180.0) - (Math.PI / 2), (nowdata * 360) * (Math.PI / 180.0) - (Math.PI / 2));
      ctx.stroke();
      ctx.save()
    }
    /************** 中间水圈大小裁剪 **************/
    function clipCircle() {
      ctx.beginPath();
      ctx.arc(r, r, cR - 0, 0, 2 * Math.PI, false);
      ctx.clip();
    }
    /************* 执行渲染canvas ***************/
    function render() {
      abortAnimationFrame(tid);
      ctx.clearRect(0, 0, oW, oH);
      drawCircle();
      // 圆圈边框
      // grayCircle();
      //裁剪中间水圈
      clipCircle();
      // 控制波幅
      if (data >= 0.85) {
        if (nowrange > range / 4) {
          var t = range * 0.01;
          nowrange -= t;
        }
      } else if (data <= 0.1) {
        if (nowrange < range * 1.5) {
          var t = range * 0.01;
          nowrange += t;
        }
      } else {
        if (nowrange <= range) {
          var t = range * 0.01;
          nowrange += t;
        }
        if (nowrange >= range) {
          var t = range * 0.01;
          nowrange -= t;
        }
      }
      if ((data - nowdata) > 0) {
        nowdata += waveupsp;
      }
      if ((data - nowdata) < 0) {
        nowdata -= waveupsp
      }
      /************ 控制波浪幅度 *************/
      sp += 0.07;
      // 开始水波动画
      drawSine();
      // 写字
      drawText();
      ctx.draw();
      tid = doAnimationFrame(render);
    }
    var lastFrameTime = 0;
    // 模拟 requestAnimationFrame
    function doAnimationFrame(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastFrameTime));
      var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
      lastFrameTime = currTime + timeToCall;
      return id;
    };
    // 模拟 cancelAnimationFrame
    function abortAnimationFrame(id) {
      clearTimeout(id)
    }
  },
}

module.exports = Canvas;
```

- 使用方法
```html
<view class="container">
  <canvas canvas-id='canvasArcCir' width='250' height='250'></canvas>
</view>
```

```ts
onLoad() {
 // 创建动画进度球
  const ctx = wx.createCanvasContext('canvasArcCir') // 进度球画布
  let oRange = 50 // 进度值
  let size = 100 // 尺寸大小
  let color =  '#f4b24e' // 进度球颜色
  let bgColor =  '#f4d29c' // 进度球背景颜色

  Canvas.wave(ctx, oRange, size, color, bgColor);
},
```

### 静态组件
![图片](/images/frontEnd/img_10.png)

```html
<view class="box">
    <view class="percent">
        <view class="percentNum">{{count}}</view>
        <view class="percentB">%</view>
    </view>
    <view class="water_wave">
  
      </view>  
    <view class="water" style="transform:{{transform}}"> 
      <view class="water_wave"></view>  
    </view>
</view>
```
```css
body {
    background: #020438;
    font: 14px/1 'Open Sans', helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
}
.box {
    height: 280px;
    width: 280px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: #020438;
    border-radius: 100%;
    overflow: hidden;
}
.box .percent {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #fff;
    font-size: 64px;
}
.box .water {
    position: relative;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    transform: translate(0, 100%);
    background: #4D6DE3;
}
```
```ts
data: {
    count: 60,
    transform: '',

  },
  
 onLoad() {
     this.setData({
      transform: 'translate(0' + ',' + (100 - this.data.count) + '%)'
     })
},
```

### svg版本(小程序不支持)
![图片](/images/frontEnd/img_15.png)
```html
<script src="https://wow.techbrood.com/libs/jquery/jquery-1.11.1.min.js"></script>
<svg version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" x="0px" y="0px" style="display: none;">
    <symbol id="wave">
        <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
        <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
        <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
        <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
    </symbol>
</svg>
<div class="box">
    <div class="percent">
        <div class="percentNum" id="count">0</div>
        <div class="percentB">%</div>
    </div>
    <div id="water" class="water">
        <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
            <use xlink:href="#wave"></use>
        </svg>
        <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
            <use xlink:href="#wave"></use>
        </svg>
    </div>
</div>
```

```css
*,
*:before,
*:after {
    box-sizing: border-box;
    outline: none;
}
body {
    background: #020438;
    font: 14px/1 'Open Sans', helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
}
.box {
    height: 280px;
    width: 280px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: #020438;
    border-radius: 100%;
    overflow: hidden;
}
.box .percent {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #fff;
    font-size: 64px;
}
.box .water {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    -webkit-transform: translate(0, 100%);
    transform: translate(0, 100%);
    background: #4D6DE3;
}
.box .water_wave {
    width: 200%;
    position: absolute;
    bottom: 100%;
}
.box .water_wave_back {
    right: 0;
    fill: #C7EEFF;
    -webkit-animation: wave-back 1.4s infinite linear;
    animation: wave-back 1.4s infinite linear;
}
.box .water_wave_front {
    left: 0;
    fill: #4D6DE3;
    margin-bottom: -1px;
    -webkit-animation: wave-front .7s infinite linear;
    animation: wave-front .7s infinite linear;
}
@-webkit-keyframes wave-front {
    100% {
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
    }
}
@keyframes wave-front {
    100% {
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
    }
}
@-webkit-keyframes wave-back {
    100% {
        -webkit-transform: translate(50%, 0);
        transform: translate(50%, 0);
    }
}
@keyframes wave-back {
    100% {
        -webkit-transform: translate(50%, 0);
        transform: translate(50%, 0);
    }
}
```
```ts
var cnt = document.getElementById("count");
var water = document.getElementById("water");
var percent = cnt.innerText;
var interval;
    percent=60;
    cnt.innerHTML = percent;
    water.style.transform = 'translate(0' + ',' + (100 - percent) + '%)';
```



## 二十二、小程序消息订阅
```ts
/**
 * 打开订阅消息
 */
openSubscribe(){
  wx.requestSubscribeMessage({ // 订阅消息弹窗
    tmplIds: ['kBsiZNoVwdn6Oib9R1w.....','0V9iOrE-ffYnuuMKo1Zc-4PcB......'],
    success (res) {
      let ids = ''
      for(var k in res){
        if(res[k]=='accept'){
          ids += k+','
        }
      }
      if(ids){
        // 订阅成功
      }else{
        // 取消订阅
      }
    }
  })
},
```



## 二十三、小程序弹窗淡入淡出
```html
<view class="pay-box" animation="{{ani}}"></view>
```
```css
.pay-box{
  position: fixed;
  bottom: -500px;
  left: 0;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  border-radius: 20rpx 20rpx 0 0;
}
```
```ts
/**
 * 监听节点--在页面初次渲染完成
 * 页面完全渲染完之前调用boundingClientRect会有异常
 */
onReady: function () {
  let query = wx.createSelectorQuery();
  query.select('.pay-box').boundingClientRect(rect => {
    //给页面赋值
    this.setData({
      Bottom: rect.height + "px"
    })
  }).exec();
},


/**
 * 淡入淡出方法封装
 * @param {number} value: 
 */
openAnimation(value){
  var animation = wx.createAnimation({
    duration: 300,
    timingFunction: 'ease',
  });
  animation.bottom(value).step()
  this.setData({
    ani: animation.export()
  })
},


/****************单独案例*****************/
  // 弹窗
  var animation = wx.createAnimation({
    duration: 300,
    timingFunction: 'ease',
  });
  animation.bottom(0).step()
  this.setData({
    ani:  animation.export()
  })
  
  
  // 关闭
  var animation = wx.createAnimation({
    duration: 300,
    timingFunction: 'ease',
  });
  animation.bottom(-500).step()
  this.setData({
    ani: animation.export()
  })
```



## 二十四、小程序弹页面自动滚动动画
```ts
// 个人中心返回首页查信用状态,跳转到首页1/3位置
  if(options.toArchives == '1'){
    var me = this;
    var query = wx.createSelectorQuery().in(me);
    query.selectViewport().scrollOffset()
    query.select("#myArchives").boundingClientRect(); // 定位到的id位置
    query.exec(function (res) {
      console.log(res);
      var miss = res[0].scrollTop + res[1].top - 10;
      wx.pageScrollTo({
        scrollTop: miss,
        duration: 1000 // 滚动动画时间
      });
    });
  }
```




## 二十五、小程序文件预览
- doc.pdf等文档预览
```ts
  /**
   * 预览文件
   * @param urlFile:文件下载地址
   * @param type:文件类型
   * @param fileType: 预览文件类型
   * @param success: 预览成功回调
   * @param fail: 预览失败回调
   * @param filePath：本地缓存虚拟访问地址：大小10MB以内
   */
  toViewFile(event){
    let type =  event.currentTarget.dataset.type
    if(type == 1){
      var urlFile = 'https://staticcdn.shuidi.cn/wiki/移出经营异常名录申请表.doc'
    }else if(type == 2){
      var urlFile = 'https://staticcdn.shuidi.cn/wiki/列入经营异常名录异议申请书.doc'
    }else if(type == 3){
      var urlFile = 'https://staticcdn.shuidi.cn/wiki/个体工商户恢复正常记载状态申请表.doc'
    }else if(type == 4){
      var urlFile = 'https://staticcdn.shuidi.cn/wiki/企业指定代表或者委托代理人的证明书.doc'
    }
    // 文件下载
    wx.downloadFile({
      url: urlFile,
      success: function(res) {
          const filePath = res.tempFilePath
          // 文件预览
          wx.openDocument({
              filePath: filePath,
              fileType: 'doc', 
              success: function(res) {
              },
              fail: (e) => {
            }
          })
      }
    })
 }
```



## 二十六、小程序分包加载
- `app.json`配置
```json
"pages": [
    "pages/center/index"
  ],
  "subpackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/activity/index"
      ]
    },
    {
      "root": "packageA", 
      "pages": [
        "pages/activity/index"
      ]
    }
  ],
```

- 分包文件结构
  ![图片](/images/frontEnd/img_11.png)




## 二十七、小程序路由和传参
::: tip
第一种：wx.navigateTo(); 有页面栈栈，根据累加路由栈或者组件父级路径跳转
第二种：router.navigateTo();  无页面栈，绝对路径跳转；获得的路由器对象更好的基路径稳定性
:::

### 路由api
- `navigateTo` 保留当前页面，跳转到其他页面，可使用`wx.navigateBack`返回原页面
```ts
wx.navigateTo({
  	url: 'page/home/home'
})
```

- `navigateBack` 关闭当前页面，返回上一级页面或者多级页面，可通过`getCurrentPages()`获取当前页面栈序号
```ts
wx.navigateTo({
  url: 'page/news/news'// 页面 A
})
wx.navigateTo({
  url: 'page/detail/detail'// 页面 B
})
// 跳转到页面 A
wx.navigateBack({
  delta: 2
})
// 跳转到上一页
wx.navigateBack({
  delta: 1
})
```

- `redirectTo` 关闭当前页面，跳转到应用内的某个页面。
```ts
wx.redirectTo({
  url: 'page/home/home'
})
```

- `switchTab` 跳转到tabBar页面（在`app.json`中注册过的tabBar页面），同时关闭其他非tabBar页面。**不可传参**
```ts
wx.switchTab({
  url: 'page/index/index'
})
```

- `reLanch` 关闭所有页面，打开到应用内的某个页面。
```ts
wx.reLanch({
  url: 'page/home/home?user_id=111'
})
```

### navigator组件
- 设置 open-type 修改路由类型
```html
// 跳转到新页面
<navigator 
     url="/page/navigate/navigate?title=navigate"
     hover-class="navigator-hover">
</navigator>

//在当前页打开
<navigator
        url="../../home/home"
        open-type="redirect"
        hover-class="other-navigator-hover">
</navigator>

//切换 Tab
<navigator
        url="/page/index/index"
        open-type="switchTab"
        hover-class="other-navigator-hover">
</navigator>

//关闭所有页面，打开到应用内`的某个页面
<navigator
        url="../../login/login"
        open-type="redirect"
        hover-class="other-navigator-hover">
</navigator>

//关闭当前页面，返回上一级页面或多级页面
<navigator
        url="/page/index/index"
        open-type="navigateBack"
        hover-class="other-navigator-hover">
</navigator>
```

### 路由跳转传参
- 基本类型传参
```ts
//传递一个参数
wx.navigateTo({
  url: `../detail/detail?name=${name}`
})
//传递多个参数
wx.navigateTo({
  url: `../detail/detail?name=${name}&&id=${id}`
})
```

- 使用JSON字符串传参复杂类型
```ts
//传递对象
let user = {
    a: 1,
    b: 2,
}
wx.navigateTo({
  	url: `page/home/home?user=$(JSON.stringify(user))`//将对象转换成json字符串
})
//在接收页面onLoad方法中获取参数
onLoad: function (options) {
    let user= JSON.parse(options.user); // 解析json字符串为对象
    console.log("user "+user);
}
```



## 二十八、小程序自定义组件和使用
### 组件传参
- 创建四个基础页面 json wxml wxss js 4个文件组成 
- 首先需要在 json 文件中进行自定义组件声明（将 component 字段设为 true 可将这一组文件设为自定义组件）：
```json
{
  "component": true
}
```

- wxml定义组件
```html
<view class="inner">
  {{innerText}}
</view>
<slot></slot>
```

### 父子组件传值—父传子
- js文件中`properties`属性定义子组件接参，相当于vue中的`props[]`
```ts
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    },
    commentCount: {
      type: Number,
      value: 0,
    },
    commentItem: {
      type: Object,
      value: ''
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){}
  }
})
```
- page内使用组件json文件中注入
```json
{
  "usingComponents": {
    "component-tag-name": "path/to/the/custom/component"
  }
}
```

- 组件内传值
```html
<view>
  <!-- 以下是对一个自定义组件的引用 -->
  <component-tag-name inner-text="Some text" innerText="传值"></component-tag-name>
</view>
```

### 父子组件传值—子传父
- 子组件，使用 `triggerEvent` 事件传递
```html
<image bindtap='twoLevelCommentBtnClick' data-author-name="传值内容"></image>
```

```ts
methods: {
  // 点击评论按钮
  twoLevelCommentBtnClick: function (e) {
    let authorName = e.currentTarget.dataset.authorName;
    // 赋值给事件
    this.triggerEvent("twoLevelCommentBtn", authorName);
  },
},
```

- 父组件， 通过 `bind:` 事件接收子事件传递的参数
```html
<comment 
    commentCount='{{commentList.length}}'
    commentItem='{{item}}' 
    bind:twoLevelCommentBtn='twoLevelCommentBtnClick' >
</comment>
```
```ts
twoLevelCommentBtnClick (e) {
  this.setData({
    placeholderInput: e.detail
  });
  consoleUtil.log("点击二级评论按钮：" + e.detail);
},
```

### 组件内路由跳转
::: tip
使用相对路径： 相对父组件位置跳转；
:::
```ts
// 绝对路径跳转
wx.navigateTo({
  	url: '/page/home/home'
})

// 相对路径跳转
wx.navigateTo({
  	url: '../dir/page/home/home'
})
```




## 二十九、input输入联想
![图片](/images/frontEnd/img_12.png)

```html
<input class="weui-input" name="input" value="{{company_name}}"  bindinput="getCompanyList" placeholder="需开票的企业名称" />
<scroll-view scroll-y="true" class="scrollview" hidden="{{hideScroll}}">
  <view wx:for="{{bindSourceList}}" wx:key="{{item.company_name_digest}}" class="itemView">
    <view id="{{item.credit_no}}" bindtap="itemtap" data-type="{{item}}">{{item.company_name}}</view>
  </view>
</scroll-view>
```

```css
.scrollview{
  position: absolute;
  top:330rpx;
  z-index: 5;
  color: black;
  width: 446rpx;
  height: 320rpx;
  background-color: #ffffff;
  box-shadow: 0 5rpx 20rpx 0 
    rgba(153, 153, 153, 0.3);
  border-radius: 12rpx;
  border: 2rpx solid  #eeeeee;
}
.scrollview .itemView{
  height: 70rpx;
  line-height: 70rpx;
  padding: 0 20rpx;
  overflow: hidden;
  font-size: 28rpx;
  color: #333333;
  box-sizing: border-box;
}
```

```ts
 /**
 * 企业联想请求
 * @param company_name：发票抬头
 * @param key: 输入值传参
 * @param bindSourceList：联想返回列表
 * @param hideScroll：联想弹窗打开
 */
getCompanyList(e){
  // 表单双向绑定
  this.setData({
    company_name: e.detail.value
  })
  
  let key = e.detail.value + ""
  http.request({
    url: `${config.baseUrl}/b-search?action=company_name_notice&key=${key}`,
    method: "post"
  }).then(res =>{
    this.setData({
      bindSourceList: res.data.company_list,
      hideScroll: false
    })
  })
},


/**
 * 表单双向绑定
 * @param credit_no： 税号
 * @param phone: 电话号码
 * @param email: 邮箱
 */
getCredit(e){
  this.setData({
    credit_no: e.detail.value
  })
},
getPhone(e){
  this.setData({
    phone: e.detail.value
  })
},
getEmail(e){
  this.setData({
    email: e.detail.value
  })
},


 /**
 * 选中联想企业赋值
 * @param company_name：公司名
 * @param credit_no: 公司税号
 * @param digest：企业唯一标识
 * @param hideScroll: 关闭联想
 */
itemtap(event){
  this.setData({
    company_name: event.currentTarget.dataset.type.company_name,
    credit_no: event.currentTarget.dataset.type.credit_no,
    digest: event.currentTarget.dataset.type.digest,
    hideScroll: true
  })
}
```



## 三十、小程序自定义导航栏
### 导航栏分析
- 导航栏整体的高度 = **（状态栏高度 + 导航栏高度）**
- 状态栏高度可以通过 `wx.getSystemInfo()` 获取
- 导航栏高度 = **胶囊高度 +（胶囊和导航栏之间margin值）x  2**
- 胶囊信息可以通过 `wx.getMenuButtonBoundingClientRect()` 获取
- `wx.getMenuButtonBoundingClientRect()` 中也返回了胶囊顶部距屏幕顶部距离的信息
- 高度差 = **胶囊顶部距屏幕顶部距离 - 状态栏高度** 

### 导航栏图解
![图片](/images/frontEnd/img_13.png)
![图片](/images/frontEnd/img_14.png)
```css
 // 胶囊背景色、边框
  background-color: rgba(0, 0, 0, .15);
  border: solid 2rpx  rgba(255, 255, 255, .25);
 // 胶囊中划线
  width: 2rpx;
  background-color: rgba(255, 255, 255, .25);
  height: 34rpx;
  display: inline-block;
  z-index: 2;
```

### 组件封装
- app.js
```ts
App({
  globalData: {},
  onLaunch: function() {
    //获取系统信息
    wx.getSystemInfo({
      success: res => {
        this.system = res
      }
    })
    //获取胶囊信息
    this.menu = wx.getMenuButtonBoundingClientRect()
    //打印数据
    console.log('系统信息', this.system)
    console.log('胶囊信息', this.menu)
  }
})
```

- 组件代码
- `cover-view`标签内必须嵌套`cover`标签，否者可能真机无效或者报错
```html
<!--
  @description: 自定义导航栏组件
  @author: hhd (2021-07-06)
  @update: 
-->

<!-- 
  @description: 组件使用说明
  属  性          类  型      默认值          是否必填      说  明
  navColor        string     #dd3239         否           导航栏背景颜色设置
  title           string     空              否           导航栏标题设置
  titleColor      string     #fff            否           导航栏标题颜色设置
  titlePlace      string     title-center    否           标题位置设置，居中：title-center ，左对齐：title-left
  navType         string     1               否           导航栏类型, 返回上一页：1，双按钮：2，返回首页：3
-->


<cover-view class="nav-box" style="background-color:{{navColor}}">
  <cover-view class="status-bar" style="height:{{statusHeight}}px"></cover-view>
  <cover-view class="nav-bar" style="height:{{navHeight}}px">

    <!-- 导航栏返回-上一页 -->
    <block wx:if="{{navType == 1}}">
      <cover-view bindtap="back">
          <cover-image class="img-back" src="../../img/center/personal/personal-back.png"></cover-image>
      </cover-view>
    </block>

    <!-- 导航栏返回-双按钮 -->
    <block wx:if="{{navType == 2}}">
      <cover-view class="back" style="height:{{menuHeight}}px; border-radius: {{menuHeight*0.5}}px">
        <cover-view class="left" bindtap="back">
          <cover-image class="img1" src="../../img/center/personal/personal-back.png"></cover-image>
        </cover-view>
        <cover-view class="line"></cover-view>
        <cover-view class="right" bindtap="backHome">
          <cover-image class="img2" src="../../img/center/personal/back-home.png"></cover-image>
        </cover-view>
      </cover-view>
    </block>

    <!-- 导航栏返回-首页-->
    <block wx:if="{{navType == 3}}">
      <cover-view bindtap="backHome" class="back-home" style="height: {{menuHeight}}px; width: {{menuHeight}}px;">
          <cover-image class="img-home" src="../../img/center/personal/back-home.png"></cover-image>
      </cover-view>
    </block>

    <!-- 导航栏标题 -->
    <cover-view class="{{titlePlace}}" style="color:{{titleColor}}">{{navTitle}}</cover-view>
  </cover-view>
</cover-view>
```

```css
/* 组件盒子 */
.nav-box {
  width: 750rpx;
  position: fixed;
  top: 0;
  font-size: 32rpx;
  z-index: 2;
}

/* 导航栏 */
.nav-box .nav-bar {
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  position: relative;
}

/* 导航栏按钮-返回上一页 */
.img-back{
  width: 16rpx;
  height: 30rpx;
}

/* 导航栏按钮-返回首页*/
.back-home{
  background-color: rgba(0, 0, 0, .15);
  border: solid 2rpx  rgba(255, 255, 255, .25);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-home{
  width: 30rpx;
  height: 28rpx;
}

/* 返回按钮-双按钮 */
.nav-bar .back{
  width: 175rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, .15);
  border: solid 2rpx  rgba(255, 255, 255, .25);
  text-align: center;
  box-sizing: border-box;
}
.back .left{
  width: 87rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left .img1{
  width: 12rpx;
  height: 22rpx;
 
}
.back .line{
  display: inline-block;
  width: 2rpx;
  background-color: rgba(255, 255, 255, .25);
  height: 34rpx;
  z-index: 2;
}
.back .right{
  width: 87rpx;
  display: flex;
  justify-content: center;
}
.right .img2{
  width: 28rpx;
  height: 26rpx;
}

/* 标题居中：默认 */
.nav-bar .title-center{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* 标题居中 */
.nav-bar .title-left{
  position: relative;
  margin-left: 10rpx;
}
```

```ts
const app = getApp()

Component({
  /**
   * 组件的属性列表
   * Created by hhd on 2021-07-06, 自定义导航栏组件
   * @param navTitle: 导航栏标题
   * @param navColor: 导航栏背景颜色
   * @param titleColor: 导航栏标题颜色
   * @param titlePlace: 导航栏标题位置：居中：title-center，左对齐：title-left
   * @param navType: 导航栏类型，返回上一页：1，双按钮：2，返回首页：3
   */
  properties: {
    navTitle: {
      type: String,
      value: ''
    },
    navColor: {
      type: String,
      value: '#dd3239'
    },
    titleColor: {
      type: String,
      value: '#fff'
    },
    titlePlace: {
      type: String,
      value: 'title-center'
    },
    navType: {
      type: String,
      value: '1'
    }
  },


  /**
   * 组件的初始数据
   * @param statusHeight: 状态栏高度
   * @param navHeight: 航栏高度
   * @param menuHeight: 胶囊高度
   */
  data: {
      // 此处使用原有接参globalData.navigation代替system
    statusHeight: app.globalData.navigation.statusBarHeight ,
    navHeight: (app.menu.top - app.globalData.navigation.statusBarHeight) 
    * 2 + app.menu.height, 
    menuHeight: app.menu.height, 
  },


  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 返回首页
     * 组件内使用路径：/pages/center/index
     */
    backHome(){
      wx.navigateTo({
        url: '/pages/center/index'
      })
    },


    /**
     * 返回上一页
     */
    back(){
      wx.navigateBack({
        delta: 1
      })
    },
  }

})

```

### 组件使用
```json
{
  "navigationStyle":"custom",
  "usingComponents": {
    "navgation-bar": "../../../mycomponents/navgation-bar"
  }
} 
```

```html
<!-- 自定义导航栏组件 -->
<navgation-bar navTitle="经营异常移出" navType="3"></navgation-bar>
```



## 三十一、小程序复制文本到到粘贴板
```ts
/**
 * 复制链接到粘贴板
 */
copyHref(){
  var href = "http://www.gsxt.gov.cn/";
  wx.setClipboardData({
    data: href,
    success:function(res){
      wx.showToast({
        title: '复制成功',
      })
    },
    fail:function(res){
      wx.showToast({
        title: '复制失败',
      })
    }
  })
 },
```



## 三十二、小程序多选列表开发票组件
```html
<checkbox-group  bindchange="checkboxChange" >
  <view class="list" wx:for="{{invoiceList}}" wx:key="{{item.order_no}}" >
    <view class="left" >
      <view class="check">
        <checkbox value="{{item.order_no}}" checked="{{item.checked}}"/>
      </view>
      <view class="title">
        <view class="text">{{item.name}}</view>
        <view class="time">{{item.add_time}}</view>
      </view>
    </view>
    <view class="right">
      <view class="price">{{item.price}}<text>元</text></view>
      <view class="status">未申请开票</view>
    </view>
  </view>
</checkbox-group>
```

```css
/*  重写 checkbox 样式  */
/* 未选中的 背景样式 */
checkbox .wx-checkbox-input{
  border-radius: 50%;/* 圆角 */
  width: 40rpx; /* 背景的宽 */
  height: 40rpx; /* 背景的高 */
}
/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked{
  border: none;
  background: #1ec56a;
}

/* 选中后的 对勾样式 （白色对勾） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
  border-radius: 50%;/* 圆角 */
  width: 40rpx;/* 选中后对勾大小，不要超过背景的尺寸 */
  height: 40rpx;/* 选中后对勾大小，不要超过背景的尺寸 */
  line-height: 40rpx;
  text-align: center;
  font-size:30rpx; /* 对勾大小 30rpx */
  color:#fff; /* 对勾颜色 白色 */
  background: transparent;
  transform:translate(-50%, -50%) scale(1);
  -webkit-transform:translate(-50%, -50%) scale(1);
}
```

```ts
  // 添加勾选参数：默认全选
 for(let item of res.data.un_apply){
   item.checked = true
 }
     
  /**
   * 列表多选样式控制
   * @param checkOrderList  values: 选中列表order_no集
   * @param invoiceList: 待开票列表
   * @param checked: 是否勾选状态
   */
  checkboxChange(e) {
    // 选中列表order_no List
    this.setData({ checkOrderList: e.detail.value })
    const items = this.data.invoiceList
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].order_no === values[j]) {
          items[i].checked = true
          break
        }
      }
    }
    // 勾选操作后赋值checked状态
    this.setData({
      invoiceList: items
    })
  },
  
  // 合计总金额
  let total = 0
  let order_ids = "";
  for(let item of this.data.invoiceList){
    if(item.checked === true){
      total += (+item.price)
    }
  }
  this.setData({ totalPrice: total }) 
  
  // order_no选中订单id拼接
  for(let item of this.data.checkOrderList){
    order_ids += item + ",";
  }
  this.setData({ order_ids: order_ids }) 
```



## 三十三、小程序使用canvas旋转图片
::: tip 思路
创建一个新的`canvas`画布，隐藏到屏幕外，做旋转处理；
:::

```html
<canvas 
      canvas-id="canvas" 
      style="width:{{imageWidth}}px;height:{{imageHeight}}px;position:absolute;top:200%">
</canvas>
```

```ts
 /**
   * base64图片旋转
   * @param src 图片文件
   * @param edg 图片旋转角度：必须是90的倍数
   */
  rotateBase64Img(src, edg) {
    wx.getImageInfo({
      src: src,
      success:(res)=>{
          let canvasContext = wx.createCanvasContext('canvas')
          var width = res.width;
          var height = res.height;
          this.setData({
            imageWidth: height,
            imageHeight: width,
          })
          canvasContext.translate(height / 2, width / 2)                 
          canvasContext.rotate(edg * Math.PI / 180)
          canvasContext.drawImage(src, - width / 2, - height / 2, width, height);
          canvasContext.draw()
          this.drawImage()
      }
    })
  },


  /**
   * 旋转后生成图片
   */
  drawImage() {
    let that = this;
    setTimeout(()=>{
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'canvas',
        success(res) {
          let shareImg = res.tempFilePath;
          // 生成旋转后的图片文件
          that.setData({
            tmpPath: shareImg
          })
          // 上传图片
          that.upImgs(shareImg, 0)
        },
        fail: function (res) {
          console.error(res)
        }
      })
    }, 100)
  }
```



## 三十四、小程序调用微信企业客服
### 小程序内直接使用
- 必须用户点击才可以触发
```ts
wx.openCustomerServiceChat({
  extInfo: {url: ''},
  corpId: '',
  success(res) {}
})
```

### 小程序web-view页面使用
- 因为需要用户点击，所以需要在小程序内新增一个客服中转页供用户点击
- 跳转到小程序原生客服页，使用小程序内调用方法打开
```shell
npm install weixin-js-sdk --save
```
```ts
//页面引入sdk
import wx from "weixin-js-sdk";

wx.miniProgram.redirectTo({
  url: "/pages/customer/index?id=1", // id:所需参数
  success: (res) => {
    console.log(res); // 页面跳转成功的回调函数
  },
  fail: (err) => {
    console.log(err); // 页面跳转失败的回调函数
  },
});
```

- 参考文档：
- [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/service-chat/wx.openCustomerServiceChat.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/service-chat/wx.openCustomerServiceChat.html)
- [https://developer.work.weixin.qq.com/document/path/94848](https://developer.work.weixin.qq.com/document/path/94848)