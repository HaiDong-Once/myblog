

# 文本行高对元素垂直距离精确控制的影响
[[toc]]


## 一、前言
在日常样式开发中，需要从UI稿中识别元素直接距离，但是当遇到文本元素与其他元素垂直距离控制中，代码中实际距离总会大于UI测到的距离，
实际距离 = margin(top,bottom)值 +  文本元素行高溢出的距离，刚开始我选择手动减少margin值，估算lineheight实际距离，但是这样是不准确的，
达不到UI稿精准还原目标，所以重新回溯了line-height和font-size的属性，看看文本行的实际高度，以及溢出的高度究竟是如何控制和计算的。

## 二、文本基本概念
### 基线
![图片](/images/frontEnd/css/img_12.png)
- 基线是西文字体设计与排版的概念，源自西文字母的主体底部（字母E的底部）对齐的位置。
- 对于中文字体，本身的设计上没有基线等说法，每个字都在一个方形盒子中。但是在计算机上显示时，也在一定程度上沿用了西文字体的概念， 
通常来说，中文字体的方形盒子中文字体底端在基线和底线之间，顶端在顶线下一点。

### 行高、行距、半行距和x-height
![图片](/images/frontEnd/css/img_13.png)
- 行高：也就是line-height，指文本行基线间的垂直距离。上图任意两条相同颜色的垂直距离也是行高。
- 行距：是指一行底线到下一行顶线的垂直距离，即第一行粉线和第二行绿线间的垂直距离。
- 半行距：行距的一半。半行距 = (行高 - 字号) / 2。在 CSS 中的margin-top不是从文字的顶线算起，而是从顶线半行距的上方开始算起。
同理，margin-bottom是从底线半行距的下方开始算起。
- x-height：x字高，是指字母的基本高度，精确地说，就是基线baseline和主线mean line之间的距离。

### font-size
前端开发中我们会使用font-size来设置文字的大小，假设我们设置的字体是 12px，就代表着顶线和底线的距离为12px。

## 三、line-height
| 值      | 描述                                                                                             | 默认值    |
|---------|--------------------------------------------------------------------------------------------------|-----------|
| normal  | 默认值。行高取决于浏览器的解析，一般是1.2。子元素会单独计算                                     | -         |
| number  | 设置数字，此数字会与当前的字体尺寸相乘来设置行间距，即number为当前font-size的倍数。             | -         |
| length  | 设置固定的行间距，与font-size无关，不会随着font-size做相应比例的缩放，会被后代元素继承             | -         |
| %       | 基于当前字体尺寸的百分比行间距                                                                    | -         |
| inherit | 从父元素继承 line-height 属性的值                                                                | -         |

通常情况，空div在未设置height时，高度为0，填充文字或空格，div就填充了高度，直接觉得是文字撑开了高度，但是深入理解inline模型后，
发现撑开div 的不是文字，而是line-height, 因为在inline box模型中，有个line boxes， 于包裹文字， 
所以一个没有设置height属性的div的高度就是由一个一个line boxes的高度堆积而成的

## 四、浏览器实测
**设置font-size：30px, 不设置line-height, 此时会有一个默认行高，由浏览器计算得出，是不确定的。**

![图片](/images/frontEnd/css/img_15.png)

**如果我们设置line-height:1, 等同于line-height值等于font-size值，也就是line-height:30px，这是div高度也是30px。我们实际应用中，
如果是单行文本元素，就将line-height设置为1， 这样文本div实际高度和font-size值一致，也和ui测距一致。**

![图片](/images/frontEnd/css/img_14.png)

**如果我们给font-size：30px, line-height: 10px, 这个div高度是10px, 可见div高度有line-heigh决定。**

![图片](/images/frontEnd/css/img_16.png)

**如果line-height：0， 则div高度为0**

![图片](/images/frontEnd/css/img_17.png)

**如何测算，影响我们控制间距的班行距值呢， 文本实际高度 = font-size值（一倍行高），行距就等于 line-height减去 font-size尺寸，
半行距就是这个差值的二分之一。如果我们需要测算多行文本与其他元素直接的距离，ui间距需要减去测算的半行距。**

![图片](/images/frontEnd/css/img_18.png)