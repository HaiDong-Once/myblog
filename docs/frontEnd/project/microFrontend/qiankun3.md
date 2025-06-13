

# 基于 qiankun 的JQ老项目升级-组件级微前端扩展

## 🎯 功能概述

本扩展功能实现了在老项目（jQuery）页面中**动态嵌入React组件**的能力，支持：

*   ✅ **组件级动态加载**：在任意容器中加载React组件
*   ✅ **弹窗组件支持**：支持以弹窗形式显示React组件
*   ✅ **双向通信机制**：主子应用完整的状态和方法共享
*   ✅ **生命周期管理**：组件的创建、销毁和状态管理
*   ✅ **老项目集成**：无缝调用老项目的API、组件和状态

全局概览：

```mermaid
graph TD
    subgraph "老项目 (jQuery)"
        A[主页面] --> B[RouteManager]
        B --> C{组件类型}
        C -->|页面级| D[loadMicroApp<br/>页面路由]
        C -->|组件级| E[loadComponent<br/>容器嵌入]
        C -->|弹窗级| F[showModalComponent<br/>弹窗显示]
    end
    
    subgraph "微前端子应用 (React)"
        G[ComponentRouter] --> H{组件选择}
        H --> I[AnalyticsCard<br/>数据分析卡片]
        H --> J[ChartWidget<br/>图表组件]
        H --> K[PaymentWidget<br/>支付组件]
        H --> L[DataMarketApp<br/>数据集市页面]
    end
    
    subgraph "通信桥接"
        M[globalBridge] --> N[legacyAPI<br/>老项目API]
        M --> O[legacyComponents<br/>老项目组件]
        M --> P[legacyState<br/>老项目状态]
    end
    
    D --> G
    E --> G
    F --> G
    
    I --> M
    J --> M
    K --> M
    
    style A fill:#e1f5fe
    style I fill:#f3e5f5
    style J fill:#f3e5f5
    style K fill:#f3e5f5
    style M fill:#fff3e0
```

## 🚀 核心功能

### 1. 组件级动态加载

```javascript
// 在老项目页面的任意位置加载React组件
const instance = await routeManager.loadComponent(
    '#container-id',        // 容器选择器
    'analytics-card',       // 组件名称
    {                       // 传递的props
        title: '数据分析',
        data: { users: 1000 }
    }
);

// 销毁组件
await instance.destroy();
```

### 2. 弹窗组件支持

```javascript
// 显示React弹窗组件
const modal = await routeManager.showModalComponent(
    'payment-widget',       // 组件名称
    {                       // 弹窗配置
        amount: 199.00,
        onClose: () => console.log('弹窗关闭')
    }
);

// 关闭弹窗
await modal.close();
```

### 3. 全局通信桥接

```javascript
// 老项目向React组件提供的能力
window.legacyBridge = {
    // API调用
    legacyAPI: {
        getUserInfo: () => window.currentUser,
        callAPI: (endpoint, params) => { /* 调用老API */ }
    },
    
    // 组件调用
    legacyComponents: {
        showAlert: (message, type) => { /* 显示老项目Alert */ },
        showConfirm: (message, callback) => { /* 显示确认框 */ }
    },
    
    // 状态管理
    legacyState: {
        get: (key) => window.legacyState[key],
        set: (key, value) => { /* 设置状态并通知 */ },
        subscribe: (callback) => { /* 订阅状态变化 */ }
    }
};
```

## 🛠 案例使用说明

### 在老项目页面中使用

1.  **嵌入数据分析卡片**：

```html
<!-- 老项目页面 -->
<div id="analytics-container" style="width: 400px; height: 300px;"></div>

<script>
async function loadAnalyticsCard() {
    try {
        const instance = await routeManager.loadComponent(
            '#analytics-container',
            'analytics-card',
            {
                title: '实时数据分析',
                data: getCurrentPageData() // 获取当前页面数据
            }
        );
        
        console.log('数据分析卡片已加载:', instance.instanceId);
        
    } catch (error) {
        console.error('加载失败:', error);
    }
}
</script>
```

2.  **显示支付弹窗**：

```javascript
// 在老项目的支付按钮点击事件中
async function showPayment() {
    const modal = await routeManager.showModalComponent(
        'payment-widget',
        {
            amount: calculateAmount(),
            productName: getProductName(),
            onSuccess: (result) => {
                // 支付成功回调
                updateUserSubscription(result);
            }
        }
    );
}
```

3.  **批量管理组件**：

```javascript
// 获取所有已加载的组件
const instances = routeManager.getComponentInstances();
console.log('当前组件实例:', instances);

// 清理所有组件
for (const instance of instances) {
    await routeManager.destroyComponent(instance.instanceId);
}
```

## 💡 最佳实践

### 1. 组件生命周期管理

```javascript
// 在页面卸载时清理组件
$(window).on('beforeunload', async () => {
    const instances = routeManager.getComponentInstances();
    for (const instance of instances) {
        await routeManager.destroyComponent(instance.instanceId);
    }
});
```

### 2. 错误处理

```javascript
async function safeLoadComponent(container, component, props) {
    try {
        return await routeManager.loadComponent(container, component, props);
    } catch (error) {
        console.error('组件加载失败:', error);
        // 显示降级UI
        $(container).html('<div class="fallback-ui">功能暂时不可用</div>');
    }
}
```

### 3. 性能优化

```javascript
// 延迟加载非关键组件
setTimeout(() => {
    loadAnalyticsCard();
}, 2000);

// 条件性加载
if (userHasPermission('analytics')) {
    loadAnalyticsCard();
}
```

## 🔧 扩展开发

### 添加新的组件类型

1.  **创建React组件**：

```jsx
// react-app/src/components/MyCustomWidget.jsx
import React from 'react';

const MyCustomWidget = ({ title, globalBridge, ...props }) => {
    // 组件实现
    return <div>{title}</div>;
};

export default MyCustomWidget;
```

2.  **注册到ComponentRouter**：

```jsx
// react-app/src/ComponentRouter.jsx
import MyCustomWidget from './components/MyCustomWidget';

const ComponentRouter = ({ component, ...props }) => {
    const renderComponent = () => {
        switch (component) {
            // ... 其他组件
            case 'my-custom-widget':
                return <MyCustomWidget {...props} />;
        }
    };
};
```

3.  **在老项目中使用**：

```javascript
const instance = await routeManager.loadComponent(
    '#my-container',
    'my-custom-widget',
    { title: '我的组件' }
);
```

## 📊 技术架构


```mermaid
graph TD
    A[老项目jQuery] --> B[RouteManager]
    B --> C[qiankun loadMicroApp]
    C --> D[React子应用]
    D --> E[ComponentRouter]
    E --> F[具体组件]
    
    F --> G[AnalyticsCard]
    F --> H[ChartWidget]
    F --> I[PaymentWidget]
    
    J[globalBridge] --> F
    J --> K[legacyAPI]
    J --> L[legacyComponents]
    J --> M[legacyState]
```

## 🎉 总结

通过这套组件级微前端扩展功能，可以：

1.  **渐进式升级**：在不重写整个老项目的情况下，逐步引入React组件
2.  **技术共存**：jQuery和React技术栈和谐共存
3.  **功能复用**：老项目的API、组件、状态完全可在React组件中使用
4.  **用户体验**：提供现代化的UI组件和交互体验
5.  **开发效率**：新功能使用React开发，老功能保持稳定

**以上是这个渐进式微前端升级方案组件级改造**！
