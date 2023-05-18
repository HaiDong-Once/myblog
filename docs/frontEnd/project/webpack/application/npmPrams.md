
# npm打包命令传参


## 直接加参 process.argv获取
- 使用 `process.argv` 直接获取npm命令行后跟随的参数
```shell
// shell控制台
npm run test1 guanjia

// 打印scriptsArray
[
  'C:\\nodejs\\node.exe',
  'G:\\wamp64\\www\\web-php\\app-shuidi\\view\\vue\\node_modules\\'+
  '@vue\\cli-service\\bin\\vue-cli-service.js',
  'build',
  '--mode',
  'test',
  'guanjia'
] 111

// 打印配置文件pages
{
  guanjia: {
    template: 'public/index.html',
    entry: 'src-guanjia/main.js',
    filename: 'guanjia.html',
    title: '企业信用管家'
  }
} 222222
```

- 分包配置
```ts
// vue.config.js
const scriptsArray = process.argv ?? []; // npm命令行信息
console.log(scriptsArray,111)
let pages = {};
const guanjia = {
    template: "public/index.html",
    entry: "src-guanjia/main.js",
    filename: 'guanjia.html',
    title: '企业信用管家'
};
const shuidi = {
    template: "public/index.html",
    entry: "src/main.js",
    filename: 'index.html',
    title: '水滴信用'
}
if( scriptsArray.includes('guanjia') ){
    pages = { guanjia }
}else if( scriptsArray.includes('shuidi') ){
    pages = { shuidi }
}else{
    pages = { guanjia, shuidi }
}
console.log(pages, 222222)

module.exports = {
    pages,
};
```

## npm脚本配置 process.env获取
- 配置脚本
```json
// 在 package.json 中定义一个 build 脚本，并在其中传递一个自定义参数 myParam：
{
  "scripts": {
    "build": "npm run build --myParam=value",
  }
}
```

- 在命令行中执行 `npm run build` 即可传递参数，并在 `vue.config.js` 中使用。
- 其中 `npm_config`_ 是 `npm` 内置的环境变量前缀，可以通过该前缀获取传递的参数。
- 在本示例中，参数名为 `myParam`，则在 `vue.config.js` 中使用的变量名为 `npm_config_myParam`。
```ts
// 在 vue.config.js 中可以这样使用 process.env 获取传递的参数：
module.exports = {
  // ...
  configureWebpack: {
    plugins: [
      new MyPlugin({
        myParam: process.env.npm_config_myParam || 'default value',
      }),
    ],
  },
};
```