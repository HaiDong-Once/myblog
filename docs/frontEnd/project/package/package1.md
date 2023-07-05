
# pnpm
[[toc]]


## pnpm介绍
### 什么是pnpm
pnpm是 Node.js 的替代包管理器。它是 npm 的直接替代品，但速度更快、效率更高。

### 为什么效率更高？
- 当您安装软件包时，我们会将其保存在您机器上的全局存储中，然后我们会从中创建一个硬链接，而不是进行复制。
对于模块的每个版本，磁盘上只保留一个副本。例如，当使用 npm 或 yarn 时，如果您有 100 个使用lodash的包，则磁盘上将有 100 个 lodash 副本。
- pnpm 可让您节省数 GB 的磁盘空间！

### pnpm优势
pnpm 拥有Yarn 超过 npm 的所有附加功能：
- 安全: 与 yarn 一样，pnpm 有一个包含所有已安装包校验和的特殊文件，用于在执行代码之前验证每个已安装包的完整性。
- 离线模式: pnpm 将所有下载的包 tarball 保存在本地注册表镜像中。当包在本地可用时，它从不发出请求。使用该 --offline 参数可以完全禁止 HTTP 请求。
- 速度: pnpm 不仅比 npm 快，而且比 yarn 快。无论是冷缓存还是热缓存，它都比 yarn 快。yarn 从缓存中复制文件，而 pnpm 只是从全局存储中链接它们。

### 与 npm 的差别
- 与 npm 不同的是，pnpm 会校验所有的参数。 比如，`pnpm install --foo` 会执行失败，因为 --foo 不是 `pnpm install`的有效参数。
- 但是，某些依赖关系可能使用 `npm_config`_ 环境变量，其中 从 CLI 选项中填充。 在这种情况下，你有以下选择：
- 设置明确的环境变量：`npm_config_foo=true pnpm install`
- 用 `--config.` 强制使用未知选项: `pnpm install --config.foo`



## pnpm 安装使用

### 安装：
```shell
npm install pnpm -g
```

### 设置源：
```shell
// 查看源
pnpm config get registry
// 切换淘宝源
pnpm config set registry https://registry.npmmirror.com/
```

### 使用：
```shell
pnpm install 包名称
pnpm i 包名称
pnpm add 包名称    // -S  默认写入dependencies
pnpm add -D    // -D devDependencies
pnpm add -g    // 全局安装
```

### 移除：
```shell
pnpm up  // 更新所有依赖项
pnpm upgrade 包  // 更新包
pnpm upgrade 包 --global  // 更新全局包
```

### 设置存储路径：
```shell
pnpm config set store-dir /path/to/.pnpm-store
```