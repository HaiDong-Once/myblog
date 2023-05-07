
# 开发工具
[[toc]]


## windows环境下charles配置抓包

### 下载charles
- 在[Charles官网](https://www.charlesproxy.com/download)下载
![图片](/images/frontEnd/other/img.png)

### 证书安装
- 安装好以后打开，配置Charles证书；选择`help——SSL Proxying——install Charles Root Certificate`
- 直接安装到当前用户
- 或者安装到本地计算机
![图片](/images/frontEnd/other/img_1.png)
![图片](/images/frontEnd/other/img_2.png)
![图片](/images/frontEnd/other/img_3.png)

### 勾选windows proxy
![图片](/images/frontEnd/other/img_4.png)

### 配置proxy
- `proxy——SSL Proxy Setting`，添加添加`Location`
![图片](/images/frontEnd/other/img_5.png)
- `host,port`这是为全部`*`
![图片](/images/frontEnd/other/img_6.png)

### 手机安装证书
![图片](/images/frontEnd/other/img_7.png)

### ios端手机网络配置
![图片](/images/frontEnd/other/img_8.png)
![图片](/images/frontEnd/other/img_9.png)
![图片](/images/frontEnd/other/img_10.png)

### Android端手机网络配置
跟IOS设备的安装类似，不同的是安卓要用非自带的浏览器来安装（比如UC浏览器，或者qq浏览器等），
下载证书到本地。然后在设置中找到系统安全的设置页（不同设备可能不同），
如：小米手机是在`设置 -> 密码与安全 -> 系统安全 -> 加密与凭据 -> 从存储设备安装`，
然后找到下载好的证书，安装。或者在设置中直接搜索证书安装
安装完成后，在用户凭据里可以我们刚刚安装成功的证书。



## CodeFun：前端开发ui代码自动生成工具

### CodeFun介绍：
- CodeFun 是一款 UI 设计稿智能生成源代码的工具，可以将 Sketch、Photoshop 的设计稿智能转换为前端源代码
- **优点**：目前最强的代码生成工具，转化率80%以上，比较复杂的部分会自动转化为图片
- **缺点**：上传，生成过程中速度较慢；源文件需要上传到codeFun服务器，对保密性项目不适用

### 实测过程：
- CodeFun官方注册下载，本地安装ps,或者sketch插件
- 在ps菜单栏—窗口—扩展功能—选中codeFun插件—上传ps源文件
![图片](/images/frontEnd/other/img_11.png)
- 上传后查看项目—查看代码
![图片](/images/frontEnd/other/img_12.png)
![图片](/images/frontEnd/other/img_16.png)
- 代码拷贝到项目——代码顺序与pdf源文件顺序相同
![图片](/images/frontEnd/other/img_13.png)
- 设置变量
![图片](/images/frontEnd/other/img_14.png)
- 配置静态资源对应地址
![图片](/images/frontEnd/other/img_15.png)
