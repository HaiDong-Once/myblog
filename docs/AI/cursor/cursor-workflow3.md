# Cursor工作流探索第三篇：Project Rules 团队项目应用实践

[[toc]]


## **User Rules 配置**

全局适用于 Cursor 环境。在设置中定义并始终应用。

```md
    ## 通用规则

    *   Always respond in 中文
    *   Please reply in a concise style. Avoid unnecessary repetition
        or filler language.

    ## 代码输出要求

    *   每次修改后自行验证，检查运行时报错
    *   及时解决所有编译和运行时警告
```

## **Project Rules 配置**

项目规则存在于 中.cursor/rules。mdc文件格式。您可以使用路径模式来限定规则的范围，手动调用，或根据相关性进行添加。

*   Project Rules作用：
    *   对代码库的特定领域知识进行编码
    *   自动化特定于项目的工作流程或模板
    *   标准化风格或架构决策

### **Rules 结构**

|                 |                           |
| --------------- | ------------------------- |
| 规则类型            | 描述                        |
| Always          | 始终包含在模型上下文中               |
| Auto Attached   | 当引用与 glob 模式匹配的文件时包含      |
| Agent Requested | 规则可供AI使用，由AI决定是否纳入。必须提供描述 |
| Manual          | 仅在明确提及使用时才包含@ruleName     |

![image\_322.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/62ead0b3b6994d3084308f7da3863907~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637988&x-orig-sign=tzzPdTJNOptqYmkmaWu1KV3DaXU%3D)

### **Rules示例：**

**@service-template.ts当规则被触发时，引用的文件将作为附加上下文包含在内**

```md
    description: RPC Service boilerplate
    globs:
    alwaysApply: false
    ------------------

    *   Use our internal RPC pattern when defining services
    *   Always use snake\_case for service names.

    @service-template.ts
```

### **配置方法**

设置，rules中选择add new rules，会自动穿件.cursor/rules文件

![image\_338.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d0e772fd61194aafb603a7c51329bbd9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637988&x-orig-sign=KPD9RoHieRvKYxVwNINxubzVsAA%3D)

### **生成rules**

可以使用命令直接在对话中生成规则/Generate Cursor Rules; 会结合当前对话窗上下文生成响应多份rules可供选择和使用。

![image\_343.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/cccdc42956d245ac80788c52795eb11e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637988&x-orig-sign=8sQ8nTvckMhgAmU0QgqRuXqI1fQ%3D)

### **Project Rules实践**

**Cursor Rules配置社区推荐：**

*   <https://cursor.directory（英文）>
*   <https://github.com/PatrickJS/awesome-cursorrules（英文）>

#### **开发规范 Rules**

*   **作用：根据各个项目技术栈规范结合团队规范，约束代码习惯。**
*   **cursor自建github仓库测试**：<https://github.com/HaiDong-Once/cursor-rules-collection>

#### **代码模板 Rules**

**作用：前端页面模板，样式结构模板约束**

```md
    ## 此规则定义了 React 组件的结构：

    ### React 组件应该遵循以下布局：

    - 组件作为命名导出
        @component-react-template.tsx
```

#### **自动化工作流**

**作用：将一些日常开发工作中重复的工作流实现自动化，例如：**

*   创建命令打包发版工作流：
    *   web端切master，拉代码，打包，打包成功发钉钉通知提示；
    *   小程序端自动打包，自动上传指定小程序平台，返回版本号+平台名+版本说明+打包人名获取git name并通知到指定钉钉群
*   git提交工作流：自动拉去代码提交代码，涉及到冲突提示手动merge
*   写页面工作流：新建页面到指定位置，询问指定目录，创建路由，引入组件到指定页，页面开发，还原度自测，优化，检查报错，解决报错和异常，输出页面等待人工检查。设置模板文件夹，创建页面文件模板。
*   页面测试工作流：调用MCP工具，检查页面性能，提出优化建议，手动确定方案后，执行优化方案并复测，性能对比上一次输出报告<br>

**web和H5打包自动化**

```md
    ## 规则描述

    此规则可自动执行应用程序项目启动、打包测试环境、打包发布工作流程：

    ## 当我要求打线上包时：

    按顺序执行以下命令

    *   检查有无未提交代码变更文件，
          需要让开发者手动确认是否继续执行
    *   git checkout master
    *   git pull
    *   npm run build
    *   从控制台获取日志
    *   获取到打包成功或失败状态给出提醒

    ## 当我要求打测试包时：

    按顺序执行以下命令

    *   如要求打包到测试1，执行npm run test1
    *   如要求打包到测试2，执行npm run test2
    *   打包其他命令以此类推
    *   打包后检查控制台是否有报错信息
    *   如果有报错信息则给出修改方案

    ## 当我要求启动项目时

    *   react项目执行: npm run start
    *   vue项目执行： npm run dev

    ## 此规则有助于从代码生成文档：

    ### 通过以下方式帮助我起草文档：

    *   提取代码注释
    *   分析 代码逻辑
    *   在项目外层markdown文件夹下创建并生成 Markdown 文档
```

**uniapp小程序打包自动化**

```md
    ## 规则描述

    此规则可自动执行 uniapp 小程序打包发布工作流程

    ## 当我要求打包小程序线上环境时：

    按顺序执行以下命令

    *   检查有无未提交代码
    *   如果有未提交代码，展示变更文件，
          需要让开发者手动确认是否继续执行
    *   git checkout master
    *   git pull
    *   要求打包支付宝执行：npm run build:mp-alipay
    *   要求打包微信执行：npm run build:mp-weixin
    *   要求打包头条或抖音执行：npm run build:mp-toutiao
    *   检查terminal是否有报错
    *   获取到打包成功或失败状态给出提醒

    ## 当我要求打包小程序测试时：

    按顺序执行以下命令

    *   要求打包支付宝执行：npm run build:mp-alipay

    *   要求打包微信执行：npm run build:mp-weixin

    *   要求打包头条或抖音执行：npm run build:mp-toutiao

    *   检查terminal是否有报错

    *   如果有报错信息则给出修改方案检查
```

### **rules文件命名规范**

**来源于cursor社区：**<br>
经过反复尝试，发现这个组织系统效果最好。使用三位数字格式，并按照如下规则进行分组：

```md
    ## 说明

    *   核心规则：001-099
    *   积分规则：100-199
    *   模式/角色规则：200-299

    ## 例子：

    ### 核心规则：

    *   “001-核心-安全.mdc”
    *   “015-核心-日志记录.mdc”

    ### 积分规则：

    *   “100-API-集成.mdc”
    *   “110-CLI-Handler.mdc”

    ### 模式/角色规则：

    *   “200-文件-模式-规则.mdc”
    *   “210-数据-验证.mdc”
```

### **rules效果测试**

**使用rules工作流打包支付宝线上包：**

![image\_456.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/fcca9d7df58041fc95604677311c6869~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637988&x-orig-sign=w4OmNGHxyt455NtOKvjvn3V2HEM%3D)

![image\_458.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/983789e9c52549439755c046c84e5e99~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637988&x-orig-sign=rRTYccWhPEtyz%2F%2F4gm6VqpzRcLw%3D)


### **Cursor Rules Idea:**

#### **项目级rules管理协同**

*   每个项目创建.cursor/rules文件，并设置初始rules，前端代码规范文档，项目返回，当前框架规范（如：vue规范），提交该文件供所有人使用和更新。（完成测试）
*   **根据rules命名规范，整理一套rules公共仓库**: 创建github cursor rules项目迭代更新。(完成创建和部分rules提交）
*   测试实践：cursor rules 自建github仓库地址：<https://github.com/HaiDong-Once/cursor-rules-collection>

#### **建立项目公共库文档**

*   **思路**：建立项目级的markdown文件夹，通过统一的rules约束文档规范，每完成公共函数，公共类，公共组件的开发后，自动生成对应的使用说明和案例。之后的开发中cursor自动优先阅读文档调用已有方法，或者在已有组件基础上迭代扩展新功能，避免重复造轮子。
*   **示例**：在util.js, public.js, common下完成的组件等，自动生成markdown/md文档；然后后续开发中如果涉及到公共函数，公共组件封装，先要求cursor去public文档下查找有没有同类组件或方法，优先复用已有方法和组件。手动开发或者也可以先检索参考公共文档优先复用再开发。

#### **前端自动化测试**

*   **提测前要求cursor回溯测试**：代码规范，代码质量，可能存在的隐患。然后根据cursor提出的修改意见逐行确认。rules依据：项目中的project rules。（测试可行）
*   **单元测试**：对于复杂模块，输入模块主要功能描述，要求cursor生成jest断言，主动执行单元测试，返回测试报告；根据测试报告反馈，手动决策是否继续优化功能模块。rules依据：编写单元测试工作流rules；（测试可行）
*   **前端功能测试**：对于简单功能逻辑测试，利用浏览器MCP工具，描述测试流程，提供测试数据，cursor主动执行功能测试（如：样式自动截图测试还原度，表单输入，表单提交，点击，滚动等单个平台功能实测）。（测试可行，但浏览器mcp工具操作浏览器过程较慢）
