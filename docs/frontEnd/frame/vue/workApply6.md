
# 微信浏览器放大字体样式兼容

### 产生原因
- 安卓手动调整字体的话，会使根元素的字体变化，导致整个页面内的元素的一些属性变化，包括宽高字体等样式属性
- ios 手动调整字体，只是单纯的把文字的字体改变，并没有改变根元素字体

### 解决方法：禁止用户调整字体
```css
/* ios 通过重写样式控制*/
body { -webkit-text-size-adjust:100%!important; }   /* 禁用文本跟随缩放自动调整 */
```
```ts
// android 通过重写事件控制
(function() {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        });
    }
})();
```