
# 项目减重清除无用代码和文件



## 安装插件
```shell
npm i useless-files-webpack-plugin -S
```

## 导入并配置插件
```ts
// webpack配置
const UnusedFilesWebpackPlugin = require('useless-files-webpack-plugin')

configureWebpack: config => {
    config.plugins.push(
            new UselessFile({
                root: path.resolve(__dirname, './src'), // 项目目录
                out: './fileList.json', // 输出文件列表名
                clean: false, // 是否自动删除文件,
                exclude: /node_modules/ // 排除文件列表
            })
        )
}
```

## 启动项目
- 报错：`compiler.plugin is not a function`
- 因为项目升级到 `webpack5`，该插件没有适配，需要手动到依赖包内手动修改以下代码，适配 `webpack5`
```ts
 // 修改前
 compiler.plugin('emit', function (compilation, cb) {})
 // 修改后
compiler.hooks.emit.tapAsync('GenerateAssetWebpackPlugin',
   (compilation,callback)=>{}
)
```

- 再次启动项目，项目更目录生成文件
![图片](/images/frontEnd/performance/img.png)

## 清除无用代码
1. 根据生成的依赖文件手动清除（相对安全）
2. 或者打开自动删除无引用文件，（不推荐，有一定风险）最好是先手动确认json文件内容再使用
```ts
new UselessFile({
    root: path.resolve(__dirname, './src-guanjia'), // 项目目录
    out: './fileList.json', // 输出文件列表
    clean: true, // 打开自动删除文件
    exclude: /node_modules/ // 排除文件列表
})
```
3. 清除代码后卸载 `useless-files-webpack-plugin` 以及配置文件
```shell
npm uninstall useless-files-webpack-plugin
```

4.兼容webpack5版useless插件发布
[https://www.npmjs.com/package/useless-files-webpack5-plugin](https://www.npmjs.com/package/useless-files-webpack5-plugin)