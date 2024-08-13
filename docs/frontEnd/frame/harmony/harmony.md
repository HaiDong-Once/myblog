

# 水滴鸿蒙改造web组件方案
[[toc]]


## 背景
9月以后华为将发布纯鸿蒙系统，届时新发售华为新机都将搭载原生鸿蒙next系统，旧版手机接收到鸿蒙next 升级推送，主动升级后将不可回退原来兼容安卓的版本。水滴信用面临鸿蒙化改造问题，华为也提供了设备样机，技术人员支持，以及发布奖励。

## 方案调研
**经过最新的技术方案调研，并结合我司实际情况安装优先级拟定以下升级方案：**
- web组件+H5方案，与现有ios安卓方案同步，需要解决鸿蒙端web组件相关问题以及uniapp plus方法的鸿蒙化改造：
  成本最低，上线最快，稳定性高，风险较低，扩展性较差
- 升级uniapp致vue3, 只升级主要功能后续功能逐步迁移, 同时可实现小程序,app,H5多端功能同步：
  效益最高、升级成本较高、因为需要依赖uniapp三方兼容鸿蒙的进度，稳定性差、风险较高，成功率较低
- 开发原生鸿蒙应用：只开发重要功能，后续功能根据重要性逐步迁移：
  成本最高，需要技术人员学习鸿蒙原生开发，但性能最高，稳定性最好，风险低

## 方案确认
最终确定web组件+H5方案

## 方案实施步骤
- 梳理解决方案并测试验证,文档备份未方便后续遇到问题直接使用：
- 阅读官方文档、华为社区等
- 初步引入H5项目以后开始步测试web组件容器
- 运行H5后测试主要功能，将测试问题整理一份list，按照重要性优先级排列
- 根据优先级逐一解决list中的问题
- 主要功能通过自测验证
- 提交华为官方测试验证
- 验证通过后正式发布

## 鸿蒙接入水滴H5问题整理
- tab栏不显示、跳详情页面不对等APP环境判断问题：在ios,安卓基础上新增鸿蒙逻辑判断
- 登录后关掉APP登录状态不能存活：需要兼容鸿蒙的loclstore或者cookie
- 不能适应鸿蒙手势返回：在H5中适配鸿蒙的路由栈
- 有的页面顶部head栏不能点击返回：需要在鸿蒙中适配
- 导出功能异常：前期隐藏，后期通过鸿蒙api实现，使用邮箱发送
- 首页到顶部有留白：需要填充的页面最顶部填充自适应，不适合所有页面
- 底部留白：增加margin-bottom或者填充颜色留出华为tabbar交互按钮位置: 适配正常
- 不能支付：前期隐藏，后期根据支付宝微信最新文档接入支付能力：目前可测支付宝
- uniapp中的plus方法鸿蒙不支持：已解决——已实现plus方法重写
- webview高度适配和状态栏空白问题
- 已重写plus方法真是数据接入：状态栏高度，设备信息
- pdf预览，外部链接打开异常：鸿蒙中重写webviewopen方法
- 全局微信支付：隐藏 vippop, vipbox,vipPopup,vip/index,
- 企业详情tab栏微信分享：隐藏
- 不能复制文本：鸿蒙端重写复制文本方法
- 鸿蒙app打包发布流程和配置梳理
- 鸿蒙项目gitlab创建和上传
- H5部分代码发布线上测试打包好的app
- 打开登录页鸿蒙滑动返回失效：无路由栈，弹窗页面，需要兼容onback
- 关闭优质企业推荐
- tabbar高度偶尔异常: **未复现**

## 第一次官方测试结果：（通过，允许公开测试）
- 鸿蒙隐私协议修改
- 鸿蒙app安装包名icon等配置
- 禁止登录相关页面截屏录屏

## 第二次官方测试结果：（通过，允许正式上架）
- 隐私政策复用其他系统，未描述当前系统（HarmonyOS）相关信息（如收集信息、申请权限信息）

## 自测问题
- 重写onback方法
- navbar显示问题修复

## 鸿蒙webview 代码接入示例
### 创建webview组件
```ts
// G:\SecWorks\shuidi-harmonyos\entry\src\main\ets\pages\Index.ets

import web_webview from '@ohos.web.webview';
import { plusObj } from './plus' // 重写plus方法集合到这个类中
import { BusinessError } from '@kit.BasicServicesKit';
import { promptAction } from '@kit.ArkUI';

@Entry
@Component
struct WebComponent {
  webviewController: web_webview.WebviewController = new web_webview.WebviewController();
  plusObj = new plusObj(this.webviewController); // 鸿蒙端重写plus方法
  @State private isPageEnd: boolean = false; // web组件是否加载完成  注：@State声明才能引起组件重绘（类似响应式）
  @State private isErrorReceive: boolean = false; // web组件是否加载异常
  private timeoutId: number | null = null; // 加载失败提示定时任务
  webUrlTest = 'test/index.html#/'; // 测试环境地址
  webUrlProduct = 'product/index.html#/';  // 线上环境地址

  build() {
    Column() {
      // 启动图和加载失败提示逻辑
      if (!this.isPageEnd) {
        Column() {
          Image($r('app.media.startPage'))
                  .height('80%')
        }
      .width('100%')
                .height('100%')
                .backgroundColor('#dbe7ff') // 设置外框背景色
                .alignItems(HorizontalAlign.End) // 图片居中对齐
                .justifyContent(FlexAlign.Center) // 图片垂直居中对齐
                .onAppear(()=>{
                  // 加载失败提示
                  this.timeoutId = setTimeout(() => {
                    if(!this.isPageEnd){
                      promptAction.showToast({ message: '加载异常，请检查网络' });
                    }
                  }, 3000);
                })
      }


      Web({ src: this.webUrlProduct, controller: this.webviewController})
              .domStorageAccess(true) // vue或react代码必须打开允许存储开关，否则白屏
              .javaScriptAccess(true)
              // 鸿蒙端将方法挂载到H5端window对象
              .javaScriptProxy({
                object: this.plusObj,
                name: "harmonyPlus", // window下对象命名，结构window.harmonyPlus.isImmersedStatusbar()
                methodList: [ // 同步方法
                  "isImmersedStatusbar",
                  "setStatusBarStyle",
                  "getStatusbarHeight",
                  "scale",
                  "navigator",
                  "toAlipay",
                  "osName",
                  "getItem",
                  "lockOrientation",
                  "webviewOpen",
                  "harmonyCopyText",
                  "backward",
                  "showToast",
                  "quit",
                  "setWindowPrivacyMode"
                ],
                asyncMethodList: [""], // 异步方法
                controller: this.webviewController,
              })
              // 网络异常或加载异常回调
              .onErrorReceive((event) => {
                this.isErrorReceive = true
              })
              // 网页加载完成回调（成功和失败都会触发）
              .onPageEnd((event)=>{
                if(!this.isErrorReceive){
                  this.isPageEnd = true
                  if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                    this.timeoutId = null;
                  }
                }
              })
    }
  }


  /**
   * 左滑返回回调
   * @returns
   */
  onBackPress() {
    // 触发H5内内自定义返回事件  h5端挂载window.harmonyBack
    try {
      this.webviewController.runJavaScript(
              'harmonyBack()',
              (error, result) => {
                if (error) {
                  return;
                }
                if (result) {
                  return
                }
              });
    } catch (error) {
      console.error(`Message: ${(error as BusinessError).message}`);
    }

    // 关闭默认返回
    return true
  }
}
```

### 设置全屏展示获取窗口对象
```ts
// G:\SecWorks\shuidi-harmonyos\entry\src\main\ets\entryability\EntryAbility.ets
import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
  }

  onDestroy(): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    // Main window is created, set main page for this ability
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');

    // 获取窗口对象
    let win = windowStage.getMainWindowSync();
    AppStorage.setOrCreate("mainWin",win); // 保存获取到的窗口对象

    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }

      // 设置成全屏
      windowStage.getMainWindow((err, windowClass) => {
        windowClass.setWindowLayoutFullScreen(true)
        // 只隐藏状态栏，保留导航条
        windowClass.setWindowSystemBarEnable(['status','navigation'])
      })

      hilog.info(0x0000, 'testTag', 'Succeeded in loading the content.');
    });
  }

  onWindowStageDestroy(): void {
    // Main window is destroyed, release UI related resources
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    // Ability has brought to foreground
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
  }

  onBackground(): void {
    // Ability has back to background
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
  }
}
    
```

### 打开一个新的web组件
- 备注：用于pdf预览，打开外部H5网址
#### 创建webviewOpen方法：
```ts
import { router } from '@kit.ArkUI';

/**
 * 打开新页面渲染webview
 * @param url
 */
webviewOpen(url: string){
  console.log('webviewOpen', url)
  class DataModel {
    url: string = '';
  }
  let paramsInfo: DataModel = {
    url: url,
  };
  router.pushUrl({
    url: 'pages/webview', // 目标url
    params: paramsInfo // 添加params属性，传递自定义参数
  }, router.RouterMode.Standard, (err) => {
    if (err) {
      console.error(`Invoke pushUrl failed, message is ${err.message}`);
      return;
    }
    console.info('Invoke pushUrl succeeded.');
  });
}
```

#### 创建一个新web组件：
```ts
import web_webview from '@ohos.web.webview';
import { router } from '@kit.ArkUI';

class RouTmp {
  url: string = ''
}

@Entry
@Component
struct WebComponent {
  webviewController: web_webview.WebviewController = new web_webview.WebviewController();
  params: RouTmp = router.getParams() as RouTmp
  webUrlProduct = this.params.url;

  build() {
    Column() {
      Web({ src: this.webUrlProduct, controller: this.webviewController})
        .domStorageAccess(true)
        .margin({top: 42})
    }
  }

  // 左滑返回
  onBackPress() {
    if (this.webviewController.accessStep(-1)) {
      this.webviewController.backward();
      return true
    } else {
      return false
    }
  }
}
```

#### 路由配置：
```ts
// G:\SecWorks\shuidi-harmonyos\entry\src\main\resources\base\profile\main_pages.json
{
  "src": [
    "pages/Index",
    "pages/webview"
  ]
}
```

### 支付宝支付
#### 安装依赖
```shell
ohpm install @cashier_alipay/cashiersdk
```

#### 鸿蒙端定义触发支付的方法：与H5中构造一致
```ts
// plus.ets

import { Pay } from '@cashier_alipay/cashiersdk';
import { BusinessError } from '@kit.BasicServicesKit';

/***************** payment ********************/
/**
 * 支付宝支付
 * @param orderInfo
 */
toAlipay(alipayChannel: string, orderInfo: string, success: Function, cancel: Function){
    new Pay().pay(orderInfo, true).then((result) => {
      console.log('支付宝支付回调')
      let message = `resultStatus: ${result.get('resultStatus')}
       memo: ${result.get('memo')} result:${result.get('result')}`;
      console.log(message)
      if(result.get('resultStatus') === '9000'){
        console.log('支付成功', result)
        success()
      }else{
        cancel()
        console.log(result.get('memo'));
      }
    }).catch((error: BusinessError) => {
        cancel()
        console.log(error.message);
    });
}
```

### plus内方法鸿蒙化改造
```ts
// G:\SecWorks\shuidi-harmonyos\entry\src\main\ets\pages\plus.ets

import { Pay } from '@cashier_alipay/cashiersdk'; // 支付宝鸿蒙SDK
import { BusinessError } from '@kit.BasicServicesKit';
import { common, UIAbility } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { display } from '@kit.ArkUI';
import { router } from '@kit.ArkUI';
import { pasteboard } from '@kit.BasicServicesKit';
import { promptAction } from '@kit.ArkUI';
import web_webview from '@ohos.web.webview';


export class plusObj {
 // 入口web组件实例
  webviewController: web_webview.WebviewController;
  constructor(webviewController: web_webview.WebviewController) {
    this.webviewController = webviewController;
  }


  /***************** navigator *********************/
  /**
   * 是否沉侵式状态栏
   * @returns
   * 默认打开
   */
  isImmersedStatusbar(): boolean {
   return true
  }

  /**
   * 设置状态栏颜色
   * @returns
   * 占时不需要
   */
  setStatusBarStyle(): boolean {
    return true
  }

  /**
   * 获取状态栏高度（异步）
   * @returns
   * 真实高度，不需要乘以分辨倍率
   */
  async getStatusbarHeight(): Promise<number> {
    try {
      let type1 = window.AvoidAreaType.TYPE_SYSTEM;
      const data = await window.getLastWindow(getContext(this));
      // 获取系统默认区域，一般包括状态栏、导航栏
      let avoidArea1 = data.getWindowAvoidArea(type1);

      // 顶部状态栏高度 | 底部导航栏高度
      let statusBarHeight = avoidArea1.topRect.height;
      let bottomNavHeight = avoidArea1.bottomRect.height;
      console.info(`statusBarHeight is ${statusBarHeight}`);
      console.info(`bottomNavHeight is ${bottomNavHeight}`);

      return statusBarHeight;
    } catch (err) {
      console.error(`Failed to obtain the window. Cause: ${JSON.stringify(err)}`);
      return err;
    }
  }

  /**
   * 复制文本
   * @param text
   * @param msg
   */
  harmonyCopyText(text: string, msg: string) {
    const pasteboardData = pasteboard.createData(pasteboard.MIMETYPE_TEXT_PLAIN, text);
    const systemPasteboard = pasteboard.getSystemPasteboard();
    systemPasteboard.setData(pasteboardData); // 将数据放入剪切板
    systemPasteboard.getData().then((data) => {
      if (data) {
        promptAction.showToast({ message: msg || '复制成功' });
      } else {
        promptAction.showToast({ message: '复制失败' });
      }
    })
  }

  /**
   * 禁止用户截屏录屏
   * @returns
   */
  setWindowPrivacyMode(isPrivacyMode: boolean = true){
    let  mainWin = AppStorage.get("mainWin") as window.Window;
    mainWin.setWindowPrivacyMode(isPrivacyMode);
  }


  /***************** screen *********************/
  /**
   * 屏幕分辨率倍数
   * @returns
   */
  scale(): number {
    let displayClass: display.Display | null = null;
    displayClass = display.getDefaultDisplaySync();
    console.log('像素密度倍数', displayClass.densityPixels)
    return displayClass.densityPixels
  }

  /**
   * 锁定屏幕方向
   * @param orientation
   * @returns
   */
  lockOrientation(orientation:string): string{
    return ''
  }


  /***************** os *********************/
  /**
   * 设备名称
   * @returns
   */
  osName(): string {
    let displayClass: display.Display | null = null;
    displayClass = display.getDefaultDisplaySync();
    return displayClass.name
  }


  /***************** payment ********************/
  /**
   * 支付宝支付
   * @param orderInfo
   */
  toAlipay(alipayChannel: string, orderInfo: string, success: Function, cancel: Function){
      new Pay().pay(orderInfo, true).then((result) => {
        console.log('支付宝支付回调')
        let message = `resultStatus: ${result.get('resultStatus')}
         memo: ${result.get('memo')} result:${result.get('result')}`;
        console.log(message)
        if(result.get('resultStatus') === '9000'){
          console.log('支付成功', result)
          success()
        }else{
          cancel()
          console.log(result.get('memo'));
        }
      }).catch((error: BusinessError) => {
          cancel()
          console.log(error.message);
      });
  }



  /***************** storage ********************/
  /**
   * 获取缓存信息
   * @param id
   * @returns
   */
  getItem( id:string ): string {
    return ''
  }


  /***************** webview ********************/
  /**
   * 打开新页面渲染webview
   * @param url
   */
  webviewOpen(url: string){
    console.log('webviewOpen', url)
    class DataModel {
      url: string = '';
    }
    let paramsInfo: DataModel = {
      url: url,
    };
    router.pushUrl({
      url: 'pages/webview', // 目标url
      params: paramsInfo // 添加params属性，传递自定义参数
    }, router.RouterMode.Standard, (err) => {
      if (err) {
        console.error(`Invoke pushUrl failed, message is ${err.message}`);
        return;
      }
      console.info('Invoke pushUrl succeeded.');
    });
  }


  /***************** currentWebview ********************/
  /**
   * webview返回上一页
   */
  backward(){
    this.webviewController.backward()
  }


  /***************** nativeUI ********************/
  /**
   * 展示toast
   * @param message
   */
  showToast(message:string){
    promptAction.showToast({ message: message });
  }


  /***************** runtime ********************/
  /**
   * 关闭应用
   */
  quit() {
    const context = getContext(this) as common.UIAbilityContext
    try {
      context.terminateSelf()
        .then(() => {
          // 执行正常业务
          console.info('terminateSelf succeed');
        })
        .catch((err: BusinessError) => {
          // 处理业务逻辑错误
          console.error(`terminateSelf message is ${err.message}`);
        });
    } catch (err) {
      // 捕获同步的参数错误
      let code = (err as BusinessError).code;
      let message = (err as BusinessError).message;
      console.error(`terminateSelf message is ${message}`);
    }
  }
}
```

### 鸿蒙端配置文件解析
```json
// G:\SecWorks\shuidi-harmonyos\entry\src\main\module.json5

{
  "module": {
    "name": "entry",
    "type": "entry",
    "description": "$string:module_desc",
    "mainElement": "EntryAbility",
    "deviceTypes": [
      "phone",
      "tablet",
      "2in1"
    ],
    "deliveryWithInstall": true,
    "installationFree": false,
    "pages": "$profile:main_pages",
    "abilities": [
      {
        "name": "EntryAbility",
        "srcEntry": "./ets/entryability/EntryAbility.ets",
        "description": "$string:EntryAbility_desc", // app应用包描述
        "icon": "$media:layered_image",  // app应用包logo
        "label": "$string:EntryAbility_label",   // app应用包标题
        "startWindowIcon": "$media:startIcon",  // app应用包启动LOGO
        "startWindowBackground": "$color:start_window_background", // app应用包启动背景图
        "exported": true,
        "skills": [
          {
            "entities": [
              "entity.system.home"
            ],
            "actions": [
              "action.system.home"
            ]
          }
        ]
      }
    ],
    "extensionAbilities": [
      {
        "name": "EntryBackupAbility",
        "srcEntry": "./ets/entrybackupability/EntryBackupAbility.ets",
        "type": "backup",
        "exported": false,
        "metadata": [
          {
            "name": "ohos.extension.backup",
            "resource": "$profile:backup_config"
          }
        ],
      }
    ],

    // 鸿蒙应用权限配置
    "requestPermissions": [
      {
        "name" : "ohos.permission.INTERNET", // 互联网访问权限，不配置web组件白屏
      },
      {
        "name" : "ohos.permission.PRIVACY_WINDOW"  // 禁止用户录屏截屏需要配置这个权限 
      },
    ],
  }
}
```

### 资源配置文件
```json
// 颜色变量，命名变量定义：
G:\SecWorks\shuidi-harmonyos\entry\src\main\resources\base\element

// logo启动图等配置
 G:\SecWorks\shuidi-harmonyos\entry\src\main\resources\base\media

// 示例
 "icon": "$media:layered_image",  // app应用包logo
"label": "$string:EntryAbility_label",   // app应用包标题
```

### 打包配置文件
```json
// G:\SecWorks\shuidi-harmonyos\build-profile.json5

{
  "app": {
      // 签名配置，自动生成
    "signingConfigs": [
      {
        "name": "default",
        "type": "HarmonyOS",
        "material": {
          "storePassword": "000000190BEA8A6EBE09093D63B95EBF6C6F8716EDB8F4BE325558980A72A7B080F4246B26C82BB8B6",
          "certpath": "G:/SecWorks/key/水滴信用.cer",
          "keyAlias": "shuidi_release",
          "keyPassword": "00000019BEE75195403D4B742A3F5DCC4A8747606441916070CA76F5158657719C55906FD64D7798D1",
          "profile": "G:/SecWorks/key/shuidi.app.profileRelease.p7b",
          "signAlg": "SHA256withECDSA",
          "storeFile": "G:/SecWorks/key/.p12"
        }
      },
      {
        "name": "product",
        "type": "HarmonyOS",
        "material": {
          "certpath": "G:/SecWorks/key/水滴信用.cer",
          "storePassword": "000000190AF277E50475FF9EAC348E609452A91552FAFDF0B11478138DBCE1A168D582C15AB7917056",
          "keyAlias": "shuidi_release",
          "keyPassword": "000000190F3DCDF0C8534D46D470923D144D0C52EBFCA5C0BC8E9C23152941EFA2DFB3D9AFD1E0E615",
          "profile": "G:/SecWorks/key/shuidi.app.profileRelease.p7b",
          "signAlg": "SHA256withECDSA",
          "storeFile": "G:/SecWorks/key/.p12"
        }
      }
    ],
    "products": [
      {
        "name": "default",
        "signingConfig": "default",
        "compatibleSdkVersion": "5.0.0(12)",
        "runtimeOS": "HarmonyOS",
      }
    ],
    "buildModeSet": [
      {
        "name": "debug",
      },
      {
        "name": "release"
      }
    ]
  },
  "modules": [
    {
      "name": "entry",
      "srcPath": "./entry",
      "targets": [
        {
          "name": "default",
          "applyToProducts": [
            "default"
          ]
        }
      ]
    }
  ]
}
```

### 依赖文件配置
```json
// G:\SecWorks\shuidi-harmonyos\build-profile.json5
{
  "modelVersion": "5.0.0",
  "description": "Please describe the basic information.",
  "dependencies": {
    "@cashier_alipay/cashiersdk": "^15.8.25"
  },
  "devDependencies": {
    "@ohos/hypium": "1.0.18",
    "@ohos/hamock": "1.0.0"
  },
  "dynamicDependencies": {}
}
```

### 打包版本信息配置
```json
// G:\SecWorks\shuidi-harmonyos\AppScope\app.json5
{
  "app": {
    "bundleName": "shuidi.app.huawei",
    "vendor": "example",
    "versionCode": 1000003,
    "versionName": "1.0.3",
    "icon": "$media:app_icon",
    "label": "$string:app_name"
  }
}
```



## 水滴方案修改记录整理
### 是否app环境
其他隐藏功能直接使用 window.harmonyPlus判断隐藏
```ts
//  util.js isApp()
// 鸿蒙系统
if(window.harmonyPlus){
    flag = true
}
```

### uniapp plus对象重写
```ts
// harmonyPlus.js


/**
 * 鸿蒙端 plus 对象重写 （兼容 uniapp plus api)
 * @author: hhd
 * @update: 2024-07-29
 */

export const harmonyPlus = () => {
    if(window.harmonyPlus){
        /********************************* 初始化plus对象 ******************************************/

        window.plus = {
            navigator: {
                isImmersedStatusbar: null,  // 是否沉浸式状态栏
                setStatusBarStyle: null,  // 设置状态栏颜色
                getStatusbarHeight: null,  // 获取状态栏高度
                closeSplashscreen: function (){return ''}, // 关闭启动界面
                harmonyCopyText: null, // 鸿蒙端复制文本
                setWindowPrivacyMode: null, // 设置隐私模式 传 true 开启 false 关闭
            },
            screen: {
                scale: 1,  // 屏幕缩放比例
                lockOrientation: function (){return ''}, // 锁定屏幕方向
            },
            os: {
                name: 'HarmonyOS' // 操作系统名称
            },
            runtime: {
                channel: '',  // 应用发布渠道
                version: '',  // 应用版本
                versionCode: '', // 应用版本号
                quit: null, // 主动退出应用
            },
            storage: {
                getItem: function (){return ''}, // 获取本地存储数据
                setItem: function (){return ''}, // 设置本地存储数据
            },
            push:{
                getClientInfo: function (){return ''}, // 获取客户端信息
                addEventListener: function (){return ''}, // 监听推送事件
            },
            downloader: {
                createDownload: function () {return ''}, // 创建下载任务
            },
            webview: {
                open: null, // 打开新webview页面
                currentWebview: null, // webview实例
            },
            key: {
                addEventListener: null, // 事件监听
            },
            nativeUI: {
                toast: null, // 原生toast
            },
            payment: {
                request: null, // 支付:支付宝
                getChannels: function () {return ''}, // 获取支付通道
            }
        }


        /********************************* 重写plus对象内api ******************************************/

        window.plus.navigator.isImmersedStatusbar = function (){
            return window.harmonyPlus.isImmersedStatusbar()
        }
        window.plus.navigator.setStatusBarStyle = function (){
            return window.harmonyPlus.setStatusBarStyle()
        }
        window.plus.navigator.harmonyCopyText = function (text, msg){
            return window.harmonyPlus.harmonyCopyText(text, msg)
        }
        window.plus.navigator.getStatusbarHeight = async function () {
            return await window.harmonyPlus.getStatusbarHeight()
        }
        window.plus.navigator.setWindowPrivacyMode = function (flag) {
            return window.harmonyPlus.setWindowPrivacyMode(flag)
        }
        window.plus.webview.open = function (url) {
            return window.harmonyPlus.webviewOpen(url)
        }
        window.plus.webview.currentWebview = function () {
            return{
                back: function (){
                    return window.harmonyPlus.backward()
                }
            }
        }
        window.plus.runtime.quit = function (){
            return window.harmonyPlus.quit()
        }
        window.plus.nativeUI.toast = function (message) {
            return window.harmonyPlus.showToast(message)
        }
        window.plus.screen.scale = window.harmonyPlus.scale()
        window.plus.payment.request = function (alipayChannel, orderInfo, successCB, errorCB) {
            return window.harmonyPlus.toAlipay(alipayChannel, orderInfo, successCB, errorCB)
        }

        // 重写plus backbutton 事件
        let eventObj = {backbutton: []}
        window.plus.key.addEventListener = function (type, callback) {
            eventObj[type].push(callback)
        }



        /********************************* 重写plus对象内事件监听 ******************************************/

        // 鸿蒙端返回事件监听
        window.harmonyBack = function (){
            console.log('6666666',eventObj)
            if(eventObj.backbutton.length > 0){
                eventObj.backbutton.forEach(item =>
                    item()
                )
            }
        }

        // 主动触发plusready事件
        let event = new Event("plusready");
        document.dispatchEvent(event);

    }
}
```

### app.vue注入
```js
import { harmonyPlus} from "@/public/harmonyPlus";
mounted() {
  harmonyPlus()
},
```
