
_# 前端分享会 2022-10-08

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
