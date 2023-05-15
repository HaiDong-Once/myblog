

# requestAnimationFrame
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