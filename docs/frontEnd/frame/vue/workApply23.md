
# 图片上传速度监听和中断上传


::: tip 说明：
- 上传速度监听  `onUploadProgress`  方法
- 中断请求：vue 项目中使用 `axios` 的 `CancelToken`
:::


## onUploadProgress
`onUploadProgress` 是一个用于监视文件上传进度的事件处理程序。它通常用于与服务器进行文件上传交互的前端开发中，
可以通过该事件来获取上传文件的进度信息并进行相应的处理


## 代码实现
```ts
import axios from 'axios'

handleUpload(e) {
  let that = this;
  this.uploadPercent = 0;
  this.tipsPopFlag = true;
  
  const { file } = e;
  this.validateImg(file).then(() => {
    let data = new FormData();
    data.append('file', file)
    this.$http({
      method: 'POST',
      url: '//upload.........',
      data,
      // 上传进度监听
      onUploadProgress: (progressEvent) => {
        this.uploadPercent =
         Math.round((progressEvent.loaded * 100) / progressEvent.total);
      },
      // 中断请求设置
      cancelToken: new axios.CancelToken(function executor(c) {
        that.cancelUploadFun = c;
      })
    }).then(res => {
        
      this.tipsPopFlag = false;
    }).catch(err => {
      err && this.$toast(err)
      this.tipsPopFlag = false;
    })
  }).catch((res)=>{
     res && this.$toast(res)
  })
},

/**
 * 取消上传
 */
cancelUpload(){
  if(typeof this.cancelUploadFun ==='function'){
    this.cancelUploadFun();
  }
},
```