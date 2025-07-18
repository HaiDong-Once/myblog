
# 搭建跨端聊天系统：Vue 2 + WebSocket + 小程序适配实战

## 1. 项目概述

### 1.1 需求背景
基于小程序技术栈webview，开发供需集市聊天窗口系统web页面，支持企业与用户之间的实时沟通交流。

### 1.2 核心功能
- 实时聊天通信
- 小程序webview嵌入
- 消息状态管理（发送中、成功、失败）
- 采购单卡片展示
- 功能按钮（拨打电话、发送短信）
- 用户登录状态检查
- 分页加载历史消息

### 1.3 技术栈
- **前端框架**: Vue 2.x + Less
- **通信协议**: WebSocket（基于shuidiIm）
- **跨端通信**: webviewBridge（支持多种小程序）
- **HTTP请求**: http.js
- **状态管理**: 组件内部状态管理

## 2. 技术架构设计

### 2.1 代码结构设计

```md
市场聊天窗口系统
├── 页面入口层
│   └── pages/market-chat/index.vue (主页面)
├── 通信适配层
│   ├── webviewBridge.js (小程序桥接)
│   ├── shuidiIm (WebSocket通信)
│   └── http.js (HTTP请求)
├── 组件层
│   ├── ChatWindow (聊天窗口主容器)
│   ├── ChatHeader (聊天头部)
│   ├── MessageList (消息列表)
│   ├── InputArea (输入区域)
│   ├── ActionButtons (功能按钮)
│   └── cards/ (卡片组件)
│       └── PurchaseOrderCard (采购单卡片)
└── 工具层
    ├── user.js (用户相关工具)
    └── webviewBridge.js (跨端通信)
```

### 2.2 组件架构

#### 2.2.1 主要组件结构
```md
index.vue (主页面)
└── ChatWindow (聊天窗口主容器)
    ├── ChatHeader (聊天头部)
    ├── MessageList (消息列表)
    │   ├── MessageItem (消息项)
    │   └── PurchaseOrderCard (采购单卡片)
    ├── ActionButtons (功能按钮区)
    └── InputArea (输入区域)
```

#### 2.2.2 组件职责划分
- **index.vue**: 页面入口，处理路由参数、初始化聊天基础信息
- **ChatWindow**: 主容器，管理消息状态和WebSocket连接
- **MessageList**: 消息列表展示，支持分页加载和消息重试
- **InputArea**: 输入处理，支持发送消息和登录状态检查
- **ActionButtons**: 功能按钮，支持拨打电话和发送短信
- **PurchaseOrderCard**: 采购单卡片，展示采购信息和联系方式

## 3. 多端兼容方案

### 3.1 小程序适配方案

#### 3.1.1 技术实现
- **嵌入方式**: 小程序webview组件
- **通信方式**: webviewBridge.js统一封装
- **支持平台**: 微信、QQ、支付宝、百度、字节跳动小程序

#### 3.1.2 webviewBridge通信协议
```javascript
// 小程序跳转
webviewBridge.navigateTo({
  url: '/pagesA/supplyAndDemand/callPhone?digest=123456'
})

// 环境检测
webviewBridge.getEnv((env) => {
  // env: { webapp: true } 或 { miniProgram: true }
})
```

#### 3.1.3 兼容性处理
- **自动环境检测**: 通过UserAgent自动识别小程序环境
- **SDK动态加载**: 按需加载不同平台的SDK
- **统一API接口**: 封装统一的调用方式

### 3.2 功能适配

#### 3.2.1 拨打电话功能
```javascript
makePhoneCall() {
  // 统计埋点
  user.clickKbnLog({
    position: '买家会话页点击打电话',
    Group: "供需集市",
    digest: this.chatBaseInfo.digest
  })
  
  // 跳转到拨打电话页面
  webviewBridge.navigateTo({
    url: `/pagesA/supplyAndDemand/callPhone?digest=${this.chatBaseInfo.digest}`
  })
}
```

#### 3.2.2 发送短信功能
```javascript
sendSms() {
  // 统计埋点
  user.clickKbnLog({
    position: '买家会话页点击短信提醒',
    Group: "供需集市",
    digest: this.chatBaseInfo.digest
  })
  
  // 跳转到发送短信页面
  webviewBridge.navigateTo({
    url: `/pagesA/supplyAndDemand/sendMessage?digest=${this.chatBaseInfo.digest}&id=${this.chatBaseInfo.id}`
  })
}
```

## 4. 核心功能实现

### 4.1 消息管理

#### 4.1.1 消息数据结构
```javascript
interface Message {
  id: string;                           // 消息唯一ID
  type: 'text' | 'card' | 'loading';    // 消息类型
  content: string;                      // 消息内容
  sender: 'user' | 'ai' | 'system';     // 发送者
  timestamp: number;                    // 时间戳
  status: 'sending' | 'sent' | 'failed'; // 消息状态
  cardType?: 'purchase-order';          // 卡片类型
  cardData?: any;                       // 卡片数据
}
```

#### 4.1.2 消息状态管理
```javascript
// 发送消息
handleSendMessage(content) {
  // 检查登录状态
  if (!this.configFromParams.phone) {
    webviewBridge.navigateTo({
      url: '/pages/login/login?position=供需集市聊天窗口'
    })
    return
  }

  const message = {
    type: 'text',
    content,
    sender: 'user',
    timestamp: Date.now(),
    status: 'sending'
  }

  // 添加到消息列表
  this.messages.push(message)
  
  // 发送到服务器
  this.sendToServer(message)
}

// 重试消息
retryMessage(messageId) {
  const message = this.messages.find(msg => msg.id === messageId)
  if (message && message.status === 'failed') {
    message.status = 'sending'
    this.sendToServer(message)
  }
}
```

### 4.2 WebSocket通信

#### 4.2.1 连接管理
```javascript
initWebSocket() {
  if (!this.chatBaseInfo.id) return
  
  // 获取用户token
  http.get("kf", { 
    action: "get_user_token", 
    digest: this.chatBaseInfo.id 
  }).then((res) => {
    // 初始化WebSocket连接
    this.wsManager = shuidiIm.getInstance(res.data.uid, res.data.token)
    
    // 添加消息回调
    this.wsManager.addCircleMessageEvent(() => {
      this.loadMoreMessages()
    })
  })
}
```

#### 4.2.2 消息处理
```javascript
// 处理接收到的消息
handleWebSocketMessage(data) {
  const message = {
    id: this.generateId(),
    type: data.type,
    content: data.content,
    sender: 'ai',
    timestamp: Date.now(),
    status: 'sent'
  }
  
  this.messages.push(message)
  this.scrollToBottom()
}
```

### 4.3 分页加载

#### 4.3.1 加载更多消息
```javascript
async loadMoreMessages() {
  if (this.loading || !this.hasMore) return

  this.loading = true
  try {
    const messages = await this.fetchMessages({
      id: this.chatBaseInfo.id,
      page_size: 20,
      page: this.currentPage
    })
    
    if (messages.length > 0) {
      // 插入到列表开头
      this.messages.unshift(...messages)
      this.currentPage++
    } else {
      this.hasMore = false
    }
  } catch (error) {
    console.error('加载消息失败:', error)
  } finally {
    this.loading = false
  }
}
```

### 4.4 卡片系统

#### 4.4.1 采购单卡片
```javascript
// 采购单卡片数据结构
interface PurchaseOrderCardData {
  status: 1 | 2;        // 1: 生成中, 2: 已生成
  phone: string;        // 联系电话
  dataList: Array<{     // 采购商品列表
    name: string;       // 商品名称
    value: {            // 商品属性
      [key: string]: string
    }
  }>;
  note?: string;        // 备注信息
}
```

#### 4.4.2 卡片组件使用
```jsx
<!-- 在MessageList中使用卡片 -->
<div v-else-if="message.type === 'card'" class="card-message">
  <component 
    :is="getCardComponent(message.cardType)" 
    :data="message.cardData"
    @card-action="handleCardAction" 
  />
</div>
```

## 5. 页面设计与实现

### 5.1 主页面入口

```jsx
<template>
  <div class="market-chat-page">
    <!-- 聊天窗口 -->
    <ChatWindow 
      v-if="chatBaseInfo.id"
      :action-buttons="actionButtons"
      :is-show-text-action-buttons="isShowTextActionButtons"
      :chat-base-info="chatBaseInfo"
      :config-from-params="configFromParams"
      @action-button-click="handleActionButtonClick"
    />

    <!-- 页面通知 -->
    <div v-if="notification.show" class="page-notification">
      {{ notification.message }}
    </div>

    <!-- 加载遮罩 -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <div class="loading-text">{{ loadingText }}</div>
    </div>
  </div>
</template>
```

### 5.2 聊天窗口主容器

```jsx
<template>
  <div class="chat-window" ref="chatContainer">
    <!-- 聊天头部 -->
    <ChatHeader 
      :title="chatBaseInfo.company_name"
      :online="chatBaseInfo.company_recent_login_shuidi"
    />

    <!-- 消息列表 -->
    <MessageList
      :messages="messages"
      :chat-base-info="chatBaseInfo"
      :loading="loading"
      :has-more="hasMore"
      :is-show-text-action-buttons="isShowTextActionButtons"
      @text-button-click="handleButtonClick"
      @load-more="loadMoreMessages"
      @retry-message="retryMessage"
    />

    <!-- 功能按钮区 -->
    <ActionButtons
      v-if="actionButtons.length > 0"
      :buttons="actionButtons"
      @button-click="handleButtonClick"
    />

    <!-- 输入区域 -->
    <InputArea
      :disabled="inputDisabled"
      :placeholder="inputPlaceholder"
      @send="handleSendMessage"
    />
  </div>
</template>
```

## 6. 实现特色功能

### 6.1 文本功能按钮
```jsx
<!-- 在MessageList中显示 -->
<div class="text-action-buttons" v-if="isShowTextActionButtons">
  对方当前不在线您可尝试通过
  <div class="text-action-button" @click="textButtonClick('call')">打电话</div> 或
  <div class="text-action-button" @click="textButtonClick('sms')">短信提醒</div>
  方式联系用户
</div>
```

### 6.2 用户登录检查
```javascript
// 发送消息时检查登录状态
handleSendMessage(content) {
  if (!this.configFromParams.phone) {
    // 未登录，跳转登录页
    webviewBridge.navigateTo({
      url: '/pages/login/login?position=供需集市聊天窗口'
    })
    return
  }
  
  // 已登录，发送消息
  this.sendMessage(content)
}
```

### 6.3 统计埋点
```javascript
// 统一的埋点方法
user.clickKbnLog({
  position: '买家会话页点击对话发送',
  Ext1: "点击",
  Group: "供需集市",
  WhereFrom: "小程序流程",
  Ext20: "水滴网站小程序端",
  Ext21: "自然访问",
  digest: this.chatBaseInfo.digest || '*'
})
```

## 7. 样式设计规范

### 7.1 整体布局
```less
.market-chat-page {
  width: 100%;
  height: 100vh;
  background: #f2f6ff;
  position: relative;
  overflow: hidden;
}

.chat-window {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f2f6ff;
}
```

### 7.2 消息样式
```less
.message-item {
  padding: 12px 16px;
  margin-bottom: 8px;
  
  &.user-message {
    .message-content {
      background: #327bf9;
      color: white;
      border-radius: 12px 12px 4px 12px;
    }
  }
  
  &.ai-message {
    .message-content {
      background: white;
      color: #333;
      border-radius: 12px 12px 12px 4px;
      border: 1px solid #e5e9f2;
    }
  }
}
```

### 7.3 响应式设计
- 使用 `pxtoviewport` 解决

## 8. 实施方案

### 8.1 开发环境配置
```json
{
  "dependencies": {
    "vue": "^2.6.14",
    "less": "^4.1.1",
    "less-loader": "^10.0.1"
  }
}
```

### 8.2 目录结构
```md
src/
├── pages/
│   └── market-chat/
│       ├── index.vue           # 主页面
│       └── list.vue           # 聊天列表页
├── components/
│   └── market-chat/
│       ├── ChatWindow.vue      # 聊天窗口主容器
│       ├── ChatHeader.vue      # 聊天头部
│       ├── MessageList.vue     # 消息列表
│       ├── InputArea.vue       # 输入区域
│       ├── ActionButtons.vue   # 功能按钮
│       └── cards/
│           └── PurchaseOrderCard.vue  # 采购单卡片
├── utils/
│   ├── webviewBridge.js        # 小程序桥接
│   └── user.js                 # 用户工具
├── img/
│   └── market-chat/            # 图片资源
├── http.js                     # HTTP请求
└── im.js                       # WebSocket通信
```

### 8.3 路由配置
```javascript
// 在router.js中添加路由
{
  path: '/market-chat',
  name: 'MarketChat',
  component: () => import('@/pages/market-chat/index.vue')
}
```

## 9. 注意事项

### 9.1 性能优化
- 消息列表虚拟滚动（长列表时）
- 图片懒加载
- 组件按需加载
- 内存泄漏防护

### 9.2 兼容性处理
- 小程序webview限制
- iOS Safari键盘问题
- 不同小程序平台差异
- 网络异常处理

### 9.3 安全性考虑
- 用户输入过滤
- XSS防护
- 消息内容验证
- 权限控制

### 9.4 用户体验
- 加载状态反馈
- 错误提示友好
- 操作响应及时
- 界面交互流畅

## 10. 扩展功能

### 10.1 可扩展卡片类型
- 商品推荐卡片
- 订单状态卡片
- 文件传输卡片
- 地理位置卡片

### 10.2 功能增强
- 消息撤回
- 消息转发
- 语音消息
- 图片消息
- 表情包支持

## 12. 总结

本市场聊天窗口系统基于现有项目架构，通过模块化设计和组件化开发，实现了功能完整、多端兼容的聊天通信系统。重点关注用户体验、性能优化和小程序适配，确保在水滴网站小程序中能够提供良好的使用体验。

系统采用Vue组件化架构，通过webviewBridge实现小程序通信，使用shuidiIm进行WebSocket通信，支持实时聊天、采购单卡片、功能按钮等核心功能，为供需集市业务提供了可靠的技术支撑。 