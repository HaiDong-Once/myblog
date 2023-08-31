
# Map对象
[[toc]]


## Map对象映射取代if判断

### 案例
#### 常用if判断
```ts
let type, msg;

function getStatusMapping(status) {
    if (status === '1') {
        type = 'warning';
        msg = '审核中';
    } else if (status === '2') {
        type = 'success';
        msg = '对外展示中';
    } else if (status === '3') {
        type = 'error';
        msg = '内容未通过审核，请重新编辑提交，拒绝是由: ';
    } else {
        type = null;
        msg = null; // 或者你可以赋一个默认值
    }

    return { type, msg };
}
```

#### 使用Map对象映射取代
```ts
const statusMapping = new Map([  // 创建映射审核类型
    ['1', { type: 'warning', msg: '审核中' }],
    ['2', { type: 'success', msg: '对外展示中' }],
    ['3', { type: 'error', msg: '内容未通过审核，请重新编辑提交，拒绝是由: ' }]
]);

// 使用
statusMapping.get(item.audit_status).msg
statusMapping.get(item.audit_status).type
```

### 什么是 Map？
::: tip 介绍
Map 是一种特殊的对象，它可以存储任何类型的键（包括对象和原始值）和值，而且它还记住了键值对的原始插入顺序。这是 Map 与普通对象的主要区别，因为在普通对象中，键只能是字符串或符号，而且不保证键的顺序
:::

创建一个新的 Map 对象非常简单，只需要使用 new Map() 构造函数：
```ts
let myMap = new Map();
```

使用 set 方法添加键值对：
```ts
myMap.set('name', 'Alice');
myMap.set('age', 25);
```

使用 get 方法获取键对应的值：
```ts
console.log(myMap.get('name'));  // 输出 "Alice"
console.log(myMap.get('age'));   // 输出 25
```

### Map 对象的特性
**Map 对象有一些特性和方法使它在某些情况下比普通对象更有优势：**
- 键的类型： 如前所述，Map 可以接受任何类型的键，包括函数、对象和基本类型。
- 插入顺序： Map 对象会按照键值对插入的顺序来迭代元素。
- 键值对数量： 通过 size 属性，你可以轻松获取 Map 中的键值对数量。
- 高效的查找，插入和删除操作： Map 对象在处理大量数据时，查找，插入和删除操作比普通对象更高效。


### Map 属性和方法
| 属性/方法                  | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ |
| new Map()                 | 创建一个新的空 Map                                           |
| map.set(key, value)       | 在 Map 中设置一个键值对，如果键已存在则更新其对应的值         |
| map.get(key)              | 返回与键关联的值，如果键不存在则返回 undefined               |
| map.has(key)              | 如果键存在则返回 true，否则返回 false                       |
| map.delete(key)           | 删除与键关联的键值对，如果键存在则返回 true，否则返回 false  |
| map.clear()               | 删除 Map 中的所有键值对                                       |
| map.size                  | 返回 Map 中的键值对数量                                       |
| map.keys()                | 返回一个新的 Iterator 对象，它包含 Map 中每个元素的键         |
| map.values()              | 返回一个新的 Iterator 对象，它包含 Map 中每个元素的值         |
| map.entries()             | 返回一个新的 Iterator 对象，它包含 Map 中每个元素的 [key, value] 对 |
| map.forEach(callbackFn)   | 对 Map 中的每个元素执行指定的函数                             |


### Map 的应用场景
**Map 对象在许多编程场景中都非常有用。以下是一些常见的使用场景：**
1. 数据缓存： Map 可以用作缓存，将结果存储在键值对中，以便以后可以快速访问。
```ts
let cache = new Map();

function getCachedResult(key, computeResult) {
    if (cache.has(key)) {
        return cache.get(key);
    } else {
        let result = computeResult();
        cache.set(key, result);
        return result;
    }
}

// 使用示例
let result = getCachedResult('myKey', () => {
    // 这里是一个耗时的计算或者请求
    return 'myResult';
});
```

2. 频率计数： 如果你需要跟踪特定项（例如，一个字符串列表中的单词）出现的频率，Map 是一个很好的选择。
```ts
let words = ['apple', 'banana', 'apple', 'orange', 'banana', 'banana'];
let frequency = new Map();

for (let word of words) {
    if (frequency.has(word)) {
        frequency.set(word, frequency.get(word) + 1);
    } else {
        frequency.set(word, 1);
    }
}

console.log([...frequency]);  
// 输出 [["apple", 2], ["banana", 3], ["orange", 1]
```

3. 数据库查询： 当从数据库获取数据时，你可以将结果存储在 Map 中，然后可以快速查找特定的键（即数据库的主键）。
```ts
// 假设我们从数据库获取了以下数据
let rows = [
    {id: 1, name: 'Alice'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Charlie'},
];

let database = new Map();

for (let row of rows) {
    database.set(row.id, row);
}

// 现在我们可以快速查找具有特定 ID 的行
console.log(database.get(2));  // 输出 {id: 2, name: 'Bob'}
```

4. 元数据关联： 当你需要关联一些元数据（例如，关联对象和事件处理程序），Map 是非常有用的。
```ts
// 关联对象
let userMetadata = new Map();

userMetadata.set('Alice', { age: 25, occupation: 'Engineer', city: 'San Francisco' });
userMetadata.set('Bob', { age: 30, occupation: 'Designer', city: 'New York' });
userMetadata.set('Charlie', { age: 35, occupation: 'Teacher', city: 'Chicago' });

// 通过键获取值
console.log(userMetadata.get('Alice')); 
// 输出: { age: 25, occupation: 'Engineer', city: 'San Francisco' }


//关联事件
let userMetadata = new Map();

userMetadata.set('Alice', {
  age: 25, 
  occupation: 'Engineer', 
  city: 'San Francisco', 
  onLogin: function() { console.log('Alice has logged in.'); }
});

userMetadata.set('Bob', {
  age: 30, 
  occupation: 'Designer', 
  city: 'New York', 
  onLogin: function() { console.log('Bob has logged in.'); }
});

// 假设 Alice 登录了
userMetadata.get('Alice').onLogin(); // 输出: Alice has logged in.
```