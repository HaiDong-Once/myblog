
# 代码逻辑复用研究

[[toc]]


## 前端项目公共业务逻辑抽离解决方案

::: tip 背景
- 最早的项目代码在同一套版本中不断的迭代，通过版本号判断来区别每一个版本的样式和逻辑，时间久了难以维护和继续开发；
- 所以之后只要是不同的版本都会复制出来一套，这样不管产品怎么变动，如何后续迭代，每一个版本的代码都是清晰的，确定好一个测试版本之后再将，弃用的测试版本从代码中移除。
- 但这样也带来了新的问题，代码造成了很大程度的冗余，出现了大量重复代码，而且哪个旧版本需要弃用，可以移除，产品那边也不明确，会造成长期的代码淤积。
- 所以考虑一种适用于我们业务场景的代码抽离方案，将js层和视图层独立，再通过业务场景细分为全局抽离还是局部分离。
- 考虑时间成本因素，后续再考虑项目升级的方案；
  :::

### 一、vue2中的 mixin 混入
`Mixins` 是一种在多个 `Vue` 组件之间共享代码的方式。它们允许你定义一组方法、计算属性和生命周期钩子，并将它们合并到任何使用该 `mixin` 的组件中。
`[share.md](share.md)
[share_2.md](share_2.md)react` 旧版本中类组件也可以使用 `mixin`，现在已经基本弃用了。

![图片](/images/other/share/img.png)

**缺点：**
- 导致代码复杂性：使用多个 mixins 可能会导致代码变得难以理解和调试，降低代码可读性。
- 命名冲突：多个 mixins 中有相同名称的方法或属性，可能会导致命名冲突，无法通过编译工具及时发现。

**mixin与js模块的区别:** <br/>
之前考虑使用js模块来实现逻辑复用，但是发现js模块中无法访问vue全局注入插件等问题，增加了开发难度；以下是二者的区别：
- 作用域不同：js模块的作用域是独立的，mixins的作用域是组件级别的；
- 继承关系不同：js模块通过import和export来导入导出，不同模块是独立的，无继承关系，mixins是一种混入式的继承关系，会按照引入顺序混合到组件中，形成一个新组件；
- 代码复用范围不同：js模块适合全局引用的独立模块，mixins更适合在小范围组件内使用。

**mixins混入代码实现：** <br/>
创建mixins.js文件
```ts
/**
 * 地图服务-公共逻辑抽离-mixin
 * @author: hhd (2023-04-03)
 */
import axios from 'axios'


export default {
    // 公共变量抽离
    data() {
        return {
            company_name: '',  // 企业名称
            map_pics: {}, // 地图图片对象
            fileList: [], // 图片数组
            uploadPercent: 0, // 上传进度
            cancelUploadFun: null, // 取消请求
            tipsPopFlag: false, // 上传提交弹窗控制
            tipsPopImgFlag: false, // 图片上传提示弹窗
        }
    },

 // 公共业务逻辑抽离
 methods: {
    /**
     * 请求地图map基础信息
     */
    getCompanyPics() { },

    /**
     * 上传图片回调
     */
    handleUpload(e) {
        this.uploadPercent = 0;
        this.tipsPopFlag = true;
        const { file } = e;
        this.validateImg(file).then(() => {
            let data = new FormData();
            data.append('file', file)
            this.$http({
                method: 'POST',
                url: '//upload.shuidi.cn/uploadimage',
            }).then(res => {
                
                // mixins 个别组件调用
                this.uploadMapBaidu_4 && this.uploadMapBaidu_4(url);
            }).catch(err => {
                err && this.$toast(err)
                this.tipsPopFlag = false;
            })
        }).catch((res)=>{
            res && this.$toast(res)
        })
      },
   },


    // 公共声明周期触发的逻辑
    mounted() {
        
    }
}
```

组件中应用：
```ts
import mapPublic from '../../Amixin/mapPublic'

export default ({
  mixins: [mapPublic],
  
  methods: {
        /**
         * 上传图片回调（mixins中调用）
         */
        uploadMapBaidu_4(url){
          this.tipsImgSrc = url;
          this.tipsPopImgFlag = true;
        },
  }
})
```

### 二、函数式组件
- 如：`vue3` 中的 `Composition（组合式） API`，`react` 中的 `hooks`；目前主流的组件编写方式；
- 什么是`hooks`（或组合式api) ：谷歌翻译给的解释是，“钩子” “挂钩”； 比较常见的钩子有：
  `windows` 系统的钩子能监听到系统的各种事件，浏览器提供的 `onload` 或 `addEventListener` 能注册在浏览器各种时机被调用的方法。
- `hooks` 总结：一系列方法，提供了一系列提供了组件复用、状态管理等开发能力的方法。

#### 1、vue3中组合式api
- 更好的代码组织
- 更好的逻辑复用
- 更明确的作用域

**以下是 `optionsAPI`（选项式） 和 `CompositonAPI`（组合式） 的区别**
- 小型项目，业务逻辑简单，用 `Options API`
- 中大型项目，逻辑复杂，用 `Composition API`

![图片](/images/other/share/img_1.png)

**逻辑复用代码实现：**
- 抽离逻辑代码到一个函数
- 函数命名约定为 `useXxxx` 格式 （`React Hooks` 也是）

创建 useMousePosition.js：
```ts
import {ref, onMounted, onUnmounted} from "vue";

function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return {
    x,
    y
  }
}

export default useMousePosition
```

在组件中使用：
```vue
<template>
  <p>mouse position {{ x }}-{{ y }}</p>
</template>

<script>

import useMousePosition from "./useMousePosition.js";

export default {
  name: "MousePosition",
  setup() {
    const {x, y} = useMousePosition()

    return {
      x, y
    }
  }
}
</script>
```

#### 2、react中的hooks
- 与vue3的组合式api类似，vue3的组合式api也是学习react hooks的结果；
- 注：hooks只能应用于函数式组件，react中class组件无法应用

代码实现：
```ts
// useMousePosition.js

import {useState, useEffect} from "react";

function useMousePosition() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    function mouseMoveHandler(e) {
      setX(e.clientX)
      setY(e.clientY)
    }

    document.body.addEventListener("mousemove", mouseMoveHandler)
    return () => 
       document.body.removeEventListener("mousemove", mouseMoveHandler)
  }, [])

  return [x, y]
}

export default useMousePosition
```
```js
import React, {useState} from "react";
import useMousePosition from "../customHooks/useMousePosition";

function CustomHooksDemo() {
  const [x, y] = useMousePosition()
  return <div>
    <p>鼠标位置：{x},{y}</p>
  </div>
}
export default CustomHooksDemo
```


#### 3、在vue2中使用组合式api
- 升级到 `vue2.7`: 需要有一定的时间成本，升级后可使用vue3中的组合式api等其他新特性；
- 安装：`@vue/composition-api` ： 提供了组合式api的开发能力

**@vue/composition-api使用步骤：** <br/>
安装插件:
```shell
npm install @vue/composition-api
```
在 main.js 中引入插件：
```ts
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

创建一个组合式函数：
```ts
import { reactive, computed } from '@vue/composition-api'

export default function useCounter() {
  const state = reactive({
    count: 0
  })

  const increment = () => {
    state.count++
  }

  const double = computed(() => {
    return state.count * 2
  })

  return {
    state,
    increment,
    double
  }
}
```

在组件中使用组合式函数：
```vue
<template>
  <div>
    <p>Count: {{ counter.state.count }}</p>
    <button @click="counter.increment">Increment</button>
    <p>Double: {{ counter.double }}</p>
  </div>
</template>

<script>
import useCounter from './useCounter'

export default {
  setup() {
    const counter = useCounter()

    return {
      counter
    }
  }
}
</script>
```

### 三、mixin解决方案实践
因为目前我们的H5项目使用的vue2.6版本，如果升级vue2.7需要一定的时间成本，升级vue3的成本则更高；
所以目前js业务逻辑的复用稳定方案是mixin（局部组件）+全局模块化结合的方式；

- **js局部组件逻辑抽离**: 使用 `mixin` 混入，在重复的同一类型的业务开发场景中使用 `mixin` 混入抽离公共逻辑；比如地图服务营销场景；将落地页，支付页，图片提交页，支付成功页<br/>
  **注意**：注入量最好不超两个，一个小类型，一个大类型，禁止使用全局 `mixin` )  定义变量 最好加上前缀，`mapPublic__`,  `mapPay___`, 以辨别来自哪个 `mixins` 文件，
  对应 `mixins` 文件 `publicmixins.js`  `homemixins.js`  `paymixins.js`，根据组件页面类型分类；
- **js模块全局逻辑抽离** : 全局的工具库，公共接口，等使用js模块封装在全局使用，如打点统计模块，支付模块，函数工具库等；
- **视图层——局部组件**：理论上超过两次使用的视图块，都要抽离成局部组件，保留数据入口，利用插槽等方式提高组件扩展性（最好不要将数据请求业务逻辑带入局部组件，尽量做到视图层和js逻辑层分离）
- **视图层——全局公共组件**：使用与所有业务场景的组件，如：底部组件，统一的弹窗，按钮，图片展示组件，图片上传组件二次封装，
```
project/
├── public/
│   ├── pay.js
│   └── pa.js
├── components/
│   ├── dialog.vue
│   └── footer.vue
└── pages/
    └── map/
        ├── Acomponents/
        │   ├── mapCard.vue
        │   ├── mapView.vue
        │   └── mapHeader.vue
        ├── Amixins/
        │   ├── publicmixins.js
        │   ├── homemixins.js
        │   ├── paymixins.js
        │   ├── picturemixins.js
        │   └── successmixins.js
        ├── mapBaidu_1/
        │   ├── home/
        │   ├── pay/
        │   ├── picture/
        │   └── success/
        └── mapBaidu_2/
            ├── home/
            ├── pay/
            ├── picture/
            └── success/
```


### 四、组合式api hook方案实践
- 升级vue2.7: https://v2.cn.vuejs.org/v2/guide/migration-vue-2-7.html

#### 高德选点组件hook抽离

useMapSelect.js hook代码
```js

import { ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import PinganAna from "pingansec-vue-ana";
import tools from '@guanjia/public/tools'
import axios from '@guanjia/public/axios'


/**
 * 地图拖拽hooks
 * @return {{
 *      positionPickerStart: 开启选点,
 *      initMap: 地图拖拽组件初始化
 *    }}
 * @description
 *     开启选点 positionPickerStart();
 *     使用说明：initMap({
 *             mapDocumentId: 'map-container', // 地图dom box id
 *             mapZoom: 17, // 地图缩放比
 *             location: "116.397379,39.909105",  // 地图坐标点
 *             isShowToolBar: true, // 是否展示地图缩放工具
 *             iconStyle: {
 *               url: 'https://staticcdn.shuidi.cn/shuidi/images/map/drag-blue-icon.png',
 *               size:[222,70],
 *               ancher:[111,70],
 *             }
 *           },
 *           (success)=>{
 *               const {
 *                    address, // 选点地址回显
 *                    locationAddress, // 省市区地址逗号拼接
 *                    location, // 选点坐标回显
 *                    cityOrProvince, // 城市或直辖市
 *               } = success
 *           },
 *          (fail)=>{
 *               console.log(fail)
 *           }
 *     )
 */
export default function useMapDrag() {
    let positionPicker = ref(null); // 地图选点对象

    /**
     * 地图初始化
     * @param mapDocumentId {string} 地图box dom id 值
     * @param mapZoom {number} 地图缩放
     * @param location {string} 地图坐标
     * @param isShowToolBar {boolean}  是否展示缩放ui工具
     * @param iconStyle {object}  选点icon配置
     * @param successCallback {function} 选点成功回调
     * @param failCallback {function} 失败回调
     * @return {Promise<void>}
     */
    const initMap =  async (
        {
            mapDocumentId = 'map-container', // 地图dom box id
            mapZoom = 17, // 地图缩放比
            location = "116.397379,39.909105",  // 地图坐标点
            isShowToolBar = true, // 是否展示地图缩放工具
            iconStyle = {
                url: 'https://staticcdn.shuidi.cn/shuidi/images/map/drag-blue-icon.png',
                size:[222,70],
                ancher:[111,70],
            }
        },
        successCallback,
        failCallback,
    ) => {
        const companyKey = await getIsUseCompanyKey()
        const {keyMap, securityJsCode} = getKeyAndCode(companyKey);

        // 高德秘钥配置
        window._AMapSecurityConfig = {
            securityJsCode: securityJsCode,
        }

        // 加载地图组件
        AMapLoader.load({
            key: keyMap,
            version:"2.0",
            plugins:[],
            AMapUI: {
                version: '1.1',
                plugins:['misc/PositionPicker']
            }
        }).then((AMap)=>{
            // 加载地图UI组件
            AMapUI.loadUI(["misc/PositionPicker"], function(PositionPicker) {
                // 防止立即跳转导致dom清除报错
                let mapContainerDom = document.querySelector('#' + mapDocumentId);
                if(!mapContainerDom){ return }

                // 地图配置
                const mapConfig = new AMap.Map(mapDocumentId, {
                    zoom: mapZoom,
                    center: [location.split(',')[0], location.split(',')[1]],
                });

                // 展示地图工具
                if(isShowToolBar){
                    AMap.plugin([
                        'AMap.ToolBar',
                    ], function(){
                        mapConfig.addControl(new AMap.ToolBar({
                            liteStyle: false,
                            offset: new AMap.Pixel(-140,10)
                        }));
                    });
                }

                // 创建拖拽选点
                positionPicker = new PositionPicker({
                    mode: "dragMap",
                    map: mapConfig,
                    center: [location.split(',')[0], location.split(',')[1]],
                    iconStyle: iconStyle
                });


                positionPicker.on("success", function(positionResult) {
                    PinganAna.fire(4961) // 360地图运营首页地图拖动次数 总和
                    const { addressComponent } = positionResult?.regeocode ?? {};
                    const { province, city, district,
                     township, street, streetNumber} = addressComponent ?? {};

                    let address = province + city + district + township + street + streetNumber;
                    if(!street){
                        let nearestPOI = getAddress(positionResult?.regeocode?.pois);
                        address = province + city + district + township + nearestPOI;
                    }
                    const locationAddress = `${province},${city ? city : province},${district}`;
                    const location = `${positionResult.position.lng},${positionResult.position.lat}`;
                    const cityOrProvince = city ? city : province;

                    if(typeof successCallback === 'function'){
                        successCallback({
                            address,
                            locationAddress,
                            location,
                            cityOrProvince
                        })
                    }

                    positionPicker.stop();
                });

                positionPicker.on("fail", function(positionResult) {
                    console.log(`定位失败:` + positionResult);
                    PinganAna.fire(4961) // 360地图运营首页地图拖动次数 总和

                    // 开启使用企业key
                    if(positionResult.match(/USER_DAILY_QUERY_OVER_LIMIT/)){
                        setIsUseCompanyKey();
                    }

                    // 手动上报选点失败
                    tools.sendTracker({
                        selfType: '地图选点回调失败',
                        message: positionResult
                    });

                    // 地图选点失败回调
                    if(typeof failCallback === 'function'){
                        failCallback(positionResult)
                    }
                });
                mapConfig.panBy(0, 1);

            });
        });
    }


    /**
     * 获取pois拼接地址
     * @param pois
     * @return {string}
     */
    const getAddress =  async (pois) =>{
        if(pois.length === 0){ return '' }
        const data = [
            "餐饮服务;餐饮相关场所;餐饮相关",
            "餐饮服务;快餐厅;快餐厅",
            "餐饮服务;中餐厅;中餐厅",
            "公司企业;公司;公司",
            "购物服务;便民商店/便利店;便民商店/便利店|购物服务;超级市场;超市",
            "餐饮服务;中餐厅;综合酒楼",
            "住宿服务;旅馆招待所;旅馆招待所",
            "医疗保健服务;医药保健销售店;药房",
            "汽车维修;汽车维修;汽车维修",
            "摩托车服务;摩托车维修;摩托车维修",
            "摩托车服务;摩托车服务相关;摩托车服务相关",
            "汽车服务;汽车服务相关;汽车服务相关",
            "购物服务;家居建材市场;家居建材市场",
            "公司企业;公司;建筑公司",
            "公司企业;公司;机械电子",
            "餐饮服务;中餐厅;火锅店",
            "购物服务;购物相关场所;购物相关场所",
            "购物服务;家居建材市场;建材五金市场",
            "购物服务;专卖店;自行车专卖店",
            "公司企业;公司企业;公司企业",
            "医疗保健服务;医药保健销售店;医疗保健用品",
            "餐饮服务;中餐厅;清真菜馆",
            "餐饮服务;中餐厅;东北菜",
            "公司企业;工厂;工厂",
            "购物服务;便民商店/便利店;便民商店/便利店",
            "体育休闲服务;体育休闲服务场所;体育休闲服务场所",
            "体育休闲服务;休闲场所;休闲场所",
        ];
        pois = pois.filter( (item) => !data.includes(item.type) )
        let obj = pois[0] ?? '';
        if(obj){
            let direction = '';
            for(let item of obj.direction){
                if(item === '东'){item = '西'}
                else if(item === '南'){item = '北'}
                else if(item === '西'){item = '东'}
                else if(item === '北'){item = '南'}
                direction += item;
            }
            if(obj.distance && obj.distance < 15){
                return obj.name + direction + '面';
            }else{
                return obj.name + direction + '面' + obj.distance + '米';
            }
        }else{
            return ''
        }
    }


    /**
     * 获取当前可用key和code
     * @param companyKey
     * @return {{keyMap: string, securityJsCode: string}}
     */
    const getKeyAndCode = (companyKey) => {
        const keyMap = '..........'
        const securityJsCode = '............'
        return{
            keyMap,
            securityJsCode
        }
    }


    /**
     * 获取是否使用企业key
     * @return {String} 当前可用key
     */
    const getIsUseCompanyKey = async () => {
        return axios.http.get('/msg-map-mark',{
            params:{
                action: 'gd_map_key'
            }
        }).then(res=>{
            if(res && +res.status === 0){
                const { key } = res.data;
                return key;
            }
        })
    }

    /**
     * 设置是否使用企业key
     */
    const setIsUseCompanyKey = async () => {
        return axios.http.get('/msg-map-mark',{
            params:{
                action: 'gd_invalid_key'
            }
        })
    }

    /**
     * 开启组件选点
     */
    const positionPickerStart =  () => {
        positionPicker.start();
    }

    return {
        positionPickerStart,
        initMap,
    }
}
```

组件内使用案例
```vue

<!--
  @description:  地图整合版本2.0——首页
  @author: hhd (2023-06-02)
  @update:
-->
<script setup>
import { onMounted, ref } from 'vue'
import useMapDrag from '../../AHooks/useMapDrag'


const {positionPickerStart, initMap} = useMapDrag();


onMounted( async () => {
  initMap({
        mapDocumentId: 'map-container', // 地图dom box id
        mapZoom: 17, // 地图缩放比
        location: "116.397379,39.909105",  // 地图坐标点
        isShowToolBar: true, // 是否展示地图缩放工具
        iconStyle: {
          url: 'https://staticcdn.shuidi.cn/shuidi/images/map/drag-blue-icon.png',
          size:[222,70],
          ancher:[111,70],
        }
      },
      (success)=>{
        const {
          address, // 选点地址回显
          locationAddress, // 省市区地址逗号拼接
          location, // 选点坐标回显
          cityOrProvince, // 城市或直辖市
        } = success
        console.log(success)
      },
      (fail)=>{
        console.log(fail)
      }
  )
})


const confirmLocation = () => {
  positionPickerStart();
}


</script>


<template>
  <div class="page">
    <div class="content">
      <div class="map-select-box">
        <div class="map-select">
          <div id="map-container"></div>
          <div class="drag-icon-top">
            <img style="width: 222px; height: 70px; top: -70px; left: -111px"
                 src="@guanjia/assets/imgs/map/combination/drag-blue-icon.png" alt="">
          </div>
        </div>
      </div>
      <div class="button-box-bottom">
        <div class="button-box">
          <div class="tips">位置标注后无法修改，请放大确定准确</div>
          <div class="button" @click="confirmLocation">我已确定位置，开始标注</div>
        </div>
      </div>
    </div>

  </div>
</template>
```