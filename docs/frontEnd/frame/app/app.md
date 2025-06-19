
# 前端基建：使用plus api实现app通知权限管理


## 📋 目录

- [功能背景](#功能背景)
- [组件功能介绍](#组件功能介绍)
- [设计思路](#设计思路)
- [核心技术要点](#核心技术要点)
- [使用方法](#使用方法)
- [使用案例](#使用案例)
- [完整代码](#完整代码)

---

## 功能背景

当前项目使用uniapp + webview 混合开发，系统交互能力主要通过html5联盟标准plus api实现，app项目中涉及到app通知推送功能的开发，需要在用户订阅相关功能后，引导用户开启通知权限；主要涉及两个功能：
1. 检查通知权限是否开启
2. 如果未开启，则引导用户打开系统设置


### 开发难点

1. **跨平台兼容性问题**
    - Android和iOS系统的权限检测机制完全不同
    - 不同版本的系统API变化较大

2. **版本适配复杂**
    - iOS 18.5+ 对URL Scheme的限制更加严格
    - Android不同版本的Intent跳转方式不同

3. **用户体验要求**
    - 需要提供便捷的权限设置入口
    - 权限被拒绝时需要友好的引导方式
4. **app技术栈限制**
    - uniapp + webview 混合开发
    - 系统交互能力主要通过html5联盟标准plus api实现
    - 可选方案较少，且需要适配不同系统版本

基于这些难点，需要开发通知权限管理工具类，提供一个统一、可靠、易用的类库，方便开发者在app开发直接调用相关能力。

---

## 组件功能介绍

### 🎯 核心功能

| 功能模块 | 描述 | 支持平台 |
|---------|------|---------|
| **权限检测** | 检查当前应用的通知权限状态 | iOS |
| **设置页面跳转** | 智能跳转到系统通知设置页面 | Android/iOS |
| **版本适配** | 针对不同系统版本提供最佳解决方案 | Android 5.0+, iOS 10+ |

### 🚀 特色亮点

1. **iOS 18.5+ 完美适配**
    - 解决了iOS 18.5+系统URL Scheme限制问题
    - 提供多种备用方案确保兼容性

2. **Android全版本支持跳转**
    - 支持Android 5.0到最新版本
    - 智能识别系统版本选择最佳跳转方案

3. **内存安全管理**
    - 使用finally块确保iOS对象正确释放
    - 避免内存泄漏问题

---

### 未能实现的功能
1. **Android权限检测未实现**
    - Android端尝试了多种通知权限检测的方法，但均未实现


## 设计思路

### 🏗️ 架构设计

```md
NotificationPermissionManager
├── 权限检测模块
│   ├── Android权限检测
│   └── iOS权限检测
├── 设置跳转模块
│   ├── Android设置跳转
│   └── iOS设置跳转
│       ├── 版本检测
│       ├── iOS 18+ 新方案
│       └── iOS 18以下 旧方案
└── 推送监听模块
```

### 🎨 设计原则

1. **单一职责原则**
    - 每个方法只负责一个具体功能
    - 权限检测、设置跳转、推送监听分离

2. **开闭原则**
    - 对扩展开放，对修改封闭
    - 新增平台支持时无需修改现有代码

3. **依赖倒置原则**
    - 面向接口编程，不依赖具体实现
    - 通过配置和策略模式适配不同平台

4. **错误优先处理**
    - 异常情况前置处理
    - 提供完善的降级方案

---

## 核心技术要点

### 🔍 1. 跨平台权限检测

#### Android权限检测（测试未通过）
```javascript
// 支持androidx和support库的兼容
let NotificationManagerCompat = window.plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
if (!NotificationManagerCompat) {
  NotificationManagerCompat = window.plus.android.importClass("androidx.core.app.NotificationManagerCompat");
}
```

- 优先尝试androidx库，确保新版本兼容
- 使用`areNotificationsEnabled()`方法检测权限状态

#### iOS权限检测
```javascript
const app = window.plus.ios.invoke('UIApplication', 'sharedApplication');
const settings = window.plus.ios.invoke(app, 'currentUserNotificationSettings');
```

- 使用`currentUserNotificationSettings`获取权限设置
- 通过`types`属性判断权限状态
- 及时释放iOS对象避免内存泄漏

### 🎯 2. iOS 18.5+ 适配方案

#### 问题分析
iOS 18.5+系统对URL Scheme的调用进行了严格限制，原有的`app-settings:`方案失效。

#### 解决方案
```javascript
const urlSchemes = [
  'App-prefs:NOTIFICATIONS_ID', // iOS 18+ 推荐方式
  'prefs:root=NOTIFICATIONS_ID', // 备用方式1
  'app-settings:', // 原有方式作为备用
  'prefs:root=General&path=About' // 最后备用到通用设置
];
```

- 使用`canOpenURL:`检查URL有效性
- 采用`openURL:options:completionHandler:`方法
- 多方案尝试确保成功率

### 🛡️ 3. 内存管理优化

#### 问题背景
iOS开发中，Plus对象需要手动释放，否则会造成内存泄漏。

#### 解决方案
```javascript
try {
  // iOS调用逻辑
} finally {
  // 在finally块中安全清理对象
  try {
    if (setting) window.plus.ios.deleteObject(setting);
    if (app) window.plus.ios.deleteObject(app);
    if (options) window.plus.ios.deleteObject(options);
  } catch (cleanupError) {
    console.warn('清理iOS对象时出错:', cleanupError);
  }
}
```

- 使用finally块确保对象清理
- 嵌套try-catch避免清理过程中的异常
- 变量声明在循环内部控制作用域

### 🔄 4. Android版本适配

#### 不同版本的Intent处理
```javascript
if (Build.VERSION.SDK_INT >= 26) {
  // Android 8.0+
  intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
  intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
} else if (Build.VERSION.SDK_INT >= 21) {
  // Android 5.0-7.0
  intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
  intent.putExtra("app_package", pkName);
  intent.putExtra("app_uid", uid);
} else {
  // Android 5.0以下
  intent = new Intent();
  intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
}
```

- 根据SDK版本选择不同的Intent方式
- 使用不同的Extra参数传递应用信息

---

## 使用方法

### 📦 安装导入

```javascript
import notificationManager from "@/public/notificationPermission";
```

### 🎮 基础API

#### 1. 检查通知权限
```javascript
const hasPermission = await notificationManager.checkNotificationPermission();
if (hasPermission) {
  console.log("通知权限已开启");
} else {
  console.log("通知权限未开启");
}
```

#### 2. 打开系统设置
```javascript
// 自动识别平台并跳转
notificationManager.openSystemNotificationSettings();

// 或者直接调用平台特定方法
notificationManager.openIOSNotificationSettings();
notificationManager.openAndroidNotificationSettings();
```

#### 3. 设置推送监听
```javascript
notificationManager.setupPushListeners();
```

### ⚙️ 其他

#### 自定义Toast提示
```javascript
// 设置自定义Toast方法
notificationManager.$toast = (message) => {
  // 你的Toast实现
  console.log(message);
};
```

---

## 使用案例

### 🎯 案例1：应用启动时权限检查

```javascript
// 在App启动时检查权限
async function checkNotificationOnAppStart() {
  try {
    const hasPermission = await notificationManager.checkNotificationPermission();
    
    if (!hasPermission) {
      // 显示权限请求弹窗
      const userConfirm = await showPermissionDialog();
      if (userConfirm) {
        notificationManager.openSystemNotificationSettings();
      }
    } else {
      // 设置推送监听
      notificationManager.setupPushListeners();
    }
  } catch (error) {
    console.error('权限检查失败:', error);
  }
}

function showPermissionDialog() {
  return new Promise((resolve) => {
    // 显示确认对话框
    const result = confirm('开启通知权限以获得更好的使用体验，是否前往设置？');
    resolve(result);
  });
}
```

---

## 完整代码

```javascript
/**
 * @description: 通知权限管理工具类
 * @author: hhd 2025-06-18
 * 描述：
 * 1. 检查通知权限状态
 * 2. 打开系统通知设置页面
 * 3. 打开Android通知设置
 * 4. 打开iOS通知设置
 * 5. 设置推送监听器
 * 使用案例：
 * 1. 检查通知权限状态：
 * import notificationManager from "@/public/notificationPermission";
 * notificationManager.checkNotificationPermission().then(hasPermission => {
 *   if (hasPermission) {
 *     console.log("通知权限已开启");
 *   } else {
 *     console.log("通知权限未开启");
 *   }
 * });
 * 2. 打开系统通知设置页面：
 * notificationManager.openSystemNotificationSettings();
 * 3. 打开Android通知设置：
 * notificationManager.openAndroidNotificationSettings();
 * 4. 打开iOS通知设置：
 * notificationManager.openIOSNotificationSettings();
 * 5. 设置推送监听器：
 * notificationManager.setupPushListeners();
 */
class NotificationPermissionManager {
  constructor() {
    this.permissionStatus = null; // 权限状态缓存
  }

  /**
   * 检查通知权限状态
   * @returns {Promise<boolean>} 是否有权限
   */
  async checkNotificationPermission() {
    return new Promise((resolve) => {
      try {
        if (window.plus.os.name === 'Android') {
          // Android 权限检测
          const main = window.plus.android.runtimeMainActivity();
          let NotificationManagerCompat = window.plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
          
          // android.support.v4升级为androidx
          if (!NotificationManagerCompat) {
            NotificationManagerCompat = window.plus.android.importClass("androidx.core.app.NotificationManagerCompat");
          }
          
          const areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
          this.permissionStatus = areNotificationsEnabled;
          resolve(areNotificationsEnabled);
          
        } else if (window.plus.os.name === 'iOS') {
          // iOS 权限检测
          let isOn = undefined;
          let types = 0;
          const app = window.plus.ios.invoke('UIApplication', 'sharedApplication');
          const settings = window.plus.ios.invoke(app, 'currentUserNotificationSettings');
          
          if (settings) {
            types = settings.plusGetAttribute('types');
            window.plus.ios.deleteObject(settings);
          } else {
            types = window.plus.ios.invoke(app, 'enabledRemoteNotificationTypes');
          }
          
          window.plus.ios.deleteObject(app);
          isOn = (0 != types);
          
          this.permissionStatus = isOn;
          resolve(isOn);
          
        } else {
          // 其他平台默认返回true
          this.permissionStatus = true;
          resolve(true);
        }

      } catch (error) {
        console.error('检查权限失败:', error);
        this.permissionStatus = false;
        resolve(false);
      }
    });
  }


  /**
   * 打开系统通知设置页面
   */
  openSystemNotificationSettings() {
    try {
      if (window.plus.os.name === "Android") {
        this.openAndroidNotificationSettings();
      } else if (window.plus.os.name === "iOS") {
        this.openIOSNotificationSettings();
      }
    } catch (error) {
      console.error('打开系统设置失败:', error);
      this.$toast("请手动前往系统设置开启通知权限");
    }
  }

  /**
   * 打开Android通知设置
   */
  openAndroidNotificationSettings() {
    try {
      const main = window.plus.android.runtimeMainActivity();
      const pkName = main.getPackageName();
      const uid = main.getApplicationInfo().plusGetAttribute("uid");
      const Intent = window.plus.android.importClass('android.content.Intent');
      const Build = window.plus.android.importClass("android.os.Build");
      const Settings = window.plus.android.importClass("android.provider.Settings");
      const Uri = window.plus.android.importClass("android.net.Uri");
      
      let intent;
      
      // android 8.0引导  
      if (Build.VERSION.SDK_INT >= 26) {
        intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
        intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
      } else if (Build.VERSION.SDK_INT >= 21) { 
        // android 5.0-7.0  
        intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
        intent.putExtra("app_package", pkName);
        intent.putExtra("app_uid", uid);
      } else { 
        // (<21)其他--跳转到该应用管理的详情页  
        intent = new Intent();
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        const uri = Uri.fromParts("package", pkName, null);
        intent.setData(uri);
      }
      
      // 跳转到该应用的系统通知设置页  
      main.startActivity(intent);
      
    } catch (error) {
      console.error('打开Android通知设置失败:', error);
      this.$toast("请手动前往系统设置开启通知权限");
    }
  }


  /**
   * 打开iOS通知设置
   */
  openIOSNotificationSettings() {
    try {
      // 获取iOS版本信息
      const iosVersion = this.getIOSVersion();
      console.log('当前iOS版本:', iosVersion);
      
      // iOS 18+ 使用新的设置URL方案（调整版本判断，18.0以上都使用新方案）
      if (iosVersion >= 18.0) {
        this.openIOSSettingsForNewVersion();
      } else {
        this.openIOSSettingsForOldVersion();
      }
    } catch (error) {
      console.error('打开iOS通知设置失败:', error);
      this.showFallbackInstructions();
    }
  }

  /**
   * 获取iOS版本号
   */
  getIOSVersion() {
    try {
      const device = window.plus.device;
      const version = parseFloat(device.osver);
      return version;
    } catch (error) {
      console.warn('获取iOS版本失败，使用默认处理方式');
      return 15.0; // 默认版本
    }
  }

  /**
   * iOS 18+ 新版本设置打开方式
   */
  openIOSSettingsForNewVersion() {
    const urlSchemes = [
      'App-prefs:NOTIFICATIONS_ID', // iOS 18+ 推荐方式
      'prefs:root=NOTIFICATIONS_ID', // 备用方式1
      'app-settings:', // 原有方式作为备用
      'prefs:root=General&path=About' // 最后备用到通用设置
    ];

    this.tryOpenWithMultipleSchemes(urlSchemes);
  }

  /**
   * iOS 18以下旧版本设置打开方式
   */
  openIOSSettingsForOldVersion() {
    const urlSchemes = [
      'app-settings:', // 原有方式优先
      'prefs:root=NOTIFICATIONS_ID',
      'App-prefs:NOTIFICATIONS_ID'
    ];

    this.tryOpenWithMultipleSchemes(urlSchemes);
  }

  /**
   * 尝试多种URL Scheme打开设置
   */
  tryOpenWithMultipleSchemes(urlSchemes) {
    let success = false;
    
    for (let i = 0; i < urlSchemes.length && !success; i++) {
      let app, setting, options; // 声明变量在循环内
      
      try {
        const urlString = urlSchemes[i];
        console.log(`尝试URL Scheme: ${urlString}`);
        
        app = window.plus.ios.invoke('UIApplication', 'sharedApplication');
        setting = window.plus.ios.invoke('NSURL', 'URLWithString:', urlString);
        
        // 检查URL是否可以打开
        const canOpen = window.plus.ios.invoke(app, 'canOpenURL:', setting);
        
        if (canOpen) {
          // iOS 10+ 使用openURL:options:completionHandler:
          options = window.plus.ios.invoke('NSDictionary', 'dictionary');
          window.plus.ios.invoke(app, 'openURL:options:completionHandler:', setting, options, null);
          success = true;
          console.log(`成功使用URL Scheme: ${urlString}`);
        } else {
          console.warn(`URL Scheme不可用: ${urlString}`);
        }
        
      } catch (error) {
        console.warn(`URL Scheme ${urlSchemes[i]} 失败:`, error);
      } finally {
        // 在finally块中安全清理对象
        try {
          if (setting) window.plus.ios.deleteObject(setting);
          if (app) window.plus.ios.deleteObject(app);
          if (options) window.plus.ios.deleteObject(options);
        } catch (cleanupError) {
          console.warn('清理iOS对象时出错:', cleanupError);
        }
      }
    }
    
    if (!success) {
      this.showFallbackInstructions();
    }
  }

  /**
   * 显示备用指引
   */
  showFallbackInstructions() {
    const iosVersion = this.getIOSVersion();
    let instructions = '';
    
    if (iosVersion >= 18.0) {
      instructions = `无法自动打开设置，请手动操作：
        1. 打开【设置】应用
        2. 向下滚动找到并点击【通知】
        3. 找到并点击【${this.getAppName()}】
        4. 开启【允许通知】开关
        5. 根据需要设置通知样式和声音`;
    } else {
      instructions = "请手动前往 设置 -> 通知 -> 选择应用 开启权限";
    }
    
    if (this.$toast) {
      this.$toast(instructions);
    } else {
      alert(instructions);
    }
  }

  /**
   * 获取应用名称
   */
  getAppName() {
    try {
      return window.plus.runtime.appid || '本应用';
    } catch (error) {
      return '本应用';
    }
  }

  /**
   * 设置推送监听器
   */
  setupPushListeners() {
    // 监听推送消息接收
    window.plus.push.addEventListener('receive', (msg) => {
      console.log('收到推送消息:', msg.content);
    }, false);

    // 监听推送消息点击
    window.plus.push.addEventListener('click', (msg) => {
      console.log('点击推送消息:', msg.content);
      // 处理消息点击逻辑
    }, false);
  }
}

// 创建单例
const notificationManager = new NotificationPermissionManager();

export default notificationManager; 
```


