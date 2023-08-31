
# nuxt3 antDesign 兼容问题解决
[[toc]]


## 项目问题
因项目中应用了 antDesign 发现在chrome 78以下的版本样式错乱，检查发现是部分css样式丢失，导致的原因就是antDesign5.0以后，
css使用 :where() 这样的新属性，导致低版本浏览器不兼容。检查官方文档后发现，css-in-js的应用中有对应的解决方案，以下是解决
方案介绍

## 解决方案
### 安装cssinjs
```shell
 pnpm install @ant-design/cssinjs --save
```

### APP.js中配置 provider 降级:where()
**说明：** Ant Design 的 CSS-in-JS 默认通过 :where 选择器降低 CSS Selector 优先级，以减少用户升级时额外调整自定义样式成本。
在某些场景下你如果需要支持的旧版浏览器（或者如 TailwindCSS 优先级冲突），你可以使用 @ant-design/cssinjs 取消默认的降权操作
（请注意版本保持与 antd 一致）：
```html
// `hashPriority` 默认为 `low`，配置为 `high` 后，
// 会移除 `:where` 选择器封装

<a-style-provider hash-priority="high">
  <NuxtPage />
</a-style-provider>
```

### CSS 逻辑属性兼容
**说明：** 为了统一 LTR 和 RTL 样式，Ant Design 使用了 CSS 逻辑属性。例如原 margin-left 使用 margin-inline-start 代替，
使其在 LTR 和 RTL 下都为起始位置间距。如果你需要兼容旧版浏览器（如 360 浏览器、QQ 浏览器 等等），
可以通过 @ant-design/cssinjs 的 StyleProvider 配置 transformers 将其转换：
```vue
<template>
  <div>
    <a-style-provider hash-priority="high" :transformers="[legacyLogicalPropertiesTransformer]">
      <NuxtPage />
    </a-style-provider>
  </div>
</template>

<script lang="ts" setup>
import { legacyLogicalPropertiesTransformer } from 'ant-design-vue';
</script>
```


## ant message 组件 :where 降级失败
### 分析原因
可能是因为ant-message默认导入并且看到他插入到body内，与id=root平级，所以未被 a-style-provider 包裹，导致以上配置队其无效

![图片](/images/frontEnd/nuxt/img.png)

### 解决思路
1. 将ant-message改为手动导入，id=root内层 （难以找到案例）
2. 手动降级where样式 （动态样式可能会遗漏）
3. 手动封装自定义 message 组件平替（ 工作量较大，需测试，可能没有原组件功能完善）

### 手动降级
```scss
// app.vue 中
body .ant-message {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14PX;
  line-height: 1.5714285714285714;
  list-style: none;
  font-family: -apple-system,BlinkMacSystemFont,
  'Segoe UI',
  Roboto,'Helvetica Neue',
  Arial,'Noto Sans',sans-serif,
  'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  position: fixed;
  top: 8PX;
  width: 100%;
  pointer-events: none;
  z-index: 1010;
  .ant-message-notice{
    padding: 8PX;
    text-align: center;
    box-sizing: border-box;
    .ant-message-notice-content{
      display: inline-block;
      padding: 9PX 12PX;
      background: #ffffff;
      border-radius: 8PX;
      box-shadow: 0 6PX 16PX 0 rgba(0, 0, 0, 0.08),
      0 3PX 6PX -4PX rgba(0, 0, 0, 0.12),
      0 9PX 28PX 8PX rgba(0, 0, 0, 0.05);
      pointer-events: all;
      box-sizing: border-box;
      font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',
      sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
      font-size: 14PX;
      .anticon{
        vertical-align: text-bottom;
        margin-inline-end: 8PX;
        font-size: 16PX;
      }

    }
    .ant-message-info{
      .anticon{
        color: #1677ff;
      }
    }
    .ant-message-success{
      .anticon{
        color: #52c41a;
      }
    }
    .ant-message-error{
      .anticon{
        color: #ff4d4f;
      }
    }
    .ant-message-warning{
      .anticon{
        color: #faad14;
      }
    }
  }
}
```