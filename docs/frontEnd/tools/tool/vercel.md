
# vercel
[[toc]]


## vercel 免费部署服务器流程
::: tip 介绍
- Vercel 部署工具，支持部署静态网页和Node服务，部署后你生成自带https域名，但是需要魔法访问，可以自购国内域名，配置解析后即可用自己的国内域名正常访问了。
- Vercel 的核心主要包括开发、预览、部署。通过授权Github给Vercel后，就可以选择我们要部署的项目Github仓库
- 注册：Vercel账号可以直接使用github账号关联
:::


### vercel地址
[https://vercel.com](https://vercel.com/)


### 提供了以下模板支持：
- Nuxt.js: Vue的SSR框架
- Hexo: 快速生成博客网站
- Remix： 一款边缘原生的全栈 JavaScript 框架
- 模版多达30种..


### 选择模板可视化部署：
- [掘金地址](https://juejin.cn/post/7111951325880909855?searchId=202308291647083BEAF1F55A93AFAFED96)
- [或者参考ChatGPT搭建流程](https://haidong-once.github.io/myblog/frontEnd/tools/chatGPT/gpt1.html)


### 项目内命令部署：
```shell
1.  npm install vercel@latest -g （全局安装） or yarn global add vercel
2.  vercel login
3.  vercel (除了初始化.vercel文件 也可以触发项目的Deploy部署)
```