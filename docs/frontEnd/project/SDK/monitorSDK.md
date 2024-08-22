

# 前端监控SDK技术实现方案
[[toc]]

## 概述
本SDK旨在为前端开发者提供一个轻量级且功能强大的监控解决方案，帮助开发者及时发现和解决前端应用中的各种问题。SDK覆盖了从JavaScript运行时错误监控、
资源加载监控到用户行为埋点统计等广泛的监控需求，并支持多种数据上报方式以确保数据的可靠性和实时性。

## 实现思路

### 实现思路梳理
#### 前端监控系统实现（稳定性）
- js报错监控
  - 语法错误，（开发阶段静态代码检查 如esLInt等工具）
  - 同步错误，（type catch捕获,  window.onerror， addEventListener('error'）都可以）
  - 异步错误, （ window.onerror， addEventListener('error'）都可以）
- promise异常监控 (unhandledrejection, 或者promise的catch）
- 资源加载错误监控（ael('error')
- 接口请求异常监控 (XMLHttpRequest,监听error)
0 fetch请求监控
- 白屏监控 elementsFromPoint
- 手动上报，try catch, 其他回调失败等

#### （用户体验）性能指标
- 加载时间（各阶段的加载时间）
- TTFB（首字节时间）
- FP（首次绘制）
- FCP（首次内容绘制）
- FMP（首次有意义绘制）
- FID（首次输入延迟）
- 卡顿（超过50ms长任务）

#### （业务分析依据）
- pv （系统访问量）（初始化sdk上报一条)
- uv （用户访问量）（只上报pv, 过滤后得到uv,根据用户id或ip过滤）
- 用户页面停留时间 （history路由 hash路由）

#### 用户埋点统计
- 手动埋点（直接调用接口，或配置标签属性）
- 无痕埋点（全局）可手动标记值

#### 数据上报
- xhr请求接口上报（如服务器不同需跨域，刷新重新打开可能丢失数据）
- img标签上报（避免了跨域问题，但不适合大量数据上报，url长度限制）
- sendBeacon（无需跨域，不会刷新丢失数据，有兼容问题）
- 延迟上报，缓存到内存，页面卸载时查看有无为上报的缓存
- 上报格式问题：数组 or 对象（数组）
- 合并上报：无痕埋点等大量数据上报的情况适用；
- 总：一般采用sendBeacon上报和img标签上报结合的方式；

#### SDK开发思路
- 数据采集
- 初始化配置
- 暴露SDK初始化及其他方法
- 手动上报方法，上报接口注入和分类

#### 打包测试发布流程
- webpack配置 balel 压缩等
- 打包发布npm,安装使用测试
- 单元测试 （函数类单元）
- 集成测试 （监听，请求类测试）
- 使用文档整理
- 发布到npm+完整文档
- 监控SDK开发思路及博客


#### 后续优化idea
- soure-map
- 参考其他博客和成熟网站及GPT......


## 代码结构
```
ddd-monitor-sdk/
├── src/
│   ├── lib/
│   │   ├── actionTracker.js
│   │   ├── blankScreen.js
│   │   ├── fetch.js
│   │   ├── jsError.js
│   │   ├── longTask.js
│   │   ├── pageTracker.js
│   │   ├── timing.js
│   │   ├── xhr.js
│   │   └── utils/
│   │       ├── cache.js
│   │       ├── formatTime.js
│   │       ├── getLastEvent.js
│   │       ├── getSelector.js
│   │       ├── onload.js
│   │       ├── report.js
│   │       ├── util.js
│   │       └── index.js
│   └── test/
│       ├── cache.test.js
│       ├── formatTime.test.js
│       ├── getLastEvent.test.js
│       ├── getSelector.test.js
│       ├── onload.test.js
│       └── util.test.js
├── .babelrc
├── jest.config.js
├── package.json
├── README.md
├── webpack.config.js
└── yarn.lock
```

## 数据结构设计
### 公共数据
```js
{
  appId: '', // 项目的appId
  userId: '', // 用户id
  type: '', // 上报类型：error/action/visit/user
  title: '', // 当前页title
  url: '', // 当前页url
  timestamp: '', // 当前时间戳
  userAgent: '', // 当前浏览器信息
}
```

### 稳定性监控
#### 资源加载异常
```js
{
    type: 'error', // 上报类型
    kind: 'stability', // 大类型：稳定性指标
    errorType: 'resourceError', // 错误类型
    filename: '', // 报错文件
    tagName: '', // 标签名
    selector: ''// 代表最后一个操作的元素
}
```

#### js加载错误
```js
{
    type: 'error', // 上报类型
    kind: 'stability', // 大类型：稳定性指标
    errorType: 'jsError', // 错误类型
    message: '', // 报错信息
    filename: '', // 报错文件
    position: '', // 报错位置 行：列
    stack: '', // 堆栈信息 哪个方法调用哪一块儿
    selector: ''// 代表最后一个操作的元素
}
```

#### promise错误
```js
{
    type: 'error', // 上报类型
    kind: 'stability', // 大类型：稳定性指标
    errorType: 'promiseError', // 错误类型
    message: '', // 报错信息
    filename: '', // 报错文件
    position: '', // 报错位置 行：列
    stack: '', // 堆栈信息 哪个方法调用哪一块儿
    selector: ''// 代表最后一个操作的元素
}
```

#### 手动上报异常
```js
{
    type: 'error', // 上报类型
    message: '', // 异常信息
    error: '', // 异常标题
    errorType: 'catchError', // 错误类型，自定义
}
```

#### XHR 请求监控
```js
{
    type: 'xhr', // 上报类型
    kind: "stability", // 大类型：稳定性指标
    eventType: '',  // load, error, abort 请求类型
    pathname: '', // 请求路径
    status: '', // 状态码
    duration: '', // 持续时间
    response: '', // 响应体
    params:'', // 入参
}
```

#### fetch 请求监控
```js
{
    type: 'fetch', // 上报类型
    kind: "stability", // 大类型：稳定性指标
    eventType: '', // 响应类型：loadError（连接错误），error（解析错误）
    pathname: '', // 请求地址url
    status: '', // 状态码
    duration: '', // 耗时
    response: '', // 响应体
    method: '', // 请求方式
    params: '', // 入参
}
```

### 埋点上报
#### 全局埋点
```js
{
    type: 'action', // 上报类型
    kind: "tracker", // 大类型：埋点上报
    actionType: '', // 行为类型：click,submit等
    selector: '', // 代表最后一个操作的元素
    data: '', // 手动添加data-target属性获取属性值
}
```
#### 手动埋点
```js
{
    type: 'action', // 上报类型
    kind: "tracker", // 大类型：埋点上报
    actionType: '', // 行为类型：click,submit等
    data: '', // 手动添加data-target属性获取属性值
}
```

### 用户停留及pv上报
#### 页面停留时间
```js
{
    type: 'stayTimePage', // 上报类型
    kind: "stayView", // 大类型：页面停留
    stayTime: '', // 停留时间值
    page: '', // 停留页面url
}
```

#### pv
```js
{
    type: 'pv', // 上报类型
    kind: "stayView", // 大类型：页面停留
    effectiveType: '', // 网络环境
    rtt: '', // 往返时间
    screen: '', // 设备分辨率
}
```

#### 系统总停留时间
```js
{
    type: 'stayTimeSystem', // 上报类型
    kind: "stayView", // 大类型：页面停留
    stayTime: '', // 停留时间值
}
```

### 性能指标监控
#### 首次输入延迟
```js
{
    type: 'firstInputDelay', // 上报类型
    kind: "experience", // 用户体验指标
    inputDelay:'', // 延迟的时间
    duration: '', // 处理的耗时
    startTime: '', // 开始处理的时间
    selector: : '', // 代表最后一个操作的元素路径
}
```
#### 时间指标
```js
{
    type: 'timing', // 上报类型
    kind: "experience", // 用户体验指标
    connectTime: '', // TCP连接耗时
    ttfbTime: '', // 首字节到达时间
    responseTime: '', // response响应耗时
    parseDOMTime: '', // DOM解析渲染的时间
    domContentLoadedTime: '', // DOMContentLoaded事件回调耗时
    timeToInteractive: '', // 首次可交互时间
    loadTime: '', // 完整的加载时间
}

```
#### 性能指标
```js
{
    type: 'paint', // 上报类型
    kind: "experience", // 用户体验指标
    firstPaint: ', // 首次绘制时间
    firstContentPaint: '', // 首次内容绘制时间
    firstMeaningfulPaint: '', // 首次有意义绘制时间
    largestContentfulPaint: '', // 最大内容绘制时间
}
```

### 长任务监控(卡顿)
#### 长任务
```js
{
    type: 'longTask', // 上报类型
    kind: 'experience', // 用户体验指标
    eventType: '', // 最后一个操作事件类型
    startTime: '', // 开始时间
    duration: '', // 持续时间
    selector: '', // 代表最后一个操作的元素路径
}
```


## 核心功能模块设计
### JavaScript错误监控

#### 功能描述
捕获并上报前端**JavaScript运行时的错误**，**未处理的Promise错误**、**资源加载错误**。
通过监听`window.addEventListener('error')`、`window.addEventListener('unhandledrejection'）`事件，
捕获错误信息，并格式化后上报至服务器。
- `window.addEventListener('error')`：捕获js错误和资源加载错误。
- `window.addEventListener('unhandledrejection'）`：捕获Promise错误

#### 技术实现
```js
// ddd-monitor-sdk\src\lib\jsError.js

import getSelector from "../utils/getSelector";
import getLastEvent from '../utils/getLastEvent'
import {lazyReport} from "../utils/report";

/**
 * 错误捕获： js，promise,资源加载
 */
export function injectJsError(){
    const isHideResourceError = window['_monitor_is_hide_resource_error_'];
    // 监听全局未捕获错误
    window.addEventListener('error', function (event){
        let lastEvent = getLastEvent(); // 捕获最后一个交互事件（最新标准pointerEvent无法获取path)
        if( event.target && (event.target.src || event.target.href)) {

            // ------- resource error --------
            // img src上报过滤
            const reportUrl = window['_monitor_report_url_'];
            const url = event.target.src || '';
            if(!isHideResourceError){
                if (!url.startsWith(reportUrl)) {
                    lazyReport('error', {
                        kind: 'stability', // 稳定性指标
                        errorType: 'resourceError', // 资源加载错误
                        filename: event.target.src || event.target.href, // 报错文件
                        tagName: event.target.tagName, // 标签名
                        selector: getSelector(event.target)// 代表最后一个操作的元素
                    });
                }
            }

        }else{

            // --------  js error ---------
            lazyReport('error', {
                kind: 'stability', // 稳定性指标
                errorType: 'jsError', // js执行错误
                message: event.message, // 报错信息
                filename: event.filename, // 报错文件
                position: `${event.lineno}:${event.colno}`, // 报错位置 行：列
                stack: getLines(event.error.stack), // 堆栈信息 哪个方法调用哪一块儿
                selector: lastEvent ? getSelector(lastEvent.path) : ""// 代表最后一个操作的元素
            });
        }
    }, true);


    // ------  promise error  --------
    window.addEventListener('unhandledrejection', (event) => {
        let lastEvent = getLastEvent(); // 获取到最后一个交互事件
        let message;
        let reason = event.reason;
        let lineno = 0;
        let colno = 0;
        let filename;
        let stack;
        if(typeof event.reason === 'string') {
            message = reason;
        }else if(typeof reason === 'object'){
            if(reason.stack){
                let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
                filename = matchResult[1];
                lineno = matchResult[2];
                colno = matchResult[3];
            }
            message = reason.message;
            stack = getLines(reason.stack);
        }
        lazyReport('error', {
            kind: 'stability', // 稳定性指标
            errorType: 'promiseError', // js执行错误
            message: message, // 报错信息
            filename: filename, // 报错文件
            position: `${lineno}:${colno}`, // 报错位置 行：列
            stack: stack, // 堆栈信息 哪个方法调用哪一块儿
            selector: lastEvent ? getSelector(lastEvent.path) : ""// 代表最后一个操作的元素
        });
    }, true)


    /**
     * stack信息处理
     * @param stack
     * @return {string}
     */
    function getLines(stack) {
        return stack.split('\n').slice(1).map(item=>item.replace(/^\s+at\s+/g, "")).join('^');
    }

}


/**
 * 手动捕获错误
 */
export function errorCatcher(errorTitle, message) {
    // 上报错误
    lazyReport('error', {
        message: message,
        error: errorTitle,
        errorType: 'catchError'
    });
}
```


### 白屏监控

#### 功能描述
- 白屏问题是前端应用程序中常见的性能与稳定性问题，通常表现为页面加载后，用户看到的只是空白屏幕，而非期望的内容。<br>
- 白屏监控的主要目标是检测页面加载过程中是否出现白屏情况，及时发现并记录相关信息，以便后续分析和优化。<br>
- **屏幕区域确定**：一屏幕中心点为原点，横坐标标记9个点坐标点，纵坐标标记9个坐标点，总计18个坐标点。
- **元素检查**：通过`document.elementsFromPoint`检查这些坐标点上的元素信息是否为有效坐标点。
- **有效坐标点**：检查坐标点是否存在有效的DOM元素，如id,class,nodeName（排除`<html>`、`<body> `、`#container` `.content`这些盒子元素）。
- **白屏定义**：如果无效坐标点大于16个，则定义为改页面为白屏页面。


#### 技术实现
```js

import onload from "../utils/onload";
import { lazyReport } from '../utils/report';


/**
 * 白屏监控
 */
export function blankScreen() {
  let wrapperElements = ["html", "body", "#container", ".content"];
  let emptyPoints = 0;
  function getSelector(element) {
    const { id, className, nodeName } = element;
    if (id) {
      return "#" + id;
    } else if (typeof className === "string") {
      // 过滤空白符 + 拼接 可能多个className  a  b   c => .a.b.c
      return (
        "." +
        className
          .split(" ")
          .filter((item) => !!item)
          .join(".")
      );
    } else {
      return nodeName.toLowerCase();
    }
  }
  function isWrapper(element) {
    let selector = getSelector(element);
    if (wrapperElements.indexOf(selector) !== -1) {
      emptyPoints++;
    }
  }
  // 刚开始页面内容为空，监听接口加载，等页面渲染完成，再去做判断
  onload(function () {
    if (document.elementsFromPoint && typeof document.elementsFromPoint === 'function') {
      // 浏览器支持 document.elementsFromPoint()
      let xElements, yElements;
      for (let i = 0; i < 9; i++) {
        xElements = document.elementsFromPoint(
            (window.innerWidth * i) / 10,
            window.innerHeight / 2
        );
        yElements = document.elementsFromPoint(
            window.innerWidth / 2,
            (window.innerHeight * i) / 10
        );
        isWrapper(xElements[0]);
        isWrapper(yElements[0]);
      }
      // 白屏 总共18个点  如果空白点数量大于 16个 代表白屏
      if (emptyPoints >= 16) {
        const centerElements = document.elementsFromPoint(
            window.innerWidth / 2,
            window.innerHeight / 2
        );
        lazyReport('blank', {
          kind: "stability",
          type: "blank",
          emptyPoints: emptyPoints + "", // 空白点数量
          screen: window.screen.width + "X" + window.screen.height,  // 屏幕分辨率
          viewPoint: window.innerWidth + "X" + window.innerHeight,  // 视口大小
          selector: getSelector(centerElements[0]),  // 屏幕中心点选择器
        })
      }
    }

  });
}

```

### fetch 请求监控

#### 功能描述
- **拦截和监控 fetch 请求**: 通过替换原生 `window.fetch` 方法，实现对所有 fetch 请求的拦截。
在请求发起和响应处理过程中，记录请求的开始时间和结束时间，以计算请求的持续时间。
- **处理响应数据**：对响应数据进行特殊处理，重写了 `response.json` 方法，以捕获解析响应体时可能发生的错误。
如果解析响应体成功，正常返回数据；如果失败，记录解析失败的日志并上报。

#### 技术实现
```js
import {lazyReport} from "../utils/report";

/**
 * fetch 请求监控
 */
export function injectFetch() {
    let oldFetch = window.fetch;

    function hijackFetch(url, options) {
        let startTime = Date.now();
        return new Promise((resolve, reject) => {
            oldFetch.apply(this, [url, options]).then(async response => {
                // response 为流数据
                const oldResponseJson = response.__proto__.json;
                response.__proto__.json = function (...responseRest) {
                    return new Promise((responseResolve, responseReject) => {
                        oldResponseJson.apply(this, responseRest).then(result => {
                            responseResolve(result);
                        }, (responseRejection) => {
                            // 解析响应数据时捕获错误
                            sendLogData({
                                url,
                                startTime,
                                statusText: response.statusText,
                                status: response.status,
                                eventType: 'error',
                                response: responseRejection.stack,
                                options
                            })
                            responseReject(responseRejection)
                        })
                    })
                }
                resolve(response)
            }, rejection => {
                // 记录请求失败的日志
                sendLogData({
                    url,
                    startTime,
                    eventType: 'loadError',
                    response: rejection.stack,
                    options
                })
                reject(rejection)
            })
        })
    }

    window.fetch = hijackFetch;
}

const sendLogData = ({
                         startTime,
                         statusText = '',
                         status = '',
                         eventType,
                         url,
                         options,
                         response,
                     }) => {
    // 持续时间
    let duration = Date.now() - startTime;
    const {method = 'get', body} = options || {}
    // 上报接口过滤掉
    const reportUrl = window['_monitor_report_url_'];
    if (!url.startsWith(reportUrl)) {
        lazyReport('fetch', {
            kind: 'stability', // 稳定性指标
            eventType: eventType,
            pathname: url,
            status: status + "-" + statusText, // 状态码
            duration,
            response: response ? JSON.stringify(response) : "", // 响应体
            method,
            params: body || "", // 入参
        });
    }

}
```

### XHR 请求监控

#### 功能描述
- 通过拦截和扩展原生 `XMLHttpRequest` 对象，监控所有通过 XHR 发起的网络请求，特别是请求的成功与失败情况
- **拦截和监控 XHR 请求**：重写 `XMLHttpRequest.prototype.open` 方法，记录请求的 method（HTTP方法）、url 和 async（是否异步）参数。
通过 `XMLHttpRequest.prototype.send` 方法，监控请求的开始时间和结束时间，以计算请求的持续时间。
- **捕获请求的生命周期事件**：监听 XHR 请求的生命周期事件，包括 load（请求成功）、error（请求失败）、abort（请求中止）等。
  根据可配置项 `window['_monitor_xhr_type_']`，选择性地捕获不同类型的事件。

#### 技术实现
```js

import { lazyReport } from '../utils/report';

/**
 * XHR 请求监控
 */
export function injectXHR() {
  let XMLHttpRequest = window.XMLHttpRequest;
  let oldOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, async) {
    // 把上报接口过滤掉
    const reportUrl = window['_monitor_report_url_'];
    if (!url.startsWith(reportUrl)) {
      this.logData = { method, url, async };
    }
    return oldOpen.apply(this, arguments);
  };
  let oldSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    if (this.logData) {
      let startTime = Date.now(); // 发送前记录开始时间
      let handler = (type) => (event) => {
        // 持续时间
        let duration = Date.now() - startTime;
        let status = this.status;  // 200 500
        let statusText = this.statusText;  // Ok Server Error

        lazyReport('xhr',{
          kind: "stability",
          eventType: type,  // load, error, abort 请求类型
          pathname: this.logData.url, // 请求路径
          status: status + "-" + statusText, // 状态码
          duration, // 持续时间
          response: this.response ? JSON.stringify(this.response) : "", // 响应体
          params: body || "", // 入参
        });

      };

      // 监听成功，失败，的所有接口
      const xhrType = window['_monitor_xhr_type_'];
      if(xhrType === 'all'){
        this.addEventListener("load", handler("load"), false);
        this.addEventListener("error", handler("error"), false);
        this.addEventListener("abort", handler("abort"), false);
      }else if(xhrType === 'load'){
        this.addEventListener("load", handler("load"), false);
      }else if(xhrType === 'abort'){
        this.addEventListener("abort", handler("abort"), false);
      }else{
        this.addEventListener("error", handler("error"), false);
      }

    }
    return oldSend.apply(this, arguments);
  };
}

```


### 页面停留和访问上报

#### 功能描述
- **页面停留时间监控**：支持 history 路由和 hash 路由两种方式，分别通过 history.pushState、history.replaceState 和 hashchange 事件监听来触发停留时间的计算。
- **页面访问行为上报**：当用户切换页面时（通过 pushState、replaceState、hashchange 等事件），会将用户在当前页面的停留时间以及页面路径上报，以便进行后续分析。
  持记录用户在不同页面的访问路径，形成用户的访问轨迹数据。
- **PV（页面访问量）**：在页面加载完成时上报页面访问量（PV）。并记录设备的网络环境（如网络类型和往返时间）以及屏幕分辨率。
- **系统总访问时间上报**：在页面卸载（unload）时上报用户在整个系统中的总停留时间，以此衡量用户在该系统中的参与度和活跃度。
- **跨页面访问时间跟踪**：通过重写 pushState 和 replaceState 方法，拦截和监控用户在不同页面之间的跳转行为，确保能够准确记录每个页面的停留时间。

#### 技术实现
```js

/**
 * 页面停留和访问上报
 */

import { lazyReport } from '../utils/report';

/**
 * history路由监听
 */
export function historyPageTracker() {
    let beforeTime = Date.now(); // 进入页面的时间
    let beforePage = ''; // 上一个页面

    // 获取在某个页面的停留时间
    function getStayTime() {
        let curTime = Date.now();
        let stayTime = curTime - beforeTime;
        beforeTime = curTime;
        return stayTime;
    }

    /**
     * 重写pushState和replaceState方法
     * @param {*} name
     * @returns
     */
    const createHistoryEvent = function (name) {
        // 拿到原来的处理方法
        const origin = window.history[name];
        return function(event) {
            let res = origin.apply(this, arguments);
            let e = new Event(name);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return res;
        };
    };

    // history.pushState
    window.addEventListener('pushState', function () {
        listener()
    });

    // history.replaceState
    window.addEventListener('replaceState', function () {
        listener()
    });

    window.history.pushState = createHistoryEvent('pushState');
    window.history.replaceState = createHistoryEvent('replaceState');

    function listener() {
        const stayTime = getStayTime(); // 停留时间
        const currentPage = window.location.href; // 页面路径
        if(beforePage){
            lazyReport('stayTimePage', {
                kind: 'stayView',
                stayTime,
                page: beforePage,
            })
        }
        beforePage = currentPage;
    }

    // 页面load监听
    window.addEventListener('load', function () {
        // beforePage = location.href;
        listener()
    });

    // unload监听
    window.addEventListener('unload', function () {
        listener()
    });

    // history.go()、history.back()、history.forward() 监听
    window.addEventListener('popstate', function () {
        listener()
    });
}


/**
 * hash路由监听
 */
export function hashPageTracker() {
    let beforeTime = Date.now(); // 进入页面的时间
    let beforePage = ''; // 上一个页面

    function getStayTime() {
        let curTime = Date.now();
        let stayTime = curTime - beforeTime;
        beforeTime = curTime;
        return stayTime;
    }

    function listener() {
        const stayTime = getStayTime();
        const currentPage = window.location.href;
        if(beforePage){
            lazyReport('stayTimePage', {
                kind: 'stayView',
                stayTime,
                page: beforePage,
            })
        }
        beforePage = currentPage;
    }

    // hash路由监听
    window.addEventListener('hashchange', function () {
        listener()
    });

    // 页面load监听
    window.addEventListener('load', function () {
        listener()
    });

    const createHistoryEvent = function (name) {
        const origin = window.history[name];
        return function(event) {
            let res = origin.apply(this, arguments);
            let e = new Event(name);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return res;
        };
    };

    window.history.pushState = createHistoryEvent('pushState');

    // history.pushState
    window.addEventListener('pushState', function () {
        listener()
    });
}


/**
 * pv 和 系统总访问时间上报
 */
export function pv() {
    const connection = navigator.connection;
    lazyReport('pv', {
        kind: "stayView",
        effectiveType: connection.effectiveType, //网络环境
        rtt: connection.rtt, //往返时间
        screen: `${window.screen.width}x${window.screen.height}`, //设备分辨率
    })
    let startTime = Date.now();
    window.addEventListener(
        "unload",
        () => {
            let stayTime = Date.now() - startTime;
            // 系统总停留时间
            lazyReport('stayTimeSystem', {
                kind: "stayView",
                stayTime,
            })
        },
        false
    );
}
```


### 长任务监控 (卡顿)
#### 功能概述
- **长任务监控**：通过 `PerformanceObserver` 监控页面中的长任务（longtask），当检测到持续时间超过 100 毫秒的长任务时，触发上报机制。
- **延迟上报**：利用 `requestIdleCallback` 将上报任务放在浏览器空闲时间执行，避免影响主线程的性能。

#### 技术实现
```js

import {lazyReport} from "../utils/report";
import formatTime from "../utils/formatTime";
import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";

/**
 * 长任务监控 (卡顿)
 */
export function longTask() {
    new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.duration > 100) {
                let lastEvent = getLastEvent();
                requestIdleCallback(() => {
                    lazyReport('longTask', {
                        kind: 'experience', // 用户体验指标
                        eventType: lastEvent ? lastEvent.type : '', // 最后一个操作事件类型
                        startTime: formatTime(entry.startTime), // 开始时间
                        duration: formatTime(entry.duration), // 持续时间
                        selector: lastEvent
                            ? getSelector(lastEvent.path || lastEvent.target)
                            : "",
                    });
                });
            }
        });
    }).observe({ entryTypes: ["longtask"] });
}

```


### 加载时间和性能指标监控
#### 功能概述
- **首次绘制（First Paint, FP）和首次内容绘制（First Contentful Paint, FCP）监控**：
通过 `PerformanceObserver` 监控页面的首次绘制和首次内容绘制时间，并在页面加载完成后将这些指标上报，以衡量页面的初始渲染性能。
- **最大内容绘制（Largest Contentful Paint, LCP）监控**：
通过 `PerformanceObserver` 监控页面中的最大内容元素的加载时间（如大图片或视频），并上报该指标，以反映页面中主要内容的加载速度。
- **首次输入延迟（First Input Delay, FID）监控**：通过 `PerformanceObserver` 监控用户在页面上的首次交互（如点击或输入）的响应延迟，
记录从用户操作到浏览器开始处理之间的延迟时间，以及处理操作的耗时。交互性问题反馈。
- **首次有意义的绘制（First Meaningful Paint, FMP）监控**：监控页面中有意义的元素的绘制时间，确保页面的关键内容尽快呈现给用户。
- **加载时间指标上报**：在页面完全加载后，通过 `window.performance.timing` 获取页面各阶段的加载时间，包括TCP连接时间、首字节到达时间（TTFB）、
响应时间、DOM解析时间、`DOMContentLoaded` 事件时间、首次可交互时间（TTI）和完整加载时间等。
- **延迟上报**：使用 onload 函数确保页面内容完全加载后，再延迟3秒上报各类性能数据，以避免在页面初始加载过程中增加不必要的性能开销。

#### 技术实现
```js

import {lazyReport} from "../utils/report";
import onload from "../utils/onload";
import formatTime from "../utils/formatTime";
import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";


/**
 * 加载时间和性能指标监控
 */
export function timing() {
    let FMP, LCP;
    // 增加一个性能条目的观察者
    new PerformanceObserver((entryList, observer) => {
        const perfEntries = entryList.getEntries();
        FMP = perfEntries[0];
        observer.disconnect(); // 不再观察了
    }).observe({ entryTypes: ["element"] }); // 观察页面中有意义的元素
    // 增加一个性能条目的观察者
    new PerformanceObserver((entryList, observer) => {
        const perfEntries = entryList.getEntries();
        const lastEntry = perfEntries[perfEntries.length - 1];
        LCP = lastEntry;
        observer.disconnect(); // 不再观察了
    }).observe({ entryTypes: ["largest-contentful-paint"] }); // 观察页面中最大的元素
    // 增加一个性能条目的观察者
    new PerformanceObserver((entryList, observer) => {
        const lastEvent = getLastEvent();
        const firstInput = entryList.getEntries()[0];
        if (firstInput) {
            // 开始处理的时间 - 开始点击的时间，差值就是处理的延迟
            let inputDelay = firstInput.processingStart - firstInput.startTime;
            let duration = firstInput.duration; // 处理的耗时
            if (inputDelay > 0 || duration > 0) {
                // 首次输入延迟
                lazyReport('firstInputDelay', {
                    kind: "experience", // 用户体验指标
                    inputDelay: inputDelay ? formatTime(inputDelay) : 0, // 延迟的时间
                    duration: duration ? formatTime(duration) : 0, // 处理的耗时
                    startTime: firstInput.startTime, // 开始处理的时间
                    selector: lastEvent
                        ? getSelector(lastEvent.path || lastEvent.target)
                        : "",
                });
            }
        }
        observer.disconnect(); // 不再观察了
    }).observe({ type: "first-input", buffered: true }); // 第一次交互

    // 刚开始页面内容为空，等页面渲染完成，再去做判断
    onload(function () {
        setTimeout(() => {
            const {
                fetchStart,
                connectStart,
                connectEnd,
                requestStart,
                responseStart,
                responseEnd,
                domLoading,
                domInteractive,
                domContentLoadedEventStart,
                domContentLoadedEventEnd,
                loadEventStart,
            } = window.performance.timing;
            // 发送时间指标  统计每个阶段的时间
            lazyReport('timing', {
                kind: "experience", // 用户体验指标
                connectTime: connectEnd - connectStart, // TCP连接耗时
                ttfbTime: responseStart - requestStart, // 首字节到达时间
                responseTime: responseEnd - responseStart, // response响应耗时
                parseDOMTime: loadEventStart - domLoading, // DOM解析渲染的时间
                domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart, // DOMContentLoaded事件回调耗时
                timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
                loadTime: loadEventStart - fetchStart, // 完整的加载时间
            });
            // 发送性能指标
            let FP = performance.getEntriesByName("first-paint")[0];
            let FCP = performance.getEntriesByName("first-contentful-paint")[0];
            lazyReport('paint', {
                kind: "experience", // 用户体验指标
                firstPaint: FP ? formatTime(FP.startTime) : 0,  // 首次绘制时间
                firstContentPaint: FCP ? formatTime(FCP.startTime) : 0, // 首次内容绘制时间
                firstMeaningfulPaint: FMP ? formatTime(FMP.startTime) : 0, // 首次有意义绘制时间
                largestContentfulPaint: LCP
                    ? formatTime(LCP.renderTime || LCP.loadTime)
                    : 0, // 最大内容绘制时间
            });
        }, 3000);
    });
}

```


### 埋点上报
#### 功能概述
- **手动埋点上报**：通过 actionTracker 函数，接收 actionType（行为类型）和 data（相关数据）两个参数，手动触发行为埋点上报。
- **自动埋点上报**：主要用于自动捕获用户在页面上的点击操作。监听 document.body 的 click 事件，每当用户点击页面中的某个元素时，自动触发埋点上报。
  如果点击的元素包含 data-target 属性，则上报该属性值作为埋点数据，表明这是一个有明确目标的埋点。
  如果元素未设置 data-target 属性，自动获取被点击元素的 DOM 路径，并上报作为埋点数据，记录用户点击了哪个页面元素。

#### 技术实现
```js


import { lazyReport } from '../utils/report';
import { getPathTo } from '../utils/util';
import getLastEvent from '../utils/getLastEvent'
import getSelector from "../utils/getSelector";

/**
 * 手动埋点上报
 * type 行为埋点
 */
export function actionTracker(actionType, data) {
    lazyReport('action', {
        kind: 'tracker',
        actionType,
        data
    });
}


/**
 * 自动埋点上报
 * type 行为埋点
 */
export function autoTracker() {
    // 自动上报
    document.body.addEventListener('click', function (e) {
        const clickedDom = e.target;
        let lastEvent = getLastEvent(); // 捕获最后一个交互事件（最新标准pointerEvent无法获取path)

        // 获取标签上的data-target属性的值
        let target = clickedDom?.getAttribute('data-target');

        // 获取标签上的data-no属性的值
        let no = clickedDom?.getAttribute('data-no');
        // 避免重复上报
        if (no) {
            return;
        }

        // 全局埋点
        if (target) {
            lazyReport('action', {
                kind: 'tracker',
                actionType: 'click',
                selector: lastEvent ? getSelector(lastEvent.path) : "",// 代表最后一个操作的元素
                data: target, // 手动添加data-target属性获取属性值
            });
        } else {
            // 全局埋点 获取被点击元素的dom路径
            const path = getPathTo(clickedDom);
            lazyReport('action', {
                kind: 'tracker',
                actionType: 'click',
                selector: lastEvent ? getSelector(lastEvent.path) : "",// 代表最后一个操作的元素
                data: path
            });
        }
    }, false);
}

```


### 数据上报
#### 功能概述
- xhr请求接口上报（如服务器不同需跨域，刷新重新打开可能丢失数据）
- img标签上报（避免了跨域问题，但不适合大量数据上报，url长度限制）
- sendBeacon（无需跨域，不会刷新丢失数据，有兼容问题）
- sendBeacon上报和img标签上报结合的方式；
注：以上四种上报方式配置可选，推荐最后一种方式。

#### 技术实现
```js

import { getCache, addCache, clearCache } from './cache';
let timer = null;


/**
 * 上报数据处理
 * @param {*} type 上報類型
 * @param {*} params 上報信息
 */
export function lazyReport(type = '', params = {}) {
    const appId = window['_monitor_app_id_'];
    const userId = window['_monitor_user_id_'];
    const delay = window['_monitor_delay_'];

    /**
     * 公共上报参数
     * @return {{appId, userAgent: string, type: *, title: string, userId, url: string, timestamp: number}}
     */
    function getExtraData() {
        return {
            appId, // 项目的appId
            userId, // 用户id
            type, // error/action/visit/user
            title: document.title, // 当前页title
            url: location.href, // 当前页url
            timestamp: Date.now(), // 时间戳
            userAgent: navigator.userAgent, // 浏览器信息
        }
    }

    let extraData = getExtraData();
    const logParams = {
        ...extraData, // 公共信息
        ...params, // 上报的数据
    };
    for (let key in logParams){
        if(typeof logParams[key] === 'number'){
            logParams[key] = `${logParams[key]}`;
        }
    }

    addCache(logParams);

    const data = getCache();

    if (delay === 0) { // delay=0相当于不做延迟上报
        report(data);
        return;
    }

    if (data.length > 10) {
        report(data);
        clearTimeout(timer);
        return;
    }

    // 防抖延迟上报
    clearTimeout(timer);
    timer = setTimeout(() => {
        report(data)
    }, delay);
}


/**
 * 上报数据
 * @param data
 */
export function report(data) {
    const url = window['_monitor_report_url_'];
    const urlImg = window['_monitor_report_url_img_'];
    const reportType = window['_monitor_report_type_'];

    if(reportType === 'img'){

        // ------- img方式上报 -------
        let oImage = new Image();
        oImage.src = `${urlImg || url}?logs=${JSON.stringify(data)}`;

    }else if(reportType === 'sendBeacon'){

        // ------- navigator.sendBeacon上报 -------
        navigator.sendBeacon(url, JSON.stringify({logs:data}));

    }else if(reportType === 'imgSendBeacon'){

        // ------- 默认：navigator/img方式上报 -------
        if (navigator.sendBeacon) { // 支持sendBeacon的浏览器
            navigator.sendBeacon(url, JSON.stringify({logs:data}));
        } else { // 不支持sendBeacon的浏览器
            let oImage = new Image();
            oImage.src = `${urlImg || url}?logs=${JSON.stringify(data)}`;
        }

    }else if(reportType === 'fetch' || !reportType){

        // ------- fetch方式上报 -------
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({logs:data}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        })

    }

        clearCache();
}

```

### 工具类
#### 加载配置 和 获取元素的dom路径
```js
import { autoTracker } from '../lib/actionTracker';
import { hashPageTracker, historyPageTracker, pv } from '../lib/pageTracker';
import { injectJsError } from '../lib/jsError';
import { injectXHR } from  '../lib/xhr';
import { injectFetch } from "../lib/fetch";
import { blankScreen } from "../lib/blankScreen";
import { timing } from "../lib/timing";
import { longTask } from "../lib/longTask";

/**
 * 加载配置
 * @param {*} options
 */
export function loadConfig(options) {
    const {
        appId,  // 系统id
        userId, // 用户id
        reportUrl, // 服务端上报地址
        reportUrlImg, // 如何采用了两种方式合并，需多串一个img上传地址，推荐1*1px git图片
        reportType, // 上报方式 fetch(默认)，img，sendBeacon, imgSendBeacon(两种方式合并）
        xhrType, // xhr监控类型 all,load,abort,error ; 默认只监控 error
        routerType, // 路由类型 hash 或 history  默认hash
        delay, // 延迟和合并上报的功能
        autoTrackerReport, // 自动埋点是否开启
        stabilityReport, // 是否开启稳定性监控（js,promise,资源加载，接口，白屏）
        isHideResourceError, // 是否关闭资源错误上报 默认 false
        pageTrackerReport, // 是否开启用户停留及pv上报
        timingReport, // 是否开启性能指标监控
        longTaskReport, // 是否开启长任务监控(卡顿)
    } = options;

    // --------- appId ----------------
    if (appId) {
        window['_monitor_app_id_'] = appId;
    }

    // --------- userId ----------------
    if (userId) {
        window['_monitor_user_id_'] = userId;
    }

    // --------- 服务端地址 ----------------
    if (reportUrl) {
        window['_monitor_report_url_'] = reportUrl;
    }

    // --------- 服务端地址 ----------------
    if (reportUrlImg) {
        window['_monitor_report_url_img_'] = reportUrlImg;
    }

    // -------- 合并上报的间隔 ------------
    if (delay) {
        window['_monitor_delay_'] = delay;
    }

    // -------- 上报方式 ------------
    if (reportType) {
        window['_monitor_report_type_'] = reportType;
    }

    // -------- xhr监控类型 ------------
    if (xhrType) {
        window['_monitor_xhr_type_'] = xhrType;
    }

    // --------- 是否开启稳定性监控 ------------
    if (isHideResourceError) { // 是否隐藏资源错误上报
        window['_monitor_is_hide_resource_error_'] = isHideResourceError;
    }
    if (stabilityReport) {
        injectJsError();
        injectXHR();
        injectFetch();
        blankScreen();
    }

    // --------- 是否开启无痕埋点 ----------
    if (autoTrackerReport) {
        autoTracker();
    }

    // --------- 是否开启加载时间和性能指标监控 ----------
    if (timingReport) {
        timing();
    }

    // --------- 是否开启长任务监控(卡顿) ----------
    if (longTaskReport) {
        longTask();
    }


    // ----------- 用户停留时间，uv, pv访问上报 --------------
    if(pageTrackerReport){
        if (routerType === 'history') {
            historyPageTracker(); // history路由上报
        } else {
            hashPageTracker(); // hash路由上报
        }
        pv(); // pv 和 总停留时间
    }

}


/**
 * 获取元素的dom路径
 * @param {*} element
 * @returns *[@id="root"]/DIV[1]/DIV[2]/BUTTON[1]
 */
export function getPathTo(element) {
    if (element.id !== '')
        return '//*[@id="' + element.id + '"]';
    if (element === document.body)
        return element.tagName;

    let ix= 0;
    let siblings = element.parentNode.childNodes;
    for (let i = 0; i < siblings.length; i++) {
        let sibling = siblings[i];
        if (sibling === element)
            return getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
            ix ++;
    }
}
```

#### 延迟上报缓存
```js

/**
 * 延迟上报缓存
 * @type {*[]}
 */
const cache = [];

export function getCache() {
    return cache;
}

export function addCache(data) {
    cache.push(data);
}

export function clearCache() {
    cache.length = 0
}
```

#### 获取时间戳
```js

/**
 * 获取时间戳
 * @param time {string}
 * @returns {number}
 */
export default (time) => {
    const timestamp = new Date(time).getTime();
    return timestamp;
};
```

#### 获取最后一个操作的事件
```js
/**
 * 获取最后一个操作的事件
 */

let lastEvent = null;
['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(eventType => {
    document.addEventListener(eventType, (event) => {
        lastEvent = event || null;
        // html5之前使用mouseEvent.path等获取事件位置，
        // html5之后所有事件使用 PointerEven 替代，取消path
    }, {
        capture: true, // 捕获阶段执行 防止事件丢失
        passive: true, // 默认不阻止默认事件
    })
});

export default function () {
    return lastEvent;
}

```

#### 获取dom路径
```js
/**
 * 获取dom路径
 * @param path
 * @return {*}
 */
function getSelectors(path) {
    // 反转 + 过滤 + 映射 + 拼接
    return path
        .reverse()
        .filter((element) => {
            return element !== document && element !== window;
        })
        .map((element) => {
            let selector = "";
            if (element.id) {
                return `${element.nodeName.toLowerCase()}#${element.id}`;
            } else if (element.className && typeof element.className === "string") {
                return `${element.nodeName.toLowerCase()}.${element.className}`;
            } else {
                selector = element.nodeName.toLowerCase();
            }
            return selector;
        })
        .join(" ");
}

export default function (pathsOrTarget) {
    if (Array.isArray(pathsOrTarget)) {
        return getSelectors(pathsOrTarget);
    } else {
        let path = [];
        while (pathsOrTarget) {
            path.push(pathsOrTarget);
            pathsOrTarget = pathsOrTarget.parentNode;
        }
        return getSelectors(path);
    }
}
```

#### 获取页面加载完成状态
```js
/**
 * onload 文档加载完成后执行一个回调函数 柔则等load事件触发再调用
 * @param callback
 */
export default function (callback) {
  if (document.readyState === "complete") {
    callback();
  } else {
    window.addEventListener("load", callback);
  }
}
```

### 入口文件
```js

import { loadConfig } from './utils/util';
import { actionTracker } from './lib/actionTracker';
import { errorCatcher } from './lib/jsError';
import { report } from './utils/report';
import { getCache } from './utils/cache';


/**
 * 初始化配置
 * @param {*} options
 */
function initMonitor(options) {
    // ------- 加载配置（拿到配置信息，注入监控代码） ----------
    loadConfig(options);

    // ------ 防止卸载时还有剩余的埋点数据没发送 ------
    window.addEventListener('unload', function() {
        const data = getCache();
        if (data.length > 0) {
            report(data);
        }
    });
}


export {
    initMonitor, // 监控初始化
    actionTracker, // 埋点手动上报方法
    errorCatcher, // 手动捕获错误方法 try catch, 其他回调异常等
};

```

### jest单元测试案例
```js
 
import onload from '../src/utils/onload';

describe('onload', () => {
    let originalDocument;

    beforeEach(() => {
        originalDocument = { ...document };
        Object.defineProperty(document, 'readyState', {
            writable: true,
            value: 'loading',
        });
        jest.spyOn(window, 'addEventListener');
    });

    afterEach(() => {
        window.addEventListener.mockRestore();
        document = originalDocument;
    });

    it('should call the callback immediately if document.readyState is "complete"', () => {
        const mockCallback = jest.fn();
        document.readyState = 'complete';

        onload(mockCallback);

        expect(mockCallback).toHaveBeenCalled();
        expect(window.addEventListener).not.toHaveBeenCalled();
    });

    it('should add a "load" event listener if document.readyState is not "complete"', () => {
        const mockCallback = jest.fn();

        onload(mockCallback);

        expect(window.addEventListener).toHaveBeenCalledWith('load', mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
    });
});
```

### 项目配置文件
#### webpack.config.js
```js

const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'ddd-monitor-sdk.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'dddMonitorSdk',
        libraryTarget: 'umd',
        environment: {
            arrowFunction: false
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-arrow-functions', '@babel/plugin-transform-modules-umd'],
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: true
    },
    devtool: 'source-map'

};
```
#### .babelrc
```json

{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3,
      "targets": { "chrome": "58", "ie": "11" }
    }]
  ],
  "plugins": ['@babel/plugin-transform-arrow-functions', '@babel/plugin-transform-modules-umd']
}
```

#### package.json
```json
{
  "name": "ddd-monitor-sdk",
  "version": "1.1.6",
  "description": "监控SDK svg白屏兼容",
  "main": "dist/ddd-monitor-sdk.min.js",
  "keywords": [
    "前端",
    "前端监控",
    "Front-end",
    "monitor",
    "SDK",
    "ddd"
  ],
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "publish": "npm publish",
    "test": "jest",
    "test1": "jest --runInBand --debug"
  },
  "author": "hhd",
  "files": [
    "dist"
  ],
  "license": "ISC",
  "dependencies": {
    "@babel/core": "^7.21.4",
    "babel-loader": "^9.1.2",
    "core-js": "3",
    "user-agent": "^1.0.4",
    "webpack": "^5.79.0",
    "webpack-cli": "^5.0.1"
  },
  "devDependencies": {
    "@babel/plugin-transform-arrow-functions": "^7.22.5",
    "@babel/plugin-transform-modules-umd": "^7.22.5",
    "@babel/preset-env": "^7.22.9",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0"
  }
}
```

#### jest.config.js
```js

module.exports = {
    roots: ['./test'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // Jest 默认使用的是 Node.js 环境，该环境中没有 document 对象。
    //  Jest 的配置文件中指定使用 jsdom 环境，jsdom 是一个模拟浏览器环境的库，可以在 Node.js 中使用
    testEnvironment: 'jsdom',
};
```
