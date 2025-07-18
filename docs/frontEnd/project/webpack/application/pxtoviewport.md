

# 移动端适配方案： PostCSS px to viewport

## 问题描述

H5页面在小程序webview中显示时，部分机型（特别是iOS设备）出现缩放问题，字体变小等显示异常。

## 解决方案

### PostCSS px-to-viewport

使用 `postcss-px-to-viewport` 插件自动将px转换为vw单位，实现移动端适配。

#### 1. 安装依赖

```bash
yarn add postcss-px-to-viewport --save-dev
```

#### 2. 配置方案

**方案A: 基于文件名判断转换（推荐）**

在 `vue.config.js` 中添加配置：

```javascript
module.exports = {
  // ... 其他配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            unitToConvert: 'px',
            viewportWidth: 375, // 设计稿宽度
            unitPrecision: 6, // 精确度
            propList: ['*'], // 需要转换的属性列表
            viewportUnit: 'vw', // 转换单位
            fontViewportUnit: 'vw', // 字体使用的单位
            selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类选择器
            minPixelValue: 1, // 最小转换值
            mediaQuery: false, // 是否转换媒体查询
            replace: true, // 是否替换属性值
            exclude: [
              // 排除不需要转换的文件
              function(file) {
                // 只转换文件名包含 '_tovw' 的文件
                return !file.includes('_tovw')
              }
            ]
          })
        ]
      }
    }
  }
}
```

**方案B: 基于目录判断转换**

```javascript
module.exports = {
  // ... 其他配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            unitToConvert: 'px',
            viewportWidth: 375,
            unitPrecision: 6,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: ['.ignore', '.hairlines'],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: [
              // 只转换特定页面
              function(file) {
                return !file.includes('market-chat')
              }
            ]
          })
        ]
      }
    }
  }
}
```

#### 3. 使用方式

**文件命名方式：**
- 需要转换的页面：`index_tovw.vue`
- 不需要转换的页面：`index.vue`

**目录方式：**
- 将需要将需要转换的目录添加到exclude配置中，如 `market-chat/`（包含页面+组件）

#### 4. 样式写法

转换前（原始px）：
```css
.container {
  width: 375px;
  height: 200px;
  font-size: 16px;
  padding: 20px;
}
```

转换后（自动生成vw）：
```css
.container {
  width: 100vw;
  height: 53.333333vw;
  font-size: 4.266667vw;
  padding: 5.333333vw;
}
```

## 实施建议

### 1. 优先选择文件名判断方式
- **优点**：精确控制，不影响其他页面
- **缺点**：需要重命名文件

### 2. 配置参数说明

```javascript
{
  unitToConvert: 'px',      // 要转换的单位
  viewportWidth: 375,       // 设计稿宽度（根据实际设计稿调整）
  unitPrecision: 6,         // 精确度，保留6位小数
  propList: ['*'],          // 转换所有属性
  viewportUnit: 'vw',       // 转换为vw单位
  fontViewportUnit: 'vw',   // 字体也使用vw
  selectorBlackList: [],    // 不转换的类选择器
  minPixelValue: 1,         // 小于1px不转换
  mediaQuery: false,        // 不转换媒体查询中的px
  replace: true,            // 替换原值
  exclude: [/* 排除规则 */] // 排除文件规则
}
```

### 3. 注意事项

1. **边框问题**：1px边框可能会被转换为很小的vw值，建议设置 `minPixelValue: 2`
2. **字体最小值**：避免字体过小影响阅读体验
3. **图片适配**：图片容器使用vw，图片本身使用百分比
4. **第三方组件**：需要添加到黑名单中

## 完整配置示例

```javascript
// postcss.config.js
const pxToViewport = require('postcss-px-to-viewport');

// VW转换状态控制
const enableVwTransform = process.env.ENABLE_VW_TRANSFORM !== 'false';
console.log(`📱 PostCSS VW转换: ${enableVwTransform ? '✅ 开启' : '❌ 关闭'}`);

module.exports = {
  plugins: [
    ...(enableVwTransform ? [
      pxToViewport({
        unitToConvert: 'px',
        viewportWidth: 375,
        unitPrecision: 6,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines', '.el-'],
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: [
          /node_modules/,
          // 通过文件夹配置 使用正则配置（仅移动端开启）
          /^(?!.*market-chat|.*_tovw).*$/,
        ]
      })
    ] : [])
  ]
}; 

```

在 package.json 中添加便捷脚本：
```json
{
  "scripts": {
    "serve": "vue-cli-service serve --mode dev",
    "serve:novw": "ENABLE_VW_TRANSFORM=false vue-cli-service serve --mode dev",
  }
}
```

## 配置说明
- `exclude`使用正则配置，符合`eslint`编译要求；
- 因为 `market-chat` 中的组件已经完成开发，为了不修改整个文件命名，使用指定文件夹匹配+文件命名匹配规则；
- 后续使用推荐文件命名规则，例如：`index_tovw.vue`
- 为了浏览器调试方便，通过配置启动命名动态开启vw转换，使用`serve:novw`启动保持`px`单位；
