# Cursor工作流探索第一篇：前端开发效率提升，从DTC到全流程AI赋能

[[toc]]


## **一、概要介绍**

![image\_3.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/758cc60af3e4417585c3befad9dcaff2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=dutl1N72j0KIXIFo6cuzCeX2rB0%3D)


## **二、背景**

### **前端开发过程中主要痛点**

**视图层-ui还原:design to code（DTC)**

*   特点：低难度高耗时
*   耗时占比：无复用组件情况下占总开发时间50%左右
*   工作流程：
    *   分析ui并设计html结构；
    *   html css按结构插入（重复性）
    *   样式微调提升还原度和兼容适配；

**逻辑层-复杂逻辑模块设计和开发：**

*   说明：前端项目中的业务逻辑、工具和模块等
*   特点：高难度，高耗时，对开发人员知识储备和经验要求较高
*   工作流程：
    *   调研和评估方案
    *   方案结构设计
    *   功能开发和测试

**交付层-自测覆盖率不足：**

*   特点：目前工作流程对测试人员依赖度较高，开发自测覆盖率提高需花费较多时间成本
*   耗时工作内容：测试用例梳理，单测代码编写，测试数据准备

### **上一代ai辅助工具简介（cursor问世之前）**

**Copilot**

*   介绍：最初由微软和 openAi 发布的代码辅助工具（付费）
*   主要能力：代码补全，内置ai问答
*   特点：
    *   根据代码上下文自动生成代码片段，
    *   识别当前代码中的错误，提供修复建议
    *   通过问答窗口解释、修改、生成代码片段
    *   以插件的形式安装嵌入到vs code, idea这些开发工具中使用
*   国内类似插件：
    *   豆包marcode（免费）
    *   codeGeex （免费）
*   缺点：
    *   代码补全准确率很低，只有30%-40%左右可以应用
    *   上下文限制，能关联的上下文很有限, 基本只能关联当前文件内知识（记性差）
    *   交互形式单一，只能通过代码片段交互
    *   无法自动验证代码，需要手动应用到代码中，手动调试代码。
*   总结：对前端开发过程中遇难的痛点提升比较有限，简单评估可以达到10-20%的效率提升。

## **三、cursor概要介绍**

### **功能介绍**

*   tab功能，也就是copilot能力
    不止可以在光标位置插入代码，还可以修改原有代码，删除文本
    一次修改多行。
    自动修复代码错误。
*   基于指令编辑：（实践发现使用中文注释也可以有指令的效果）

![image\_50.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9f351b8998344893ad83f2c0551da773~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=iQ5aIH6U2rQPHZyA%2F8H8m30vmRI%3D)

![image\_53.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b645e99600fa40bdad70aea436942780~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=HHBgYmCDgufASABW%2BkLcPKEmuWc%3D)

**内联编辑：ctrl + K**

*   特点：可以选中代码片段快捷的调用问答，优化式编辑
*   应用点：对选中的方法代码进行逻辑优化；简单报错处理；代码格式整理；注释生成；

![image\_59.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ad8bf0ccaaea471b974204429d658d9e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=zlO4%2BVCoE1iS8q8gZo%2FdVl8lqnw%3D)

#### **chat功能**

用于在聊天模式下通过上下文 AI 协助探索、编辑和管理代码；官方的说明是“通过自然语言与代码库进行交互”。

*   解析代码
*   自动编辑代码：编写新功能，代码重构，构建新项目
*   自动命令执行（需要授权确认）
*   自动化工作流程（探索中）

![image\_68.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8b6b41038f144c548d307c195f831815~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=CVVs1kg%2FrM3n7ZRFPIzFgyfC2cM%3D)

**快捷键：ctrl + L**
**模式：**
**agent：通过指令，自主探索代码库、阅读文档、浏览网页、编辑文件以及运行终端命令**

*   工作流

![image\_75.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/aa84d45e37504cf2bf4289dada1161ba~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=KjgTxOQwHv48JO9vZsSyTLi9tGQ%3D)

**ask：代码解答，方案规划**

*   Ask 是Chat的“只读”模式，用于提问、检索和了解代码库
*   **Manual： 仅指定上下文针对性编辑**
    不会探索代码库或运行终端命令；它完全依赖于您的具体指令和您提供的上下文（例如，通过@指定的文件）
*   **注意点：谨慎accept, apply，使用版本控制，认真检查变更的代码记录和代码运行情况（类似merge代码的过程）。尤其注意运行中断后避免点击accept。**
*   **ai修改代码库安全问题：**
    *   通过@指定可修改的文件，尽量避免全局编辑代码
    *   提示词明确限定修改代码的范围
    *   谨慎应用代码
    *   git提交代码前仔细核对有没有被意外修改的代码

![image\_87.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/fa5ec39c3a5546549056ee238d5c03d3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=13QoXBv6WeaQtibzj0%2BoBms1s9U%3D)

#### **上下文(语境）**

上下文是 Cursor 所有 AI 功能的基础。其工作原理如下：

*   当您打开代码库时，我们会自动索引您的代码，以使其可用作上下文
*   使用@符号来精确控制您提供的上下文：
*   @files和@folders用于特定路径
*   @web用于外部文档
*   @git用于版本控制上下文
*   配置rules以自定义行为：写一些通用提示词，比如团队开发规范
*   命名约定
*   尊循指定注释规范
*   使用scss语法
*   通过MCP 服务获取上下文

#### **聊天中的 AI 修复**

修复代码库中的编译环节错误的一个便捷功能是使用聊天中的 AI 修复。为此，请将鼠标悬停在编辑器中的错误上，然后单击显示的蓝色 AI 修复按钮。此操作的键盘快捷键是Ctrl/⌘ + Shift + E

![image\_105.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/20989fbf4a0d4a8ea7e43bcf3d32ecca~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=5XjjeWngtBjFv867mr77B2r%2Flgg%3D)

### **服务价格**

*   **体验版：新注册用户默认有14天pro版本的体验权限，这个体验时间内有500次fast request的额度**
*   **付费版：20\$/月； 淘宝共享：16￥/月，目前已经支持支付宝付费：147/月**
*   **低价方式：淘宝买插件或者其他网上攻略**
*   **白漂bug: 半个月到期后注销账号，然后重新注册又会送14天pro版体验权限，目前还可以这样操作。**

![image\_113.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/33938de1d82f4489b8441d9235452dfa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=TKQoF5xAWOmdRrj%2FrbA1hGO%2BVO0%3D)

![image\_116.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e18ae1a6be594d4dbd3595c31c884cfe~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=qbi2JwBhumlPcTi9GXupC6EtHtM%3D)

![image\_118.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2b23cdb156f14f348c98dc58716059a9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=j7N6OUJwcpq0tbsiD%2FhhUWnh83M%3D)

### **cursor优势**

*   基于Copilot+chatGPT最主流的代码补全工具和大模型；多文件智能感知上下文：相比国内的ai助手可全局上下文感知，而且准确率更高，代码质量明显更好；与 GitHub Copilot 等其他类似产品相比，Cursor 的最大优势在于其与编辑器本身的深度集成。这意味着它不仅仅是一个插件，而是成为编辑器不可分割的一部分，日常使用中能够更加自然、高效地利用这些智能功能
*   相比windsurf，上下文掌控性更好，项目控制颗粒度更细。更项目功能维护优化类的功能。windsurf自动化程度更好，对新手更友好，更适合搭建框架，设计完成一个大的功能模块，这类较大范围的设计架构优化；
*   国内替代免费软件：trae，目前还不是很稳定，低强度使用可以尝试。

## **四、cursor在前端开发中的应用**

### **助力前端痛点提效**

#### **视图层-ui还原:design to code（DTC)**

**UI图+提示词生成代码**

*   提示词案例

```

    # 任务

    新建「联系方式」小程序页面并集成到现有uniapp项目中

    ## 执行要求

    1.  在当前指定目录创建vue文件
    2.  配置pages.json路由
    3.  根据上传的UI截图实现布局（图片元素暂用注释占位）
    4.  请作为前端开发者实现完整页面

    ## 技术规范

    *   使用uniapp+vue2语法
    *   保持与现有项目一致的class命名规则
    *   采用flex布局实现响应式,符合小程序规范
    *   严格遵循750rpx宽度基准

    ## 特别注意

    *   图片区域用注释标记<!-- [图片位置1] -->
    *   禁止安装第三方依赖

    ## 交付要求

    *   所有交互状态需有视觉反馈

    ## 参考内容：

    文本/上传的图片/索引的文件
    
```
    
#### **逻辑层-复杂逻辑模块设计和开发**

*   先使用ask模式调研和确定方案
*   然后通过agent模式输出确定后的方案
*   案例：设计一套pc响应式官网结构并完成开发

#### **交付层-自测覆盖率不足**

*   ask模式分析代码逻辑，根据提供数据案例生成测试数据
*   ask模式分析代码逻辑，生成单元测试断言
*   agent模式调用生成的测试数据和单元测试断言自动jest测试
*   案例：生成一个根据userid判断流程分割的方法，单元测试验证
*   cursor+ BrowserTools MCP 控制当前浏览器（扩展）
*   ai调试
*   分析页面性能

#### **思考总结**

*   利用agent模式生成单元测试自主测试复杂函数和逻辑
*   开发过程中善于使用注释生成（指令编辑），减少提问次数消耗
*   agent模式清晰的提示词可以一次性解决问题，详细的说明1，2，3。最好使用md格式
*   使用agent善于@指定文件限制修改范围（安全）
*   上传ui图+详细的提示词直接生成前端样式代码
*   Claude3.7代码能力日常编辑代码，使用Claude3.7 thinking模型进行问题修复
*   开发完成后使用自主 code review 功能，提升代码质量和可读性
*   扩展能力：
*   cursor+ BrowserTools MCP 控制当前浏览器
*   cursor工作流：结合dev.0 UI样式生成，自动化测试，团队规范上下文管理；
*   建立公共提示词库：团队共享提示词和个人提示词文档储备方便复用

## **五、测试案例**

### **agent模式自动开发一个个人博客案例**

需求：使用windsurf 的 agent 模式在一个react测试项目中开发一个个人博客

#### **实现步骤：**

*   提问：安装依赖启动项目
*   结果：提示使用npm install安装依赖 ； 点击accept 自动执行命令；npm版本异常；
*   提问：使用yarn安装项目依赖，启动项目
*   结果：点击accept；执行命令正常完成依赖安装；自动启动项目；自动调启浏览器访问本地地址；

![image\_185.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7dd379798cbc4ea3af5eaddf526b844c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=0sjr280B%2FZeST38JhvsOi9QtV5E%3D)

提问：帮我将首页改造成一个个人博客官网，设计要求简约，有tab栏，最近博客历史，最近摄影作品
结果：开始自动改造项目结构，修改app.js文件，新建组件，完成代码编写，同事自动运行项目，浏览器页面在不断更新变化

![image\_190.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/27515f6ea7ae491588ed53c3df7dd3e1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=3W6C6kNmJXlBjWNOgw6wR8wTXrQ%3D)

结果：完成思考后需要确认是否接受代码修改后的结果；点击accept 确认

![image\_194.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d80f45255461459a89cba226ef57f22d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=VLuRulpJcptE1DRP0Ghuppm9jJE%3D)

第一版效果：

![image\_198.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/76b00034c88d41d5845e8f9a5ce1ace2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=TWjIBNWZiStrCL%2B59KO7iNk8rKk%3D)

提问：

1.  将项目中的文案换成中文
2.  项目中图片为正常显示，帮我找网络上的摄影图片暂时替换
3.  我觉得ui设计过于单一，应该更加丰富，添加主题色

![image\_205.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/87480e0807d84d5eb0831f483bda594b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=EB30BlENIY%2B9xwvxwC9P5G8bnL4%3D)

![image\_208.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7de7084dbd554269b6506209a7f93087~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=PjS3FWVVHKy4ImlayHh5SWwljL0%3D)

第二次效果：完成后的页面：不是纯静态，是有交互动画，跳转等功能逻辑，基本达到我预期的85%。

![image\_212.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/baed7658733f4f1da72d240c45032181~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=3HUaSQ%2B2DerYYs3BiitFJ5le08g%3D)

![image\_215.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2a91b25f48284e6894a84a5b1988719c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=Wi7hdM7DSGIHKM6WGgzwdf182vw%3D)

#### **问题集合：**

仅仅提出四个问题就完成了一个简单个人博客的开发

![image\_219.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c7431d9fbbd74e2798a5868a0cf1587e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=BmbG1uF6DnIa8W4PSQ47CiGp40U%3D)

![image\_221.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/28867b3b46844738a012ce9ec00855e4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=ID61ezMD6hN18dnEIkb1TYYGT7s%3D)

![image\_223.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1aec25d5b1c74cde9b65b1de376c5d3a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=QBMuBDcr1FHpxya4%2Bcv9EcGqaFw%3D)

![image\_226.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d152defc87de451c997a449500c90803~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=yulimojbSsABkYhwjjRKBt%2B7t10%3D)

#### **输出的代码：**

代码简约、逻辑清晰，组件拆分合理

![image\_231.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b75a90eec2754d86a2e543fbdeb3b158~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=SiQpMph0e7K%2BtefH2ZheKp65zpg%3D)

![image\_233.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/4dc0e0a776e9492982ecaf9e859fed46~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=G1ueDegMOb5tu43kTUZQYUZpKzI%3D)

![image\_235.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/91fa5fb6225b4295ae6136c6bea455e6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=voX6MUpSIo0pzel8zk8fk5aNzDc%3D)

## **六、工作流探索**

#### **视图层-ui还原:design to code（DTC)**

**UI图生成代码**
测试效果：可以完成基本的代码结构设计，细节和准确度不足，基本打车70%内容

![image\_242.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1360512bb14d45a283982a653a9683af~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=9xh%2Fas07BEokp8uatbrWa2HOdeI%3D)

![image\_245.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/160c66d6c29e472b9ad64a79b2277332~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=%2BWV4%2Ftfd9v4ryMzKlXu14X6HJIg%3D)

结构化UI提示词生成代码
```
    先通过UI图输出结构化描述文本，再根据结构化文本+UI图生成页面代码
    结果：细节和还原度有一定的提升，提升幅度不大
    模块描述
    顶部插画模块
    位置：页面顶部居中区域。
    内容：一个插画。插画整体为扁平风格，人物和衣物的颜色鲜明，与背景形成对比。
    尺寸：插画宽度约占页
    度的 2/3，高度根据内容自适应，底部距离下方文字有适中的间距（约为插
    画高度的 1/2).
    标题模块
    位置：插画下方居中。
    内容：文字“穿啥 - AI 造型师”，字体为无衬线字体，颜色为深灰色。
    尺寸：字体大小适中，约为 36rpx（微信小程序单位），行高根据字体大小自适应，与上方插画和下方按
    钮均有合适间距（上方间距约为标题高度的 1.5 倍，下方间距约为标题高度的 2 倍）。
    登录按钮模块
    位置：标题下方居中。
    figma源文件导入生成代码
    figma插件：PSD转figma设计稿
    <https://......html>
```
测试流程：
**UI图示例：**

![image\_269.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a65c6868bd4d4fdd97f5062b398bcf82~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=72oroX2FBFepEpoJKOsgI3KXcog%3D)

**直接使用ui图+提示词生成结果**

![image\_273.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a7177405f3f3475889f1d6995b5293d3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=9JjZeyELhm9n4Oq1f03pc134Ors%3D)

**结合MCP获取figama结构化内容测试：**
**psd转figma文件：**

![image\_279.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d30c5a468de54e6fa103f47d08339fa5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=4o%2FLuwwzRzTcXFH83kuHHGxpVM0%3D)

**转换后的figma效果：**

![image\_283.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f21be4dcb2924a4eb5f0057cb89f1763~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=N5J45joxKegtAdae1MDPpUIRUr0%3D)

**添加figma-MCP服务，添加自己figma api key**

![image\_287.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/335540826564431eb8b6e2e59244b316~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=mSUiRyxLIWfhCYGuXkkRxyziRMk%3D)

**复制figma link，生成提示词：**
在当前项目中新增一个页面和入口，实现figma UI设计稿的开发：
设计稿地址：@\<figma地址> ......

**授权同意调用figma mcp**

![image\_295.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c2e2119d798248b1865ad81c0378e7b4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=liaHoWckO0RxVXfYzDw4ehswvAI%3D)

**MCP报错：需要升级node版本到18以上, 并重启cursor，重新执行提示词**

![image\_299.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8121cdd009724266a7efdc523108f3a5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=cZC2G%2Bs%2F6i86ejTRCB%2B60tI8d%2Bg%3D)

![image\_301.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/26eb0bae22144abb8a2ba8a2d448b467~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=5dhXRVodSoSKCPpGZ4%2FSIajIjfE%3D)

**输出效果：**

![image\_305.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bd383bac7609435e9e29dfafc421d319~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=yh8uOVlCFfjndHdOhWxME%2BEBykM%3D)

**发现结构化信息比较丰富，但是ui还原度并不高，重新给cursor发送以上ui截图，让他继续优化后的结果：**

![image\_309.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7ffcdc868a3d4b18acced42896ce1429~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=JtjoStxInZrn2wgDoxOSqDrwyrc%3D)

**使用v0生成页面，导入cursor继续开发**
测试效果：准确度高于cursor 生成的效果，达到80%以上的还原度
缺点，v0有限额也需要付费，多一步导入页面代码到cursor的步骤。
输出对比：

![image\_317.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f8a5f55282394ce895830e6cc90e4e5d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=IIKiM4D6rGx1jlEhYJYTy%2BUKF1g%3D)

![image\_319.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7c2a64b709834a029761500eb5b2eb08~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=69P%2FbjeG1dGLTDrySLfoXAoHiRg%3D)


## **七、cursor在其他领域思考和扩展**

*   生成可视化文档用html形式：如生成一份图文报告以官网介绍的形式；
*   提示词：生成一个风格化个人博客
*   活动官网设计（可导出应用的静态介绍页面）
*   文档可视化（快速学习阅读文件文档）
*   数据可视化生成
*   文档编辑：利用代码补全（文本补全）的能力，提高编写文档的效率；
*   案例：编写接口文档，编写服务文档，产品介绍文档，客服服务指南
*   生成coze工作流
*   公众号文章排版
*   会议纪要整理
*   结合MCP的应用点介绍
    *   上网搜索
    *   操作浏览器
    *   操作本地文件：整理电脑本地文件
    *   获取热点：获取最新新闻热点
    *   调用导航软件：高德地图规划旅行路线
*   **产品业务线工作流思考：**
    *   通过需求文稿之间生成html格式的原型图
    *   导出figma自定义编辑确定需求
    *   UI在figma中完成页面最终设计
    *   前端根据输出UI图+MCP获取figma设计文稿结构化信息完成页面开发

#### **案例1：生成原型图HTML，导入figma 设计**

输出产品规划 r1或者think 模式分析，
拷贝think分析信息生成html页面，
html页面导入figma设计优化（需要部署生成线上url导入figma）
```
    提示词：
    我想要开发一个 [少儿学习单词的 app]。
    我需要将上面的这个应用输出成高保真的原型图设计。请考虑以下的规范：

    1.  用户体验：先分析产品的主要功能和需求，确定下核心能力
    2.  产品规划：希望你作为一个 20 年的产品经理，来设计我们的整个产品，确保架构非常合理
    3.  UI 设计：作为 30 年的 UI 设计师，要保证符合目标人群的使用习惯、符合手机端的设计规范、使用比较现代化的 U1 元素，注重产品体验和视觉
    4.  输出：

    *   请使用 HTML + Tailwind CSS 来生成所有的原型图界面，可以使用 FontAwesome 来美化界面，接近真实的 app 效果。
    *   请根据功能拆分代码文件，保存结构清晰，每个功能界面需要一个独立的 HTML 文件，比如 home.html, games.html, me.html 等等
    *   尽可能使用 Tailwind CSS 的样式,如果需要自定义的话,请用独立的 css 文件,然后引入到 HTML 代码中来
    *   用index.html作为主入口,不直接写入所有界面的代码,这里我们使用iframe的方式来嵌套其他页面,并将所有页面直接展示在 index页面上
    *   界面尽可能模拟 iPhone 15 的真实外观
    *   页面里面需要使用到的图片，可以从 unsplash、pexels 获取图片
    *   尽最大的可能降低页面的 TOKEN
    *   保证我们的代码页面最后能够很顺畅的转为 Figma文件进行二次编辑 
```
**输出效果：**

![image\_365.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/5995c404a1124f3eb075a1f8f6566876~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=ZGh9weCbyANLHhi2YBMWEgNTm7M%3D)

**案例2：生成coze工作流：**
新增docs全局引用文档：远程链接和文档索引
提示词：帮我设计一个传入新闻标题，就能生成一则推送文稿，同时配图排版，这样的工作流

![image\_371.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b64781dd756f49f793425c07464f2184~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=l1TWeqrcME562qbEx%2FIHn4EeNEc%3D)

![image\_373.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/db7bd8c991b84381afb02370ce329192~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=ij0CLoRVjkS4JnOG3FPiQTXU7SI%3D)

再@两个dify的配置文件做参考，让他生成

![image\_376.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/235abd8a6ef74958b97cee9644c5b476~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=VyygmeTz22YpqBDwgJ%2B5MdZRDV0%3D)

dify导入这个配置文件，自动生成工作流

![image\_379.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/76029cc3e2e24aa397fc802429f20160~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=DvwthGpO7smQXykescOaoZFc%2BZc%3D)

![image\_381.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/4bb3d164f7da457d96d55ff72a39cfbc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749635838&x-orig-sign=hTUlwgeV8Acf2%2BKMdv%2Fg1NVnB30%3D)

## **八、提示词整理**

#### **提示词：**

*   markdown格式
*   结构化的内容
*   尽可能详细的描述你的需求

#### **提示词案例整理：**

*   博客生成
```

    #任务
    请为我设计一个个人主页页面，展示个人介绍、技能、项目链接、联系方式等信息，要求风格现代简洁，适合独立开发者或内容创作者展
    示。

    ## 执行步骤

    1.请作为网页设计师，提出版面布局、配色、字体搭配建议，确保页面简洁有辨识度。
    2.请作为前端开发者使用Tailwind CSS完成开发,页面应具备良好视觉引导与模块结构。

    ## 技术实现要求

    -使用Tailwind CSS和HTML
    -图标使用FontAwesome

    *   使用Grid/Flex布局
        -包括以下模块:头像+简介、技能图标列表、代表项目链接（卡片式)、联系方式(如邮箱/社交链接)

    ## 内容

    请参考上传的文档
```
*   公众号文章排版

```#任务
请帮我用HTML设计一个用于公众号文章展示的网页模板,主要功能是排版优化、美化文章样式,控制代码总量在400行以内, css控制在
150行以内（使用tailwind css)。

## 执行步骤

1.请作为排版设计师,基于公众号常见阅读习惯,对段落距离、字体、标题层级、引用样式提出细致的设计建议。
2. 请作为前端开发者完成代码编写，输出一个HTML网页，要求粘贴文章即可生成美观展示页。

## 技术实现要求

-使用Tailwind CSS设计文章样式

*   字体使用“思源宋体”或其他适合中文阅读的开源字体
*   HTML结构应适合公众号后台粘贴，避免使用script
    -支持暗色模式切换(可选)
*   标题请使用`&lt;h1&gt;`-`&lt;h3&gt;`语义化标签结构

## 内容

以下是我要展示的文章正文内容：
```

*   数据可视化生成

```
    #任务
    请用HTML+JavaScript生成一个数据可视化网页，根据我提供的表格数据自动生成图表（柱状图/折线图/饼图等）
    ,总代码控制在600行以内。

    ## 执行步骤

    1.请作为数据可视化设计师,根据数据内容推荐合适的图表类型和展示结构,提出布局与交互建议。
    2.请作为前端开发者使用Chart.js或ECharts等开源图表库，编写完整的可视化网页代码。

    ## 技术实现要求

    -使用HTML5 + CSS + JavaScript构建
    -图表推荐使用 Chart.js，如有需要可使用 ECharts

    *   页面中包含图表标题、数据单位说明、图例
        -支持响应式(可在手机上查看)
        -数据使用JavaScript中的对象或数组结构加载

    ## 内容

    我的数据在上传的excel文件中
```
*   活动官网设计

```
    # 任务

    请帮我生成一个简洁现代的产品或活动官网,支持首页展示、介绍模块、报名/购买按钮等,代码控制在500行以内(HTML+Tailwind
    CSS)

    ## 执行步骤

    1,请作为网页设计师,参考最新网页设计趋势(如玻璃拟态、卡片式布局),对整体配色、字体、动画等提出美学建议。
    2.请作为前端开发者实现完整页面，包含导航栏、介绍区、功能模块和CTA按钮等。

    ## 技术实现要求

    -使用HTML5结构和Tailwind CSS编写样式
    -图标使用FontAwesome
    -字体使用Google Fonts

    *   页面结构包括：Logo/导航栏、功能介绍、活动信息、报名入口、页脚
        -所有模块需具备响应式,适配移动端浏览

    ## 内容

    我希望展示的产品或活动信息如下: 水滴信用企小智ai智能体，专业的企业数据查询智能体将在4月30日省市上线
    会议纪要整理
    会议纪要网页展示
    以下是一个使用:
    HTML5和Tailwind CSS设计的会议纪要网页展示页面,结构清晰,支持移动端查看,并具有折叠展开功能。
```
*   文档可视化

```

    # 任务

    请将以下PDF文档内容可视化，设计一个结构清晰、可交互的网页阅读界面。要求保留文档层级结构，并适配网页浏览体验。

    ## 执行步骤

    1.请作为信息设计师,分析原文结构,提出合适的章节划分、交互形式(如锚点、侧边栏)等建议。
    2.请作为前端工程师，生成网页代码，支持跳转导航、段落高亮、可视化层级关系。

    ## 技术实现要求

    -使用HTML5 + Tailwind CSS
    -页面包含目录导航、章节标题、正文内容

    *   支持锚点跳转，适配手机与桌面浏览
    *   可使用`&lt;details&gt;`标签增加折叠阅读体验
        -若原文包含图表，可使用占位符模拟

    ## 内容

    请参考我上传的pdf论文内容。
```
*   UI生成页面提示词

```
    # 任务

    新建「联系方式」小程序页面并集成到现有uniapp项目中

    ## 执行要求

    1.  在当前指定目录创建vue文件
    2.  配置pages.json路由
    3.  根据上传的UI截图实现布局（图片元素暂用注释占位）
    4.  请作为前端开发者实现完整页面

    ## 技术规范

    *   使用uniapp+vue2语法
    *   保持与现有项目一致的class命名规则
    *   采用flex布局实现响应式,符合小程序规范
    *   严格遵循750rpx宽度基准

    ## 特别注意

    *   图片区域用注释标记<!-- [图片位置1] -->
    *   禁止安装第三方依赖

    ## 交付要求

    *   所有交互状态需有视觉反馈
```

