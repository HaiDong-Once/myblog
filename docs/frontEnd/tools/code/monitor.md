


# 个人前端监控SDK使用说明

## 简介
这款前端监控SDK提供了一系列功能来帮助开发者监控前端应用的稳定性、性能和用户行为，并及时发现和解决问题。SDK支持js报错监控、资源加载错误监控、
接口请求异常监控、白屏监控、性能指标测量、业务分析依据、用户埋点统计和数据上报等功能。开发者可以根据自己的需求使用这些功能，以便及时捕获并解决问题。
该文档提供了尽可能详细的安装和配置说明，以及API参考，方便开发者使用和扩展。


## 测试说明
该SDK目前已经完成单元测试和集成测试，覆盖率以及兼容性待进一步完成测试，如各位开发者在使用中遇到问题或建议随时受教；

## npm仓库地址
- [https://www.npmjs.com/package/ddd-monitor-sdk?activeTab=readme](https://www.npmjs.com/package/ddd-monitor-sdk?activeTab=readme)


## 安装和初始化说明
### 安装
```shell
npm install ddd-monitor-sdk --save
```

### 监控数据初始化
```js
// 已vue为例： main.js文件中注入配置
import { initMonitor } from 'ddd-monitor-sdk';

initMonitor({
    appId: 'vue-credit', // 系统id （区分不同的项目）
    userId: '000000001', // 用户id
    reportType: '', // 上报方式 fetch(默认)，img，sendBeacon, imgSendBeacon(两种方式合并）
    reportUrl: 'http://......front_error_log', // 服务端上报地址(必填）
    reportUrlImg: '', // // 如何采用了两种方式合并，需多串一个img上传地址，推荐1*1px git图片
    delay: 0, // 延迟和合并上报的功能
    routerType: 'hash', // 路由类型 hash 或 history  默认hash
    stabilityReport: false, // 是否开启稳定性监控（js,promise,资源加载，xhr（默认监控异常），fetch(只监控异常）, 白屏）
    xhrType: 'error', // xhr监控类型 all,load,abort,error ; 默认只监控 error
    autoTrackerReport: false, // 自动埋点是否开启
    pageTrackerReport: false, // 是否开启用户停留及pv上报
    timingReport: false, // 是否开启性能指标监控
    longTaskReport: false, // 是否开启长任务监控(卡顿)
});
```

### 初始化配置说明

| 配置项             | 说明                                       | 可选值                                  | 数据类型 | 默认值  | 是否必填 |
|------------------|------------------------------------------|---------------------------------------|-------|-------|-------|
| appId           | 系统id，用于区分不同的项目                           | 无                                      | 字符串    | 无     |  否      |
| userId          | 用户id                                     | 无                                      | 字符串    | 无     |  否      |
| reportType      | 上报方式                                     | fetch, img, sendBeacon, imgSendBeacon | 字符串 | fetch | 否      |
| reportUrl       | 服务端上报地址                           | 无                                      | 字符串 | 无     | 是      |
| reportUrlImg    | imgSendBeacon上报方式时需要单独配置图片地址，推荐1X1像素git图片            | 无                                      | 字符串 | 无     | 否      |
| delay           | 延迟上报时间（单位毫秒）                             | 无                                      | 数字   | 0     | 否      |
| routerType      | 路由类型                                     | hash, history                          | 字符串 | hash  | 否      |
| stabilityReport | 是否开启稳定性监控       | true, false                            | 布尔型 | false | 否      |
| xhrType         | xhr监控类型 | all, load, abort, error               | 字符串 | error | 否      |
| autoTrackerReport | 是否开启自动埋点       | true, false                            | 布尔型 | false | 否      |
| pageTrackerReport | 是否开启用户停留及PV上报   | true, false                            | 布尔型 | false | 否      |
| timingReport    | 是否开启性能指标监控      | true, false                            | 布尔型 | false | 否      |
| longTaskReport  | 是否开启长任务监控(卡顿)    | true, false                            | 布尔型 | false | 否      |

注：reportType 推荐最优上报方式为：imgSendBeacon, 及 img 上报和 sendBeacon 兼容的方式， 如果浏览器支持 sendBeacon 则使用 sendBeacon 上报，
如果浏览器不支持，降级使用 img 上报，采用 imgSendBeacon 上报，在配置 reportUrl 为 sendBeacon 的上报地址后吗，还需要为 img 上报单独配置 reportUrlImg 图片地址；
也需要后端对此上报方式做对应的处理；


## 手动上报
### 手动捕获异常上报
```ts
import { errorCatcher } from 'ddd-monitor-sdk';

// errorCatcher(errorTitle, message)
errorCatcher('高德地图加载异常捕获', '地图加载量单日超限')
```

### 埋点手动上报
```ts
import { actionTracker } from 'ddd-monitor-sdk';

// actionTracker(actionType, data)
actionTracker('click', '首页按钮点击')
```


## 上报数据类型说明
### 公共数据
```js
{
  appId, // 项目的appId
  userId, // 用户id
  type, // 上报类型：error/action/visit/user
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
    errorType: 'catchError'
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
    duration, // 持续时间
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
    duration, // 耗时
    response: '', // 响应体
    method, // 请求方式
    params: '', // 入参
}
```