
# nuxt3项目搭建流程
[[toc]]


## 项目安装
### 安装pnpm
```shell
sudo npm install -g pnpm
```

### 创建nuxt3项目
```shell
pnpm dlx nuxi init my-nuxt3-templete
```
安装失败问题
```shell
ERROR  Error: Failed to download template from registry
```
解决方法：设置host
```shell
185.199.108.133 raw.githubusercontent.com
```

### 安装依赖
```shell
// cd 项目名
pnpm install
```

### 启动项目
```shell
pnpm dev
```


## 项目配置
### 安装ant-design
```shell
pnpm add -D @ant-design-vue/nuxt
```

#### 配置ant-design
```ts
export default defineNuxtConfig({  
    modules: ['@ant-design-vue/nuxt'],  
    antd:{    // Options  }
})
```

#### 使用
```html
<template>
  <a-button @click="handleMessage">
    button
  </a-button>
</template>
```

### 安装pinia
```shell
pnpm add @pinia/nuxt
```
#### 配置
```ts
modules: [
'@ant-design-vue/nuxt',
'@pinia/nuxt',
]
```

配置一个autoImport 运行时自动引入defineStore
```ts
 modules: [
    '@pinia/nuxt'
  ]
 pinia: {
   autoImports: [
    'defineStore', // import { defineStore } from 'pinia'
   ]
 }
```

新建目录composables，新建文件store.ts
```ts
export const useNuxtStore = defineStore('nuxtStore', () => {
  const state = ref(0)
 
  const setState = (num: number) => {
    state.value = num
  }
 
  return {
    state,
    setState,
  }
})
```

使用store
```vue
<script setup lang="ts">
const store = useStateStore()
</script>

<template>
  <div style="font-size: 40px; line-height: 60px;">
    <div>Hi! I'm nuxt project!</div>
    <div>
      Here state: {{ store.state }}
      <button @click="store.setState">setState</button>
    </div>
  </div>
</template>
```

#### 安装持久化插件
```shell
pnpm add @pinia-plugin-persistedstate/nuxt
```
配置
```ts
modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ]
```
数据持久化配置,注册插件(plugis/pinia.ts)
```ts
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export default defineNuxtPlugin((nuxtApp) => {    nuxtApp.$pinia.use(piniaPluginPersistedstate)})
```
新建文件(store/counter.ts)
```ts
import { defineStore } from 'pinia'

interface CounterState {
    times: number
    name: string
}

export const userCounter = defineStore('counter',{
    state: (): CounterState => ({
        times: 5,
        name: "追光的栗子"
    }),

    actions: {
        increment(){
            this.times ++
            this.name = "栗子"
        }
    },

    persist: process.client && {
        storage: localStorage
    }

})
```
使用：
```vue
<div>{{ counter.name }}</div>
<div>{{ counter.times }}</div>

<button @click="change">改变pinia中的数据</button>


import { userCounter } from '~/store/counter'
import { useStore } from "~/store/plugin";

console.log(useStore.someState)

const counter = userCounter()

const change = ()=>{
  counter.increment()
  console.log(counter.times)
  console.log(counter.name)
}
```
简化写法:
```ts
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => {
        return {
            someState: '你好 pinia',
        }
    },

    actions: {
        setSomeState(newValue) {
            this.someState = newValue
        },
    },
})
```
使用：
```ts
import { useStore } from "~/store/index";
const store = useStore()
console.log(store.setSomeState('222222'))
```


### 安装scss
```shell
pnpm add sass -D
```
使用
```vue
<style scoped lang="scss">
.card-box{
  font-size: 40px; line-height: 60px;
  span{
    color: red;
  }
}
</style>
```


### 代码规范配置
#### enlint配置
```shell
npx eslint --init
```
```shell
G:\persnal\personal-code\nuxt3\my-nuxt3-templete>npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · vue
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ What format do you want your config file to be in? · JavaScript
```

虽然nuxt3默认支持了typescript，但是用eslint还是提示Cannot find module ‘typescript’，所以需要再安装typescript依赖
```shell
yarn add -D typescript
```

安装eslint-plugin-nuxt执行
```shell
yarn add -D eslint-plugin-nuxt，extends项中增加

"plugin:nuxt/recommended"，删除
"eslint:recommended"(eslint默认校验)
```

删除plugins项下的
```shell
"vue"，同时可以选择性在rules项中增加
"vue/multi-word-component-names": 0，nuxt中提倡vue文件和组件使用kebab-case（烤肉串式）风格命名，将该规则设为0关闭校验
```

#### 安装prettier：
```shell
yarn add -D prettier eslint-plugin-prettier eslint-config-prettier
```
- 现在去尝试重新编辑一下代码然后ctrl+s保存发现已经会自动格式化了
- 设置prettier格式化规则，eslint和prettier结合使用可以直接在eslintrc中配置prettier不需要单独再新建.rettierrc.js了，如下是我最终配置可参考：
```ts
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
      'vue/multi-word-component-names': 0, //关闭vue文件和组件命名校验
      'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'prettier/prettier': [
      'error',
      {
        printWidth: 140, //代码单行长度
        tabWidth: 2, //tab键缩进为2空格
        useTabs: false, //使用空格缩进
        singleQuote: true, //js单引号
        semi: false, //去分号
        trailingComma: 'none', //无尾逗号
        arrowParens: 'avoid', //箭头函数尽可能省略括号
        jsxBracketSameLine: true //标签换行后>单独一行
      }
    ]
  }
}
```

```shell
代码commit前验证eslint和commitlint
安装：yarn add husky lint-staged -D
执行：npx husky-init && yarn和npx husky add .husky/pre-commit 'npx lint-staged'
检查package是否新增scripts:"prepare": "husky install"，和"lint-staged: {...}"项,没有的话手动加一下，同时加入scripts："lint": "eslint --ext .js,.ts,.vue --ignore-path .gitignore .",和 "lint:fix": "eslint --fix --ext .js,.ts,.vue --ignore-path .gitignore .",
修改"lint-staged"："lint-staged": { "*.{js,jsx,vue,ts,tsx}": [ "yarn lint:fix" ] }
到这commit前验证eslint就完成了，下面继续commitlint
安装：yarn add -D @commitlint/cli @commitlint/config-conventional
配置package: "commitlint": { "extends": [ "@commitlint/config-conventional" ] }
执行：npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
配置完成，提交代码测试一下
```


### vant 安装
```shell
pnpm add -D  @vant/nuxt
```

#### 配置：
```ts
modules: [
  '@vant/nuxt',

]
vant: {
  /** Options */
},
```

#### 使用：
```html
<van-button type="primary" @click="showToast('toast')">button</van-button>
<VanButton type="success" @click="showNotify('notify')">button</VanButton>
<LazyVanButton type="default">lazy button</LazyVanButton>
```

#### 移动端适配
```shell
pnpm add -D postcss-pxtorem
pnpm add -D postcss
pnpm add -D autoprefixer
```

在nuxt.config.ts中配置postcss参数。以1080px的尺寸做为设计稿参考值，
```json
postcss: {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
        "last 10 versions", // 所有主流浏览器最近10版本用
      ],
      grid: true,
    },
    'postcss-pxtorem': {
      rootValue({ file }: any) {
        return file.indexOf('vant') !== -1 ? 37.5 : 108
      },
      propList: ['*'],
      exclude: /(node_module)/,
      selectorBlackList: ['html', '.rem-ignore']
    }
  }
},
```


app.vue:因为服务端渲染无法获取window屏幕宽度来获取html动态px值, 使用vw取代
```vue
<style>
html {
  font-size: 10vw;
}

body {
  font-size: 16PX;
}
</style>
```


### 浏览器兼容配置
使用默认兼容配置最低兼容到es6
```ts
vite: {
  build: {
    target: ['es2015']  // 兼容到es6, chrome 78以上
  }
}
```


### 配置bese url
```ts
const npm_lifecycle_script = process.env.npm_lifecycle_script;
let apiBase = 'https://xbh.shuidi.cn';
let cdnURLApp = 'https://cdnxbh.shuidi.cn';
let cdnURL = 'https://staticcdn.shuidi.cn';
// @ts-ignore
if(npm_lifecycle_script.includes('test')){
    apiBase = 'https://xbh2.test.pingansec.com';
    cdnURL = 'http://static.test.pingansec.com';
    cdnURLApp = ''
}

export default defineNuxtConfig({
    runtimeConfig: {
        apiSecret: '',
        public: {
            apiBase: apiBase,
            cdnURL: cdnURL,
        }
    },

    app:{
        cdnURL: cdnURLApp // cdn静态资源配置    
    }
})
```

命令配置
```json
"scripts": {
  "build": "nuxt build",
  "test": "nuxt build --test",
  "dev": "nuxt dev --test",
},
```

使用
```ts
const { public: { apiBase } } = useRuntimeConfig();

/**
 * 初始化页面
 */
const initPage = async () => {
  try {
    const {data, pending, error, refresh} = await useFetch(apiBase +'/xinbohui_api', {})
  } catch (error) {
    console.log(error)
  }
}
```


### 代理配置
```json
nitro: {
  devProxy: {
    "/shuidi_api": {
      target: "http://localhost:3000/", // 这里是接口地址
      changeOrigin: true,
      // pathRewrite: { '^/shuidi_api/' : '/' },
    },
  },
},
```


## hooks抽离案例
### pa统计
```ts
import { ref } from 'vue';

/**
 * Version: pa打点 hook 封装
 * Author: hhd
 * Created: 2023/08/03
 * @return {{firePingansec: ((function(*): Promise<void>)|*)}}
 * @description:
 *  import usePingansec from '~/hooks/usePingansec'
 *  const { firePingansec } = usePingansec();
 *  firePingansec(5342)
 */

export default function usePingansec() {
  const pingansec = ref(null);

  const loadPingansec = async () => {
    if (!pingansec.value) {
      pingansec.value = await import('pingansec-vue-ana');
    }
  };

  const firePingansec = async (code) => {
    await loadPingansec();
    pingansec.value.default.fire(code);
  };

  return {
    firePingansec,
  };
}
```