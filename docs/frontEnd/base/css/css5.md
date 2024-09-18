

# css3 定义变量切换主题
[[toc]]


## 定义两个主题变量并放到两个class类中
```scss
// VIP用户主题色
.vip1-theme {
  --primary-color: #364096;
  --background-bg: #ecf0f8;
  --head-linear1: #4d71d0;
  --head-linear2: #e3f0ff;
  --head-text-linear1: #192755;
  --head-text-linear2: #5069b2;
  --head-text: #404a9a;
  --span-box-bg: #dbe2f4;
  --span-text: #364096;
  --person-box-bg: #f4f6fc;
  --store-span-linear1: #72a5e7;
  --store-span-linear2: #6686dc;
  --show-info-bg: #f4f6fc;
}

// VIP2用户主题色
.vip2-theme {
  --primary-color: #804e22;
  --background-bg: #f7f1e9;
  --head-linear1: #b66d2c;
  --head-linear2: #fef4e3;
  --head-text-linear1: #4a341b;
  --head-text-linear2: #916739;
  --head-text: #804e22;
  --span-box-bg: #f7eedd;
  --span-text: #804e22;
  --person-box-bg: #fbf8f3;
  --store-span-linear1: #c79c68;
  --store-span-linear2: #cea473;
  --show-info-bg: #fbf8f3;
}

// 使用颜色变量
.company-show-vip{
  background-color: var(--background-bg);
  width: 750rpx;
  min-height: calc( 100vh - 260px );
  line-height: 1;
  .head-box{
    width: 750rpx;
    min-height: 100rpx;
    background: linear-gradient(to top, var(--head-linear1), var(--head-linear1) 30%, var(--head-linear2));
    box-sizing: border-box;
    padding-bottom: 60rpx;
  }
 }
```

## 外层标签动态插入class变量
```vue
<div class="company-show-vip box-fade-in" :class="getVipTheme"></div>

computed: {
  // vip主题
  getVipTheme(){
    return `vip${this.companyInfo.hall_vip_info.vip_type}-theme`
  },
},
```