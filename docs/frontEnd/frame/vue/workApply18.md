

# vue中使用微信开放标签调起小程序
```html
<template v-if="!wxBrowser">
  <div class="button" @click="clickButton">使用权益</div>
</template>
<template v-else>
  <div style="display: flex; justify-content: center;">
    <wx-open-launch-weapp
        id="launch-btn"
        username="gh_c9ddc8b1ef39"
        path="pages/index/index?code=tfoFEIqSPeVSZyfvp1Mpww%3D%3D"
        @error="handleErrorFn"
        @launch="handleLaunchFn"
    >
      <script type="text/wxtag-template">
        <div class="button">使用权益</div>
        <style>
          .button {
            width: 346px;
            height: 50px;
            background-image:
                linear-gradient(1deg,
                #f62810 0%,
                #fa6e49 100%),
                linear-gradient(
                    #e31726,
                    #e31726);
            background-blend-mode: normal, normal;
            border-radius: 25px;
            line-height: 50px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            color: #ffffff;
            margin: 0 auto;
          }
          .button:active {
            opacity: 0.6;
          }
        </style>
      </script>
    </wx-open-launch-weapp>
  </div>
</template>
```
```ts
import wx from "weixin-js-sdk";

created() {
    this.$tools.batchRecord(this.id, '01')
    this.jumpToMiniProgram()
    let ua = navigator.userAgent.toLowerCase();
    if (`${ua.match(/MicroMessenger/i)}` === "micromessenger") {
        this.wxBrowser = true;
    }
},

clickButton(){
    this.$toast('请在微信中打开')
},

handleErrorFn(e) {
    this.$tools.batchRecord(this.id, '02')
    console.log("fail", e.detail)
},

handleLaunchFn(e) {
    this.$tools.batchRecord(this.id, '02')
    console.log("success")
},


jumpToMiniProgram() {
    let jsApiList = [
        "updateAppMessageShareData",
        "updateTimelineShareData",
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "onMenuShareQZone",
        "startRecord",
        "stopRecord",
        "onVoiceRecordEnd",
        "playVoice",
        "pauseVoice",
        "stopVoice",
        "onVoicePlayEnd",
        "uploadVoice",
        "downloadVoice",
        "chooseImage",
        "previewImage",
        "uploadImage",
        "downloadImage",
        "translateVoice",
        "getNetworkType",
        "openLocation",
        "getLocation",
        "hideOptionMenu",
        "showOptionMenu",
        "hideMenuItems",
        "showMenuItems",
        "hideAllNonBaseMenuItem",
        "showAllNonBaseMenuItem",
        "closeWindow",
        "scanQRCode",
        "chooseWXPay",
        "openProductSpecificView",
        "addCard",
        "chooseCard",
        "openCard",
    ];
    setTimeout((_) => {
        this.$http
            .get("/", {
                params: {
                    action: "get_wx_js_ticket",
                    url: location.href,
                },
            })
            .then((data) => {
                const js_info = data.data;
                wx.ready(function () {
                    console.log("call");
                });
                wx.error(function (res) {
                    console.log(res)
                });
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
                    // 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，
                    // 仅在pc端时才会打印。
                    appId: js_info["app_id"], // 必填，公众号的唯一标识
                    timestamp: js_info["timestamp"], // 必填，生成签名的时间戳
                    nonceStr: js_info["nonce"], // 必填，生成签名的随机串
                    signature: js_info["signature"], // 必填，签名，见附录1
                    jsApiList: jsApiList, //wxApiList, // 必填，需要使用的JS接口列表，
                    // 所有JS接口列表见附录2
                    openTagList: [
                        "wx-open-subscribe",
                        "wx-open-audio",
                        "wx-open-launch-weapp",
                    ],
                });
            });
    }, 500);
},
```
