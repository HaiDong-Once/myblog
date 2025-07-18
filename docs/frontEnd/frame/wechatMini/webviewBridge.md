
# WebView Bridge 跨平台方案：统一 API 实现多端小程序通信

## 概述

因项目中小程序使用 uniapp 开发，打包发布微信、支付宝，头条小程序，其中部分页面需要使用webview做跳转，实测uniapp api无效，所以尝试自主封装多个小程序api, 在H5页面中引入使用。
`webviewBridge` 是一个跨平台的 WebView 桥接工具，提供了统一的 API 接口来实现 Web 页面与各种小程序宿主环境的通信。支持微信小程序、QQ 小程序、支付宝小程序、百度小程序、字节跳动小程序；

## 特性

- 🌐 **跨平台支持**：自动检测运行环境，支持多种小程序平台
- 📱 **统一 API**：提供一致的接口，无需关心底层实现差异
- 🔧 **自动加载**：自动加载对应平台的 SDK
- 🎯 **类型安全**：ES6 模块化，支持现代开发工具

## 支持的平台

| 平台 | 环境标识 | SDK 来源 |
|------|----------|----------|
| 微信小程序 | wx | https://res.wx.qq.com/open/js/jweixin-1.3.2.js |
| QQ 小程序 | qq | https://qqq.gtimg.cn/miniprogram/webview_jssdk/qqjssdk-1.0.0.js |
| 支付宝小程序 | my | https://appx/web-view.min.js |
| 百度小程序 | swan | https://b.bdstatic.com/searchbox/icms/searchbox/js/swan-2.0.4.js |
| 字节跳动小程序 | tt | https://lf3-cdn-tos.bytegoofy.com/obj/goofy/developer/jssdk/jssdk-1.2.1.js |

## 安装与引入

### ES6 模块方式
```javascript
import webviewBridge from '@/utils/webviewBridge.js';
```

### 在 Vue 组件中使用
```javascript
// 在 Vue 组件中
import webviewBridge from '@/utils/webviewBridge.js';

export default {
  mounted() {
    // 使用 webviewBridge
    webviewBridge.getEnv((result) => {
      console.log('当前环境:', result);
    });
  }
};
```

## 基础用法

### 1. 环境检测
```javascript
// 获取当前运行环境
webviewBridge.getEnv((result) => {
  console.log('环境信息:', result);
  // Web 环境返回: { webapp: true }
  // RN 环境返回: { reactNative: true }
});
```

### 2. 页面导航
```javascript
// 导航到指定页面
webviewBridge.navigateTo({
  url: '/pages/detail/detail?id=123',
  success: (res) => {
    console.log('导航成功', res);
  },
  fail: (err) => {
    console.log('导航失败', err);
  }
});

// 返回上一页
webviewBridge.navigateBack({
  delta: 1, // 返回层数
  success: (res) => {
    console.log('返回成功', res);
  }
});

// 切换到 Tab 页面
webviewBridge.switchTab({
  url: '/pages/index/index',
  success: (res) => {
    console.log('切换成功', res);
  }
});

// 重新加载页面
webviewBridge.reLaunch({
  url: '/pages/index/index',
  success: (res) => {
    console.log('重载成功', res);
  }
});

// 重定向到指定页面
webviewBridge.redirectTo({
  url: '/pages/detail/detail?id=123',
  success: (res) => {
    console.log('重定向成功', res);
  }
});
```

### 3. 位置服务
```javascript
// 获取当前位置
webviewBridge.getLocation({
  type: 'wgs84', // 坐标类型
  success: (res) => {
    console.log('纬度:', res.latitude);
    console.log('经度:', res.longitude);
  },
  fail: (err) => {
    console.log('获取位置失败', err);
  }
});

// 打开地图选择位置
webviewBridge.openLocation({
  latitude: 39.908823,
  longitude: 116.397470,
  name: '北京天安门',
  address: '北京市东城区东长安街',
  success: (res) => {
    console.log('打开地图成功', res);
  }
});
```

### 4. 图片处理
```javascript
// 选择图片
webviewBridge.chooseImage({
  count: 1, // 最多选择图片数量
  sizeType: ['original', 'compressed'], // 图片尺寸
  sourceType: ['album', 'camera'], // 图片来源
  success: (res) => {
    console.log('选择的图片:', res.tempFilePaths);
  }
});

// 预览图片
webviewBridge.previewImage({
  current: 'https://example.com/image1.jpg', // 当前显示图片
  urls: [ // 图片列表
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
  ],
  success: (res) => {
    console.log('预览成功', res);
  }
});
```

### 5. 网络状态
```javascript
// 获取网络状态
webviewBridge.getNetworkType({
  success: (res) => {
    console.log('网络类型:', res.networkType);
    // wifi、2g、3g、4g、unknown、none
  }
});
```

### 6. 消息通信
```javascript
// 向小程序发送消息
webviewBridge.postMessage({
  data: {
    type: 'userAction',
    payload: {
      action: 'click',
      target: 'button'
    }
  }
});
```

## 微信小程序特有功能

### 配置微信 JS-SDK
```javascript
// 仅在微信环境下需要配置
webviewBridge.config({
  appId: 'your-app-id',
  timestamp: '1234567890',
  nonceStr: 'random-string',
  signature: 'signature-string',
  jsApiList: [
    'checkJsApi',
    'chooseImage',
    'previewImage',
    'getLocation',
    'openLocation'
  ]
});
```

### 微信专有 API
```javascript
// 扫描二维码
webviewBridge.scanQRCode({
  needResult: 1, // 是否返回扫描结果
  scanType: ['qrCode', 'barCode'], // 扫描类型
  success: (res) => {
    console.log('扫描结果:', res.resultStr);
  }
});

// 录音相关
webviewBridge.startRecord({
  success: (res) => {
    console.log('开始录音');
  }
});

webviewBridge.stopRecord({
  success: (res) => {
    console.log('录音文件:', res.localId);
  }
});

// 播放录音
webviewBridge.playVoice({
  localId: 'localId', // 录音文件的本地ID
  success: (res) => {
    console.log('播放成功');
  }
});
```

## 支付宝小程序特有功能

```javascript
// 显示加载提示
webviewBridge.showLoading({
  content: '加载中...',
  success: (res) => {
    console.log('显示加载提示成功');
  }
});

// 隐藏加载提示
webviewBridge.hideLoading({
  success: (res) => {
    console.log('隐藏加载提示成功');
  }
});

// 弹出提示框
webviewBridge.alert({
  title: '提示',
  content: '这是一个提示',
  buttonText: '确定',
  success: (res) => {
    console.log('提示框关闭');
  }
});

// 发起支付
webviewBridge.tradePay({
  tradeNO: 'trade-no-123',
  success: (res) => {
    console.log('支付成功', res);
  },
  fail: (err) => {
    console.log('支付失败', err);
  }
});
```

## 百度小程序特有功能

```javascript
// 拨打电话
webviewBridge.makePhoneCall({
  phoneNumber: '10086',
  success: (res) => {
    console.log('拨打成功');
  }
});

// 设置剪贴板内容
webviewBridge.setClipboardData({
  data: '要复制的文本',
  success: (res) => {
    console.log('复制成功');
  }
});

// 选择位置
webviewBridge.chooseLocation({
  success: (res) => {
    console.log('选择的位置:', res.name);
    console.log('详细地址:', res.address);
    console.log('经纬度:', res.latitude, res.longitude);
  }
});
```

## 字节跳动小程序特有功能

```javascript
// 设置滑动返回模式
webviewBridge.setSwipeBackModeSync({
  mode: 'close' // 'open' | 'close'
});

// 压缩图片
webviewBridge.compressImage({
  src: 'path/to/image',
  quality: 80, // 压缩质量
  success: (res) => {
    console.log('压缩后的图片路径:', res.tempFilePath);
  }
});

// 上传文件
webviewBridge.uploadFile({
  url: 'https://example.com/upload',
  filePath: 'path/to/file',
  name: 'file',
  success: (res) => {
    console.log('上传成功', res);
  }
});
```

## 错误处理

```javascript
// 统一的错误处理方式
webviewBridge.someApi({
  success: (res) => {
    console.log('操作成功', res);
  },
  fail: (err) => {
    console.error('操作失败', err);
    // 根据错误类型进行处理
    if (err.errMsg) {
      console.error('错误信息:', err.errMsg);
    }
  },
  complete: (res) => {
    console.log('操作完成（无论成功或失败）', res);
  }
});
```

## 最佳实践

### 1. 环境检测
```javascript
// 在使用特定平台功能前，先检测环境
webviewBridge.getEnv((result) => {
  if (result.webapp) {
    // Web 环境的处理逻辑
    console.log('当前在 Web 环境');
  } else if (result.reactNative) {
    // React Native 环境的处理逻辑
    console.log('当前在 React Native 环境');
  } else {
    // 小程序环境的处理逻辑
    console.log('当前在小程序环境');
  }
});
```

### 2. 功能降级
```javascript
// 对于不支持的功能，提供降级方案
function shareContent(content) {
  if (typeof webviewBridge.startShare === 'function') {
    // 支付宝小程序的分享
    webviewBridge.startShare({
      title: content.title,
      content: content.desc,
      url: content.url
    });
  } else {
    // 降级方案：复制链接到剪贴板
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content.url);
      alert('链接已复制到剪贴板');
    } else {
      alert('当前环境不支持分享功能');
    }
  }
}
```

### 3. Promise 封装
```javascript
// 将回调形式的 API 封装为 Promise
function chooseImageAsync(options = {}) {
  return new Promise((resolve, reject) => {
    webviewBridge.chooseImage({
      ...options,
      success: resolve,
      fail: reject
    });
  });
}

// 使用 async/await
async function handleChooseImage() {
  try {
    const result = await chooseImageAsync({
      count: 1,
      sizeType: ['compressed']
    });
    console.log('选择的图片:', result.tempFilePaths);
  } catch (error) {
    console.error('选择图片失败:', error);
  }
}
```

## 注意事项

1. **环境检测**：在使用特定平台功能前，建议先检测当前运行环境
2. **错误处理**：始终提供 `fail` 回调来处理可能的错误
3. **权限申请**：某些功能（如位置、相机）需要用户授权
4. **兼容性**：不同平台对相同 API 的支持程度可能不同
5. **测试**：在各个目标平台上进行充分测试

## 调试技巧

1. **控制台日志**：使用 `console.log` 查看返回结果
2. **错误信息**：关注 `fail` 回调中的错误信息
3. **网络调试**：使用开发者工具监控网络请求
4. **真机测试**：某些功能需要在真机上测试

## 打包后js文件(可直接使用）
```js
// utils/webviewBridge.js

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof window !== 'undefined' && typeof window.define === 'function' && window.define.amd ? window.define(factory) :
    (global = global || self, global.mpx = factory());
  }(this, (function () { 'use strict';
  
    function loadScript(url) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$time = _ref.time,
        time = _ref$time === void 0 ? 5000 : _ref$time,
        _ref$crossOrigin = _ref.crossOrigin,
        crossOrigin = _ref$crossOrigin === void 0 ? false : _ref$crossOrigin;
      function request() {
        return new Promise(function (resolve, reject) {
          var sc = document.createElement('script');
          sc.type = 'text/javascript';
          sc.async = 'async';
  
          // 可选地增加 crossOrigin 特性
          if (crossOrigin) {
            sc.crossOrigin = 'anonymous';
          }
          sc.onload = sc.onreadystatechange = function () {
            if (!this.readyState || /^(loaded|complete)$/.test(this.readyState)) {
              resolve();
              sc.onload = sc.onreadystatechange = null;
            }
          };
          sc.onerror = function () {
            reject(new Error("load ".concat(url, " error")));
            sc.onerror = null;
          };
          sc.src = url;
          document.getElementsByTagName('head')[0].appendChild(sc);
        });
      }
      function timeout() {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error("load ".concat(url, " timeout")));
          }, time);
        });
      }
      return Promise.race([request(), timeout()]);
    }
  
    var sdkReady;
    var SDK_URL_MAP = Object.assign({
      wx: {
        url: 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js'
      },
      qq: {
        url: 'https://qqq.gtimg.cn/miniprogram/webview_jssdk/qqjssdk-1.0.0.js'
      },
      my: {
        url: 'https://appx/web-view.min.js'
      },
      swan: {
        url: 'https://b.bdstatic.com/searchbox/icms/searchbox/js/swan-2.0.4.js'
      },
      tt: {
        url: 'https://lf3-cdn-tos.bytegoofy.com/obj/goofy/developer/jssdk/jssdk-1.2.1.js'
      }
    }, window.sdkUrlMap);
    function getMpxWebViewId() {
      var href = location.href;
      var reg = /mpx_webview_id=(\d+)/g;
      var matchVal = reg.exec(href);
      var result;
      if (matchVal && matchVal[1]) {
        result = +matchVal[1];
      }
      return result;
    }
    var env = null;
    var callbackId = 0;
    var clientUid = getMpxWebViewId();
    var callbacks = {};
    var runCallback = function runCallback(msgData) {
      var callbackId = msgData.callbackId,
        error = msgData.error,
        result = msgData.result;
      if (callbackId !== undefined && callbacks[callbackId]) {
        if (error) {
          callbacks[callbackId](error);
        } else {
          callbacks[callbackId](null, result);
        }
        delete callbacks[callbackId];
      }
    };
    var eventListener = function eventListener(event) {
      // 接收web-view的回调
      var msgData = event.data;
      try {
        if (typeof msgData === 'string') {
          msgData = JSON.parse(msgData);
        }
      } catch (e) {
        console.log(e);
      }
      runCallback(msgData);
    };
  
    // 环境判断逻辑
    var systemUA = navigator.userAgent;
    if (systemUA.indexOf('AlipayClient') > -1 && systemUA.indexOf('MiniProgram') > -1) {
      env = 'my';
    } else if (systemUA.toLowerCase().indexOf('miniprogram') > -1) {
      env = systemUA.indexOf('QQ') > -1 ? 'qq' : 'wx';
    } else if (systemUA.indexOf('swan/') > -1) {
      env = 'swan';
    } else if (systemUA.toLocaleLowerCase().indexOf('toutiao') > -1) {
      env = 'tt';
    } else if (window.ReactNativeWebView) {
      env = 'rn';
      window.mpxWebviewMessageCallback = runCallback;
    } else {
      env = 'web';
      window.addEventListener('message', eventListener, false);
    }
    var initWebviewBridge = function initWebviewBridge() {
      sdkReady = env !== 'web' && env !== 'rn' ? SDK_URL_MAP[env].url ? loadScript(SDK_URL_MAP[env].url) : Promise.reject(new Error('未找到对应的sdk')) : Promise.resolve();
      getWebviewApi();
    };
    var webviewSdkready = false;
    function runWebviewApiMethod(callback) {
      if (webviewSdkready) {
        callback();
      } else {
        sdkReady.then(function () {
          webviewSdkready = true;
          callback();
        });
      }
    }
    var webviewBridge = {
      config: function config(_config) {
        if (env !== 'wx') {
          console.warn('非微信环境不需要配置config');
          return;
        }
        runWebviewApiMethod(function () {
          if (window.wx) {
            window.wx.config(_config);
          }
        });
      }
    };
    function postMessage(type) {
      for (var _len = arguments.length, extraData = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        extraData[_key - 1] = arguments[_key];
      }
      if (type === 'invoke') {
        type = extraData[0];
        extraData = extraData.slice(1);
      }
      var data = extraData[0] || {};
      if (type !== 'getEnv') {
        var currentCallbackId = ++callbackId;
        callbacks[currentCallbackId] = function (err, res) {
          if (err) {
            data.fail && data.fail(err);
            data.complete && data.complete(err);
          } else {
            data.success && data.success(res);
            data.complete && data.complete(res);
          }
          delete callbacks[currentCallbackId];
        };
        var postParams = {
          type: type,
          callbackId: callbackId,
          args: extraData
        };
        if (clientUid !== undefined) {
          postParams.clientUid = clientUid;
        }
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage && window.ReactNativeWebView.postMessage(JSON.stringify(postParams));
        } else {
          window.parent.postMessage && window.parent.postMessage(JSON.stringify(postParams), '*');
        }
      } else {
        var result = {
          webapp: true
        };
        if (window.ReactNativeWebView) {
          result = {
            reactNative: true
          };
        }
        data(result);
      }
    }
    var getWebviewApi = function getWebviewApi() {
      var multiApiMap = {
        wx: {
          keyName: 'miniProgram',
          api: ['navigateTo', 'navigateBack', 'switchTab', 'reLaunch', 'redirectTo', 'postMessage', 'getEnv']
        },
        tt: {
          keyName: 'miniProgram',
          api: ['redirectTo', 'navigateTo', 'switchTab', 'reLaunch', 'navigateBack', 'setSwipeBackModeSync', 'postMessage', 'getEnv', 'checkJsApi', 'chooseImage', 'compressImage', 'previewImage', 'uploadFile', 'getNetworkType', 'openLocation', 'getLocation']
        },
        swan: {
          keyName: 'webView',
          api: ['navigateTo', 'navigateBack', 'switchTab', 'reLaunch', 'redirectTo', 'getEnv', 'postMessage']
        },
        qq: {
          keyName: 'miniProgram',
          api: ['navigateTo', 'navigateBack', 'switchTab', 'reLaunch', 'redirectTo', 'getEnv', 'postMessage']
        }
      };
      var singleApiMap = {
        wx: ['checkJSApi', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'startSearchBeacons', 'stopSearchBeacons', 'onSearchBeacons', 'scanQRCode', 'chooseCard', 'addCard', 'openCard'],
        my: ['navigateTo', 'navigateBack', 'switchTab', 'reLaunch', 'redirectTo', 'chooseImage', 'previewImage', 'getLocation', 'openLocation', 'alert', 'showLoading', 'hideLoading', 'getNetworkType', 'startShare', 'tradePay', 'postMessage', 'onMessage', 'getEnv'],
        swan: ['makePhoneCall', 'setClipboardData', 'getNetworkType', 'openLocation', 'getLocation', 'chooseLocation', 'chooseImage', 'previewImage', 'openShare', 'navigateToSmartProgram'],
        web: ['navigateTo', 'navigateBack', 'switchTab', 'reLaunch', 'redirectTo', 'getEnv', 'postMessage', 'getLocation', 'invoke'],
        rn: ['navigateTo', 'navigateBack', 'switchTab', 'reLaunch', 'redirectTo', 'getEnv', 'postMessage', 'getLocation', 'invoke'],
        tt: []
      };
      var multiApi = multiApiMap[env] || {};
      var singleApi = singleApiMap[env] || [];
      var multiApiLists = multiApi.api || [];
      multiApiLists.forEach(function (item) {
        webviewBridge[item] = function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          runWebviewApiMethod(function () {
            var _window$env$multiApi$;
            (_window$env$multiApi$ = window[env][multiApi.keyName])[item].apply(_window$env$multiApi$, args);
          });
        };
      });
      singleApi.forEach(function (item) {
        webviewBridge[item] = function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          if (env === 'web' || env === 'rn') {
            postMessage.apply(void 0, [item].concat(args));
          } else if (env === 'wx') {
            runWebviewApiMethod(function () {
              window[env] && window[env].ready(function () {
                var _window$env;
                (_window$env = window[env])[item].apply(_window$env, args);
              });
            });
          } else {
            runWebviewApiMethod(function () {
              var _window$env2;
              (_window$env2 = window[env])[item].apply(_window$env2, args);
            });
          }
        };
      });
    };
    initWebviewBridge();
  
    return webviewBridge;
  
  })));
  
```

## ES6模块代码（需调试）
```js
import loadScript from './loadscript'
let sdkReady
const SDK_URL_MAP = Object.assign({
  wx: {
    url: 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js'
  },
  qq: {
    url: 'https://qqq.gtimg.cn/miniprogram/webview_jssdk/qqjssdk-1.0.0.js'
  },
  my: {
    url: 'https://appx/web-view.min.js'
  },
  swan: {
    url: 'https://b.bdstatic.com/searchbox/icms/searchbox/js/swan-2.0.4.js'
  },
  tt: {
    url: 'https://lf3-cdn-tos.bytegoofy.com/obj/goofy/developer/jssdk/jssdk-1.2.1.js'
  }
}, window.sdkUrlMap)
function getMpxWebViewId () {
  const href = location.href
  const reg = /mpx_webview_id=(\d+)/g
  const matchVal = reg.exec(href)
  let result
  if (matchVal && matchVal[1]) {
    result = +matchVal[1]
  }
  return result
}
let env = null
let callbackId = 0
const clientUid = getMpxWebViewId()
const callbacks = {}

const runCallback = (msgData) => {
  const { callbackId, error, result } = msgData
  if (callbackId !== undefined && callbacks[callbackId]) {
    if (error) {
      callbacks[callbackId](error)
    } else {
      callbacks[callbackId](null, result)
    }
    delete callbacks[callbackId]
  }
}

const eventListener = (event) => {
  // 接收web-view的回调
  let msgData = event.data
  try {
    if (typeof msgData === 'string') {
      msgData = JSON.parse(msgData)
    }
  } catch (e) {
  }
  runCallback(msgData)
}

// 环境判断逻辑
const systemUA = navigator.userAgent
if (systemUA.indexOf('AlipayClient') > -1 && systemUA.indexOf('MiniProgram') > -1) {
  env = 'my'
} else if (systemUA.toLowerCase().indexOf('miniprogram') > -1) {
  env = systemUA.indexOf('QQ') > -1 ? 'qq' : 'wx'
} else if (systemUA.indexOf('swan/') > -1) {
  env = 'swan'
} else if (systemUA.toLocaleLowerCase().indexOf('toutiao') > -1) {
  env = 'tt'
} else if (window.ReactNativeWebView) {
  env = 'rn'
  window.mpxWebviewMessageCallback = runCallback
} else {
  env = 'web'
  window.addEventListener('message', eventListener, false)
}

const initWebviewBridge = () => {
  sdkReady = (env !== 'web' && env !== 'rn') ? SDK_URL_MAP[env].url ? loadScript(SDK_URL_MAP[env].url) : Promise.reject(new Error('未找到对应的sdk')) : Promise.resolve()
  getWebviewApi()
}

let webviewSdkready = false
function runWebviewApiMethod (callback) {
  if (webviewSdkready) {
    callback()
  } else {
    sdkReady.then(() => {
      webviewSdkready = true
      callback()
    })
  }
}

const webviewBridge = {
  config (config) {
    if (env !== 'wx') {
      console.warn('非微信环境不需要配置config')
      return
    }
    runWebviewApiMethod(() => {
      if (window.wx) {
        window.wx.config(config)
      }
    })
  }
}

function postMessage (type, ...extraData) {
  if (type === 'invoke') {
    type = extraData[0]
    extraData = extraData.slice(1)
  }
  const data = extraData[0] || {}
  if (type !== 'getEnv') {
    const currentCallbackId = ++callbackId
    callbacks[currentCallbackId] = (err, res) => {
      if (err) {
        data.fail && data.fail(err)
        data.complete && data.complete(err)
      } else {
        data.success && data.success(res)
        data.complete && data.complete(res)
      }
      delete callbacks[currentCallbackId]
    }
    const postParams = {
      type,
      callbackId,
      args: extraData
    }
    if (clientUid !== undefined) {
      postParams.clientUid = clientUid
    }
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage && window.ReactNativeWebView.postMessage(JSON.stringify(postParams))
    } else {
      window.parent.postMessage && window.parent.postMessage(JSON.stringify(postParams), '*')
    }
  } else {
    let result = {
      webapp: true
    }
    if (window.ReactNativeWebView) {
      result = {
        reactNative: true
      }
    }
    data(result)
  }
}

const getWebviewApi = () => {
  const multiApiMap = {
    wx: {
      keyName: 'miniProgram',
      api: [
        'navigateTo',
        'navigateBack',
        'switchTab',
        'reLaunch',
        'redirectTo',
        'postMessage',
        'getEnv'
      ]
    },
    tt: {
      keyName: 'miniProgram',
      api: [
        'redirectTo',
        'navigateTo',
        'switchTab',
        'reLaunch',
        'navigateBack',
        'setSwipeBackModeSync',
        'postMessage',
        'getEnv',
        'checkJsApi',
        'chooseImage',
        'compressImage',
        'previewImage',
        'uploadFile',
        'getNetworkType',
        'openLocation',
        'getLocation'
      ]
    },
    swan: {
      keyName: 'webView',
      api: [
        'navigateTo',
        'navigateBack',
        'switchTab',
        'reLaunch',
        'redirectTo',
        'getEnv',
        'postMessage'
      ]
    },
    qq: {
      keyName: 'miniProgram',
      api: [
        'navigateTo',
        'navigateBack',
        'switchTab',
        'reLaunch',
        'redirectTo',
        'getEnv',
        'postMessage'
      ]
    }
  }
  const singleApiMap = {
    wx: [
      'checkJSApi',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getLocalImgData',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'onVoicePlayEnd',
      'uploadVoice',
      'downloadVoice',
      'translateVoice',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'startSearchBeacons',
      'stopSearchBeacons',
      'onSearchBeacons',
      'scanQRCode',
      'chooseCard',
      'addCard',
      'openCard'
    ],
    my: [
      'navigateTo',
      'navigateBack',
      'switchTab',
      'reLaunch',
      'redirectTo',
      'chooseImage',
      'previewImage',
      'getLocation',
      'openLocation',
      'alert',
      'showLoading',
      'hideLoading',
      'getNetworkType',
      'startShare',
      'tradePay',
      'postMessage',
      'onMessage',
      'getEnv'
    ],
    swan: [
      'makePhoneCall',
      'setClipboardData',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'chooseLocation',
      'chooseImage',
      'previewImage',
      'openShare',
      'navigateToSmartProgram'
    ],
    web: [
      'navigateTo',
      'navigateBack',
      'switchTab',
      'reLaunch',
      'redirectTo',
      'getEnv',
      'postMessage',
      'getLocation',
      'invoke'
    ],
    rn: [
      'navigateTo',
      'navigateBack',
      'switchTab',
      'reLaunch',
      'redirectTo',
      'getEnv',
      'postMessage',
      'getLocation',
      'invoke'
    ],
    tt: []
  }
  const multiApi = multiApiMap[env] || {}
  const singleApi = singleApiMap[env] || []
  const multiApiLists = multiApi.api || []
  multiApiLists.forEach((item) => {
    webviewBridge[item] = (...args) => {
      runWebviewApiMethod(() => {
        window[env][multiApi.keyName][item](...args)
      })
    }
  })
  singleApi.forEach((item) => {
    webviewBridge[item] = (...args) => {
      if (env === 'web' || env === 'rn') {
        postMessage(item, ...args)
      } else if (env === 'wx') {
        runWebviewApiMethod(() => {
          window[env] && window[env].ready(() => {
            window[env][item](...args)
          })
        })
      } else {
        runWebviewApiMethod(() => {
          window[env][item](...args)
        })
      }
    }
  })
}

initWebviewBridge()

export default webviewBridge
```

## 参考地址

- 参考地址：[https://www.npmjs.com/package/@mpxjs/webview-bridge?activeTab=readme](https://www.npmjs.com/package/@mpxjs/webview-bridge?activeTab=readme)
