
# 浏览器
[[toc]]



## 获取浏览器高度等信息

::: tip 注意:
- 获取---屏幕，可视区，页面内容，浏览器宽高，事件等
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




## 监听键盘顶起事件
- [移动端软键盘处理方案](https://www.jianshu.com/p/3c6a08af5203)
- 代码实现：

```ts
data () {    
	return {        
		docmHeight: '0',  //默认屏幕高度       
		showHeight:  '0',   //实时屏幕高度        
		hidshow:true  //显示或者隐藏footer,      
		isResize:false //默认屏幕高度是否已获取   
	};  
},

mounted() {    // window.onresize监听页面高度的变化   
	 window.onresize = ()=>{        
       return(()=>{                     
		if (!this.isResize) {                               
			// 默认屏幕高度                              
			this.docmHeight = document.documentElement.clientHeight                                
			this.isResize = true                       
		}                        
		// 实时屏幕高度                       
		this.showHeight = document.body.clientHeight         
        })()    
	 }  
 },

// watch监听
showHeight:function() {        
	if(this.docmHeight > this.showHeight){    
           // 键盘顶起        
		this.hidshow=false        
	}else{            
		this.hidshow=true        
	}    
}
```




## 获取设备信息

### 判断android或者ios
```ts
const u = navigator.userAgent;
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
if (isiOS) {
	return "ios";
} else {
	return "andriod";
}
```



## 复制文本到剪切板
```html
<input 
        id="copy_content" 
        type="text" 
        value="" 
        style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;"
/>
```
```ts
/**
 * 复制信息到剪切板
 * @data: isCopy：是否复制成功
 */
copyContent(){
  const inputElement = document.getElementById("copy_content");
  //给input框赋值
  inputElement.value =
  `我已成功支付经营异常移出服务，帮我移出异常名录。
  订单号：${this.order_no}`;
  //选中input框的内容
  inputElement.select();
  // 执行浏览器复制命令
  document.execCommand("Copy");
  // 阻止弹出手机的软键盘
  input.blur();
  this.isCopy = true;
},
```



## 浏览器消息提醒

### js版
```html
 <button onclick="notifyMe('Hi there!')">Notify me!</button>
```
```ts
const notifyOption = {
            body: "",
            renotify: true,
            requireInteraction: true,
            vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]
        };

        function createNotification(message) {
            notifyOption.body = message;
            return new Notification('EPC系统消息', notifyOption);
        }

        function notifyMe(message) {
            // Let's check if the browser supports notifications
            if (!("Notification" in window)) {
                //alert("This browser does not support desktop notification");
            }

            // Let's check whether notification permissions have already been granted
            else if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                var notification = createNotification(message);
            }

            // Otherwise, we need to ask the user for permission
            else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        var notification = createNotification(message);
                    }
                });
            }

            // At last, if the user has denied notifications, and you 
            // want to be respectful there is no need to bother them any more.
        }
```

### vue版本
```html
<div class="notification" @click="notifyMe()">notification</div>
```
```css
 body{position: relative;}
.notification {
    width: 200px;
    height: 50px;
    padding: 20px;
    line-height: 50px;
    text-align: center;
    background: #008800;
    border-radius: 5px;
    font-size: 30px;
    position: absolute;
    left: 45%;
}
```
```ts
var app = new Vue({
    el: '.notification',
    data: {},
    methods: {
        notifyMe() {
            // 先检查浏览器是否支持
            if(!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            }

            // 检查用户是否同意接受通知
            else if(Notification.permission === "granted") {
                // If it's okay let's create a notification
                var notification = new Notification("你好snowball:", {  
                    dir: "auto",  //auto（自动）, ltr（从左到右）, or rtl（从右到左）
                    lang: "zh",  //指定通知中所使用的语言。这个字符串必须在 BCP 47 language tag 文档中是有效的。
                    tag: "testTag",  //赋予通知一个ID，以便在必要的时候对通知进行刷新、替换或移除。
                    icon: "http://api.dangmeitoutiao.com/_/boss/0/img/2018/02/12/20180212085006554.JPEG",  //提示时候的图标
                    body: "今天是个好天气"  // 一个图片的URL，将被用于显示通知的图标。
                }); 
            }

            // 否则我们需要向用户获取权限
            else if(Notification.permission !== 'denied') {
                Notification.requestPermission(function(permission) {
                    // 如果用户同意，就可以向他们发送通知
                    if(permission === "granted") {
                        var notification = new Notification("你好snowball:", {  
                            dir: "auto",  //auto（自动）, ltr（从左到右）, or rtl（从右到左）
                            lang: "zh",  //指定通知中所使用的语言。这个字符串必须在 BCP 47 language tag 文档中是有效的。
                            tag: "testTag",  //赋予通知一个ID，以便在必要的时候对通知进行刷新、替换或移除。
                            icon: "http://api.dangmeitoutiao.com/_/boss/0/img/2018/02/12/20180212085006554.JPEG",  //提示时候的图标
                            body: "今天是个好天气"  // 一个图片的URL，将被用于显示通知的图标。
                        }); 
                    }
                });
            }

            // 最后，如果执行到这里，说明用户已经拒绝对相关通知进行授权
            // 出于尊重，我们不应该再打扰他们了
        }
    }
})
```



## requestAnimationFrame
::: tip 背景
由于JavaScript是单线程的，所以定时器的实现是在当前任务队列完成后再执行定时器的回调的，
假如当前队列任务执行时间大于定时器设置的延迟时间，那么定时器就不是那么可靠了
:::

### 异常示例
```ts
// 以下代码理想状态应该先执行打印 11111， 50毫秒后再执行 打印22222
// 但是由于循环20000次阻塞线程，导致1637毫秒后才执行了定时器中的方法
let startTime = new Date().getTime();
setTimeout(()=>{
let endTime = new Date().getTime();
console.log(endTime - startTime,22222);  // 1637  22222（1.6s后才执行）
},50)

for(let i=0;i<20000;i++) {
console.log(11111);  // 执行20000次后， 再执行setTimeout 50
}
```

### 应用示例
::: tip 概述
RAF 会尽量以每秒60帧的频率执行回调函数，以确保最佳性能和流畅度 正常执行时间为一帧执行一次，
不阻塞UI线程的情况下提高准确度，也可以自适应浏览器的帧率减少卡顿和性能消耗，
大部分情况，屏幕刷新率为 60HZ 的情况下, 即每过 1000/60 = 16.666... 毫秒渲染新一帧，
可以简单的将 requestAnimationFrame 函数视为延迟为16ms 的 setTimeout 函数，
:::
```ts
const div = document.getElementById('box');
div.style.width = parseInt(div.style.width) + 1 + 'px';

if (parseInt(div.style.width) < 200) {
requestAnimationFrame(this.animationWidth)
}
```

### 低版本兼容
```ts
/**
 * 低版本浏览器用setTimeout模拟requestAnimationFrame
 */
simulationAnimation(){
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}
```
