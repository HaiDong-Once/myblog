
# vue 地图选点 hooks 封装实践



## hoos代码实现
```ts

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
          if(positionResult.match(/**************/)){
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


## 使用
```ts
<!--
  @description:  地图整合版本2.0——首页
  @author: hhd (2023-06-02)
  @update:
-->

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

```