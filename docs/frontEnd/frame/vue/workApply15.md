


# vue移动端项目支付模块封装

### 代码实现
```ts
import axios from './axios'
import store from '../store'
import router from '../router'


/**
 * 支付模块封装
 * @author hhd
 * @time 2022-09-13
 * @update 2022-09-13
 * @使用方法：
 *  导入：import PayModule from  "@guanjia/public/payModule";
 *  支付模块初始化：
 *           this.payModule = new PayModule(
 *               {
 *                 id: this.$store.state.id,
 *                 uid: this.$store.state.uid,
 *                 digest: this.$store.state.digest,
 *                 order_no: this.$route.query.order_no,
 *                 success_url_window: this.success_url,
 *               }
 *           )
 *   发起支付：
 *       this.payModule.doPay(this.pay_type, this.which).then((res)=>{
 *         console.log('支付成功')
 *       }).catch((err)=>{
 *         console.log(err)
 *       })
 */


class PayModule {

    /**
     * 构造基础数据
     * @param id 批次id （必传）
     * @param uid 用户id （必传）
     * @param digest 企业digest （必传）
     * @param order_no 订单号url (必传，取自url)
     * @param success_url_window 支付成功跳转地址 window.href跳转
     * @param success_url_router 支付成功跳转地址 vue 路由跳转
     */
    constructor (param) {
        // 构造函数初始化数据
        this.id = param?.id ?? '';
        this.uid = param?.uid ?? '';
        this.digest = param?.digest ?? '';
        this.order_no = param?.order_no ?? '';
        this.success_url_window = param?.success_url_window ?? '';
        this.success_url_router = param?.success_url_router ?? '';

        // 全局参数
        this.type = ''; // 支付类型（价格控制）
        this.pay_type = ''; // 支付方式（微信，支付宝）
        this.wxBrower = false; // 是否微信浏览器
        this.openid =  ''; // 微信openid
        this.return_url = ''; // 支付回调地址

        // 模块初始化
        this.update(); // 支付数据初始化
        this.checkPayStatus(this.order_no); // 支付轮询
    }


    /**
     * 支付数据初始化
     */
    update() {
        // 获取页面域名和路径
        let index = window.location.href.indexOf('?')
        if(index !== -1){
            // string.substring(indexStart（包含）, indexEnd（不包含）) 截取字符串开始索引到结束索引间的内容
            this.return_url = window.location.href.substring(0,index)
        }else{
            this.return_url = window.location.href
        }
        // 检测浏览器类型
        let ua = navigator.userAgent.toLowerCase();
        // match(/.../i) i 是忽略大小写标志
        // `${["MicroMessenger"]}` 输出：'micromessenger' 模板字符串将数组结果转换为字符串。
        if (`${ua.match(/MicroMessenger/i)}` === "micromessenger") {
            this.wxBrower = true;
        }
        // 获取openid
        axios.http.get("/kpuserdetail", {
            params: {
                action: "woa_openid",
            },
        }).then((res) => {
            if (+res.status === 0) {
                this.openid = res.data.openid;
            }
            if (this.wxBrower && !this.openid) {
                location.href = `${process.env.VUE_APP_SHUIDI
                }/wx-login-jump?back_url=${encodeURIComponent(location.href)}`;
            }
        });
    }


    /**
     * 触发支付，生产订单号
     * @param type 支付类型（价格控制）
     * @param pay_type 支付方式（微信，支付宝）
     */
    doPay(type,pay_type){
        this.type = type; // 支付类型（价格控制）
        this.pay_type = pay_type; // 支付方式（微信，支付宝）

        return new Promise((resolve, reject) => {
            axios.http.get("/pay", {
                params: {
                    action: "do_pay",
                    type: this.type,
                    pay_type: this.pay_type,
                    pay_count: 1,
                    no_need_login: 0,
                    user_id: this.uid,
                    assoc_id: this.id,
                    digest: this.digest,
                    t: new Date().getTime(),
                },
            })
            .then((res) => {
                if (res.status === 0) {
                    let objParams = {
                        order_no: res.order_no,
                    };
                    this.return_url = `${this.return_url}?${this.objectToUrl(objParams)}`;
                    this.checkPayStatus(res.order_no); // 提前打开支付轮询
                    if (this.pay_type === 'weixinpay') {
                        this.wxPay(res.order_no).then((resWxPay)=>{
                            resolve(resWxPay);
                        }); // 微信支付
                    } else {
                        this.zfbPay(res.order_no).then(()=>{
                            resolve();
                        }); // 支付宝支付
                    }
                } else {
                    reject(res?.message)
                    res.message && this.$toast(res.message);
                }
            });
        });
    }


    /**
     * 支付宝支付
     * @param order_no
     */
    zfbPay(order_no) {
        return new Promise((resolve, reject) => {
            axios.http.get('/pay', {
                params: {
                    action: "get_alipay_h5_pay_url",
                    order_no: order_no,
                    type: this.type,
                    return_url: this.return_url,
                }
            }).then(res => {
                if (res.status === 0) {
                    resolve();
                    location.href = res.data.url;
                }else{
                    reject();
                }
            })
        });
    }


    /**
     * 微信支付
     * @param order_no
     */
    wxPay(order_no) {
        const params = {
            order_no: order_no,
            type: this.type,
        };
        // 微信浏览器参数变更
        if (!this.wxBrower) {
            params["return_url"] = this.return_url;
            params["action"] = "get_wechat_h5_pay_url";
        } else {
            params["open_id"] = this.openid;
            params["action"] = "get_weixinpay_js_params";
        }
        return new Promise((resolve, reject) => {
            axios.http
                .get("/pay", {
                    params,
                })
                .then((res2) => {
                    // 微信浏览器支付
                    if (this.wxBrower) {
                        let that = this;
                        WeixinJSBridge.invoke(
                            "getBrandWCPayRequest",
                            res2,
                            function (res3) {
                                if (res3.err_msg + '' === "get_brand_wcpay_request:ok") {
                                    if(that.success_url_window){
                                        window.location = that.success_url_window ;
                                    }
                                    if(that.success_url_router){
                                        router.push({
                                            path: that.success_url_router,
                                        })
                                    }
                                    resolve('weichat');
                                } else {
                                    this.$toast('支付失败');
                                    reject();
                                }
                            }
                        );
                    } else {
                        // 普通浏览器
                        resolve();
                        location.href = res2.data.url;
                    }
                });
        });
    }


    /**
     * 检查支付状态（订单号）
     * @param order_no 订单号
     */
    checkPayStatus(order_no){
        if(order_no){
            const timer = setInterval(() => {
                return new Promise((resolve, reject) => {
                    axios.http
                        .get("/pay", {
                            params: {
                                action: "check_pay_status_by_order",
                                order_no: order_no,
                                t: new Date().getTime(),
                            },
                        })
                        .then((res) => {
                            if (+res.payed === 1) {
                                clearInterval(timer);
                                // 普通浏览器支付成功
                                if(this.success_url_window){
                                    window.location = this.success_url_window ;
                                }
                                if(this.success_url_router){
                                    router.push({
                                        path: this.success_url_router,
                                    })
                                }
                                resolve();
                            }else{
                                reject(res);
                            }
                        });
                });
            }, 1000);
        }
    }


    /**
     * 对象转url
     * @param {object} obj : 传入参数对象
     * @使用方法：this.objectToUrl(obj)
     * @return {string} （id=21&token=）
     */
    objectToUrl(obj) {
        const tempArray = [];
        for (const item in obj) {
            if (item) {
                tempArray.push(`${item}=${obj[item]}`);
            }
        }
        return tempArray.join("&");
    }


}


export default PayModule
```
