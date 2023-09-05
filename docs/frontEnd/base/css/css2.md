

# css 效果案例
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



