
# 代码规范
[[toc]]


## 一、代码注释规范
### html文档
```html
1、头部
<!--
  @description: 经营异常推送落地页
  @author: hhd (2021-07-05)
  @update: 
-->

2、内容
<!-- 自定义导航模块-->
<wxs module="filter" src="../../../app.wxs"></wxs>
```

### css文档
```css
/*1、少量内容*/
/* 背景顶部撑起高度 */

/*2、多量内容分割线*/
/******************** start 内容模块 ********************/
/********************* end 内容模块 ********************/
```

### js文档
```ts
 // 1、顶部初始化位置
   /**
   * 页面的初始数据
   * Created by hhd on 2021-07-05, 经营异常指引
   */
   let data: {
    loading: false, // 加载动画控制
    datas:{}, // 登录接口接参
    openListFlag: false, // 异常列表展开按钮控制
    headerFlag: false, // 异常列表展开控制
  }
 
 
 // 2、方法封装注释
 /**
   * 触发用户登录请求首页数据
   * 此处逻辑说明，或在方法内对应位置逻辑说明
   * @function checkManageAbnormal: 检查异常情况接口
   * @param {object} datas: 首页返回数据
   * @param {boolean} loading: 加载动画开关
   * @param {number} is_login: 是否登录 1登录，0未登录
   * @param {array} unnormal_list：经营异常列表
   * @param {string} token：登录参数token
   */
```