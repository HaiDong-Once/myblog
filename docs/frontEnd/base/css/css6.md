

# uniapp scss 抽离 css
[[toc]]


**uniapp抽离思路：**
- 组件抽离
- js: mxins, 模块化
- css, scss公共文件，class公共样式，样式块，变量，继承类


## scss mixin代码块
### pubilc.scss 公共文件
```scss
//公共页面和card
@mixin public-pages{
  box-sizing: border-box;
  background-color: #f2f6ff;
  width: 750rpx;
  min-height: calc( 100vh - 1rpx );
  line-height: 1;
  padding: 28rpx;
}
@mixin public-card{
  width: 695rpx;
  min-height: 100rpx;
  background-color: #ffffff;
  border-radius: 13rpx;
  box-sizing: border-box;
  margin: 0 auto 16rpx;
  padding: 35rpx 30rpx;
  line-height: 1;
  font-size: 29rpx;
  color: #666666;
}
//卡片title栏
@mixin card-title-box{
  font-size: 31rpx;
  font-weight: bold;
  color: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right{
    width: 174rpx;
    height: 63rpx;
    background-color: #f8faff;
    border-radius: 8rpx;
    border: solid 2rpx #f3f5fb;
    box-sizing: border-box;
    font-size: 25rpx;
    line-height: 63rpx;
    color: #327bf9;
    text-align: center;
    font-weight: normal;
    &:active{
      opacity: 0.6;
    }
  }
}

// 扩大点击范围
@mixin click-expand($width,$height){
  position:relative;
  &::after {
    content: '';
    position: absolute;
    width: $width;
    height: $height;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

//审核状态栏
@mixin status-span-box{
  font-size: 29rpx;
  color: #666666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40rpx;
  .right{
    display: flex;
    align-items: center;
    font-size: 29rpx;
    color: #327bf9;
    gap: 28rpx;
    span{
      @include click-expand(60rpx, 60rpx);
    }
    .warn{
      color: #ff9a1d;
    }
    .error{
      color: #fc4546;
      @include click-expand(100%, 60rpx);
    }
  }
}

// 帮助与提问模块
@mixin help-question-box{
  .min-title{
    font-size: 29rpx;
    color: #666666;
    line-height: 40rpx;
    margin-top: 30rpx;
  }
  .text-box{
    margin-top: 30rpx;
    width: 639rpx;
    min-height: 100rpx;
    background-color: #f8faff;
    border-radius: 8rpx;
    border: solid 2rpx #f3f5fb;
    font-size: 29rpx;
    line-height: 40rpx;
    color: #999999;
    box-sizing: border-box;
    padding: 20rpx;
    text-align: justify;
  }
}
```

### company.vue  应用
```scss
<style scoped lang="scss">
@import "pubilc";

.pages{
  @include public-pages;

  .card{
    @include public-card;

    .title-box{
      @include card-title-box;
    }

    .span-box{
      width: 100%;
      line-height: 40rpx;
      background-color: #f8faff;
      border-radius: 8rpx;
      border: solid 2rpx #f3f5fb;
      box-sizing: border-box;
      padding: 20rpx;
      color: #333333;
      margin-top: 30rpx;
      text-align: justify;
      // ...........
    }
  }

  .span-title-box{
    @include status-span-box;
  }

  &2{
    @include help-question-box;
  }
}

}
</style>
```