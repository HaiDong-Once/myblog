

# mac 安装 Homebrew 安装教程
[[toc]]


## 一、介绍
Homebrew是Mac的包管理器，可以通过执行命令来下载和安装所需的软件包，省去了下载、解压和安装等繁琐步骤。

## 二、Homebrow安装

### 官方安装教程
#### 1、官网地址安装：
[https://brew.sh/](https://brew.sh/)

**安装命令：**
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**安装报错：**
```shell
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
```

**解决方法：**
<br/>打开 https://www.ipaddress.com/ 输入访问不了的域名
查询之后可以获得正确的 IP 地址
在本机的 host 文件中添加，建议使用 switchhosts 方便 host 管理
```shell
// 配置host
185.199.108.133 raw.githubusercontent.com
185.199.108.133 user-images.githubusercontent.com
185.199.108.133 avatars2.githubusercontent.com
185.199.108.133 avatars1.githubusercontent.com
```

```shell
// 取消http代理
$ git config --global --unset http.proxy 
$ git config --global --unset https.proxy
```

#### 2、国内版本安装
- 参考链接：https://zhuanlan.zhihu.com/p/111014448
- 参考链接2：https://gitee.com/cunkai/HomebrewCN/blob/master/error.md

安装命令：
```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

## homebrow使用
```
使用 brew 安装软件
brew install wget
使用 brew 卸载软件
brew uninstall wget
使用 brew 查询软件
brew search /wge*/
其他brew命令
brew list           列出已安装的软件
brew update     更新brew
brew home       用浏览器打开brew的官方网站
brew info         显示软件信息
brew deps        显示包依赖
```