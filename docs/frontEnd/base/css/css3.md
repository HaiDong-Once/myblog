

# 实现六边形进度条环绕动画效果

#### 效果预览
![图片](/images/frontEnd/img_16.png)

#### 概述
1. 六边形背景

clip-path 属性使用 polygon 函数定义了一个六边形，通过控制各个顶点的位置来绘制形状。.import-icon 是容器，设置了六边形的背景样式，并使用 display: flex 使内部内容居中。

2. 六边形顶层

.icon2 作为六边形的内部内容层，使用了相同的 clip-path 值来确保它与背景的形状一致，并且使用了 display: flex 将文字 “重要提醒” 居中显示。

3. 三角形旋转层

.animation 定义了一个三角形，通过 clip-path: polygon 创建。这个三角形位于六边形中心，并且设置为绝对定位，确保它在六边形内部正确对齐。

4. 旋转动画

通过 @keyframes 定义了一个名为 loading 的动画，将 .animation 元素围绕中心旋转。transform-origin 控制旋转中心，animation 设置为 1.5 秒无限循环旋转 360 度。

#### 代码实现
```html
<div class="import-icon gradient-border">
    <div class="animation"></div>
    <div class="icon2">重要<br>提醒</div>
</div>
```

```css
/** 六边形背景 **/
.import-tip .import-icon {
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px 0 40px;
    background-color: rgba(244, 151, 20, 0.2);
    font-size: 36px;
    font-weight: bold;
    color: #ffffff;
    width: 169px;
    height: 196px;
    clip-path: polygon(
            0 25%,
            50% 0,
            100% 25%,
            100% 75%,
            50% 100%,
            0 75%
    );
}
/** 六边形顶层 **/
.import-icon .icon2 {
    text-align: center;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 152px;
    height: 176px;
    background-color: #f49714;
    clip-path: polygon(
            0 25%,
            50% 0,
            100% 25%,
            100% 75%,
            50% 100%,
            0 75%
    );
}

/** 三角形旋转层 **/
.import-icon .animation {
    width: 100px;
    height: 100px;
    background-image: linear-gradient(-90deg,
    rgba(255, 180, 109, 0.11),
    rgba(255, 123, 0, 0.41));
    border-radius: 50%;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    position: absolute;
    top: 98px;
    left: 36px;
    animation: loading 1.5s linear infinite;
    transform-origin: 50px 0;
}
/** 动画 **/
@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
```