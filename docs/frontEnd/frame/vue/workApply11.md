
# Vue中transition过渡动画组件

### 概述
- Vue 提供了 `transition` 的封装组件，可以给任何元素和组件添加进入/离开过渡。
  主要用于 `v-show, v-if` 或 `router-view` 的过渡动画；

### 过度类名
**在进入/离开的过渡中，会有 6 个 class 切换。**
- `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
- `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
- `v-enter-to`：2.1.8 版及以上定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
- `v-leave`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
- `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
- `v-leave-to`：2.1.8 版及以上定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

**总结： `v-enter,v-enter-to, v-leave, v-leave-to`: 定义动画状态（关键点）； `v-enter-active, v-leave-active`: 定义动画行为（动画时间线）**

![图片](/images/frontEnd/vue/img_2.png)

### name属性
- 给transition组件设置不同的name， name名及class类名的前缀
```html
<transition name="plus-icon">
      <div class="icon-plus"
           v-if="flag">
           <img />
      </div>
</transition>
```
```css
/*过度后效果以本身class样式决定,*/
  .icon-plus {
      opacity: 1;
  }
  .plus-icon-enter-active{
    transition: all.5s;
  }
  .plus-icon-enter{
     opacity: 0;
  }
  .plus-icon-leave-active{
    transition: all.5s;
  }
  .plus-icon-leave-to{
    opacity: 0;
  }
```

### css的transition属性
- **transition简介：** css属性transition能让页面元素不是立即的、而是慢慢的从一种状态变成另外一种状态，
  从而表现出一种动画过程。根据开始状态和结束状态的具体数值，计算出中间状态。
- **transition属性语法：** css属性transition能让页面元素不是立即的、而是慢慢的从一种状态变成另外一种状态，
  从而表现出一种动画过程。根据开始状态和结束状态的具体数值，计算出中间状态。


| 属性                         | 介绍                                                                                  |
|----------------------------|-------------------------------------------------------------------------------------|
| transition-property        | 规定设置过渡效果的 CSS 属性的名称。例如, opacity,color。默认值是all。                                      |
| transition-duration        | 规定完成过渡效果需要多少秒或毫秒。例如，1s。默认值是0s。                                                      |
| transition-timing-function | 规定速度效果的速度曲线。例如, linear、 ease-in、steps动画分段函数或自定义的 cubic-bezier 函数)。默认值是ease，中间快，两头慢。 |
| transition-delay           | 定义过渡效果何时开始。例如，1s。默认值是0s。                                                            |

- **过度速度曲线：**
  ![图片](/images/frontEnd/vue/img_3.png)

- **简写语法：**
```css
transition: property duration timing-function delay;
transition: opacity 1s linear 2s;
```

### 浏览器支持
- `Internet Explorer 10+`
- `Firefox`
- `Opera`
- `Chrome`
- `Internet Explorer 9` 以及更早版本的浏览器不支持 `transition` 属性。

参考文章： [https://juejin.cn/post/7038404182516187173](https://juejin.cn/post/7038404182516187173)