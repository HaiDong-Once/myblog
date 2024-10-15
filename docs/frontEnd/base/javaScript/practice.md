
# javaScript 练习
[[toc]]


### 数组求最大值
```js
    const arr =  [1, 22, 4, 9, 66, 0]
    let maxNumber = arr[0]
    for(let i = 1; i < arr.length; i++){
        if(maxNumber < arr[i]){
            maxNumber = arr[i]
        }
    }
    // console.log(maxNumber)
```

### 数组新增
```js
const arr2 = []
    arr2.push(1,3,4,5)
    // console.log(arr2)
    arr2.unshift(-1,0)  // 向前push
    // console.log(arr2)
```

### 数组筛选
```js
    const arr3 = [22, 33, 88, 93, 9, 100, 24, 55, 68]
    let newArr3 = []
    for(let i = 0; i < arr3.length; i++){
        if(arr3[i] >= 60){
            newArr3.push(arr3[i])
        }
    }
    // console.log(newArr3)
```

### 数组删除
```js
    const arr4 = [12, 23, 323, 233, 3, 2, 33]
    arr4.pop() // 删除最后一个元素
    // console.log(arr4)
    arr4.shift() // 删除第一个元素
    // console.log(arr4)
    arr4.splice(0, 2) // 删除指定元素 splice(起始位置， 删除个数）
    // console.log(arr4)
```

### 冒泡排序
```js
    /*重复的排序，比较，顺序错误就替换位置*/
    /*外层循环次数： length - 1， 内层对比次数: length - i -1*/
    const arr5 = [1, 3, 4, 9, 2, 12, 19, 22, 5, 4, 7]
    // console.log(arr5)

    // 冒泡排序每进行一轮，就能确保将当前未排序部分的最大值移动到正确的位置
    // （即每轮会有一个元素被置于其最终位置），因此总共需要进行 arr.length - 1 轮。
    for(let i = 0; i < arr5.length - 1; i++){  // 确定整个循环次数，便利多少轮
        
        // 内层的 for 循环负责在每一轮中进行实际的比较和交换操作。
	    // j 的范围从 0 到 arr.length - 1 - i。i 是当前已经排序好的元素数量，所以每一轮后，可以减少内层循环的次数。
        for(let j = 0; j < arr5.length - i - 1; j++){  // 依次对比
            if(arr5[j] > arr5[j + 1]){
                const temp = arr5[j]
                arr5[j] = arr5[j + 1]
                arr5[j + 1] = temp
            }
        }
    }
    
    // console.log(arr5)
    function bubbleSort ( arr ) {
        let temp; // 用于在数组元素交换时存储其中一个元素的值。
        for(let i = 0; i < arr.length - 1; i++){
            for(let j = 0; j < arr.length - 1 - i; j++){
                if( arr[j] > arr[j + 1]){
                    // 位置对调
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp
                }
            }
        }
        return arr
    }
 ```

 ### sort排序
 ```js
    const arr6 = [1, 3, 4, 9, 2, 12, 19, 22, 5, 4, 7]
    arr6.sort()  // 默认升序
    console.log(arr6)
    arr6.sort(function (a, b){  // 升序排序
        return a - b
    })
    console.log(arr6)
    arr6.sort(function (a, b){  // 降序排序
        return b - a
    })
    console.log(arr6)
```

### 倒计时
```js
    // 毫秒数差转化 月日时分秒
    // % 取余数的范围 余数-1 到 0直接
    function countdown () {
        const deadline = new Date('2020-6-8 00:00')
        const now = new Date()
        const timeRemainning = deadline - now;
        let day, hour, minute, second;
        if(timeRemainning < 0){ return 0}
        second = Math.floor( timeRemainning / 1000 % 60 ) // 取整
        minute = Math.floor( timeRemainning / 1000 / 60 % 60) // 取整
        hour = Math.floor( timeRemainning / 1000 / 60 / 60 % 24) // 取整
        day = Math.floor( timeRemainning  / 1000 / 60 / 60 / 24) // 取整

        console.log(`倒计时还剩：${day}天${hour}时${minute}分${second}秒`)

        // 递归
        setTimeout( countdown, 1000)
    }
```

### == 和 ===
```js
    // == 会进行类型转换
    // true == 1;  1 == 1;  true
    // false == 0; 0 == 0;  true
    // null == undefined;  true (假值）
    // null 和 undefined 不会隐式转化为其他值， 所以 null == 0; false, undefined == ''; false
    // 'false' == false;  'false' == 0;   false
    // NaN == NaN; NaN表示非数不确切值， 所以不和任何值相等包括自己

    // var a = {};
    // var b = {};
    // var c = a;
    // a == b; false  a 和 b分别新建了不同的堆内存
    // a === b; false
    // a == c; true  // a 和 c 指向同一个堆内存
    // a === c; true
```

### 调换变量的多种方法
```js
    // 临时变换法 （对内存不友好）
    let a = 3, b = 5;
    let c = b;  // 新建临时变量暂存b
    b = a;
    a = c;

    // 加减法
    a = a + b; // 总和
    b = a - b;
    a = a - b

    // 数组法
    a = [a, b];  // 存到数组中
    b = a[0];
    a = a[1];

    // 对象法
    a = {a:b, b:a};
    b = a.b;
    a = a.a

    // 数组运算符
    a = [b, b = a][0]; // 运算符优先级 b = a

    // 按位异或法
    a = a ^ b;
    b = a ^ a;
    a = a ^ b;

    // 解构赋值法
    [a, b] = [b, a]
```

### class创建内部变量合function
```js
class Bullshit {
        static welcome_tips () {
            return '温馨提示'
        }
        static welcome () {
            // 此处this绑定的事类本身
            // 静态方法需要用类调用，而不是实例调用
            const text = this.welcome_tips()
            console.log(text)
        }
        constructor(text, color) {
            this.text = text;
            this.color = color;
        }
        show() {
            console.log(this.text)
            console.log(this.color)
        }
        // 设置类的功能 set, get
        set extra (value) {
            this.value = value
            console.log(this.text + this.value)
        }
        get extra () {
             return `这是废话： ${this.text} ${this.value}`
        }
    }

    // 初始化及调用
    const bullshit = new Bullshit('我知道', '#00a1d6');
    bullshit.show();
    Bullshit.welcome(); // 静态方法直接用类调用
    bullshit.extra = '儿' // 赋值set内容
    console.log(bullshit.extra) // 输出get内容
```

### 继承class对象
```js
 /*** 继承class对象 ***/
    // class Son_of_bullshit extends Bullshit {}
    class Son_of_bullshit extends Bullshit {
        constructor(text, color, fontSize) {
            // 在子类construct里写this前一定要写super
            super(text, color); // 初始化this
            this.fontSize = fontSize;
        }

        // 方法可以直接改写
        show () {
            console.log(this.text)
            console.log(this.color)
            console.log(this.fontSize)
        }
    }
    const son_of_bullshit = new Son_of_bullshit('你知道', 'red');
    son_of_bullshit.show()
```

### 函数柯里化
```js
function uri( protocol, hostname, pathname ) {
        return `${protocol}${hostname}${pathname}`
    }
    const uri1 = uri('https://', 'www.test.com', '/dir')
    console.log( uri1 ); // https://www.test.com/dir

    // 参数复用
    function uri2( protocol ) {
        return function (hostname, pathname) {
            return `${protocol}${hostname}${pathname}`
        }
    }
    const uri_https = uri2('https://')
    console.log( uri_https ) // 返回一个函数，并且可以调用protocol0
    //     return `${protocol}${hostname}${pathname}`
    // }

    const uri3 = uri_https('wwww.test3.com', '/点赞');
    const uri4 = uri_https('wwww.test3.com', '/搜藏');
    console.log(uri3, uri4) // https://wwww.test3.com/点赞 https://wwww.test3.com/搜藏
```

### js复写promise方法
```js
class Commitment {

    static PENDING = '待定';
    static FULFILLED = '成功';
    static REJECTED = '拒绝';

    constructor(func) {
      this.status = Commitment.PENDING;
      this.result = null;
      this.resultCallBacks = [];
      this.rejectCallBacks = [];
      try {
        func(this.resolve.bind(this), this.reject.bind(this));
      } catch (error) {
        this.reject(error)
      }
    }

    resolve(result) {
      setTimeout(() => {
        if(this.status === Commitment.PENDING) {
          this.status = Commitment.FULFILLED;
          this.result = result;
          this.resultCallBacks.forEach(callback => {
            callback(result)
          })
        }
      })
    }
    reject(result) {
      setTimeout(() => {
        if(this.status === Commitment.PENDING){
          this.status = Commitment.REJECTED;
          this.result = result;
          this.rejectCallBacks.forEach(callback => {
            callback(result)
          })
        }
      })
    }

    then(onFULFILLED, onREJECTED) {
      return new Commitment((resolve, reject) => {
        onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => {};
        onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => {};
        if(this.status === Commitment.PENDING) {
          this.resultCallBacks.push(onFULFILLED)
          this.rejectCallBacks.push(onREJECTED)
        }
        if(this.status === Commitment.FULFILLED){
          setTimeout(() => {
            onFULFILLED(this.result)
          })
        }
        if(this.status === Commitment.REJECTED){
          setTimeout(() => {
            onREJECTED(this.result)
          })
        }
      })
    }
  }


  console.log('第一步')
  let commitment = new Commitment((resolve, reject) => {
    console.log('第二部')
    setTimeout(() => {
      resolve('下次一定')
      console.log('第四部')
    })
    // throw new Error('不成功')
  })
  // console.log(commitment)
  commitment.then(
          result => { console.log(result) },
          result => { console.log(result.message) }
  ).then(
          result => { console.log(result) },
          result => { console.log(result.message) }
  )
  console.log('第三部')

```

### setInterval相关问题
```js
/*** 正常使用 setInterval ***/
    setInterval(() => {
        console.log('执行代码')
    },1000)

    /*** 如果中间加入耗时任务就会导致超出1秒延时 ***/
    setInterval(() => {
         for (let i = 0; i<100000; i++){

         }
        console.log('执行代码')
    },1000)
    // 原因
    // 在执行栈中，我们每隔一秒，在任务队列中放入一个回调函数， 如果执行栈中没有其他任务，任务队列中的人物会放到执行栈中执行
    // 但是当我们在setInterval中加入一个耗时循环后，当一秒后任务队列中的回调函数要放到执行栈中时，发现还有别的任务还在执行，
    // 就需要等待for循环执行完成后再进入执行栈，这样执行时间就会大于设置间隔时间了


    /*** 使用setTimeout实现模拟setInterval ***/
    // setTimeout 是运行完一次以后，进行延迟，再触发下一个任务
    // 递归方法实现
    function newInterval(func, millisecond) {
        // func()
        // setTimeout( newInterval, millisecond );

        // 调用内部函数
        function inside() {
            func()
            setTimeout( inside, millisecond)
        }
        setTimeout(inside, millisecond) // 产生回调函数
    }

    newInterval(() => {
        console.log('执行函数')
    }, 1000)
```

### js异常捕获
```js
    window.onerror = function (message, source, lineno, colno, error) {
        console.log("捕获到异常：", { message, source, lineno, colno, error });
    };
    window.addEventListener('error', function (event){
        console.log(event)
    })

    /** 模拟报错 **/
    try {
        function openError(){
            var abc = {}
            var b = abc?.a ?? 1
            console.log(b)
        }

    }catch (err){
        console.log(err)
    }
```

### 检查屏幕刷新率