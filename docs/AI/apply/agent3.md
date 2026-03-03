


# AI 应用开发：知识库助手前端设计 - mock先行模式
[[toc]]

## 一、整体架构设计

### 1.1 技术栈

- **框架**: Nuxt 3 (Vue 3 + TypeScript)
- **状态管理**: Pinia
- **UI组件库**: Element Plus + Nuxt UI
- **样式方案**: Tailwind CSS + SCSS
- **路由**: Nuxt Router (Hash模式)
- **国际化**: Vue I18n

### 1.2 项目结构

```md
pages/                    # 页面层
  ├── person-knowledge/   # 个人知识库首页
  │   └── index.vue
  ├── knowledge-chat/      # 对话页
  │   └── [groupId].vue
  └── ...

components/              # 组件层
  ├── person-knowledge/   # 知识库相关组件
  │   ├── KnowledgeHeader.vue
  │   ├── KnowledgeSearchBar.vue
  │   ├── RecentChatList.vue
  │   ├── CategoryFilter.vue
  │   └── KnowledgeMasonry.vue
  └── ...

composables/             # 逻辑层（Hooks）
  ├── person-knowledge/  # 知识库相关逻辑
  │   ├── useFileUpload.ts
  │   ├── useCategory.ts
  │   ├── useFilePreview.ts
  │   └── useChatHistory.ts
  └── ...

stores/                  # 状态管理
  ├── person-knowledge.ts
  └── ...

utils/                   # 公用函数
  ├── fileUtils.ts
  ├── validation.ts
  └── ...
```

### 1.3 页面路由设计

```md
路由结构:
├── /person-knowledge (首页)
│   └── 知识库管理页面
│
├── /knowledge-chat/[groupId] (对话详情页)
│   └── 聊天对话页面
│
└── /person-knowledge/preview/[fileId] (文件预览页)
    └── 文件预览页面
```

---

## 二、页面层设计

### 2.1 首页 (person-knowledge/index.vue)

**页面结构图:**

```md
┌─────────────────────────────────────┐
│  系统状态栏 (原生)                   │
├─────────────────────────────────────┤
│  KnowledgeHeader (Header栏)          │
│  [返回] [标题] [搜索] [添加文件]      │
├─────────────────────────────────────┤
│  KnowledgeSearchBar (AI搜索输入框)   │
│  [AI图标] [输入框] [发送按钮]         │
├─────────────────────────────────────┤
│  RecentChatList (历史记录列表)        │
│  - 固定高度，溢出滚动                 │
├─────────────────────────────────────┤
│  CategoryFilter (文件分类栏)          │
│  [All] [Business] [Tech] ... [New]  │
│  - 吸顶效果 (sticky)                 │
├─────────────────────────────────────┤
│  KnowledgeMasonry (文件瀑布流)       │
│  - 无限滚动加载                       │
│  - 下拉刷新                           │
└─────────────────────────────────────┘
```

**页面职责:**

- 管理整体布局和滚动行为
- 协调子组件间的数据传递
- 处理页面级状态（分类切换、搜索跳转等）

**数据流:**

```md
用户操作 → 组件事件 → 页面处理 → Store更新 → 组件响应
```

### 2.2 对话详情页 (knowledge-chat/[groupId].vue)

**页面结构图:**

```md
┌─────────────────────────────────────────────┐
│  系统状态栏 (原生)                            │
├─────────────────────────────────────────────┤
│  ChatHeader (Header栏)                       │
│  [返回] [标题/副标题]                          │
├──────┬──────────────────────────────────────┤
│ 侧边栏│  主聊天区域                            │
│(收起) │  ┌────────────────────────────────┐ │
│[历史] │  │ 用户消息 (右侧)                   │ │
│      │  │ AI消息 (左侧)                      │ │
│      │  │ 知识库推荐                         │ │
│      │  └────────────────────────────────┘ │
│      │                                      │
│      │  底部输入框                           │
│      │  [AI图标] [输入框] [发送]             │
└──────┴──────────────────────────────────────┘
```

**侧边栏展开状态:**

```md
┌──────┬──────────────────────────────────────┤
│ 侧边栏│  主聊天区域 (宽度自适应)               │
│(展开) │                                      │
│[New] │                                      │
│[分类] │                                      │
│  - Business                                 │
│  - Technology                               │
│[History]                                    │
│  - 历史记录1                                 │
│  - 历史记录2                                 │
│[查看全部]                                    │
└──────┴──────────────────────────────────────┘
```

---

## 三、组件层设计

### 3.1 首页组件树

```md
person-knowledge/index.vue
├── KnowledgeHeader
│   ├── 返回按钮
│   ├── 标题
│   ├── 搜索入口
│   └── 添加文件入口 → 触发上传工具浮窗
│
├── UploadToolPopup (上传工具浮窗)
│   ├── File选项 → 文件选择器
│   │   └── 支持类型：PDF、Markdown、TXT
│   ├── Image选项 → 图片选择器
│   │   └── 支持类型：.jpg, .png, .webp
│   └── Link选项 → 添加链接弹窗
│
├── AddLinkDialog (添加链接弹窗)
│   ├── URL输入框
│   ├── Cancel按钮
│   └── Add按钮
│
├── UploadStatusDialog (上传状态弹窗)
│   ├── 标题栏 (标题/收起/展开/关闭)
│   └── 文件列表表格
│       ├── Name列
│       ├── Category列
│       ├── Size列
│       ├── Status列 (进度条/状态文字)
│       └── Actions列 (删除/重试)
│
├── KnowledgeSearchBar
│   ├── AI图标
│   ├── 输入框
│   └── 发送按钮
│
├── RecentChatList
│   └── ChatItem[] (历史记录项)
│
├── CategoryFilter
│   ├── CategoryChip[] (分类标签)
│   ├── NewCategory按钮 → 新建分类弹窗
│   └── 展开/收起按钮
│
├── CreateCategoryDialog (新建分类弹窗)
│   ├── Category Name输入框 (字符计数)
│   ├── Category Description输入框 (字符计数)
│   ├── Cancel按钮
│   └── Create按钮
│
└── KnowledgeMasonry
    └── FileCard[] (文件卡片)
        └── 点击 → 文件预览页
```

### 3.2 对话页组件树

```md
knowledge-chat/[groupId].vue
├── ChatHeader
│   ├── 返回按钮
│   ├── 标题区域
│   └── 文档图标
│
├── ChatSidebar (侧边栏)
│   ├── 侧边栏展开/收起按钮
│   ├── NewChat按钮
│   ├── CategorySection[] (分类分组：可展开收起)
│   │   └── ChatItem[] (历史记录)
│   ├── HistoryAll (全部历史)
│       └── ChatItem[]
└── ChatMainArea (主聊天区域)
    ├── MessageList
    │   ├── UserMessage (用户消息气泡)
    │   ├── AIMessage (AI消息气泡)
    │   │   ├── 文本内容
    │   │   ├── 引用链接
    │   │   └── KnowledgeRecommendations (知识库推荐列表)
    |   |   ├── 消息loading
    │   └── MessageActions (操作按钮)
    │       ├── 收藏
    │       ├── 导出/分享
    │       └── 分享
    └── ChatInput (底部输入框)
        ├── AI图标
        ├── 输入框
        └── 发送按钮
```

### 3.3 文件预览页组件

```md
file-preview/[fileId].vue
├── PreviewHeader
│   ├── 返回按钮
│   └── 文件名
│
└── PreviewContent (根据文件类型渲染)
    ├── ImagePreview (图片预览)
    ├── PDFPreview (PDF预览)
    ├── WordPreview (Word预览)
    ├── TextPreview (文本预览)
    ├── MarkdownPreview (Markdown预览)
    └── LinkPreview (链接预览)
```

### 3.4 核心组件设计

#### 3.4.1 UploadStatusDialog (上传状态弹窗)

**状态机设计:**

```md
文件状态流转:
┌─────────────┐
│  pending    │ (待上传)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ uploading   │ (上传中, 0-100%)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ parsing     │ (AI解析中, 0-100%)
└──────┬──────┘
       │
       ▼
┌─────────────┐      ┌─────────────┐
│  success    │      │   failed    │
└─────────────┘      └─────────────┘
```

**数据结构:**

```typescript
interface UploadFile {
  id: string
  name: string
  category?: string
  size: string
  status: 'pending' | 'uploading' | 'parsing' | 'success' | 'failed'
  progress: number  // 0-100
  error?: string
}
```

#### 3.4.2 CategoryFilter (分类栏)

**吸顶逻辑:**

```md
滚动位置 < 分类栏原始位置
  → 正常显示

滚动位置 >= 分类栏原始位置
  → 固定到顶部 (position: sticky, top: 0)
  → 添加阴影效果
```

#### 3.4.3 KnowledgeMasonry (文件瀑布流)

**无限滚动逻辑:**

```md
滚动到底部阈值
  → 触发加载更多
  → 显示加载状态
  → 追加新数据
```

---

## 四、样式层设计

### 4.1 设计系统（根据ui稿更新）

**颜色系统:**

```scss
// 主色调
$primary: #000000;        // 黑色主题
$secondary: #6B7280;      // 灰色

// 功能色
$success: #10B981;        // 成功 (绿色)
$error: #EF4444;          // 错误 (红色)
$warning: #F59E0B;        // 警告 (橙色)
$info: #3B82F6;           // 信息 (蓝色)

// 背景色
$bg-primary: #FFFFFF;      // 主背景
$bg-secondary: #F5F6F8;   // 次背景
$bg-hover: #F9FAFB;       // 悬停背景

// 文字色
$text-primary: #1F2937;    // 主文字
$text-secondary: #6B7280; // 次文字
$text-disabled: #9CA3AF;  // 禁用文字
```

**间距系统:**

```scss
$spacing: (
  xs: 4px,
  sm: 8px,
  md: 16px,
  lg: 24px,
  xl: 32px,
  xxl: 48px
);
```

**字体系统:**

```scss
$font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
$font-size: (
  xs: 12px,
  sm: 13px,
  base: 14px,
  md: 16px,
  lg: 20px,
  xl: 24px
);
```

### 4.2 组件样式规范（根据UI稿更新）

**按钮样式:**

- Primary: 黑色背景，白色文字
- Secondary: 白色背景，黑色边框
- Icon: 无背景，仅图标

**卡片样式:**

- 白色背景
- 圆角: 8px
- 阴影: 轻微阴影
- 悬停: 阴影加深

**输入框样式:**

- 边框: 1px solid #E5E7EB
- 圆角: 8px
- 聚焦: 边框变黑
- 错误: 红色下划线

### 4.3 响应式设计

**断点:**

```scss
$breakpoints: (
  mobile: 375px,
  tablet: 768px,
  desktop: 1024px,
  wide: 1440px
);
```

**适配策略:**

- 响应式

---

## 五、逻辑层（Composables/Hooks）设计

### 5.1 文件上传相关

#### useFileUpload.ts

```typescript
export const useFileUpload = () => {
  // 状态
  const uploadQueue = ref<UploadFile[]>([])
  const isUploading = ref(false)
  
  // 方法
  const addFiles = (files: File[]) => { }
  const uploadFile = async (file: File) => { }
  const cancelUpload = (fileId: string) => { }
  const retryUpload = (fileId: string) => { }
  const removeFile = (fileId: string) => { }
  const addLink = async (url: string) => { }
  
  return {
    uploadQueue,
    isUploading,
    addFiles,
    uploadFile,
    cancelUpload,
    retryUpload,
    removeFile,
    addLink
  }
}
```

**支持的文件类型:**
- **文件上传**: PDF、Markdown (.md)、TXT (.txt)
- **图片上传**: .jpg, .png, .webp

**上传流程:**

```md
选择文件
  → 添加到队列
  → 创建上传任务
  → 开始上传 (监听进度)
  → 上传完成
  → 开始AI解析 (监听进度)
  → 解析完成
  → 更新文件列表
```

### 5.2 分类管理相关

#### useCategory.ts

```typescript
export const useCategory = () => {
  const categories = ref<Category[]>([])
  const activeCategory = ref<string>('All')
  
  const fetchCategories = async () => { }
  const createCategory = async (data: CreateCategoryData) => { }
  const switchCategory = (categoryName: string) => { }
  
  return {
    categories,
    activeCategory,
    fetchCategories,
    createCategory,
    switchCategory
  }
}
```

### 5.3 文件预览相关

#### useMarkdown.ts

```typescript
/**
 * Markdown 渲染 Hook
 */
export const useMarkdown = () => {
  return {
    renderMarkdown,
    useMarkdownContent
  }
}
```

**文件类型判断:**

```md
文件扩展名/MIME类型
  → 判断文件类型
  → 返回对应预览组件
  → 加载预览内容
```

### 5.4 聊天相关

#### useChatHistory.ts

```typescript
export const useChatHistory = () => {
  const historyList = ref<ChatHistory[]>([])
  const currentChat = ref<Chat | null>(null)
  
  const fetchHistory = async (category?: string) => { }
  const loadChat = async (chatId: string) => { }
  
  return {
    historyList,
    currentChat,
    fetchHistory,
    loadChat
  }
}
```

#### useChatMessage.ts

```typescript
export const useChatMessage = () => {
  const messages = ref<Message[]>([])
  const isSending = ref(false)
  
  const createChat = async () => { }
  const sendMessage = async (content: string, files?: File[]) => { }
  
  return {
    messages,
    isSending,
    createChat,
    sendMessage
  }
}
```

### 5.5 UI交互相关

#### useSticky.ts (吸顶效果)

```typescript
export const useSticky = (elementRef: Ref<HTMLElement>, offset = 0) => {
  const isSticky = ref(false)
  
  onMounted(() => {
    const observer = new IntersectionObserver(...)
    // 监听滚动，判断是否吸顶
  })
  
  return { isSticky }
}
```

#### useInfiniteScroll.ts (无限滚动)

```typescript
export const useInfiniteScroll = (
  callback: () => Promise<void>,
  options?: { threshold?: number }
) => {
  const isLoading = ref(false)
  const hasMore = ref(true)
  
  const loadMore = async () => { }
  
  onMounted(() => {
    // 监听滚动事件
  })
  
  return { isLoading, hasMore, loadMore }
}
```

#### useAutoScroll.ts(自动触底滚动)
```ts
/**
 * 自动滚动到底部的 Hook
 * @param messages 消息列表
 * @param isSending 是否正在发送消息
 * @param loading 是否正在加载消息（可选）
 */
export const useAutoScroll = (
  messages: Ref<any[]>, 
  isSending: Ref<boolean>,
  loading?: Ref<boolean>
) => {}
```

---

## 六、公用函数设计

### 6.1 文件工具 (utils/fileUtils.ts)

```typescript
// 格式化文件大小
export function formatFileSize(bytes: number): string

// 获取文件类型
export function getFileType(filename: string): string

// 判断是否为图片
export function isImageFile(file: File | string): boolean

// 文件类型图标映射
export function getFileIcon(fileType: string): string
```

### 6.2 验证工具 (utils/validation.ts)

```typescript
// URL验证
export function isValidUrl(url: string): boolean

// 文件名验证
export function isValidFileName(name: string): boolean

// 分类名称验证
export function validateCategoryName(name: string): {
  valid: boolean
  error?: string
}

// 文件大小验证
export function validateFileSize(
  file: File, 
  maxSize: number
): { valid: boolean; error?: string }
```

---

## 七、API接口设计（Mock先行方案）

### 7.1 设计背景

由于接口文档在开发阶段尚未完成，需要设计一套方案使得：
- 前端可以独立开发，不依赖后端接口
- 接入真实接口时改动最小
- 保证类型安全和代码质量

### 7.2 核心设计思路

**分层抽象 + Mock数据 + 类型先行**

1. **类型定义先行**: 先定义所有接口的类型，业务代码基于类型开发
2. **服务层抽象**: 业务代码调用服务层，不直接调用API
3. **Mock数据层**: 开发阶段使用Mock，生产环境切换为真实API
4. **适配器模式**: Mock和真实API实现同一接口，切换成本低

### 7.3 架构设计

```md
业务层 (Composables/Stores)
    ↓ 调用
API服务接口层 (IPersonKnowledgeApi)
    ↓ 实现
┌─────────────────┬─────────────────┐
│  Mock API实现    │   真实API实现    │
│ (mock-api.ts)   │  (real-api.ts)  │
└─────────────────┴─────────────────┘
    ↓                ↓
Mock数据文件      真实后端接口
(mocks/*.json)    (HTTP请求)
```

### 7.4 类型定义层

**文件位置**: `types/person-knowledge/api-types.ts`

```typescript
/**
 * 统一响应结构
 */
export interface ApiResponse<T> {
  code: string | number
  message?: string
  data: T
  trace_id?: string
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page?: number
  page_size?: number
}

/**
 * 分类相关类型
 */
export interface Category {
  id: string
  name: string
  description?: string
  created_at?: string
  updated_at?: string
}

export interface CreateCategoryRequest {
  name: string
  description?: string
}

export interface UpdateCategoryRequest {
  name?: string
  description?: string
}

/**
 * 文件相关类型
 */
export interface FileItem {
  id: string
  name: string
  category?: string
  category_id?: string
  size: number
  size_formatted?: string
  type: string
  url?: string
  thumbnail_url?: string
  created_at: string
  updated_at?: string
  status?: 'pending' | 'uploading' | 'parsing' | 'success' | 'failed'
  progress?: number
  error?: string
}

export interface FileListParams {
  category?: string
  page?: number
  page_size?: number
  keyword?: string
}

/**
 * 上传相关类型
 */
export interface UploadProgress {
  file_id: string
  progress: number
  status: 'uploading' | 'parsing' | 'success' | 'failed'
  error?: string
}

export interface UploadResponse {
  file_id: string
  file_name: string
  file_size: number
  ingest_result?: {
    is_completed?: boolean
    read_words?: number
  }
}

/**
 * 聊天相关类型
 */
export interface ChatHistory {
  id: string
  group_id: string
  title: string
  category?: string
  category_id?: string
  last_message?: string
  created_at: string
  updated_at: string
  message_count?: number
}

export interface Message {
  id: string
  chat_id: string
  content: string
  role: 'user' | 'assistant'
  created_at: string
  citations?: Citation[]
  knowledge_recommendations?: KnowledgeRecommendation[]
}

export interface Citation {
  id: string
  title: string
  url: string
  snippet: string
  page?: number
}

export interface KnowledgeRecommendation {
  id: string
  title: string
  url: string
  snippet: string
  similarity_score?: number
}

export interface SendMessageRequest {
  content: string
  files?: string[] // file_ids
}

/**
 * API 端点定义（用于类型检查）
 */
export interface PersonKnowledgeApiEndpoints {
  // 分类
  getCategories: () => Promise<ApiResponse<Category[]>>
  createCategory: (data: CreateCategoryRequest) => Promise<ApiResponse<Category>>
  updateCategory: (id: string, data: UpdateCategoryRequest) => Promise<ApiResponse<Category>>
  deleteCategory: (id: string) => Promise<ApiResponse<void>>
  
  // 文件
  getFiles: (params: FileListParams) => Promise<ApiResponse<PaginatedResponse<FileItem>>>
  getFileDetail: (id: string) => Promise<ApiResponse<FileItem>>
  deleteFile: (id: string) => Promise<ApiResponse<void>>
  updateFile: (id: string, data: Partial<FileItem>) => Promise<ApiResponse<FileItem>>
  
  // 上传
  uploadFile: (file: File, onProgress?: (progress: number) => void) => Promise<ApiResponse<UploadResponse>>
  uploadLink: (url: string) => Promise<ApiResponse<UploadResponse>>
  
  // 聊天
  getChatHistory: (category?: string) => Promise<ApiResponse<ChatHistory[]>>
  getChatDetail: (chatId: string) => Promise<ApiResponse<Message[]>>
  createChat: () => Promise<ApiResponse<{ chat_id: string; group_id: string }>>
  sendMessage: (chatId: string, data: SendMessageRequest) => Promise<ApiResponse<Message>>
  deleteChat: (chatId: string) => Promise<ApiResponse<void>>
}
```

### 7.5 API服务接口层

**文件位置**: `composables/person-knowledge/api-interface.ts`

```typescript
import type { PersonKnowledgeApiEndpoints } from '@/types/person-knowledge/api-types'

/**
 * API 服务接口
 * Mock 和真实 API 都实现这个接口
 */
export interface IPersonKnowledgeApi extends PersonKnowledgeApiEndpoints {
  // 可以添加一些通用的方法
  isMock?: boolean
}

/**
 * API 服务工厂
 * 根据环境返回 Mock 或真实 API
 */
export function createPersonKnowledgeApi(): IPersonKnowledgeApi {
    const useMock = process.env.USE_MOCK_API
    
    if (useMock) {
      return useMockPersonKnowledgeApi()
    } else {
      return useRealPersonKnowledgeApi()
    }
}

// 导出单例，供业务代码使用
export const personKnowledgeApi = createPersonKnowledgeApi()
```

### 7.6 Mock API实现

**文件位置**: `composables/person-knowledge/mock-api.ts`

**核心特点:**
- 模拟网络延迟（300-1000ms）
- 内存数据存储（可持久化到localStorage）
- 支持进度回调（上传等场景）
- 完整的CRUD操作模拟

**实现要点:**
```typescript
export function useMockPersonKnowledgeApi(): IPersonKnowledgeApi {
  // 模拟延迟
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  
  // 模拟数据存储（内存中）
  const mockDataStore = {
    categories: ref<Category[]>([...mockCategories]),
    files: ref<FileItem[]>([...mockFiles]),
    chatHistory: ref<ChatHistory[]>([...mockChatHistory]),
    messages: ref<Record<string, Message[]>>({}),
  }
  
  return {
    isMock: true,
    // 实现所有接口方法...
  }
}
```

### 7.7 真实API实现

**文件位置**: `composables/person-knowledge/real-api.ts`

**核心特点:**
- 使用项目现有的 `useApi` 和 `useApiUpload` 封装
- 统一的错误处理
- 类型安全的请求和响应

**实现要点:**
```typescript
export function useRealPersonKnowledgeApi(): IPersonKnowledgeApi {
  const baseURL = '/api/person-knowledge' // 根据实际接口路径调整
  
  return {
    isMock: false,
    // 实现所有接口方法，调用真实后端...
  }
}
```

### 7.8 业务层使用示例

**文件位置**: `composables/person-knowledge/useCategory.ts`

业务代码只依赖接口，不关心是Mock还是真实API：

```typescript
import { personKnowledgeApi } from './api-interface'
import type { Category, CreateCategoryRequest } from '@/types/person-knowledge/api-types'

export function useCategory() {
  const categories = ref<Category[]>([])
  const activeCategory = ref<string>('All')
  const loading = ref(false)
  
  const fetchCategories = async () => {
    loading.value = true
    try {
      const response = await personKnowledgeApi.getCategories()
      if (response.code === 200) {
        categories.value = response.data
      }
    } catch (error) {
      console.error('获取分类失败:', error)
    } finally {
      loading.value = false
    }
  }
  
  const createCategory = async (data: CreateCategoryRequest) => {
    try {
      const response = await personKnowledgeApi.createCategory(data)
      if (response.code === 200) {
        categories.value.push(response.data)
        return response.data
      }
    } catch (error) {
      console.error('创建分类失败:', error)
      throw error
    }
  }
  
  return {
    categories,
    activeCategory,
    loading,
    fetchCategories,
    createCategory,
  }
}
```

### 7.9 Mock数据文件结构

```md
mocks/
  └── person-knowledge/
      ├── categories.json      # 分类Mock数据
      ├── files.json          # 文件列表Mock数据
      └── chat-history.json   # 聊天历史Mock数据
```

**Mock数据示例** (`mocks/person-knowledge/categories.json`):
```json
[
  {
    "id": "cat_1",
    "name": "Business",
    "description": "商业相关文档",
    "created_at": "2024-01-01T00:00:00Z"
  },
  {
    "id": "cat_2",
    "name": "Technology",
    "description": "技术相关文档",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### 7.10 环境配置

**`.env` 文件配置:**
```bash
# 是否使用 Mock API（开发阶段）
USE_MOCK_API=true
```

**`nuxt.config.ts` 配置:**
```typescript
runtimeConfig: {
  public: {
    // ... 其他配置
    useMockApi: process.env.USE_MOCK_API === 'true',
  }
}
```

### 7.11 接入真实接口时的改动清单

当后端接口文档完成后，接入真实接口只需要：

1. **修改 `real-api.ts`**
   - 调整API端点URL
   - 调整请求参数格式（如需要）
   - 调整响应数据处理（如需要）

2. **调整类型定义**（如字段名不同）
   - 在 `api-types.ts` 中更新类型
   - 或添加数据转换层（Adapter）

3. **切换环境变量**
   - 将 `USE_MOCK_API=false`
   - 或删除该环境变量（默认使用真实API）

4. **验证和测试**
   - 对比Mock和真实API的响应差异
   - 调整业务逻辑（如需要）

### 7.12 方案优势

1. **类型安全**: TypeScript类型约束，减少运行时错误
2. **完全解耦**: 业务代码不依赖具体实现，易于切换
3. **切换简单**: 只需修改环境变量即可切换Mock/真实API
4. **并行开发**: 前端不阻塞，后端可独立开发
5. **测试友好**: Mock数据便于测试各种场景和边界情况
6. **改动最小**: 接入真实接口时只需修改API实现层

### 7.13 注意事项

1. **Mock数据质量**: Mock数据应尽量贴近真实数据结构，减少后续调整
2. **类型对齐**: 类型定义需与后端对齐（可先按设计文档定义，后续微调）
3. **错误处理**: Mock和真实API的错误处理保持一致
4. **进度模拟**: 上传等需要进度的接口，Mock也要模拟进度回调
5. **数据持久化**: 如需测试数据持久化，Mock可使用localStorage
6. **流式数据**: 如需要流式响应（SSE），Mock也需要模拟流式输出

---

## 八、状态管理设计

### 8.1 PersonKnowledgeStore

**设计原则**：纯状态管理，只负责管理状态和提供简单的状态更新方法，不包含业务逻辑。业务逻辑（如 API 调用）在 composables 中处理。

```typescript
export const usePersonKnowledgeStore = defineStore('personKnowledge', () => {
  // ========== 分类相关状态 ==========
  const categories = ref<Category[]>([])
  const activeCategory = ref<string>('All')
  const categoriesLoading = ref(false)
  const isSubmittingCategory = ref(false)
  
  // ========== 聊天历史相关状态 ==========
  const chatHistory = ref<ChatHistory[]>([])
  const historyLoading = ref(false)
  
  // ========== 上传相关状态 ==========
  const uploadQueue = ref<UploadFile[]>([])
  const isUploading = ref(false)
  const uploadTimers = ref<Record<string, NodeJS.Timeout>>({})
  
  // ========== 分类相关 Mutations（纯状态更新） ==========
  const setCategories = (items: Category[]) => { }
  const setActiveCategory = (name: string) => { }
  const setCategoriesLoading = (loading: boolean) => { }
  const setIsSubmittingCategory = (submitting: boolean) => { }
  const addCategory = (category: Category) => { }
  
  // ========== 聊天历史相关 Mutations（纯状态更新） ==========
  const setChatHistory = (items: ChatHistory[]) => { }
  const setHistoryLoading = (loading: boolean) => { }
  const addChatHistoryItem = (item: ChatHistory) => { }
  const updateChatHistoryItem = (chatId: string, updates: Partial<ChatHistory>) => { }
  const removeChatHistoryItem = (chatId: string) => { }
  
  // ========== 上传相关 Mutations（纯状态更新） ==========
  const addUploadFile = (file: UploadFile) => { }
  const addUploadFiles = (files: UploadFile[]) => { }
  const updateUploadFile = (fileId: string, updates: Partial<UploadFile>) => { }
  const removeUploadFile = (fileId: string) => { }
  const setIsUploading = (uploading: boolean) => { }
  const setUploadTimer = (fileId: string, timer: NodeJS.Timeout | undefined) => { }
  const clearUploadTimer = (fileId: string) => { }
  const filterUploadQueue = (predicate: (file: UploadFile) => boolean) => { }
  
  return {
    // state
    categories,
    activeCategory,
    categoriesLoading,
    isSubmittingCategory,
    chatHistory,
    historyLoading,
    uploadQueue,
    isUploading,
    uploadTimers,
    // mutations
    setCategories,
    setActiveCategory,
    setCategoriesLoading,
    setIsSubmittingCategory,
    addCategory,
    setChatHistory,
    setHistoryLoading,
    addChatHistoryItem,
    updateChatHistoryItem,
    removeChatHistoryItem,
    addUploadFile,
    addUploadFiles,
    updateUploadFile,
    removeUploadFile,
    setIsUploading,
    setUploadTimer,
    clearUploadTimer,
    filterUploadQueue,
  }
})
```

**说明**：
- Store 只负责状态管理，不包含 API 调用等业务逻辑
- 文件列表相关状态（files, fileLoading, filePage, hasMoreFiles）在组件中管理，不在 Store 中
- 上传对话框的 UI 状态（uploadDialogVisible, uploadDialogCollapsed）在组件中管理
- uploadTimers 用于管理上传进度轮询的定时器

### 8.2 KnowledgeChatStore

**设计原则**：管理聊天相关的全局状态，支持乐观更新和流式输出。

```typescript
export const useKnowledgeChatStore = defineStore('knowledgeChat', () => {
  // ========== 当前聊天相关 ==========
  const currentChatId = ref<string | null>(null)
  const currentGroupId = ref<string | null>(null)
  
  // ========== 消息相关状态（全局共享） ==========
  const messages = ref<Message[]>([])           // 本地消息（乐观更新）
  const serverMessages = ref<Message[]>([])     // 服务器返回的消息
  const isSending = ref(false)
  const isLoadingMessages = ref(false)
  
  // ========== 合并后的消息列表（computed） ==========
  const allMessages = computed(() => {})
  
  // ========== 侧边栏相关 ==========
  const sidebarVisible = ref(true)
  const sidebarCollapsed = ref(false)
  
  // ========== Actions ==========
  const setCurrentChat = (chatId: string, groupId?: string) => { }
  const clearCurrentChat = () => { }
  const addLocalMessage = (message: Message) => { }
  const setServerMessages = (msgs: Message[]) => { }
  const clearLocalMessages = () => { }
  const updateMessage = (tempId: string, newMessage: Message) => { }
  const updateMessageContent = (messageId: string, content: string) => { }
  const removeMessage = (messageId: string) => { }
  const setIsSending = (sending: boolean) => { }
  const setIsLoadingMessages = (loading: boolean) => { }
  const toggleSidebar = () => { }
  const toggleSidebarCollapsed = () => { }
  const setSidebarCollapsed = (collapsed: boolean) => { }
  
  return {
    // state
    currentChatId,
    currentGroupId,
    messages: allMessages,  // 返回合并后的消息
    isSending,
    isLoadingMessages,
    sidebarVisible,
    sidebarCollapsed,
    // actions
    setCurrentChat,
    clearCurrentChat,
    addLocalMessage,
    setServerMessages,
    clearLocalMessages,
    updateMessage,
    updateMessageContent,
    removeMessage,
    setIsSending,
    setIsLoadingMessages,
    toggleSidebar,
    toggleSidebarCollapsed,
    setSidebarCollapsed,
  }
})
```

**说明**：
- **消息合并机制**：使用 `allMessages` computed 属性自动合并服务器消息和本地乐观更新的消息
- **乐观更新**：本地消息（`messages`）用于立即显示用户发送的消息，提升用户体验
- **流式输出支持**：`updateMessageContent` 方法支持流式更新消息内容，用于 AI 回复的实时显示
- **currentGroupId**：支持群组聊天场景，区分单个聊天和群组聊天
- **消息状态分离**：`serverMessages` 存储从服务器加载的历史消息，`messages` 存储本地新增的消息

---

## 九、数据流设计

### 9.1 首页数据流

```md
用户操作流程:
1. 页面加载
   → fetchCategories()
   → fetchFiles('All')
   → fetchChatHistory('All')

2. 切换分类
   → switchCategory(name)
   → fetchFiles(name, reset: true)
   → fetchChatHistory(name)

3. 上传文件
   → addFiles([File])
   → addToUploadQueue()
   → 自动打开上传状态弹窗
   → 开始上传流程

4. 搜索跳转
   → 输入问题
   → 点击发送
   → 创建新聊天
   → 跳转到对话页
   → 历史记录侧边栏：打开对应分类历史记录tab-选中状态
```

### 9.2 对话页数据流

```md
用户操作流程:
1. 进入对话页
   → loadChat(chatId)
   → fetchMessages(chatId)
   → 渲染消息列表

2. 发送消息
   → sendMessage(content, files?)
   → 显示用户消息
   → 调用API
   → loadChat(chatId)（更新历史消息）
   → 流式接收AI回复（接收新消息）
   → 更新消息列表

3. 侧边栏操作
   → toggleSidebar()
   → fetchChatHistory()
   → 点击历史记录
   → loadChat(newChatId)
```

---

## 十、关键实现细节

### 10.1 上传进度监听

**方案:**

- 使用 XMLHttpRequest 或 fetch + ReadableStream
- 监听 upload progress 事件
- 实时更新进度条

### 10.2 流式消息接收

**方案:**

- 使用 Server-Sent Events (SSE) 或 WebSocket
- 逐字接收AI回复
- 实时更新消息内容

### 10.3 文件预览实现

**方案:**

- 图片: 直接使用 `<img>` 标签
- PDF: 使用 `pdf.js` 或 `vue-pdf`
- Word: 后端转换为HTML，前端渲染
- Markdown: 使用 `markdown-it` 渲染
- 文本: 使用代码高亮库

### 10.4 无限滚动优化（后续考虑）

**方案:**

- 使用 Intersection Observer API
- 虚拟滚动 (如果列表很长)
- 防抖处理滚动事件

---

## 十一、开发优先级

### Phase 1: 基础框架

1. 页面路由和布局
2. 基础组件 (Header, Button, Input等)
3. 状态管理基础结构

### Phase 2: 首页功能

1. 文件分类栏
2. 文件瀑布流
3. 历史记录列表
4. AI搜索输入框

### Phase 3: 上传功能

1. 上传工具浮窗
2. 上传状态弹窗
3. 文件上传逻辑
4. 链接添加功能

### Phase 4: 分类管理

1. 新建分类弹窗
2. 分类CRUD操作
3. 分类切换逻辑

### Phase 5: 对话功能

1. 对话页布局
2. 侧边栏
3. 消息发送和接收
4. 流式消息处理

### Phase 6: 文件预览

1. 文件预览页
2. 多种文件类型预览
3. 文件操作 (下载、分享、删除等)

### Phase 7: 优化和测试

1. 性能优化
2. 错误处理
3. 用户体验优化
4. 测试和修复

---

## 十二、注意事项

1. **性能优化**

   - 大文件上传使用分片上传
   - 图片使用懒加载
   - 列表使用虚拟滚动 (如需要)

2. **错误处理**

   - 网络错误重试机制
   - 友好的错误提示
   - 错误日志记录

3. **用户体验**

   - 加载状态提示
   - 操作反馈 (成功/失败)
   - 防抖和节流处理

4. **兼容性**

   - 浏览器兼容性考虑
   - 移动端适配
   - 响应式设计

5. **安全性**

   - 文件类型验证
   - 文件大小限制
   - XSS防护
   - CSRF防护