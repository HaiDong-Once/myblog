

# AI工具开发：用 MCP 协议打通 Chrome 与 Cursor 的数据通道

[[toc]]

<p align="center">
  <img src="https://raw.githubusercontent.com/HaiDong-Once/chrome-agent-bridge/main/packages/chrome-extension/src/images/icon-128.png" alt="Chrome-Agent Bridge转存失败，建议直接上传图片文件" width="80">
</p>

<h1 align="center">Chrome-Agent Bridge</h1>

<p align="center">
  <strong>打通 Chrome 浏览器与 AI Agent IDE 的桥梁 — 点击网页元素，AI 助手直接获取完整信息。</strong>
</p>

## 概述

*   github项目地址：<https://github.com/HaiDong-Once/chrome-agent-bridge>

**使用 AI 编程助手（Cursor、Kiro 等）时，浏览器和 IDE 之间存在明显的断层：**

*   **"照这个做"** — 看到一个漂亮的网页组件，需要手动复制 HTML/CSS 粘贴到聊天窗口，信息丢失、上下文不完整。
*   **"修这个样式"** — 在浏览器发现样式问题，要打开 DevTools → 复制选择器 → 切到 IDE → 搜索文件 → 再跟 AI 解释。

**当前工具实现在浏览器中点击元素 → agent 立刻获得完整信息**：HTML 结构、所有 CSS 样式、截图和完整元数据。并且通过agent中大模型能力自动定位到项目代码位置；

## 使用截图示例：

### 浏览器插件选中元素：打开插件点击-开始选择-选中对应元素-提示【元素已采集】

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8d2de3265e6b49ebae59b640a25630b2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1773153441&x-orig-sign=dFv0RNp6mMoniktQvexJCVJLSaM%3D)

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0049887f982549d7b9bc3cb68786a415~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1773153441&x-orig-sign=J6tE4M9XSKFJsGsNuuwJ7ZR9oJ0%3D)

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/98ed090f58ec40d5af82775486bc6b11~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1773153441&x-orig-sign=pSu7p54%2BWRud4yAvwIq8uceFW7A%3D)

### 获取选中元素信息

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b83898df37f5498297db7e7310dde38a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1773153441&x-orig-sign=XPw83L9ZcNi2oKrGYUuGUE6u3Ss%3D)

### 修改选中的组件和元素

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/02da48d7d6fe42cd8c6f45859a34fe43~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1773153441&x-orig-sign=6fW12c6LiykK2MSjCzXhDUXJIQQ%3D)

### 复刻选中的其他网页样式

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9298150407514cdcb868bb3b2c76c840~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1773153441&x-orig-sign=E%2FgQIMSNSLGTsghiWBnm7KrYlfE%3D)

### **提示词示例**
```
    你:    /chrome-agent-bridge 将现在选中的样式修改为：111111
    Agent: (自动调用 mcp 获取 HTML/CSS/截图)
           根据采集到的元素信息，自定定位当前代码文件位置，自动执行代码修改任务

    你:    /chrome-agent-bridge 我喜欢这个网页上的卡片组件，帮我用 React + Tailwind 实现一个类似的。

    Agent: (自动调用 mcp 获取 完整 HTML/CSS/截图)
           根据采集到的元素信息，这是一个带阴影的圆角卡片，以下是实现代码...
           
    你:    /chrome-agent-bridge 帮我看看刚才选中的按钮用了哪些 CSS 样式

    Agent: (自动调用 get_element_styles)
           这个按钮的主要样式包括 border-radius: 8px, background: linear-gradient(...)...
```

## 接入流程

### **前置条件**

*   **Node.js** >= 18（[下载地址](https://nodejs.org/)，选择 LTS 版本，安装后终端输入 `node -v` 验证）

*   **Chrome** 浏览器（或 Edge、Brave 等 Chromium 内核浏览器）

*   **Cursor** 或 **Kiro** 等支持 MCP 协议的 AI IDE

### **第一步：安装 Chrome 扩展**

1.  从下载浏览器插件

下载位置：
<https://github.com/HaiDong-Once/chrome-agent-bridge/blob/main/chrome-extension-v0.1.0.zip>

2.  解压到本地任意目录（如 `~/chrome-agent-bridge-extension/`）
3.  打开 Chrome，地址栏输入 `chrome://extensions/`
4.  开启右上角的 **「开发者模式」** 开关
5.  点击 **「加载已解压的扩展程序」**
6.  选择刚才解压的文件夹
7.  扩展图标出现在浏览器工具栏中

### **第二步：配置 MCP Server**

MCP Server 由 IDE 自动管理，不需要手动启动。你只需要告诉 IDE 在哪里找到它。

**方法一：远程配置 Cursor** — 编辑 `~/.cursor/mcp.json`：
```json
{
    "mcpServers": {
        "chrome-agent-bridge": {
            "command": "npx",
            "args": ["-y", "@chrome-agent-bridge/mcp-server"]
        }
    }
}
```
配置成功示例：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7ec6c714a3b245c7aa7800c85413d5ad~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1773153441&x-orig-sign=blZyRRI4xRQhs10mdWzeJ0wnpRc%3D)

**方法二：本地安装包配置方式**

下载位置：
<https://github.com/HaiDong-Once/chrome-agent-bridge/blob/main/mcp-server-v0.1.2.zip>
```json
    {
      "mcpServers": {
        "chrome-agent-bridge": {
          "command": "node",
          "args": ["/Users/用户名/文稿/personalCode/chrome-agent-bridge/packages/mcp-server/dist/index.js"],
          "disabled": false,
          "autoApprove": []
        }
      }
    }
```
### **第三步：开始使用**

1.  **确认连接** — 点击浏览器工具栏的扩展图标，查看状态指示器：

    1.  绿色 = MCP Server 在线，可以使用
    2.  灰色 = MCP Server 离线，请确认 IDE 已启动

2.  **采集元素** — 点击「开始选择」→ 鼠标悬停元素会高亮 → 点击目标元素自动采集

3.  **让 AI 使用** — 切到 IDE，直接告诉 AI 你想做什么，它会自动获取采集的数据

### **进阶：配置 Cursor Command 精准触发**

在 Cursor 中，你可以配置一个自定义命令，确保 AI 每次都准确调用 Chrome-Agent Bridge 的 MCP 工具，而不需要你手动描述。

在项目根目录创建文件 `.cursor/commands/chrome-agent-bridge.
```md
    请调用 **chrome-agent-bridge** MCP 获取最新选中元素信息：

    1. **当前选中信息**  
       - 元素的 HTML 结构
       - 样式（styles）
       - 截图（screenshot，base64）
    根据获取的元素dom、样式定位代码位置；
    根据获取的元素dom、样式、截图参考UI；

    2. **若没有选中元素**  
       提示用户先去浏览器选中元素再操作

    请直接执行上述步骤，无需再向我确认。
```
## **功能特性**

*   **点击即采集** — 鼠标悬停预览高亮，点击自动采集，无需打开 DevTools
*   **自动截图** — 裁剪选中元素区域的截图
*   **完整** **CSS** **提取** — 计算样式、匹配的 CSS 规则、媒体查询、样式来源
*   **完整** **HTML** **和元数据** — outerHTML、DOM 路径、class、属性，一应俱全
*   **MCP 协议集成** — 兼容所有支持 MCP 的 IDE（Cursor、Kiro 等）
*   **零依赖 HTTP 服务** — 轻量 Node.js 原生实现，无框架依赖
*   **仅限本地通信** — 所有数据在本机流转，不会发送到外部网络
*   **纯** **内存** **存储** — 不写入磁盘，最多缓存 20 条记录，自动淘汰最旧数据

## **工作原理**
```
    ┌─────────────────────────────────────────────────────────────┐
    │                     Chrome 浏览器                            │
    │                                                             │
    │   点击元素 → Content Script 采集 HTML/CSS/截图/元数据         │
    │                        ↓                                    │
    │              Background Service Worker                      │
    │                        ↓                                    │
    └────────────────── HTTP POST ────────────────────────────────┘
                             ↓  localhost:19816
    ┌─────────────────────────────────────────────────────────────┐
    │                    MCP Server (Node.js)                      │
    │                                                             │
    │   HTTP Server → 验证数据 → Data Store (内存缓存, 最多 20 条)  │
    │                                  ↓                          │
    │                            MCP Tools ──── stdio ──→ Agent IDE│
    └─────────────────────────────────────────────────────────────┘
```
1.  在 Chrome 中点击元素 → 扩展自动采集 HTML、CSS、截图和元数据

2.  数据通过 HTTP POST 发送到本地 MCP Server

3.  AI 助手通过 MCP 工具查询数据 — 全自动，无需复制粘贴

## **项目结构**
```
    chrome-agent-bridge/
    ├── packages/
    │   ├── shared/                  # 共享 TypeScript 类型定义
    │   │   └── src/types.ts         # CapturedElementData, ExtMessage 等
    │   ├── mcp-server/              # MCP Server（HTTP 接收 + MCP 协议暴露）
    │   │   └── src/
    │   │       ├── index.ts         # 入口 — 启动 HTTP + MCP 双服务
    │   │       ├── http-server.ts   # HTTP 端点: /ping, /capture
    │   │       ├── data-store.ts    # 内存缓存（最多 20 条）
    │   │       ├── mcp-tools.ts     # MCP 工具定义
    │   │       └── validator.ts     # 请求数据校验
    │   └── chrome-extension/        # Chrome 扩展（Manifest V3）
    │       └── src/
    │           ├── content.ts       # 元素选择器、采集逻辑、浮动面板 UI
    │           ├── background.ts    # Service Worker — 消息路由、HTTP 传输
    │           └── popup.ts         # Popup UI — 状态检测、选择器开关
    ├── vitest.config.ts             # 测试配置
    ├── pnpm-workspace.yaml          # pnpm monorepo 配置
    └── tsconfig.base.json           # TypeScript 基础配置
```
***

## **MCP 工具参考**

配置完成后，AI 助手可以使用以下工具：

| 工具                       | 参数        | 说明                         |
| ------------------------ | --------- | -------------------------- |
| `get_selected_element`   | `id?`（可选） | 获取元素完整信息（HTML、CSS、元数据）+ 截图 |
| `get_element_screenshot` | `id?`（可选） | 获取元素截图（Base64 JPEG）        |
| `get_element_styles`     | `id?`（可选） | 获取 CSS 详情：计算样式 + 匹配规则及选择器  |
| `list_captured_elements` | —         | 列出缓存中所有已采集元素的摘要            |

不传 `id` 时，默认返回最近一次采集的元素。

## **采集数据详情**

| 数据类型      | 内容                          |
| --------- | --------------------------- |
| HTML      | 元素及子元素的完整 `outerHTML`       |
| 计算样式      | 浏览器计算后的所有 CSS 属性值           |
| 匹配 CSS 规则 | 选择器、属性、媒体查询、样式表来源           |
| 截图        | 元素边界框的裁剪 JPEG 截图            |
| 元数据       | 标签名、class 列表、ID、所有属性、DOM 路径 |
| 页面上下文     | 来源页面 URL 和标题                |

## **常见问题**

### mcp显示 "MCP Server 离线"

*   确认 IDE（Cursor/Kiro）已启动且 MCP 配置正确。MCP Server 由 IDE 自动管理，不需要手动启动。在 IDE 的 MCP 面板中检查 `chrome-agent-bridge` 的服务状态。
*   检查端口 19816 被占用？
*   查找并关闭占用端口的进程后然后重启 IDE。

```
    lsof -i :19816    # macOS/ Linux
    kill <PID>
```