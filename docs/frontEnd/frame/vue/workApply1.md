


# vue router back 传参

### 方案一、利用eventBus非父子组件通信传参
#### 1、声明一个 空的Vue模
```ts
import Vue from 'vue';
// 定义空的vue实例
var goBackEntity = new Vue({});
export default goBackEntity;
```

#### 2、传参页面
```ts
import eventBus from '../../utils/goBackEntity.js';
 
goBack(value){
  eventBus.$emit('id',value);
  this.$router.go(-1);
}
```

#### 3、接收页面
```ts
import eventBus from '../../utils/goBackEntity.js';
 
 activated(){
  goBackEntity.$on('id', function(data){
    console.log(data,"data");
  }.bind(this));
}
```

### 方案二、钩子函数 beforeRouteLeave (to, from, next)
- 方法beforeRouteLeave离开路由之前执行的函数。to:router 即将要进入的路由对象 ,
  from:router  当前导航正要离开的路由,next()进行管道中的下一个钩子,要确保调用next方法，否则钩子不会被resolved

#### 跳转前拿到上一页路由传参
```ts
 beforeRouteLeave (to, from, next) {
      if (to.name === 'home') {
        to.query.temp = '这里是参数，选中后的地址'
      }
      console.log(to)
      console.log(from)
      next()
  },
```

#### 在home页面的mouted接收参数
```ts
mouted：{
    this.$route.query.temp
}
```

### 方案三、使用replace跳转
- 它的作用类似于 router.push，唯一不同的是，它在导航时不会向 history 添加新记录，正如它的名字所暗示的那样——它取代了当前的条目。
- 也可以直接在传递给 router.push 的 routeLocation 中增加一个属性 replace: true
```ts
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ 
    path: '/home',
    query: {}
})
```

### 方案四、使用vuex全局状态