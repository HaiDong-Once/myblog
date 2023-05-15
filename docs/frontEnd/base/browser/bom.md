
# 应用案例
[[toc]]


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
```ts
/**
 * 复制信息到剪切板
 */
copyContent(){
    const input = document.createElement("input"); // 创建input对象
    input.value = value; // 设置复制内容
    document.body.appendChild(input); // 添加临时实例
    input.select(); // 选择实例内容
    document.execCommand("Copy"); // 执行复制
    document.body.removeChild(input); // 删除临时实例
    this.$toast('复制成功')
}
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


