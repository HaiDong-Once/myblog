


[[toc]]

# css常用记录

### a链接下划线、中划线
```css
text-decoration: underline;
text-decoration: line-through;
```

### li实心圆样式
```css
list-style: disc;
```

### 盒模型设置，防止border,padding影响宽度
```css
box-sizing: border-box;
```

### 段落文字两端对齐
```css
text-align: justify;
```

### 鼠标指针手形状
```css
cursor: pointer;
```

### 防止父子元素opacity不透明度继承问题
```css
/*使用背景rgba设置不透明度：*/
background-color: rgba(0,0,255,0.2);
```

### CSS 画两边是半圆的长方形
```css
/*只需将 border-radius 设为高度的一半即可实现。*/
.radius{
    height: 200px;
    border-radius: 100px;
}
```

### 颜色渐变，不透明度渐变效果；
```css
background-image:
linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
```

### 阻止点击，防止重复提交，h5
```html
<div class="button" 
    v-bind:class="{disabled:payLock}"
    @click="toPay" >立即申请移出
</div>
```
```css
/* 按钮样式 禁止 */
.disabled{
    opacity: 0.6;
    pointer-events: none;
}
```

### 阻止点击，阻止重复提交，防止重复提交，小程序
```html
<view class="button {{loading ? 'disabled' : ''}}" bindtap="submitCode">登录/注册</view>
```
```css
/* 按钮样式 禁止 */
.disabled{
    opacity: 0.6;
    pointer-events: none;
}
```

### 单行省略，多行省略，两行省略
```css
/*超过一行省略号*/
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;

/*超过两行省略号*/
overflow: hidden;
text-overflow: ellipsis;
display: box;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

### 图片文字垂直居中对齐方式
```css
/*父元素flex*/
align-items:center

/*图片设置垂直居中：*/
vertical-align: middle;

/*垂直设置-50%:，相对父元素line-height的一半*/
/*父元素设置line-height时，图片*/
vertical-align: -50%;
```

### 第一行不缩进，第二行缩进
```css
padding-left: 5em;
text-indent: -5em;   
```

### 苹果浏览器工具类遮挡问题
在`ios`上使用`safari`浏览器时，
有时候会发现不出现上下地址栏和工具栏时样式正常，
但是出现地址栏和工具栏时，部分元素会被工具栏遮挡，
部分元素会被工具栏往上顶，
区别是`fixed`定位会随着地址栏和工具栏的出现自适应，
`absolute`定位则不会。或者获取底部工具栏的高度，机型判断，动态给页面服饰 `cacl(100vh - 工具栏高度)`

### 文本换行行高自适应，单行多行行高变化自适应
```html
<div>
    <span>测试文本</span>
</div>
```
```css
 div{
     height:100px;
     line-height: 100px;
     position: relation;
 }
 div span{
     display: inline-block;
     line-height: 50px;
    vertical-align: middle; 
 }
```

### fixed浮动置底按钮，遮挡底部元素问题解决
```html
<div class="page">
    <div class="content">页面内容</div>
    <div class="box">
        <div>浮动按钮</div>
    </div>
</div>
```

```css
.box {
    position: relative;
    z-index: 10;
    height: 194px;
}
.box div{
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 194px;
}
```


### 设置letter-spacing后文字不能居中的解决方法

::: tip 说明：
- 原因：设置居中的时候，最后一个字的右间距也会包括其中，所以会出现不能居中的情况。
- 解决：比较简单的一个方法是给文字设置 `text-indent` 首行文本的缩进，属性值和 `letter-spacing` 相同。
:::
```css
{
    text-align: center;
    letter-spacing: 20px;
    text-indent: 20px;
}
```


### div内宽度不定元素限制最大显示数量
::: tip 方法：
- 内部元素行级块元素，div限制宽高，溢出部分隐藏。
:::

![图片](/images/frontEnd/css/img_6.png)

```html
<div class="type" v-if="item.tag.length > 0">
  <span v-for="(item2,index2) of item.tag" 
      :key="index2" v-if="item2 !== '无'">{{item2}}
  </span>
</div>
```
```scss
.type{
  display: inline-block;
  height: 66px;
  width: 100%;
  overflow: hidden;
  span{
    display: inline-block;
    height: auto;
    background-color: #eef6ff;
    border-radius: 9px;
    line-height: 54px;
    padding: 0 6px;
    font-size: 33px;
    color: #1f81f8;
    margin: 10px 20px 0 10px;
    box-sizing: border-box;
  }
}
```


### 隐藏滚动条样式

1. Firefox浏览器  将滚动条宽度设置为none：`scrollbar-width: none`
2. IE浏览器  使用-ms-prefix属性定义滚动条样式： `-ms-overflow-style: none`
3. Chrome和Safari浏览器  CSS滚动条选择器，然后使用display：none隐藏它: `::-webkit-scrollbar`
4. 示例：

```scss
.demo {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
.demo::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
```


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


## flex流式布局 flex-wrap: wrap;
```scss
div{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
```