
# chatGPT应用整理
[[toc]]


## 应用方向
### 前端开发方向
- 生成测试数据：地址，手机号测试，再整理成数组，对象等；
- 生成测试用例；测试代码片段；
- 解释代码；生成注释；
- 代码片段dome生成；github案例搜索；
- 提供技术方案
- 写正则表达式
- 协助优化代码

### 办公方向
- 生成思维导图：生成plantUML格式，打开转码网站（diagrams.net)，使用plantUML插入生成思维导图；
- LOGO制作，描述要求，使用svg或css生成
- 文档撰写：写或优化——周报，商业计划书，论文，标书，文案，简历，策划书
- 法律案件分析；
- 语言翻译；

### chatGPT问题清淡整理
- 更好更详细的提问，类似mid的关键词 
  - 内容清晰（省去不必要的文字，每个字尽可能都有用）
  - 任务定义明确（帮我制作表格，我要你提供事物的重量和数量）
  - 要求具体（比如我要一个清单、我要计算我的TDEE、我要去超市你帮我准备xxx）
  - 具有迭代思维（一句话可能问不出来你想要的结果，你可以持续性的和它聊，基于一个或者几个点深入一下）
- 提问模板整理:
  - 英文：[https://github.com/f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts)
  - 中文：[https://github.com/PlexPt/awesome-chatgpt-prompts-zh](https://github.com/PlexPt/awesome-chatgpt-prompts-zh)

### 视频制作
- 快捷生成图文视频：确定内容，视频脚本生成，使用剪影图文成片，导出视频

### 英语学习
- 制作单词本：
  - 将一下单词生成表格，要求：
  - 第一列：序号
  - 第二列：单词
  - 第三列：音标
  - 第四列：中文
  - 第五列：造句
  - 单词为：..........
- 口语训练：谷歌浏览器插件商场下载 `chatGPT Voice` ，安装一个，打开 `chatGPT` 就可以英语对话了

### 商业应用
- CSDN,百度问答，知乎问答
- 搭建镜像网站出售
- 百度文库上传
- 脚本自动化答题
- 生成导游攻略信息
- chat写作服务，淘宝，鱼，群


## chatGPT工具
### poe
地址：[https://poe.com/sage](https://poe.com/sage) ,需要翻墙

### new bing
地址：[www.bing.com/new](www.bing.com/new)
- 需解决new bing重定向到国内的问题
  - 打开全局代理
  - 配置hosts (C:\windows\system32\drivers\etc)
  - 清除cookie，登录使用
```json
# New Bing Chat
52.187.10.5 bing.com
52.187.10.5 www.bing.com 
52.187.10.5 r.bing.com
52.187.10.5 edgeservices.bing.com

# New Bing Login
40.126.35.80  login.microsoftonline.com
20.190.163.18 login.live.com
13.107.253.59 logincdn.msauth.net
13.107.253.59 acctcdn.msauth.net
13.107.253.59 acctcdn.msftauth.net
13.107.253.59 lgincdnvzeuno.azureedge.net
```

## openAI注册流程
- 参考流程：[https://juejin.cn/post/7198097078005841980](https://juejin.cn/post/7198097078005841980)
- 短信平台：[https://sms-activate.org/getNumber](https://sms-activate.org/getNumber)
  - 账号：谷歌邮箱
  - 密码：*******814abC
- openAI个人账号： 谷歌账号

## chatGPT制作PPT
- 闪击ppt+chatGPT
- 闪击ppt地址：[https://ppt.sankki.com/editor?mode=user-ppt&id=46351](https://ppt.sankki.com/editor?mode=user-ppt&id=46351)
- chatGPT模板：
```json
我的名字叫dongdongdong，帮我制作一篇内容为《论城市化进程》PPT，要求如下：
第一、一定要使用中文。
第二、页面形式有3种，封面、目录、列表。
第三、目录页要列出内容大纲。
第四、根据内容大纲，生成对应的PPT列表页，每一页PPT列表页使用=====列表=====开头。
第五、封面页格式如下：
=====封面=====
# 主标题
## 副标题
演讲人：我的名字
第六、目录页格式如下：
=====目录=====
# 目录
## CONTENT
1、内容
2、内容
第七、列表页格式如下：
=====列表=====
# 页面主标题
1、要点1
要点描述内容
第八、列表页里的要点描述内容是对要点的详细描述，10个字以上，50个字以内。最后，
一定要使用代码块回复你生成的内容，切记切记。
```
步骤：修改chatGPT模板内姓名和内容标题，复制chatGPT问答框生成ppt代码，将代码复制到闪击ppt自动生成，然后修改样式替换喜欢的图片等；

![图片](/images/tools/chatGPT/img_26.png)


## chatppt: 指令生成PPT工具
- 下载安装插件
- 申请体验 `chatppt`
- 打开PPT选项卡里的 `motiongo` ，点击 `chatppt`，
- 输入主体开始自动生成，如：如何做好数据分析