# scss应用整理

[[toc]]

## 一、引言

### SCSS（Sass）介绍

SCSS 是 Sass 3 引入新的语法，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。SCSS语法可以让我们使用变量、嵌套规则、Mixin混入、函数、
继承等方式来编写CSS，这些功能可以极大地提高CSS的开发效率和可维护性。

- Scss其实是Sass的改进版本，Sass 3就变成了Scss(sassy css)。与原来的语法兼容，只是用{}取代了原来的缩进。
- 与Less比较：Less环境较Sass简单，Sass的安装需要安装Ruby环境，Less基于JavaScript，需要引入Less.js来处理代码输出css， Less的语法，工具库，处理机制都与scss不同。
- scss优势：解决css代码冗余，提高扩展复用性，提高css计算能力

## 二、安装与配置

### 如何安装Sass编译器

首先安装css-loader、style-loader、node-sass、sass-loader。

```shell
npm install css-loader style-loader --save-dev
npm install node-sass sass-loader --save-dev
```

### 配置Sass编译器的方法

例如：使用命令行、Gulp、Webpack等

```js
module.exports = {

    module: {
        rules: [
            {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },

} 
```

## 三、变量

### 如何在SCSS中声明和使用变量

- SCSS中的变量以$开头。
- 变量名使用中划线或下划线都是指向同一变量的
- 后定义的变量声明会被忽略，但赋值会被执行， 类似es5 var

```scss
$border-color: #aaa; // 全局变量
.container {
  $border-width: 1px; // 局部变量
  border: $border-width solid $border-color; // 使用变量
}

// 编译后结果
.container {
  border: 1px solid #aaa;
} 
```

### 变量命名规范和最佳实践

组件库，利用变量配置，进行统一更改组件的颜色、字体大小等（换肤）

```scss
$color-primary: #3ecacb;
$color-success: #4fc48d;
$color-warning: #f3d93f;
$color-danger: #f6588e;
$color-info: #27c6fa;
```

图片的配置及全局引入: 如图片地址过长的问题

```scss
$common-path: './primary/assets/img/';
$icon-see: $common-path+'icon-see.png';
$icon-play: $common-path+'icon-play.png';
$icon-comment: $common-path+'icon-comment.png';
$icon-checkbox: $common-path+'icon-checkbox.png';
```

## 四、嵌套规则

### SCSS中的选择器嵌套

```scss
/*css*/
#content article h1 {
  color: #333
}

#content article p {
  margin-bottom: 1.4em
}

#content aside {
  background-color: #EEE
}

/*scss*/
#content {
  article {
    h1 {
      color: #333
    }

    p {
      margin-bottom: 1.4em
    }
  }

  aside {
    background-color: #EEE
  }
}
```

### 使用父选择器替代符&

但是对于伪类:hover、对于多class名等情况，则不应该以"后代选择器"的方式连接，比如

```scss
article a {
  color: blue;

  :hover {
    color: red
  }
}

// 解析结果：article a :hover
// 默认生成的会让article的a元素内 所有子元素 在被hover时都会变成红色

article a {
  color: blue;

  &:hover {
    color: red
  }
}

// 解析结果：article a:hover
// 默认生成的会让article元素内 a元素 在被hover时都会变成红色
```

父选择器&。适用于在各种伪类选择器；

```scss
// 伪类选择器
article a {
  color: blue;

  &:hover {
    color: red
  }
}

/*css*/
article a {
  color: blue
}

article a:hover {
  color: red
}

// 兄弟选择器
.box {
  &__input {
    width: 220px;

    & + span {
      margin-left: 10px;
    }
  }
}

/*css*/
.box__input {
  width: 220px;
}

.box__input + span {
  margin-left: 10px;
}

// 解决BEM冗长问题
.tea-assignhw {
  &__top {
    margin: 0;
  }
}

/*css*/
.tea-assignhw__top {
  margin: 0;
}
```

### 嵌套组合选择器

在嵌套规则中可以写任何css代码，包括群组选择器（,），子代选择器（>），同层相邻组合选择器（+）、同层全体组合选择器（~）等等，下面继续将自带选择器简化掉。

```scss
/*scss*/
.container ul {


  li {
    float: left;

    > a {
      display: inline-block;
      padding: 6px 12px;
    }
  }

}

// 子代选择器可以写在外层选择器右边（如下述例子）也可以写在内层选择器左边
li > {
  a {
    display: inline-block;
    padding: 6px 12px;
  }
}
```

### 嵌套属性

属性名从中划线-的地方断开，在该属性后边添加一个冒号:，紧跟一个{ }块，把子属性部分写在这个{ }块中。这样就可以实现属性的嵌套

```scss
/*css*/
li {
  border: 1px solid #aaa;
  border-left: 0;
  border-right: 0;
}

/*scss*/
li {
  border: 1px solid #aaa {
  left: 0;
  right: 0;
}
}

/*css*/
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}

/*scss*/
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}
```

## 五、分割与导入

### 如何使用@import@use

- 使用@import可以导入另外的sass文件（在生成css文件时会把相关文件导入进来）。在被导入文件中定义的变量和混合器maxin等均可在导入文件中使用。
- （1）Css中的@import规则，它允许在一个css文件中导入其他css文件。然而，后果是只有执行到@import时，浏览器才会去下载其他css文件，这导致页面加载起来特别慢。
- （2）Scss中的@import规则，不同的是，scss的@import规则在生成css文件时就把相关文件导入进来。这意味着所有相关的样式被归纳到了同一个css文件中，而无需发起额外的下载请求。
- 注：Sass官方目前已经开始打算用 @use 替代 @import 规则，因此鼓励使用 @use。但是，目前**只有 Dart Sass 支持 @use**，因此，现阶段主要还是使用 @import。

#### @import导入
@import 可以导入其他 SCSS 文件并将其内容插入到当前文件中。导入的文件可以带有或不带有 _ 前缀。如果带有 _ 前缀，SCSS 会将其视为部分文件（partial），不会编译成独立的 CSS 文件。
- 在文件路径中，不需要指定 .scss 后缀。
- 如果文件名前带有 _，SCSS 将其视为部分文件，并且不会单独编译这个文件。
```scss
// _variables.scss
$primary-color: #3498db;

// main.scss
@import 'variables';
// 或者
@import 'variables.scss';

body {
  background-color: $primary-color;
}
```

#### 使用 @use 导入 SCSS 文件（推荐）
- SCSS 官方推荐使用 @use 代替 @import，因为 **@use 会为导入的文件创建一个命名空间，避免变量、函数、混入等名称的冲突**。
- 通过 variables.$primary-color 访问变量。相比 @import，这种方式明确了变量或函数的来源，避免命名冲突。
```scss
// _variables.scss
$primary-color: #3498db;

// main.scss
@use 'variables';

body {
  background-color: variables.$primary-color;
}
```
1. **命名空间**：默认情况下，@use 会为每个导入的文件创建命名空间，这意味着你需要通过模块名来访问导入的变量或混入。
2. **重命名模块**：你可以使用 as 关键字为导入的模块创建别名。
```scss
@use 'variables' as var;

body {
  background-color: var.$primary-color;
}
```
3. **加载所有内容到当前命名空间**：使用 * 可以将模块的所有内容加载到当前文件的命名空间中。
```scss
@use 'variables' as *;

body {
  background-color: $primary-color; // 不需要通过命名空间访问
}
```


- 默认变量值： 通常情况下，在反复多次声明一个变量时，只有最后一个声明有效
- sass通过!default标签可以实现定义一个默认值（类似css的!important标签对立），!default表示如果变量被声明赋值了则用新声明的值，否则用默认值。

```scss
$fancybox-width: 400px !default;
.fancybox {
  width: $fancybox-width;
}
```

- 如果用户在导入该sass局部文件之前，声明了一个 $fancybox-width 变量，那么局部文件中对 $fancybox-width 赋值400px的操作就无效。如果用户没有做这样的声明，则 $fancybox-width
  将默认为400px。
- 也就是，在后面使用 !default 声明的变量，并不会覆盖其前面声明赋值的相同变量值。

### 嵌套导入

```scss
// blue-theme.scss
aside {
  background: blue;
  color: white;
}

.blue-theme {
  @import "blue-theme"
}

// 生成结果：
.blue-theme {
  aside {
    background: blue;
    color: #fff;
  }
}
```

### 使用原生@import

```scss
@import 'App.css';
```

## 六、混合器（Mixins）

在Scss中可以使用混合器@mixin和@extend继承指令来解决公共css抽离的问题，@mixin主要的优势就是它能够接受参数

### 如何创建和使用混合器

```scss
// 创建
@mixin define-emoji($name, $glyph) {
  span.emoji-#{$name} {
    font-family: IconFont;
    font-variant: normal;
    font-weight: normal;
    content: $glyph;
  }
}

// 使用
@include define-emoji("women-holding-hands", "👭");

// 编译后css
@charset "UTF-8";
span.emoji-women-holding-hands {
  font-family: IconFont;
  font-variant: normal;
  font-weight: normal;
  content: "👭";
}
```

### 混合器的参数和默认值

```scss
 // 除此之外，还可以为函数传参数。并添加默认值
@mixin get-border-radius($border-radius:5px,$color:red) {
  ...}

@include get-border-radius($color: blue, $border-radius: 10px); //传参使用
```

## 七、插值 #{}

通过 #{} 插值语句可以在选择器或属性名中使用变量。当有两个页面的样式类似时，我们会将类似的样式抽取成页面混合器， 但两个不同的页面样式的命名名称根据BEM命名规范不能一样，这时我们可使用插值进行动态命名。

### 实例1：页面级混合器中的类名利用#{}插值进行动态设置：

```scss
@mixin home-content($class) {
  .#{$class} {
    position: relative;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: hidden;

    &--left {
      margin-left: 160px;
    }

    &--noleft {
      margin-left: 0;
    }
  }
}
```

### 利用插值动态生成选择器、属性名和值

可以使用插值获取变量或函数调用到一个选择器、或属性值。

```scss
$bWidth: 5px;
$style: "blue";

.nav {
  border: #{$bWidth} solid #ccc;

  &.nav-#{$style} {
    color: #{$style};
  }
}


// 编译为：
.nav {
  border: 5px solid #ccc;
}

.nav.nav-blue {
  color: blue;
}
```

### 属性名使用插值变量

使用插值的一个好处是，可以直接将变量值作为属性名使用

```scss
$value: grayscale(50%);
$property: filter;

.nav {
  #{$property}: $value;
}

// 编译为：
.nav {
  filter: grayscale(50%);

```

### 在 @mixin 中使用插值

通过传递的参数创建选择器

```scss
@mixin define-emoji($name, $glyph) {
  span.emoji-#{$name} {
    font-family: IconFont;

    content: $glyph;
  }
}

@include define-emoji("women-holding-hands", "👭");

// 编译后结果：
@charset "UTF-8";
span.emoji-women-holding-hands {
  font-family: IconFont;
  content: "👭";
}
```

## 八、控制指令和循环

### 使用条件语句if, else

```scss
p {
  　 @if 1 + 1 == 2 {
      border: 1px solid;
    } 
    @if 5 < 3 {
      border: 2px dotted;
    }
}

@if lightness($color) > 30% {
  background-color: #000;
} @else {
  background-color: #fff;
}
```

### 循环语句for, while,each

```scss
@for $i from 1 to 10 {
  　.border-#{$i} {
    　　border: #{$i}px solid blue;
  }
}

$i: 6;
@while $i > 0 { 
  .item-#{$i} {
    width: 2em * $i;
  } 
  $i: $i - 2;
}

@each $member in a, b, c, d {
  .#{$member} {
    background-image: url("/image/#{$member}.jpg");
  }
}
```

## 九、继承与占位符

### 使用@extend

直接继承选择器内属性

```scss
.container {
  @extend %border-style;
  color: red;
}

.container1 { //继承另一个选择器
  @extend .container;
}
```

### 创建占位符选择器%

```scss
%border-style {
  border: 1px solid #aaa;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

// 继承创建的样式
.container {
  @extend %border-style;
}
```

## 十、运算的使用

SassScript 支持数字的加减乘除、取整等运算 (+, -, *, /, %)

### 运算支持多种类型

```scss
p {
  font: 10px/8px; // Plain CSS, no division
  $width: 1000px;
  width: $width/2; // Uses a variable, does division
  width: round(1.5)/2; // Uses a function, does division
  height: (500px/2); // Uses parentheses, does division
  margin-left: 5px + 8px/2px; // Uses +, does division
  font: (italic bold 10px/8px); // In a list, parentheses don't count
}
```

### 实例1：input组件根据输入框的高度设置左右内边距

```scss
.ps-input {
  display: block;

  &__inner {
    -webkit-appearance: none;
    padding-left: #{$--input-height + 10};
    padding-right: #{$--input-height + 10};
  }
}
```

## 十一、scss函数应用

### Sass允许用户自定义函数

```scss
　

@function double($n) {
  @return $n * 2;
}

#sidebar {
  width: double(5px);
}
```

### 颜色函数

```scss
lighten (#cc3, 10%) // #d6d65c
darken (#cc3, 10%) //  #a3a329
grayscale ( #cc3 ) // #808080
complement( #cc3 ) // #33c
```

## 十二、SCSS 两种注释方式：

```scss
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```

## 十三、使用案例

### 基础应用

- 变量：使用变量存储常用的值，如颜色、字体、尺寸等。这有助于保持一致性，同时在需要修改时只需更改变量的值。

```scss
$primary-color: #3498db;
$font-family: "Helvetica", sans-serif;

body {
  background-color: $primary-color;
  font-family: $font-family;
}
```

- 嵌套：利用嵌套减少选择器的重复，并更清晰地表示元素之间的层级关系。

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    display: block;
    padding: 0 10px;
    text-decoration: none;
  }
}
```

- 混合宏（Mixins）：创建可重用的代码块，减少重复代码。混合宏可以带参数，从而实现更灵活的定制。

```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}

.button {
  @include border-radius(5px);
}

@mixin button($bg-color, $text-color, $height: 30px) {
  background-color: $bg-color;
  color: $text-color;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  height: $height;
  line-height: $height;
}

.button-primary {
  @include button(#3498db, #fff);
}

.button-secondary {
  @include button(#2ecc71, #fff);
}
```

- 继承：使用@extend指令继承其他选择器的样式，避免编写重复样式。

```scss
%clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.container {
  @extend %clearfix;
}
```

- 函数：编写自定义函数，实现特定功能。函数可以返回一个值，用于计算和处理样式。

```scss
@function calculate-rem($size) {
  $rem-size: $size / 16px;
  @return $rem-size * 1rem;
}

body {
  font-size: calculate-rem(18px);
}
```

- 分割与导入：将SCSS代码分割成多个文件，使用@import@use导入。这有助于模块化和组织代码。

```scss
// _variables.scss
$primary-color: #3498db;

// main.scss
@import "variables";
body {
  background-color: $primary-color;
}

// main.scss
@use 'variables';
body {
  background-color: variables.$primary-color;
}
```

- 计算：响应式布局或精确的像素控制
```scss
.container {
  width: 100% - 20px;
}

.column {
  width: 50% - 10px;
}
```

### SCSS 实现换肤功能

#### 使用 SCSS 定义基础样式和变量

使用 SCSS 定义基础的主题样式，并将一些样式值转换为 CSS 变量。这样可以方便后续通过 JavaScript 动态修改。

```scss
// variables.scss
$light-primary-color: #ffffff;
$light-secondary-color: #f8f9fa;
$light-text-color: #212529;

$dark-primary-color: #212529;
$dark-secondary-color: #343a40;
$dark-text-color: #ffffff;

// 将SCSS变量映射到CSS变量上
:root {
  --primary-color: #{$light-primary-color};
  --secondary-color: #{$light-secondary-color};
  --text-color: #{$light-text-color};
}

[data-theme="dark"] {
  --primary-color: #{$dark-primary-color};
  --secondary-color: #{$dark-secondary-color};
  --text-color: #{$dark-text-color};
}

// 使用CSS变量进行样式定义
body {
  background-color: var(--primary-color);
  color: var(--text-color);
}

.button {
  background-color: var(--secondary-color);
  color: var(--text-color);
}
```

::: tip 注：

- `:root` 是一个伪类选择器，它匹配文档的根元素。在 `HTML` 中，通常是 `<html>` 元素。
- 使用 `:root` 选择器定义的 CSS 变量具有全局作用域。
- `[data-theme="dark"]` 是一个属性选择器。它选择所有带有 `data-theme` 属性且该属性值为 `"dark"` 的元素。
  :::

#### 使用 JavaScript 动态切换主题

```js
function switchTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}
```

#### 此外还可以直接动态修改 css 变量

通过动态修改 CSS 变量来实现更复杂的效果，例如响应窗口大小变化、滚动事件、或者用户输入的变化。 如: 基于窗口宽度动态修改变量

```js
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        document.documentElement.style.setProperty('--primary-color', '#ff5733');
    } else {
        document.documentElement.style.setProperty('--primary-color', '#3333ff');
    }
});
```

### 主题色拓展色
#### 直接定义变量
```scss
$color: #333333;
$color-30-opacity: rgba($color, 0.3); // 30% 不透明度
$color-60-opacity: rgba($color, 0.6); // 60% 不透明度

.color-30-opacity {
  background-color: $color-30-opacity;
}

.color-60-opacity {
  background-color: $color-60-opacity;
}
```
#### 直接使用变量+rgba
```scss
$color: #333333;

.color-30-opacity {
  background-color: rgba($color, 0.3); // 30% 不透明度，即 70% 透明度
}

.color-60-opacity {
  background-color: rgba($color, 0.6); // 60% 不透明度，即 40% 透明度
}
```
#### 使用mixin
```scss
$color: #333333;

@mixin opacity-color($opacity) {
  background-color: rgba($color, $opacity);
}

// 使用 mixin
.color-30-opacity {
  @include opacity-color(0.3); // 30% 不透明度
}

.color-60-opacity {
  @include opacity-color(0.6); // 60% 不透明度
}
```
#### 使用函数
```scss
$color: #333333;

@function transparent($color, $opacity) {
  @return rgba($color, $opacity);
}

// 使用函数
.color-30-opacity {
  background-color: transparent($color, 0.3); // 30% 不透明度
}

.color-60-opacity {
  background-color: transparent($color, 0.6); // 60% 不透明度
```

### scss 基础应用
```scss
  // 创建颜色变量
  $color-border: #f3f5fb;
  $color-bg: #f8faff;
  $color-text: #666666;
  $color-text-gray: #999999;
  $color-text-blue: #327bf9;
  $color-text-black: #333333;

  // 超出...
  %line-ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  // 毛玻璃效果
  %backdrop-blur-box{
    backdrop-filter: blur(4px);
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
  }

  // 公共按钮
  %button{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    color: #ffffff;
    width: 100px;
    height: 30px;
    background-image:
            linear-gradient(90deg,
                    #ffa72a 0%,
                    #ff4d2a 100%),
            linear-gradient(
                            #ff552a,
                            #ff552a);
    background-blend-mode: normal, normal;
    border-radius: 5px;
    margin: 25px auto 0;
    img{
      width: 16px;
      height: 15px;
    }
  }

  // 动画效果抽离
  $animation-duration: 1.5s;
  $animation-cubic-bezier: cubic-bezier(0.25, 0.1, 0.25, 1);
  @mixin createSlideUpAnimation($name, $translateX) {
    @keyframes #{$name} {
      0% {
        transform: translateY(100%) translateX(#{$translateX}px);
      }
      100% {
        transform: translateY(0) translateX(#{$translateX}px);
      }
    }
  }
  .floating-entry-consult-pop {
    position: fixed;
    bottom: 78px;
    right: 50%;
    transform: translateX(588px);
    width: 615px;
    height: 95px;
    cursor: pointer;
    z-index: 1000;
    @include createSlideUpAnimation('slideUp-center-consult-pop-588', 588);
    animation: slideUp-center-consult-pop-588 $animation-duration $animation-cubic-bezier forwards;
  }
```