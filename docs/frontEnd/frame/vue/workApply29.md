

# Vue Keep-Alive 对 Iframe 内部页面留存无效问题分析
[[toc]]

## 背景

在使用 Vue 的 `keep-alive` 功能时，发现普通组件（如 input 输入框）的状态可以正常保留，但 iframe 内部的页面导航状态无法保留。例如：

- ✅ Input 输入的内容在切换 tab 后保留
- ❌ Iframe 中从首页导航到子页面后，切换 tab 再回来，iframe 重新加载回首页

本文档分析原因并提供解决方案。

---

## 原因分析

### Keep-Alive 工作原理

Vue 的 `keep-alive` 通过以下机制实现组件缓存：

1. **停用时（组件被隐藏）**
   - 将组件的真实 DOM 从文档树中移除（`removeChild`）
   - 将 VNode 和 DOM 元素缓存到内存中
   - 组件实例不销毁，触发 `onDeactivated` 钩子

2. **激活时（组件被显示）**
   - 从内存缓存中取出 DOM 元素
   - 将 DOM 重新插入到文档树中（`appendChild`）
   - 不重新创建组件实例，触发 `onActivated` 钩子

**关键点：Keep-Alive 保存的是真实 DOM 节点，而不是重新渲染。**

### 普通组件 vs Iframe 对比

| 特性 | 普通组件（Input） | Iframe 组件 |
|------|------------------|-------------|
| **DOM 元素** | ✅ 保留 | ✅ 保留 |
| **DOM 属性** | ✅ 保留（如 value） | ✅ 保留（如 src） |
| **组件状态** | ✅ 保留（响应式数据） | ✅ 保留（响应式数据） |
| **内部文档** | N/A | ❌ 丢失 |
| **浏览器上下文** | N/A | ❌ 重新初始化 |

### 为什么 Iframe 特殊？

```javascript
// 普通 Input 元素
<input value="hello" />
// DOM 被移除再插入，value 属性保留在 DOM 节点中 ✅

// Iframe 元素
<iframe src="https://example.com" />
// DOM 被移除时：
// 1. iframe 元素本身保留 ✅
// 2. src 属性保留 ✅
// 3. 但浏览器会卸载 iframe 的文档上下文 ❌
// 4. iframe 的浏览历史被清空 ❌
// 5. 重新插入时，浏览器重新加载 src ❌
```

**核心原因：**

Iframe 的内部文档是浏览器的独立进程/上下文，不属于 DOM 节点的属性。当 iframe 的 DOM 从文档树中移除时，浏览器会：
- 卸载 iframe 的文档
- 清空 iframe 的浏览历史
- 释放 iframe 的 JavaScript 上下文

当 iframe 重新插入文档时，浏览器会重新加载 `src` 指定的 URL，就像打开一个新的 iframe。

---

## 解决方法

要保留 iframe 的内部状态，必须让 iframe 的 DOM **始终保留在文档树中**，而不是移除。

### 方案对比

| 方案 | 原理 | Iframe 状态 | 性能 | 推荐度 |
|------|------|------------|------|--------|
| Keep-Alive | DOM 移除/插入 | ⚠️ iframe 会重新加载 | 优 | ❌ |
| display: none | CSS 隐藏 | ✅ iframe 保持状态 | 中 | ⭐⭐⭐ |
| v-show | CSS 隐藏（语法糖） | ✅ iframe 保持状态 | 中 | ⭐⭐⭐ |
| 绝对定位 + z-index | 层级控制 | ✅ iframe 保持状态 | 优 | ⭐⭐⭐ |

---

## 解决方法代码示例

### 示例1: 使用 `v-show`（Vue 语法）
 **不要使用 Keep-Alive** 来缓存包含 iframe 的组件，改用 CSS 方案，
需要将 iframe页面 独立于路由页面外部管理

```vue
<template>
  <div id="app">
    <div class="nav">
      <router-link class="router" to="/Iframe">Go to F1</router-link>
    </div>
    
    <keep-alive>
      <!-- Vue的路由 -->
      <router-view></router-view>
    </keep-alive>
    
    <!-- iframe页面(路由页面外部） -->
    <Iframe v-show="$route.path == '/Iframe'"></Iframe>
  </div>
</template>

<script>
import Iframe from './components/Iframe';
export default {
  name: 'app',
  components: {
    Iframe,
  },
}
</script>

```

## 总结

1. **Vue Keep-Alive 无法保留 iframe 内部状态**，因为 iframe 的文档上下文在 DOM 移除时会被浏览器卸载

2. **解决方案核心思想**：让 iframe 的 DOM 始终保留在文档树中，使用 CSS 控制显示/隐藏

---

## 参考资料

- [Vue Keep-Alive 官方文档](https://vuejs.org/guide/built-ins/keep-alive.html)
- [MDN: HTMLIFrameElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement)
- [浏览器渲染原理](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work)
