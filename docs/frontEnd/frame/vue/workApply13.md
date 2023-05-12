

# vuex数据持久化实现

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
