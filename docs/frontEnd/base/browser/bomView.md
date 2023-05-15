

# 获取浏览器视口信息



::: tip 注意:
- 获取---屏幕，可视区，页面内容，浏览器宽高等
- 注意：移动端尽量不适用vh属性，会被工具栏切断
  :::

![图片](/images/frontEnd/browser/img.png)

### dom和bom
- window.screen.height：屏幕分辨率的高（屏幕的高度 ）
- window.screen.width：屏幕分辨率的宽 （屏幕的宽度 ）
- window.screen.availHeight：屏幕可用工作区的高
- window.screen.availWidth：屏幕可用工作区的高
- window.screenTop：浏览器窗口距离电脑屏幕上边界的距离
- window.screenLeft：浏览器窗口距离电脑屏幕左边界的距离

- window. innerWidth ：浏览器可视区域的内宽度，包含滚动条
- window.innerHeight：浏览器可视区域的内高度，包含滚动条
- window.outerWidth：浏览器宽度
- window.outerHeight：浏览器高度

- window.pageYOffset：需要网页存在滚动条才可以，存在竖向滚动条时，网页正文向下滚动一段距离n px，该值即为n
- window.pageXOffset：同理，无滚动条值为0
- document.body.scrollTop：网页下滑的距离（与上一对值相同，滚动条位置）
- document.body.scrollLeft：网页左滑的距离
- document.documentElement.scrollTop：与上一对值相同（与上一对都是获得滚动条位置，但是存在兼容问题）
- document.documentElement.scrollLeft：

- document.documentElement.scrollWidth：获取网页正文全文宽（包括滚动部分）
- document.documentElement.scrollHeight：获取网页正文全文高（包括滚动部分）
- document.body.scrollWidth：与上一对值相同
- document.body.scrollHeight：

- document.documentElement.offsetWidth:与下一对值相同
- document.documentElement.offsetHeight:
- document.body.offsetWidth： 获取可视区域的宽度（同clientWidth）
- document.body.offsetHeight：获取body的总高度（同scrollHeight）

- document.body.clientWidth：获取可视区域的宽（可以进行页面展示的，不包含边线，例如body{border:10px solid red;}）
- documment.body.clientHeight：获取可视区域的高（可以进行页面展示的）
- document.documentElement.clientWidth：页面可视宽度，但是不包含滚动条组件的十几px像素
- document.documentElement.clientHeight：可视区域高度， 实际上就是  元素,只不过显示的是可见的部分，即浏览器窗口大小（网页无滚动条时与window.innerHeight同值）

### 事件event
- event.clientX 相对文档的水平座标
- event.clientY 相对文档的垂直座标
- event.offsetX 相对容器的水平坐标
- event.offsetY 相对容器的垂直坐标
- document.documentElement.scrollTop 垂直方向滚动的值
- event.clientX+document.documentElement.scrollTop 相对文档的水平座标+垂直方向滚动的量

### 元素
- HTML精确定位:scrollLeft,scrollWidth,clientWidth,offsetWidth
- scrollHeight: 获取对象的滚动高度。
- scrollWidth:获取对象的滚动宽度
- scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离
- scrollTop:设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离
- offsetHeight:获取对象相对于版面或由父坐标 offsetParent   属性指定的父坐标的高度
- offsetLeft:获取对象相对于版面或由 offsetParent   属性指定的父坐标的计算左侧位置
- offsetTop:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置

### 浏览器相关属性表现
- CSS中的margin属性，与clientWidth、offsetWidth、clientHeight、offsetHeight均无关
- offsetTop返回的是数字，而style.top返回的是字符串,带有单位
- offsetTop只读,而style.top可读可写
- 如果没有给相应html元素指定top的样式，则style.top返回的空字符串
- 给top赋值时要带上单位px，否则无效

**IE6.0、FF1.06+：**
- clientWidth = width + padding
- clientHeight = height + padding
- offsetWidth = width + padding + border
- offsetHeight = height+ padding + border
- **IE5.0/5.5： **
- clientWidth = width - border
- clientHeight = height - border
- offsetWidth = width
- offsetHeight = height
