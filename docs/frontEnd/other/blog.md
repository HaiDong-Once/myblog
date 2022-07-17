# 博客搭建

[[toc]]

## vuepress搭建博客

### 依赖环境

- node.js v14+
- yarn v1 或者 npm

### 手动安装

- 创建并进入新目录

```shell
mkdir vuepress-starter
cd vuepress-starter
```

- 初始化项目

```shell
git init
yarn init
```

- 将 `VuePress` 安装为本地依赖

```shell
yarn add -D vuepress@next
```

- 在`package.json` 中添加 `scripts`

```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```

- 将默认的临时目录和缓存目录添加到 `.gitignore` 文件中

```shell
echo 'node_modules' >> .gitignore
echo '.temp' >> .gitignore
echo '.cache' >> .gitignore
```

- 创建你的第一篇文档

```shell
mkdir docs
echo '# Hello VuePress' > docs/README.md
```

- 启动项目

```shell
yarn run dev
```

- 打开预览地址 `http://localhost:8080`

### 配置文件目录

- 新建`.vuepress `-> `config.js`

  ![图片](/images/frontEnd/img_18.png)

### 在config.js中添加配置

```ts
const {defaultTheme} = require('vuepress')
const {searchPlugin} = require('@vuepress/plugin-search')

module.exports = {
    base: '/myblog/', // 注意base配置与项目名一致
    lang: 'zh-CN',
    title: '咚咚咚',
    description: '咚咚咚的blog站点',
    head: [['link', {rel: 'icon', href: 'https://vuejs.org/images/logo.png'}]],
    theme: defaultTheme({
        // 默认主题配置
        navbar: [
            {
                text: '前端框架',
                children: [
                    {
                        text: 'vue开发',
                        link: '/frontEnd/vue/workApply.md',
                        activeMatch: '^/foo',
                    },
                    {
                        text: '小程序',
                        link: '/not-foo/',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: 'php原生',
                        link: '/not-foo/',
                        activeMatch: '^/foo/',
                    },
                ],
            },
        ],
    }),
    logo: 'https://vuejs.org/images/logo.png',
    repo: 'https://github.com/HaiDong-Once',
    repoLabel: 'gitHub',
    sidebar: "auto",
    plugins: [
        searchPlugin({
            // 配置项
        }),
    ],

}
```

### 配置首页样式
- `docs`——>`md` 为博客首页

  ![图片](/images/frontEnd/img_19.png)

```markdown
---
home: true
heroText: welcome 咚咚咚 blog
tagline: 想我所想，尽我所能;
actions:
- text: 查看最近更新
  link: /frontEnd/vue/workApply.md
  type: primary
heroImage: https://vuejs.org/images/logo.png
features:
- title: Calm
  details: 请赐我平静, 去接受我无法改变的事;
- title: Courage
  details: 请赐我勇气, 去做我能改变的事;
- title: Wisdom
  details: 请赐我智慧, 去分辨两者的不同;
  footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

### 配置自动部署脚本
- 在根目录下新建`scripts`——>`deploy-gh.sh`

  ![图片](/images/frontEnd/img_20.png)

```shell
# 项目部署脚本配置
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
#git push -f git@github.com:HaiDong-Once/HaiDong-Once.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 把上面的 <USERNAME> 换成你自己的 Github 用户名，<REPO> 换成仓库名，
 git push -f https://github.com/HaiDong-Once/myblog.git master:gh-pages

cd -
```

### 配置执行部署脚本
```json
"scripts": {
  "dev": "vuepress dev docs",
  "build": "vuepress build docs",
  "deploy": "./scripts/deploy-gh.sh"
}
```

### 执行部署命令
```shell
yarn run deploy
```

### 配置github page
- 需要开放github项目

  ![图片](/images/frontEnd/img_21.png)

  ![图片](/images/frontEnd/img_22.png)

  ![图片](/images/frontEnd/img_23.png)

### 最终效果
  ![图片](/images/frontEnd/img_24.png)