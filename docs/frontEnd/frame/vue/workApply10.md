
# style中spcoed的问题

### 侵入组件问题
- 加入scoped, 入侵组件class时会失败；

- ::v-deep
```scss
<style lang="scss" scoped>
   ::v-deep .van-sticky{
     background-color: #ffffff;
   }
</style>
```

- 新增一个style无scoped标签控制组件样式
```js
/*样式入侵*/
<style>
.tabs .van-sticky{
  overflow: hidden;
  border-radius: 22px;
}
</style>
```

-  CSS Modules 中使用 :global 伪类来定义全局样式
```scss
/* styles.module.css */
.localClass {
    color: red;
}

:global(.globalClass) {
    color: blue;
}
```

### 样式继承问题
- vue路由跳转新页面样式继承了上一页
- 解决方法： style新增scoped属性
```scss
<style lang="scss" scoped>

</style>
```

- 使用 CSS Modules