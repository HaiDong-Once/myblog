
# 创建vue3 + vite + Ts + sass +pinia + uniapp 项目
[[toc]]



## 项目创建流程
### 创建vue3+vite
```shell
# 创建以 javascript 开发的工程  
npx degit dcloudio/uni-preset-vue#vite uniapp-vue3-vite 

# 创建以 typescript 开发的工程  
npx degit dcloudio/uni-preset-vue#vite-ts uniapp-vue3-vite 
```

### 进入目录
```shell
uniapp-vue3-vite
```

### 安装依赖
```shell
yarn instal
```
注意：项目要求node版本 14.18.0 || >=16.0.0，需要升级node版本到14.18.0
```shell
warning package.json: No license field
info No lockfile found.
warning uni-preset-vue@0.0.0: No license field
[1/4] Resolving packages...
warning @dcloudio/uni-app > @dcloudio/uni-cloud > @dcloudio/uni-cli-shared > @vue/compiler-sfc > magic-string > sourcemap-codec@1.4.8: Please use @jridgewell/sourcemap-codec instead
[2/4] Fetching packages...
error @dcloudio/uni-cli-shared@3.0.0-alpha-3070720230316001: The engine "node" is incompatible with this module. Expected version "^14.18.0 || >=16.0.0". Got "14.17.0"
error Found incompatible module.
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.

```

### 运行
```shell
# 运行到 h5   
npm run dev:h5  
# 运行到 app   
npm run dev:app  
# 运行到 微信小程序  
npm run dev:mp-weixin
```

### 打包
```shell
# 打包到 h5   
npm run build:h5  
# 打包到 app   
npm run build:app  
# 打包到 微信小程序  
npm run build:mp-weixin
```

### 安装css 预处理器
```shell
yarn add sass node-sass sass-loader -D
```
报错未找到python,需安装后手动配置
```shell
npm config set python "npm config set python "C:\Python27 python.exe"
```
重新安装

### 配置@路径
```ts
// vite.config.ts
const path = require('path');

export default defineConfig({
  resolve: {
    // 配置路径别名
    alias:{
      '@': path.resolve(__dirname,'./src')
    }
  }
});
```
使用：
```scss
.box{
    width:200px;
    height:200px;
    background:url('@/assets/logo.png') no-repeat;
    background-size: cover;
}
```

### 安装配置pinia状态管理
pinia轻量，用法更简单，更适合组合式api开发方式，适合简单项目
```shell
yarn add pinia
```

在线src目录下新建一个store目录。store目录新建index.ts文件和modules目录。在modules目录进行模块化管理每个模块
![图片](/images/tools/chatGPT/img_30.png)

index.ts文件引入pinia
```ts
import type { App } from 'vue';

import {  createPinia} from 'pinia';

const store = createPinia();

export function setupStore(app: App<Element>){
    app.use(store);
}
```

在scr/main.ts 文件引入store;
```shell
import { createSSRApp } from "vue";
import App from "./App.vue";
import { setupStore } from '@/store';

export function createApp() {
  const app = createSSRApp(App);
  // pinia 仓库管理
  setupStore(app);
  return {
    app,
  };
}
```

user.ts创建一个商店
```ts
export const useCounterStore = defineStore('counter', () => {
	const count = ref(0);
	function increment() {
		count.value++;
	}
	return { count, increment };
});
```

使用状态
```html
<text class="title"> {{ test }} </text>
<button @click="changeTest">修改test</button>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from "@/store/modules/user";
import { computed } from "vue";

const user = useUserStore();
const test = computed(() => user.getTest)

function changeTest(){
  user.changeVal()
}

// 测试也可以直接获取直接修改
console.log(toUseUserStore.$state.test)
toUseUserStore.$state.test = '1212112';

// 或者省略$state
console.log(user.test)
user.test = '1212112';
</script>
```

启动报错
```shell
Uncaught SyntaxError: The requested module '/node_modules/vue-demi/lib/index.mjs?v=e1defeea' does not provide an export named 'hasInjectionContext' (at pinia.mjs:6:10)
```

解决方法：降低版本+ 去掉 “^"  ,   
原因："^2.x.x" 是会更新到 2.x.x的最新版本， 最新版本有些用法不一样
```json
// package.json
将"pinia": "^2.1.3"
改为："pinia": "2.0.36",
```

安装pinia 持久化插件
```shell
yarn add pinia-plugin-persist-uni
```

配置插件
```ts
// store/index.ts
import type { App } from 'vue';
import {  createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist-uni';

const store = createPinia();
store.use(piniaPersist);

export function setupStore(app: App<Element>){
    app.use(store);
}
```

tsconfig.json配置
```json
{
  "compilerOptions": {
    "types": ["pinia-plugin-persist-uni"]
  }
}
```

### hooks
```ts
export const useTitle = () => {
  let oldValue = 'Hello';
  let newValue = 'Word';
  const title = ref(oldValue);
  function changeTitle() {
    oldValue = title.value;
    title.value = newValue;
    newValue = oldValue;
  }
  return {
    title,
    changeTitle
  };
};

import { useTitle } from '@/hooks/useTitle';
import { forward } from '@/utils/router';

const { title, changeTitle } = useTitle();
```

### 接口请求
```ts
import apiTest from '@/api/apiTest';
async function getTest() {
  const getTest = await apiTest.getTest({ a: 1 });
  if (!getTest) {
    uni.showToast({
      title: '自定义异常处理'
    });
    return;
  }
  console.log(getTest, 'getTest');
}
```

### 数据加载
```ts
onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
});
```

### 创建数据
```ts
import { reactive, ref } from 'vue'

let isLogin = ref(true)
let userInfo = reactive({
  pic: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ8SiagBMUuLZ7USibVCmnJBvy87ib8gT8gl1wrCwwZRVDsv9a6t4lbGLHcoiacKDxjvgw0v374xE3UkQ/132',
  nickName: 'coboy',
  memberLevelVO: 'Lv1',
  userMobile: '1382550699x',
})
 uni.navigateTo({
    url: `/pages/my/memberCenter`,
  })
```