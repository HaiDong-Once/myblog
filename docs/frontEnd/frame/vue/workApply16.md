


# 可拖拽组件解决方案整理

### 方案分析
![图片](/images/frontEnd/vue/img_7.png)

### 代码实现
#### 滚动隐藏效果
```ts
    created() {
      window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
    },
    
  /**
   * 开始滚动
   */
  handleScroll() {
      // 正在拖动中禁止使用
    if(this.isDrag) { return }
    // 防抖：滚动停止后恢复隐藏
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.handleScrollEnd()
    }, 300)
    // 获取窗口滚动高度
    this.currentTop = document.documentElement.scrollTop || document.body.scrollTop
    // 控制左右贴边距离
    if(this.left > this.clientWidth / 2) {
      this.left = this.clientWidth + this.gapWidth / 2
    } else {
      this.left = - this.gapWidth / 2
    }
  },


  /**
   * 结束滚动，恢复按钮位置
   */
  handleScrollEnd(){
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if(scrollTop === this.currentTop) {
      if(this.left > this.clientWidth/2) {
        this.left = this.clientWidth - this.itemWidth - this.gapWidth
      } else {
        this.left = this.gapWidth
      }
      clearTimeout(this.timer)
    }
  }
},
```

#### 可拖拽组件
- js实现拖拽吸附组件
```ts
mounted() {
  this.$nextTick(() => {
    this.itemHeight = this.$refs.floatButton.clientHeight;
    this.itemWidth = this.$refs.floatButton.clientWidth;

    const floatButton = this.$refs.floatButton
    floatButton.addEventListener("touchstart", () => {
      floatButton.style.transition = 'none'
    })

    // 在拖拽的过程中，组件应该跟随手指的移动而移动。
    floatButton.addEventListener("touchmove", (e) => {
      if(!this.isDrag){
        let mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false)
        this.isDrag = true;
      }
      if (e.targetTouches.length === 1) {  // 一根手指
        let touch = e.targetTouches[0]
        this.left = touch.clientX - this.itemWidth
        this.top = touch.clientY - this.itemHeight
      }
    })

    // 拖拽结束以后，吸附贴边并重新设置过度动画。
    floatButton.addEventListener("touchend", () => {
      if(this.isDrag){
        let mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
        this.isDrag = false;
      }

      floatButton.style.transition = 'all 0.3s'
      if(this.left > document.documentElement.clientWidth / 2) {
        this.left = document.documentElement.clientWidth - this.itemWidth - this.gapWidth;
      }else{
        this.left = this.gapWidth;
      }
    })
  })
},
```

#### css实现可拖拽组件
- 参考地址 [https://juejin.cn/post/6933016266365992974#heading-1](https://juejin.cn/post/6933016266365992974#heading-1)
```html
<div class="dragbox" id="dragbox">
  <div class="dragcon">
    <div class="ball" id="ball"></div>
  </div>
</div>
```
```css
html,body{
  margin: 0;
}
section{
  padding: 10px;
}
.dragbox{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: auto;
  -webkit-overflow-scrolling:touch;
}
.dragbox.move{
  overflow: hidden;
  pointer-events: none;
}
.dragcon{
  width: calc(200% - 50px);
  height: calc(200% - 50px);
}
.ball{
  position: relative;
  width: 50px;
  height: 50px;
  background-color: cornflowerblue;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: all;
}
```
```js
document.addEventListener('touchstart',(ev)=>{
  if ( !ball.contains(ev.target) ) {
    dragbox.classList.add('move');
  }
})
document.addEventListener('touchend',()=>{
  dragbox.classList.remove('move');
})
dragbox.scrollLeft = 50;
dragbox.scrollTop = 50;
```

#### vue指令实现拖拽组件
```html
<div v-draggable>拖拽組件</div>
```
```ts
Vue.directive('draggable', {
  inserted: function (el,data) {
    el.style.position = 'absolute';
    el.style.cursor = 'move';
    el.onmousedown = function(event){
      let startX = event.clientX;
      let startY = event.clientY;
      let left = el.offsetLeft;
      let top = el.offsetTop;
      document.onmousemove = function(event){
        let X = event.clientX - startX
        let Y = event.clientY - startY;
        el.style.left = `${X + left}px`;
        el.style.top = `${Y + top}px`;
      }
      document.onmouseup = function(){
        document.onmousemove = document.onmouseup = null;
      };
    }
  }
})
```

### 最终方案：滚动隐藏+可拖拽吸附
```vue
<!--
  可拖拽吸附贴边组件，可滚动影藏
  使用方法：
  1.注入组件 并使用
  2.说明：gapWidth： 传入移动元素 with/2 + 贴边的间距， coefficientHeight：从上到下距离比例
  <dragLabel :gapWidth="58">
      <div class="kefu" ref="kefu" @click="openCustomer">
       <img src="../../assets/imgs/mobile/customer-img.png" alt=""/>
      </div>
  </dragLabel>
-->


<template>
  <div class="float_button">
    <div
        @click="onBtnClicked"
        ref="floatButton"
        class="float_info"
        :style="{
          'width': itemWidth + 'px',
          'height': itemHeight + 'px',
          'left': left + 'px',
          'top': top + 'px'
        }">
      <slot ref="floatButton2"></slot>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      clientWidth: 0,
      clientHeight: 0,
      timer: null,
      currentTop: 0,
      left: 0,
      top: 0,
      isDrag: false, // 是否拖拽中
    }
  },


  props: {
    itemWidth: {  // 距离左右两边距离 暂时弃用
      type: Number,
      default: 0
    },
    itemHeight: {  // 距离左右两边距离 暂时弃用
      type: Number,
      default: 0
    },
    gapWidth: {  // 传入移动元素 with/2 + 贴边的间距
      type: Number,
      default: 50
    },
    coefficientHeight: {  // 从上到下距离比例
      type: Number,
      default: 0.65
    }
  },


  created() {
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
    this.left = this.clientWidth - this.itemWidth - this.gapWidth;
    this.top = this.clientHeight * this.coefficientHeight;
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  },
  
  beforeDestroy(){
      // 取消注册
      window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    /**
     * 防抖函数
     * @param fn 防抖处理的函数
     * @param wait 防抖延迟时间 ms
     */
    debounce(fn, wait) {
      // 只要定时器非空，就清掉定时器，重新创建一个新的重新倒计时
      if(this.timeout !== null) clearTimeout(this.timeout)
      this.timeout = setTimeout(fn, wait)
    },

    /**
     * 开始滚动
     */
    handleScroll() {
      if(this.isDrag) { return }
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.handleScrollEnd()
      }, 300)
      // 获取窗口滚动高度
      this.currentTop = document.documentElement.scrollTop || document.body.scrollTop
      // 控制向左贴边或向右侧贴边 中间线为分割点
      if(this.left > this.clientWidth / 2) {
        this.left = this.clientWidth + this.gapWidth / 2
      } else {
        this.left = - this.gapWidth / 2
      }
    },


    /**
     * 结束滚动
     */
    handleScrollEnd(){
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 停下在防抖间隔内没有再次滚动
      if(scrollTop === this.currentTop) {
        if(this.left > this.clientWidth/2) {
          this.left = this.clientWidth - this.itemWidth - this.gapWidth
        } else {
          this.left = this.gapWidth
        }
        clearTimeout(this.timer)
      }
    }
  },


  mounted() {
    this.$nextTick(() => {
      this.itemHeight = this.$refs.floatButton.clientHeight;
      this.itemWidth = this.$refs.floatButton.clientWidth;

      const floatButton = this.$refs.floatButton
      floatButton.addEventListener("touchstart", () => {
        floatButton.style.transition = 'none'
      })

      // 在拖拽的过程中，组件应该跟随手指的移动而移动。
      floatButton.addEventListener("touchmove", (e) => {
        if(!this.isDrag){
          let mo=function(e){e.preventDefault();}; // 阻止 touchmove 事件的默认行为
          document.body.style.overflow='hidden'; // 禁用页面滚动
          document.addEventListener("touchmove",mo,false)  // 移除事件监听器
          this.isDrag = true;
        }
        if (e.targetTouches.length === 1) {  // 一根手指
          let touch = e.targetTouches[0]
          // 获取触摸点相对于视口的水平和垂直坐标。
          this.left = touch.clientX - this.itemWidth
          this.top = touch.clientY - this.itemHeight
        }
      })

      // 拖拽结束以后，吸附贴边并重新设置过度动画。
      floatButton.addEventListener("touchend", () => {
        if(this.isDrag){
          let mo=function(e){e.preventDefault();};
          document.body.style.overflow='';//出现滚动条
          document.removeEventListener("touchmove",mo,false);
          this.isDrag = false;
        }

        floatButton.style.transition = 'all 0.3s'
        if(this.left > document.documentElement.clientWidth / 2) {
          this.left = document.documentElement.clientWidth - this.itemWidth - this.gapWidth;
        }else{
          this.left = this.gapWidth;
        }
      })
    })
  },


    /**
     * 点击事件回调
     */
    onBtnClicked(){
      this.$emit("onFloatBtnClicked")
    },  

}
</script>


<style lang="scss" scoped>
.float_button {
  .float_info{
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    color: #666666;
    transition: all 0.3s;
    position: fixed;
    bottom: 436px;
    right: 0;
    width: auto;
    height: auto;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 14px;
    cursor: pointer;
  }
}
</style>
```

- 参考文章：
- [https://blog.csdn.net/qq_41009742/article/details/101516232](https://blog.csdn.net/qq_41009742/article/details/101516232)
- [https://juejin.cn/post/6933016266365992974#heading-1](https://juejin.cn/post/6933016266365992974#heading-1)
- [https://mp.weixin.qq.com/s/wQec3dLJLkKOnwlNqJTSBg](https://mp.weixin.qq.com/s/wQec3dLJLkKOnwlNqJTSBg)

