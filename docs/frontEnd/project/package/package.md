
# npm 
[[toc]]

## npm 切换镜像

### 检查镜像
```shell
npm config get registry
```

### 设置镜像
```shell
// 淘宝源
npm config set registry https://registry.npmmirror.com/
// 境外源
npm config set registry https://registry.npmjs.org/
```