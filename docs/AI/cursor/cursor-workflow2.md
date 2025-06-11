# Cursor工作流探索第二篇：概念理解到实践技巧

[[toc]]
## **cursor概念和理解**

### **Cursor开发团队观点和理念**

来源：<https://lexfridman.com/cursor-team-transcript>

#### **观点概述**

*   **cursor开发团队理念：”优秀的工程技术比算力更重要“；**
*   **未来工程师是人机混合体，人类创造力 + AI 能力 > 最佳纯 AI 系统。**
*   **创造力、系统设计能力和做出权衡决策的能力将变得更加重要。**
*   **更高层次的抽象:**
    *   程序员可能会更多地在更高层次的抽象上工作，如伪代码。
    *   AI 可以将这些高层次指令转换为实际的、可执行的代码。
*   **灵活的抽象层级:**
    *   未来的编程环境可能允许在不同抽象层级间自由切换。
    *   例如: 伪代码与代码实时映射

```markdown
    # 高层抽象（伪代码）

    功能：用户登录验证
    步骤：

    1.  检查用户名是否存在
    2.  验证密码哈希是否匹配
    3.  返回登录状态

    # 底层代码（Python）

    def user\_login(username, password):
    user = User.query.filter\_by(username=username).first()
    if not user:
    return {"status": "error", "message": "用户不存在"}
    if bcrypt.checkpw(password.encode(), user.password\_hash):
    return {"status": "success", "user\_id": user.id}
    else:
    return {"status": "error", "message": "密码错误"}
```

**可视化逻辑与代码联动**

```markdown
    # 可视化流程图

    [开始] → [输入订单数据] → [验证库存] → [扣减库存] → [生成订单号] → [结束]

    # 对应生成的代码（Java）

    public Order createOrder(OrderRequest request) {
    if (!inventoryService.validateStock(request.getItems())) {
    throw new InsufficientStockException();
    }
    inventoryService.deductStock(request.getItems());
    String orderId = OrderIdGenerator.generate();
    return new Order(orderId, request.getItems());
    }
```

**好的编程工具应该通过行为预测，而不仅仅是自然语言，例如强大的 tab。**

![image\_46.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/709cd6ff7b4f46038a4063d6e2afbe93~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=CZJ3hJyJOH%2Fqi0vuU%2FKkjCUU2wc%3D)

#### **以上观点趋势可能对开发者的影响**

*   **角色转变**: 从“代码编写者”变为“逻辑设计师”。
*   **技能需求变化**: 更强调系统设计、问题抽象和 AI 协作能力。
*   **开发范式升级**
    *   传统流程：需求 → 编码 → 测试 → 部署
    *   未来流程：需求 → 抽象设计 → AI 生成代码 → 细节优化 → 部署

### **聊天式编程**

#### **cursor 带来新的开发模式：”聊天式”编程**

![image\_60.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9f2e1c47d5af4de090a18b9f5db6319d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=GJDRKl47iKJLO0YHMASm7glfJSk%3D)

#### **通过“自然语言”写代码**

从一开始的机器语言到汇编语言到现在的高级语言，计算机语言的演变本质上是从硬件到认知的不断抽象，Cursor的出现打开了高级语言迈向自然语言的大门。<br>
Cursor 创始人所言：“我们不是在教 AI 写代码，而是让它成为人类创造力的延伸。”在这种新范式下，我们的注意力讲会从"如何写代码"转移到"解决什么问题"，AI 会逼迫你“想清楚、说清楚”。清晰的表达将会成为一种稀缺的生产力。

![image\_65.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/68eb29b207624426a5393b58a17cd730~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=moE7BWInEyX1Xo7UiQiXn0ecHBk%3D)

#### **打破岗位边界**

Cursor逐渐模糊掉产品经理，设计师，程序员之间的界限。可以预见将来也会改变这些岗位的设立逻辑和开发团队的组织方式。Cursor客观上磨平了各个角色之间的技术壁垒，让想法不再受限于某类资源，拉低了编程的技术门槛。

![image\_70.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/6f230bf3ff5942a2a7c534a24bd93452~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=yGXo3ISQQx4HpHY3bM9xEGM2SHw%3D)

### **新的编程范式**

**Cursor四大件**

*   tab: 辅助代码补充，提示（提升手速）
*   Inline chat: 少量、局部的指令编程
*   ask: 多文件问答，调研，思路梳理，方案确认
*   agent: 自动执行大量的大范围的编码

![image\_79.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e44195042b994c36a464cb2224a95c1c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=xKLDviPdn%2BfV6A5fjR5G6SZubdc%3D)

#### **面对复杂任务执行步骤：**

确认目标，确认方案，开发、验证

![image\_84.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a03d07f19db44d11abd3d29151d73084~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=MLnqpsdPGE%2Fy6EsR1dm6%2FO4Fl5U%3D)

#### **需求：从“想清楚”到“说清楚”**

（定义好“问题”）Ai很强，但是他不知道你脑子里到底想要什么。

*   **清晰表达的核心原则：结构化表达+足够的上下文（需求澄清）**
    *   结构化表达：使用 markdown 格式，天然对内容“分块”，ai更容易理解
    *   足够的上下文：”人设+任务+上下文+案例+方案“ 组合
*   **让 AI 逼迫你思考：反向费曼学习法（疑点确认）**
    *   在使用 AI 时候，他往往倾向于直接满足你的表面需求，但可能会忽略一些深层需求内涵。所以好的模式不是你直接去提问，而是让 AI 引导你思考！那对于 AI 来说，当你提出了一个问题，想想：他真的懂了吗？让 AI 反述一遍，你听听如何？但是光这个就够了吗，不够，你还需要让 AI 具有质疑精神，让他对你的问题提出质疑，而不是全盘接受！反向逼迫你去思考什么是“真需求”让 AI 变成你思维的“延展”。我把这种模式称之为：反向费曼学习法。

![image\_94.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/359bea3d01db4c31ba4ad778cb38b314~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=R80XUf%2Fq2XgRg7GSZ%2BKPibcSJdk%3D)

#### **方案确认：任务拆分，分而治之**

（方案调研落地阶段）<br>

*   方案确认：先使用 Cursor 的 Ask 模式先让 AI 给出不同的解决方案以及优劣，然后开发者权衡选择方案。可以理解为人去权衡其实就是变相的在补充上下文。
*   方案拆分：让 AI 去拆分，拆分成 AI 可以执行步骤。
*   小技巧：把拆分的结果记录到 Notepad 中（Cursor 提供的轻量化记录工具）记下来的目的一个是给自己看，帮自己理清思路（对于生成级别代码，你必须知道方案的思路）也方便后续在此基础上做调整，另一个是作为上下文给到 Agent 模式，Notepad 在两种模式之间起到了很好的桥梁作用。

#### **开发和验证：分布执行，小步验证**

（开发和验证）<br>
在 Agent 模式执行的时候，我们需要按照直接的拆分任务并且逐步执行、逐步验证，切记不要一次生成几千行代码，再验证，不然可能会越改越乱。

![image\_106.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e849223aa80147249d1e2d9f0329d030~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=sjqbo6sn6GE0OIVyMkrREA4brH8%3D)

### **Cursor使用技巧**

#### **终端对话（命令执行）**

无需记住linux命令，直接 command+k ，使用自然语言去描述命令行<br>
（ps：你可以在本地开一个 Cursor 的项目专门操作本地终端）

![image\_113.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0e20ba44f7a9474c8d243001a6d3aa66~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=i87dTfM92cyLhigCV9MJxCya65M%3D)

#### **历史代码生产注释**

使用 command+k，为历史代码快速生成注释。（ps：相比 Ask 模式速度极快）

![image\_117.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e3e43b41e4cb4af491bf94ec2d7729d8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=mO62vuoB1bLH8PVSAJ87eOZTBWg%3D)

#### **一键生成commit message信息**

![image\_120.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b47a9709a63449a1a858fb6fed2c4a7c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=fhgyHzAZ7Qf%2F5DFavYem8kplKNM%3D)

#### **接手项目，快速可视化了解项目架构**

使用 Ask 模式给你整理出项目的架构图，输出 Mermaid 语法的文本。<br>
粘贴到看图文本工具：<https://mermaid.live/> ，快速了解项目。

#### **使用 Notepad 记录关键思路**

使用Notepad记录关键上下文，并使用@指定上下文

![image\_127.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2dad3d8c4c16483ab12adfc5186f13e8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=R1cLeQvIn%2FzgFG%2FjGBH6uAo2BoU%3D)

#### **@git找到代码漏洞**

遇到代码 MR 的时候可以先对比一下与主干代码的差异，检查是否有问题，或者当你 MR 后代码发生了问题，都可以使用 @Git。

![image\_131.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/386664626127425da8fe43f808de91b5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=ZtTb4LxRVreM66lMgTbi%2Fvf8f%2Fk%3D)

#### **使用 checkpoint 一键回滚**

![image\_134.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8521e931882841718c91c3330957945c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=%2F2XfkRipW7qETWAywvfi8lAjFeA%3D)

#### **设置自己的专属提示词**

![image\_137.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/cffdb841bf40495b8e61b51d512d14f0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=JaqIRX4Xb5o8KLkea2BThtYGw1o%3D)

#### **拖拽式添加上下文**

不用去一个一个寻找目录去添加上下文了，在目录中直接按猪目标文件，拖进对话框即可。

#### **@web**

使用联网功能，快速获取最新信息

#### **模型能力按需使用（节约高级模型使用次数）**

行内和terminal内对话，默认使用cursor-small模型，处理简单问题，节约快速请求次数。
ask和agent使用Claude3.7高性能模型处理复杂问题<br>
善用代码补全代替简单提问：“伪代码”补全生成，注释补全生成。

### **Cursor与“心流”**

*   **明确的目标**
    *   使用好AI的前提就是想清楚，说清楚，这就天然的需要我们在思考任务过程明确自己的目标；
*   **即时反馈**
    *   即时的代码补全，ask,agent的自然语言交互，都能提供秒级的响应和输出，可持续的给开发者正向反馈，让你的想法立马实现。
*   **挑战与能力匹配**
    *   在任务执行过程中，AI可以帮助开发者更好的理解需求并处理底层复杂性，让开发者聚焦于创造性调整，避免因任务太简单而厌倦，又防止难度过高而太过焦虑，更容易进入心流的状态，达到最佳效能状态。（舒适区边缘）

![image\_155.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/86d5d170fe0040acae41237ce3cc1c2d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=uWRaec8wjnt1Sko6THna%2FvFGRGY%3D)

**软件价值的新定义：软件价值 =  创新  ×（需求清晰度 × AI 理解度）× 工程实现效率。**

### **重点利用领域思考**

*   重复工作：使用cursor自动化替代
*   标准化：建立完成统一的开发规范，公共提示词
*   实践探索：尝试对规范和提示词不断优化，测试不同方法工具的应用效果
*   效果评估：形成一套标准的评估方法，对调整后的方方案进行验证，评估提升和改善效果
*   迭代：评估符合提升预期的方法和规范汇入确定性规范文档

## **MCP探索测试**

### **MCP是什么？**

简单的说，MCP（Model Context Protocol）就是 AI 与外部世界的“万能连接器”，让 AI 有了眼睛和手臂，网上有一张很经典的图，如下图：

![image\_172.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/5355d7ddc1b54ca7a799390f31c50f56~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=MS99fcfqpGyg3c45OHZUvXAei8g%3D)

MCP之前已经有了访问外部资源，比如使用function call实现的外部数据库访问。而MCP真正的价值在于：统一了标准，不用再重复造轮子，大大降低了“外挂“工具的开发门槛。

![image\_175.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b9606b12249043c58b638ee0c51c4232~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=BEEWoLIY1M6wWD%2FegeHu0B2cXps%3D)

### **MCP能力**

*   **扭转数据流，把人解放了出来**<br>
    假如现在有一个这样的场景：统计数据库中，符合某些条件的数据。如何没有 MCP 之前你会怎么做呢？我想你会从数据库导出数据，再手动的粘贴到 prompt 中；看起来貌似也不复杂，那如果有一千万数据呢，如果数据分布在不同的节点呢？事情就变得复杂了。<br>
    而有了 MCP 之后，交互模式发生了本质的变化，人不用再做“数据粘合剂”，各个数据孤单被 MCP 连接起来，AI 有了自动探索“上下文”的能力。
*   **消除了人工手动整理prompt的过程**

![image\_182.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/5f423c1a312246d5adcffb0a438de7c8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=empVQiqLnGirebKgx72E5sb4RmY%3D)

**工具类产品提供 MCP 能力将成为趋势**
AI 生态发展发展令人震惊，传统的工具类服务如果只停留在页面+API 的形式已经已经远远不够，应该把自身溶于到 AI 生态中，提供 MCP 能力将成为趋势。

### **MCP聚合网站**
```json
    MCP.so
    Glama MCP
    阿里云百炼
    cursor.directory
    HiMCP
    Portkey.ai
    Smithery.ai (推荐)
    shareMCP MCP Hub
    Cline's MCP Marketplac
    MCP Market MCPServers
    PulseMCP
    Awesome MCP Servers
```

### **MCP服务推荐和测试**

#### **Play Wright和Puppeteer**

*   **核心能力： Playwright 和 Puppeteer 都是用于浏览器自动化的强大工具，该服务可以让LLMs在真实的浏览器环境中与网页交互、截取屏幕截图和执行 JavaScript等等。**
*   思考：截图爬取数据，自动网页操作，模拟点击，滑动，表单提交等操作
*   用途：自动抢票、网页测试、AI网页助手
*   地址：<https://smithery.ai/server/@microsoft/playwright-mcp>
*   配置数据：

```json
    "playwright-mcp": {
    "command": "npx",
    "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@microsoft/playwright-mcp",
        "--key",
        "41f1cc55-8403-4922-8dd0-a57f9ef9b915"
     ]
    }
```

*   **触发提示词：要求在浏览器中访问指定地址，然后描述做哪些操作**
*   **测试案例1：开发表单提交逻辑大模型自动触发MCP浏览器测试，并自动填写表单完成测试，结果显示操作浏览器速度较慢，待解决**
*   **测试案例2：爬取网页数据进行数据分析，导出JSON文本或者其他格式文件**

![image\_222.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9eac7dd7832c454aaaf9d34d989f73fa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=8BqDEew3U0BLrBUZvHNHe93uCtU%3D)

![image\_224.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/fa5e249b5ba84cb187dd23ea94b07ac6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ZKa5ZKa5ZKaZGRk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTY2NzMyMjM1MTcyMjAyMyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749637077&x-orig-sign=DzLN%2BnVoF8hD4JoQQ38gqpkB6G8%3D)


#### BrowserTools MCP

控制当前浏览器（扩展）

*   用途：ai调试、分析页面性能
*   地址：<https://github.com/AgentDeskAI/browser-tools-mcp>
*   配置数据：

```json
    // MAC OS
    "browser-tools": {
        "command": "npx",
        "args": [
        "-y",
        "@agentdeskai/browser-tools-mcp@1.2.0"
        ],
    }

    // windows
    "browser-tools": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@agentdeskai/browser-tools-mcp@1.2.0"]
    }
```

*   **运行这个 MCP 工具需要三个组件：**
    *   安装我们的 chrome 扩展程序
    *   在您的 IDE 中使用此命令安装 MCP 服务器（不同的 IDE 有不同的配置，但此命令通常是一个很好的起点；请参考您的 IDE 文档以了解正确的配置设置）： npx @agentdeskai/browser-tools-mcp\@latest
    *   打开一个新终端并运行以下命令： npx @agentdeskai/browser-tools-server\@latest
*   **测试结果：MCP-水滴网站性能分析报告**

#### **Stagehand：cursor真正“能上网”**

*   适合场景：网页数据采集 / 页面结构分析 / 自动填表
*   **适合场景举例：**
    *   自动拉取招聘信息、商品价格
    *   快速分析对手网页结构
    *   批量爬取内容用于训练或分析

#### **GitHub MCP**

*   返回 open issues、PR 状态，甚至帮你总结代码 commit。
*   **亮点功能：**
    *   按模块分析贡献者提交记录
    *   检查依赖是否过期
    *   总结 README 内容、文档生成建议

#### **Opik MCP**

调试 AI 一直是黑盒问题，Opik 让你看到 Claude 每一次调用的内容、响应时间、是否出错。
Claude 的所有行为，都会被记录下来，包括：

*   使用了哪个 MCP 工具？
*   请求内容、响应时间
*   是否出错、错在哪一步？
*   适合做什么？
*   调试 Claude 的工具链行为
*   监控 AI Agent 是否跑偏
*   生成 prompt 使用日志分析报告

#### **Figma MCP**

*   功能：使用cursor操作figma生成UI
*   用途：搭建产品原型/UI demo 的快速方案
*   地址：<https://github.com/GLips/Figma-Context-MCP>

#### **Firecrawl MCP (付费mcp）**

*   功能：爬站、提取、聚合、摘要全流程自动完成
*   用途：市场调研、竞品分析、数据洞察、SEO报告
*   地址：<https://github.com/mendableai/firecrawl-mcp-server>
*   测试结果：链接不稳定，效果不佳

#### **Supabase MCP（部分付费）**

*   功能：ai控制数据库：建表，查表，写数据
*   用途：做个“无后端”的数据管理面板
*   地址：<https://github.com/supabase-community/supabase-mcp>


## 参考文章
参考文章1：<https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247514968&idx=1&sn=5e7c752f2fb55900208a87968abc1969&chksm=ce7487cdd1fa021b56e88a1eb19eb8e6431fadee107deef4bd3f580b379d82acce0270a63935&mpshare=1&scene=23&srcid=04230bx5h8FExPNvbIElj0B3&sharer_shareinfo=f0f5c96b37f356ab79166ebd81d7bdaf&sharer_shareinfo_first=69b6ef46eb0e9983ed1da2d856d065a6#rd>
