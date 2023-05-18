
# 热更新优化

## 热更新速度提升：dynamic-import
:::tip 说明
`babel-plugin-dynamic-import-node` 是一个Babel插件，它的作用是将 JavaScript 中的动态导入`（dynamic import）`语句转换为对 Node.js 的 require 函数的调用。 
动态导入是 JavaScript 中一种异步加载模块的方式，它允许在运行时加载和执行模块。
:::

### 安装动态编译插件
```shell
npm install babel-plugin-dynamic-import-node -D
```

### 配置babel
```ts
 // 修改配置文件：babel.config.js
module.exports = {
  env: {
    development: {
      plugins: ['dynamic-import-node']
    }
  }
}	
```

### 启动项目测试效果
- dev 环境 项目启动  **20秒——6秒**
- dev 环境 热更新 **3秒——1.6秒**