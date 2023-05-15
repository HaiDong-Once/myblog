
# swiper指定跳转页和监听当前位置

::: tip 说明：
- 指定跳转到指定轮播页：`slideTo`
- 监听当前轮播位置：`slideChange`
  :::

## 代码实现
```ts
/**
 * swiper初始化
 */
swiperInit(){
  let that = this;
  this.Swiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay: true, //自动循环
    disableOnInteraction: false,
    delay: 500,
    // 监听轮播位置
    on: {
      slideChange: function () {
        that.activeTabIndex = +this.activeIndex-1;
        if(+this.activeIndex === 10){
          that.activeTabIndex = 0;
        }
      },
    },
  })
},


/**
 * tabSwiper点击跳转到指定轮播页
 */
clickTabSwiper(index){
  this.activeTabIndex = index
  this.Swiper.slideTo(index+1);
},
```