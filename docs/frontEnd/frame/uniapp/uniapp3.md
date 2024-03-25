

# uniapp ucharts使用案例
[[toc]]


## 介绍
uCharts是一款基于 canvas API 开发的适用于所有前端应用的图表库，开发者编写一套代码，可运行到 Web、iOS、Android（基于 uni-app / taro ）、
以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝/京东/360）、快应用等更多支持 canvas API 的平台。<br>

地址：[https://www.ucharts.cn/v2/#/](https://www.ucharts.cn/v2/#/)

## 使用案例
### 引入组件
```js
import qiunDataCharts from '@/pagesA/components/qiun/qiun-data-charts.vue'
components: {
  qiunDataCharts,
},
```

### 使用组件
```html
<div class="trend-chart-box" v-show="!showDialog2 && !showDialog">
  <qiun-data-charts
      v-if="companyInfo.user_manage_company_status+'' === '1'"
      type="line"
      :opts="opts"
      :chartData="chartData"/>
  <img mode="widthFix" v-else class="visitor-charts-bg"
       :src="buildStatic('/company_detail/visitorData/echats-bg.png')"
       alt="img"/>
  <div class="invisible-box" v-if="companyInfo.user_manage_company_status+'' === '2'">
    <img mode="widthFix" class="img"
         :src="buildStatic('/company_detail/visitorData/manage-right-icon.png')"
         alt="img"/>
    <div class="text">当前企业管理人员可见</div>
  </div>
  <div class="invisible-box" v-if="companyInfo.user_manage_company_status+'' === '3'">
    <div class="blue-button" @click="toOtherPage('访问趋势')">
      查看{{companyInfo.company_name | truncate}} 访问趋势
    </div>
  </div>
</div>
```

### 配置参数：
```js
chartData: {}, // 趋势图数据
opts: {  // 趋势图配置文件
  color: ["#3c81f9"],
  padding: [0,0,0,0],
  enableScroll: false,
  fontSize: '12',
  fontColor: "#3c81f9",
  xAxis: {
    disableGrid: true,
    axisLineColor: '#f3f5fb',
    fontColor:'#999999'
  },
  yAxis: {
    gridType: "dash",
    gridColor: "#f3f5fb",
    showTitle: false,
    splitNumber: 5,
    dashLength: 2,
    disabled: true, // 关闭Y轴渲染
    data:[
      {
        min:0,
        max:1000,
      }
    ]
  },
  legend: {
    show: false, // 关闭指示说明
  },
  extra: {
    line: {
      type: "straight",
      width: 2,
      activeType: "hollow"
    }
  },
  series:{
    textColor: '#327bf9',
  }
},

/**
 * 处理趋势图数据
 */
getServerData(company_trend) {
  // 默认趋势图
  let res = {
    categories: [],
    series: [
      {
        name: "分数",
        data: []
      }
    ]
  };
  // 接口数据转换
  if(company_trend && company_trend.length > 0){
    company_trend.forEach(item => {
      let month = item.month;
      let visit_index = parseInt(item.visit_index);
      let formattedMonth = `${month.slice(0, 4)}/${month.slice(4)}`;
      res.categories.push(formattedMonth);
      if(visit_index){
        res.series[0].data.push(Number(visit_index));
      }
    });
  }
  this.chartData = JSON.parse(JSON.stringify(res));
},
```