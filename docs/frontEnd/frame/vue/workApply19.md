


# vue模拟播放动画方案

### await+settimeout方案
#### html： 使用v-transition动画
```html
<transition name="opacity">
  <label v-show="flagObj.page1">
    <div class="page1-box">
      <img src="@/assets/imgs/box-search/animation/content-bg-1.png" alt=""/>
      <img class="page1-tips" src="@/assets/imgs/box-search/animation/page1-tips.png" alt=""/>
      <div class="box">
        <div>{{company_name_typing}}</div><div>搜索</div>
      </div>
    </div>
  </label>
</transition>
```

#### css: 渐入渐出动画
```scss
.opacity-enter-active, .opacity-leave-active{
  transition: all .5s;
}
.opacity-enter, .opacity-leave-to{
  opacity: 0;
}
```

#### js:await + settimeout 控制间隔时间
```ts
/**
 * 启动动画
 */
async startAnimation(type){
  if(type === 1) this.homeClick(10);
  this.isStartAnimation = true;
  this.flagObj.homeShow = false;
  if(!this.isPlay){
    this.$refs.audio.play();
  }
  this.isMuted = false;
  await this.setTimeOut(500);
  // 开始视频
  this.flagObj.page1 = true;
  // 搜索框打字效果
  const data = this.company_name.split('')
  let index = 0;
  this.company_name_typing = "";
  const timer = setInterval(()=>{
    this.company_name_typing += data[index]
    ++ index
    if(index >= data.length){
      clearInterval(timer)
      this.flagObj.openFinger = true;
    }
  },200)
  await this.setTimeOut(3000);
  this.flagObj.page1 = false;
  await this.setTimeOut(550);
  this.flagObj.page2 = true;
  await this.setTimeOut(2300);
  this.flagObj.page2 = false;
  // .........
  this.isPlay = false;
  !this.isPageDestroy && batchRecord(this.$route.query.id, '2')
},


setTimeOut(time){
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve()
    }, time)
  })
},
```

### requestAnimationFrame 替代方案
- requestAnimationFrame 控制时间间隔，更精准
```ts
let time = new Date().getTime();
requestAnimationFrame(()=>{
    let time1 = new Date().getTime();
    let duration = time1 - time;
})
```
