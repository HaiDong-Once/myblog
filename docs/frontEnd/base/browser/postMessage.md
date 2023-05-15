
# postMessage
[[toc]]



::: tip 介绍:
window.postMessage是JavaScript中的一个API，用于在不同的窗口、标签页或浏览器之间进行跨源通信。
它允许在不同的文档中发送消息，无论这些文档是否来自同一域名。
:::


## 语法说明
### 发送消息
```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```
- **otherWindow**：其他窗口的一个引用。比如 `iframe` 的 `contentWindow` 属性、执行 `window.open` 返回的窗口对象、或者是命名过或数值索引的 `window.frames`。
- **message**：要发送的消息。它将会被结构化克隆算法序列化，所以无需自己序列化，html5规范中提到该参数可以是JavaScript的任意基本类型或可复制的对象，
然而并不是所有浏览器都做到了这点儿，部分浏览器只能处理字符串参数，所以我们在传递参数的时候需要使用 `JSON.stringify()` 方法对对象参数序列化。
- **targetOrigin**：“目标域“。`URI`（包括：协议、主机地址、端口号）。若指定为 `”*“`，则表示可以传递给任意窗口，指定为 `”/“`，则表示和当前窗口的同源窗口。
当为 `URI` 时，如果目标窗口的协议、主机地址或端口号这三者的任意一项不匹配 `targetOrigin` 提供的值，那么消息就不会发送。
- **transfer(可选)**：是一串和 `message` 同时传递的 `Transferable` 对象。这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。

### 接收消息
如果指定的源匹配的话，那么当调用 `postMessage() `方法的时候，在目标窗口的 `Window` 对象上就会触发一个 `message` 事件。
获取 `postMessage` 传来的消息：为页面添加 `onmessage` 事件。
```js
window.addEventListener('message',function(e) {
   var origin = event.origin;
   // 通常，onmessage()事件处理程序应当首先检测其中的origin属性，忽略来自未知源的消息
   if (origin !== "http://example.org:8080") return;
   // ...
}, false)
```
**event 的属性有:**
- **data:** 从其他 `window` 传递过来的数据副本。
- **origin:** 调用 `postMessage` 时，消息发送窗口的 `origin`。例如：`“http://example.com:8080”`。
- **source:** 对发送消息的窗口对象的引用。可以使用此来在具有不同 `origin` 的两个窗口之间建立双向数据通信。


## 安全问题
- 如果你不希望从其他网站接收 `message`，请不要为 `message` 事件添加任何事件监听器。
- 如果你确实希望从其他网站接收 `message`，请始终使用 `origin` 和 `source` 属性验证发件人的身份。
- 当你使用 `postMessage` 将数据发送到其他窗口时，始终指定精确的 `targetOrigin`，而不是 `*`。


## 方案示例
### 1. 跨域通信： 不同 origin 的两个窗口之间建立双向数据通信
```js
/**
* localhost:10002/index页面
**/
// 接收消息
window.addEventListener('message', (e) => {
     console.log(e.data)
})
// 发送消息
const targetWindow = window.open('http://localhost:10001/user');
setTimeout(() => {
     targetWindow.postMessage('来自10002的消息', 'http://localhost:10001')
}, 3000)
```
```js
/**
* localhost:10001/user页面
**/
window.addEventListener('message', (e) => {
     console.log(e.data)
     if (event.origin !== "http://localhost:10002") return;
     e.source.postMessage('来自10001的消息', e.origin)
})

```

### 2. 跨窗口通信：页面与嵌套的 iframe 消息传递
父页面：
```js
// http://www.domain1.com/a.html

<iframe id="iframe" src="http://www.domain2.com/b.html"></iframe>
 
<script>
var iframe = document.getElementById('iframe');
 
iframe.onload = function() {
   // 向domain2 子页面 发送跨域数据
   iframe.contentWindow.postMessage(
       '来自domain1的消息', 
       'http://www.domain2.com'
   );
   // 或  window.frames[0].postMessage(
   //  '来自domain1的消息', 
   //  'http://www.domain2.com'
   // );
};
 
// 接受domain2返回数据
window.addEventListener('message',(e) => {
    console.log(e.data);
}, false);
</script>
```
子页面：
```js
// http://www.domain2.com/b.html

<script>
// 接收domain1的数据
window.addEventListener('message',(e) => {
    console.log(e.data);
 
    if(e.origin !== 'http://www.domain1.com') return;
 
    // 向domain1 父页面发送消息
    window.parent.postMessage('来自domain2的消息', e.origin);
    // 或 window.top.postMessage('来自domain2的消息', e.origin);
    // 或 e.source.postMessage('来自domain2的消息', e.origin);
}, false);
</script>

```

### 3. 跨在Web Worker中使用：主线程和Web Worker之间进行通信。
任务分发和结果传递：主线程可以将复杂或耗时的任务委托给 `Web Worker` 处理，并通过 `postMessage` 发送任务数据给 `Web Worker`。
`Web Worker` 在完成任务后，使用 `postMessage` 将结果返回给主线程。
```js
// 主线程代码
var worker = new Worker('worker.js');
worker.postMessage({ type: 'task', data: '...task data...' });
worker.onmessage = function(event) {
  var result = event.data;
  // 处理返回的结果
};
```
```js
// Web Worker代码（worker.js）
self.onmessage = function(event) {
  var taskData = event.data;
  // 处理任务数据
  var result = '...task result...';
  self.postMessage(result);
};
```