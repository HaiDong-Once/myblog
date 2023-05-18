

# vue2.7升级文档及说明
[[toc]]


## 迁移介绍
:::tip
- Vue 2.7 是 Vue 2 最新的次级版本。其提供了内置的组合式 API 支持。
- 因vue2后续不再维护升级，对于老项目升级vue3时间成本过高的情况，又想用vue3的api和代码组织方式时，
那Vue2.7无疑是最佳选择，还可以让使用Vue2的同学更好的学习并过渡到Vue3。
:::

### 来自vue3的特性
- 组合式 API
- 单文件组件内的 `<script setup>`
- 单文件组件内的 `CSS v-bind`

### 支持以下api
- `defineComponent()` 以改善类型推断 (较之于` Vue.extend`)
- `h()`、`useSlot()`、`useAttrs()`、`useCssModules()`
- `set()`、`del()` 和 `nextTick()` 也在 `ESM` 构建版本中被导出为具名 `API`。
- 支持 `emits` 选项，但仅以类型检查为目的 (并不会影响运行时的行为)

### 注意事项
- 在 ESM 构建版本中，这些 API 会 (且仅会) 被导出为具名 API：
```ts
import Vue, { ref } from "vue";

Vue.ref; // undefined，请换为使用具名导出的 API
```
- 在 UMD 和 CJS 构建版本里，这些 API 会被导出为全局对象 Vue 的属性。
- 当调用外置的 CJS 版本进行打包时，打包工具应该有能力处理与 ESM 模块的互操作 (ESM interop)。

### 与 Vue 3 的行为差异
组合式 API 使用了 Vue 2 中基于 getter/setter 的响应式系统，以确保浏览器的兼容性。
这意味着其行为和 Vue 3 中基于代理的系统相比有一些重要的区别：

- 所有 Vue 2 检测变化的注意事项依然存在。
- reactive()、ref() 和 shallowReactive() 会直接转换原始的对象而不是创建代理。这意味着：
```ts
// 2.7 中为 true，3.x 中为 false
reactive(foo) === foo;
```
- ` readonly()` 会创建一个独立的对象，但是其不会追踪新添加的属性，也不会对数组生效。
- 避免将数组作为 `reactive()` 的根值。因为无法访问属性，数组的变更不会被追踪到 (这样做会产生一则警告)。
- 响应式 API 会忽略以 symbol 作为 key 的属性。
- 此外，我们并没有移植回以下特性：
- ❌ `createApp()` (Vue 2 不支持相互隔离的应用 scope)
- ❌ `<script setup>` 中的顶层 `await` (Vue 2 不支持异步组件初始化)
- ❌ 模板表达式中的 `TypeScript` 语法 (与 `Vue 2 parser` 不兼容)
- ❌ 响应性语法糖 (仍处于试验阶段)
- ❌ 选项式组件不支持 `expose` (但是在 `<script setup>` 中支持 `defineExpose()`)。



## 升级指南
### Vue CLI / webpack
1. 将本地的 `@vue/cli-xxx` 依赖升级至所在主版本范围内的最新版本 (如有)：
   - v4 升级至 ~4.5.18
   - v5 升级至 ~5.0.6
2. 将 vue 升级至 ^2.7.0。同时你可以从依赖中移除 `vue-template-compiler`——它在 2.7 中已经不再需要了。<br>
注意：如果你在使用 `@vue/test-util`s，那么 `vue-template-compiler` 需要保留，因为该测试工具集依赖了一些只有这个包会暴露的 API。
3. 检查包管理工具的版本锁定文件，以确保以下依赖的版本符合要求。它们可能是间接依赖所以未必罗列在了` package.json` 中。
   - vue-loader: ^15.10.0
   - vue-demi: ^0.13.1
   否则，你需要移除整个 `node_modules` 和版本锁定文件，然后重新安装，以确保它们都升到了最新版本。
4. 如果你曾经使用了 `@vue/composition-api`，将其导入语句切换至 vue 即可。注意有些之前通过插件暴露的 API，例如 `createApp`，并没有被移植回 2.7。
5. 如果你在 `<script setup>` 中遇到了未使用变量的 lint 错误，请更新 `eslint-plugin-vue` 至最新版本 (9+)。
6. 2.7 的单文件组件编译器使用了 `PostCSS 8` (从 7 升级而来)。`PostCSS 8` 应该向下兼容了绝大多数插件，
但是该升级可能在你使用了一些只支持 `PostCSS 7` 的自定义插件时遇到问题。这种情况下，你需要升级相应的插件至其兼容 `PostCSS 8` 的版本。

### Vite
- 2.7 通过一个新的插件提供对 Vite 的支持：`@vitejs/plugin-vue2`。这个新的插件需要 Vue 2.7 或更高版本，并取代了已有的 `vite-plugin-vue2`。
- 注意这个新插件刻意不会处理 Vue 特有的 `JSX / TSX` 转换。在 Vite 中，Vue 2 的 `JSX / TSX` 转换是通过一个独立的插件进行处理的：`@vitejs/plugin-vue2-jsx`。

### Volar 兼容性
2.7 的发布改进了类型定义，所以我们不必再只为支持 Volar 的模板类型推断而安装 `@vue/runtime-dom`。你现在只需要在 `tsconfig.json` 中进行以下配置：
```json
{
  "vueCompilerOptions": {
    "target": 2.7
  }
}
```
官方文档参考：[https://v2.cn.vuejs.org/v2/guide/migration-vue-2-7.html](https://v2.cn.vuejs.org/v2/guide/migration-vue-2-7.html)


## 升级过程
### 升级前版本
- vue: 2.6.10
- vue/cli: 5.0.8

### 升级步骤
1. 删除 `node_modules`, `pagage-lock.json`,避免依赖包缓存问题
2. vue升级达到2.7最新版
```json
// package.json
// 查看vue2的最新版本
npm view vue  // v2-latest: 2.7.14

// 修改vue pageage.json 中版本为：2.7.14
"vue": "^2.7.14",
```
3. 移除 `vue-template-compiler` ——它在 2.7 中已经不再需要了。
4. 重新安装依赖启动项目
```shell
npm install
npm run dev
```

### 注意事项

#### @vue/composition-api
如果已经使用了 `@vue/composition-api`，需要跟换导入方式
```ts
// import { ref } from '@vue/composition-api'
import { ref } from 'vue'
```
注意：@vue/composition-api 中有部分特性没有被迁移回2.7，如果有用到这些特性，需要继续使用功能 @vue/composition-api，
或者使用其他写法替换这些特性统一使用2.7的特性。如 craateApp, setup script 顶层使用await等。

#### 使用ESNext语法
Vue2.7支持在模板表达式中使用ESNext语法，这意味着可以在template里使用可选链
```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  count1: {},
})

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state?.count }}
    {{ state?.count1?.name ?? '22223'}}
  </button>
</template>
```

#### eslint问题
- 在上面的代码中，会出现 `Eslint` 未使用变量的错误提示。
- 解决这个问题我们需要将 `eslint-plugin-vue` 版本升级到9+。
```shell
npm i eslint-plugin-vue@9.0.0 -D
```
##### vue/multi-word-component-names 爆红
- 原因：根据官方风格指南，除了根组件（App.vue）外，自定义组件名称应该由多单词组成，防止和html标签冲突。
而最新的vue-cli创建的项目使用了最新的 `vue/cli-plugin-eslint` 插件，在 `vue/cli-plugin-eslint v7.20.0` 
版本之后就引用了 `vue/multi-word-component-names` 规则，所以在编译的时候判定此次错误。<br>
- 修改名称：修改组件名为多个单词，使用大驼峰命名方式或者用“-”连接单词。修改index.vue为唯一命名 如：TestIndex.vue <br>
- 关闭命名规则校验:在根目录下找到 `.eslintrc.js` 文件，同样如果没有则新建一个（注意文件前有个点），代码如下
```shell
module.exports = {
    rules: {
        "vue/multi-word-component-names": ["error",{
            "ignores": ["index"] //需要忽略的组件名
        }]
        // "vue/multi-word-component-names":"off",
    },
}
```

#### ::v-deep , /deep/ 警告
原因：css深度更改样式语法变化，将`::v-deep .header` 替换为 `:deep(.header)` 即可解决。

#### vue2.7引入vue-router报错
- 原因：vue3 使用的是vue-router4,而vue2.7使用的是vue-router3
- 先将vue-router升级至3.6.5以上，然后使用以下语法。
```ts
import { useRouter, useRoute } from 'vue-router/composables'

const $router = useRouter()
$router.push('/home)
```

#### 引入动态组件报错
- vue2.7 使用动态组件 `<component :is='xxx'` 报错：
`Unknown custom element: <participants> - did you register the component correctly`
- 如下所示定义一个对象，将组件放入即可。
```vue
<component
    :is="compents[currentComponent]"
/>

<script setup>
import participants from './components/participants/index.vue'
import planInformation from './components/planInformation/index.vue'
import plannedCourses from './components/plannedCourses/index.vue'

const compents = { participants, planInformation, plannedCourses }
<script/>
```