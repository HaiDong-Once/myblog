

# react页面初始化案例
[[toc]]


## 代码示例
```js
import React, {useEffect, useState} from 'react';
import './index.scss'
import TitleCard from "./titleCard/index";
import PhoneInfo from "./phoneInfo/index";
import OtherInfo from "./otherInfo";
import request from "@/public/request";
import { getQuerys } from "@/public/util.js";
import { GlobalMessage }from "../../../components/message";
import EditSuccess from "./editSuccess";



function App() {
    const { digest, source } = getQuerys() // url digest  source：来源类型
    const [isCertSuccess, setSsCertSuccess] = useState(false) // 是否通过认证
    const [IsSubmitIng, setIsSubmitIng] = useState(false) // 是否提交未认证状态
    const companyInfoMock = { // 企业信息mock数据
        "id": 0,
        "contact_phone": "",
        "company_abs": "",
        "email": "",
        "website": "",
        "address": '',
        "address_detail": "",
        "legal_person": "",
    }
    const [companyDetailInfo, setCompanyDetailInfo] = useState({ // 已提交企业信息
        ...companyInfoMock
    })
    const [defaultCompanyDetailInfo, setDefaultCompanyDetailInfo] = useState({ // 默认企业信息合并提交信息
        ...companyInfoMock,
        "default_company_abs" : '', // 默认企业简介
    })


    /**
     * 数据初始化
     * @return {Promise<void>}
     */
    const initInfo = () => {
        getShowStatus()
        getCompanyInfo()
        getDefaultCompanyInfo()
        setVisitEditPage()
    }

    useEffect(initInfo, [])


    /**
     * 获取是否认证过
     * @return {Promise<void>}
     * @description status
     *  0-保留自主信息等按钮，
     *  1-可编辑电话，简介，
     *  2-已编辑信息未认证,
     *  3-已认证，展示为企业自述
     */
    const getShowStatus = () => {
        request.get("/official-info", {
            action: 'get_......',
            digest: digest
        }).then((res) => {
            const { status: Status, message: Message, data } = res ?? {};
            if( Status === 0){
                const {status} = data ?? {};
                if(+status === 3){
                    setSsCertSuccess(true)
                }else if(+status === 2){
                    setIsSubmitIng(true)
                }
            }else{
                Message && window.showMessage({
                    message: Message,
                    type: 'error',
                });
            }
        })
    }


    /**
     * 获取已提交企业信息
     * @return {Promise<void>}
     */
    const getCompanyInfo = () => {
        request.get("/official-info", {
            action: 'get_s........',
            digest: digest
        }).then((res) => {
            const { status, message: Message, data } = res ?? {};
            if( status === 0){
                data && setCompanyDetailInfo(data)
            }else{
                Message && window.showMessage({
                    message: Message,
                    type: 'error',
                });
            }
        })
    }


    /**
     * 获取默认企业信息
     * @return {Promise<void>}
     */
    const getDefaultCompanyInfo = () => {
        request.get("/official-info", {
            action: 'get_........',
            digest: digest
        }).then((res) => {
            const { status, message: Message, data } = res ?? {};
            if( status === 0){
                data && setDefaultCompanyDetailInfo(data)
            }else{
                Message && window.showMessage({
                    message: Message,
                    type: 'error',
                });
            }
        })
    }


    /**
     * 记录访问来源
     * @return {Promise<void>}
     * @description:
     * from 1-官方信息编辑页，2-认领自主信息编辑页
     */
    const setVisitEditPage = () => {
        request.get("/official-info", {
            action: 'vi......',
            digest: digest,
            from: source,
        }).then((res) => {
            const { status, message: Message, data } = res ?? {};
            if( status !== 0){
                Message && window.showMessage({
                    message: Message,
                    type: 'error',
                });
            }
        })
    }



    return (
        <>
            <div className="page">
                { isCertSuccess ? (
                    <EditSuccess companyDetailInfo={defaultCompanyDetailInfo}/>
                ) : (
                    <>
                        <TitleCard IsSubmitIng={IsSubmitIng}
                                   source={source}
                                   initInfoHome={initInfo}/>
                        <PhoneInfo IsSubmitIng={IsSubmitIng}
                                   initInfoHome={initInfo}
                                   defaultCompanyDetailInfo={defaultCompanyDetailInfo}
                                   companyDetailInfo={companyDetailInfo}/>
                        {IsSubmitIng && (
                            <OtherInfo IsSubmitIng={IsSubmitIng}
                                       initInfoHome={initInfo}
                                       companyDetailInfo={companyDetailInfo}/>
                        )}
                    </>
                )}
            </div>

            <GlobalMessage/>
        </>

    );
}

export default App;
```