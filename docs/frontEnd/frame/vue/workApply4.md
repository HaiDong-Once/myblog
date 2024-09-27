
# vue应用swiper轮播图
### swiper依赖安装
```shell
npm install swiper --save
```

### 文件导入
```ts
import Swiper from "swiper";
import "../../../../public/swiper.css";
// 或者 import 'swiper/dist/css/swiper.css';
```

### 应用
```html
<!--轮播图组件-->
<div class="swiper-container" v-show="true">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img
          class="banner1"
          src="../../../../assets/imgs/activityTest/map-mark/banner1.png"
          alt=""
      />
    </div>
    <div class="swiper-slide">
      <img
          class="banner2"
          src="../../../../assets/imgs/activityTest/map-mark/banner2.png"
          alt=""
      />
    </div>
  </div>
</div>
```

- 注： 如果展示隐藏轮播组件，使用`v-show`, 不能用`v-if`,
- 使用`v-if` vue虚拟dom节点异常，索引覆盖
```ts
/**
 * 初始化轮播图
 * js 请求数据完成后再初始化，否则或数据轮播时数据丢失
 */
async getPublicData(){
    let p1 = this.getMapData();
    let p2 = this.getCompanyInfo();
    Promise.all([p1,p2]).then(()=>{
        // 声明swiper组件
        // 动态数据获取完毕后配置轮播图，保证动态数据正常展示
        this.swiper_container = new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            autoplay: true, //自动循环
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents:true, //修改swiper的父元素时，自动初始化swiper
        })
    }).catch()
},

// 如果依旧有数据丢失的情况，初始化可以嵌套空定时器
settimeout(()=>{
    this.swiper_container = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: true, //自动循环
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents:true, //修改swiper的父元素时，自动初始化swiper
    })
},0)
```