---
highlight: androidstudio
---

# qiankun老项目渐进式升级方案（jQuery + React）

## 📋 方案概述

本方案基于 **qiankun 微前端框架**，实现 jQuery 老项目向 React 现代化技术栈的**渐进式升级**。通过单个子应用承载多个业务组件的方式，低成本逐步实现技术栈现代化。

### 🎯 核心价值

- **零风险升级**：老功能保持稳定，新功能使用React开发
- **技术共存**：jQuery 和 React 技术栈和谐共存
- **渐进式改造**：按需选择升级节奏和范围
- **资源复用**：老项目的API、组件、状态完全可在新组件中使用
- **开发体验**：现代化的开发工具链和组件库

## 🏗 技术架构

### 整体架构图

```md
┌─────────────────────────────────────────────────────────────┐
│                    主应用 (jQuery + qiankun)                 │
├─────────────────────────────────────────────────────────────┤
│  RouteManager                                               │
│  ├── 页面级路由    → loadMicroApp                            │
│  ├── 组件级加载    → loadComponent                           │
│  └── 弹窗级显示    → showModalComponent                      │
├─────────────────────────────────────────────────────────────┤
│  GlobalBridge (通信桥接)                                     │
│  ├── legacyAPI        ├── legacyComponents  ├── legacyState │
│  └── 老项目资源完全复用                                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│               子应用 (React + Ant Design)                    │
├─────────────────────────────────────────────────────────────┤
│  ComponentRouter (组件路由器)                                │
│  ├── 页面级组件    → DataMarketApp, AnalyticsApp             │
│  ├── 组件级组件    → AnalyticsCard, ChartWidget              │
│  └── 弹窗级组件    → PaymentWidget                           │
└─────────────────────────────────────────────────────────────┘
```

### 技术栈选型

| 层级 | 主应用 | 子应用 | 说明 |
|------|--------|--------|------|
| **框架** | jQuery 3.6.0 | React 18.2.0 | 保持老项目稳定性 |
| **微前端** | qiankun 2.10.16 | - | 业界成熟的微前端框架 |
| **UI库** | 原生CSS | Ant Design 5.2.0 | 现代化UI组件库 |
| **构建工具** | Webpack 5 | Webpack 5 | 统一构建工具链 |
| **开发端口** | 8080 | 3000 | 避免端口冲突 |

## 🚀 核心功能特性

### 1. 三种集成模式

#### 模式一：页面级集成
```javascript
// 新功能页面完全使用React开发
// URL: /data-market → React数据集市页面
await routeManager.loadMicroApp('data-market');
```

#### 模式二：组件级集成
```javascript
// 在老页面中嵌入React组件
await routeManager.loadComponent('#container', 'analytics-card', {
    data: getCurrentPageData()
});
```

#### 模式三：弹窗级集成
```javascript
// 以弹窗形式显示React组件
await routeManager.showModalComponent('payment-widget', {
    amount: 199.00,
    onSuccess: handlePaymentSuccess
});
```

### 2. 双向通信机制

#### 主应用 → 子应用
```javascript
// 全局桥接对象
window.legacyBridge = {
    legacyAPI: {
        getUserInfo: () => window.currentUser,
        callAPI: (endpoint, params) => fetch(endpoint, params)
    },
    legacyComponents: {
        showAlert: (message, type) => showJQueryAlert(message, type)
    },
    legacyState: {
        get: (key) => window.legacyState[key],
        set: (key, value) => updateLegacyState(key, value)
    }
};
```

#### 子应用 → 主应用
```javascript
// React组件中调用老项目功能
const AnalyticsCard = ({ globalBridge }) => {
    const handleCallLegacyAPI = async () => {
        const result = await globalBridge.legacyAPI.callAPI('/api/data');
        globalBridge.legacyComponents.showAlert('获取数据成功', 'success');
    };
};
```

## 📦 实施指南

### 第一步：环境准备

1. **安装依赖包**
```bash
# 主应用依赖
cd main-app
npm install jquery qiankun
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin

# 子应用依赖
cd react-app  
npm install react react-dom antd @ant-design/icons
npm install -D @babel/core @babel/preset-react babel-loader
```

2. **配置Webpack**
```javascript
// 主应用 webpack.config.js
module.exports = {
    devServer: {
        port: 8080,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};

// 子应用 webpack.config.js
module.exports = {
    output: {
        library: `${packageName}-[name]`,
        libraryTarget: 'umd',
        chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    },
    devServer: {
        port: 3000,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};
```

### 第二步：主应用改造

1. **创建RouteManager**
```javascript
// main-app/src/RouteManager.js
import { loadMicroApp, start } from 'qiankun';

class RouteManager {
    constructor() {
        this.componentInstances = new Map();
        this.globalBridge = this.setupGlobalBridge();
        this.init();
    }

    // 页面级加载
    async loadMicroApp(component) {
        const app = loadMicroApp({
            name: `react-app-${component}`,
            entry: '//localhost:3000',
            container: '#subapp-container',
            props: { component, globalBridge: this.globalBridge }
        });
        return app;
    }

    // 组件级加载  
    async loadComponent(container, component, props = {}) {
        const instanceId = `component-${component}-${Date.now()}`;
        const microApp = loadMicroApp({
            name: instanceId,
            entry: '//localhost:3000',
            container: container,
            props: { 
                component, 
                isComponentMode: true,
                globalBridge: this.globalBridge,
                ...props 
            }
        });
        
        this.componentInstances.set(instanceId, { microApp, container, component });
        return { instanceId, destroy: () => this.destroyComponent(instanceId) };
    }

    // 弹窗级显示
    async showModalComponent(component, props = {}) {
        const modalId = `modal-${component}-${Date.now()}`;
        const $modal = this.createModalContainer(modalId);
        $('body').append($modal);
        
        const instance = await this.loadComponent(`#${modalId}-content`, component, {
            isModal: true,
            onClose: () => this.closeModalComponent(modalId),
            ...props
        });
        
        return { modalId, close: () => this.closeModalComponent(modalId), ...instance };
    }
}
```

2. **设置通信桥接**
```javascript
setupGlobalBridge() {
    return {
        legacyAPI: {
            getUserInfo: () => window.currentUser || { id: 1, name: '用户' },
            callAPI: async (endpoint, params) => {
                // 调用老项目API
                return await fetch(endpoint, { 
                    method: 'POST', 
                    body: JSON.stringify(params) 
                }).then(res => res.json());
            }
        },
        legacyComponents: {
            showAlert: (message, type) => {
                // 显示老项目样式的提示框
                const $alert = $(`<div class="legacy-alert ${type}">${message}</div>`);
                $('body').append($alert);
                setTimeout(() => $alert.fadeOut(), 3000);
            }
        },
        legacyState: {
            get: (key) => window.legacyState?.[key],
            set: (key, value) => {
                if (!window.legacyState) window.legacyState = {};
                window.legacyState[key] = value;
                $(document).trigger('legacyStateChange', { key, value });
            }
        }
    };
}
```

### 第三步：子应用改造

1. **实现qiankun生命周期**
```javascript
// react-app/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './public-path';

let root;

function render(props = {}) {
    const { container } = props;
    const containerElement = container 
        ? container.querySelector('#react-app-root') 
        : document.querySelector('#react-app-root');
    
    if (!root) {
        root = ReactDOM.createRoot(containerElement);
    }
    
    root.render(<App {...props} />);
}

// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

// qiankun生命周期
export async function bootstrap() {
    console.log('[react-app] 应用启动');
}

export async function mount(props) {
    console.log('[react-app] 应用挂载', props);
    render(props);
}

export async function unmount() {
    console.log('[react-app] 应用卸载');
    if (root) {
        root.unmount();
        root = null;
    }
}
```

2. **创建组件路由器**
```javascript
// react-app/src/ComponentRouter.jsx
import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

// 导入组件
import DataMarketApp from './components/DataMarketApp';
import AnalyticsCard from './components/AnalyticsCard';
import ChartWidget from './components/ChartWidget';
import PaymentWidget from './components/PaymentWidget';

const ComponentRouter = ({ component, isComponentMode, ...props }) => {
    const renderComponent = () => {
        switch (component) {
            // 页面级组件
            case 'data-market':
                return <DataMarketApp {...props} />;
            
            // 组件级微前端组件
            case 'analytics-card':
                return <AnalyticsCard {...props} />;
            case 'chart-widget':
                return <ChartWidget {...props} />;
            case 'payment-widget':
                return <PaymentWidget {...props} />;
                
            default:
                return <div>未知组件: {component}</div>;
        }
    };

    return (
        <ConfigProvider locale={zhCN}>
            <div className="component-router">
                {renderComponent()}
            </div>
        </ConfigProvider>
    );
};

export default ComponentRouter;
```

### 第四步：创建业务组件

1. **数据分析卡片组件**
```javascript
// react-app/src/components/AnalyticsCard.jsx
import React, { useState, useEffect } from 'react';
import { Card, Statistic, Row, Col, Button } from 'antd';

const AnalyticsCard = ({ globalBridge, data = {} }) => {
    const [analyticsData, setAnalyticsData] = useState({
        totalUsers: 0,
        activeUsers: 0,
        revenue: 0,
        growth: 0,
        ...data
    });

    useEffect(() => {
        // 从老项目获取数据
        if (globalBridge) {
            loadLegacyData();
        }
    }, [globalBridge]);

    const loadLegacyData = async () => {
        try {
            const userInfo = globalBridge.legacyAPI.getUserInfo();
            const apiResponse = await globalBridge.legacyAPI.callAPI('/api/analytics');
            
            setAnalyticsData(prev => ({
                ...prev,
                userRole: userInfo.role,
                lastUpdated: new Date().toLocaleString()
            }));
        } catch (error) {
            console.error('获取数据失败:', error);
        }
    };

    const handleRefreshData = () => {
        // 刷新数据逻辑
        setAnalyticsData(prev => ({
            ...prev,
            totalUsers: prev.totalUsers + Math.floor(Math.random() * 100),
            lastUpdated: new Date().toLocaleString()
        }));
        
        globalBridge.legacyComponents.showAlert('数据已刷新', 'success');
    };

    return (
        <Card title="数据分析" extra={<Button onClick={handleRefreshData}>刷新</Button>}>
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic title="总用户数" value={analyticsData.totalUsers} />
                </Col>
                <Col span={6}>
                    <Statistic title="活跃用户" value={analyticsData.activeUsers} />
                </Col>
                <Col span={6}>
                    <Statistic title="收入" value={analyticsData.revenue} />
                </Col>
                <Col span={6}>
                    <Statistic title="增长率" value={analyticsData.growth} suffix="%" />
                </Col>
            </Row>
        </Card>
    );
};

export default AnalyticsCard;
```

2. **图表组件**
```javascript
// react-app/src/components/ChartWidget.jsx
import React, { useState } from 'react';
import { Card, Select, Button } from 'antd';

const ChartWidget = ({ globalBridge, chartType = 'bar', data = {} }) => {
    const [currentType, setCurrentType] = useState(chartType);
    const [chartData, setChartData] = useState({
        categories: ['一月', '二月', '三月', '四月', '五月', '六月'],
        values: [65, 78, 92, 85, 96, 108],
        ...data
    });

    const renderChart = () => {
        // 根据图表类型渲染不同的图表
        switch (currentType) {
            case 'bar':
                return renderBarChart();
            case 'line':
                return renderLineChart();
            case 'pie':
                return renderPieChart();
            default:
                return <div>暂不支持此图表类型</div>;
        }
    };

    const handleExport = () => {
        globalBridge.legacyAPI.callAPI('/api/export-chart', {
            type: currentType,
            data: chartData
        });
        globalBridge.legacyComponents.showAlert('图表导出成功', 'success');
    };

    return (
        <Card 
            title="数据图表"
            extra={
                <>
                    <Select value={currentType} onChange={setCurrentType}>
                        <Select.Option value="bar">柱状图</Select.Option>
                        <Select.Option value="line">折线图</Select.Option>
                        <Select.Option value="pie">饼图</Select.Option>
                    </Select>
                    <Button onClick={handleExport}>导出</Button>
                </>
            }
        >
            {renderChart()}
        </Card>
    );
};

export default ChartWidget;
```

## 💡 使用场景示例

### 场景1：老项目仪表盘增强

```html
<!-- 老项目页面 -->
<div class="dashboard">
    <h2>企业数据仪表盘</h2>
    
    <!-- 老的jQuery组件保持不变 -->
    <div id="legacy-stats" class="legacy-component">
        <!-- 老的统计组件 -->
    </div>
    
    <!-- 新增React数据分析卡片 -->
    <div id="react-analytics" style="margin-top: 20px;"></div>
    
    <script>
    // 在老页面中嵌入React组件
    $(document).ready(async function() {
        await routeManager.loadComponent('#react-analytics', 'analytics-card', {
            data: getDashboardData()
        });
    });
    </script>
</div>
```

### 场景2：老项目支付流程改造

```javascript
// 老项目的支付按钮点击事件
$('#pay-button').click(async function() {
    const orderData = getOrderData();
    
    // 显示React支付弹窗
    const modal = await routeManager.showModalComponent('payment-widget', {
        amount: orderData.amount,
        productName: orderData.productName,
        onSuccess: (result) => {
            // 支付成功后的老项目逻辑
            updateOrderStatus(result.orderNo, 'paid');
            showSuccessMessage('支付成功');
        },
        onCancel: () => {
            console.log('用户取消支付');
        }
    });
});
```

### 场景3：老项目报表页面增强

```javascript
// 在老的报表页面中添加现代化图表
function enhanceReportPage() {
    const reportData = getCurrentReportData();
    
    // 添加React图表组件
    routeManager.loadComponent('#chart-container', 'chart-widget', {
        chartType: 'line',
        data: {
            categories: reportData.months,
            values: reportData.sales
        }
    });
    
    // 与老项目筛选器联动
    $('#date-filter').change(function() {
        const newData = getFilteredData($(this).val());
        // 更新React组件数据
        // 通过globalBridge通信实现
    });
}
```

## 📈 实施流程

### 阶段一：基础设施搭建（1-2周）
- ✅ 配置qiankun微前端框架
- ✅ 建立主子应用通信机制
- ✅ 创建基础组件模板
- ✅ 完善开发和构建流程

### 阶段二：核心功能迁移（2-4周）
- ✅ 识别高价值、低风险的功能点
- ✅ 创建对应的React组件
- ✅ 在老页面中嵌入新组件
- ✅ 验证功能完整性和性能

### 阶段三：渐进式替换（持续进行）
- ✅ 新功能优先使用React开发
- ✅ 老功能按需改造
- ✅ 逐步扩大React组件覆盖面
- ✅ 最终实现技术栈现代化

## 🎯 最佳实践

### 1. 组件设计原则
```javascript
// ✅ 好的实践：组件功能单一，接口清晰
const AnalyticsCard = ({ 
    data,           // 数据输入
    onRefresh,      // 事件回调
    globalBridge    // 通信桥接
}) => {
    // 组件实现
};

// ❌ 避免：组件职责过多，依赖复杂
const ComplexComponent = ({ everything }) => {
    // 避免这样的设计
};
```

### 2. 生命周期管理
```javascript
// 在页面卸载时清理组件
$(window).on('beforeunload', async () => {
    const instances = routeManager.getComponentInstances();
    for (const instance of instances) {
        await instance.destroy();
    }
});
```

### 3. 错误处理策略
```javascript
async function safeLoadComponent(container, component, props) {
    try {
        return await routeManager.loadComponent(container, component, props);
    } catch (error) {
        console.error('组件加载失败:', error);
        // 显示降级UI
        $(container).html('<div class="fallback">功能暂时不可用</div>');
    }
}
```

### 4. 性能优化建议
```javascript
// 延迟加载非关键组件
setTimeout(() => {
    loadAnalyticsCard();
}, 2000);

// 条件性加载
if (userHasPermission('analytics')) {
    loadAnalyticsCard();
}

// 预加载常用组件
routeManager.preloadComponent('analytics-card');
```

## 🔧 故障排除

### 常见问题及解决方案

1. **子应用加载失败**
```javascript
// 检查点：
// 1. 端口是否正确启动 (主应用8080, 子应用3000)
// 2. CORS配置是否正确
// 3. webpack output配置是否正确

// 解决方案：
devServer: {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}
```

2. **样式冲突问题**
```javascript
// 启用样式隔离
start({
    sandbox: {
        strictStyleIsolation: true
    }
});
```

3. **路由冲突问题**
```javascript
// 设置路由前缀
const router = createBrowserRouter([
    // 路由配置
], {
    basename: '/micro-app'
});
```

4. **全局变量污染**
```javascript
// 使用严格沙箱模式
start({
    sandbox: {
        loose: false
    }
});
```

## 📊 效果预期

### 技术指标
- **代码复用率**: 90%+ (老项目API和状态完全复用)
- **开发效率**: 提升50%+ (新功能使用现代化工具链)
- **维护成本**: 降低30%+ (技术栈统一，组件化开发)
- **用户体验**: 提升显著 (现代化UI组件)

### 业务价值
- **降低重写风险**: 保护现有业务逻辑
- **加速功能迭代**: 新功能快速上线
- **团队技能提升**: 逐步掌握现代化技术
- **系统架构优化**: 向微前端架构演进

## 🎉 总结

本方案通过 **qiankun微前端框架** 实现了jQuery老项目向React的渐进式升级，具有以下优势：

1. **风险可控**: 老功能保持稳定，新功能逐步迁移
2. **技术先进**: 使用业界成熟的微前端解决方案
3. **实施灵活**: 支持页面级、组件级、弹窗级多种集成方式
4. **开发友好**: 现代化的开发体验和工具链
5. **扩展性强**: 易于添加新的技术栈和功能模块

当前**微前端升级方案**，适合有技术债务的老项目进行现代化改造。适合小团队在不影响现有业务的前提下，逐步实现技术栈的现代化。 