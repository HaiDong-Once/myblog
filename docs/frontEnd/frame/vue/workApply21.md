
# 实现定时切换指定的文案循环播放


每隔一秒切换文案，循环播放：
```js
computed: {
  textPop() {
    return this.popTexts[this.popTextsIndex];
  },
},

data(){
    return{
       popTexts: [ // 存储文本的数组
           "正在导入位置坐标", 
           "正在导入店铺名称", 
           "正常导入查询范围"
       ], 
       popTextsIndex : 0,
    }
}  
    
setInterval(() => {
  this.popTextsIndex = (this.popTextsIndex + 1) % this.popTexts.length;
}, 1000);
```