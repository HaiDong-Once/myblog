

# uniapp 小程序中实现循环滚动栏（跑马灯）
[[toc]]


## 代码实现
```html

<div class="swiper-wrapper">
    <swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="2500"
            :duration="2500" :circular="true" :vertical="false"
            :display-multiple-items="1.16" easing-function="linear">
        <swiper-item>
            1
        </swiper-item>
        <swiper-item>
            2
        </swiper-item>
        <swiper-item>
            3
        </swiper-item>
        <swiper-item>
            4
        </swiper-item>
        <swiper-item>
            5
        </swiper-item>
    </swiper>
</div>
```
```scss
.swiper-wrapper {
    position: relative;
    .swiper {
      width: 100%;
      height: 147rpx;
    }
  }
```
