
# 代码规范
[[toc]]


## 一、代码注释规范
### html文档
```html
1、头部
<!--
  @description: 经营异常推送落地页
  @author: hhd (2021-07-05)
  @update: 
-->

2、内容
<!-- 自定义导航模块-->
<wxs module="filter" src="../../../app.wxs"></wxs>
```

### css文档
```css
/*1、少量内容*/
/* 背景顶部撑起高度 */

/*2、多量内容分割线*/
/******************** start 内容模块 ********************/
/********************* end 内容模块 ********************/
```

### js文档
```ts
 // 1、顶部初始化位置
   /**
   * 页面的初始数据
   * Created by hhd on 2021-07-05, 经营异常指引
   */
   let data: {
    loading: false, // 加载动画控制
    datas:{}, // 登录接口接参
    openListFlag: false, // 异常列表展开按钮控制
    headerFlag: false, // 异常列表展开控制
  }
 
 
 // 2、方法封装注释
 /**
   * 触发用户登录请求首页数据
   * 此处逻辑说明，或在方法内对应位置逻辑说明
   * @function checkManageAbnormal: 检查异常情况接口
   * @param {object} datas: 首页返回数据
   * @param {boolean} loading: 加载动画开关
   * @param {number} is_login: 是否登录 1登录，0未登录
   * @param {array} unnormal_list：经营异常列表
   * @param {string} token：登录参数token
   */
```



## 二、页面加载接口和页面结构案例
```vue
<template>
  <div class="page" @touchstart.once="isRealVisit()"></div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
    }
 },
 
 created() {
  this.$tools.setUserStore(this.$route.query);
  this.init();
 },
 
 methods: {
  /**
   * 初始化数据
   * @returns {Promise<void>}
   */
  async init() {
    this.$tools.batchRecord(this.$store.state.id, '01')
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    let p1 = await this.getCompanyInfo();
    let p2 = this.getCreditReport();
    let p3 = this.getCompanyBaseInfo();
    Promise.all([p1,p2,p3]).then(()=>{
      this.$toast.clear()
    }).catch(()=>{
      this.$toast.clear()
    })
  },
  
    /**
     * 获取企业信息
     */
    getCompanyInfo(){
      return this.$http.get('/...', {
        params: {
          id: this.$store.state.id,
          kp_signature: this.$store.state.kp_signature,
        }
      }).then(res => {
        if (res && res.status === 0) {
          this.uid = res.data?.user_config?.uid;
          this.token = res.data?.user_config?.token;
          this.addressPrams.digest = res.data?.digest ?? this.digest;
          this.addressPrams.phone = res.data?.phone ?? this.phone;
          this.$tools.setUserStore({
            uid: res.data?.user_config?.uid,
            token: res.data?.user_config?.token,
            digest: res.data?.digest,
            phone: res.data?.phone,
            product_type: res.data?.product_type,
          });
        } else {
          res.message && this.$toast(res.message)
        }
      })
    },
    
   /**
     * 是否真实访问统计
     */
    isRealVisit(){
      this.$tools.batchRecord(this.$store.state.id, '9')
    },
    
 }
}
</script>

<style scoped lang="scss">
   .page {
       background-color: #ffe7d1;
       font-weight: normal;
       letter-spacing: 0;
      overflow-x: hidden;
      overflow-y: auto;
      min-height: calc(100vh + 1px);
   }
</style>  
```



## 三、支付页加载接口支付案例
```vue
<template>
  <div class="page"></div>
</template>

<script>
import PayModule from  "@guanjia/public/payModule";
export default {
  name: "index",
  components: {},
  data() {
    return {
    }
 },
 
 created() {
  this.$tools.setUserStore(this.$route.query);
  this.init();
 },
 
 methods: {
  /**
   * 初始化数据
   * @returns {Promise<void>}
   */
  async init() {
    this.$tools.batchRecord(this.$store.state.id, '03')
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    let p1 = await this.getCompanyInfo();
    let p2 = this.getAgreeInfo();
    let p3 = this.getAddressData();
    Promise.all([p1,p2,p3]).then(()=>{
      this.$toast.clear()
    }).catch(()=>{
      this.$toast.clear()
    })
  },
  
/**
 * 请求企业信息
 */
getCompanyInfo(){
  return this.$http.get('/.....', {
    params: {
      id: this.$store.state.id,
      kp_signature: this.$store.state.kp_signature,
    }
  }).then(res => {
    if (res && res.status === 0) {
      this.plaqueInfo = res.data;
      this.pay_config = res.data.pay_config;
      this.uid = res.data?.user_config?.uid;
      this.token = res.data?.user_config?.token;
      this.addressPrams.digest = res.data?.digest ?? this.digest;
      this.addressPrams.phone = res.data?.phone ?? this.phone;
      this.$tools.setUserStore({
        uid: res.data?.user_config?.uid,
        token: res.data?.user_config?.token,
        digest: res.data?.digest,
        phone: res.data?.phone,
        product_type: res.data?.product_type,
      });
      // 已支付
      let objParams = {
        user_id: this.$store.state.uid,
        token: this.$store.state.token,
      };
      let success_url = `${process.env.VUE_APP_SHUIDI}/kpuserdetail?${this.$tools.objectToUrl(objParams)}`;
      if (res.data?.is_pay) {
        window.location = success_url;
      }
      // 支付模块初始化
      this.payModule = new PayModule(
          {
            id: this.$store.state.id,
            uid: this.$store.state.uid,
            digest: this.$store.state.digest,
            order_no: this.$route.query.order_no,
            success_url_window: success_url,
          }
      )
    } else {
      res.message && this.$toast(res.message)
    }
  })
},

/**
 * 获取订单信息
 */
async payFun() {
  this.$tools.batchRecord(this.$store.state.id, '04')

  await this.init(); // 获取支付状态
  if (this.plaqueInfo?.is_pay) {
    return
  }

  this.isClickPay = true;
  if (!this.agree) {
    this.pop1 = true;
    return
  }

  if (!this.payLock) {
    this.payLock = true
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
  } else {
    return
  }

  this.payModule.doPay(this.radio_type, this.which).then(()=>{
    console.log('支付成功')
    this.payLock = false;
    this.$toast.clear()
  }).catch((err)=>{
    console.log(err)
    this.payLock = false;
    this.$toast.clear()
    this.$toast(err);
  })
},
    
 }
}
</script>

<style scoped lang="scss">
   .page {
       background-color: #ffe7d1;
       font-weight: normal;
       letter-spacing: 0;
      overflow-x: hidden;
      overflow-y: auto;
      min-height: calc(100vh + 1px);
      // background: #f4f4f4 url("../assets/imgs/plaque/head-bg.png") no-repeat left top / contain;
   }
</style> 
```