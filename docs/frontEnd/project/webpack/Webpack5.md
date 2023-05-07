
# webpack5基础文档

[[toc]]


## 概述
::: tip 概述:
`Webpack` 是一种前端资源构建工具，静态模块打包器 (` module bundler` )。在 `Webpack` 看来，前端的所有资源文件
( `js / json / css / img / less / … `) 都会作为模块处理。它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源 ( `module` )。
:::


## 基础使用

### 安装
首先使用 `npm init` 初始化项目，然后安装 `webpack` 以及 `webpack-cli` 。
```shell
// 全局安装
npm i webpack webpack-cli -g

// 本地安装: 推荐
npm i webpack webpack-cli -D
```

### 配置文件
在文件根目录下新建 `webpack.config.js` 配置文件
```ts
// webpack.config.js
module.exports = {
  entry: './assets/js/main.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [

    ]
  },
  plugins: [

  ],
  mode: 'development'
}
```

### 打包命令
使用本地环境进行打包输出
```shell
npx webpack
```


## 核心概念

### Entry 入口
指示 `Webpack` 以哪个文件为入口起点开始打包，分析构建内部依赖图。

### Output 输出
指示 `Webpack` 打包后的资源 `bundles` 输出到哪里，以及如何命名。
```ts
module.exports = {
  // ...
  output: {
    // 输出文件名称
    filename: 'app.js',
    // 输出文件路径
    path: path.resolve(__dirname, 'dist'),
    // 删除不需要的旧文件
    clean: true
  }
}
```

### Loader 解析器
让 Webpack 能够去处理那些非 JavaScript 文件 ( Webpack 自身只理解 JavaScript )。

### Plugins 插件
可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。

### Mode 模式
指示 Webpack 使用相应模式的配置。
```ts
development 开发模式：会将 process.env.NODE_ENV 的值设为 development。启用 NameChunksPlugin 和 NameModulesPlugin。特点是能让代码本地调试运行的环境。
production 生产模式：会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin。特点是能让代码优化上线运行的环境。
none：
```


## devServer
::: tip 说明
在开发环境中，用于自动编译并自动刷新页面，方便开发过程中的调试。注：该功能只会在内存中编译打包，不会有任何文件输出，如需更新到生产环境中，还需重新打包代码。
:::

### 下载
```shell
npm i webpack-dev-server -D
```

### 配置
在 `webpack.config.js` 文件中进行配置
```ts
module.exports = {
  // ...
  devServer: {
      // 环境目录
      static: './dist',
      // 设置 gzip 压缩，提高传输效率
      compress: true,
      // 设置服务器主机
      host: '0.0.0.0',
      // 设置端口号
      port: 3000,
      // 设置路由
      historyApiFallback: true,
      // 自动打开页面
      open: true,
      // 更改后自动更新
      watchFiles: {
          paths: [
              './*'
          ],
          options: {
              usePolling: false
          }
      },
      // 启用热加载功能
      liveReload: true,
      // 启用热模块功能
      hot: true
  }
}
```

### 启动
```shell
npx webpack-dev-server
```


## 资源模块 Asset Modules
官方说明：[https://webpack.docschina.org/guides/asset-modules](https://webpack.docschina.org/guides/asset-modules) <br>
该方法需将资源在 JS 中通过 import 进行导入或css中进行导入
```ts
// js 文件导入
import 命名 from '资源路径';

// css 文件引用
.box {
  background-image: url('资源路径');
}
```

**资源模块类型**
- `asset/resource`：发送一个单独的文件并导出 `URL`
- `asset/inline`：导出一个资源的 `Data URI` ( 64位图 )
- `asset/source`：导出资源的源代码
- `asset`：在导出一个资源的 `Data URI` 和发送一个单独的文件之间自动进行选择

### resource
```ts
module.exports = {
  // ...
  module: {
    rules: [
      {
        // 监听资源文件
        test: /\.png$/i,
        // 设置资源类型
        type: 'asset/resource',
        generator: {
          // 生成资源名称
          filename: 'assets/images/[name][ext]'
        }
      }
    ]
  }
}
```
资源名称可以使用 `[contenthash][ext]` 将资源名称生成为 `hash` 值命名

### inline
```ts
module.exports = {
  // ...
  module: {
    rules: [
      {
        // 监听资源文件
        test: /\.svg$/i,
        // 设置资源类型
        type: 'asset/inline'
      }
    ]
  }
}
```

### source
```ts
module.exports = {
  // ...
  module: {
    rules: [
      {
        // 监听资源文件
        test: /\.txt$/i,
        // 设置资源类型
        type: 'source'
      }
    ]
  }
}
```

### asset
```ts
module.exports = {
  // ...
  module: {
    rules: [
      {
        // 监听资源文件
        test: /\.jpg$/i,
        // 设置资源类型
        type: 'asset',
        // 小于设置的大小则转为 64 位图，否则转 URL
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        },
        generator: {
          // 生成资源名称
          filename: 'assets/images/[name][ext]'
        }
      }
    ]
  }
}
```


## 资源处理

### HTML 资源
#### 打包 HTML
1. 下载 `html-webpack-plugin` 插件
```shell
npm i html-webpack-plugin - D
```
2. 在 `webpack.config.js` 文件中引入插件并调用
```ts
// 引用插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    // 打包 HTML 文件
    new HtmlWebpackPlugin({
      // 指定 HTML 模版文件
      template: './index.html',
      // 指定 Script 标签位置
      inject: 'body'
    })
  ]
}
```
Webpack 会在输出目录中新创建一个 HTML 文件，在原始的 HTML 文件中无需引入 JS 文件，通过 Webpack 编译后的 HTML 文件会自动引入。<br>
官方说明：[https://webpack.docschina.org/plugins/html-webpack-plugin/](https://webpack.docschina.org/plugins/html-webpack-plugin/) <br>
配置选项：[https://github.com/jantimon/html-webpack-plugin#options](https://github.com/jantimon/html-webpack-plugin#options)

### 样式资源
#### 打包 CSS 资源
下载样式处理解析器 `css-loader` 与 `style-loader`
```shell
npm i css-loader style-loader -D
```
在配置文件中添加解析器
```ts
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // 在 head 中创建 style 标签
          'style-loader',
          // 将 css 文件整合到 js 文件中
          'css-loader'
        ]
      }
    ]
  }
}
```
在 JS 文件中导入 CSS 文件
```ts
import '../css/main.css'
```

#### 打包 SCSS 资源
下载样式处理解析器
```shell
npm i sass-loader sass -D
```
在配置文件中添加解析器
```ts
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 在 head 中创建 style 标签
          'style-loader',
          // 将 css 文件整合到 js 文件中
          'css-loader',
          // 编译 sass 文件为 css 文件
          'sass-loader'
        ]
      }
    ]
  }
}
```

在 JS 文件中导入 SCSS 文件
```ts
import '../css/main.scss'
```

#### 抽离 CSS 代码为独立文件
下载插件 `mini-css-extract-plugin`
```shell
npm i mini-css-extract-plugin -D
```
引用插件
```ts
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 抽离 css 为独立文件
          MiniCssExtractPlugin.loader,
          // 将 css 文件整合到 js 文件中
          'css-loader',
          // 编译 sass 文件为 css 文件
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 对输出结果重命名
      filename: 'assets/css/[name].css'
    })
  ]
}
```
如果是生成模式，将自动压缩css文件，无需额外配置。<br>
官方文档：[https://webpack.docschina.org/plugins/mini-css-extract-plugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin) <br>
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=30](https://www.bilibili.com/video/BV1YU4y1g745?p=30)

#### CSS 代码压缩（生产模式）
安装插件 `css-minimizer-webpack-plugin`
```shell
npm i css-minimizer-webpack-plugin -D
```
在配置文件中进行配置
```ts
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
  // ...
  optimization: {
    minimizer: [
      // 使用插件优化 css 代码
      new CssMinimizerPlugin()
    ],
  },
  // 模式
  mode: 'production'
}
```
压缩 CSS 代码，仅在生产模式下有效 <br>
官方文档：[https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/)

#### CSS 兼容性处理
下载 `postcss-loader, postcss, postcss-preset-env` 模块
```shell
npm i postcss-loader postcss postcss-preset-env -D
```
在根目录下创建 `postcss.config.js` 文件并进行配置
```ts
module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        // 其他选项
      },
    ],
  ],
};
```
引用模块
```ts
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 抽离 css 为独立文件
          MiniCssExtractPlugin.loader,
          // 将 css 文件整合到 js 文件中
          'css-loader',
          // css 兼容处理
          'postcss-loader',
          // 编译 sass 文件为 css 文件
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 对输出结果重命名
      filename: 'assets/css/[name].css'
    })
  ]
}
```
`postcss-preset-env` 帮助 `postcss` 找到 `package.json` 中 `browserslist` 里的配置，通过配置加载指定的 `css` 兼容性
```json
// 在 package.json 中添加浏览器列表

{
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firfoxe version",
      "last 1 safari version"
    ],
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  }
}
```
视频教程：[https://www.bilibili.com/video/BV1e7411j7T5?p=13](https://www.bilibili.com/video/BV1e7411j7T5?p=13) <br>
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=67](https://www.bilibili.com/video/BV1YU4y1g745?p=67)

### 图片资源 *
下载图片处理解析器
```shell
npm i url-loader file-loader html-loader -D
```

### 字体资源
通过 CSS 引入字体资源
```css
@font-face {
  font-family: 'PujiSansExpandedHeavy';
  src: url('../fonts/PujiSans-ExpandedHeavy.eot'); /* IE9 Compat Modes */
  src: url('../fonts/PujiSans-ExpandedHeavy.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('../fonts/PujiSans-ExpandedHeavy.woff2') format('woff2'), /* Modern Browsers */
    url('../fonts/PujiSans-ExpandedHeavy.woff') format('woff'), /* Modern Browsers */
    url('../fonts/PujiSans-ExpandedHeavy.ttf') format('truetype'); /* Safari, Android, iOS */
  font-style: normal;
  font-weight: normal;
  text-rendering: optimizeLegibility;
}
```
在 `webpack.config.js` 文件中进行配置
```ts
module.exports = {
  // ...
  module: {
    rules: [
      {
        // 监听资源文件
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        // 设置资源类型
        type: 'asset/resource',
        generator: {
          // 生成资源名称
          filename: 'assets/fonts/[name][ext]'
        },
      }
    ]
  }
}
```

### 数据资源
如需导入 `CSV, TSV, XML` 等数据格式文件，需使用相关的数据 `loader` 进行加载<br>
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=33](https://www.bilibili.com/video/BV1YU4y1g745?p=33)

### 自定义 JSON 资源
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=34](https://www.bilibili.com/video/BV1YU4y1g745?p=34)

### JS 资源
#### JS 语法检查
使用 `eslint` 扫描我们所写的代码是否符合规范，严格意义上来说，`eslint` 配置跟 `webpack` 无关，但在工程化开发环境中，他往往是不可或缺的。 <br><br>
**安装**
```shell
npm i eslint -D
```
创建配置文件，根据提示选择需要的类型。配置完成后，将在 `node_modules` 文件夹中生成一个 `.eslintrc.json` 文件，将文件复制到根目录下。
```shell
npx eslint --init
```
![图片](/images/frontEnd/other/img_17.png)
在 `VSCode` 中安装扩展 `Eslint` ，重启软件后将自动生效。

#### JS 兼容处理
将 ES6 代码转换为低版本 ES 代码 <br>
- **安装模块：**
- `babel-loader`： 在 `webpack` 里应用 `babel` 解析 `ES6` 的桥梁
- `@babel/core`： `babel` 核心模块
- `@babel/preset-env`： `babel` 预设，一组 `babel` 插件的集合
```shell
npm i babel-loader @babel/core @babel/preset-env -D
```

在 `package.json` 中配置
```ts
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.m?js$/,
        // 排除 node_modules 中安装的库
        exclude: /(node_modules|bower_components)/,
        use: {
          // 加载 loader
          loader: 'babel-loader',
          options: {
            // 配置预设
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=36](https://www.bilibili.com/video/BV1YU4y1g745?p=36)

#### regeneratorRuntime
`regeneratorRuntime` 是 `webpack` 打包生成的全局辅助函数，由 `babel` 生成，用于兼容 `async/await` 的语法。
```ts
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.m?js$/,
        // 排除 node_modules 中安装的库
        exclude: /(node_modules|bower_components)/,
        use: {
          // 加载 loader
          loader: 'babel-loader',
          options: {
            // 配置预设
            presets: ['@babel/preset-env']
            plugins: [
              [
                '@babel/plugin-transform-runtime'
              ]
            ]
          }
        }
      }
    ]
  }
}
```

#### JS 压缩
安装插件 `terser-webpack-plugin`
```shell
npm i terser-webpack-plugin -D
```
配置
```ts
const TerserWebpackPlugin = require("terser-webpack-plugin")

module.exports = {
  // ...
  optimization: {
    minimizer: [
      // 使用插件压缩 js 代码 (生产模式)
      new TerserWebpackPlugin()
    ]
  }
}
```


## 优化
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=92](https://www.bilibili.com/video/BV1YU4y1g745?p=92)

### 公共路径 publicPath
publicPath 配置公共路径，所有文件的引用将自动添加公共路径的绝对地址。
```ts
module.exports = {
  // ...
  output: {
    // ...
    publicPath: 'https://localhost:3000/'
  }
}
```

### 环境变量 Environment variable
环境变量可以消除 `webpack.config.js` 在开发环境和生产环境之间的差异
```ts
module.exports = ( env ) => {
  return {
    // ...
    mode: env.production ? 'production' : 'development'
  }
}
```
打包命令时如果使用生产模式，则在命令后增加：
```shell
npx webpack --env production
```

### 配置文件优化
#### 分别对 `development` 和 `production` 两种模式优化。完整配置文件可查看本页下方 “完整配置”。
1. 首先新建 `webpack-config`文件夹，在文件夹中添加三个文件，分别为通用的配置文件、开发模式的配置文件以及生产模式的配置文件。
2. 使用 `webpack-merge` 将文件进行合并。安装 `webpack-merge`
```shell
npm i webpack-merge -D
```
3. 添加一个合并文件 `webpack.config.js`
```ts
const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.config.common')
const developmentConfig = require('./webpack.config.dev')
const productionConfig = require('./webpack.config.prod')

module.exports = (env) => {
  switch(true) {
    case env.development:
      return merge(commonConfig, developmentConfig)

    case env.production:
      return merge(commonConfig, productionConfig)

    default:
      return new Error('No matching configuration was found.')
  }
}
```
4. 修改 `package.json `文件
```json
// 将自定义的命令分别指向相应的文件以及添加 env 环境变量的参数
{
  "scripts": {
    "start": "webpack serve -c ./webpack-config/webpack.config.js --env development",
    "build": "webpack -c ./webpack-config/webpack.config.js --env production"
  },
}
```
5. 使用命令运行
```shell
npm run start
npm run build
```

### HMR ( 开发环境 )
`Hot module replacement` 热模块替换，可使一个模块发生变化，只重新打包这一个模块，而非全部重新打包，可以更快速的构建代码打包速度。
```ts
module.exports = {
  // ...
  devServer: {
    // ...
    // 开启 HMR 功能
    hot: true
  }
}
```
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=60](https://www.bilibili.com/video/BV1YU4y1g745?p=60) <br>
视频教程：[https://www.bilibili.com/video/BV1e7411j7T5?p=20](https://www.bilibili.com/video/BV1e7411j7T5?p=20)

### Source Map
一种提供源代码到构建后代码映射的技术，如果构建后代码出错了，通过映射关系可以追踪源代码的错误。在 webpack.config.js 文件中配置
```ts
module.exports = {
  // ...
  devtool: 'source-map'
}
```
#### 常用的几种 `source-map` 类型
- `source-map`：生成外部文件，错误代码的准确信息和源代码的错误位置
- `inline-source-map`：内联，错误代码的准确信息和源代码的错误位置。在代码底部生成，构建速度比外部文件更快
- `hidden-source-map`：生成外部文件，错误代码的原因，没有错误位置，无法追踪源代码错误。
- `eval-source-map`：内联，错误代码的准确信息和源代码的错误位置。每一个文件都生成对应的 `source-map`
- `nosources-source-map`：生成外部文件，
- `cheap-source-map`：生成外部文件，错误代码的准确信息和源代码的错误位置。只精确到行
- `cheap-module-source-map`：同 `cheap-source-map`，会将 `loader` 的 `source map` 加入
#### 开发环境建议
- `eval-source-map`
- `eval-cheap-module-source-map`
#### 生产环境建议
- `source-map`
- `nosources-source-map`
- `hidden-source-map`
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=58](https://www.bilibili.com/video/BV1YU4y1g745?p=58)

### Oneof ( 生产模式 )
每个 `loader` 只会匹配一个，不能有两个配置处理一个类型的文件
视频教程：[https://www.bilibili.com/video/BV1e7411j7T5?p=22](https://www.bilibili.com/video/BV1e7411j7T5?p=22)
```ts
module.exports = {
  module: {
    rules: [
      {
        oneOf:[
          {
            // 处理 css 资源
            test: /\.css$/i,
            use: [...CommonCssLoader]
          },
          {
            // 处理 scss 资源
            test: /\.s[ac]ss$/i,
            use: [...CommonCssLoader, 'sass-loader']
          },
          {
            // 处理图片资源
            test: /\.(jpg|jpeg|png|gif)$/i,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:12].[ext]',
              esModule: false,
              outputPath: 'images'
            }
          },
          {
            // 处理 html 中的图片资源
            test: /\.html$/i,
            loader: 'html-loader'
          }
        ]
      }
    ]
  }
}
```

### Tree shaking ( 生产模式 )
去除应用程序中没有使用的代码，可更大程度的优化代码。必须使用 `ES6` 模块化，并开启 `production` 模式
```ts
import { module } from './filename.js'
```
如果不需要某些文件被 `webpack` 清除，可以在 `package.json` 中配置 `sideEffects` 属性
```json
{
  "sideEffects": ["*.css" ,"*.scss", "*.global.js"]
}
```

### Code split ( 生产模式 )
代码分离是 `webpack` 中最引人瞩目的特性之一，可将代码分离到不同的文件中，然后将这些文件按需加载或并行加载，同时还可以获取代码加载的优先级。
#### 方法1: 入口起点( 不推荐 )
使用 `entry` 配置手动分离代码，如果多个入口共享的文件，会分别在每个包里重复打包。
```ts
module.exports = {
  entry: {
    main: './assets/js/main.js',
    other: './assets/js/add.js'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```
#### 方法2: 防止重复
使用 `Entry dependencies` 或者 `SplitChunksPlugin` 去重和分离代码
```ts
module.exports = {
  entry: {
    main: {
      import: './assets/js/main.js',
      dependOn: 'shared'
    },
    other: {
      import: './assets/js/add.js',
      dependOn: 'shared'
    },
    shared: 'jQuery'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```
**`sliptChunks` 插件**
另外，还可使用 `sliptChunks` 插件来实现
```ts
module.exports = {
  // ...
  entry: {
    main: './assets/js/main.js',
    other: './assets/js/add.js'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    sliptChunks: {
      chunks: 'all'
    }
  }
}
```
可以通过 `import` 方法对文件名进行自定义
```ts
import(/* webpackChunkName: '自定义文件名' */'文件路径')
```

#### 方法3: 动态导入
```ts
function getComponent() {
  import('lodash')
    .then(({default: _}) => {
      const element = document.createElement('div')
      element.innerHTML = _.join(['Hello', 'webpack', ''])
      return element
    })
}
getComponent().then((element) => {
  document.body.appendChild(element)
})
```
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=40](https://www.bilibili.com/video/BV1YU4y1g745?p=40)

### 懒加载
指的是 JS 文件的懒加载，当事件触发或条件满足后才进行加载。是很好的优化网页或应用的方法。这种方法实际上是先把代码在一些逻辑断点处分离开，
然后在一些代码块中完成某些操作后，立即引用或即将引用一些新的代码块。这样加快了应用的初始加载速度，减轻总体体积，因为某些代码块可能永远不会被加载。
```ts
document.querySelector('button').addEventListener('click', () => {
  import(/* webpackChunkName: 'filename' */'./filename').then(({ module }) => {
    ...
  })
})
```
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=44](https://www.bilibili.com/video/BV1YU4y1g745?p=44) <br>
视频教程：[https://www.bilibili.com/video/BV1e7411j7T5?p=26](https://www.bilibili.com/video/BV1e7411j7T5?p=26)

### 预加载
等其他资源加载完毕后再进行加载，当事件触发或条件满足后，才会执行。兼容性较差，只能在pc端高版本浏览器中使用，手机端浏览器兼容较差。
```ts
document.querySelector('button').addEventListener('click', () => {
  import(/* webpackChunkName: 'filename', webpackPrefetch: true */'./filename').then(({ module }) => {
    ...
  })
})
```

### 缓存 ( 生产模式 )
使用 `hash` 值为文件命名。
```ts
module.exports = {
  // ...
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```
#### 缓存第三方库
将第三方库提取到单独的 `vendor chunk` 文件中。利用 `client` 的长效缓存机制，命中缓存来消除请求，并减少向 `server` 获取资源，
同时还能保证 `client` 代码和 `server` 代码版本一致。
```ts
module.exports = {
  // ...
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
}
```
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=47](https://www.bilibili.com/video/BV1YU4y1g745?p=47) <br>
视频教程：[https://www.bilibili.com/video/BV1e7411j7T5?p=23](https://www.bilibili.com/video/BV1e7411j7T5?p=23)

### PWA
视频教程：[https://www.bilibili.com/video/BV1e7411j7T5?p=27](https://www.bilibili.com/video/BV1e7411j7T5?p=27) <br>
渐进式网络应用开发程序，可实现网页离线访问，兼容性较差<br>
**下载插件:**
```shell
npm i workbox-webpack-plugin -D
```
```ts
// 引入插件
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

// 配置
module.exports = {
  // ...
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      // 帮组 serviceworkder 快速启动
      clientsClaim: true,
      // 删除旧的 serviceworker
      skipWaiting: true
    })
  ]
}

// js 文件中注册
if( 'serviceWorker' in navigator ) {
  window.addEventListener('load', () => {
    navigator.serviceworker.register('/service-worker.js')
  })
}
```
- 会和 `eslint` 产生冲突，需要修改 `package.json` 中 `eslintConfig` 配置
- 必须运行在服务器上

### 多进程打包
通常给 `babel` 使用，只有工作消耗时间较长时才建议使用。
**下载：**
```shell
npm i thread-loader -D
```

### Externals
为了减小打包后的文件体积，从而把一些第三方库用 `cdn` 的形式引入进来，如 `jQuery`。`Externals` 就是用来防止将某些文件打包到最终生成的文件包中。
**定义外部第三方包**
```ts
module.exports = {
  // ...
  // 定义标签类型
  externalsType: 'script',
  // 定义第三方包
  externals: {
    jquery: [
      'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js',
      'jQuery'
    ]
  }
}
```
在 JS 文件中使用 import 方式引入，这里 from 后的名称需和定义时的名称进行对应。
```ts
import $ from 'jQuery'
```
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=65](https://www.bilibili.com/video/BV1YU4y1g745?p=65)

### Shimming
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=78](https://www.bilibili.com/video/BV1YU4y1g745?p=78)

### Export
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=80](https://www.bilibili.com/video/BV1YU4y1g745?p=80)

### Dll
視頻教程：[https://www.bilibili.com/video/BV1e7411j7T5?p=30](https://www.bilibili.com/video/BV1e7411j7T5?p=30)
动态连接库，dll会对某些库（第三方）进行单独打包。
1. 下载好第三方库后，使用 `import` 语法在 `JS` 文件中引入文件
```ts
import { gsap } from 'gsap';
```
2. 在根目录中创建 `webpack.dll.js`
```ts
const path = require('path');
const Webpack = require('webpack');

module.exports = {
  entry: {
    // 需要单独打包的库
    gsap: ['gsap'],
  },
  output: {
    // 输出文件名称
    filename: '[name].js',
    // 输出文件路径
    path: path.resolve(__dirname, '../dll'),
    // 导出库名称
    library: '[name]',
  },
  plugins: [
    // 引入插件
    new Webpack.DllPlugin({
      // 对应导出的库名称
      name: '[name]',
      // 生成 manifest 文件
      path: path.resolve(__dirname, '../dll/manifest.json'),
    }),
  ],
  mode: 'production',
}
```
3. 在 `package.json` 中编辑
```json
"scripts": {
  "dll": "webpack --config ./webpack.dll.js"
}
```
4. 执行指令
```shell
npm run dll
```
5. 然后配置 `webpack.config.js` 文件
```ts
const path = require('path')
const Webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    // 告诉 webpack 哪些库布参与打包，以及使用的名称
    new Webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dll/manifest.json')
    })
  ]
}
```
6. 如需在页面中自动引用，需安装一个插件 `add-asset-html-webpack-plugin`，再在 `webpack.config.js` 文件中进行配置
```shell
npm i add-asset-html-webpack-plugin -D
```
```ts
const path = require('path')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    // 在html中自动引入
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, 'dll/gsap.js'),
      publicPath: './'
    })
  ]
}
```
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=70](https://www.bilibili.com/video/BV1YU4y1g745?p=70) <br>
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=90](https://www.bilibili.com/video/BV1YU4y1g745?p=90)

### 依赖图 Dependency graph
每当一个文件依赖另一个文件时，`webpack` 会直接将文件视为存在依赖关系。这使 `webpack` 可以获取非代码资源，如 `images` 或 `web` 字体等。
并会把他们作为依赖提供给应用程序。当 `webpack` 开始工作时，它会根据我们写好的配置，从入口 `(Entry)` 开始，`webpack` 会递归的构建一个依赖关系图，
这个依赖图包含着应用程序中所需的每个模块，然后将所有模块打包为输出文件。
#### bundle 分析工具
- `webpack-chart`：`webpack stats` 可交互饼图；
- `webpack-visualizer`：可视化并分析你的 `bundle`，检查哪些模块占用空间，哪些可能使重复使用的；
- `webpack-bundle-analyzer`：一个 `plugin` 和 `CLI` 工具，它将 `bundle` 内容展示为一个便捷的、交互式、可缩放的树状图形式；
- `webpack bundle optimize helper`：分析你的 `bundle` 并提供可操作的改进措施，减少 `bundle` 的大小；
- `bundle-stats`：生成一个 `bundle` 报告 ( `bundle` 大小、资源、模块 )，并比较不同构建之间的结果。
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=66](https://www.bilibili.com/video/BV1YU4y1g745?p=66)


## 多页面应用
### entry 配置
```ts
module.exports = {
  // ...
  entry: {
    main: {
      // 将多个文件打包合成一个文件
      import: ['app1.js', 'app2.js'],
      dependOn: 'jquery',
      filename: '[name].js'
    },
    main2: {
      import: 'app3.js',
      dependOn: 'jquery',
      filename: 'page/[name].js'
    },
    // 第三方库依赖
    jquery: 'jQuery',
    finename: '[name].js'
  }
}
```
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=70](https://www.bilibili.com/video/BV1YU4y1g745?p=70)

### 页面配置
```ts
// 引用插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      chunks: [
        'main',
        'jquery',
      ],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './page.html',
      inject: 'body',
      chunks: [
        'main2',
        'jquery',
      ],
      filename: 'page/page.html'
    })
  ]
}
```
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=72](https://www.bilibili.com/video/BV1YU4y1g745?p=72)


## 创建 Library
```ts
module.exports = {
  // ...
  entry: './mylib.js',
  output: {
    path: path.resolve(__dirname. 'dist'),
    filename: 'mylib.js',
    // 防止文件被 tree shaking
    library: 'mylib'
  }
}
```
视频教程：[https://www.bilibili.com/video/BV1YU4y1g745?p=83](https://www.bilibili.com/video/BV1YU4y1g745?p=83)


## 完整配置 *
### 开发环境
视频教程：[https://www.bilibili.com/video/BV1e7411j7T5?p=18](https://www.bilibili.com/video/BV1e7411j7T5?p=18)
```ts
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CommonCssLoader = [
    MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: { importLoaders: 1 }
    },
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    [
                        'postcss-preset-env'
                    ]
                ]
            }
        }
    }
]

process.env.NODE_ENV = 'development'

module.exports = {
    entry: './assets/js/main.js',
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                oneOf:[
                    {
                        // 处理 css 资源
                        test: /\.css$/i,
                        use: [...CommonCssLoader]
                    },
                    {
                        // 处理 scss 资源
                        test: /\.s[ac]ss$/i,
                        use: [...CommonCssLoader, 'sass-loader']
                    },
                    {
                        // 处理图片资源
                        test: /\.(jpg|jpeg|png|gif)$/i,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:12].[ext]',
                            esModule: false,
                            outputPath: 'images'
                        }
                    },
                    {
                        // 处理 html 中的图片资源
                        test: /\.html$/i,
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        // 处理 html 资源
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            // 对输出结果重命名
            filename: 'css/app.css'
        })
    ],
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        compress: true,
        port: 3000,
        liveReload: true,
        watchFiles: {
            paths: [
                './assets/*/*',
                './*.html'
            ],
            options: {
                usePolling: false
            }
        },
        open: true,
        hot: true
    },
    devtool: 'source-map'
}
```

### 生产环境
```ts
// 生产环境
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CommonCssLoader = [
    MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: { importLoaders: 1 }
    },
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    [
                        'postcss-preset-env'
                    ]
                ]
            }
        }
    }
]

process.env.NODE_ENV = 'development'

module.exports = {
    entry: './assets/js/main.js',
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                // 处理 css 资源
                test: /\.css$/i,
                use: [...CommonCssLoader]
            },
            {
                // 处理 scss 资源
                test: /\.s[ac]ss$/i,
                use: [...CommonCssLoader, 'sass-loader']
            },
            {
                // 处理图片资源
                test: /\.(jpg|jpeg|png|gif)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:12].[ext]',
                    esModule: false,
                    outputPath: 'images'
                }
            },
            {
                // 处理 html 中的图片资源
                test: /\.html$/i,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        // 处理 html 资源
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            // 对输出结果重命名
            filename: 'css/app.css'
        })
    ],
    mode: 'production',
}
```

## 详细配置 *


## 插件 *
官方列举了可在 `Webpack 5` 中所有可使用的插件。
地址：[https://webpack.docschina.org/plugins/](https://webpack.docschina.org/plugins/)


## 使用技巧 *
```shell
// 忽略警告（包含注释）
// eslint-disable-next-line

// 输出 ES6 版本代码
output.ecmaVersion: 2015

// 删除全局 webpack
npm uninstall webpack webpack-cli --global
```


## 参考链接
Bilibili 视频教程：[https://www.bilibili.com/video/BV1e7411j7T5](https://www.bilibili.com/video/BV1e7411j7T5) <br>
Bilibili 视频教程：[https://www.bilibili.com/video/BV1YU4y1g745](https://www.bilibili.com/video/BV1YU4y1g745) <br>
官方文档（中文）: [https://webpack.docschina.org/concepts/](https://webpack.docschina.org/concepts/) <br>
