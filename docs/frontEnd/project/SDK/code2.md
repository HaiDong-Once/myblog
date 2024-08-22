# useless-files-plugin 重写
[[toc]]

## 使用说明
- 因为 useless-files-webpack-plugin 插件不支持 webpack5，所以该版本兼容了 webpack5 以及5之前的版本
- 使用时需新增参数 webpack: '5' , 标记是webpack5项目

## 使用方法
### 安装依赖
```shell
npm i useless-files-webpack5-plugin -S
```

### webpack配置
- 注意： 如果是webpack5的项目，需要新增参数webpack: '5', 非webpack5可以不加这个参数
```ts
    const UselessFile = require('useless-files-webpack5-plugin')

plugins: [
    new UselessFile({
        webpack: '5', // 如果是webpack5的项目，需要说明webpack版本为 5 ，其他webpack版本无需这个参数
        root: path.resolve(__dirname, './src'), // 项目目录
        out: './fileList.json', // 输出文件列表名
        clean: false, // 是否自动删除文件, 谨慎使用
        exclude: /node_modules/ // 排除文件列表
    })
]
```

### vue项目 配置
- 注意： 如果是webpack5的项目，需要新增参数webpack: '5', 非webpack5可以不加这个参数
```ts
    const UselessFile = require('useless-files-webpack5-plugin')

    configureWebpack: config => {
        config.plugins.push(
            new UselessFile({
                webpack: '5', // 如果是webpack5的项目，需要说明webpack版本为 5 ，其他webpack版本无需这个参数
                root: path.resolve(__dirname, './src'), // 项目目录
                out: './fileList.json', // 输出文件列表名
                clean: false, // 是否自动删除文件, 谨慎使用
                exclude: /node_modules/ // 排除文件列表
            })
        )
    }
```

## 代码实现
### js代码
```js

// useless-files-webpack5-plugin 兼容webpack5版本

const fs = require('fs')
const glob = require('glob')
const path = require('path')
const shelljs = require('shelljs')

class CleanUnusedFilesPlugin {
    constructor (options) {
        this.opts = options
    }
    apply (compiler) {
        let _this = this
        // webpack5 写法
        if(_this.opts.webpack && _this.opts.webpack === '5'){
            compiler.hooks.emit.tapAsync('GenerateAssetWebpackPlugin', function (compilation, done) {
                _this.findUnusedFiles(compilation, _this.opts)
                done()
            })
        }else{
            // webpack4 写法
            compiler.plugin('after-emit', function (compilation, done) {
                _this.findUnusedFiles(compilation, _this.opts)
                done()
            })
        }
    }

    /**
     * 获取依赖的文件
     */
    getDependFiles (compilation) {
        return new Promise((resolve, reject) => {
            const dependedFiles = [...compilation.fileDependencies].reduce(
                (acc, usedFilepath) => {
                    if (!~usedFilepath.indexOf('node_modules')) {
                        acc.push(usedFilepath)
                    }
                    return acc
                },
                []
            )
            resolve(dependedFiles)
        })
    }

    /**
     * 获取项目目录所有的文件
     */
    getAllFiles (pattern) {
        return new Promise((resolve, reject) => {
            glob(pattern, {
                nodir: true
            }, (err, files) => {
                if (err) {
                    throw err
                }
                const out = files.map(item => path.resolve(item))
                resolve(out)
            })
        })
    }

    dealExclude (path, unusedList) {
        const file = fs.readFileSync(path, 'utf-8')
        const files = JSON.parse(file) || []
        const result = unusedList.filter(unused => {
            return !files.some(item => ~unused.indexOf(item))
        })
        return result
    }

    async findUnusedFiles (compilation, config = {}) {
        const { root = './src', clean = false, output = './unused-files.json', exclude = false } = config
        const pattern = root + '/**/*'
        try {
            const allChunks = await this.getDependFiles(compilation)
            const allFiles = await this.getAllFiles(pattern)
            let unUsed = allFiles
                .filter(item => !~allChunks.indexOf(item))
            if (exclude && typeof exclude === 'string') {
                unUsed = this.dealExclude(exclude, unUsed)
            }
            if (typeof output === 'string') {
                fs.writeFileSync(output, JSON.stringify(unUsed, null, 4))
            } else if (typeof output === 'function') {
                output(unUsed)
            }
            if (clean) {
                unUsed.forEach(file => {
                    shelljs.rm(file)
                    console.log(`remove file: ${file}`)
                })
            }
            return unUsed
        } catch (err) {
            throw (err)
        }
    }
}

module.exports = CleanUnusedFilesPlugin
```

### package.json配置
```json
{
  "name": "useless-files-webpack5-plugin",
  "version": "1.0.2",
  "description": "useless-files-webpack-plugin 兼容webpack5版本",
  "main": "index.js",
  "keywords": [
    "useless",
    "files",
    "webpack",
    "webpack5",
    "plugin",
    "useless-files-webpack-plugin",
    "useless-files-webpack5-plugin",
    "代码减重"
  ],
  "scripts": {
    "publish": "npm publish"
  },
  "dependencies": {
    "shelljs": "^0.8.1"
  },
  "author": "hhd",
  "license": "ISC"
}
```