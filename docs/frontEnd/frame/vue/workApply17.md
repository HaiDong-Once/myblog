

# dev环境调试跨域问题解决

### 配置devServer
- vue.config.js
```ts
devServer: {
    // 接口前缀
    proxy: ['/debt-treatment','owner_danger_new','annual-reports']
    .reduce((proxy, item) => {
        proxy[item] = {
            target: 'http://shuidi.test.pingansec.com',
            ws: true,
            changeOrigin: true,
            pathRewrite:{
            }
        }
        return proxy
    }, {}),
    overlay: {
        warnings: false,
        errors: false
    },
},
```
- 根目录配置vue.config.js 说明
```ts
module.exports = {
  devServer: {
   // 代理配置
    proxy: {
        // 这里的api 表示如果我们的请求地址有/api的时候,就出触发代理机制
        // localhost:8888/api/abc  => 代理给另一个服务器
        // 本地的前端  =》 本地的后端  =》 代理我们向另一个服务器发请求 （行得通）
        // 本地的前端  =》 另外一个服务器发请求 （跨域 行不通）
        '/api': {
        target: 'www.baidu.com', // 我们要代理的地址---你的跨域服务器地址
        changeOrigin: true, // 是否跨域 需要设置此值为true 才可以让本地服务代理我们发出请求
         // 路径重写
        pathRewrite: {
            // 重新路由  localhost:8888/api/login  => www.baidu.com/api/login
            // 把api替换为空字符
            '^/api': '' // 假设我们想把 localhost:8888/api/login 变成www.baidu.com/login 就需要这么做 
        }
      },
    }
  }
}
```

- 其他方法 [https://blog.51cto.com/u_15760318/5608153](https://blog.51cto.com/u_15760318/5608153  )

