
# vue手写签名插件vue-esign

- 生成base64图片文件，自定义base64图片旋转函数
- github地址 [https://github.com/JaimeCheng/vue-esign](https://github.com/JaimeCheng/vue-esign)

![图片](/images/frontEnd/vue/img_4.png)

### 安装
```shell
npm install vue-esign --save
```

### 注入组件
```ts
import vueEsign from 'vue-esign'
components: { vueEsign }
```

### 组件封装
```vue
<!--
  @description: 手写签名弹窗组件
  @author: hhd (2022-08-16)
  @说明：
      @getImgBase64： 获取签名base64文件；
      @closePop：关闭弹窗回调；
      imgEdg: 生成签名图片旋转角度（必须是90的倍数）
  @使用方式：
      import autographPop from "@guanjia/components/autographPop/index.vue"
      components: {autographPop,},

     <autographPop
          v-if="autographPopFlag"
          @getImgBase64="getImgBase64"
          @closePop="autographPopFlag=false"
          imgEdg="-90">
      </autographPop>

      /**
       * 获取手写img
       * @param url
       */
      getImgBase64(url) {
        this.autographImg = url;
      },
-->


<template>
  <div class="pop-page">
    <div class="pop-box">
      <div class="close" @click="closePop">
        <img src="@guanjia/assets/imgs/plaque/afterPay/close-icon.png" alt="">
      </div>
      <div class="title">手写签名</div>
      <div class="button1" @click="handleReset">重写</div>
      <div class="button2" @click="handleGenerate">使用</div>
      <div class="graph-box">
        <vueEsign
            ref="esign"
            :width="500"
            :height="1120"
            :isCrop="isCrop"
            :lineWidth="lineWidth"
            :lineColor="lineColor"
            :bgColor.sync="bgColor">
        </vueEsign>
      </div>
    </div>
  </div>
</template>


<script>
import vueEsign from 'vue-esign'


export default {
  name: "index",
  components: {vueEsign},
  props:{
    imgEdg:{ // 生成签名图片旋转角度
      type: String,
      required: ''
    },
  },

  data(){
    return{
      lineWidth: 6, // 画笔边框宽度
      lineColor: '#000', // 画笔颜色
      bgColor: '', // 背景颜色
      resultImg: '', // 生成签名图片文件
      isCrop: true, // 是否裁切
    }
  },


  computed: {

  },


  methods: {
    /**
     * 清空签名画板
     */
    handleReset () {
      this.$refs.esign.reset()
    },


    /**
     * 创建签名base64 img文件
     */
    handleGenerate () {
      this.$refs.esign.generate().then(res => {
        this.resultImg = res;
        if(this.imgEdg){
          this.rotateBase64Img(this.resultImg, +this.imgEdg)
        }else{
          this.$emit("getImgBase64", this.resultImg);
          this.closePop()
        }
      }).catch(err => {
        alert(err) // 画布没有签字时会执行这里 'Not Signned'
      })
    },


    /**
     * 关闭签名弹窗回调
     */
    closePop(){
      this.$emit('closePop', false)
    },


    /**
     * base64图片旋转
     * @param src base64图片文件
     * @param edg 图片旋转角度：必须是90的倍数
     */
    rotateBase64Img(src, edg) {
      let that = this;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let imgW;//图片宽度
      let imgH;//图片高度
      let size;//canvas初始大小
      if (edg % 90 !== 0) {
        console.error("旋转角度必须是90的倍数!");
      }
      (edg < 0) && (edg = (edg % 360) + 360)
      const quadrant = (edg / 90) % 4; //旋转象限
      const cutCoor = {sx: 0, sy: 0, ex: 0, ey: 0}; //裁剪坐标
      const image = new Image();
      image.crossOrigin = "anonymous"
      image.src = src;
      image.onload = function () {
        imgW = image.width;
        imgH = image.height;
        size = imgW > imgH ? imgW : imgH;
        canvas.width = size * 2;
        canvas.height = size * 2;
        switch (quadrant) {
          case 0:
            cutCoor.sx = size;
            cutCoor.sy = size;
            cutCoor.ex = size + imgW;
            cutCoor.ey = size + imgH;
            break;
          case 1:
            cutCoor.sx = size - imgH;
            cutCoor.sy = size;
            cutCoor.ex = size;
            cutCoor.ey = size + imgW;
            break;
          case 2:
            cutCoor.sx = size - imgW;
            cutCoor.sy = size - imgH;
            cutCoor.ex = size;
            cutCoor.ey = size;
            break;
          case 3:
            cutCoor.sx = size;
            cutCoor.sy = size - imgW;
            cutCoor.ex = size + imgH;
            cutCoor.ey = size + imgW;
            break;
        }
        ctx.translate(size, size);
        ctx.rotate(edg * Math.PI / 180);
        ctx.drawImage(image, 0, 0);
        const imgData = ctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey);
        if (quadrant % 2 === 0) {
          canvas.width = imgW;
          canvas.height = imgH;
        } else {
          canvas.width = imgH;
          canvas.height = imgW;
        }
        ctx.putImageData(imgData, 0, 0);
        that.resultImg = canvas.toDataURL();
        that.$emit("getImgBase64", canvas.toDataURL());
        that.closePop()
      };
    }
  },

}
</script>


<style lang="scss" scoped>
.pop-page{
  width: 100%;
  overflow: hidden;
  background: rgba(0,0,0, 0.6);
  min-height: calc(100vh + 1px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  .pop-box{
    width: 966px;
    height: 1858px;
    background-color: #ffffff;
    border-radius: 22px;
    position: relative;
    .close{
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 120px;
      width: 120px;
      img{
        width: 34px;
        height: 34px;
      }
    }
    .title{
      position: absolute;
      right: -20px;
      top: 840px;
      transform: rotate(90deg);
      font-size: 46px;
      line-height: 44px;
      color: #333333;
    }
    .button1{
      position: absolute;
      right: -40px;
      bottom: 360px;
      transform: rotate(90deg);
      height: 79px;
      width: 202px;
      background-color: #ffffff;
      border: solid 3px #1f81f8;
      font-size: 40px;
      line-height: 79px;
      text-align: center;
      color: #1f81f8;
      border-radius: 16px;
      box-sizing: border-box;

    }
    .button1:active{
      opacity: 0.6;
    }
    .button2{
      position: absolute;
      right: -40px;
      bottom: 120px;
      transform: rotate(90deg);
      height: 79px;
      width: 202px;
      background-color: #1f81f8;
      border: solid 3px #1f81f8;
      font-size: 40px;
      line-height: 79px;
      text-align: center;
      color: #ffffff;
      border-radius: 16px;
      box-sizing: border-box;
    }
    .button2:active{
      opacity: 0.6;
    }
    .graph-box{
      position: absolute;
      top: 40px;
      left: 40px;
      width: 787px;
      height: 1758px;
      background-color: #ffffff;
      border: dashed 3px #999999;
      box-sizing: border-box;
      border-radius: 8px;
    }
  }
}

</style>
```
