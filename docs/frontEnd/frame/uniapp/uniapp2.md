

# js  mixin抽离公共方法和data字段等
[[toc]]


##  Mixins.js 公共文件
```js
/**
 * 企业展厅-VIP企业-公共逻辑抽离-mixin
 * @author: hhd (2024-03-15)
 */
import config from "@/config";
import http from "@/public/request";


export default {
    // 公共变量抽离
    data() {
        return {
            showDialog: false, // 删除确认弹窗
            showDialog2: false, // 审核拒绝信息弹窗
            businessIndex: 0, // 当前选中信息 index
            businessAuditMsg: '', // 当前选中信息拒绝原因
            auditStatusMap: new Map([
                ['1', { error: false, warn: true, edit: false, delete: false }],
                ['2', { error: false, warn: false, edit: true, delete: true }],
                ['3', { error: true, warn: false, edit: true, delete: false }]
            ]),
        }
    },

    // 公共业务逻辑抽离
    methods: {
        /**
         * 删除确认弹窗
         * @param index
         */
        deleteEdit(index){
            this.showDialog = true;
            this.businessIndex = index;
        },


        /**
         * 打开审核拒绝信息弹窗
         * @param item
         */
        openErrorPop(item) {
            this.showDialog2 = true;
            this.businessAuditMsg = item.audit_msg ?? ''
        },


        /**
         * upload 图片反显
         * @param url
         * @return {string}
         */
        buildPicture(url) {
            return `${config.imgCdn}/${url}/350x350.jpg`
        },


        /**
         * upload 图片反显
         * @param url
         * @return {string}
         */
        buildPicture2(url) {
            return `${config.imgCdn}/${url}/1080x720.jpg`
        },


        /**
         * 删除数据
         */
        submitDelete(){
            const {id} = this.companyVipInfo[this.businessIndex]
            http({
                url: "/new-platform/company-detail",
                data: {
                    action: "delete_hall_vip_content",
                    id: id,
                },
            }).then(res => {
                const {status, message} = res ?? {}
                if (status === 0) {
                    uni.showToast({
                        icon: 'none',
                        title: '操作成功',
                    });
                    this.getVipCompanyInfo()
                    this.showDialog = false
                }else{
                    uni.showToast({
                        icon: 'none',
                        title: message,
                    });
                }
            }).finally(()=>{
                this.showDialog = false;
            })
        },
    },
}
```

## 引用公共文件
```js
import promotionVipMixins from "@/Mixins";

mixins: [promotionVipMixins]
```