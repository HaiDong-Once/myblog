
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

## 实测构建速度
| 类目  |      版本       |
|:---:|:-------------:|
| 冷启动（首次启动dev） | 1min, 46 secs |
| 热启动（有缓存启动dev） |    46 secs    |
| 热加载（ctrl+s 自动刷新页面） |   6-10 secs   |
| 初次打包构建（build） |     2min      |
| 有缓存打包构建（build） |     1min     |

::: tip 分析
- 频次最多的构建为：热启动，热加载，测试环境打包；（热启动频次较多的原因是，热加载不稳定，会出现未启动加载，或者启动卡顿）<br>
- 所以，优先级最高的优化，主要集中在热启动，热加载，和测试环境打包的方向。
  :::

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
    - 使用cdn导入依赖

2. **`vue/cli4——vue/cli5 (webpack4——webpack5)`：有一定风险**
3. **`webpack4——vite` ：风险较高**
4. **`vue2+webpack4——vue3+vite`  ： 风险、时间成本最高，但有利提升项目性能和开发效率**
5. **分析包大小和结构，清除无用依赖和代码 ：后续补充方案**


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
点击生成的连接，打开打包后的文件报告:

![图片](/images/frontEnd/other/performance/img.png)

网页文件报告如图所示:

![图片](/images/frontEnd/other/performance/img_1.png)


### 检查vue/cli webpack配置
```shell
vue inspect --mode production > output.js
```
优化vue/cli打包配置前，可以先检查vue/cli脚手架内都有哪些webpack配置

![图片](/images/frontEnd/other/performance/img_2.png)


### 开启构建缓存插件
#### `cache-loader`（webpack配置）
```shell
npm install cache-loader -D
```
根据打包耗时分析，配置耗时最多的loader开启缓存
```ts
// vue.config.js
module.exports = {
    //...
   config.module.rules.push(
        {
            test: /\.jsx?$/,
            use: ['cache-loader','url-loader']
        },
        {
            test: /\.jsx?$/,
            use: ['cache-loader','less-loader']
        }
    )
}
```

#### 直接开启（vue/cli）
```ts
chainWebpack: (config) => {
  config.cache(true)
}
```
实际上，`Vue-Cli4` 已经内置了 `cache-loader` 进行以下两个的缓存了，在`.cache`文件中可以看到

![图片](/images/frontEnd/other/performance/img_3.png)

#### `hard-source-webpack-plugin` 插件
```shell
npm i hard-source-webpack-plugin -D
```
在vue.config.js中配置：
```ts
const HardSourceWebpackPlugin  = require('hard-source-webpack-plugin')
chainWebpack: config => {
   config.plugin('cache').use(HardSourceWebpackPlugin)
}
/***********或者**********************/
module.exports = {
  configureWebpack: config => {
    config.plugin.push(
      // 为模块提供中间缓存，缓存路径是：node_modules/.cache/hard-source
      new HardSourceWebpackPlugin({
        root: process.cwd(),
        directories: [],
        environmentHash: {
          root: process.cwd(),
          directories: [],
          files: ['package.json', 'yarn.lock']
        }
      })
      // 配置了files的主要原因是解决配置更新，
      // cache不生效了的问题，配置后有包的变化，plugin会重新构建一部分cache
    )
  }
}
```
::: tip 总结
- 再启动，虽然看到里`.cache`文件中新生成了一起缓存文件，但是进度条到94%就无法启动了，查到`HardSourceWebpackPlugin` `GitHub`文档发现，
  已经五年未更新过了，这个插件已经不在维护，无法使用了。
- 虽然`vue/cli4`中默认添加了`vue,label`，两个 `loader` 的缓存，但是效果不是很理想，热启动，热加载时间依旧比较长。
  :::


### 开启多线程
#### vue/cli开启多线程
```ts
module.exports = {
  parallel: true,
}
```
#### `thread-loader` (Webpack开启多线程)
```shell
npm install thread-loader --save-dev 
```
在vue.config.js中添加配置
```ts
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          "thread-loader",
          // 耗时的 loader （例如 babel-loader）
        ],
      },
    ],
  },
};
```

-  发现`vue/cli4`中已经默认开启多线程构建，无需新增配置。

### 寻址优化
缩小文件检索解析范围：(添加后没有效果)
```ts
// vue.config.js
module.exports = {
   configureWebpack:{
    module: {
      noParse: 
      /^(vue|vue-router|vuex|vuex-router-sync|lodash|echarts|axios|view-design)$/
    }
  }
}
```

### import优化
#### `babel-plugin-dynamic-import-node`
运用这个插件能在代码使用了import语法的情况下，大大提高代码的编译速度。但是配置后没有明显效果

```shell
npm install --save-dev babel-plugin-dynamic-import-node
```
修改babel.config.js配置
```ts
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  env: {
    development: {
      plugins: ["dynamic-import-node"]
    }
  }
};
```

### 打包体积优化
production环境不生成SourceMap（我们项目中已经配置）
```ts
module.exports = {
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV !== "production", 
  //打包不生成map文件
}
```

### 图片压缩
#### `image-webpack-plugin`
- 对图片像素要求没很极致的，这个压缩还是可以使用的，压缩率肉眼看起来感觉是没太大区别。没有对svg进行压缩，
  原因是压缩的svg,再通过构建时被打包成base64时，生成的base64会有问题，无法访问。
- `url-loader` 和 `image-webpack-loader` 不能一起使用，否则会导致图片出不来
- 一定要先写 `‘file-loader’` 才能使用 `‘image-webpack-loader’`

```shell
npm install --save-dev image-webpack-loader
```
在vue.config.js中配置图片压缩
```ts
module.exports = {
  chainWebpack: config => {
   // 对图片进行压缩
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
	}
}
```

### 代码压缩
使用 `gzip` 压缩代码，效果显著。（报错，版本问题）

```shell
npm install compression-webpack-plugin
```
在vue.config.js中配置
```ts
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  configureWebpack: config => {
    // 生产环境下生效
    if (process.env.NODE_ENV === 'production') {
      // 配置 gzip 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          threshold: 4096 // 超过4kb压缩
        })
      )
    }
  }
}
```

### 依赖使用CDN配置
将公用库改为cdn引入方式，加快访问速度，注入html的插件无需安装，已经内置，但是不安全，
一般不建议这样操作。除非将依赖配置到公司自己的CDN服务器上。
### Vue Cli配置说明
官网地址：[https://cli.vuejs.org/zh/guide/webpack.html](https://cli.vuejs.org/zh/guide/webpack.html)
#### configureWebpack
调整 `webpack` 配置最简单的方式就是在 `vue.config.js` 中的 `configureWebpack` 选项提供一个对象：
该对象将会被 `webpack-merge `合并入最终的 `webpack` 配置。
```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
  }
}
```
#### 链式操作 (高级)
- `Vue CLI` 内部的 `webpack` 配置是通过 `webpack-chain` 维护的。这个库提供了一个 `webpack` 原始配置的上层抽象，
  使其可以定义具名的 `loader` 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改。
- 它允许我们更细粒度的控制其内部配置。接下来有一些常见的在 `vue.config.js` 中的 `chainWebpack` 修改的例子。

修改 Loader 选项
```ts
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(
      options => {
        // 修改它的选项...
        return options
      })
  }
}
```
- 对于 `CSS` 相关 `loader` 来说，我们推荐使用 `css.loaderOptions` 而不是直接链式指定 `loader`。这是因为每种 `CSS` 文件类型都有多个规则，
- 而 `css.loaderOptions` 可以确保你通过一个地方影响所有的规则。

#### externals
- `externals` 配置提供了不从 `bundle` 中引用依赖的方式。
- 简单理解就是不通过npm下载的类库，在html文件中以script引入，
  然后在页面中使用import导入的这种方式，比如我们前面说道的CDN导入依赖的方式

```ts
module.exports = {
  configureWebpack: config => {
    // 配置 cdn，这里将 vue，vue-router 和 axios 三个包配置成 cdn 引入
    // 其中 Vue，VueRouter 等名称是该库暴露在全局中的变量名
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      html2canvas: "html2canvas"
    }
  }
}
```
- 通过以上在vue/cli(webpack4中的配置），效果并不是很明显，大部分方式没有产生有效的作用，
  所以我们还是需要尝试使用升级项目脚手架以及其他依赖的方式，提升效果打包速度、项目性能，以及开发效率。


## 升级vue/cli5
### webpack5新特性

- **持久化缓存的优化**<br>
  v4是根据代码的结构生成 **chunkhash**，现在v5根据完全内容生成 **chunkhash**，比如改了内容的注释或者变量则不会引起**chunkhash**的变化，让浏览器继续使用缓存。

- **剔除`npm`包里面针对`Node.js`模块自动引用的`Polyfills`**<br>
  v4编译引入npm包，有些npm包里面包含针对nodejs的**polyfills**，实际前端浏览器是不需要的，v5编译中，会出现`polyfill`添加提示，
  如果不需要**node polyfille**,按照提示 alias 设置为 false 即可

- **`Tree Shaking`升级**<br>
  `tree shaking `的意思是，`webpack` 在打包的时候将会剔除掉被没有被使用到的代码达到减小报体积，缩短 http 请求时间，起到一定效果的页面优化。

- **代码分割`splitchunk`升级**<br>
  为了让我们的打出来的包体积更加小，颗粒度更加明确

### 升级流程
官网文档：[https://cli.vuejs.org/migrations/migrate-from-v4.html](https://cli.vuejs.org/migrations/migrate-from-v4.html)
```shell
npm uninstall -g @vue/cli

npm install -g @vue/cli
# OR
yarn global add @vue/cli

vue -V  // 5.0.8

vue upgrade
```
![图片](/images/frontEnd/other/performance/img_4.png)

升级后变更的依赖：

![图片](/images/frontEnd/other/performance/img_5.png)

### 报错和依赖问题
#### 出现一个版本问题报错，指向到vue.config.js中的images配置，
查阅文档后发现，vue/cli5图片处理弃用了`url-loader`的方式，改用`parser`的方式

![图片](/images/frontEnd/other/performance/img_6.png)

更新配置：
```ts
// vue/cli 4
config.module
    .rule('images')
    .use('url-loader')
    .loader('url-loader')
    .tap(options => Object.assign(options, {
        limit: 1
    }))
    
// vue/cli 5
config.module
    .rule('images')
    .set('parser', {
        dataUrlCondition: {
            maxSize: 1
        }
    })
```

#### overlay配置报错，这个是为了方式eslint代码检测导致的报错中断构建

![图片](/images/frontEnd/other/performance/img_7.png)

这个配置在vue-cli 5.x版本里会不兼容，要去掉，新的eslint已优化了相关配置，不需要单独设置overlay,**删除这项配置即可**

![图片](/images/frontEnd/other/performance/img_8.png)

#### **出现了路径错误：**

![图片](/images/frontEnd/other/performance/img_9.png)

这种取图方式vue/cli5不支持会报错，**需要用本地路径替换**

![图片](/images/frontEnd/other/performance/img_10.png)

#### **路由配置文件里找不到的页面在vue/cli5会报错，需要删除**

![图片](/images/frontEnd/other/performance/img_12.png)

#### **静态文件里有一个快捷方式文件，vue/cli5静态文件处理时会报错，静态资源处理会报错，删除即可**

![图片](/images/frontEnd/other/performance/img_11.png)

#### **postcss报错**
![图片](/images/frontEnd/other/performance/img_14.png)

vue/cli5 升级到postCss8 需要更新postcss-loader  或者**更新postcss 8.0以上**

![图片](/images/frontEnd/other/performance/img_15.png)
![图片](/images/frontEnd/other/performance/img_16.png)

#### 修改完postcss版本后，postcss-pxtorem 失效了，
- 最终发现，因为我在 `package.json` 中配置了 `postcss` ,所以 `postcss.config.js` 就不会执行了
- 需要关闭 `package.json` 和 `vue.config.js` 中的配置，只保留 `postcss.config.js` 才会生效
```json
// package.json 中删除这段配置
"postcss": {
   "plugins": {
      "autoprefixer": {}
   }
},
```
- 配置完成后发现，`vant`, 和 `guanjia_page_` 的文件并没有生效，说明 `postcss.config.js` 中的判断无效，
```ts
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = ({ file }) => {
   console.log(666666666666666666666666666666, file)
   let rootValue
   if (file && file.basename && file.basename.indexOf('guanjia_page_') > -1) {
      rootValue = 37.5
   } else if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
      rootValue = 37.5
   } else {
      rootValue = 108
   }
   // .................
}
```

- 我们打印一下 file 这个传参，发现 webpack5 中 file 并非是一个对象，而是文件的绝对路径字符串
```ts
console.log(666666666666666666666666666666, file)
6.666666666666666e+29 G:\persnal\web-php\app-shuidi\view\vue\node_modules\vant\es\popover\index.less
6.666666666666666e+29 G:\persnal\web-php\app-shuidi\view\vue\node_modules\vant\es\divider\index.less
6.666666666666666e+29 G:\persnal\web-php\app-shuidi\view\vue\src\components\common\auto-complete.vue
6.666666666666666e+29 G:\persnal\web-php\app-shuidi\view\vue\src\components\risk\RiskNotice.vue
6.666666666666666e+29 G:\persnal\web-php\app-shuidi\view\vue\src\components\maptree\maptree-structure.vue
```

- 所以，重新修改判读，取用 file 字符串判，移动端适配即可生效
```ts
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = ({ file }) => {
    let rootValue
    if (file && file.indexOf('guanjia_page_') > -1) {
        rootValue = 37.5
    } else if (file && file.indexOf('vant') > -1) {
        rootValue = 37.5
    } else {
        rootValue = 108
    }
    return {
        plugins: [
            autoprefixer(),
            pxtorem({
                rootValue: rootValue,
                propList: ['*'],
                minPixelValue: 2
            })
        ]
    }
}
```


再次测试环境打包:

![图片](/images/frontEnd/other/performance/img_17.png)

#### **因为webpack 构建回调异常，执行命令后，启动构建了两次，run,done钩子也执行了两次**

![图片](/images/frontEnd/other/performance/img_18.png)

**解决方法:**
1. 修改 browserslist，一般在 package.json 中或者单独的 `.browserslistrc` 文件中，添加一个 not ie 11
```json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not dead",
  "not ie 11"
]
```
2. 执行 build 的时候加一个 --no-module
```shell
vue-cli-service build --no-module
```
参考连接：[https://blog.csdn.net/weixin_44243061/article/details/124401155
](https://blog.csdn.net/weixin_44243061/article/details/124401155
)

#### **打包日志里有好多警告，是指向vant下的less文件的,  加载顺序冲突**

![图片](/images/frontEnd/other/performance/img_20.png)

**vue.config.js中增加：（忽略顺序）配置**
```ts
css: {
    extract: {
        ignoreOrder: true
    }
},
```

#### **升级后其他人git pull项目后，安装依赖会对等依赖警告中断安装**
```shell
peerDependencies WARNING vue-pdf@4.3.0 › worker-loader@^2.0.0 requires a peer of webpack@^3.0.0 || ^4.0.0-alpha.0 || ^4.0.0 but webpack@5.75.0 was installed
peerDependencies WARNING cytoscape-node-html-label@^1.2.0 requires a peer of @types/cytoscape@^3.1.0 but none was installed
peerDependencies WARNING @vue/cli-service@5.0.8 › webpack-dev-server@4.11.1 › ws@^8.4.2 requires a peer of bufferutil@^4.0.1 but none was installed
peerDependencies WARNING @vue/cli-service@5.0.8 › webpack-bundle-analyzer@4.7.0 › ws@^7.3.1 requires a peer of bufferutil@^4.0.1 but none was installed
```
**说明：**
- 在NPM v7中，现在默认安装 `peerDependencies`。
- 在很多情况下，这会导致版本冲突，从而中断安装过程。
- `--legacy-peer-deps`标志是在v7中引入的，目的是绕过 `peerDependency` 自动安装；它告诉 NPM 忽略项目中引入的各个modules之间的相同modules但不同版本的问题并继续安装，
  保证各个引入的依赖之间对自身所使用的不同版本modules共存。<br>
  **解决方法：安装依赖使用`--legacy-peer-deps`标志**<br>
```shell
npm install --legacy-peer-deps
```

#### **Module not found 未找到core-js报错**
```shell
 error  in ./node_modules/vue-router/dist/vue-router.esm.js

Module not found: Error: Can't resolve 'core-js/modules/es.array.push.js' in 'G:\wamp64\www\web-php\app-shuidi\view\vue\node_modules\vue-router\dist'

 Failed to resolve loader: core-js/modules/es.array.push.js' in 'G:\wamp64\www\web-php\app-shuidi\view\vue\node_modules\vant\es\uploader
You may need to install it.
```
**解决方法，删除依赖包，先npm install core-js --save,  再执行npm install**

#### **启动页面报错：regeneratorRuntime 找不到，使用await问题**
```shell
shuidi.f5c3d64e.js:formatted:5473 Uncaught ReferenceError: regeneratorRuntime is not defined
```
**解决方法：安装配置：regeneratorRuntime**
```shell
npm install @babel/plugin-transform-runtime
```
```json
/* babel.config.js */
"plugins": [
  "@babel/plugin-transform-runtime",
]
```

#### **打包后代码未更新：静态资源git状态异常，重置git状态**
**解决方法：检查静态文件git状态，或重新克隆静态文件仓库**

#### **资源锁定：因为目录下启动了cmd,关闭即可**
```shell
(node:14508) UnhandledPromiseRejectionWarning: Error: EBUSY: resource busy or locked, rmdir 'G:\wamp64\www\static\shuidivue'
```

#### **core.js未指定警报： 需要在babel.config.js中指定版本**
**core.js介绍：** [https://q.shanyue.tech/engineering/734.html](https://q.shanyue.tech/engineering/734.html)

#### **打包部署node服务器出现net::ERR_ABORTED 404 (Not Found)问题解决**
参考链接：[https://blog.51cto.com/u_15346041/3664766](https://blog.51cto.com/u_15346041/3664766)
```ts
module.exports = {
    publicPath: "./"
}
```

#### 弃用node-sass, 改用dart-sass替换
```shell
npm uninstall node-sass -D
npm i sass -D
```
- 项目中样式有用 /deep/ ；如果使用 less 对 css 做出预处理的话，
  使用 /deep/ 就可以完成样式穿透的行为；如果使用的 scss 对 css 做出的预处理，
  ::v-deep 替换了 /deep/ 就解决这个问题。

#### css热更新异常问题
- extract配置导致， 删除配置，逐一解决警告
```ts
// vue.cofig.ts
extract: {
    ignoreOrder: true
}
```
```
// 语法过时
background-image: linear-gradient(left, #f9dfc5, #dfab6e);
替代为
linear-gradient(to right, #f9dfc5, #dfab6e)

// 空值警告 enterprise-change.vue
background: url('') 

// import语法
import SwiperCore, { Autoplay , EffectCube } from "swiper";

// v-for未加key键值
<van-swipe-item v-for="item in datas.recommend">: 
component lists rendered with v-for should have explicit keys
替换为
<van-swipe-item v-for="(item,index) in datas.recommend" :key="index">
```

#### 新增预发布环境，解决上线问题

..........






### 打包结果

```json
// 冷启动，无缓存
General output time took 1 min, 30.76 secs
// 热启动，有缓存（只有label-loader)
General output time took 1 min, 12.04 secs
```

### 开启webpack5内置缓存
```ts
configureWebpack: config => {
    config.cache = {
        type: 'filesystem',
        allowCollectingMemory: true
     }
}
```
缓存文件里多了一个webpack

![图片](/images/frontEnd/other/performance/img_13.png)

### 升级前后构建速度对比
| 构建类别  |    升级前构建时间    | 升级后构建时间  | 提升幅度  |
|:---:|:-------------:|:--------:|:-----:|
| 冷启动（首次启动dev） | 1min, 46 secs |     1min, 30secs     |   不变    |
| 热启动（有缓存启动dev） |    46 secs    |     **13 secs**     |   **70%**    |
| 热加载（ctrl+s 自动刷新页面） |   6-10 secs   |    **2-3 secs**      |   **70%**    |
| 初次打包构建（build） |     2min+     |     2 min     |     不变  |
| 有缓存打包构建（build） |     1min+     |    **14 secs**      |  **80%**     |


##  分离代码：管家和水滴项目分离
**仅打包管家项目代码：关闭shuidi入口**

![图片](/images/frontEnd/other/performance/img_21.png)

```json
// 冷启动
General output time took 42.92 secs
// 热启动
General output time took 4.24 secs
// 热加载
General output time took 1.77 secs
// 首次打包
General output time took 49.47 secs
// 有缓存打包
General output time took 6.97 secs
```

**仅打包水滴信用项目：关闭guanjia入口**

![图片](/images/frontEnd/other/performance/img_22.png)

```json
// 冷启动
General output time took 1 min, 37.48 secs
// 热启动
General output time took 11.32 secs
// 热更新
General output time took 2.66 secs
// 首次打包
General output time took 1 min, 46.26 secs
// 再次打包
General output time took 7.24 secs
```


## 升级vue2+vite版本

## 直接升级vue3+vite版本

## 分析包大小和结构代码减重