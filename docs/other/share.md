---
title: My Blog Post
---

# 前端分享会 2022-10-08

[[toc]]

## 一、vuex数据持久化实现

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

<!-- more -->

## 二、vue移动端项目支付模块封装

### 代码实现
```ts
import axios from './axios'
import store from '../store'
import router from '../router'


/**
 * 支付模块封装
 * @author hhd
 * @time 2022-09-13
 * @update 2022-09-13
 * @使用方法：
 *  导入：import PayModule from  "@guanjia/public/payModule";
 *  支付模块初始化：
 *           this.payModule = new PayModule(
 *               {
 *                 id: this.$store.state.id,
 *                 uid: this.$store.state.uid,
 *                 digest: this.$store.state.digest,
 *                 order_no: this.$route.query.order_no,
 *                 success_url_window: this.success_url,
 *               }
 *           )
 *   发起支付：
 *       this.payModule.doPay(this.pay_type, this.which).then((res)=>{
 *         console.log('支付成功')
 *       }).catch((err)=>{
 *         console.log(err)
 *       })
 */


class PayModule {

    /**
     * 构造基础数据
     * @param id 批次id （必传）
     * @param uid 用户id （必传）
     * @param digest 企业digest （必传）
     * @param order_no 订单号url (必传，取自url)
     * @param success_url_window 支付成功跳转地址 window.href跳转
     * @param success_url_router 支付成功跳转地址 vue 路由跳转
     */
    constructor (param) {
        // 构造函数初始化数据
        this.id = param?.id ?? '';
        this.uid = param?.uid ?? '';
        this.digest = param?.digest ?? '';
        this.order_no = param?.order_no ?? '';
        this.success_url_window = param?.success_url_window ?? '';
        this.success_url_router = param?.success_url_router ?? '';

        // 全局参数
        this.type = ''; // 支付类型（价格控制）
        this.pay_type = ''; // 支付方式（微信，支付宝）
        this.wxBrower = false; // 是否微信浏览器
        this.openid =  ''; // 微信openid
        this.return_url = ''; // 支付回调地址

        // 模块初始化
        this.update(); // 支付数据初始化
        this.checkPayStatus(this.order_no); // 支付轮询
    }


    /**
     * 支付数据初始化
     */
    update() {
        // 获取页面域名和路径
        let index = window.location.href.indexOf('?')
        if(index !== -1){
            this.return_url = window.location.href.substring(0,index)
        }else{
            this.return_url = window.location.href
        }
        // 检测浏览器类型
        let ua = navigator.userAgent.toLowerCase();
        if (`${ua.match(/MicroMessenger/i)}` === "micromessenger") {
            this.wxBrower = true;
        }
        // 获取openid
        axios.http.get("/kpuserdetail", {
            params: {
                action: "woa_openid",
            },
        }).then((res) => {
            if (+res.status === 0) {
                this.openid = res.data.openid;
            }
            if (this.wxBrower && !this.openid) {
                location.href = `${process.env.VUE_APP_SHUIDI
                }/wx-login-jump?back_url=${encodeURIComponent(location.href)}`;
            }
        });
    }


    /**
     * 触发支付，生产订单号
     * @param type 支付类型（价格控制）
     * @param pay_type 支付方式（微信，支付宝）
     */
    doPay(type,pay_type){
        this.type = type; // 支付类型（价格控制）
        this.pay_type = pay_type; // 支付方式（微信，支付宝）

        return new Promise((resolve, reject) => {
            axios.http.get("/pay", {
                params: {
                    action: "do_pay",
                    type: this.type,
                    pay_type: this.pay_type,
                    pay_count: 1,
                    no_need_login: 0,
                    user_id: this.uid,
                    assoc_id: this.id,
                    digest: this.digest,
                    t: new Date().getTime(),
                },
            })
                .then((res) => {
                    if (res.status === 0) {
                        let objParams = {
                            order_no: res.order_no,
                        };
                        this.return_url = `${this.return_url}?${this.objectToUrl(objParams)}`;
                        this.checkPayStatus(res.order_no); // 提前打开支付轮询
                        if (this.pay_type === 'weixinpay') {
                            this.wxPay(res.order_no).then((resWxPay)=>{
                                resolve(resWxPay);
                            }); // 微信支付
                        } else {
                            this.zfbPay(res.order_no).then(()=>{
                                resolve();
                            }); // 支付宝支付
                        }
                    } else {
                        reject(res?.message)
                        res.message && this.$toast(res.message);
                    }
                });
        });
    }


    /**
     * 支付宝支付
     * @param order_no
     */
    zfbPay(order_no) {
        return new Promise((resolve, reject) => {
            axios.http.get('/pay', {
                params: {
                    action: "get_alipay_h5_pay_url",
                    order_no: order_no,
                    type: this.type,
                    return_url: this.return_url,
                }
            }).then(res => {
                if (res.status === 0) {
                    resolve();
                    location.href = res.data.url;
                }else{
                    reject();
                }
            })
        });
    }


    /**
     * 微信支付
     * @param order_no
     */
    wxPay(order_no) {
        const params = {
            order_no: order_no,
            type: this.type,
        };
        // 微信浏览器参数变更
        if (!this.wxBrower) {
            params["return_url"] = this.return_url;
            params["action"] = "get_wechat_h5_pay_url";
        } else {
            params["open_id"] = this.openid;
            params["action"] = "get_weixinpay_js_params";
        }
        return new Promise((resolve, reject) => {
            axios.http
                .get("/pay", {
                    params,
                })
                .then((res2) => {
                    // 微信浏览器支付
                    if (this.wxBrower) {
                        let that = this;
                        WeixinJSBridge.invoke(
                            "getBrandWCPayRequest",
                            res2,
                            function (res3) {
                                if (res3.err_msg + '' === "get_brand_wcpay_request:ok") {
                                    if(that.success_url_window){
                                        window.location = that.success_url_window ;
                                    }
                                    if(that.success_url_router){
                                        router.push({
                                            path: that.success_url_router,
                                        })
                                    }
                                    resolve('weichat');
                                } else {
                                    this.$toast('支付失败');
                                    reject();
                                }
                            }
                        );
                    } else {
                        // 普通浏览器
                        resolve();
                        location.href = res2.data.url;
                    }
                });
        });
    }


    /**
     * 检查支付状态（订单号）
     * @param order_no 订单号
     */
    checkPayStatus(order_no){
        if(order_no){
            const timer = setInterval(() => {
                return new Promise((resolve, reject) => {
                    axios.http
                        .get("/pay", {
                            params: {
                                action: "check_pay_status_by_order",
                                order_no: order_no,
                                t: new Date().getTime(),
                            },
                        })
                        .then((res) => {
                            if (+res.payed === 1) {
                                clearInterval(timer);
                                // 普通浏览器支付成功
                                if(this.success_url_window){
                                    window.location = this.success_url_window ;
                                }
                                if(this.success_url_router){
                                    router.push({
                                        path: this.success_url_router,
                                    })
                                }
                                resolve();
                            }else{
                                reject(res);
                            }
                        });
                });
            }, 1000);
        }
    }


    /**
     * 对象转url
     * @param {object} obj : 传入参数对象
     * @使用方法：this.objectToUrl(obj)
     * @return {string} （id=21&token=）
     */
    objectToUrl(obj) {
        const tempArray = [];
        for (const item in obj) {
            if (item) {
                tempArray.push(`${item}=${obj[item]}`);
            }
        }
        return tempArray.join("&");
    }


}


export default PayModule
```

<!-- more -->

## 三、vue input输入联想实现
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






## 四、hooks组件抽离思想

::: tip 组件设计原则：
- 保持功能单一
- 低耦合，少交互，少依赖外部变量
- 命名准确，类似函数封装
:::

::: tip 组件项目文件组织方式：
- 页面内重复使用的组件，在页面文件下
- 当前业务场景使用的，封装在业务模块下
- 通用组件放到公共文件中或组件库中
:::

::: tip 全局状态管理原则：
- 状态是否在多个页面共享
- 组件内尽量使用插口式数据
- 跳转页面后返回，状态是否还原
:::

以一个用户模块为例。一个包含查询用户信息，修改用户信息，修改密码等功能的hooks可以这样写：

```ts
// 用户模块hook
const useUser = () => {
    // react版本的用户状态
    const user = useState({});
    // vue版本的用户状态
    const userInfo = ref({});
    
    // 获取用户状态
    const getUserInfo = () => {}
    // 修改用户状态
    const changeUserInfo = () => {};
    // 检查两次输入的密码是否相同
    const checkRepeatPass = (oldPass，newPass) => {}
    // 修改密码
    const changePassword = () => {};
    
    return {
        userInfo,
        getUserInfo,
        changeUserInfo,
        checkRepeatPass,
        changePassword,
    }
}
```

```ts
// 用户模块交互逻辑hooks
const useUserControl = () => {
    // 组合用户hook
    const { 
        userInfo, 
        getUserInfo, 
        changeUserInfo, 
        checkRepeatPass, 
        changePassword 
   } = useUser();
    // 数据查询loading状态
    const loading = ref(false);
    // 错误提示弹窗的状态
    const errorModalState = reactive({
        visible: false, // 弹窗显示/隐藏
        errorText: '',  // 弹窗文案
    });
    
    // 初始化数据
    const initData = () => {
        getUserInfo();
    }
    // 修改密码表单提交
    const onChangePassword = ({ oldPass, newPass ) => {
        // 判断两次密码是否一致
        if (checkRepeatPass(oldPass, newPass)) {
            changePassword();
        } else {
            errorModalState.visible = true;
            errorModalState.text = '两次输入的密码不一致，请修改'
        }
    };
    return {
        // 用户数据
        userInfo,
        // 初始化数据
        initData: getUserInfo,
        // 修改密码
        onChangePassword,
        // 修改用户信息
        onChangeUserInfo: changeUserInfo,
    }
}
```

然后只要在组件里面引入交互逻辑的hook即可：

- vue版本
```vue
<template>
    <!-- 视图部分省略，在对应btn处引用onChangePassword和onChangeUserInfo即可 -->
</template>
<script setup>
import useUserControl from './useUserControl';
import { onMounted } from 'vue';

const { userInfo, initData, onChangePassword, onChangeUserInfo } = useUserControl();
onMounted(initData);
<script>
```

- react版本：
```ts
import useUserControl from './useUserControl';
import { useEffect } from 'react';

const UserModule = () => {
    const { userInfo, initData, onChangePassword, onChangeUserInfo } = useUserControl();
    useEffect(initData, []);
    return (
        // 视图部分省略，在对应btn处引用onChangePassword和onChangeUserInfo即可
    )
}
```

而拆分出的三个文件**放在组件同级目录下即可**；如果拆出的hooks较多，可以单独开辟一个hooks文件夹。
如果有可以复用的hooks，参考组件拆分里面分享的方法, **放到需要复用它的组件们共同的抽象层级上即可**。

- 也可以简化一下去掉交互逻辑
```vue
<template>
    <!-- 视图部分省略，在对应btn处引用changePassword和changeUserInfo即可 -->
</template>
<script setup>
import { onMounted } from 'vue';
// 用户模块hook
const useUser = () => { 
    // 代码省略
}

const { userInfo, getUserInfo, changeUserInfo, checkRepeatPass, changePassword } = useUser();
// 数据查询loading状态
const loading = ref(false);
// 错误提示弹窗的状态
const errorModalState = reactive({
    visible: false, // 弹窗显示/隐藏
    errorText: '', // 弹窗文案
});

// 初始化数据
const initData = () => { getUserInfo(); }
// 修改密码表单提交
const onChangePassword = ({ oldPass, newPass ) => {};
    
onMounted(initData);
<script>
```



# 前端分享会 2023-02-23

## 一、css样式问题

### 移动端小于12px字体解决方案

::: tip 原因：
- 因移动端限制最小12px字体，部分业务需求或ui有类似设计，比如一些模拟手机外形的小模块
  :::

![图片](/images/frontEnd/css/img_7.png)

#### 方案一、transform: scale(n)缩放
- 放大字体倍数，再使用`transform: scale(n)`缩小,但是改变了元素占据的空间大小，四周有留白
```scss
.font9-scale{
    font-size: 18px;
    transform: scale(0.5);
  }
```
- 解决留白问题：宽度两倍数，`margin-left` 向左折回 50%，或`transform-origin：left` 这种方法只适合定高元素
```scss
.font9-scale2{
    font-size: 18px;
    width: 200%;
    transform: scale(0.5);
    //margin-left: -50%;
    transform-origin: left;
  }
```

#### 方案二、zoom: 0.5
- `zoom: 0.5` 不会改变了元素占据的空间大小，没有留白，但是zoom是非标准属性，有兼容问题
```scss
.font9-zoom{
    font-size: 18px;
    zoom: 0.5;
  }
```
- 兼容性说明：火狐浏览器不兼容，ios设备实测也无法兼容 ，360浏览器无法兼容
  ![图片](/images/frontEnd/css/img_8.png)

#### 方案三、-webkit-text-size-adjust: none
- 关闭依据设备自动调整字体大小，自从chrome 27之后，就取消了对这个属性的支持。同时，该属性只对英文、数字生效，对中文不生效；仅了解就好，不实用。
```scss
.font9-adjust{
    font-size: 18px;
    -webkit-text-size-adjust: none;
  }  
```


### 禁止子元素滚动触发父元素滚动解决方案

::: tip 原因：
- 有些页面有内有可向下滚动的列表，经常会遇到滚动小模块到底部后，会带动父元素滚动，或者带动整个页面向下滚动，这样的感觉很混乱。
  :::

![图片](/images/frontEnd/css/img_9.png)

#### 方案一、overscroll-behavior ：contain
- 设置子元素的css属性 `overscroll-behavior ：contain`, 但是safari低版本 / ie不兼容
- 兼容性说明：
  ![图片](/images/frontEnd/css/img_10.png)

#### 方案二、子元素滚动，监听 wheel 事件阻止自元素滚动触底之后父元素滚动

#### 补充：弹窗组件防止滚动穿透解决方案类似
- 显示弹窗时候，`body` 或父元素添加`overflow：hidden`样式
- 子元素添加 `overscroll-behavior: contain`
- 子元素添加 `pointer-events: none` ,阻止滚动穿透，但是不适合子元素本身是滚动元素



### css 修改icon颜色
::: tip 方法
给icon添加一个指定颜色的投影，向右偏移，然后用overflow隐藏原icon
:::
![图片](/images/frontEnd/css/img_11.png)
```scss
.button-green{
    overflow: hidden;
}

.button-green image{
  width: 27rpx;
  height: 31rpx;
  filter: drop-shadow(80rpx 0 #000); 
  position: relative;
 left: -80rpx;
}
```


### css 按钮点击波纹扩展动画效果
![图片](/images/frontEnd/css/gif_1.gif)
```html
<div class="button-blue" @click="clickHomeButton">
  立即创建百科
  <div class="circleBox">
    <div class="circle"></div>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </div>
  <img 
      id="finger-icon" 
      src="@guanjia/assets/imgs/activity/companyWiki/finger-icon.png" 
      alt=""/>
</div>
```
```scss
/* button按钮 */
.button-blue {
  width: 919px;
  height: 135px;
  background-color: #3e66e1;
  box-shadow: 0 9px 30px 0 rgba(62, 102, 225, 0.4);
  border-radius: 24px;
  font-size: 48px;
  font-weight: bold;
  line-height: 135px;
  color: #ffffff;
  text-align: center;
  margin: 40px auto 10px;
  position: relative;

   /* 手指动画 */
  #finger-icon {
    position: absolute;
    right: 74px;
    top: 55px;
    width: 141px;
    height: 130px;
    animation: animation-name 1s linear infinite;
  }
}
@keyframes animation-name {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30%, 20%);
  }
  100% {
    transform: translate(0, 0);
  }
}

.button-blue:active {
  opacity: 0.6;
}

/* 扩散动画 */
.circleBox {
  position: absolute;
  width: 100px;
  height: 100px;
  margin: 10px auto;
  right: 140px;
  top: -10px;
}
.circle, .circle1, .circle2 , .circle3{
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 225,0.55);
  border: 2px solid rgba(255, 255, 225,0.65);
  border-radius: 999px;
  position: absolute;
  top: 50px;
  left: 15px;
}
.circle1, .circle2 , .circle3 {
  animation-name: circleChange;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.circle1 {
  animation-delay: 1s;
}
.circle2 {
  animation-delay: 2s;
}
.circle3 {
  animation-delay: 3s;
}
@keyframes circleChange{
  0%{transform: scale(1);opacity: 0.95;}
  25%{transform: scale(2);opacity: 0.75;}
  50%{transform: scale(3);opacity: 0.5;}
  75%{transform: scale(4);opacity: 0.25;}
  100%{transform: scale(5);opacity: 0.05;}
}
```


## 二、高德地图选点接口调用节流
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


## 三、requestAnimationFrame节流优化

### 1、requestAnimationFrame
::: tip 背景
由于JavaScript是单线程的，所以定时器的实现是在当前任务队列完成后再执行定时器的回调的，
假如当前队列任务执行时间大于定时器设置的延迟时间，那么定时器就不是那么可靠了
:::

#### 异常示例
```ts
// 以下代码理想状态应该先执行打印 11111， 50毫秒后再执行 打印22222
// 但是由于循环20000次阻塞线程，导致1637毫秒后才执行了定时器中的方法
let startTime = new Date().getTime();
setTimeout(()=>{
let endTime = new Date().getTime();
console.log(endTime - startTime,22222);  // 1637  22222（1.6s后才执行）
},50)

for(let i=0;i<20000;i++) {
console.log(11111);  // 执行20000次后， 再执行setTimeout 50
}
```

#### 应用示例
::: tip 概述
RAF 会尽量以每秒60帧的频率执行回调函数，以确保最佳性能和流畅度 正常执行时间为一帧执行一次，
不阻塞UI线程的情况下提高准确度，也可以自适应浏览器的帧率减少卡顿和性能消耗，
大部分情况，屏幕刷新率为 60HZ 的情况下, 即每过 1000/60 = 16.666... 毫秒渲染新一帧，
可以简单的将 requestAnimationFrame 函数视为延迟为16ms 的 setTimeout 函数，
:::
```ts
const div = document.getElementById('box');
div.style.width = parseInt(div.style.width) + 1 + 'px';

if (parseInt(div.style.width) < 200) {
requestAnimationFrame(this.animationWidth)
}
```

#### 低版本兼容
```ts
/**
 * 低版本浏览器用setTimeout模拟requestAnimationFrame
 */
simulationAnimation(){
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}
```


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


## 四、前端监控系统：稳定性监控
### 稳定性
- js报错监控
- 资源加载错误监控
- promise异常监控
- 接口请求异常监控
- 白屏监控

### 用户体验
- 页面加载性能
- 性能指标
- 卡顿问题

### 业务分析依据
- pv
- uv
- 用户页面停留时间

### 数据模型
```ts
// 公共信息
function getExtraData() {
    return {
        title: document.title, // 当前浏览器title
        url: location.href,  // 访问路径
        timestamp: Date.now(),  // 当前时间戳
        userAgent: userAgent, // 浏览器信息
        uid: store.state.uid ?? '',  // 当前用户id
        // token ...
    }
}

// 资源加载错误
let errorLog = {
  kind: 'stability', // 日志种类：稳定性指标
  type: 'error', // 小类型 error错误
  errorType: 'resourceError', // 资源加载错误
  filename: event.target.src || event.target.href, // 报错文件
  tagName: event.target.tagName, // 标签名
  selector: getSelector(event.target)// 代表最后一个操作的元素
}

// js加载错误
let errorLog = {
  kind: 'stability', // 日志种类：稳定性指标
  type: 'error', // 小类型 error错误
  errorType: 'jsError', // js执行错误
  message: event.message, // 报错信息
  filename: event.filename, // 报错文件
  position: `${event.lineno}:${event.colno}`, // 报错位置 行：列
  stack: event.error && getLines(event.error.stack), // 堆栈信息 哪个方法调用哪一块儿
  selector: lastEvent ? getSelector(lastEvent.path) : ""// 代表最后一个操作的元素
}

// promise 报错
let errorLog = {
  kind: 'stability', // 日志种类：稳定性指标
  type: 'error', // 小类型 error错误
  errorType: 'promiseError', // pomise错误
  message: message, // 报错信息
  filename: filename, // 报错文件
  position: `${lineno}:${colno}`, // 报错位置 行：列
  stack: stack, // 堆栈信息 哪个方法调用哪一块儿
  selector: lastEvent ? getSelector(lastEvent.path) : ""// 最后一个操作的元素
}

// 白屏监控
tracker.send({
  kind: "stability", // 日志种类：稳定性指标
  type: "blank", // 小类型 白屏检测
  emptyPoints: emptyPoints + "", // 空白点数量（共18点）十字型
  screen: window.screen.width + "X" + window.screen.height,  // 屏幕分辨率
  viewPoint: window.innerWidth + "X" + window.innerHeight,  // 视口大小
  selector: getSelector(centerElements[0]),  // 屏幕中心点选择器
});

// 接口请求监控
tracker.send({
  kind: "stability", // 日志种类：稳定性指标
  type: "xhr", // 小类型 接口请求
  eventType: type,  // load, error, abort 请求类型
  pathname: this.logData.url, // 请求路径
  status: status + "-" + statusText, // 状态码
  duration, // 请求持续时间
  response: this.response ? JSON.stringify(this.response) : "", // 响应体
  params: body || "", // 入参
});
```

  gitHub地址：[https://github.com/HaiDong-Once/personal-code/tree/main/myProject/monitorSystem/monitorSDK](https://github.com/HaiDong-Once/personal-code/tree/main/myProject/monitorSystem/monitorSDK)

