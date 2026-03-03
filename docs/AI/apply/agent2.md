


# Agent @在线文档功能 - 前端交互与代码设计方案

[[toc]]

## 目录

- [功能概述](#功能概述)
- [前端交互设计](#前端交互设计)
- [代码架构设计](#代码架构设计)
- [核心实现细节](#核心实现细节)
- [可复用性说明](#可复用性说明)
- [最佳实践](#最佳实践)

---

## 功能概述

Agent @在线文档功能允许用户在输入框中通过输入 `@` 符号触发文件选择，从知识库中选择文件并附加到消息中。该功能采用组件化设计，具有良好的可维护性和可复用性。

### 核心特性

- ✅ `@` 符号触发文件选择浮窗
- ✅ 实时搜索文件列表（防抖优化）
- ✅ 文件标签展示与删除
- ✅ 智能定位浮窗位置
- ✅ 骨架屏加载动画
- ✅ 平滑过渡动画

---

## 前端交互设计

### 1. 交互流程图

```md
用户输入 @ 符号
    ↓
检测到 @ 符号
    ↓
显示文件选择浮窗（骨架屏）
    ↓
请求文件列表 API
    ↓
用户继续输入（搜索关键词）
    ↓
防抖请求（300ms）
    ↓
更新文件列表
    ↓
用户选择文件
    ↓
插入文件标签（移除 @ 及后续文本）
    ↓
关闭浮窗
    ↓
发送消息时携带 ref_docs
```

### 2. 交互状态设计

#### 2.1 浮窗显示状态

| 状态 | 条件 | UI表现 |
|------|------|--------|
| 初始加载 | `loading=true && fileList.length=0` | 骨架屏动画 |
| 有数据加载 | `loading=true && fileList.length>0` | 列表半透明（opacity-50） |
| 正常显示 | `loading=false && fileList.length>0` | 正常显示文件列表 |
| 空状态 | `loading=false && fileList.length=0` | 显示"暂无文件" |

#### 2.2 浮窗定位逻辑

```md
@ 符号位置计算：
1. 获取 textarea 的 DOM 位置
2. 计算 @ 符号在文本中的行数和列数
3. 使用 Canvas 测量文本宽度（精确）
4. 计算浮窗 left 位置 = paddingLeft + 文本宽度 + 8px
5. 边界检查：确保不超出输入框右侧
```

#### 2.3 触发与关闭条件

**触发条件：**
- 输入 `@` 符号
- 存在 `thread_group_id`（已开始对话）
- `@` 后无空格

**关闭条件：**
- `@` 后输入空格
- 删除 `@` 符号
- 点击浮窗外区域
- 选择文件后
- 发送消息后

### 3. 用户体验优化

#### 3.1 防抖优化
- 使用 `lodash.debounce`，延迟 300ms
- 避免频繁请求，提升性能

#### 3.2 动画优化
- 使用 Vue `<Transition>` 组件
- 延迟清空数据（300ms），避免动画闪烁
- 骨架屏平滑加载动画

#### 3.3 视觉反馈
- 文件标签 hover 效果
- 删除按钮 hover 高亮
- 浮窗列表项 hover 背景变化

---

## 代码架构设计

### 1. 架构分层

```md
┌─────────────────────────────────────┐
│      SearchInput.vue (容器组件)      │
│  - 集成 FileTagList                 │
│  - 集成 FileDropdown                │
│  - 使用 useFileMention composable   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   useFileMention.ts (业务逻辑层)     │
│  - 状态管理                          │
│  - API 调用                          │
│  - 事件处理                          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   FileTagList.vue (展示组件)         │
│   FileDropdown.vue (交互组件)        │
│   utils/common.ts (工具函数)         │
└─────────────────────────────────────┘
```

### 2. 组件职责划分

#### 2.1 `useFileMention` Composable

**职责：** 封装所有文件 @ 相关的业务逻辑

**状态管理：**
```typescript
- showFileDropdown: 浮窗显示状态
- selectedFiles: 已选文件列表
- fileList: 文件列表数据
- isLoadingFiles: 加载状态
- dropdownPosition: 浮窗位置
- atSymbolIndex: @ 符号位置索引
```

**核心方法：**
```typescript
- handleInputChange(): 处理输入变化，检测 @ 符号
- fetchFileList(): 获取文件列表
- updateDropdownPosition(): 更新浮窗位置
- selectFile(): 选择文件
- removeFile(): 删除文件
- closeDropdown(): 关闭浮窗
- getSelectedFiles(): 获取已选文件
- clearSelectedFiles(): 清空已选文件
- cleanup(): 清理资源
```

#### 2.2 `FileTagList` 组件

**职责：** 展示已选文件标签

**Props：**
```typescript
files: string[]  // 文件列表
```

**Events：**
```typescript
remove: (file: string) => void  // 删除文件
```

**特性：**
- 自动换行布局
- 文件图标显示
- 删除交互

#### 2.3 `FileDropdown` 组件

**职责：** 文件选择浮窗

**Props：**
```typescript
visible: boolean              // 显示状态
position: { left: number }    // 位置
fileList: string[]            // 文件列表
loading: boolean              // 加载状态
```

**Events：**
```typescript
select: (file: string) => void  // 选择文件
```

**特性：**
- 骨架屏加载
- 空状态提示
- 过渡动画
- 列表滚动

#### 2.4 `getFileIcon` 工具函数

**职责：** 根据文件扩展名返回对应图标

**支持格式：**
- PDF: `file-pdf.svg`
- Word: `file-word.svg` (doc, docx)
- Text: `file-text.svg` (txt, md)
- Default: `file.svg`

---

## 核心实现细节

### 1. @ 符号检测与处理

```typescript
const handleInputChange = (value: string, cursorPos?: number) => {
  const actualCursorPos = cursorPos ?? (textareaRef.value?.$el?.querySelector('textarea')?.selectionStart ?? value.length)
  const textBeforeCursor = value.substring(0, actualCursorPos)
  const lastAtIndex = textBeforeCursor.lastIndexOf('@')
  
  // 检查 @ 符号后是否有空格
  if (lastAtIndex >= 0) {
    const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1)
    if (textAfterAt.includes(' ')) {
      closeDropdown()
    } else {
      // 显示浮窗并请求文件列表
      atSymbolIndex.value = lastAtIndex
      const searchKeyword = textAfterAt.trim()
      updateDropdownPosition()
      showFileDropdown.value = true
      debouncedFetchFileList(searchKeyword)
    }
  } else {
    closeDropdown()
  }
}
```

**关键点：**
- 使用 `lastIndexOf` 找到最后一个 `@` 符号
- 检查 `@` 后是否有空格来决定是否关闭浮窗
- 使用防抖函数避免频繁请求

### 2. 浮窗位置计算

```typescript
const updateDropdownPosition = () => {
  nextTick(() => {
    const textarea = textareaRef.value?.$el?.querySelector('textarea') as HTMLTextAreaElement
    if (!textarea) return

    const cursorPos = textarea.selectionStart
    const textBeforeCursor = searchText.value.substring(0, cursorPos)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    
    if (lastAtIndex < 0) return

    // 计算 @ 符号在文本中的位置
    const textareaRect = textarea.getBoundingClientRect()
    const style = getComputedStyle(textarea)
    const paddingLeft = parseFloat(style.paddingLeft) || 20
    
    // 计算行数和列数
    const textBeforeAt = searchText.value.substring(0, lastAtIndex)
    const lines = textBeforeAt.split('\n')
    const lastLine = lines[lines.length - 1]
    
    // 使用 canvas 测量文本宽度（更准确）
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    let left = 0
    if (context) {
      context.font = `${style.fontSize} ${style.fontFamily}`
      const textWidth = context.measureText(lastLine).width
      left = paddingLeft + textWidth + 8  // @ 符号右侧位置
    }
    
    // 边界检查
    const maxLeft = textareaRect.width - 280
    if (left > maxLeft) {
      left = maxLeft
    }
    
    dropdownPosition.value = { left }
  })
}
```

**关键点：**
- 使用 `Canvas.measureText()` 精确测量文本宽度
- 考虑多行文本的情况
- 边界检查防止浮窗超出输入框

### 3. 文件选择与文本替换

```typescript
const selectFile = (fileName: string) => {
  if (selectedFiles.value.includes(fileName)) {
    return
  }
  
  selectedFiles.value.push(fileName)
  
  // 移除 @ 符号及后续文本
  if (atSymbolIndex.value >= 0) {
    const textBeforeAt = searchText.value.substring(0, atSymbolIndex.value)
    const textAfterAt = searchText.value.substring(atSymbolIndex.value)
    const spaceIndex = textAfterAt.indexOf(' ')
    const remainingText = spaceIndex > 0 ? textAfterAt.substring(spaceIndex) : ''
    
    const newText = textBeforeAt + remainingText
    
    // 更新文本
    if (onTextUpdate) {
      onTextUpdate(newText)
    } else {
      searchText.value = newText
    }
    
    // 关闭浮窗并设置光标位置
    closeDropdown()
    nextTick(() => {
      const textarea = textareaRef.value?.$el?.querySelector('textarea') as HTMLTextAreaElement
      if (textarea) {
        const newCursorPos = textBeforeAt.length
        textarea.focus()
        textarea.setSelectionRange(newCursorPos, newCursorPos)
      }
    })
  }
}
```

**关键点：**
- 移除 `@` 符号及后续文本（直到空格）
- 保留空格后的文本
- 选择文件后自动聚焦并设置光标位置

### 4. 骨架屏加载优化

```jsx
<!-- 加载中骨架屏 -->
<div v-if="loading && fileList.length === 0" class="file-dropdown-skeleton">
  <div v-for="i in 3" :key="i" class="skeleton-item">
    <div class="skeleton-icon"></div>
    <div class="skeleton-text"></div>
  </div>
</div>

<!-- 有数据时加载 -->
<div v-else class="file-dropdown-list" :class="{ 'opacity-50': loading }">
  <!-- 文件列表 -->
</div>
```

**关键点：**
- 首次加载显示骨架屏（`fileList.length === 0`）
- 有数据时加载显示半透明（`opacity-50`）
- 避免数据闪烁

### 5. 延迟清理数据

```typescript
const closeDropdown = () => {
  showFileDropdown.value = false
  atSymbolIndex.value = -1
  // 延迟清空数据，避免动画过程中内容突然消失
  setTimeout(() => {
    if (!showFileDropdown.value) {
      fileList.value = []
    }
  }, 300)
}
```

**关键点：**
- 延迟 300ms 清空数据（与动画时长一致）
- 检查浮窗状态，避免重复清空

---

## 可复用性说明

### 1. Composable 设计模式

`useFileMention` 采用 Vue 3 Composition API 设计，具有以下优势：

- **解耦业务逻辑**：将文件 @ 功能从组件中抽离
- **易于测试**：纯函数逻辑，便于单元测试
- **可复用**：可在任何需要文件 @ 功能的组件中使用

**使用示例：**

```typescript
const fileMention = useFileMention({
  textareaRef,
  searchText,
  getThreadGroupId: () => store.threadGroupId,
  onTextUpdate: (newText: string) => {
    searchText.value = newText
  }
})
```

### 2. 组件化设计

#### FileTagList 组件

**适用场景：** 任何需要展示文件标签列表的地方

**扩展性：**
- 可添加更多交互（如拖拽排序）
- 可自定义样式（通过 props 或插槽）
- 可添加文件预览功能

#### FileDropdown 组件

**适用场景：** 任何需要文件选择下拉框的地方

**扩展性：**
- 可添加文件搜索高亮
- 可添加文件分类筛选
- 可添加文件预览功能

### 3. 工具函数复用

`getFileIcon` 函数可在整个项目中复用：

```typescript
import { getFileIcon } from '@/utils/common'

// 使用
const icon = getFileIcon('document.pdf')  // 返回 PDF 图标路径
```

**扩展性：**
- 可添加更多文件类型支持
- 可支持自定义图标映射
- 可支持图标缓存

### 4. API 接口设计

文件列表接口设计：

```typescript
GET /thread_group/{thread_group_id}/citations?title={title}
```

**参数说明：**
- `thread_group_id`: 会话组 ID（必需）
- `title`: 搜索关键词（可选）

**响应格式：**
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "ref_docs": ["file1.pdf", "file2.docx"]
  }
}
```

### 5. 状态管理集成

与 Pinia Store 集成：

```typescript
const searchResultStore = useMetaSearchResultStore()
const threadGroupId = getThreadGroupId() || searchResultStore.currTreadGroupId
```

**优势：**
- 自动获取当前会话 ID
- 状态集中管理
- 易于调试

---

## 最佳实践

### 1. 性能优化

- ✅ **防抖处理**：使用 `lodash.debounce` 避免频繁请求
- ✅ **延迟清理**：延迟清空数据，避免动画闪烁
- ✅ **条件渲染**：使用 `v-if` 而非 `v-show` 减少 DOM 节点
- ✅ **骨架屏**：首次加载显示骨架屏，提升用户体验

### 2. 用户体验

- ✅ **视觉反馈**：hover 效果、加载状态、空状态提示
- ✅ **平滑动画**：使用 Vue Transition 组件
- ✅ **智能定位**：浮窗位置跟随 @ 符号
- ✅ **边界处理**：防止浮窗超出可视区域

### 3. 代码质量

- ✅ **类型安全**：使用 TypeScript 定义接口
- ✅ **职责分离**：Composable、组件、工具函数各司其职
- ✅ **错误处理**：API 请求错误处理和用户提示
- ✅ **资源清理**：组件卸载时清理防抖函数

### 4. 可维护性

- ✅ **单一职责**：每个组件/函数只做一件事
- ✅ **命名规范**：清晰的变量和函数命名
- ✅ **注释文档**：关键逻辑添加注释
- ✅ **代码复用**：抽取公共逻辑到 composable 和工具函数

### 5. 扩展建议

**未来可扩展功能：**

1. **文件预览**
   - 点击文件标签预览文件内容
   - 浮窗中显示文件摘要

2. **文件分类**
   - 按文件类型分组显示
   - 添加分类筛选功能

3. **搜索高亮**
   - 高亮显示匹配的文本
   - 支持模糊匹配

4. **批量操作**
   - 支持批量选择文件
   - 支持拖拽排序

5. **历史记录**
   - 记录最近使用的文件
   - 快速选择历史文件

---

## 总结

Agent @在线文档功能采用**组件化 + Composable** 的架构设计，实现了：

- ✅ **清晰的职责划分**：业务逻辑、UI 组件、工具函数分离
- ✅ **良好的可复用性**：可在其他项目中快速复用
- ✅ **优秀的用户体验**：流畅的动画、智能的定位、完善的反馈
- ✅ **易于维护扩展**：模块化设计，便于后续功能扩展

该设计方案可作为类似功能的参考模板，适用于任何需要"@提及"功能的场景。

---

## 相关文件

- `composables/ai-search/useFileMention.ts` - 业务逻辑层
- `components/ai-search/FileTagList.vue` - 文件标签组件
- `components/ai-search/FileDropdown.vue` - 文件选择下拉框组件