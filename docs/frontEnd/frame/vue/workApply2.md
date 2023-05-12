

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
            "https://itunes.apple.com/us/app/%E6%B0%B4%E6%BB%B4%E4%BF%A1%E7%94%A8/id1075736286?l=zh&ls=1&mt=8"; //ios下载地址
      } else {
        window.close();
      }
    }, 1500);
    window.location = "https://shuidi.cn/ulink/";
  } else if (navigator.userAgent.match(/android/i)) {
    try {
      window.location = "shuidi://";
      setTimeout(() => {
        window.location =
            "https://filecdn.shuidi.cn/file/upload/files/38/7c/62/20/387c62205938acda32e9690d946a486d.apk/%E6%B0%B4%E6%BB%B4%E4%BF%A1%E7%94%A8.version.153(3).apk";
      }, 500);
    } catch (e) {
      console.log(e)
    }
  }
}
```