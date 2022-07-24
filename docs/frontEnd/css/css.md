
# css案例
[[toc]]


## 一、ios浏览器下拉刷新下滑滚动卡顿

::: tip 原因
-webkit-overflow-scrolling:touch 属性导致；
这个bug产生于ios8以上（在ios5~7上需要手动使用translateZ(0)打开硬件加速）Safari对于overflow-scrolling用了原生控件来实现。
对于有-webkit-overflow-scrolling的网页，会创建一个UIScrollView，提供子layer给渲染模块使用。
:::

### 方案一：保证使用了该属性的元素上没有设置定位
- 不设置定位或者手动设置定位为 position: static
- relative、fixed、absolute导致的页面偶尔不能滚动的bug。
- 滑动到顶部继续手指往下滑，或者到底部继续往上滑，还是会触发卡住的问题
- （其实是整个页面上下回弹），说他算bug，其实就是ios8以上的特性，
- 如果滚动区域大一点，用户不会觉得这是bug，如果小了，用户会不知道发生了什么而卡住了。

### 方案二：如果添加动态内容页面不能滚动，让子元素height+1
- 想通过动态添加内容来撑开容器，触发滚动，是有bug 的，页面是会卡住不动的

```css
app.vue #app{
    -webkit-overflow-scrolling:touch
}
/*下一层div设置撑开容器，主动触发滚动*/
min-height: calc(100% + 1px)
```

![图片](/images/frontEnd/css/img.png)
![图片](/images/frontEnd/css/img_1.png)

### 说明：主动创建堆栈上下文
![图片](/images/frontEnd/css/img_2.png)



## 二、毛玻璃效果，ios，安卓适配问题

::: tip 元素
backdrop-filter blur()
:::

### 解决方案
- ios端需要单独加`-webkit`,  安卓端不需要加`-webkit`否则无效（钉钉浏览器无效）
```html
<div :class=" phoneType === 'ios' ? 'ios-backdrop-filter' : 'backdrop-filter' "></div>
```
```css
.ios-backdrop-filter{
  -webkit-backdrop-filter: blur(8px);
}
.backdrop-filter{
  backdrop-filter: blur(8px);
}
```

### 实现效果
![图片](/images/frontEnd/css/img_3.png)

### backdrop-filter属性说明
- **向元素后面的区域添加图形效果，类似ps的滤镜工具**
- blur: 模糊（毛玻璃）
- brightness: 明度
- contrast: 对比度
- drop-shadow: 阴影
- grayscale: 灰阶
- hue-rotate: 色相
- invert: 反转
- opacity: 透明度
- sepia: 棕褐色
- saturate: 饱和度

### 备选方案
- 文字模糊效果+加半透明普通遮罩：
```css
background-color: rgba(255, 255, 255, 0.6);
color: transparent;
text-shadow: #111 0 0 5px;
```



## 三、css将白色背景处理为透明

::: tip 元素
mix-blend-mode: multiply  正片叠底： 
描述了元素的内容应该与元素的直系父元素的内容和元素的背景如何混合。
:::

### 使用
```css
mix-blend-mode: multiply;
```

### 效果
![图片](/images/frontEnd/css/img_4.png)
![图片](/images/frontEnd/css/img_5.png)




## 四、修改input输入框placeholder字体颜色
```css
input::-webkit-input-placeholder {
    color: #ccc;
}
input::-moz-input-placeholder {
    color: #ccc;
}
input::-ms-input-placeholder {
    color: #ccc;
}
```






# css基础
[[toc]]

## css常用记录

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