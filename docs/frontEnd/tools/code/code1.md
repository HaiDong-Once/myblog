

# 检测浏览器类型工具封装
[[toc]]

::: tip 说明：
需要考虑到可靠性，兼容性，因为 navigator.userAgent 可以被手动修改，从而导致判断设备类型的方法不可靠。
为了更可靠地判断设备类型，我们可以使用其他方法兼容处理，如媒体查询和触摸事件
:::

## 一、函数封装
```js
function detectDevice() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTablet = /(iPad|Android|Tablet)/i.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

  const isMobileOrTablet = isMobile || isTablet;
  const isDesktop = !isMobileOrTablet;

  const mediaQueryList = window.matchMedia('(max-width: 768px)'); // 根据需要调整媒体查询的宽度
  const isMobileMediaQuery = mediaQueryList.matches;

  return {
    isMobile: isMobile || isMobileMediaQuery,
    isTablet: isMobileOrTablet && !isMobileMediaQuery,
    isDesktop,
    isTouchDevice
  };
}
```

## 二、使用浏览器检测函数
```js
var deviceInfo = detectDeviceType();

if (deviceInfo.isMobile) {
  // 在移动设备上执行特定操作
} else if (deviceInfo.isTablet) {
  // 在平板设备上执行特定操作
} else if (deviceInfo.isDesktop) {
  // 在桌面设备上执行特定操作
}

if (deviceInfo.isTouchDevice) {
  // 对于支持触摸的设备执行特定操作
}
```

```js
var DeviceDetector = (function() {
  var ua = navigator.userAgent;

  var checkPlatform = function() {
    if (/Android/i.test(ua)) {
      return 'Android';
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      return 'iOS';
    } else if (/Windows/i.test(ua)) {
      return 'Windows';
    } else if (/Mac OS X/i.test(ua)) {
      return 'MacOS';
    } else if (/Linux/i.test(ua)) {
      return 'Linux';
    } else {
      return 'Unknown';
    }
  };

  var checkDevice = function() {
    var isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(ua);
    var isTablet = /Tablet|iPad/i.test(ua) || (!isMobile && /Android/i.test(ua));
    var isDesktop = !isMobile && !isTablet;
    return isMobile ? 'Mobile' : isTablet ? 'Tablet' : isDesktop ? 'Desktop' : 'Unknown';
  };

  var checkTouch = function() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  };

  return {
    platform: checkPlatform(),
    device: checkDevice(),
    isTouchDevice: checkTouch()
  };
})();

console.log('Platform: ' + DeviceDetector.platform);
console.log('Device: ' + DeviceDetector.device);
console.log('Is Touch Device: ' + DeviceDetector.isTouchDevice);
```