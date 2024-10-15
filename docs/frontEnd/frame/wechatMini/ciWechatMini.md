

# 微信小程序ci发布
[[toc]]


## 前言
因小程序项目使用了wxs作为配置静态文件环境变量，wxs不可以与与js交互，也就获取不到当前环境变量，所以导致静态资源的环境变量需要手动切换，容易引起线上事故。
梳理了解决方案：
1. wxs配置文件git远程禁止修改（服务端配置）
2. 使用小程序ci命令打包上传代码
3. 上传代码前使用`simle-git`检查当前代码中git是否有变更，防止本地忘记恢复配置文件
4. 配置小程序ci命令预览生成体验码，提高开发效率（因为小程序开发工具又卡有慢）
5. 后期可实现`gitlab ci/cd`持续集成发布，无需手动上传
6. 使用js配置静态资源环境变量取代wxs配置，自动判断当前环境（后续开发使用）


## 小程序上传代码配置
**支持能力**
- 上传前检查本地代码是否有变更
- node命令输入版本号，小程序说明
- 默认版本号使用大版本号+日期拼接

**配置文件**
```js
// upload.js
const ci = require('miniprogram-ci')
const simpleGit = require('simple-git');
const git = simpleGit();
const readline = require('readline');

/**
 * 创建node输入语句
 * @param prompt
 * @return {Promise<unknown>}
 */
function askQuestion(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}


/**
 * 默认版本号（日期拼接）
 */
function generateVersionNumber() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    return `${year}${month}${day}${hours}`;
}


/**
 * 获取node输入版本号，描述
 * @return {Promise<unknown>}
 */
async function askMultipleQuestions() {
    return new Promise(async (resolve) => {
        let param = {
            version: '1.0.' + generateVersionNumber(),
            desc: '小程序新版本发布'
        }

        const askQuestion1 = await askQuestion('请输入小程序发布版本? ')
        param.version = askQuestion1 ? askQuestion1 : param.version;
        console.log(`小程序发布版本号: ${param.version}`);

        const askQuestion2 = await askQuestion('请输入小程序发布描述? ')
        param.desc = askQuestion2 ? askQuestion2 : param.desc;
        console.log(`小程序发布描述: ${param.desc}`);

        resolve(param)
    })
}


/**
 * 检查配置文件是否有本地变更
 * @return {Promise<void>}
 */
async function checkConfigGit() {
    return new Promise(resolve => {
        git.status( async (err, statusSummary) => {
            if (err) {
                console.error(err);
                return;
            }

            const targetFile = 'app.wxs'; // 判断app.wxs是否有变更
            const { modified } = statusSummary;

            if (modified.includes(targetFile)) {
                console.log(
                    `############## error: ${targetFile} 文件有变更，请还原app.wxs文件 #############`
                );
            } else {
                resolve('允许上传')
            }
        });
    })
}


/**
 * 上传小程序代码
 * @param param
 */
async function uploadCode(param) {
    const {version, desc} = param
    console.log('########### 正在发布小程序 ############')
    //  创建项目对象
    const project = new ci.Project({
        appid: 'wx965fd8d56c96e8de', // 小程序的 appid
        type: 'miniProgram', // 项目的类型
        projectPath: './', // 小程序项目代码文件根目录路径
        privateKeyPath: './private.key',  // 对应小程序的秘钥文件路径
        ignores: ['node_modules/**/*'],  // 需要忽略的目录
    })
    // 执行传动作
    const uploadResult = await ci.upload({
        project,
        robot: 1, // ci机器人编号1-30内
        version: version, // 小程序版本
        desc: desc, // 小程序描述
        setting: {
            es6: true, // 开启es5转es6
        },
        onProgressUpdate: console.log,
    })
    // 打印上传结果
    console.log(uploadResult)
}


/**
 * 执行上传任务
 */
askMultipleQuestions().then(async (param) => {
    const gitCheckStatus = await checkConfigGit()
    if(gitCheckStatus === '允许上传'){
        await uploadCode(param)
    }
});
```


## 配置小程序预览生成二维码文件
扩展：生成二维码后，调用接口，自动上传并发送到钉钉群
```js
// preview.js
const ci = require('miniprogram-ci');
(async () => {
    //  创建项目对象
    console.log('########### 正在创建小程序预览二维码 ############')
    const project = new ci.Project({
        appid: 'wx965fd8d56c96e8de',
        type: 'miniProgram',
        projectPath: './',
        privateKeyPath: './private.key',
        ignores: ['node_modules/**/*'],
    })
    // 执行传动作
    const previewResult  = await ci.preview({
        project,
        desc: '小程序预览版',
        setting: {
            es6: true,
        },
        qrcodeFormat: 'image', // 返回预览二维码文件的格式
        qrcodeOutputDest: './.output/qrcodePreview.jpg', // 二维码文件保存路径
        pagePath: 'pages/plaque/offlineHonors/home/index', // 预览页面路径
        searchQuery: 'id=15', // 预览页面路径启动参数
        onProgressUpdate: console.log, // 进度更新监听函数
    })
    // 打印上传结果
    console.log(previewResult)
})()
```

## 配置npm脚本命令
```shell
npm init
npm install miniprogram-ci --save
npm install simple-git
```
```json
// package.json
{
  "name": "lixin-plan",
  "version": "1.0.0",
  "description": "立信计划小程序",
  "main": ".eslintrc.js",
  "dependencies": {
    "miniprogram-ci": "^1.9.8",
    "simple-git": "^3.20.0"
  },
  "devDependencies": {},
  "scripts": {
    "build": "node upload.js",
    "test": "node preview.js"
  },
  "repository": {
    "type": "git",
    "url": "......"
  },
  "author": "hhd",
  "license": "ISC"
```

## 使用效果
**npm run build ：上传小程序代码**
```shell
> node upload.js

请输入小程序发布版本?
小程序发布版本号: 1.0.2023101915
请输入小程序发布描述?
小程序发布描述: 小程序新版本发布
########### 正在发布小程序 ############
.............
```

**npm run test： 输出到.output文件中体验二维码图片**<br>
![图片](/images/frontEnd/wechat/img.png)


## 优化静态资源环境变量配置
### 新增cdnUrl变量
```js
// config.js
/**
 * wx.getAccountInfoSync().miniProgram.envVersion:
 * develop 开发版
 * trial   体验版
 * release 正式版
 */
  const envVersion = wx.getAccountInfoSync()?.miniProgram?.envVersion ?? '';
  if(envVersion === 'develop'){
    // var config = {
    //   'baseUrl': 'https:..........',
    //   'lixinBaseUrl': 'https:............',
    //   'cdnUrl': 'https://.............'
    // };
    
     var config = {
       'baseUrl': 'http://shuidi.test...............',
       'cdnUrl': 'http://static.test..............'
     };

    //  var config = {
    //    'baseUrl': 'http://shuidi4...............',
    //    'cdnUrl': 'http://static.test................'
    //  };

    //  var config = {
    //    'baseUrl': 'http://shuidi.test2..............',
    //    'cdnUrl': 'http://static.test..............'
    //  };
    
    // var config = {
    //   'baseUrl': 'http://shuidi.dev.............',
    //   'lixinBaseUrl': 'http://lixin.shuidi.dev............',
    //    'cdnUrl': 'http://static.dev...............'
    // }

  }else{
    var config = {
        'baseUrl': 'https://.........',
        'lixinBaseUrl': 'https:.............',
        'cdnUrl': 'https:..............'
      };
  }
```

### 重写page对象每一页设置cdnUrl变量
扩展：重写 page 对象，新增一个 `buildStatic` 方法，保持以下原有使用方式和习惯
```html
<image src="{{filter.buildStatic('/map/mapServe/success-red-icon.png')}}"></image>
```
```js
// shuidi-page.js
const app = getApp()
const api = app.globalData.api;


/**
 * 重写 Page 对象
 * @param {*} pageConfig 页面page对象
 * @使用方式：
    导入： import Page from '/common/shuidi-page'
 */

export function ShuidiPage(pageConfig){

    // onLond函数赋值
    let onLoad = pageConfig.onLoad;
    
    pageConfig.onLoad = function(options){
        this.setData({
          cdnUrl: app.globalData.config.cdnUrl
        })
   }
}
```

### js静态资源环境变量使用
**index.js 导入 shuidi-page.js文件**
```js
import Page from '../../../../common/shuidi-page'
```

**index.wxml 使用变量** <br>
提示：如果直接拼接，setData未完成之前会渲染dom, image会首先渲染 /plaque/offlineHonors/card-top-text.png 导致报错
```html
<image class="tips"
       src="{{cdnUrl ? cdnUrl + '/plaque/offlineHonors/card-top-text.png' : ''}}">
</image>
```