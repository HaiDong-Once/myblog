
# Vue弹窗组件改造：从模板调用到JS函数调用实现
[[toc]]

## 前言

在Vue项目开发中，弹窗组件是必不可少的UI组件之一。传统的弹窗使用方式通常需要在模板中声明组件，
然后通过响应式数据控制显示隐藏。这种方式虽然直观，但在某些场景下使用起来不够灵活和便捷。
本文将介绍如何将传统的模板弹窗组件改造为支持JS函数调用的方式，提供更加灵活和便捷的使用体验。

## 核心实现解析

### 1. 基础弹窗组件 (MyDialog.vue)

首先，我们有一个基础的弹窗组件，基于Vant UI的Dialog组件封装：

```jsx
<template>
  <div class="dialog" ref="mydialog">
    <van-dialog
      v-model="isShow"
      :showConfirmButton="false"  
      :width="rwidth"
      @opened="opened"
      :close-on-click-overlay="overlay"
      :before-close="beforeClose"
    >
      <div slot="default">
        <slot name="mydefault" v-if="$slots.mydefault" />
        <template v-else>
          <div :class="title ? 'hasTitle' : 'noTitle'">
            {{ title }}
            <img
              src="@/assets/imgs/detail-icon-x.png" 
              class="icon_close"
              @click="hideDialog"
              v-if="closedable"
            />
          </div>
          <div class="content" :class="{ defaultPadding: !contentPadding }">
            <slot />
          </div>
        </template>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  name: "MyDialog",
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  model: {
    prop: 'show',
    event: 'hide'
  },
  props: ["title", "width", "show", "closedable", "contentPadding", "noOverlay"],
  // ... 其他实现
}
</script>
```

### 2. JS调用工具函数 (dialog.js)

这是改造的核心部分，通过Vue.extend()动态创建组件实例：

```javascript
import Vue from 'vue'
import MyDialog from '@/components/MyDialog.vue'

/**
 * 公共dialog弹窗 js调用版
 * @param {Object} options 配置项
 * @param {string} [options.title='提示'] 标题
 * @param {string} options.content 内容
 * @param {number} [options.width=960] 弹窗宽度
 * @param {boolean} [options.closedable=true] 是否可关闭
 * @param {boolean} [options.showCancel=true] 是否显示取消按钮
 * @param {boolean} [options.showConfirm=true] 是否显示确认按钮
 * @param {string} [options.cancelText='取消'] 取消按钮文本
 * @param {string} [options.confirmText='确定'] 确认按钮文本
 * @param {boolean} [options.isHtml=false] 内容是否为HTML
 * @param {Function} [options.onClose] 关闭回调
 * @param {Function} [options.onCancel] 取消回调
 * @param {Function} [options.onConfirm] 确认回调
 * @returns {Object} dialog实例，包含close方法用于关闭弹窗
 */
export function showDialog(options = {}) {
  // 创建一个div容器
  const container = document.createElement('div')
  document.body.appendChild(container)

  // 创建组件构造器
  const DialogConstructor = Vue.extend({
    components: {
      MyDialog
    },
    data() {
      return {
        show: true,
        title: options.title || '提示',
        content: options.content || '',
        width: options.width || 960,
        closedable: options.closedable ?? true,
        showCancel: options.showCancel ?? true,
        showConfirm: options.showConfirm ?? true,
        cancelText: options.cancelText || '取消',
        confirmText: options.confirmText || '确定',
        isHtml: options.isHtml ?? false
      }
    },
    methods: {
      handleClose() {
        options.onClose?.call(this)
        this.close()
      },
      handleCancel() {
        // 回调返回false时阻止自动关闭
        const shouldClose = options.onCancel?.call(this)
        if (shouldClose !== false) {
          this.close()
        }
      },
      handleConfirm() {
        // 回调返回false时阻止自动关闭
        const shouldClose = options.onConfirm?.call(this)
        if (shouldClose !== false) {
          this.close()
        }
      },
      close() {
        this.show = false
        // 等待过渡动画结束后销毁
        setTimeout(() => {
          destroy()
        }, 300)
      },
      // 创建内容VNode
      createContent(h) {
        if (this.isHtml) {
          return h('div', {
            style: {
              fontSize: '16px',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              marginTop: '20px',
              lineHeight: '24px'
            },
            domProps: {
              innerHTML: this.content
            }
          })
        }
        return h('div', {
          style: {
            fontSize: '16px',
            color: '#666',
            textAlign: 'center',
            marginBottom: '40px',
            marginTop: '20px',
            lineHeight: '24px'
          }
        }, this.content)
      }
    },
    render(h) {
      return h('my-dialog', {
        props: {
          show: this.show,
          title: this.title,
          width: this.width,
          closedable: this.closedable
        },
        on: {
          hide: () => {
            this.handleClose()
          }
        }
      }, [
        h('div', {
          style: {
            padding: '20px 15px'
          }
        }, [
          // 内容区域
          this.createContent(h),
          // 底部按钮区域
          h('div', {
            style: {
              display: 'flex',
              justifyContent: 'center',
              gap: '20px'
            }
          }, [
            this.showCancel && h('div', {
              style: {
                minWidth: '120px',
                height: '46px',
                background: '#f5f5f5',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                paddingLeft: '10px',
                paddingRight: '10px',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
              },
              on: { click: this.handleCancel }
            }, this.cancelText),
            this.showConfirm && h('div', {
              style: {
                minWidth: '120px',
                height: '46px',
                background: '#327bf9',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                paddingLeft: '10px',
                paddingRight: '10px',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
              },
              on: { click: this.handleConfirm }
            }, this.confirmText)
          ].filter(Boolean))
        ])
      ])
    }
  })

  // 挂载组件
  const instance = new DialogConstructor().$mount(container)

  // 销毁方法
  function destroy() {
    instance.$destroy()
    container.remove()
  }

  // 返回实例和控制方法
  return {
    instance,
    close: () => instance.close(),
    updateContent: (content) => {
      instance.content = content
    },
    updateTitle: (title) => {
      instance.title = title
    }
  }
}
```

## 核心技术要点

### 1. Vue.extend() 动态创建组件

```javascript
const DialogConstructor = Vue.extend({
  // 组件选项
})
const instance = new DialogConstructor().$mount(container)
```

使用Vue.extend()创建组件构造器，然后实例化并挂载到DOM中。这样可以在运行时动态创建组件实例。

### 2. render函数实现灵活渲染

通过render函数而不是模板来创建组件，可以更加灵活地控制组件的渲染逻辑：

```javascript
render(h) {
  return h('my-dialog', {
    props: { /* props */ },
    on: { /* events */ }
  }, [
    // 子节点
  ])
}
```

### 3. 回调机制控制弹窗关闭

```javascript
handleConfirm() {
  const shouldClose = options.onConfirm?.call(this)
  if (shouldClose !== false) {
    this.close()
  }
}
```

通过检查回调函数的返回值来决定是否自动关闭弹窗，返回`false`时阻止自动关闭。

### 4. 内存管理

```javascript
function destroy() {
  instance.$destroy()
  container.remove()
}
```

确保组件销毁时正确清理内存，避免内存泄漏。

## 使用示例

改造后的弹窗使用变得非常简洁：

### 1. 基础用法

```javascript
import { showDialog } from "@/utils/dialog";

// 简单提示
showDialog({
  title: '提示',
  content: '操作成功！',
  showCancel: false
});

// 确认对话框
showDialog({
  title: '确认删除',
  content: '确定要删除这条数据吗？',
  onConfirm() {
    console.log("用户点击确定");
    // 执行删除逻辑
    deleteData();
  },
  onCancel() {
    console.log("用户点击取消");
  }
});
```

### 2. HTML内容渲染

```javascript
showDialog({
  title: '详细信息',
  content: `
    <div style="color: red; font-weight: bold;">
      重要提示
    </div>
    <p>这是一段包含HTML标签的内容</p>
  `,
  isHtml: true
});
```

### 3. 异步控制关闭

```javascript
const dialog = showDialog({
  title: "处理中", 
  content: "正在提交数据，请稍候...",
  showCancel: false,
  showConfirm: false
});

// 模拟异步操作
setTimeout(() => {
  dialog.updateContent("提交成功！");
  setTimeout(() => {
    dialog.close();
  }, 1000);
}, 2000);
```

### 4. 阻止自动关闭

```javascript
showDialog({
  title: "表单验证",
  content: "请确认信息无误后提交",
  onConfirm() {
    // 执行表单验证
    if (!validateForm()) {
      alert("表单验证失败，请检查输入");
      return false; // 返回false阻止弹窗关闭
    }
    // 验证通过，允许关闭
    submitForm();
  }
});
```

## 改造效果对比

### 改造前（模板方式）
- ❌ 需要在每个组件中声明弹窗组件
- ❌ 需要维护多个响应式状态
- ❌ 代码冗余，复用性差
- ❌ 模板复杂度高

### 改造后（JS调用方式）
- ✅ 一行代码即可调用弹窗
- ✅ 无需维护额外状态
- ✅ 高度可复用
- ✅ API简洁清晰
- ✅ 支持动态配置
- ✅ 支持异步控制

## 优化思考
- ❌路由切换时需要做好组件销毁或隐藏