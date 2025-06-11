---
highlight: androidstudio
---
# qiankun微前端快速上手指南

## 📋 目录

- [什么是qiankun微前端](#什么是qiankun微前端)
- [qiankun的主要能力](#qiankun的主要能力)
- [适合解决的项目问题](#适合解决的项目问题)
- [核心概念](#核心概念)
- [通信方式](#通信方式)
- [路由管理](#路由管理)
- [快速入门](#快速入门)
- [从零搭建微前端项目](#从零搭建微前端项目)
- [实战案例：JQ主应用+React子应用](#实战案例jq主应用react子应用)
- [常见问题及解决方案](#常见问题及解决方案)
- [最佳实践](#最佳实践)

## 什么是qiankun微前端

qiankun 是一个基于 [single-spa](https://github.com/single-spa/single-spa) 的**微前端实现库**，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。

### 核心特性

- 🔥 **技术栈无关**：主框架不限制接入应用的技术栈，微应用具备完全自主权
- 📦 **独立开发、独立部署**：微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新
- 🍱 **增量升级**：在面对各种复杂场景时，通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略
- 🛡 **统一路由**：解决了 SPA 应用路由之间的冲突问题，原有路由方式不变，从而解决了路由死循环、页面白屏等问题
- 🎯 **简单易用**：提供了完备的 JS SDK，接入简单

## qiankun的主要能力

### 1. 应用隔离能力

- **样式隔离**：确保微应用间的样式不相互影响
- **JS隔离**：每个微应用都有独立的全局执行环境
- **DOM隔离**：微应用的DOM操作局限在指定容器内

### 2. 应用通信能力

- **全局状态管理**：提供跨应用的状态共享机制
- **事件总线**：支持微应用间的消息传递
- **Props传递**：主应用可向子应用传递初始化数据

### 3. 路由管理能力

- **统一路由**：主应用统一管理所有路由规则
- **路由分发**：根据路由规则自动加载对应的微应用
- **Browser History**：支持浏览器原生路由功能

### 4. 生命周期管理

- **动态加载**：按需加载微应用资源
- **生命周期钩子**：完整的应用加载、挂载、卸载生命周期
- **资源管理**：自动处理微应用的资源加载和清理

## 适合解决的项目问题

### 1. 大型单体应用拆分

```md
问题：单体应用过于庞大，开发维护困难
解决：将大型应用按业务模块拆分为多个微应用
优势：
- 降低代码复杂度
- 提高开发效率
- 便于团队协作
```

### 2. 多技术栈共存

```md
问题：项目中需要使用不同的技术栈
解决：不同模块使用不同技术栈开发，通过qiankun集成
优势：
- 技术选型灵活
- 团队技能利用最大化
- 渐进式技术升级
```

### 3. 团队协作问题

```md
问题：多团队开发同一个项目，代码冲突频繁
解决：每个团队负责独立的微应用
优势：
- 代码仓库隔离
- 独立开发部署
- 减少协作成本
```

### 4. 遗留系统改造

```md
问题：老系统技术栈过时，全量重写成本高
解决：保留原有系统，新功能用新技术栈开发
优势：
- 渐进式升级
- 降低改造风险
- 最大化复用现有代码
```

## 核心概念

### 主应用 (Main App)

```javascript
// 主应用职责
const mainApp = {
  responsibilities: [
    '注册并管理微应用',
    '提供微应用运行容器',
    '处理路由分发',
    '提供全局状态管理',
    '统一的用户认证和权限控制'
  ]
};
```

### 微应用 (Micro App)

```javascript
// 微应用职责
const microApp = {
  responsibilities: [
    '实现具体的业务功能',
    '暴露生命周期钩子',
    '处理自身的状态管理',
    '与主应用进行通信'
  ]
};
```

### 生命周期

```javascript
// 微应用生命周期
const lifecycle = {
  bootstrap: '应用初始化，只会调用一次',
  mount: '应用挂载，每次进入都会调用',
  unmount: '应用卸载，每次离开都会调用',
  update: '应用更新，可选实现'
};
```

## 通信方式

### 1. Props传递（父→子）

```javascript
// 主应用传递数据给微应用
loadMicroApp({
  name: 'react-app',
  entry: '//localhost:3000',
  container: '#subapp-container',
  props: {
    user: { name: '张三', role: 'admin' },
    theme: { primaryColor: '#1890ff' },
    globalState: globalStateManager
  }
});

// 微应用接收数据
export async function mount(props) {
  const { user, theme, globalState } = props;
  console.log('用户信息:', user);
  console.log('主题配置:', theme);
}
```

### 2. 全局状态（双向通信）

```javascript
// 主应用：初始化全局状态
import { initGlobalState } from 'qiankun';

const actions = initGlobalState({
  user: { name: '张三', role: 'admin' },
  theme: 'dark'
});

// 监听全局状态变化
actions.onGlobalStateChange((state, prev) => {
  console.log('状态变化:', state, prev);
});

// 微应用：使用全局状态
export async function mount(props) {
  const { onGlobalStateChange, setGlobalState } = props;
  
  // 监听状态变化
  onGlobalStateChange((state, prev) => {
    console.log('微应用收到状态变化:', state);
  });
  
  // 更新全局状态
  setGlobalState({ user: { name: '李四', role: 'user' } });
}
```

### 3. 事件总线（自定义实现）

```javascript
// 事件总线实现
class EventBus {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

// 使用示例
const eventBus = new EventBus();
window.eventBus = eventBus; // 挂载到全局

// 微应用A发送消息
window.eventBus.emit('user-login', { userId: 123 });

// 微应用B接收消息
window.eventBus.on('user-login', (data) => {
  console.log('用户登录:', data);
});
```

## 路由管理

### 1. 基于路由的微应用加载

```javascript
// 主应用路由配置
class RouteManager {
  constructor() {
    this.routeConfig = {
      '/dashboard': {
        needMicroApp: true,
        component: 'dashboard',
        microApp: 'react-dashboard'
      },
      '/user-management': {
        needMicroApp: true,
        component: 'user',
        microApp: 'vue-user'
      },
      '/': {
        needMicroApp: false,
        component: 'home'
      }
    };
  }
  
  // 路由变化处理
  async handleRouteChange() {
    const currentPath = window.location.pathname;
    const routeInfo = this.routeConfig[currentPath];
    
    if (routeInfo?.needMicroApp) {
      await this.loadMicroApp(routeInfo.microApp);
    } else {
      await this.unloadMicroApp();
      this.showStaticPage(routeInfo.component);
    }
  }
}
```

### 2. 动态路由匹配

```javascript
// 支持动态路由参数
const dynamicRoutes = [
  {
    path: '/user/:id',
    microApp: 'user-detail',
    component: 'user-detail'
  },
  {
    path: '/product/:category/:id',
    microApp: 'product-detail',
    component: 'product'
  }
];

// 路由匹配函数
function matchRoute(pathname) {
  for (const route of dynamicRoutes) {
    const regex = new RegExp(
      '^' + route.path.replace(/:\w+/g, '([^/]+)') + '$'
    );
    const match = pathname.match(regex);
    
    if (match) {
      return {
        ...route,
        params: extractParams(route.path, match)
      };
    }
  }
  return null;
}
```

### 3. 路由守卫

```javascript
// 路由守卫实现
class RouteGuard {
  constructor() {
    this.guards = [];
  }
  
  // 添加路由守卫
  addGuard(guard) {
    this.guards.push(guard);
  }
  
  // 执行路由守卫
  async executeGuards(to, from) {
    for (const guard of this.guards) {
      const result = await guard(to, from);
      if (result === false) {
        return false; // 阻止路由跳转
      }
    }
    return true;
  }
}

// 使用示例
const routeGuard = new RouteGuard();

// 权限检查守卫
routeGuard.addGuard(async (to, from) => {
  if (to.path.startsWith('/admin') && !user.hasAdminRole) {
    window.location.href = '/login';
    return false;
  }
  return true;
});
```

## 快速入门

### 1. 安装qiankun

```bash
# 在主应用中安装
npm install qiankun
```

### 2. 主应用配置

```javascript
// main.js
import { registerMicroApps, start } from 'qiankun';

// 注册微应用
registerMicroApps([
  {
    name: 'react-app',
    entry: '//localhost:3000',
    container: '#subapp-container',
    activeRule: '/react'
  },
  {
    name: 'vue-app',
    entry: '//localhost:8080',
    container: '#subapp-container',
    activeRule: '/vue'
  }
]);

// 启动qiankun
start();
```

### 3. 微应用配置

```javascript
// 微应用入口文件 public-path.js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 微应用主文件 index.js
import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let root;

function render(props = {}) {
  const { container } = props;
  const dom = container ? container.querySelector('#root') : document.querySelector('#root');
  
  if (!root) {
    root = ReactDOM.createRoot(dom);
  }
  root.render(<App />);
}

// 独立运行时直接渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 导出生命周期函数
export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  const dom = container ? container.querySelector('#root') : document.querySelector('#root');
  if (root) {
    root.unmount();
    root = null;
  }
}
```

### 4. 打包配置

```javascript
// webpack.config.js
const { name } = require('./package');

module.exports = {
  output: {
    library: `${name}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${name}`,
  },
};
```

## 从零搭建微前端项目

### 项目结构设计

```md
qiankun-project/
├── main-app/                 # 主应用
│   ├── src/
│   │   ├── index.html
│   │   ├── index.js
│   │   ├── RouteManager.js
│   │   └── styles.css
│   ├── webpack.config.js
│   └── package.json
├── react-app/                # React微应用
│   ├── src/
│   │   ├── index.js
│   │   ├── App.js
│   │   └── public-path.js
│   ├── webpack.config.js
│   └── package.json
├── vue-app/                  # Vue微应用
│   ├── src/
│   │   ├── main.js
│   │   ├── App.vue
│   │   └── public-path.js
│   ├── vue.config.js
│   └── package.json
└── README.md
```

### 搭建步骤

#### 步骤1: 创建主应用

```bash
# 创建主应用目录
mkdir main-app && cd main-app
npm init -y

# 安装依赖
npm install qiankun webpack webpack-cli webpack-dev-server html-webpack-plugin
```

#### 步骤2: 配置主应用

```html
<!-- src/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>微前端主应用</title>
</head>
<body>
    <div id="app">
        <nav>
            <a href="/" data-route="home">首页</a>
            <a href="/react" data-route="react">React应用</a>
            <a href="/vue" data-route="vue">Vue应用</a>
        </nav>
        <div id="subapp-container"></div>
    </div>
</body>
</html>
```

```javascript
// src/index.js
import { registerMicroApps, start, loadMicroApp } from 'qiankun';

class MainApp {
  constructor() {
    this.currentApp = null;
    this.init();
  }
  
  init() {
    this.registerApps();
    this.bindEvents();
    this.startQiankun();
  }
  
  registerApps() {
    registerMicroApps([
      {
        name: 'react-app',
        entry: '//localhost:3000',
        container: '#subapp-container',
        activeRule: '/react'
      },
      {
        name: 'vue-app',
        entry: '//localhost:8080',
        container: '#subapp-container',
        activeRule: '/vue'
      }
    ]);
  }
  
  bindEvents() {
    document.addEventListener('click', (e) => {
      const route = e.target.getAttribute('data-route');
      if (route) {
        e.preventDefault();
        this.navigateTo(route === 'home' ? '/' : `/${route}`);
      }
    });
  }
  
  navigateTo(path) {
    history.pushState({}, '', path);
    this.handleRouteChange();
  }
  
  handleRouteChange() {
    const path = location.pathname;
    
    if (path === '/') {
      this.showHomePage();
    } else {
      // qiankun会自动处理微应用的加载
    }
  }
  
  showHomePage() {
    document.getElementById('subapp-container').innerHTML = `
      <h1>欢迎使用微前端系统</h1>
      <p>请选择一个应用开始使用</p>
    `;
  }
  
  startQiankun() {
    start({
      prefetch: false,
      singular: true
    });
  }
}

new MainApp();
```

#### 步骤3: 创建React微应用

```bash
# 创建React应用
npx create-react-app react-app
cd react-app

# 安装必要依赖
npm install react-router-dom
```

```javascript
// src/public-path.js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

```javascript
// src/index.js
import './public-path';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

let root;

function render(props = {}) {
  const { container, routerBase } = props;
  const dom = container ? container.querySelector('#root') : document.querySelector('#root');
  
  if (!root) {
    root = ReactDOM.createRoot(dom);
  }
  
  root.render(
    <BrowserRouter basename={routerBase || '/react'}>
      <App />
    </BrowserRouter>
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  const dom = container ? container.querySelector('#root') : document.querySelector('#root');
  if (root) {
    root.unmount();
    root = null;
  }
}
```

#### 步骤4: 配置打包

```javascript
// react-app/craco.config.js
const { name } = require('./package');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        library: `${name}-[name]`,
        libraryTarget: 'umd',
        chunkLoadingGlobal: `webpackJsonp_${name}`,
      };
      return webpackConfig;
    },
  },
  devServer: {
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
```

## 实战案例：JQ主应用+React子应用

### 主应用（jQuery）实现

```javascript
// main-app/src/RouteManager.js
import { registerMicroApps, start, loadMicroApp } from 'qiankun';
import $ from 'jquery';

class RouteManager {
    constructor() {
        this.currentApp = null;
        this.isQiankunStarted = false;
        this.isRouteChanging = false;
        this.routeConfig = this.getRouteConfig();
        this.init();
    }

    getRouteConfig() {
        return {
            '/data-market': {
                needMicroApp: true,
                component: 'data-market',
                title: '数据集市',
                description: '数据资源管理和分析'
            },
            '/analytics': {
                needMicroApp: true,
                component: 'analytics', 
                title: '数据分析',
                description: '智能数据分析工具'
            },
            '/': {
                needMicroApp: false,
                component: 'home',
                title: '首页',
                description: '企业数据平台首页'
            }
        };
    }

    init() {
        this.bindEvents();
        this.handleInitialRoute();
    }

    bindEvents() {
        // 监听浏览器前进后退
        window.addEventListener('popstate', () => {
            this.handleRouteChange();
        });

        // 拦截链接点击和导航项点击
        document.addEventListener('click', (event) => {
            // 处理导航链接点击
            const link = event.target.closest('a[href^="/"], .nav-link');
            if (link && link.getAttribute('href')) {
                event.preventDefault();
                const href = link.getAttribute('href');
                this.navigateTo(href);
                return;
            }
            
            // 处理导航项点击（包括 nav-item 容器）
            const navItem = event.target.closest('.nav-item');
            if (navItem) {
                event.preventDefault();
                const route = navItem.getAttribute('data-route');
                if (route) {
                    const routePath = route === 'home' ? '/' : `/${route}`;
                    this.navigateTo(routePath);
                }
            }
        });
    }

    navigateTo(path) {
        if (window.location.pathname === path) return;
        
        history.pushState({ path }, '', path);
        this.handleRouteChange();
    }

    async handleRouteChange() {
        // 防止并发路由变化
        if (this.isRouteChanging) {
            console.log('路由变化正在进行中，跳过此次请求');
            return;
        }
        
        this.isRouteChanging = true;
        
        try {
            const currentPath = window.location.pathname;
            const routeInfo = this.routeConfig[currentPath];

            console.log('路由变化:', currentPath, routeInfo);

            // 更新导航状态
            this.updateNavigation(currentPath);

            if (!routeInfo) {
                this.show404Page();
                return;
            }

            // 更新页面标题
            document.title = `企业数据平台 - ${routeInfo.title}`;

            if (routeInfo.needMicroApp) {
                console.log('准备加载微应用:', routeInfo.component);
                await this.loadMicroApp(routeInfo.component);
            } else {
                console.log('准备显示静态页面:', routeInfo.component);
                await this.unloadMicroApp();
                this.showStaticPage(routeInfo.component);
            }
        } finally {
            this.isRouteChanging = false;
        }
    }

    async loadMicroApp(component) {
        try {
            console.log('loadMicroApp 开始执行，组件:', component);
            
            // 如果已有应用在运行，先卸载
            if (this.currentApp) {
                console.log('检测到当前应用存在，准备卸载');
                await this.unloadMicroApp();
            }

            // 显示加载状态
            this.showLoading();

            // 启动qiankun（如果还未启动）
            if (!this.isQiankunStarted) {
                await this.startQiankun();
                this.isQiankunStarted = true;
            }

            // 显示微应用容器
            this.showMicroAppContainer();

            // 使用loadMicroApp动态加载
            this.currentApp = loadMicroApp({
                name: `react-app-${component}`, // 使用组件名称作为唯一标识
                entry: '//localhost:3000',
                container: '#subapp-container',
                props: {
                    routerBase: window.location.pathname,
                    component: component,
                    getGlobalState: this.getGlobalState.bind(this)
                }
            });

            // 等待加载完成
            await this.currentApp.mountPromise;
            this.hideLoading();

            console.log(`微应用已加载，组件: ${component}`);

        } catch (error) {
            console.error('加载微应用失败:', error);
            this.hideLoading();
            this.showErrorPage();
        }
    }

    async unloadMicroApp() {
        if (this.currentApp) {
            try {
                console.log('开始卸载微应用...');
                // 设置超时，如果3秒内无法卸载就强制清理
                const unmountPromise = this.currentApp.unmount();
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('卸载超时')), 3000);
                });
                
                await Promise.race([unmountPromise, timeoutPromise]);
                console.log('微应用已卸载');
            } catch (error) {
                console.error('卸载微应用失败:', error);
            } finally {
                // 无论如何都要清空应用引用和容器
                this.currentApp = null;
            }
        }
        
        // 确保清空微应用容器内容
        const $container = $('#subapp-container');
        if ($container.length) {
            $container.empty();
        }
        console.log('微应用容器已清理');
    }

    // 获取全局状态
    getGlobalState() {
        return {
            user: {
                name: '管理员',
                role: 'admin'
            },
            theme: {
                primaryColor: '#48bb78',
                backgroundColor: '#f8fffe'
            }
        };
    }
}

export default RouteManager;
```

### React子应用实现

```javascript
// react-app/src/index.js
import './public-path';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

let root;

function render(props = {}) {
    const { container, routerBase } = props;
    const dom = container ? container.querySelector('#root') : document.querySelector('#root');
    
    console.log('[react-app] 渲染参数:', { container, routerBase, dom });
    
    if (!root && dom) {
        root = ReactDOM.createRoot(dom);
    }
    
    if (root) {
        root.render(
            <BrowserRouter basename={routerBase || '/'}>
                <App {...props} />
            </BrowserRouter>
        );
    }
}

// 独立运行时
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

export async function unmount(props) {
    console.log('[react-app] 应用卸载');
    if (root) {
        root.unmount();
        root = null;
    }
}
```

```javascript
// react-app/src/App.js
import React, { useState, useEffect } from 'react';
import ComponentRouter from './components/ComponentRouter';

function App(props = {}) {
    const [globalState, setGlobalState] = useState(null);
    
    useEffect(() => {
        console.log('App: 接收到props', props);
        
        // 获取全局状态
        if (props.getGlobalState) {
            const state = props.getGlobalState();
            setGlobalState(state);
            console.log('子应用接收到全局状态:', state);
        }
    }, [props]);
    
    return (
        <div className="micro-app">
            <ComponentRouter {...props} />
        </div>
    );
}

export default App;
```

### 组件路由实现

```javascript
// react-app/src/components/ComponentRouter.js
import React from 'react';
import DataMarket from './DataMarket';
import Analytics from './Analytics';
import Reports from './Reports';
import ChartModal from './ChartModal';

const ComponentRouter = (props) => {
    const { component } = props;
    
    console.log('ComponentRouter: 渲染组件', component, props);
    
    const renderComponent = () => {
        switch (component) {
            case 'data-market':
                return <DataMarket {...props} />;
            case 'analytics':
                return <Analytics {...props} />;
            case 'reports':
                return <Reports {...props} />;
            case 'chart-modal':
                return <ChartModal {...props} />;
            default:
                return <div>未知组件: {component}</div>;
        }
    };
    
    return (
        <div className="component-router">
            {renderComponent()}
        </div>
    );
};

export default ComponentRouter;
```

## 常见问题及解决方案

### 1. 路由冲突问题

**问题**：微应用路由与主应用路由冲突

**解决方案**：
```javascript
// 设置路由base
<BrowserRouter basename={props.routerBase || '/micro-app'}>
  <App />
</BrowserRouter>

// 或使用Hash路由
<HashRouter>
  <App />
</HashRouter>
```

### 2. 样式隔离问题

**问题**：微应用样式影响主应用

**解决方案**：
```javascript
// 方案1：启用样式隔离
start({
  sandbox: {
    strictStyleIsolation: true, // 严格样式隔离
    // 或
    experimentalStyleIsolation: true // 实验性样式隔离
  }
});
// 方案2：使用scoped或css module进行样式隔离
```

### 3. 全局变量污染

**问题**：微应用全局变量污染主应用

**解决方案**：
```javascript
// 使用JS沙箱
start({
  sandbox: {
    loose: false // 严格沙箱模式
  }
});

// 或在微应用中避免全局变量
(function() {
  'use strict';
  // 微应用代码
})();
```

### 4. 资源加载问题

**问题**：微应用资源加载失败

**解决方案**：
```javascript
// 设置public-path
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// webpack配置
module.exports = {
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? '/micro-app/' : '/'
  }
};
```

### 5. 通信问题

**问题**：主应用和微应用通信困难

**解决方案**：
```javascript
// 使用全局状态
const actions = initGlobalState({
  user: null,
  msg: ''
});

// 主应用监听
actions.onGlobalStateChange((state, prev) => {
  console.log('主应用收到状态变化:', state);
});

// 微应用使用
export async function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    console.log('微应用收到状态变化:', state);
  });
  
  // 设置状态
  props.setGlobalState({ user: { name: '张三' } });
}
```

### 6. 性能优化

**问题**：微应用加载性能差

**解决方案**：
```javascript
// 预加载
start({
  prefetch: 'all', // 预加载所有微应用
  // 或
  prefetch: ['app1', 'app2'] // 预加载指定应用
});

// 资源缓存
start({
  fetch: (url, ...args) => {
    if (url.includes('/api/')) {
      // API请求不缓存
      return window.fetch(url, ...args);
    }
    // 静态资源缓存
    return window.fetch(url, {
      ...args,
      cache: 'force-cache'
    });
  }
});
```

## 最佳实践

### 1. 应用拆分原则

- **按业务领域拆分**：每个微应用负责一个明确的业务领域
- **保持独立性**：微应用应该能够独立开发、测试、部署
- **合理粒度**：既不要过度拆分，也不要粒度过大

### 2. 技术栈选择

- **主应用**：选择稳定、轻量的技术栈，如原生JS、jQuery
- **微应用**：可以使用不同技术栈，如React、Vue、Angular
- **共同依赖**：将公共库放在主应用中，减少重复加载

### 3. 状态管理

- **局部状态**：微应用内部状态自己管理
- **全局状态**：用户信息、主题等通过qiankun全局状态管理
- **业务状态**：跨应用的业务状态可以通过API或事件总线通信

### 4. 样式规范

- **CSS Module**：推荐使用CSS Module避免样式冲突
- **BEM命名**：使用BEM命名规范
- **作用域隔离**：为每个微应用添加唯一的CSS作用域

### 5. 部署策略

- **独立部署**：每个微应用独立部署到不同域名或路径
- **版本控制**：主应用配置微应用版本，支持灰度发布
- **CDN优化**：静态资源部署到CDN，提高加载速度

### 6. 监控和错误处理

```javascript
// 错误边界
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('微应用错误:', error, errorInfo);
    // 上报错误
    this.reportError(error, errorInfo);
  }

  reportError(error, errorInfo) {
    // 发送错误信息到监控服务
    fetch('/api/error-report', {
      method: 'POST',
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      })
    });
  }

  render() {
    if (this.state.hasError) {
      return <h1>应用出现错误，请刷新页面重试</h1>;
    }

    return this.props.children;
  }
}
```

### 7. 开发调试

```javascript
// 开发环境配置
if (process.env.NODE_ENV === 'development') {
  // 启用详细日志
  start({
    sandbox: { loose: true },
    singular: false,
    prefetch: false,
    fetch: (url, ...args) => {
      console.log('请求URL:', url);
      return window.fetch(url, ...args);
    }
  });
}
```

---

## 总结

qiankun微前端架构为大型前端项目提供了一个优雅的解决方案，通过合理的应用拆分、统一的路由管理、完善的通信机制，可以有效解决大型单体应用的开发和维护难题。

在实际项目中，我们需要根据具体业务需求选择合适的拆分策略，制定统一的开发规范，建立完善的监控和错误处理机制，才能真正发挥微前端架构的优势。

