
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
  window.pageYOffset = 0;
  next();
});

// 方法二
const router = new VueRouter({
    scrollBehavior(to, from,savedPosition) {
        //if判断可加可不加、根据自己需求
        //savedPosition当且仅当通过浏览器的前进/后退按钮触发时才可用
        if (savedPosition) {
            return savedPosition
        }
        return {x: 0, y: 0}
    }
})
```