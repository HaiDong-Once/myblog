
# 个人工具函数库
[[toc]]


## 小程序工具库
```ts
/*
  @description: 工具函数模块
  @author: hhd (2021-11-23)
  @使用方式：
    导入： import tool from '/common/tool';
    调用： tool.isTelMobile(this.data.phone)
 */


var tool = { 

  /************************ 正则验证函数 ***********************/
  /**
   * 身份证号码验证
   * @param {number} value 
   * @returns {boolean}
   */
  checkIdCard: function (value) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(value);
  },


  /**
   * 手机号码+固定电话验证
   * @param {number} value 
   * @returns {boolean}
   */
  isTelMobile: function (value) {
    let reg = /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/;
    return reg.test(value);
  },


  /**
   * 手机号码验证
   * @param {number} value 
   * @returns {boolean}
   */
  isMobile: function (value) {
    let reg = /^1[3456789]\d{9}$/;
    return reg.test(value);
  },


  /**
   * 固定电话验证
   * @param {number} value 
   * @returns {boolean}
   */
  isTel: function (value) {
    let reg = /^0\d{2,3}-?\d{7,8}$/;
    return reg.test(value);
  },


  /**
   * 邮箱验证
   * @param {number} value 
   * @returns {boolean}
   */
  isEmail: function (value) {
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(value);
  },


  /**
   * 数字验证
   * @param {number} value 
   * @returns {boolean}
   */
  isNumber: function (value) {
    let reg = /^[0-9]*$/;
    return reg.test(value);
  },


  /**
   * 中文汉字验证
   * @param {number} value 
   * @returns {boolean}
   */
  isChinese: function (value) {
    let reg = /^[\u4e00-\u9fa5]{0,}$/;
    return reg.test(value);
  },


  /************************* 字符串处理函数 ************************/
  /**
   * 手机号中间四位变成*, 手机号隐藏
   * @param {string,number} value 
   * @returns {string}
   */ 
  telFormat : function (value) {
    let tel = String(value); 
    return tel.substr(0,3) + "****" + tel.substr(7);
  },


  /**
   * 获取url链接参数，返回参数对象
   * @param {string} url 
   * @returns {object}
   */  
  getUrlOptions : function (url) {
    let params = url.split("?")[1].split("&")
    let obj = {}
    params.map(item => obj[item.split("=")[0]] = item.split("=")[1])
    return obj
  },


  /**
   * 键值对拼接成URL参数
   * @param {object} obj 键值对参数
   * @returns {string} url参数
   */  
  paramsUrl : function (obj) {
    let params = []
     for (let key in obj) {
       params.push(`${key}=${obj[key]}`);
     }
     return params.join('&')
  },


  /************************** 时间操作函数 ************************/
  /**
   * 获取当前时间
   * @returns {string}
   */  
  getNowTime : function () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate() >= 10 ? now.getDate() : ('0' + now.getDate());
    const hour = now.getHours() >= 10 ? now.getHours() : ('0' + now.getHours());
    const miu = now.getMinutes() >= 10 ? now.getMinutes() : ('0' + now.getMinutes());
    const sec = now.getSeconds() >= 10 ? now.getSeconds() : ('0' + now.getSeconds());
    return +year + "年" + (month + 1) + "月" + date + "日 " + hour + ":" + miu + ":" + sec;
  },


  /**
   * 格式化时间
   * @param {string} formater 时间格式 YYYY-MM-DD HH:mm:ss
   * @param {string,Date} time 传入时间
   * @returns {string}
   * @description dateFormater('YYYY-MM-DD HH:mm:ss')  默认取当前时间
   * @description dateFormater('YYYY年MM月DD日', this.data.time)
   */  
  dateFormater : function (formater, time) {
    let date = time ? new Date(time) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
    return formater.replace(/YYYY|yyyy/g, Y)
      .replace(/YY|yy/g, Y.substr(2, 2))
      .replace(/MM/g,(M<10 ? '0' : '') + M)
      .replace(/DD/g,(D<10 ? '0' : '') + D)
      .replace(/HH|hh/g,(H<10 ? '0' : '') + H)
      .replace(/mm/g,(m<10 ? '0' : '') + m)
      .replace(/ss/g,(s<10 ? '0' : '') + s)
  },

}

module.exports = tool;
```


## vue工具库
```ts
import axios from './axios'
import store from '../store'


/**
 * 常用工具库（已全局注入）
 * @author hhd
 * @time 2022-06-29
 * @update 2022-07-01
 * @type{batchRecord，objectToUrl}
 * @全局注入方式：
 *      import tools from './public/tools'：
 *      Vue.prototype.$tools= tools
 * @使用方法： this.$tools.batchRecord(id,type)
 */

let Tools = {

    /**
     * 批次统计说明
     * @param id {string} 批次id
     * @param type {string}
     * 1 : 是否点击排名首位
     * 2 : 点击权威证书
     * 3 : 精准客源
     * 4 : 线索小蜜
     * 5 : 首页按钮
     * 6 : 首页热区
     * 7 : 常见问题弹窗访问
     * 8 : 是否提交地址
     * 9 : 是否真实访问首页
     * 01 : 是否访问落地页
     * 02 : 是否访问短信弹窗
     * 03 : 是否访问支付页
     * 04 : 是否点击支付按钮
     */
    batchRecord:function (id, type) {
        if(['1','2','3','4','5','6','7','8','9'].includes(type)){
            axios.http.get("/msg2vip", {
                params: {
                    action: "click",
                    click_type: 'click_' + type,
                    id: id,
                },
            });
        }else{
            let action = '';
            if( type === '01'){
                action = 'update_page_visit'
            }else if( type === '02'){
                action = 'update_click_popup'
            }else if( type === '03'){
                action = 'update_pay_visit'
            }else if( type === '04'){
                action = 'update_pay_click'
            }
            axios.http.get('/msg2vip',{
                params:{
                    action: action,
                    id: id
                }
            })
        }

    },


    /**
     * 对象转url
     * @param {object} obj : 传入参数对象
     * @使用方法：this.objectToUrl(obj)
     * @return {string} （id=21&token=）
     */
    objectToUrl: function (obj) {
        const tempArray = [];
        for (const item in obj) {
            if (item) {
                tempArray.push(`${item}=${obj[item]}`);
            }
        }
        return tempArray.join("&");
    },


    /**
     * 全局数据存储
     * @param {object} query : 传入用户数据对象
     * 用于vuex全局数据统一存储
     */
    setUserStore(query){
        if(query){
            if(query.uid) 
                localStorage.setItem("local_userid", query.uid);
            if(query.token) 
                localStorage.setItem("local_token", query.token);
            if(query.id) store.commit('setId', query.id);
            if(query.uid) store.commit('setUid', query.uid);
            if(query.token) store.commit('setToken', query.token);
            if(query.digest) store.commit('setDigest', query.digest);
            if(query.phone) store.commit('setPhone', query.phone)
            if(query.kp_signature) 
                store.commit('setKp_signature', query.kp_signature)
            if(query.product_type) 
                store.commit('setProduct_type', query.product_type)
        }
    },
    
  
  /**
     * 校验数据类型
     * 使用：typeOf([])  // array
     * @param obj
     * @return {string}
     */
    typeOf: function (obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
    },
    
    
    /**
     * 防抖函数
     * 使用：
     *   debounce(() => {
     *     console.log('加载数据')
     *   }, 500)
     */
    const debounce = (() => {
        let timer = null
        return (callback, wait = 800) => {
            timer && clearTimeout(timer)
            timer = setTimeout(callback, wait)
        }
    })(),
    
    
    /**
     * 节流函数
     */
    const throttle = ck, wait = 800) => {
            let now (() => {
        let last = 0
        return (callba= +new Date()
            if (now - last > wait) {
                callback()
                last = now
            }
        }
    })(),
    
    
    /**
     * 手机号脱敏
     * @param mobile
     */
    hideMobile: function(mobile) {
        if(!mobile) return '';
        return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },


    /**
     * 手机号中间四位变成*, 手机号隐藏
     * @param {string,number} value
     * @returns {string}
     */
    telFormat : function (value) {
        let tel = String(value);
        return tel.substr(0,3) + "****" + tel.substr(7);
    },
    
    
    /**
     * 开启全屏
     * @param element
     */
    launchFullscreen: function (element){
        if (element.requestFullscreen) {
            element.requestFullscreen()
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen()
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen()
        }
    },
    
    
    /**
     * 关闭全屏
     */
    exitFullscreen : function (){
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    },
    
    
    /**
     * 大小写转换
     * @param str 待转换的字符串
     * @param type 1-全大写 2-全小写 3-首字母大写
     * @return {string|*}
     */
    turnCase: function (str, type) {
        switch (type) {
            case 1:
                return str.toUpperCase()
            case 2:
                return str.toLowerCase()
            case 3:
                return str[0].toUpperCase() + str.substring(1).toLowerCase()
            default:
                return str
        }
    },
    
    
    /**
     * 解析URL参数
     * @return {{}}
     */
    getSearchParams: function () {
        const searchPar = new URLSearchParams(window.location.search)
        const paramsObj = {}
        for (const [key, value] of searchPar.entries()) {
            paramsObj[key] = value
        }
        return paramsObj
    },
    
    
    /**
     * 判断手机是Andoird还是IOS
     * @return {number} 1: ios 2: android 3: 其它
     */
    getOSType: function () {
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isIOS) return 1;
        if (isAndroid) return 2;
        return 3;
    },
    
    
    /**
     * 数组对象根据字段去重
     * @param arr 要去重的数组
     * @param key 根据去重的字段名
     * @return {*[]}
     */
    uniqueArrayObject: function (arr = [], key = 'id') {
        if (arr.length === 0) return
        let list = []
        const map = {}
        arr.forEach((item) => {
            if (!map[item[key]]) {
                map[item[key]] = item
            }
        })
        list = Object.values(map)
        return list
    },
    
    
    /**
     * 滚动到页面顶部
     */
    scrollToTop: function () {
        const height = document.documentElement.scrollTop || document.body.scrollTop;
        if (height > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, height - height / 8);
        }
    },
    
    
    /**
     * 滚动到元素位置
     * 使用：smoothScroll('#target');
     * @param element id
     */
    smoothScroll: function (element) {
        document.querySelector(element).scrollIntoView({
            behavior: 'smooth'
        });
    },
    
    
    /**
     * 金额格式化
     * 使用：moneyFormat(10000000, 3, '.', '-') // 10-000-000.000
     * @param {number} number： 要格式化的数字
     * @param {number} decimals： 保留几位小数
     * @param {string} dec_point： 小数点符号
     * @param {string} thousands_sep： 千分位符号
     * @return {string}
     */
    moneyFormat: function (number, decimals, dec_point, thousands_sep){
        number = (number + '').replace(/[^0-9+-Ee.]/g, '')
        const n = !isFinite(+number) ? 0 : +number
        const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
        const sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep
        const dec = typeof dec_point === 'undefined' ? '.' : dec_point
        let s = ''
        const toFixedFix = function(n, prec) {
            const k = Math.pow(10, prec)
            return '' + Math.ceil(n * k) / k
        }
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
        const re = /(-?\d+)(\d{3})/
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, '$1' + sep + '$2')
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || ''
            s[1] += new Array(prec - s[1].length + 1).join('0')
        }
        return s.join(dec)
    },
    
    
    /**
     * 下载文件
     * @param api 接口
     * @param params 请求参数
     * @param fileName 文件名
     * @param type 请求方式，默认get
     */
    downloadFile: function (api, params, fileName, type = 'get') {
        axios({
            method: type,
            url: api,
            responseType: 'blob',
            params: params
        }).then((res) => {
            let str = res.headers['content-disposition']
            if (!res || !str) {
                return
            }
            let suffix = ''
            // 截取文件名和文件类型
            if (str.lastIndexOf('.')) {
                fileName ? '' : fileName = 
                decodeURI(str.substring(str.indexOf('=') + 1, str.lastIndexOf('.')))
                suffix = str.substring(str.lastIndexOf('.'), str.length)
            }
            //  如果支持微软的文件下载方式(ie10+浏览器)
            if (window.navigator.msSaveBlob) {
                try {
                    const blobObject = new Blob([res.data]);
                    window.navigator.msSaveBlob(blobObject, fileName + suffix);
                } catch (e) {
                    console.log(e);
                }
            } else {
                //  其他浏览器
                let url = window.URL.createObjectURL(res.data)
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', fileName + suffix)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(link.href);
            }
        }).catch((err) => {
            console.log(err.message);
        })
    },
    

    /**
     * 倒计时
     */
    remainTime(){
      let totalTime = 60 * 60; // 总时长（时 * 分 * 秒）
      let hours; // 时
      let minutes; // 分
      let seconds; // 秒
      const timer = setInterval(() => {
        if (totalTime > 0) {
          --totalTime;
          hours = Math.floor(totalTime / (60 * 60));
          minutes = Math.floor(totalTime % (60 * 60) / 60);
          seconds = Math.floor(totalTime % 60);
          // 补零
          if (hours < 10) {
            hours = "0" + hours;
          }
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          // 赋值
          this.remainMin = minutes;
          this.remainSec = seconds;
        } else {
          clearInterval(timer);
        }
      }, 1000);
    },
    

    /**
     * 倒计时函数 callback 版
     * @param callback 回调函数接收定时器值 { hours, minutes, seconds }
     * @param totalTime 秒
     * @description 使用说明
     *    this.$tools.remainTime((time)=>{
     *      console.log(time.hours + ':' + time.minutes + ':' + time.seconds)
     *    },20);
     */
    remainTime(callback, totalTime = 0){
        let hours = '00';
        let minutes = '00';
        let seconds = '00';
        const timer = setInterval(() => {
            if (totalTime > 0) {
                --totalTime;
                hours = Math.floor(totalTime / (60 * 60));
                minutes = Math.floor(totalTime % (60 * 60) / 60);
                seconds = Math.floor(totalTime % 60);
                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
            } else {
                clearInterval(timer);
            }
            callback({
                hours,
                minutes,
                seconds
            });
        }, 1000);
    },
    
    
    /**
     * 复制文本到剪切板
     * @param text {string} 要复制的文本
     * @param successCallback 复制成功回调
     * @param errorCallback 复制失败回调
     * @description:
     *  this.$tools.copyTextToClipboard(this.name, ()=>{
     *         this.$toast('复制成功')
     *       }, (err)=>{
     *         this.$toast('复制失败,请重试')
     *       });
     */
    copyTextToClipboard(text, successCallback, errorCallback) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                if (typeof successCallback === 'function') {
                    successCallback();
                }
            } else {
                throw new Error('复制失败');
            }
        } catch (err) {
            if (typeof errorCallback === 'function') {
                errorCallback(err);
            }
        } finally {
            document.body.removeChild(textarea);
        }
    },
}


export default Tools
```