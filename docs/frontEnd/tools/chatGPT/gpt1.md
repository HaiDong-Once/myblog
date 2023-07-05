
# 搭建自用chatGPT教程
[[toc]]

## 项目地址
- ChatGPT-Next-Web: [https://github.com/Yidadaa/ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web0)
- openid keys: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

## 部署过程
### 获取 open-ai-key
访问网址：[https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
![图片](/images/tools/chatGPT/img.png)

### 开始构建
打开开源项目：[https://github.com/Yidadaa/ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web)
![图片](/images/tools/chatGPT/img_1.png)

在 vercel 上注册一个账号，可用用 GitHub 账号，给予授权即可
![图片](/images/tools/chatGPT/img_2.png)

创建gitHub项目
![图片](/images/tools/chatGPT/img_3.png)

点击 create 创建，然后等待即可
![图片](/images/tools/chatGPT/img_4.png)

录入 chatGPT 的 key 和访问密码。有访问密码才能使用你部署的 chatGPT
- `OPENAI_API_KEY`：上述 Step1 中生成 `API_KEY​`
- `CODE`：访问密码，可选，可以使用逗号隔开多个密码。

![图片](/images/tools/chatGPT/img_5.png)

点 Deploy 后，就等待部署，大概 1 分多钟时间
![图片](/images/tools/chatGPT/img_6.png)

 部署成功后，点 continue to dashboard ，可以看到，它有一个默认域名
![图片](/images/tools/chatGPT/img_7.png)
![图片](/images/tools/chatGPT/img_8.png)

这个域名只能通过梯子访问。如果想要国内访问，你还得在设置里添加一个自己国内的域名
![图片](/images/tools/chatGPT/img_9.png)

### 使用
进入页面，打开设置，设置 `API_KEY​` 与 `CODE​`（`API_KEY​` 与 `CODE​` 为上面步骤中，设置的环境变量的值）,然后就可以上手体验了
![图片](/images/tools/chatGPT/img_10.png)
![图片](/images/tools/chatGPT/img_11.png)


## 配置自己的域名
### 注册域名
可以在阿里云上购买一个域名：[访问地址](https://wanwang.aliyun.com/?aly_as=urN-DkV3U&source=5176.11533457&userCode=ywqc0ubl&type=copy)

### DNS域名解析
- 域名注册成功后，需要进行解析才能够进行访问使用 [解析地址](https://dns.console.aliyun.com/?spm=a2c4g.11186623.0.0.64917cc4e6UPEa#/dns/domainList)
- 域名注册成功之后，可以在下面看到一条数据，如果没有的话，填加即可

### 配置
域名填加成功后，对域名进行解析设置，在上图中的那条数据中，点击 **解析设置**
进入后，选择 添加记录，只需要修改两项：
- 主机记录：一般是 www
- 记录值：在下一步骤中获取

![图片](/images/tools/chatGPT/img_12.png)

回到我们项目的dashboard面板，进入项目，进行设置
![图片](/images/tools/chatGPT/img_13.png)
![图片](/images/tools/chatGPT/img_14.png)
![图片](/images/tools/chatGPT/img_15.png)
![图片](/images/tools/chatGPT/img_16.png)
![图片](/images/tools/chatGPT/img_17.png)

填加记录值后，刷新我们的域名解析页面。可以看到域名的DNS信息配置正确，状态显示正常
![图片](/images/tools/chatGPT/img_18.png)

最后访问自己的域名，访问成功即可


## 参考地址
- 参考地址1：[https://juejin.cn/post/7217435047489749049](https://juejin.cn/post/7217435047489749049)
- 参考地址2：[https://xie.infoq.cn/article/65bc8a2dc68b866bfe05f0513](https://xie.infoq.cn/article/65bc8a2dc68b866bfe05f0513)