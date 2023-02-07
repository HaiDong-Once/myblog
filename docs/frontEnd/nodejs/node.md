
# nodejs
[[toc]]


## node版本切换 nvm

### 下载安装nvm
- 下载地址：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

### 使用命令
```shell
# 会提示nvw下的相关命令
nvm

# 查看可安装版本
nvm list [available]

# 安装指定node版本
nvm install v14.15.0

# 运行指定node版本
nvm use v14.15.0

# 切换到最新的node版本
nvm use node

# 远程服务器上所有的可用版本
nvm ls-remote

# 给不同的版本号设置别名
nvm alias node_cms 14.15.0

# 使用该别名
nvm use node_cms

# 查看已安装node列表
nvm ls
```