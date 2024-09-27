
# 解决vue跳转新页面不置顶问题
- router.js中配置路由
```ts
// 方法一
/* 解决vue页面之间跳转，页面不是在顶部的问题,一定要调用 next 方法，否则钩子就不会被销毁
*  即将进入的路由 from 即将离开的路由 next 放行
*/
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
  // window.pageYOffset = 0; 只读属性无需添加
  next();
});

// 方法二
const router = new VueRouter({
    scrollBehavior(to, from,savedPosition) {
        // savedPosition 如果存在，说明用户是通过浏览器的前进/后退按钮进行导航
        // 此时返回 savedPosition，即滚动到上一个页面的保存位置。
        if (savedPosition) {
            return savedPosition
        }
        // 如果 savedPosition 不存在（即用户是通过链接或其他方式进行的导航），则默认将页面滚动到顶部
        return {x: 0, y: 0}
    }
})
```
- savedPosition 当通过浏览器的前进/后退按钮触发时，包含前一个页面的滚动位置；如果不是通过这些按钮触发的，savedPosition 为 null。