

# react ant-design 表单提交等案例
[[toc]]


## 表单验证码登录
```js
import { buildStatic, remainTime, getQuerys} from "@/public/util.js";
import request from "@/public/request";
import './index.scss';
import { Button, Form, Input, Select  } from 'antd';
import React, { useState, useEffect } from 'react';
const { Option } = Select;


function TitleCard (props) {
    const {
        IsSubmitIng,
        initInfoHome,
        source, // 编辑入口来源
    } = props
    const [form] = Form.useForm();
    const { digest } = getQuerys()

    const [personList, setPersonList] = useState(['年报电话']) // 股东高管list
    const [codeTimer, setCodeTimer] = useState(0); // 验证码定时
    const [codeRequired, setCodeRequired] = useState(false) // 验证码是否必填


    /**
     * 获取企业高管信息
     * @return {Promise<void>}
     */
    const initInfo = () => {
        request.get("/credit-evaluation/company", {
            action: 'get_company......................',
            digest: digest,
        }).then((res) => {
            const { status, message: Message, data } = res ?? {};
            if( status === 0){
                let { person_list } = data ?? {};
                person_list.unshift('年报电话')
                setPersonList(person_list)
            }else{
                Message && window.showMessage({
                    message: Message,
                    type: 'error',
                });
            }
        })
    }

    useEffect(initInfo, [])


    /**
     * 表单提交
     * @param values
     */
    const onFinish = (values) => {
        const { userCode } = values ?? {}
        if(!userCode){
            getPhoneCode(values)
        }else{
            submitCert(values)
        }
    };


    /**
     * 提交认证接口
     */
    const submitCert = async (values) => {
        const {userName, userPhone, userCode} = values ?? {}
        const res = await request.get("/credit-evaluation/company", {
            action: 'user_....................',
            phone: userPhone,
            name: userName,
            digest: digest,
            verify_code: userCode
        });
        const {status, message: Message} = res ?? {};
        if (status === 0) {
            // 认证成功
            initInfoHome()
            kbnClickAna('pc编辑简介电话页认证成功用户')
        } else {
            kbnClickAna('pc编辑简介电话页认证失败用户（调了接口没认证通过）')
            Message && window.showMessage({
                message: Message,
                type: 'error',
            });
        }
    }


    /**
     * 获取验证码
     * @description:
     * from 1-官方信息编辑页，2-认领自主信息编辑页
     */
    const getPhoneCode = async (values) => {
        const {userName, userPhone} = values ?? {};
        const checkRes = await request.get("/credit-evaluation/company", {
            action: 'check_company_..............',
            phone: userPhone,
            name: userName,
            digest: digest,
            from: source,
        });
        const { status: checkStatus, message: checkMessage } = checkRes ?? {};
        if( checkStatus !== 0){
            kbnClickAna('pc编辑简介电话页认证失败用户（调了接口没认证通过）')
            checkMessage && window.showMessage({
                message: checkMessage,
                type: 'error',
            });
            return
        }

        const res = await request.get("/credit_butler/user", {
            action: 'send_。。。。',
            phone: userPhone
        });
        const { status, message: codeMessage} = res ?? {};
        if(status === 0){
            setCodeRequired(true)
            remainTime((time) => {
                setCodeTimer(time.seconds)
                if(+time?.seconds === 0){
                    setCodeRequired(false)
                }
            }, 60);
        }else{
            codeMessage && window.showMessage({
                message: codeMessage,
                type: 'error',
            });
        }
    }


    /**
     * kbn统计
     */
    const kbnClickAna = (position) => {
        const PcUser = window.PcUser;
        PcUser?.clickAnaGuid({
            where_from: 'pc来源认证流程',
            group: '自然流量运营',
            Ext1Fixed: 1,
            Ext8: 'pc点击入口',
            position: position,
            digest,
        })
    }


    return (
        <div className="title-card">
            <div className="title">企业基础信息维护（免费）</div>

            {IsSubmitIng && (
                <div className="cert-box">
                    <div className="form-title-box">请完成身份认证，需确定您与企业的关系后，信息才能展示</div>
                    <Form
                        form={form}
                        size="large"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off">
                        <div className="input-box">
                            <Form.Item
                                label="联系人"
                                rules={[
                                    { required: true, message: '请选择联系人' }
                                ]}
                                name="userName">
                                <Select
                                    placeholder="请选择联系人"
                                    allowClear
                                    style={{ width: '375px',}}>
                                    {personList.map((item, index) => (
                                        <Option key={index} value={item}>{item}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="手机号"
                                name="userPhone"
                                rules={[
                                    { required: true, message: '请输入手机号' },
                                    { pattern: /^1\d{10}$/, message: '手机号码格式不正确'}
                                ]}>
                                <Input
                                    placeholder="请输入手机号"
                                    maxLength={11}
                                    style={{ width: '375px',}}/>
                            </Form.Item>
                            <Form.Item
                                label="验证码"
                                rules={[
                                    { required: codeRequired, message: '请输入验证码' },
                                ]}
                                name="userCode">
                                <Input
                                    placeholder="请输入验证码"
                                    maxLength={6}
                                    style={{ width: '265px',}}/>
                            </Form.Item>
                            <button className="get-code"
                                    disabled={codeTimer > 0}>
                                    { codeTimer > 0 ? `${codeTimer}秒后再试` : '获取验证码' }
                            </button>

                        </div>

                        <div className="button-tips">以上内容仅用于身份验证，不做他用</div>

                        <Form.Item
                            style={{ display: "flex", justifyContent: "center", }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "270px", marginTop: '12px'}}>
                                认证并提交已编辑的内容
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </div>
    )
}

export default TitleCard;
```


## 提示弹窗样式
```js
/**
 * 打开申请提交弹窗
 */
const openModalInfo = () => {
    kbnClickAna('pc编辑简介电话页点击广告按钮用户')
    Modal.success({
        title: '申请已提交',
        centered: true,
        width: 530,
        height: 244,
        closeIcon: '<CloseOutlined />',
        content: (
            <div>
                <p>我们服务专员会尽快与您取得联系，帮你选择同行保留权益，</p>
                <p>请留意接听电话</p>
            </div>
        ),
        onOk() {},
    });
};
```