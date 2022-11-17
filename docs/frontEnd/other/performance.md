
# vue 移动端项目构建优化方案及测试流程

[[toc]]


::: tip 背景
水滴vue 移动端项目打包速度太慢，严重影响开发效率，需要尽可能提升构建速度，节约开发中的宝贵时间。
:::

## vue及脚手架版本
| 类目  | 版本  |
|:---:|:---:|
| vue | 2.6.10 |
| vue/cli | 4.4.1 |
| vant | 2.12.44 |
| webpack | 4.0... |

## 实测构建速度：
| 类目  |      版本       |
|:---:|:-------------:|
| 冷启动（首次启动dev） | 1min, 46 secs |
| 热启动（有缓存启动dev） |    46 secs    |
| 热加载（ctrl+s 自动刷新页面） |   6-10 secs   |
| 初次打包构建（build） |     2min      |
| 有缓存打包构建（build） |     1min     |

### 分析
- 频次最多的构建为：热启动，热加载，测试环境打包；（热启动频次较多的原因是，热加载不稳定，会出现未启动加载，或者启动卡顿）<br>
- 所以，优先级最高的优化，主要集中在热启动，热加载，和测试环境打包的方向。

## 解决方案梳理
1. **原版本构建优化配置（主要是webpack配置）：风险最低**
   - 缓存
   - 多进程
   - 寻址优化
   - 分模块构建打包
   - 抽离拆封项目
   - import优化
   - 打包体积优化
   - 图片压缩（有损）
   - 代码压缩
   - 使用cdn导入依赖<br>
  （**以上类目可在，webpack5,vite,vue3的基础上继续针对性优化**）
2. vue/cli4——vue/cli5 (webpack4——webpack5)：有一定风险
3. webpack4——vite ：风险较高
4. vue2+webpack4——vue3+vite  ： 风险、时间成本最高，但有利提升项目性能和开发效率
5. 分析包大小和结构，清除无用依赖和代码 ：后续补充方案


## 原版本构建优化流程

### 构建时间插件
#### `speed-measure-webpack-plugin`
安装依赖：
```shell
npm install --save-dev speed-measure-webpack-plugin
#或者 or
yarn add -D speed-measure-webpack-plugin
```
配置：
```ts
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
configureWebpack: config => {
    config.plugins.push(new SpeedMeasurePlugin())
},

// 或者：
chainWebpack: config => {
    config.plugin('speed-measure-webpack-plugin')
          .use(SpeedMeasurePlugin)
          .end()
},
```
打包后生成配置：
![图片](/images/frontEnd/other/performance/1.png)


### 打包后文件结构分析
#### `webpack-bundle-analyzer`
安装依赖：
```shell
# NPM
npm install --save-dev webpack-bundle-analyzer
# Yarn
yarn add -D webpack-bundle-analyzer
```
配置：
```ts
const BundleAnalyzerPlugin = 
require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
configureWebpack: config => {
    config.plugins.push(new BundleAnalyzerPlugin())
},
```

执行命令：
```shell
vue-cli-service build --report
#or
vue-cli-service build --report-json
```

点击生成的连接，打开打包后的文件报告: <br>
![图片](/images/frontEnd/other/performance/img.png)
