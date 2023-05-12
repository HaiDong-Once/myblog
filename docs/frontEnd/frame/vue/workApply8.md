


# 动态列表自动滚动实现
### 自定义滚动box组件封装

::: tip 说明：
- 实现：自动向下滚动，可设定滚动速度，触摸暂停，松开继续滚动,可设置滚动倍速
- 注：监听div滚动事件 `@scroll`
- requestAnimationFrame的使用保证动画的流畅性，提升动画性能，避免卡顿
- 动态id解决同页面多次复用组件id冲突问题
- 使用 <slot></slot> 插槽实现组件可扩展性
  :::

#### 代码实现
```vue

<!--
  @description: 自动滚动盒子组件
  @author: hhd (2023-04-04)
  @说明：
      rafSpeed: 滚动倍速
  @使用方式：
      import scrollBox from "@guanjia/components/scrollBox/index.vue"
      components: {scrollBox}
      <scrollBox :rafSpeed="2" class="scrollBox"></scrollBox>
-->


<template>
  <div>
    <div class="review_box"
         :id="'review_box_' + uniqueId"
         :ref="'resListRef_' + uniqueId"
         @touchstart="rollStop()"
         @touchend="rollStart()">
      <div :id="'comment1_' + uniqueId" style="display: inherit;">
        <slot></slot>
      </div>
      <div :id="'comment2_' + uniqueId" style="display: inherit;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",

  props:{
    rafSpeed:{ // 滚动倍速
      type: Number,
      default: 1
    },
  },

  data() {
    return {
      uniqueId: 0, // 随机数,动态id,ref
      rafTimer: null, // 滚动动画定时器
    };
  },



  mounted(){
    this.uniqueId = Math.floor(Math.random() * 1000);
    this.$nextTick(()=>{
      this.roll(); // 列表滚动初始化
    })
  },

  methods: {
    /**
     * 列表滚动初始化
     */
    roll() {
      // 防止立即跳转导致dom清除报错
      let reviewBoxDom = document.querySelector('#review_box_' + this.uniqueId);
      if(!reviewBoxDom){ return }

      const review_box = document.getElementById("review_box_" + this.uniqueId);
      const comment1 = document.getElementById("comment1_" + this.uniqueId);
      const comment2 = document.getElementById("comment2_" + this.uniqueId);
      comment2.innerHTML = comment1.innerHTML;
      review_box.scrollLeft = 0;
      this.rollStart();
    },


    /**
     * 开始滚动
     */
    rollStart() {
      let reviewBoxDom = document.querySelector('#review_box_' + this.uniqueId);
      if(!reviewBoxDom){ return }
      const comment1 = document.getElementById("comment1_" + this.uniqueId);
      const review_box = document.getElementById("review_box_" + this.uniqueId);
      if (review_box.scrollLeft >= comment1.scrollWidth) {
        review_box.scrollLeft = 0;
      } else {
        review_box.scrollLeft += this.rafSpeed;
      }
      this.rafTimer = requestAnimationFrame(this.rollStart);
    },



    /**
     * 停止滚动
     * 停止滚动时， cancelAnimationFrame(this.rafTimer)
     * 保持当前滚动位置: 获取滚动距离， this.$refs.resListRef.scrollLeft
     */
    rollStop(){
      const review_box = document.getElementById("review_box_" + this.uniqueId);
      review_box.scrollLeft = this.$refs['resListRef_'+ this.uniqueId].scrollLeft ?? 0;
      cancelAnimationFrame(this.rafTimer)
    },
  }
}
</script>

<style scoped lang="scss">
.review_box{
  width: 100%;
  min-height: 100px;
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
}
/*隐藏滚动条样式*/
.review_box::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
```



### 自定义方案

::: tip 说明：
- 实现：自动向下滚动，可设定滚动速度，触摸暂停，松开继续滚动,可设置滚动倍速
- 注：监听div滚动事件 `@scroll`
- requestAnimationFrame的使用保证动画的流畅性，提升动画性能，避免卡顿
  :::

- 代码实现
```html
<div class="scroll-box" id="review_box" ref="resListRef"
     @touchstart="rollStop()" @touchend="rollStart()">
    <div id="comment1" style="display: inherit;">
        <div>11111111111111111111111111111111111111111</div>
        ......................
    </div>
    <div id="comment2" style="display: inherit;"></div>
</div>
```

```ts
data(){
    return{
        timer: null, // 滚动动画定时器
        speed: 1, // 滚动倍速 默认 1
    }
},

mounted(){
    this.roll(); // 列表滚动初始化
},

/**
 * 列表滚动初始化
 */
roll() {
    const review_box = document.getElementById("review_box");
    const comment1 = document.getElementById("comment1");
    const comment2 = document.getElementById("comment2");
    comment2.innerHTML = comment1.innerHTML;
    review_box.scrollLeft = 0;
    this.rollStart();
},


/**
 * 开始滚动
 */
rollStart() {
    const comment1 = document.getElementById("comment1");
    const review_box = document.getElementById("review_box");
    if (review_box.scrollLeft >= comment1.scrollWidth) {
        review_box.scrollLeft = 0;
    } else {
        review_box.scrollLeft += this.speed;
    }
    this.timer = requestAnimationFrame(this.rollStart)
},



/**
 * 停止滚动
 * 停止滚动时， cancelAnimationFrame(this.timer)
 * 保持当前滚动位置: 获取滚动距离， this.$refs.resListRef.scrollLeft
 */
rollStop(){
    const review_box = document.getElementById("review_box");
    review_box.scrollLeft = this.$refs.resListRef.scrollLeft ?? 0;
    cancelAnimationFrame(this.timer)
},
```

```sass
.scroll-box{
  width: 100%;
  height: 340px;
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
  img{
    width: 848px;
    height: 293px;
    margin-left: 25px;
}
}
/*隐藏滚动条样式*/
.scroll-box::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
```

### vue-seamless-scroll组件
- 文档地址：[vue-seamless-scroll组件文档地址](https://chenxuan1993.gitee.io/component-document/index_prod#/component/seamless-default)
- 依赖安装：
```shell
npm install vue-seamless-scroll --save
```

- 组件引入
```ts
import vueSeamlessScroll from 'vue-seamless-scroll'  // vue2引入方式
import scroll from "vue-seamless-scroll/src"  // vue3引入方式
 
components: {
        vueSeamlessScroll
},
```

- 示例：
  ![图片](/images/frontEnd/vue/img_1.png)
```vue
<template>
    <vue-seamless-scroll :data="listData" :class-option="classOption" class="seamless-warp">
        <ul class="item">
            <li v-for="item in listData">
                <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
            </li>
        </ul>
    </vue-seamless-scroll>
</template>
<style lang="scss" scoped>
    .seamless-warp {
        height: 229px;
        overflow: hidden;
    }
</style>
<script>
    export default {
        data () {
            return {
                listData: [{
                   'title': '无缝滚动第一行无缝滚动第一行',
                   'date': '2017-12-16'
                 }, {
                    'title': '无缝滚动第二行无缝滚动第二行',
                    'date': '2017-12-16'
                    }
                 ]
                }
            },
            computed: {
                classOption () {
                    return {
                            direction: 0
                        }
                }
             }
       }
</script>
```