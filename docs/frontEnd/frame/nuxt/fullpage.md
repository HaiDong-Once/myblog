
# nuxt3 fullpage 官网应用
[[toc]]


## 介绍
因官网上线需要实现鼠标滚动滑动翻页的效果，开始使用了自定义监听滚动事件+css动画实现，但是效果并没有那么丝滑。因为项目需要紧急上线，故选择了fullpage
实现这个效果。开始使用了nuxt3官网推荐的导入方式，但是均无效果或者内部报错，最后使用了下载js,css文件，手动插入head头的方式实现，并将报错代码注释处理。

- 文档地址：['https://github.com/alvarotrigo/fullPage.js/tree/master/lang/chinese#fullpagejs'](https://github.com/alvarotrigo/fullPage.js/tree/master/lang/chinese#fullpagejs)
### 页面结构
```html
<div id="fullPage">

    <div class="section">一些内容</div>
    
    <!--嵌套结构-->
    <div class="section">
        <div class="silde">1</div>
        <div class="silde">2</div>
        <div class="silde">3</div>
        <div class="silde">4</div>
    </div>
    
    <div class="section">一些内容</div>
    
    <div class="section">一些内容</div>

</div>
```
### 常用API：
```
1. sectionsColor: 可以为每一个section设置background-color属性

controlArrows:
    定义是否通过箭头控制slide幻灯片，默认为true。当设置为false时，幻灯片两侧的箭头会消失。在移动设备上可以通过滑动来操作幻灯片。
    
    verticalCentered: 每一页的内容是否垂直居中，默认为true，一般保持默认。
    
    resize: 字体是否随着窗口缩放而缩放，默认为false。
    
    scrollingSpeed: 滚动速度，单位是毫秒，默认是700。
    
    anchors:
        定义锚链接，默认值为[]。有了锚链接，用户可以快速打开定位到某一页面。注意定义锚链接的时候，值不要和页面中任意的id或name相同，尤其是ie浏览器下，而且定义时不需要加#。
    
    lockAnchors:
        是否锁定锚链接，默认为false。如果设置为true，那么定义的锚链接，也就是anchors属性没有效果。这个配置使用的比较少。
    
    easing:
        定义页面section滚动的动画方式，默认为easeInOutCubic，如果修改此项，需要引入jquery.easings插件，或者jquery
ui。
    
    css3: 是否使用css3
transform来实现滚动效果，默认为true。这个配置项可以提高支持css3的浏览器，比如移动设备等的速度，如果浏览器不支持css3，则会使用jquery来代替css3实现滚动效果。
    
    loopTop: 滚动到最顶部后是否连续滚动到底部，默认为false。
    
    loopBottom滚动到最底部后是否连续滚动返回顶部，默认为false。
    
    loopHorizontal: 横向slider幻灯片是否循环滚动，默认为true。
    
    autoScrolling:
        是否使用插件的滚动方式，默认为true，如果选择false，则会出现浏览器自带的滚动条，将不会按页滚动，而是按照滚动条的默认行为来滚动。
    
    scrollBar:
        是否包含滚动条，默认为false，如果设置为true，则浏览器自带的滚动条会出现，页面滚动时还是按页滚动，但是滚动条默认行为也有效。
    
    paddingTop/paddingBottom:
设置每一个section顶部和底部的padding，默认都为0.一般如果我们需要设置一个固定在顶部或者底部的菜单，导航、元素等，可以使用这两个配置项。
    
    fixedElements:
        固定的元素，默认为null，需要配置一个jquery选择器。在页面滚动的时候，fixedElements设置的元素固定不动。
    
    keyboardScrolling: 是否可以使用键盘方向键导航，默认为true。
    
    touchSensitivity: 在移动设备中滑动页面的敏感性，默认为5，是按百分比来衡量，最高为100，越大越难滑动。
    
    continuousVertical:
        是否循环滚动，默认为false。如果设置为true，则页面会循环滚动，而不像loopTop或loopBottom那样出现跳动，这个属性与loopTop、loopBottom不兼容，不要同时设置。
    
    animateAnchor:
        锚链接是否可以控制滚动动画，默认为true，如果设置为false，则通过锚链接定位到某个页面显示不再有动画效果。
    
    recordHistory:
        是否记录历史，默认为true，可以记录页面滚动的历史，通过浏览器的前进后退的导航。注意如果设置了autoScrolling:false，那么这个配置也将被关闭，即设置为false。
    
    menu: 绑定菜单，设定的相关属性与anchors的值对应后，菜单可以控制滚动，默认为false。可以设置为菜单的jquery选择器。
```

### 常用配置
```
menu:’#fullpageMenu’


navigation: 是否显示导航，默认为false。如果设置为true，会显示小圆点，作为导航。

navigationPosition: 导航小圆点的位置，可以设置left或者right。

navigationTooltips: 导航小圆点的tooltips设置，默认为[]，主要按照顺序设置。

showActiveTooltip: 是否显示当前页面的导航的tooltip信息，默认为false。

slidesNavigation: 是否显示横向幻灯片的导航，默认为false。

slidesNavPosition: 横向幻灯片导航的位置，默认为bottom，可以设置top或者bottom。

scrollOverflow: 内容超过满屏后是否显示滚动条，默认为false。如果设置为true，则会显示滚动条，如果要滚动查看内容，还需要jquery.slimscroll插件的配合。slimscroll插件主要用于模拟传统浏览器滚动条。

sectionSelector: section的选择器，默认为.section。

slideSelector: slide的选择器，默认为.slide。

```

### 常用方法：
```
（$.fn.fullpage.moveSectionUp()）

moveSectionUp(): 向上滚动一页。

moveSectionDown(): 向下滚动一页。

moveTo(section,slide): 滚动到第几页，第几个幻灯片，注意页面是从1开始，而幻灯片是从0开始。

slientMoveTo(section,slide): 滚动到第几页，和moveTo一样，但是没有动画效果。

moveSlideRight(): 幻灯片向右滚动。

moveSlideLeft(): 幻灯片向左滚动。


setAutoScrolling(boolean): 动态设置autoScrolling。

setLockAnchors(boolean): 动态设置lockAnchors。

setRecordHistory(boolean): 动态设置recordHistory。

setScrollingSpeed(milliseconds): 动态设置scrollingSpeed。

setAllowScrolling(boolean,[directions]): 添加或删除鼠标滚轮/滑动控制，第一个参数true为启用，false为禁用，后面的参数为方向，取值包括all, up, down, left, right, 可以使用多个 , 逗号分隔。

destroy(type): 销毁fullpage特效，type可以不写，或者使用all，不写type，fullpage给页面添加的样式和html元素还在，如果使用all，则样式、html等全部销毁，页面恢复和不使用fullpage相同的效果。

reBuild(): 重新更新页面和尺寸，用于通过ajax请求后改变了页面结构之后，重建效果。

```

### 常用回调函数：
```
afterLoad(anchorLink,index): 滚动到某一section，且滚动结束后，会触发一次此回调函数，函数接收anchorLink和index两个参数，anchorLink是锚链接的名称，index是序号，从1开始计算。ps：可以根据anchorLink和index参数值的判断，触发相应的事件。

onLeave(index,nextIndex,direction): 在我们离开一个section时，会触发一次此回调函数，接收index、nextIndex和direction 3个参数：

index：是离开的“页面”的序号，从1开始计算。

nextIndex：是滚动到的目标的“页面”的序号，从1开始计算。

direction：判断往上滚动还是往下滚动，值是up或者down。

通过return false;可以取消滚动。

afterRender(): 页面结构生成后的回调函数，或者说页面初始化完成后的回调函数。

afterResize(): 浏览器窗口尺寸改变后的回调函数。

afterSlideLoad(anchorLink,index,slideAnchor,slideIndex): 滚动到某一幻灯片后的回调函数，与afterLoad类似。

onSlideLeave(anchorLink,index,slideIndex,direction,nextSlideIndex): 在我们离开一个slide时，会触发一次此回调函数，与onLeave类似。

```



## nuxt3 引入方式
在nuxt.ts中，或者使用head设置hook在单个页面中引入也可以
```json
app: {
  head: {
    title: '信博汇',
    script: [
      { src: 'https://staticcdn.shuidi.cn/xbh-nuxt/js/fullpage.js', type: "text/javascript", body: true },
      { children: ' this.globalThis || (this.globalThis = this)' } // 解决浏览器端 chrome69 globalThis is not defined 报错
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://staticcdn.shuidi.cn/xbh-nuxt/css/fullpage.css'
      }
    ]
  },
},
```

注意：需要在js文件中注释一段代码, 去掉license验证
```js
// if(!isLicenseValid){
//     showError('error', 'Fullpage.js version 3 has changed its license to GPLv3 and it requires a `licenseKey` option. Read about it here:');
//     showError('error', 'https://github.com/alvarotrigo/fullPage.js#options.');
// }
```

## 使用案例
### 初始化fullpage
```ts
const myFullpage = ref(null) // fullpage实例

/**
 * 初始化fullpage
 */
const initFullpage = () => {
  myFullpage.value = new fullpage('#fullpage', {
    verticalCentered: false, // 是否垂直居中
    scrollingSpeed: 1000, // 设置为想要的滚动时间（毫秒）
    anchors:['firstPage', 'secondPage', 'thirdPage','fourthPage'], // 页面锚点
    paddingTop: '12vh', // 距离顶部距离
    menu: '#header', // 菜单栏
    afterLoad: function(origin,indexObj) {
      const {index} = indexObj ?? {}
      pageFlag.value = index + 1 + ''
    }
  });
}

onMounted(() => {
  initFullpage()
})


/**
 * tab点击
 * @param index
 */
const tabClick = (index) => {
  pageFlag.value = index
  myFullpage.value.moveTo(+index)
}

onBeforeUnmount(() => {
  myFullpage.value.destroy()
  myFullpage.value = null
})
```

### html页面结构
```html
<div id="fullpage">
  <div class="section">
    <HomePage1 @openFormPop="(code)=>openFormPop(code)"/>
  </div>
  <div class="section">
    <HomePage2 @openFormPop="(code)=>openFormPop(code)"/>
  </div>
  <div class="section">
    <HomePage3 @openFormPop="(code)=>openFormPop(code)"/>
  </div>
  <div class='section'>
    <HomePage4 @tabClick="(index)=>tabClick(index)"
               @openFormPop="(code)=>openFormPop(code)"/>
  </div>
</div>
```