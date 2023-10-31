

# nuxt3 懒加载应用案例
[[toc]]


## 前言
- 因为项目中部分页面有大量图片，首次渲染会同时向cdn发起几十次请求，cdn需要处理好所有图片尺寸缓存到cdn，因为cdn性能不佳，
所以导致首次加载会有个别图片没有加载完成，报403错误
- 考虑的解决方案是，后端写一个脚本提前跑号固定尺寸的cdn图片，前端的方案是图片预加载或者懒加载；
  最终决定的方案是懒加载；以下是nuxt3中懒加载案例


## 安装依赖
```shell
pnpm install nuxt-lazy-load
```

## 引入依赖
```js
// nuxt.config.js (nuxt.config.ts)
modules: [
  'nuxt-lazy-load'
]
```

## 配置
```js
// nuxt.config.js
lazyLoad: {
  images: true,
  directiveOnly: false,
  defaultImage: '/companyMobile/default-image.jpg'
},
```

## 示例链接信博汇
[https://xbh.shuidi.cn/companyDetail?digest=d3b36befe077e7b8d0d6d2dbdfb88b01&from=new360](https://xbh.shuidi.cn/companyDetail?digest=d3b36befe077e7b8d0d6d2dbdfb88b01&from=new360)

## 其他可选配置说明
如果你不想在每个图像/视频/音频/iframe上使用延迟加载，请将directiveOnly设置为true并使用这样的指令（使用data-src/data-srcset/data-poster）
```html
<img  data-src =" image.png " alt ="" title ="" v-lazy-load >
```

如果不需要在源元素上添加指令（v-lazy-load）
```html
<video data-poster="~/assets/images/poster.jpg" v-lazy-load>
  <source data-src="video.mp4" type="video/mp4"> --> without directive
</video>
```

如果不想延迟加载单个元素，只需添加data-not-lazy属性
```html
<audio controls=" controls " data-not-lazy> <source type="audio/mpeg" src="audio.mp3"> </audio>
```

其他配置:
```js
modules: [
  'nuxt-lazy-load'
],

lazyLoad: {
  // 这些是默认值
  images: true,
  videos: true,
  audios: true,
  iframes: true,
  native: false,
  directiveOnly: false,
  
  // 默认图像必须位于公共文件夹中
  defaultImage: '/images/default-image.jpg',

  // 要删除类，请将值设置为 false 
  loadingClass: 'isLoading',
  loadedClass: 'isLoaded',
  appendClass: 'lazyLoad',
  
  observerConfig: {
    // 参阅 IntersectionObserver 文档
  }
}
```