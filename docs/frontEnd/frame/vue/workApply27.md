
# 使用eventBus通知组件更新
[[toc]]

**模式：（订阅发布模式）**<br>
**注：uniapp 中可以使用 uni.$emit   uni.$on 替代**

## 使用案例
```js
/**
 * util.js创建组件vue实例
 * EventBus组件通信
 */
export const EventBus = new Vue();


// 父组件：发布订阅
import { EventBus } from "@/public/util";
onshow(){
    EventBus.$emit('detailOnShow', '详情页onshow更新数据');
}

// 子组件：接收消息
import { EventBus } from "@/public/util";
mounted() {
  this.getCompanyInfo(this.digest)
  EventBus.$on('detailOnShow', (message) => {
    this.getCompanyInfo(this.digest)
  });
},
```
