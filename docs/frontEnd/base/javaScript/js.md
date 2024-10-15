

# javaScript 应用
[[toc]]


## 防抖节流

### 防抖函数
::: tip 介绍
- 特点：延迟执行
- debounce 函数返回一个可执行函数。这个可执行函数的作用域链上保存了定时器变量。
- 当重复执行的时候，会先清空掉上次生成的定时器，从而实现延迟执行的效果
- 举例：电梯门感应，打开电梯有人进入，电梯门设置定时器，若10秒内没有人再进入，就关闭门，若有人再次进入则重新进入10秒倒计时；
:::

```ts
debounce(func, wait) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  }
}
```

#### return function()作用
1. **延迟执行**：
  - 函数返回另一个函数时，返回的函数不会立即执行，而是可以在需要时再执行。这允许你定义函数行为的同时，不立即调用它，只有当条件满足时再执行。
2. **形成闭包**：
  - 返回的函数可以形成闭包，也就是说，这个函数可以访问创建它时的作用域中的变量和状态。闭包允许函数在定义的作用域之外，仍然能保持对该作用域中变量的访问。
3. **参数预先绑定（柯里化）**：
  - 通过返回一个函数，你可以预先绑定部分参数，允许你构建更加灵活和复用性强的函数（类似于柯里化）。
4. **控制函数调用时机**：
  - 返回的函数通常用于事件监听器、回调函数、异步操作等场景，使你能够精准控制函数的调用时机和行为。

#### return function()优点
1. **避免立即执行**：
- 返回的函数不会立即执行，而是等待条件满足时再执行，这可以避免不必要的函数调用。
- 示例：
```js
function sayHello() {
  return function() {
    console.log('Hello, World!');
  };
}
const greet = sayHello();
greet();  // 输出: "Hello, World!"
```
2. **闭包的好处**：
- 返回的函数可以访问创建它时的作用域中的变量和状态，这可以用于保存状态、缓存结果等场景。
- 示例：
```js
function counter() {
  let count = 0;
  return function() {
    count++;
    console.log(count);
  };
}
const increment = counter();
increment();  // 输出: 1
increment();  // 输出: 2
```
3. **增强复用性（柯里化）**：
- 返回的函数可以动态生成不同的行为，预先绑定部分参数，从而创建更加灵活和复用性强的函数。
- 示例：
```js
function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = multiplyBy(2);
console.log(double(5));  // 输出: 10
```
4. **减少全局变量的使用**：
- 返回的函数可以避免直接使用全局变量，从而减少全局作用域的污染和潜在的错误。这在复杂项目中有助于避免变量冲突和命名空间污染。

#### 函数柯里化
::: tip 定义：
- **柯里化（Currying）** 是指将一个接收多个参数的函数转换为多个接收单个参数的函数链式调用的技术。
每次调用返回一个新函数，等待下一个参数，直到所有参数被传递，最终返回结果。
:::
1. 简单实现
```js
function curry(fn) {
  return function curried(...args) {
    // 如果传入的参数数量大于等于原函数所需的参数数量
    if (args.length >= fn.length) {
      return fn.apply(this, args); // 立即执行原函数
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs)); // 否则返回一个新函数，接收剩余参数
      }
    }
  };
}
```
2. 示例
```js
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// 可以逐个传递参数
console.log(curriedAdd(1)(2)(3)); // 输出: 6

// 也可以一次性传递所有参数
console.log(curriedAdd(1, 2, 3)); // 输出: 6

// 或者传递部分参数
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
console.log(addOneAndTwo(3)); // 输出: 6
```
3. 应用场景
- **参数复用**：柯里化可以用于创建具有固定参数的函数，从而减少重复代码。
- **延迟计算**：柯里化可以用于延迟计算，直到所有参数都被传递。
- **函数组合**：柯里化可以用于创建函数组合，将多个函数组合成一个函数。
- **函数缓存**：柯里化可以用于创建缓存函数，从而提高性能。
```js
// API请求配置
function fetchWithConfig(method) {
  return function(url) {
    return function(body) {
      return fetch(url, { method: method, body: JSON.stringify(body) });
    };
  };
}

const post = fetchWithConfig('POST');
const postToAPI = post('https://api.example.com/data');

postToAPI({ key: 'value' }).then(response => console.log('Posted successfully!'));


// 条件逻辑工厂
function discountCalculator(discount) {
  return function(price) {
    return price - (price * discount);
  };
}

const tenPercentDiscount = discountCalculator(0.1);
const twentyPercentDiscount = discountCalculator(0.2);

console.log(tenPercentDiscount(100));  // Outputs: 90
console.log(twentyPercentDiscount(100));  // Outputs: 80


// 组件配置
const ButtonWithColor = color => Component => props => (
        <Component {...props} style={{ color: color }} />
);

const RedButton = ButtonWithColor('red')(Button);
const GreenButton = ButtonWithColor('green')(Button);

// Use in JSX
<RedButton onClick={() => console.log("Clicked red button")} />
<GreenButton onClick={() => console.log("Clicked green button")} />
```


### 节流函数
::: tip 介绍
- 特点：确保给定时间间隔内只能执行一次，限制最小执行间隔时间，减少高频调用
- 原理与 防抖函数相同，通过 closure 存储上次执行的时间戳，
- 当前时间戳和之前的时间戳相比较，如果超过约定时间，则执行一次函数。
- 举例：鲸鱼每隔30分钟，上浮唤气一次，或者给某人发消息，某人只每天恢复一条
:::

```ts
 throttle(func, interval) {
  let lastTimeStamp = 0;
  return function () {
    let curDate = Date.now();
    const diff = curDate - lastTimeStamp;
    if (diff > interval) {
      func.apply(this, arguments);
      lastTimeStamp = curDate;
    }
  };
}
```

### requestAnimationFrame 防抖
- 由于RAF本身的机制，在使用RAF进行防抖时，我们需要记录上一次RAF回调函数的时间戳，
- 然后在下一次RAF回调时检查当前时间戳是否大于某个特定的时间间隔，从而确定是否执行回调函数。
- 这样会导致RAF的回调函数执行频率并不稳定，而是随着浏览器的渲染帧率而变化，这对于防抖并不是非常合适。

### requestAnimationFrame 节流
- RAF 会尽量以每秒60帧的频率执行回调函数，以确保最佳性能和流畅度。
- 使用RAF做节流，可以在不阻塞UI线程的情况下限制函数调用的频率，以提高页面的性能和响应速度。
- 也可以自适应浏览器的帧率。如果浏览器的帧率下降，RAF的频率也会相应下降，这样可以避免浪费过多的 CPU 时间和电量
- 确保 func 在下一次浏览器重绘前执行，每一帧只能执行一次，可以避免跳帧或性能瓶颈
```ts
/**
 * 默认浏览器刷新率执行函数，
 * @param func
 * @returns {(function(...[*]): void)|*}
 */
rafThrottle(func) {
  let lock = false;
  return function (...args) {
    if (lock) return;
    lock = true;
    window.requestAnimationFrame(() => {
      func.apply(this, args);
      lock = false;
    });
  };
}
```


## promise.all

::: tip 作用:
  获取多个接口回调状态
:::

```ts
/**
 * 请求首页数据
 */
async getData(){
    this.setData({ loading: true })
    let p1 = this.getHomeData()
    let p2 = this.getCompanyCredit()
    let p3 = this.getCreditArchive()
    let p4 = await this.getCompanyData()
    let p5 = this.getLicenseInfo()
    Promise.all([p1,p2,p3,p4,p5]).then(()=>{
        
    }).catch(reason => {
      console.log(reason)
    }).finally(() => {
      this.setData({ loading: false })
    })
},


/**
 * home接口
 */
getHomeData(){
    return api.home().then( res => {
        if(res && res.status == 0){
            this.setData({ 
                datas: res.data
            })
        }
    })
},
```



## 赋值、浅拷贝、深拷贝
::: tip 说明:
- 赋值：赋值只是将对象的引用复制给一个新的变量，不会创建新对象；
- 浅拷贝**创建一个新对象**，但只拷贝对象的**最外层属性**。这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，
**如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。**
- 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且**修改新对象不会影响原对象。**
- 总而言之，浅拷贝只复制指向某个对象的指针，而不复制对象本身，**新旧对象还是共享同一块内存。**
但深拷贝会另外创造一个一模一样的对象，**新对象跟原对象不共享内存**，修改新对象不会改到原对象。
:::


| 类型      | 是否创建新对象 | 修改新对象是否影响原对象 | 适用场景                                       |
|----------|---------------|-------------------------|------------------------------------------------|
| **赋值**   | 否             | 会影响                   | 简单的引用传递场景，通常不用于数据处理           |
| **浅拷贝** | 是             | 嵌套对象会影响            | 当只需要复制对象的最外层，且嵌套对象无需修改时   |
| **深拷贝** | 是             | 不会影响                 | 当需要完整独立的对象副本，并处理复杂嵌套结构时   |


```ts
// 赋值
let obj1 = { a: 1, b: 2 };
let obj2 = obj1;  // obj2 和 obj1 都指向同一个对象
obj2.a = 10;
console.log(obj1.a);  // 输出 10，因为 obj1 和 obj2 是同一个对象

// 浅拷贝
let obj1 = { a: 1, b: { c: 2 } };
let obj2 = { ...obj1 };
obj2.a = 10;
console.log(obj1.a);  // 输出 1，最外层已拷贝
obj2.b.c = 20;
console.log(obj1.b.c);  // 输出 20，嵌套对象仍共享引用

// 深拷贝
// 深拷贝方法a3.b.c === a1.b.c // false 新对象跟原对象不共享内存
var a3 = deepClone(a3); 
```

![图片](/images/frontEnd/js/img.png)


### 浅拷贝的方案
#### 1、Array.prototype.concat(),   Array.prototype.slice()
- 使用`concat,slice()`合并数组，会返回一个新的数组。

```ts
let arr = [1, 3, {    username: 'kobe'    }];
let arr2 = arr.concat();    
arr2[2].username = 'wade';
console.log(arr); 
//[ 1, 3, { username: 'wade' } ]

let arr = [1, 3, {    username: ' kobe'    }];
let arr3 = arr.slice();
arr3[2].username = 'wade'console.log(arr); 
// [ 1, 3, { username: 'wade' } ]
```

#### 2、展开运算符
- 展开运算符是一个 `es6 / es2015`特性，它提供了一种非常方便的方式来执行浅拷贝，这与 `Object.assign ()`的功能相同。

```ts
let obj1 = { name: 'Kobe', address:{x:100,y:100}}
let obj2= {... obj1}obj1.address.x = 200;
obj1.name = 'wade'console.log('obj2',obj2)
// obj2 { name: 'Kobe', address: { x: 200, y: 100 } }
```

#### 3、Object.assign(target, source1, source2)
- es6新增的方法，可用于对象合并，将源对象的所有可枚举属性，复制到目标对象上。

```ts
var data = {
  a: "123",
  b: 123,
  c: true,
  d: [43, 2],
  e: undefined,
  f: null,
  g: function() {    console.log("g");  },
  h: new Set([3, 2, null]),
  i: Symbol("fsd"),
  k: new Map([    ["name", "张三"],    ["title", "Author"]  ])
};

var newData = Object.assign({},data)
console.log(newData)  
```

- 注释：如果源目标对象中某个属性值是对另一个对象的引用，那么这个属性的拷贝仍然是对引用的拷贝。

```ts
var test = {  name: '张三' }
var data = { 
              a: 123,
              b: test
            }
var newData = Object.assign({},data)
console.log(newData) 
// {  a: 123,  b: {    name: '张三'  }}
test.age = 18
console.log(newData)
// {  a: 123,  b: {    name: '张三',   age: 18  }}
```

#### 4、通过for in实现
```ts
function deepCopy1(obj) {
  let o = {}
  for(let key in obj) {
    o[key] = obj[key]
  }
  return o
}
 
let obj = {
  a:1,
  b: undefined,
  c:function() {},
}
console.log(deepCopy1(obj))
```

### 深拷贝
::: tip 定义：
改变新的数组（对象）的时候，不改变原数组（对象）
:::

#### JSON.parse(   JSON.stringify()   ) 序列化和反序列
- 循环引用：`JSON.stringify()` 的对象中如果有循环引用会抛出异常 `Converting circular structure to JSON`。
- 其他数据类型：`JSON.stringify()` 无法拷贝 `Map、Set、RegExp` 这些特殊数据类型。
- 函数：`JSON.stringify()` 会默认移除函数。`undefined、function、symbol`非安全值过滤

- **所以使用JSON序列化这种方式时，要注意避免包含上述那几种数据类型**

```ts
// 测试
var test = {  name: "test"};
var test2 = JSON.parse(   JSON.stringify(test)  )

// 方法封装
function deepCopy(obj){ 
   if(typeof obj === 'function'){   
     throw new TypeError('请传入正确的数据类型格式')
    }
    try {
        let data = JSON.stringify(obj)
        let newData = JSON.parse(data)
        return newData
     } catch(e) {
      console.log(e)
      }
}
```

#### 2、递归方法
```ts
function deepClone1(obj) {
  // 判断拷贝的要进行深拷贝的是数组还是对象，
  // 是数组的话进行数组拷贝，对象的话进行对象拷贝
  var objClone = Array.isArray(obj) ? [] : {};
  //进行深拷贝的不能为空，并且是对象或者是
  if (obj && typeof obj === "object") {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone1(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}  
```

#### 3、structuredClone  API实现（性能更好），兼容性未完全开放
- 现在，`structuredClone API` 已经成为了一个 `HTML` 规范中的标准提案，用它可以轻松实现一个深拷贝，
并且也默认解决了循环引用等问题、支持了很多默认的数据类型。性能更好

::: tip 缺点：
- 原型：无法拷贝对象的原型链。
- 函数：无法拷贝函数。
- 不可克隆：并没有支持所有类型的拷贝，比如 `Error`。
:::

```ts
const original = { name: "MDN" };
original.itself = original;

// Clone it
const clone = structuredClone(original);

console.assert(clone !== original); // the objects are not the same (not same identity)
console.assert(clone.name === "MDN"); // they do have the same values
console.assert(clone.itself === clone); // and the circular reference is preserved

```

### 遇到的相关问题
#### 1、涉及问题 (全局对象拷贝操作影响原对象数据)
```ts
// globalMarketParams：{ app.global全局对象
//    open_type: 7,
//    product_type: 77,
// }
// 原方法
let params = this.globalMarketParams;
params.open_type = '';
params.product_type = '';
// this.globalMarketParams 里 open_type, product_type,也为空了

// 使用JSON转换实现深拷贝
let params = JSON.stringify(this.globalMarketParams);
params = JSON.parse(params)
params.open_type = '';
params.product_type = '';
// this.globalMarketParams 内值不变
```

#### 2、原因分析
```ts
var a = {name:'张三'};
var b = a;
// a,b都引用了同一个堆空间， 及a和b共享同一对象
// 修改a或b, a和b引用的堆空间值都会修改；
```

![图片](/images/frontEnd/js/img_1.png)


## 监听元素滚动事件及滚动位置距离

### 滚动事件监听
- 原生监听滚动事件：
```js
// 监听页面滚动
window.addEventListener('scroll', function(e) {
    // dosomething
});

// 使用 requestAnimationFrame 节流
let ticking = false;
window.addEventListener('scroll', function(e) {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      // dosomething
      ticking = false;
    });
    ticking = true;
  }
});
```

- vue监听滚动事件：
```html
<div @scroll="scroll"  // 滚动事件
     @scroll.once="scroll2"  // 开始滚动
     ref="resListRef">
</div>
```

### 滚动位置
```js
// 原生获取位置
window.addEventListener('scroll', function(e) {
    e.target.scrollTop
});
document.querySelector("#scroller").scrollTop

// vue
// <div ref="resListRef"></div>
let toTop = this.$refs.resListRef.scrollTop;
```

- `Element.scrollHeight`：元素内容高度
- `Element.scrollLeft`：读取或设置元素滚动条到元素左边的距离
- `Element.scrollTop`：获取或设置一个元素的内容垂直滚动的像素数
- `Element.scrollWidth`：只读属性是元素内容宽度

### onscrollend 新属性
- 目前仅火狐支持：

![图片](/images/frontEnd/js/img_2.png)

```js
this.$refs.scrollfather.onscrollend = function() {
  console.log("scrolling");
};
```


## js截取指定字符串前后的字符
```js
// 截取指定字符串前的字符
item.url = item.url.split('jpg')[0] + 'jpg';

// 截取指定字符串后的字符
item.url = item.url.split('/img/')[1];

// js判断是否包含字符串 png
item.url.match(RegExp(/png/))
```


## 浏览器内点击平滑滚动到指定位置
```ts
toConfirm(){
  window.scrollTo({
    top: this.$refs.cardBottom.getBoundingClientRect().top + window.scrollY,
    behavior: "smooth" // 平滑滚动
  });
}
```

## 数组操作：多条件过滤数组 filter+includes
```ts
let pois = [
    {type:'',id:1},
    {type:'餐饮服务;餐饮相关场所;餐饮相关',id:2},
]
const data = [
  "餐饮服务;餐饮相关场所;餐饮相关",
  "餐饮服务;快餐厅;快餐厅",
  "餐饮服务;中餐厅;中餐厅",
  "公司企业;公司;公司",
];
pois = pois.filter((item) => !data.includes(item.type) )
console.log(pois) // pois = [ {type:'',id:1} ]
```

## 判断对象内属性是否都为空
```ts
/**
 * 对象内的属性是否为空
 * @param obj
 * @return {boolean}
 */
function isEmpty(obj) {
    return Object.values(obj).every(x => [null, undefined, ''].includes(x));
}
```

## 判断数组是否为空
```ts
let address =[1,2,3]
Array.isArray(address)
```

## 嵌套解构对象
```ts
const { public: { apiBase } } = useRuntimeConfig();
```

## 将一维数组分割二位数组
```js
  /**
   * 将数组分割二位数组
   * @param arr 一维数组
   * @param groupSize 每组个数
   * @return [[]] 二位数组
   */
  const splitArrayIntoGroups = (arr, groupSize) => {
    return Array.from({ length: Math.ceil(arr.length / groupSize) }, (_, index) =>
        arr.slice(index * groupSize, index * groupSize + groupSize)
    );
  };
```

## 检测弹窗与某div是否重叠
防止弹窗与底部黑色footer模块重叠，影响用户可见性
```js
/**
 * 弹窗是否与footer重叠，重叠主动上调位置
 * @param element
 * @param className
 */
const checkAndSetBottomOnScroll = (element, className) => {
    if(!element || !className) return;
    // 获取元素左下角坐标
    const rect = element.getBoundingClientRect();
    const x = rect.left;
    const y = rect.bottom;

    // 获取左下角下方的所有元素
    const elementsBelow = document.elementsFromPoint(x, y);

    // 检查是否有包含class的元素
    const hasClass = elementsBelow.some(el => el.classList.contains(className));
    if (hasClass) {
        element.style.bottom = '400px';
    }
}
```