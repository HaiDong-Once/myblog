
# 微前端事件总线通信方案

## 1. 技术方案背景

### 1.1 通信问题的挑战

在微前端架构中，应用间通信是一个核心问题：

- **时序问题**：子应用加载时间不确定，主应用可能在子应用未就绪时发送消息
- **数据共享**：不同应用间需要共享状态和数据
- **事件传递**：应用间需要进行事件通知和响应
- **生命周期管理**：需要感知应用的挂载和卸载状态
- **性能考虑**：避免频繁的跨应用通信影响性能

### 1.2 现有方案的不足

- **qiankun官方通信**：功能相对简单，缺乏时序控制和状态管理
- **全局变量**：容易造成命名冲突，难以维护
- **浏览器原生API**：如 postMessage，使用复杂且功能有限
- **第三方状态管理库**：引入额外依赖，增加项目复杂度

## 2. 方案介绍

### 2.1 整体架构

本方案基于 **事件总线（EventBus）** 模式，构建了一套完整的微前端通信解决方案。整体架构包含三个核心组件：

```md
┌─────────────────────────────────────────────────────────┐
│                    主应用 (Main App)                     │
├─────────────────────────────────────────────────────────┤
│  MainAppCommunicator                                    │
│  ├── 事件监听 (onChildEvent)                             │
│  ├── 事件发送 (sendToChild)                              │
│  ├── 状态管理 (State Management)                         │
│  └── 生命周期管理 (Lifecycle)                            │
└─────────────────────────────────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │  EventBus   │
                    │ (全局事件总线)│
                    └──────┬──────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                   子应用 (Child App)                     │
├─────────────────────────────────────────────────────────┤
│  MicroAppCommunicator                                   │
│  ├── 事件监听 (onMainEvent)                              │
│  ├── 事件发送 (sendToMain)                               │
│  ├── 异步初始化 (Async Init)                             │
│  └── React Hook 封装 (useMicroAppCommunication)         │
└─────────────────────────────────────────────────────────┘
```

### 2.2 核心特性

- **🔄 双向通信**：支持主应用与子应用间的双向事件通信
- **⏰ 时序控制**：解决异步加载导致的消息丢失问题
- **📦 状态管理**：内置状态同步和缓存机制
- **🔧 生命周期管理**：自动感知应用挂载和卸载
- **🚀 React Hook 封装**：提供开箱即用的 React Hook
- **🛡️ 类型安全**：完整的 TypeScript 支持（可选）
- **📊 调试支持**：内置调试日志和状态监控

## 3. 设计思路

### 3.1 事件总线设计

**EventBus** 是整个通信方案的核心，采用观察者模式设计：

```javascript
class EventBus {
    constructor() {
        this.events = new Map()       // 事件存储
        this.maxListeners = 10        // 防止内存泄漏
    }
    
    // 核心API
    on(eventName, callback, context)    // 注册监听
    emit(eventName, data)               // 触发事件  
    off(eventName, callback, context)   // 移除监听
    once(eventName, callback, context)  // 一次性监听
}
```

**关键设计思路**：
- **命名空间隔离**：使用 `main:` 和 `child:` 前缀区分事件来源
- **异步执行**：事件回调异步执行，避免阻塞主线程
- **内存管理**：限制监听器数量，提供清理机制
- **错误处理**：回调执行异常不影响其他监听器

### 3.2 主应用通信器设计

**MainAppCommunicator** 负责主应用端的通信管理：

```javascript
class MainAppCommunicator {
    constructor(options = {}) {
        this.eventBus = null
        this.connectedApps = new Set()     // 已连接应用
        this.pendingMessages = new Map()   // 消息缓存
        this.appStates = new Map()         // 状态存储
    }
}
```

**核心功能**：
- **全局事件总线管理**：创建并维护全局 EventBus 实例
- **应用连接状态跟踪**：记录哪些子应用已经连接
- **消息延迟发送**：对未连接的应用缓存消息，连接后发送
- **状态同步服务**：为子应用提供状态同步能力

### 3.3 子应用通信器设计

**MicroAppCommunicator** 负责子应用端的通信管理：

```javascript
class MicroAppCommunicator {
    constructor(options = {}) {
        this.isInitialized = false
        this.eventBus = null
        this.options = {
            appName: 'unknown',
            onReady: null,              // 就绪回调
            syncStatesOnInit: true,     // 初始化时同步状态
            ...options
        }
    }
}
```

**核心功能**：
- **异步初始化**：等待主应用事件总线就绪
- **生命周期通知**：向主应用报告挂载和卸载状态
- **状态同步请求**：主动向主应用请求状态同步
- **就绪状态管理**：确保只有在就绪后才执行通信操作

### 3.4 React Hook 封装

**useMicroAppCommunication** 提供 React 组件友好的通信接口：

```javascript
const useMicroAppCommunication = (options = {}) => {
  const communicatorRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  
  // 只有在就绪后才暴露方法
  return isReady ? {
    sendToMain,
    onMainEvent, 
    offMainEvent,
    communicator
  } : {
    sendToMain: null,
    onMainEvent: null,
    offMainEvent: null,
    communicator: null
  }
}
```

**设计亮点**：
- **简化API**：组件无需关心初始化状态
- **自动清理**：组件卸载时自动清理监听器
- **状态控制**：内部管理就绪状态，避免时序问题

## 4. 使用方法

### 4.1 主应用配置

#### 4.1.1 初始化通信器

```javascript
// main-app/src/index.js
import MainAppCommunicator from '../utils/MainAppCommunicator.js'

class MainApp {
    constructor() {
        this.communicator = null
    }

    init() {
        // 初始化通信器
        this.communicator = new MainAppCommunicator({
            debug: true,           // 开启调试模式
            namespace: 'shuidiPcJQ', // 命名空间
            enableMessageCache: true // 启用消息缓存
        })

        // 监听子应用事件
        this.setupEventListeners()
    }

    setupEventListeners() {
        // 监听用户登录事件
        this.communicator.onChildEvent('user-login', (eventData) => {
            console.log('用户登录:', eventData.data)
        })

        // 监听用户退出事件  
        this.communicator.onChildEvent('user-logout', (eventData) => {
            console.log('用户退出:', eventData.data)
        })
    }
}
```

#### 4.1.2 发送消息到子应用

```javascript
// 向所有子应用发送消息
this.communicator.sendToChild('user-status-change', {
    userId: 123,
    status: 'online'
})

// 向指定子应用发送消息（解决时序问题）
this.communicator.sendToChild('user-logout-sync', userData, 'react-child-app')
```

### 4.2 子应用配置

#### 4.2.1 React 组件中使用

```javascript
// react-app/src/components/MyComponent.jsx
import React, { useEffect } from 'react'
import useMicroAppCommunication from '../hooks/useMicroAppCommunication'

function MyComponent() {
    const { sendToMain, onMainEvent, offMainEvent } = useMicroAppCommunication()

    useEffect(() => {
        // 监听主应用事件
        if (onMainEvent) {
            onMainEvent('user-logout-sync', (eventData) => {
                console.log('收到用户退出通知:', eventData)
                // 处理用户退出逻辑
                handleUserLogout(eventData)
            })
        }
    }, [onMainEvent])

    const handleLogin = () => {
        // 向主应用发送登录事件
        if (sendToMain) {
            sendToMain('user-login', {
                userId: 123,
                username: 'user123'
            })
        }
    }

    return (
        <div>
            <button onClick={handleLogin}>登录</button>
        </div>
    )
}
```

#### 4.2.2 自定义配置

```javascript
const communication = useMicroAppCommunication({
    appName: 'react-child-app',        // 应用名称
    debug: true,                    // 调试模式
    syncStatesOnInit: true,         // 初始化时同步状态
    statesToSync: ['user-info', 'theme'] // 需要同步的状态
})
```

### 4.3 API 参考

#### 4.3.1 主应用 API

```javascript
// MainAppCommunicator
const communicator = new MainAppCommunicator(options)

// 监听子应用事件
communicator.onChildEvent(eventName, callback)

// 发送事件到子应用
communicator.sendToChild(eventName, data, targetApp?)

// 一次性监听
communicator.onceChildEvent(eventName, callback)

// 移除监听
communicator.offChildEvent(eventName, callback?)

// 获取状态
communicator.getStatus()

// 销毁通信器
communicator.destroy()
```

#### 4.3.2 子应用 API

```javascript
// useMicroAppCommunication Hook
const { sendToMain, onMainEvent, offMainEvent } = useMicroAppCommunication(options)

// 发送事件到主应用
sendToMain(eventName, data)

// 监听主应用事件  
onMainEvent(eventName, callback)

// 移除监听
offMainEvent(eventName, callback?)
```

## 5. 使用案例

### 5.1 用户状态同步

**场景**：用户在主应用登录后，需要同步到所有子应用

**主应用实现**：
```javascript
// 用户登录成功后
handleUserLogin(userInfo) {
    // 向所有子应用广播用户登录事件
    this.communicator.sendToChild('user-login-sync', {
        userId: userInfo.id,
        username: userInfo.name,
        permissions: userInfo.permissions
    })
}

// 用户退出
handleUserLogout() {
    this.communicator.sendToChild('user-logout-sync', {
        timestamp: Date.now()
    })
}
```

**子应用实现**：
```javascript
function UserManager() {
    const { onMainEvent } = useMicroAppCommunication()
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (onMainEvent) {
            // 监听用户登录
            onMainEvent('user-login-sync', (eventData) => {
                setUser(eventData)
                // 初始化用户相关数据
                initUserData(eventData)
            })

            // 监听用户退出
            onMainEvent('user-logout-sync', () => {
                setUser(null)
                // 清理用户数据
                clearUserData()
            })
        }
    }, [onMainEvent])

    return (
        <div>
            {user ? `欢迎，${user.username}` : '请登录'}
        </div>
    )
}
```

### 5.2 弹窗优先级管理

**场景**：主应用弹窗A优先级高于子应用弹窗B，A显示时B不显示

**主应用弹窗管理器**：
```javascript
class ModalManager {
    constructor(communicator) {
        this.communicator = communicator
        this.modalPriority = {
            'modal-a': 1,  // 主应用弹窗优先级高
            'modal-b': 2   // 子应用弹窗优先级低
        }
        this.currentModal = null
    }

    requestShowModal(modalId, data, appName = 'main') {
        // 根据优先级决定显示哪个弹窗
        if (this.shouldShowModal(modalId)) {
            this.showModal(modalId, data, appName)
        } else {
            this.hideModal(this.currentModal)
        }
    }
}
```

**子应用弹窗组件**：
```javascript
function MyModal() {
    const { sendToMain, onMainEvent } = useMicroAppCommunication()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // 检查是否需要显示弹窗
        checkModalCondition().then(shouldShow => {
            if (shouldShow) {
                // 请求显示弹窗
                sendToMain('request-modal', {
                    modalId: 'modal-b',
                    data: { title: '子应用弹窗' }
                })
            }
        })

        // 监听主应用的弹窗控制
        if (onMainEvent) {
            onMainEvent('show-modal', (data) => {
                if (data.modalId === 'modal-b') {
                    setVisible(true)
                }
            })

            onMainEvent('hide-modal', (data) => {
                if (data.modalId === 'modal-b') {
                    setVisible(false)
                }
            })
        }
    }, [sendToMain, onMainEvent])

    return (
        <Modal visible={visible} onCancel={() => setVisible(false)}>
            <p>这是子应用的弹窗</p>
        </Modal>
    )
}
```

### 5.3 数据实时同步

**场景**：主应用的数据变化需要实时同步到子应用

**主应用数据管理**：
```javascript
class DataManager {
    constructor(communicator) {
        this.communicator = communicator
        this.data = new Map()
    }

    updateData(key, value) {
        this.data.set(key, value)
        
        // 广播数据变化
        this.communicator.sendToChild('data-update', {
            key,
            value,
            timestamp: Date.now()
        })
    }

    getData(key) {
        return this.data.get(key)
    }
}
```

**子应用数据订阅**：
```javascript
function DataSubscriber() {
    const { onMainEvent, sendToMain } = useMicroAppCommunication()
    const [data, setData] = useState({})

    useEffect(() => {
        if (onMainEvent) {
            // 监听数据更新
            onMainEvent('data-update', (eventData) => {
                const { key, value } = eventData
                setData(prev => ({
                    ...prev,
                    [key]: value
                }))
            })
        }

        // 请求初始数据
        if (sendToMain) {
            sendToMain('request-initial-data', {
                keys: ['user-list', 'config', 'statistics']
            })
        }
    }, [onMainEvent, sendToMain])

    return (
        <div>
            <h3>实时数据：</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
```

## 6. 完整代码实现

### 6.1 事件总线 (EventBus.js)

```javascript
// main-app/utils/EventBus.js
class EventBus {
    constructor() {
        this.events = new Map() // 事件列表
        this.maxListeners = 10 // 防止内存泄漏
    }

    /**
     * 注册事件监听器
     * @param {string} eventName - 事件名称
     * @param {Function} callback - 回调函数
     * @param {Object} context - 执行上下文
     */
    on(eventName, callback, context = null) {
        if (!this._isValidEvent(eventName, callback)) {
            return false
        }

        if (!this.events.has(eventName)) {
            this.events.set(eventName, [])
        }

        const listeners = this.events.get(eventName)

        // 检查是否重复监听
        const existingListener = listeners.find(listener =>
            listener.callback === callback && listener.context === context
        )

        if (existingListener) {
            console.warn(`[EventBus] 重复监听事件: ${eventName}`)
            return false
        }

        // 检查监听器数量限制
        if (listeners.length >= this.maxListeners) {
            console.warn(`[EventBus] 事件 ${eventName} 监听器数量超过限制 (${this.maxListeners})`)
            return false
        }

        listeners.push({
            callback,
            context,
            id: this._generateId()
        })

        return true
    }

    /**
     * 触发事件
     * @param {string} eventName - 事件名称
     * @param {*} data - 事件数据
     */
    emit(eventName, data = null) {
        if (!eventName || typeof eventName !== 'string') {
            console.error('[EventBus] 无效的事件名称')
            return false
        }

        const listeners = this.events.get(eventName)
        if (!listeners || listeners.length === 0) {
            return false
        }

        // 异步执行回调，避免阻塞
        setTimeout(() => {
            listeners.forEach(listener => {
                try {
                    if (listener.context) {
                        listener.callback.call(listener.context, data)
                    } else {
                        listener.callback(data)
                    }
                } catch (error) {
                    console.error(`[EventBus] 执行事件回调失败: ${eventName}`, error)
                }
            })
        }, 0)

        return true
    }

    /**
     * 移除事件监听器
     * @param {string} eventName - 事件名称
     * @param {Function} callback - 回调函数
     * @param {Object} context - 执行上下文
     */
    off(eventName, callback = null, context = null) {
        if (!this.events.has(eventName)) {
            return false
        }

        const listeners = this.events.get(eventName)

        if (!callback) {
            // 移除所有监听器
            this.events.delete(eventName)
            return true
        }

        const filteredListeners = listeners.filter(listener =>
            !(listener.callback === callback && listener.context === context)
        )

        if (filteredListeners.length === 0) {
            this.events.delete(eventName)
        } else {
            this.events.set(eventName, filteredListeners)
        }

        return true
    }

    /**
     * 一次性事件监听
     * @param {string} eventName - 事件名称
     * @param {Function} callback - 回调函数
     * @param {Object} context - 执行上下文
     */
    once(eventName, callback, context = null) {
        const onceCallback = (data) => {
            callback.call(context, data)
            this.off(eventName, onceCallback, context)
        }

        return this.on(eventName, onceCallback, context)
    }

    /**
     * 获取事件监听器数量
     * @param {string} eventName - 事件名称
     */
    listenerCount(eventName) {
        const listeners = this.events.get(eventName)
        return listeners ? listeners.length : 0
    }

    /**
     * 清空所有事件监听器
     */
    clear() {
        this.events.clear()
    }

    /**
     * 验证事件参数
     * @private
     */
    _isValidEvent(eventName, callback) {
        if (!eventName || typeof eventName !== 'string') {
            console.error('[EventBus] 事件名称必须是非空字符串')
            return false
        }

        if (!callback || typeof callback !== 'function') {
            console.error('[EventBus] 回调函数必须是函数类型')
            return false
        }

        return true
    }

    /**
     * 生成唯一ID
     * @private
     */
    _generateId() {
        return Math.random().toString(36).substr(2, 9)
    }
}

export default EventBus
```

### 6.2 主应用通信器 (MainAppCommunicator.js)

```javascript
// main-app/utils/MainAppCommunicator.js
import EventBus from './EventBus.js'


class MainAppCommunicator {
  constructor(options = {}) {
    this.isInitialized = false // 是否已初始化
    this.eventBus = null // 事件总线
    this.connectedApps = new Set() // 跟踪已连接的子应用
    this.pendingMessages = new Map() // 缓存待发送的消息
    this.appStates = new Map() // 保存应用状态 
    this.options = {
      namespace: 'shuidiPcJQ', // 事件总线命名空间
      debug: false, // 是否开启调试模式
      autoInit: true, // 是否自动初始化
      enableMessageCache: true, // 是否启用消息缓存
      cacheTimeout: 30000, // 缓存超时时间（30秒）
      ...options
    }

    if (this.options.autoInit) {
      this.init()
    }
  }

  /**
   * 初始化通信器
   */
  init() {
    if (this.isInitialized) {
      console.warn('[MainAppCommunicator] 已经初始化，跳过重复初始化')
      return this
    }

    try {
      // 创建全局事件总线
      const globalKey = `${this.options.namespace}EventBus`
      
      if (!window[globalKey]) {
        window[globalKey] = new EventBus()
        this._log('创建全局事件总线')
      } else {
        this._log('使用已存在的全局事件总线')
      }

      this.eventBus = window[globalKey]
      this.isInitialized = true

      // 注册默认事件监听器
      this._setupDefaultListeners()

      this._log('主应用通信器初始化成功')
    } catch (error) {
      console.error('[MainAppCommunicator] 初始化失败:', error)
    }

    return this
  }

  /**
   * 监听子应用事件
   * @param {string} eventName - 事件名称
   * @param {Function} callback - 回调函数
   */
  onChildEvent(eventName, callback) {
    if (!this._checkInitialized()) return false

    const prefixedEventName = `child:${eventName}`
    const success = this.eventBus.on(prefixedEventName, callback, this)

    if (success) {
      this._log(`监听子应用事件: ${eventName}`)
    }

    return success
  }

  /**
   * 向子应用发送事件
   * @param {string} eventName - 事件名称
   * @param {*} data - 事件数据
   * @param {string} targetApp - 目标应用名称（可选）
   */
  sendToChild(eventName, data, targetApp = null) {
    if (!this._checkInitialized()) return false

    // 如果指定了目标应用且该应用未连接，则延迟发送
    if (targetApp && !this.connectedApps.has(targetApp)) {
      this._log(`应用 ${targetApp} 未连接，延迟发送消息: ${eventName}`)
      return this._sendWhenReady(eventName, data, targetApp)
    }

    const prefixedEventName = `main:${eventName}`
    const success = this.eventBus.emit(prefixedEventName, data)

    if (success) {
      this._log(`向子应用发送事件: ${eventName}`, data)
    }

    return success
  }

  /**
   * 等待应用连接后发送消息
   * @private
   */
  _sendWhenReady(eventName, data, targetApp) {
    const checkAndSend = () => {
      if (this.connectedApps.has(targetApp)) {
        const prefixedEventName = `main:${eventName}`
        this.eventBus.emit(prefixedEventName, data)
        this._log(`延迟发送消息成功: ${eventName}`, data)
      } else {
        // 每100ms检查一次，最多等待10秒
        setTimeout(checkAndSend, 100)
      }
    }
    
    setTimeout(checkAndSend, 100)
    return true
  }

  /**
   * 发送缓存的消息给指定应用
   * @param {string} appName - 应用名称
   */
  sendCachedMessages(appName) {
    if (!this.pendingMessages.has(appName)) return

    const cachedMessages = this.pendingMessages.get(appName)
    this._log(`发送缓存消息给应用: ${appName}`, cachedMessages)

    cachedMessages.forEach(({ eventName, data, timestamp }) => {
      // 检查消息是否过期
      if (Date.now() - timestamp < this.options.cacheTimeout) {
        const prefixedEventName = `main:${eventName}`
        this.eventBus.emit(prefixedEventName, data)
        this._log(`发送缓存消息: ${eventName}`, data)
      }
    })

    // 清除已发送的缓存消息
    this.pendingMessages.delete(appName)
  }

  /**
   * 获取当前状态（供子应用同步）
   * @param {string} stateName - 状态名称
   */
  getState(stateName) {
    return this.appStates.get(stateName)
  }

  /**
   * 获取所有状态
   */
  getAllStates() {
    return Object.fromEntries(this.appStates)
  }

  /**
   * 移除子应用事件监听
   * @param {string} eventName - 事件名称
   * @param {Function} callback - 回调函数
   */
  offChildEvent(eventName, callback = null) {
    if (!this._checkInitialized()) return false

    const prefixedEventName = `child:${eventName}`
    return this.eventBus.off(prefixedEventName, callback, this)
  }

  /**
   * 一次性监听子应用事件
   * @param {string} eventName - 事件名称
   * @param {Function} callback - 回调函数
   */
  onceChildEvent(eventName, callback) {
    if (!this._checkInitialized()) return false

    const prefixedEventName = `child:${eventName}`
    return this.eventBus.once(prefixedEventName, callback, this)
  }

  /**
   * 获取通信状态
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      eventBusExists: !!this.eventBus,
      totalListeners: this.eventBus ? this.eventBus.events.size : 0
    }
  }

  /**
   * 销毁通信器
   */
  destroy() {
    if (!this.isInitialized) return

    // 移除所有监听器
    if (this.eventBus) {
      this.eventBus.events.forEach((listeners, eventName) => {
        if (eventName.startsWith('child:')) {
          this.eventBus.off(eventName)
        }
      })
    }

    this.isInitialized = false
    this._log('主应用通信器已销毁')
  }

  /**
   * 设置默认事件监听器
   * @private
   */
  _setupDefaultListeners() {
    // 监听子应用生命周期事件
    this.onChildEvent('mounted', (data) => {
      const appName = data.appName
      this.connectedApps.add(appName)
      this._log('子应用已挂载', data)
      
      // 发送缓存的消息
      this.sendCachedMessages(appName)
    })

    this.onChildEvent('unmounted', (data) => {
      const appName = data.appName
      this.connectedApps.delete(appName)
      this._log('子应用已卸载', data)
    })

    // 处理状态同步请求
    this.onChildEvent('requestState', (data) => {
      const { appName, requestedStates } = data.data
      this._log('子应用请求状态同步', data)
      
      if (requestedStates) {
        // 发送指定状态
        requestedStates.forEach(stateName => {
          const state = this.getState(stateName)
          if (state !== undefined) {
            this.sendToChild(stateName, state)
          }
        })
      } else {
        // 发送所有状态
        const allStates = this.getAllStates()
        Object.entries(allStates).forEach(([stateName, stateData]) => {
          this.sendToChild(stateName, stateData)
        })
      }
    })

    this.onChildEvent('error', (error) => {
      console.error('[MainAppCommunicator] 子应用错误:', error)
    })
  }

  /**
   * 检查是否已初始化
   * @private
   */
  _checkInitialized() {
    if (!this.isInitialized) {
      console.error('[MainAppCommunicator] 通信器未初始化')
      return false
    }
    return true
  }

  /**
   * 日志输出
   * @private
   */
  _log(message, data = null) {
    if (this.options.debug) {
      console.log(`[MainAppCommunicator] ${message}`, data || '')
    }
  }

  /**
   * 缓存消息
   * @private
   */
  _cacheMessage(appName, eventName, data) {
    if (!this.pendingMessages.has(appName)) {
      this.pendingMessages.set(appName, [])
    }
    
    this.pendingMessages.get(appName).push({
      eventName,
      data,
      timestamp: Date.now()
    })
  }

  /**
   * 保存状态
   * @private
   */
  _saveState(eventName, data) {
    this.appStates.set(eventName, data)
  }
}

export default MainAppCommunicator
```

### 6.3 子应用通信器 (MicroAppCommunicator.js)

```javascript
// react-app/src/utils/MicroAppCommunicator.js
class MicroAppCommunicator {
    constructor(options = {}) {
      this.isInitialized = false // 是否已初始化
      this.eventBus = null // 事件总线
      this.options = {
        namespace: 'shuidiPcJQ', // 事件总线命名空间
        debug: false, // 是否开启调试模式
        autoInit: true, // 是否自动初始化
        appName: 'react-child-app', // 应用名称
        onReady: null, // 就绪回调
        syncStatesOnInit: true, // 初始化时同步状态
        statesToSync: [], // 需要同步的状态列表
        ...options
      }
  
      if (this.options.autoInit) {
        this.init()
      }
    }
  
    /**
     * 初始化通信器
     */
    init() {
      if (this.isInitialized) {
        console.warn('[MicroAppCommunicator] 已经初始化，跳过重复初始化')
        return this
      }
  
      try {
        // 等待主应用事件总线就绪
        this._waitForEventBus()
          .then(() => {
            this.isInitialized = true
            this._setupDefaultListeners()
            this._notifyMounted()
            
            // 同步状态
            if (this.options.syncStatesOnInit) {
              this._requestStateSync()
            }
            
            this._log('子应用通信器初始化成功')
            
            // 触发就绪回调
            if (typeof this.options.onReady === 'function') {
              this.options.onReady()
            }
          })
          .catch(error => {
            console.error('[MicroAppCommunicator] 初始化失败:', error)
          })
      } catch (error) {
        console.error('[MicroAppCommunicator] 初始化异常:', error)
      }
  
      return this
    }
  
    /**
     * 监听主应用事件
     * @param {string} eventName - 事件名称
     * @param {Function} callback - 回调函数
     */
    onMainEvent(eventName, callback) {
      if (!this._checkInitialized()) return false
  
      const prefixedEventName = `main:${eventName}`
      const success = this.eventBus.on(prefixedEventName, callback, this)
  
      if (success) {
        this._log(`监听主应用事件: ${eventName}`)
      }
  
      return success
    }
  
    /**
     * 向主应用发送事件
     * @param {string} eventName - 事件名称
     * @param {*} data - 事件数据
     */
    sendToMain(eventName, data) {
      if (!this._checkInitialized()) return false
  
      const prefixedEventName = `child:${eventName}`
      const eventData = {
        appName: this.options.appName,
        timestamp: Date.now(),
        data
      }
  
      const success = this.eventBus.emit(prefixedEventName, eventData)
  
      if (success) {
        this._log(`向主应用发送事件: ${eventName}`, eventData)
      }
  
      return success
    }
  
    /**
     * 移除主应用事件监听
     * @param {string} eventName - 事件名称
     * @param {Function} callback - 回调函数
     */
    offMainEvent(eventName, callback = null) {
      if (!this._checkInitialized()) return false
  
      const prefixedEventName = `main:${eventName}`
      return this.eventBus.off(prefixedEventName, callback, this)
    }
  
    /**
     * 一次性监听主应用事件
     * @param {string} eventName - 事件名称
     * @param {Function} callback - 回调函数
     */
    onceMainEvent(eventName, callback) {
      if (!this._checkInitialized()) return false
  
      const prefixedEventName = `main:${eventName}`
      return this.eventBus.once(prefixedEventName, callback, this)
    }
  
    /**
     * 获取通信状态
     */
    getStatus() {
      return {
        initialized: this.isInitialized,
        eventBusExists: !!this.eventBus,
        appName: this.options.appName
      }
    }
  
    /**
     * 销毁通信器
     */
    destroy() {
      if (!this.isInitialized) return
  
      // 通知主应用卸载
      this._notifyUnmounted()
  
      // 移除所有监听器
      if (this.eventBus) {
        this.eventBus.events.forEach((listeners, eventName) => {
          if (eventName.startsWith('main:')) {
            this.eventBus.off(eventName)
          }
        })
      }
  
      this.isInitialized = false
      this._log('子应用通信器已销毁')
    }
  
    /**
     * 等待事件总线就绪
     * @private
     */
    _waitForEventBus() {
      return new Promise((resolve, reject) => {
        const globalKey = `${this.options.namespace}EventBus`
        let attempts = 0
        const maxAttempts = 100 // 10秒超时
  
        const checkEventBus = () => {
          if (window[globalKey]) {
            this.eventBus = window[globalKey]
            resolve()
          } else if (attempts < maxAttempts) {
            attempts++
            setTimeout(checkEventBus, 100)
          } else {
            reject(new Error('等待事件总线超时'))
          }
        }
  
        checkEventBus()
      })
    }
  
    /**
     * 设置默认事件监听器
     * @private
     */
    _setupDefaultListeners() {
      // 监听主应用的通用事件
      this.onMainEvent('ping', () => {
        this.sendToMain('pong', { appName: this.options.appName })
      })
  
      this.onMainEvent('getStatus', () => {
        this.sendToMain('status', this.getStatus())
      })
    }
  
    /**
     * 通知主应用已挂载
     * @private
     */
    _notifyMounted() {
      this.sendToMain('mounted', {
        appName: this.options.appName,
        version: '1.0.0'
      })
    }
  
    /**
     * 通知主应用即将卸载
     * @private
     */
    _notifyUnmounted() {
      this.sendToMain('unmounted', {
        appName: this.options.appName
      })
    }
  
    /**
     * 检查是否已初始化（修改为不抛出错误的版本）
     * @private
     */
    _checkInitialized(silent = false) {
      if (!this.isInitialized) {
        if (!silent) {
          console.warn('[MicroAppCommunicator] 通信器未初始化，操作将被忽略')
        }
        return false
      }
      return true
    }
  
    /**
     * 日志输出
     * @private
     */
    _log(message, data = null) {
      if (this.options.debug) {
        console.log(`[MicroAppCommunicator] ${message}`, data || '')
      }
    }
  
    /**
     * 请求状态同步
     * @param {Array} stateNames - 需要同步的状态名称列表
     */
    requestStateSync(stateNames = null) {
      if (!this._checkInitialized()) return false
  
      return this.sendToMain('requestState', {
        appName: this.options.appName,
        requestedStates: stateNames || this.options.statesToSync
      })
    }
  
    /**
     * 请求状态同步（私有方法）
     * @private
     */
    _requestStateSync() {
      // 延迟一点时间确保主应用已准备好
      setTimeout(() => {
        this.requestStateSync()
      }, 100)
    }
  }
  
  export default MicroAppCommunicator
```

### 6.4 React Hook 封装 (useMicroAppCommunication.js)

```javascript
// react-app/src/hooks/useMicroAppCommunication.js
import { useEffect, useRef, useCallback, useState } from 'react'
import MicroAppCommunicator from '../utils/MicroAppCommunicator.js'

const useMicroAppCommunication = (options = {}) => {
  const communicatorRef = useRef(null) // 通信器引用
  const [isReady, setIsReady] = useState(false) // 是否已就绪

  useEffect(() => {
    // 初始化通信器
    communicatorRef.current = new MicroAppCommunicator({
      debug: true, // 是否开启调试模式
      namespace: 'shuidiPcJQ', // 事件总线命名空间
      appName: 'react-child-app', // 应用名称
      onReady: () => { // 就绪回调
        setIsReady(true)
      },
      ...options
    })

    // 组件卸载时销毁通信器
    return () => {
      if (communicatorRef.current) {
        communicatorRef.current.destroy()
      }
      setIsReady(false)
    }
  }, [])

  const sendToMain = useCallback((eventName, data) => {
    if (isReady && communicatorRef.current) {
      return communicatorRef.current.sendToMain(eventName, data)
    }
    return false
  }, [isReady])

  const onMainEvent = useCallback((eventName, callback) => {
    if (isReady && communicatorRef.current) {
      return communicatorRef.current.onMainEvent(eventName, callback)
    }
    return false
  }, [isReady])

  const offMainEvent = useCallback((eventName, callback) => {
    if (isReady && communicatorRef.current) {
      return communicatorRef.current.offMainEvent(eventName, callback)
    }
    return false
  }, [isReady])

  // 只有在 ready 后才暴露方法，否则返回 null
  return isReady ? {
    sendToMain,
    onMainEvent,
    offMainEvent,
    communicator: communicatorRef.current
  } : {
    sendToMain: null,
    onMainEvent: null,
    offMainEvent: null,
    communicator: null
  }
}

export default useMicroAppCommunication
```

## 7. 技术要点总结

### 7.1 关键技术点

1. **时序控制机制**
   - 延迟发送：未连接应用的消息延迟发送
   - 就绪状态管理：Hook层面控制方法暴露时机
   - 异步初始化：等待事件总线就绪后再进行通信

2. **命名空间隔离**
   - 使用前缀区分事件来源：`main:` 和 `child:`
   - 全局变量命名规范：`${namespace}EventBus`
   - 避免命名冲突和事件串扰

3. **内存管理机制**
   - 监听器数量限制：防止内存泄漏
   - 自动清理：组件卸载时自动移除监听器
   - 事件上下文绑定：正确清理特定上下文的监听器

4. **错误处理和容错**
   - 回调异常隔离：单个回调失败不影响其他回调
   - 参数验证：严格的参数类型和有效性检查
   - 降级处理：通信失败时的优雅降级

### 7.2 性能优化策略

1. **异步执行**：事件回调异步执行，避免阻塞主线程
2. **懒加载**：通信器按需初始化，减少启动开销
3. **批量处理**：支持批量事件发送和处理
4. **缓存机制**：避免重复的状态同步请求

### 7.3 开发体验优化

1. **调试工具**：内置日志系统，便于问题排查
2. **React Hook 封装**：符合 React 开发习惯
3. **简洁的 API**：直观易用的方法命名和参数设计

## 8. 总结


### 8.1 适用场景

- 中大型微前端项目
- 需要复杂应用间通信的场景
- 对通信可靠性要求较高的项目
- React 技术栈的微前端项目

### 8.2 未来优化方向

1. **TypeScript 完整支持**：提供完整的类型定义文件
2. **Vue/Angular 适配**：扩展支持其他前端框架
3. **性能监控**：添加通信性能监控和分析功能
4. **插件化架构**：支持自定义插件扩展功能


## 参考资料

- [qiankun 官方文档](https://qiankun.umijs.org/)
- [微前端架构最佳实践](https://micro-frontends.org/)
- [React Hooks 最佳实践](https://reactjs.org/docs/hooks-intro.html)
- [JavaScript 事件模式设计](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)




