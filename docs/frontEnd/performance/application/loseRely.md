
# 项目减重清除无用依赖

## 说明
- npm cli 工具 depcheck 能辅助我们找到项目中 Unused dependencies（无用依赖）和 Phantom dependencies（幻影依赖），
分别表示写入 package.json 但没被项目使用、被项目引用了但没有写入 package.json。
- depcheck 更像是一个缩小排查范围的过滤器，不能轻信其打印结果。例如，depcheck 默认无法识别特殊挂载的 plugin。
- 需要谨慎使用：要删除一个无用依赖，必须熟悉该 npm 包的使用性质，再结合 grep 工具反复确认。因为需要测试的内容多和隐形风险高，
只是减轻了npm install 的速度，投资回报比不高；
- 需要node.js >= 10

## 安装 Depcheck
```shell
npm install depcheck -g
```

## 使用 Depcheck
1. 找到 node_global 全局位置，打开cmd
2. 执行一下命令: “projectPath” 指的时前端项目 package.json 同级目录
```shell
.\depcheck + "projectPath"
.\depcheck "G:\wamp64\www\web-php\app-guanjia\view\vue"
```

3. 执行结果
```shell
C:\nodejs>.\depcheck "G:\wamp64\www\web-php\app-guanjia\view\vue"
Unused dependencies
* @babel/runtime
* Base64
* clipboard
* core-js
* cytoscape
* cytoscape-node-html-label
* d3
* fastclick
* i
* image-tools
* jquery
* lib-flexible
* vue-amap
* vue-pdf
Unused devDependencies
* @babel/eslint-parser
* @vue/cli-plugin-babel
* @vue/cli-plugin-eslint
* babel-plugin-component
* customize-cra
* fs-extra
* less
* less-loader
* mockjs
* sass
* sass-loader
* sass-resources-loader
* style-resources-loader
Missing dependencies
* @guanjia/components: .\src-guanjia\views\test\index.vue
* @guanjia/public: .\src-guanjia\views\plaqueOnline\tiktokPlaqueTest\pay\index.vue
* canvas: .\public\static\pdf\build\pdf.js
```