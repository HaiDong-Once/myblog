

# H5调起APP以及适配问题
![图片](/images/frontEnd/img_17.png)

### 调起水滴APP代码示例
```ts
/**
 * 下载水滴app
 * ios使用Universal Link，安卓使用URL Scheme
 */
 function uploadApp(){
  this.addRecord();
  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    var loadDateTime = new Date();
    window.setTimeout(function () {
      var timeOutDateTime = new Date();
      if (timeOutDateTime - loadDateTime < 5000) {
        window.location =
            "https://itunes....."; //ios下载地址
      } else {
        window.close();
      }
    }, 1500);
    window.location = "https://...../ulink/";
  } else if (navigator.userAgent.match(/android/i)) {
    try {
      window.location = "shuidi://";
      setTimeout(() => {
        window.location =
            "https://filecdn.............apk";
      }, 500);
    } catch (e) {
      console.log(e)
    }
  }
}
```