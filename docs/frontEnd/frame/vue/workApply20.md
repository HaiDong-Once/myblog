

# vue computed计算属性传参取值
::: tip 说明：
- 给 computed 值 return 一个可传参函数
- 注：这种方法不可以传参空值用else取值，会报错
  :::

### 实现
```ts
computed: {
  /**
   * 获取当前年月日（2022年6月24日）
   * @returns {function(*): string}
   * @使用说明 getTimeNow(type) all:完整日期, year:年, month:月, date:日 
   * lastDate：当月最后一天
   */
  getTimeNow(){
    return function (type){
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const date = now.getDate() >= 10 ? now.getDate() : ('0' + now.getDate());
      if(type === 'all'){
        return +year + "年" + (month + 1) + "月" + date + "日 "
      }else if(type === 'year'){
        return year + ''
      }else if(type === 'month'){
        return (month + 1)  + ''
      }else if(type === 'date'){
        return date + ''
      }else if(type === 'lastDate'){
        const date1 = new Date(year, month, 0)
        return date1.getDate()
      }
    }
  },
},
```

### 使用方法
```html
<div class="head-tips">截止日期 {{getTimeNow('month')}}月{{getTimeNow('lastDate')}}日 </div>
```
