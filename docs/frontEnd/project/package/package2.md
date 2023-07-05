
# npm包发布
[[toc]]


## 注册npm账号
地址：[www.npmjs.com/signup](www.npmjs.com/signup)

## 切换npm源为境外源
```shell
// 境外源
npm config set registry https://registry.npmjs.org/
```

## 项目初始化，配置npm包信息
```shell
npm init
```

配置信息参考：
```json
{
  "name": "ddd-monitor-sdk",
  "version": "1.0.9",
  "description": "配置js兼容性 chrome58, ie11",
  "main": "dist/ddd-monitor-sdk.min.js",
  "keywords": [
    "前端",
    "前端监控",
    "Front-end",
    "monitor",
    "SDK",
    "ddd"
  ],
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "publish": "npm publish",
    "test": "jest",
    "test1": "jest --runInBand --debug"
  },
  "author": "hhd",
  "files": [
    "dist"
  ],
  "license": "ISC",
  "dependencies": {
    "@babel/core": "^7.21.4",
    "@babel/preset-env": "^7.21.4",
    "babel-loader": "^9.1.2",
    "core-js": "3",
    "user-agent": "^1.0.4",
    "webpack": "^5.79.0",
    "webpack-cli": "^5.0.1"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0"
  }
}
```

基本目录结构：
```
└── my_first_npm
    ├── README.md
    ├── index.js
    └── package.json
```

## 项目中登录, 
输入账号，密码，邮箱，邮箱验证码
```shell
npm login
```

## 新增一个新的版本号，发布包
```shell
npm publish
```