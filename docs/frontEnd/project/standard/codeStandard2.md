# 前端基建：小团队前端代码规范基础篇

[[toc]]

## 1. 命名规范

*   **变量命名：** **❤️**

    *   使用驼峰命名法：let userInfo = {}，const orderId = 123。
    *   尽量避免缩写：尽量使用完整的描述性命名，let buttonSubmit 比 btnSub 更清晰。
    *   布尔值应以 is, has, can, should 开头，如：isValid, hasError。
    *   常量使用全大写下划线分隔命名 (力求语义表达完整清楚， 不嫌名字长)：const API\_ENDPOINT = ""。
    *   数组命名：名词+List, 名词+s, 如：userList

*   **函数命名：** **❤️**

    *   使用动词短语或（动词 或者 动词+名词 形式）：getUserInfo(), fetchData(), validateForm()。saveShopCarData /openShopCarInfoDialog
    *   注：常用动词参考文档底部

*   **组件命名：** **❤️**

    *   Vue 和 React 组件名使用大驼峰命名法：UserProfile, OrderList。

*   **文件命名：** **❤️**（包括文件夹，JS、CSS、SCSS、HTML、PNG 文件命名）

    *   全部采用小写方式， 以中划线分隔：user-profile.vue，order-list.js。
    *   每个文件只包含一个组件或一个功能模块，避免混杂多个功能。

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e6b2ddb3c6f64c6b99a88e8db06e4cdb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=FRlkWfNZM0lAYl3qKpHlWXlXr4Y%3D)

*   **命名严谨性（可读性）** **❤️**

    *   代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。（除特殊含义命名：如shuidi,jingdong)
    *   杜绝完全不规范的缩写，避免望文不知义

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/6eb570b2a17341b5a48717023e4aec83~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=mZElfqicRrEb%2FBsys4wrbEukKPQ%3D)

*   **避免魔法数字**

```javascript
// 魔法数字
if (state === 1 || state === 2) {
  // ...
} else if (state === 3) {
  // ...
}

// 魔法数字改用常量映射
const UNPUBLISHED = 1;
const PUBLISHED = 2;
const DELETED = 3;

if (state === UNPUBLISHED || state === PUBLISHED) {
  // ...
} else if (state === DELETED) {
  // ...
}
```

## 2. html规范

*   **基本规范：**

    *   缩进：缩进使用 2 个空格（一个 tab）；
    *   分块注释：在每一个组件模块，加上一对 HTML 注释。
    *   优先使用语义化标签：<header></header>
    *   引号：统一使用双引号(" ") 而不是单引号(’ ')

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/63479eb8c7c844318681339dd444a173~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=giPrppToSNSCP7%2BuZSRIWKjOU3Q%3D)

## 3. css规范

*   **命名：** **❤️**

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/abe5632902624dfca5e39252c7b61fab~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=Et%2BiLf2muMTy0T%2BVH3QJG5FkP5s%3D)

*   **选择器** **：** **❤️**

    *   css 选择器中避免使用标签名

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2dc14965552940b195d3208c9c3a49d9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=TgYIJCetUArut38fz%2B6NY2j0xww%3D)

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e257a749b00b4a31941e2b4227248c01~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=PgIzeKoeXEbHhlWDIqTmck0kL8A%3D)

```css
// 不推荐:
.content .title {
  font-size: 2rem;
}

// 推荐:
.content > .title {
  font-size: 2rem;
}
```

*   *   尽量使用缩写属性

```css
// 不推荐:
border-top-style: none; 
font-family: palatino, georgia, serif; 
font-size: 100%; line-height: 1.6; 
padding-bottom: 2em; 
padding-left: 1em;
 padding-right: 1em; 
 padding-top: 0;

// 推荐:
border-top: 0; 
font: 100%/1.6 palatino, georgia, serif; 
padding: 0 1em 2em;
```

*   *   省略 0 后面的单位

```css
// 不推荐:
 div {
   padding-bottom: 0px; 
   margin: 0em;
 }

// 推荐:
div {
    padding-bottom: 0; 
    margin: 0; 
}
```

*   *   尽量避免使用 ID 选择器及全局标签选择器防止污染全局样式

*   **LESS 规范** **：** **❤️**

    *   将公共 less 文件放置在 同一全局文件夹

    *   顺序组织

    *   *   1、@import;
        *   2、变量声明;
        *   3、样式声明；

    *   避免嵌套层级过多

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/756e8fac82884ca592d770c74553de70~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=5963XPiwGumtHBovkPThTrJoxBI%3D)

## 4.取值规范❤️

*   **默认值：**

    *   函数参数中为参数提供默认值：function fetchData(url = "/default-url") {}。
    *   避免直接使用 undefined，使用 null 或适当的默认值作为占位符。

*   **对象解构：**

    *   使用对象解构来获取对象中的值：const { name, age } = user;
    *   函数多个传参使用对象传参，解构取值；

```javascript
// 行参封装成对象，对象函数内部解构（防止漏穿顺序错误导致的问题）
const getMyInfo = (options) => {
  const { name, age, gender, address, phone, email } = options;
  // ...
}

// 使用
getMyInfo(
  {
    name: '张三',
    age: 18,
    gender: '男',
    address: '北京',
    phone: '123456789',
    email: '123456789@qq.com'
  }
)
```

*   *   使用空值合并操作符：const value = input ?? "default"。
    *   空函数判断

```javascript
// 优化前
props.onChange && props.onChange(e)
// 支持ES11
props?.onChange?.(e)
// 不支持ES11的老项目
const NOOP = () => 8
const { onChange = NOOP } = props
onChange(e)  
```

## 5. 错误捕获规范❤️

*   **try-catch：**

*   *   对于所有异步请求使用 try-catch 捕获错误，确保错误不会被忽略：

```javascript
  try {
  const response = await fetchData();
} catch (error) {
  console.error("Error fetching data:", error);
}
```

*   *   JSON 解析

```javascript
const jsonData = '{"name": "John", "age": 30}';

try {
  const user = JSON.parse(jsonData); // 正确的 JSON 解析
  console.log(user.name); // "John"
} catch (error) {
  console.error("Invalid JSON:", error); // 捕获 JSON 解析失败
}
```

*   *   DOM 操作

```javascript
try {
  const element = document.getElementById("non-existent-id");
  element.innerText = "Hello"; // 如果 element 为空，则会抛出异常
} catch (error) {
  console.error("Failed to manipulate DOM:", error);
}
```

*   *   正则表达式

```javascript
const userInput = "(test";

try {
  const regex = new RegExp(userInput); // 捕获不正确的正则表达式
  const result = regex.test("test");
  console.log(result); // true or false
} catch (error) {
  console.error("Invalid regular expression:", error);
}
```

*   *   第三方库调用

```javascript
try {
  const result = thirdPartyLibrary.doSomething();
} catch (error) {
  console.error("Error in third-party library:", error);
  alert("操作失败，请稍后重试");
}
```

*   *   浏览器 API 错误捕获

```javascript
// 在用户拒绝授权或操作不当兼容性等问题
try {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords);
  });
} catch (error) {
  console.error("Geolocation error:", error);
}  
```

*   **Promise 错误处理：**

    *   必须处理所有 Promise 的 catch，不要忽略潜在错误：

```javascript
fetchData().then(response => {
  // success
}).catch(error => {
  console.error("Error:", error); // 记录promise异常日志
});
```

*   **全局错误处理：**

    *   在 Vue 和 React 中设置全局错误处理机制，以便捕获捕获组件树中框架级的错误。(结合监控捕获上传日志）

vue错误捕获

```javascript
// 使用 Vue.config.errorHandler 全局捕获错误
Vue.config.errorHandler = function (err, vm, info) {
  console.error('Error in component: ', vm);
  console.error('Error info: ', info);
  console.error('Error message: ', err.message);
};
```

react错误捕获

```javascript
class ErrorBoundary extends React.Component {
 

  componentDidCatch(error, errorInfo) {
    // 可以在此处记录错误日志或进行其他处理
    console.error("Caught an error:", error, errorInfo);
  }

 
}

export default ErrorBoundary;
```

## 6. Vue 规范

*   **编码基础参考官方风格指南**：<https://v2.cn.vuejs.org/v2/style-guide/>

*   **组件结构：**

    *   组件名使用大驼峰命名，且 name 字段应与文件名保持一致。
    *   组件名应该始终是多个单词组成（大于等于 2），避免与 HTML 元素相冲突。如：KebabCase
    *   组件文件名为小写字母加中划线格式: my-component.vue

*   **Prop 定义** **：**

    *   避免直接修改 props，应通过 data 创建本地副本再修改。
    *   必须使用 camelCase 驼峰命名
    *   必须指定类型
    *   必须加上注释，表明其含义
    *   必须加上 required 或者 default，两者二选其一

```javascript
 props: {
   // 用户级别，用于显示皇冠个数
   userLevel：{
      type: String,
      required: true
   }
}
```

*   **生命周期函数：**

    *   按顺序排列生命周期函数：created -> mounted -> updated -> destroyed。

*   **样式规范：**

    *   使用作用域样式

*   **模板：**

    *   避免使用内联样式、内联事件，模板应简洁明了

*   **v-for必须绑定key, 不涉及删除添加的list可以使用:key="index"** **❤️**

*   **组件的 data 必须是一个函数**

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/caa75eed067a48a581c26bd54c248ec6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=p8CisMOwsFdxwin97O9LGISLxFs%3D)

*   **如果组件特性元素较多，应该主动换行**

```html
<MyComponent foo="a" bar="b" baz="c"
  foo="a" bar="b" baz="c"
  foo="a" bar="b" baz="c"
  />

  // 反例：
  <MyComponent foo="a" bar="b" baz="c" foo="a" bar="b" baz="c" foo="a" bar="b" baz="c" baz="c"/>
```

***

*   **v-show 与 v-if 选择:**

    *   如果运行时，需要非常频繁地切换，使用 v-show ；如果在运行时，条件很少改变，使用 v-if。

*   **script 标签内部结构顺序**

    *   components > props > data > computed > watch > filter > 钩子函数（钩子函数按其执行顺序） > methods

*   **router 中的命名规范**

    *   name 命名规范采用KebabCase命名规范且和component组件名保持一致（因为要保持keep-alive特性，keep-alive按照component的name进行缓存，所以两者必须高度保持一致）
    *   path、childrenPoints 命名规范采用kebab-case命名规范（尽量vue文件的目录结构保持一致，方便找到对应文件）；

```json
{
    path: '/file',
    name: 'File',
    component: Main,
    meta: {
      title: '文件服务',
      icon: 'ios-cloud-upload'
    },
    children: [
      {
        path: '/file/file-list',
        name: 'FileList',
        component: () => import('@/views/file/file-list.vue')
      },
    ]
  }
```

*   **注意：vue中尽量不要手动操作 DOM**

    *   尽量使用 vue 的数据驱动更新 DOM，尽量（不到万不得已）不要手动操作 DOM，包括：增删改 dom 元素、以及更改样式、添加事件等。

*   **vue3 （推荐）**

    *   推荐使用组合式API，在实现需求的时候，将每一个功能粒度细化，在每一个功能前后加上注释标注该功能的开始和结束，推荐使用的两种注释格式：

```json
1. region格式
// #region 功能描述
// code
// #endregion
2. start - end 格式
// 功能 - start
// code
// 功能 - end
```

*   *   函数颗粒度太细，推荐按照以下几种函数名区分函数的功能

        *   处理数据请求之类的函数， 可以用动词+形容词或者名词的形式，比如获取验证码可以叫getCode
        *   处理各种交互操作的函数，可以用on + 形容词或者名词（可选） + 动词 的形式，比如onLogin
        *   处理数据逻辑的函数， 可以使用形容词或者名词 + change的形式，比如processChange
        *   处理业务逻辑的函数，大部分以动词开头，比如create，init， update， delete，少部分以名词开头，比如ssrRender
        *   hooks函数，以use开头，比如useGetCode，useLogin

    *   组件的script中js的结构化，推荐按照props，emits，ref， computed， watch，methods，events，生命周期函数的顺序排列js代码

    *   对于比较复杂的功能，或者有多个页面ui不同但是功能相似的逻辑，推荐封装为hooks：

```javascript
// 一个hooks可能不能完全满足所有的功能，所以需要输入和输出，
// 对于输入，可以分为两种：
//  1. 整个功能多个函数需要的输入，可以放在hooks函数中，即作为useXXX()的参数
//  2. 整个功能中只有一个或者两个函数需要的输入，可以放在该函数中，即作为getCode()的参数
// 对于输出，也可以分为两种：
//  1. 函数可以作为完整的功能，所有的需求需要的这个函数都可以完整的hooks中实现，
//  2. 函数不可以作为完整的功能，可以只返回核心功能，或者通过回调函数处理其他逻辑
export function useVerifyCode() {
  const codeText = ref("获取验证码");

  const getCode = (phone) => {}

  const countDown = () => {}

  return {
    codeText,
    getCode
  }
}
```

## **7. React 规范**

*   **函数式组件优先**：React 组件应优先使用函数组件，结合 React Hooks 管理状态。

*   **for循环加 key索引**：**❤️**

*   **组件复用性**：

    *   保持组件职责单一，避免组件过大。提取复用逻辑为自定义 Hooks。

*   **JSX 书写规范**：

    *   JSX 代码中每个标签属性必须换行书写：

```html
<Component
  prop1="value1"
  prop2="value2"
  />
```

## 8. JavaScript 规范

*   **ES6+ 特性**：应优先使用 ES6+ 语法，如 const, let, 箭头函数, 模板字符串, 解构赋值，避免使用 var。

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b84ec7abfe184a1db3f172e415644dea~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=yMVd5ONpbxxrosXGGCNWgkdKJQ8%3D)

*   **箭头函数**：优先使用箭头函数，特别是在回调函数和事件处理程序中，避免 this 指向问题。
*   **括号**：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1bf8c60fdc0c4eaf84583d9745a24b24~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=m538J5WMt41hrblf3kbeIi9Ts6s%3D)

*   **条件判断和循环最多三层**

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9efe602b70e24564b2df8e2e3273d75c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=WkOmxgZdr3nCTtlLecJkV9%2BAf2Q%3D)

*   **慎用 console.log**

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/64446923b05f4ec29eae01c2eae6a6b0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=DW4BugdIAZLb7vqZVA4VqE4jHjU%3D)

## 9. 提交代码规范

*   **小步提交：** 每次提交应专注于一个小的功能或修复，避免过大的提交。

*   **规范的 commit 信息**：**❤️**

    *   每次提交详细说明提交内容： **【项目】项目端+页面+功能说明；（** 如：【水滴信用】水滴小程序 详情页 底部广告隐藏）

*   **避免大规模合并**：在提交之前，请确保与主分支进行 rebase，避免复杂的合并冲突。

## 10. 注释规范

*   **函数和复杂逻辑必须有注释**：

    *   使用 JSDoc 标准注释函数：

```javascript
  /**
 * 获取用户数据
 * @param {string} userId 用户ID
 * @returns {Object} 用户数据
 */
const getUserData = (userId) => { ... };
```

## 11. 逻辑判断规范

*   **避免使用双等号 ==**：应始终使用严格等于 === 来进行比较。（避免隐式转换产生的异常）
*   **条件判断简洁化**：（永辉）

    *   尽量避免使用复杂的嵌套条件语句，必要时使用**早返回**减少嵌套层次。或者叫：“异常逻辑前置，正常逻辑后置”

```javascript
if (isValid) {
    if(data){
        // 逻辑    
    }
}

if (!data) return;
if (!isValid) return;
// 逻辑 
```

```javascript
// 判断逻辑不要嵌套太深
function checkStatus() {
  if (isLogin()) {
    if (isVip()) {
      if (isDoubleCheck()) {
        done();
      } else {
        throw new Error('不要重复点击');
      }
    } else {
      throw new Error('不是会员');
    }
  } else {
    throw new Error('未登录');
  }
}

// 将判断逻辑的异常逻辑提前，将正常逻辑后置
function checkStatus() {
  if (!isLogin()) {
    throw new Error('未登录');
  }

  if (!isVip()) {
    throw new Error('不是会员');
  }

  if (!isDoubleCheck()) {
    throw new Error('不要重复点击');
  }

  done();
}
```

*   **三元运算符**：对于简单的条件判断可以使用三元运算符，但应避免嵌套三元运算符。
*   **复杂判断逻辑抽离成单独函数**

```javascript
// 复杂判断逻辑
function checkGameStatus() {
  if (remaining === 0 ||
    (remaining === 1 && remainingPlayers === 1) ||
    remainingPlayers === 0) {
      quitGame()
  }
}

// 复杂判断逻辑抽离成单独函数，更方便阅读
function isGameOver() {
  return (
    remaining === 0 ||
    (remaining === 1 && remainingPlayers === 1) ||
    remainingPlayers === 0
  );
}

function checkGameStatus() {
  if (isGameOver()) {
    quitGame();
  }
}
```

*   **分支逻辑优化**

```javascript
// if else
const statusMap = (status: string) => {
    if(status === 'success') return 'SuccessFully'
    else if (status === 'fail') return 'failed'
        else if (status === 'danger') return 'dangerous'
    else if (status === 'info') return 'information'
    else if (status === 'text') return 'texts'
    else return status
}


// 使用映射进行优化， 代替分支逻辑
const STATUS_MAP = {
    'success': 'Successfull',
    'fail': 'failed',
    'warn': 'warning',
    'danger': 'dangerous',
    'info': 'information',
    'text': 'texts'
}

return STATUS_MAP[status] ?? status
```

## 12. 自检工具

*   **Lint 工具**：项目必须配置 ESLint，确保代码风格统一并避免潜在的错误, 开发工具配置代码检测插件。
*   **单元测试**：比较复杂重要的逻辑模块，编写 Jest 或 Mocha 等工具的单元测试，确保主要逻辑和组件的稳定性。
*   **AI工具自动codeReview**, ：codeGeex, 豆包插件，或者GPT代码段落codeReview(实测GPT效果更好）；还有一款专业的codeReview工具：[CodeRabbit](https://link.juejin.cn/?target=https%3A%2F%2Fcoderabbit.ai%2F)；

## 13. 性能优化规范

*   **图片优化：**

    *   图片资源使用合适的尺寸与格式：一般使用2倍ui图尺寸即可 **❤️**
    *   图片懒加载：确保非首屏图片采用懒加载，减少初始加载体积。

*   **CSS 优化：**

    *   避免使用无效的 CSS 规则，减少层级过深的选择器。

*   **节流与防抖：** 对于频繁触发的用户操作（如输入、滚动、点击），使用节流（throttle）和防抖（debounce）技术，避免性能瓶颈。

*   **减少重绘与重排**

    *   尽量减少 DOM 操作和样式修改，缓存 DOM 元素减少查询，避免频繁触发重绘（repaint）或重排（reflow）。
    *   脱离文档流进行大量的dom操作：通过 display: none 先移出文档流

```javascript
const list = document.getElementById('list');
list.style.display = 'none';  // 先隐藏列表，避免多次重排

for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  list.appendChild(li);
}

list.style.display = '';  // 批量操作完成后再显示  
```

## 13. uniapp规范

### 支付宝端兼容问题

**注：因支付宝端接入流量较大，涉及水滴信用小程序支付宝端开发，上架前需要测试检查兼容问题；**

*   **支付宝端不支持**`v-show`

    *   使用`v-show`会导致长显，支付宝环境需要用v-if替代

```html
<!-- #ifdef MP-ALIPAY -->
<my-loading v-if="loading">加载中</my-loading>
<!-- #endif -->
<!-- #ifndef MP-ALIPAY -->
<my-loading v-show="loading">加载中</my-loading>
<!-- #endif -->
```

*   **禁止给组件标签添加样式**

    *   组件标签添加 `class`样式无效
    *   `swiper-item`标签添加了`relative`属性会导致第二页开始空白
    *   解决方法：避免在组件标签上添加`class`名，使用嵌套一层的方式；禁止在组件标签写入样式

```html
<uni-popup class="hqs-popup"> // 打包后支付宝没有hqs-popup以及其子样式
           
// 解决方法 嵌套一层写到正常标签
<view class="hqs-popup">
  <uni-popup>
</view>
```

*   **支付宝span标签不支持点击事件**

    *   原因：`span`标签会解析成`bable`标签，支付宝端点击事件无效
    *   解决方法：避免使用`span`标签，禁止在`span`标签上添加事件

```html
<span @click="toClick">编辑</span> // 点击事件无效
           
// 解决方法 使用text标签替换
<text @click="toClick">编辑</text> 
```

*   **支付宝swiper组件不支持** `display-multiple-items `**属性**

    *   解决方法：支付宝端 `display-multiple-items `只能传值“1”

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2eb8fc5d9b7742e99c58ea5266d8b505~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=J5ptR5JmiiJhhRI7C%2B9C46wivls%3D)

```html
<swiper :display-multiple-items="isAlipayMiniProgram ? 1 : 1.16" >
```

*   **支付宝图片标签 不支持** `mode="widthFix" `**属性**

    *   解决方法：要求uniapp端图片格式都使用固定宽高，避免使用`mode="widthFix"`
    *   注意：及时设置了固定宽高，也要去掉`mode="widthFix"` 属性，否则也有样式异常

```html
<img class="vip" mode="widthFix" ...> // 样式异常

// 解決方法
<img class="icon" :src="....."  alt="">

.icon{
  width: 100rpx;
  height: 100rpx
}
```

*   **支付宝小程序textarea会有默认字数/最大字数样式**

    *   解决方法：支付宝端去掉自定义样式

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/309788e4c0c24f17a8e3cdd1a8c71149~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749638381&x-orig-sign=3qUGuyOaq%2B8x0bEocpE%2BjS1%2F854%3D)

*   **支付宝小程序input,textarea标签组件会有默认样式**

    *   解决方法： 1. 给标签组件单独添加样式覆盖

```html
<div class="input-box">
  <input/>
</div>

.input-box {
  width: 640rpx;
  height: 91rpx;
  background-color: #f8faff;
  border-radius: 13rpx;
  border: solid 1rpx #f3f5fb;
  line-height: 91rpx;
  padding: 0 30rpx;
  margin-top: 30rpx;
  position: relative;

  /* 覆盖支付宝默认标签组件样式 */
  textarea, input {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    font-size: 29rpx; /* 不会继承父级样式 */
    padding: 0;
  }
}
```

### 头条端兼问题

*   **头条小程序ios设备输入框聚焦异常问题**

    *   问题描述：ios高端机`input`输入框聚焦后会立刻失焦
    *   解决方法：给`input`标签添加 `@click.stop=""`； 注意textarea标签不可添加`@click.stop=""`，否则会导致部分ios低端机型`textarea`无法聚焦；

```html
<div class="input-box">
  <input @click.stop="" />
  <textarea /> <!-- textarea标签不可添加@click.stop="" -->
</div>
```

## 13. SEO规范

### PC端SEO规范

#### **pc页面跳转保持** `<a> `**链接结构**

*   **规范说明：pc端大部分跳转使用js跳转不利于seo；**
*   **场景1：直接跳转页面无跳转逻辑（无埋点，无条件判断，无动态参数）**

    *   使用a链接直接跳转，设置静态`href`链接

```html
<-- 使用a链接直接跳转-->
<a href="https://example.com/new-page" 
   id="link-with-logic" 
   class="dynamic-link">
  跳转到新页面
</a>
```

*   **场景2：跳转页面有逻辑处理（有埋点，条件判断等）**

    *   保持`  <a>  `\*\*\*\*链接结构：跳转标签使用a链接替换设置默认`href`地址（`href` 只是用作备份，保证地址可正常访问，供搜索引擎使用）
    *   使用` event.preventDefault()` 阻止a链接默认事件
    *   在 `JavaScript` 中控制跳转逻辑和事件

```html
<-- 标签使用a链接替换设置默认href地址 -->
<a href="https://example.com/new-page" 
   id="link-with-logic" 
   class="dynamic-link">
  跳转到新页面
</a>
```

```javascript
// js中控制跳转逻辑和事件

const link = document.getElementById('link-with-logic');
  link.addEventListener('click', function (event) {
    event.preventDefault();  // 阻止a链接默认跳转
    
    // 1. 打点（统计点击行为）
    trackClickEvent('详情页入口点击');

     // 更新 href 地址
     const newHref = `https://example.com/new-page?param1=${dynamicParam1}`;

    // 2. 登录效验
    if (isLoggedIn()) {
      // 用户已登录，跳转到目标页面
      window.location.href = newHref;
    } else {
      // 用户未登录，跳转到登录页面
    }    
    
  });
```

## **命名规范常用动词参考**

```json
add / update / delete / detail / get 
附： 函数方法常用的动词: 
get 获取/set 设置, 
add 增加/remove 删除, 
create 创建/destory 销毁, 
start 启动/stop 停止, 
open 打开/close 关闭, 
read 读取/write 写入, 
load 载入/save 保存,
begin 开始/end 结束, 
backup 备份/restore 恢复,
import 导入/export 导出, 
split 分割/merge 合并,
inject 注入/extract 提取,
attach 附着/detach 脱离, 
bind 绑定/separate 分离, 
view 查看/browse 浏览, 
edit 编辑/modify 修改,
select 选取/mark 标记, 
copy 复制/paste 粘贴,
undo 撤销/redo 重做, 
insert 插入/delete 移除,
add 加入/append 添加, 
clean 清理/clear 清除,
index 索引/sort 排序,
find 查找/search 搜索, 
increase 增加/decrease 减少, 
play 播放/pause 暂停, 
launch 启动/run 运行, 
compile 编译/execute 执行, 
debug 调试/trace 跟踪, 
observe 观察/listen 监听,
build 构建/publish 发布,
input 输入/output 输出,
encode 编码/decode 解码, 
encrypt 加密/decrypt 解密, 
compress 压缩/decompress 解压缩, 
pack 打包/unpack 解包,
parse 解析/emit 生成,
connect 连接/disconnect 断开,
send 发送/receive 接收, 
download 下载/upload 上传, 
refresh 刷新/synchronize 同步,
update 更新/revert 复原, 
lock 锁定/unlock 解锁, 
check out 签出/check in 签入, 
submit 提交/commit 交付, 
push 推/pull 拉,
expand 展开/collapse 折叠, 
enter 进入/exit 退出,
abort 放弃/quit 离开, 
obsolete 废弃/depreciate 废旧, 
collect 收集/aggregate 聚集
```
