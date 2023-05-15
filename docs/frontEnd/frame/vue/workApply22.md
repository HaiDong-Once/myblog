
# audio 音频添加字幕效果



::: tip 背景:
有段音频播报需要在落地页播放，产品想在播放音频的同时，将字幕同步音频展示在页面中；<br>
初始的思路是使用定时器隔每隔固定的时间切换字幕内容，但是因为定时器是宏任务，时间可能是不准确的，而且添加好多定期器代码不简介，维护也困难；<br>
所以想到了 `addEventListener('timeupdate'）`音频时间监听器来实现
:::


## 思路
### 定义字幕信息
```js
subtitleData = [  // 字幕数据格式为 [开始时间, 结束时间, 字幕内容]
      [0, 4, '地图上有你的店吗'],
      [4, 8, '顾客找不到名称找不到地址影响生意'],
      [8, 11, '立即查询-看看能不能找到我的店'],
];
```

### 监听音频播放的位置给字幕赋值
```js
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const currentSubtitle = subtitleData.find(subtitle =>
        currentTime >= subtitle[0] && currentTime < subtitle[1]
    );
    if (currentSubtitle) {
      this.subtitle = currentSubtitle[2];
    }
  });
```

## 涉及问题
以下赋值方式会产生缓存, 因为 isResCompany 是接口请求后才会更新，dom初始化时isResCompany 为false，
2.mp3 dom初始化时就会加载到audio中，谷歌，safari 替换后音频资源不会重新加载；
```js
<audio controls id="audio">
  <source :src="isResCompany ? '1.mp3' : '2.mp3'" type="audio/mpeg">
</audio>

<audio controls id="audio"  v-if="isResCompany">
  <source src="'2.mp3'" type="audio/mpeg">
</audio>
<audio controls id="audio" v-else>
  <source src="'2.mp3'" type="audio/mpeg">
</audio>
```

如果想要使用功能这种方式，需要在获取到最新数据后，强制重新加载audio
```js
if (this.isResCompany) {
        // 强制让浏览器重新加载音频文件
        this.$refs.audio.load();
 }
```

## 代码实现
```js
<!-- 音频部分 -->
<audio controls id="audio" style="display: none" v-if="audioUrl">
  <source :src="audioUrl" type="audio/mpeg">
</audio>

<!-- 展示字幕 -->
<div class="audio-text-box">
     <div class="audio-text">{{ subtitle }}</div>
</div>
```
```js
data() {
  return {
        isShowPlayButton: false, // 是否展示音频播放按钮
        audioUrl: '', // 音频地址动态
        subtitle: this.isResCompany ? '地图上有你的店吗' : '地图上有你的公司吗', // 字幕内容
    }
}

init(){
    await getInfo()  // 初始化页面数据
    // 使用动态赋值方式，不要再html中判断，否则dom初始化会加载音频缓存资源，
    // 谷歌，safari都有这个问题，火狐浏览器正常；
    if(this.isResCompany){
      this.audioUrl = 'https://staticcdn.shuidi.cn/shuidi/audio/res-once-map.mp3'
    }else{
      this.audioUrl = 'https://staticcdn.shuidi.cn/shuidi/audio/com-once-map.mp3'
    }
    this.$nextTick(() => {
      this.audioPlay(); // 自动播放音频
    });
}


/**
 * 音频播放
 */
audioPlay(){
  this.isShowPlayButton = false;
  let audio = document.getElementById('audio');
  let subtitleData = [];
  if(this.isResCompany){
    subtitleData = [  // 字幕数据格式为 [开始时间, 结束时间, 字幕内容]
      [0, 4, '地图上有你的店吗'],
      [4, 8, '顾客找不到名称找不到地址影响生意'],
      [8, 11, '立即查询-看看能不能找到我的店'],
    ];
  }else{
    subtitleData = [
      [0, 4, '地图上有你的公司吗'],
      [4, 8, '客户找不到名称找不到地址影响生意'],
      [8, 11, '立即查询-看看能不能找到我的公司'],
    ];
  }
  audio.play().catch(error => {
    console.log('自动播放被浏览器阻止', error);
    this.isShowPlayButton = true;
  });
  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const currentSubtitle = subtitleData.find(subtitle =>
        currentTime >= subtitle[0] && currentTime < subtitle[1]
    );
    if (currentSubtitle) {
      this.subtitle = currentSubtitle[2];
    }
  });
},
```