

# react页面初始化案例
[[toc]]


## 1.model组件： 共五种表单类型
```js

import React, {useEffect} from 'react';
import './index.scss'
import { buildStatic } from "@/public/util.js";
import { addressData } from "@/public/addressData.js";
import { Form, Input, Modal, Cascader } from 'antd';


const CreateBaseForm = ({ open, onCreate, onCancel, modalType, default_company_abs, item }) => {
    const [form] = Form.useForm();
    const optionsAddress = addressData(); // 省市区 文件
    const userMap = new Map([ // 创建映射 表单类型
        [0, 'userPhone'],
        [1, 'userIntro'],
        [2, 'userEmail'],
        [3, 'userWebUrl'],
        [4, 'userAddressDetail'],
    ]);


    /**
     * 表单反显赋值
     */
    useEffect(() => {
        form.setFieldsValue({
            [userMap.get(modalType)]: item && item.content,
        });
        if(modalType === 4){
            form.setFieldsValue({
                userAddress: item && item.address,
            });
        }
    })


    /**
     * 添加简介
     */
    const addUserIntro = () => {
        form.setFieldsValue({
            userIntro: default_company_abs,
        });
    }


    return (
        <Modal
            open={open}
            title="编辑对外展示电话"
            okText="确认以上内容并提交 "
            cancelText="取消"
            centered={true}
            onCancel={onCancel}
            className="modal-edit"
            style={{ width: "530px"}}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values, item.id);
                    }).catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}>
            <div className="form-box">
                <Form
                    form={form}
                    name="form_in_modal"
                    size="large"
                    initialValues={{
                        modifier: 'public',
                    }}>

                    {/*电话编辑*/}
                    {modalType === 0 && (
                        <Form.Item
                            name="userPhone"
                            label="电话"
                            rules={[
                                { required: true, message: '请输入对外展示电话' },
                                { pattern: /^1\d{10}$/, message: '手机号码格式不正确'}
                            ]}>
                            <Input placeholder="请输入对外展示电话" maxLength={11}
                                   style={{ width: "383px", marginLeft: '34px'}}/>
                        </Form.Item>
                    )}

                    {/*简介编辑*/}
                    {modalType === 1 && (
                        <>
                            <div className="ai-input-box" onClick={addUserIntro}>
                                <img className="icon"
                                     src={buildStatic("/shuidi/images/companyInfoEdit/AI-blue-icon.png")}
                                     alt=""/>
                                助手帮我提供简介思路
                            </div>
                            <Form.Item
                                name="userIntro"
                                rules={[
                                    { required: true, message: '请输入企业简介内容' },
                                ]}
                                label="简介">
                                <Input.TextArea
                                    placeholder="请输入企业简介内容" showCount maxLength={600}
                                    style={{ width: "383px", height: "194px", marginLeft: '34px'}}/>
                            </Form.Item>
                        </>
                    )}

                    {/*邮箱编辑*/}
                    {modalType === 2 && (
                        <Form.Item
                            name="userEmail"
                            rules={[
                                { required: true, message: '请输入您的邮箱' },
                                {
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: '邮箱格式不正确'
                                }
                            ]}
                            label="邮箱">
                            <Input placeholder="请输入您的邮箱" maxLength={600}
                                   style={{ width: "383px", marginLeft: '34px'}}/>
                        </Form.Item>
                    )}

                    {/*官网地址编辑*/}
                    {modalType === 3 && (
                        <Form.Item
                            name="userWebUrl"
                            rules={[
                                { required: true, message: '请输入官方网址' },
                            ]}
                            label="官网">
                            <Input placeholder="请输入官方网址" maxLength={600}
                                   style={{ width: "383px", marginLeft: '34px'}}/>
                        </Form.Item>
                    )}

                    {/*企业地址编辑*/}
                    {modalType === 4 && (
                        <>
                            <Form.Item
                                label="地址"
                                rules={[
                                    { required: true, message: '请输入省市区地址' },
                                ]}
                                name="userAddress">
                                <Cascader
                                    options={optionsAddress}
                                    fieldNames={{
                                        label: 'name',
                                        value: 'name',
                                        children: 'children'
                                    }}
                                    placeholder="请输入省市区地址"
                                    maxLength={60}
                                    style={{ width: '383px', marginLeft: '34px'}}/>
                            </Form.Item>
                            <div className="address-detail">
                                <Form.Item
                                    label=""
                                    rules={[
                                        { required: true, message: '请输入详细地址' },
                                    ]}
                                    name="userAddressDetail">
                                    <Input
                                        placeholder="请输入详细地址"
                                        showCount maxLength={60}
                                        style={{ width: '383px', marginLeft: '86px'}}/>
                                </Form.Item>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </Modal>
    );
};



export default CreateBaseForm;
```

## 弹窗组件调用
```js
const [modalType, setModalType] = useState(0) // 弹窗类型
const [companyDetailInfo, setCompanyDetailInfo] = 
useState({audit_list:[]}) // 已提交企业信息
const [open, setOpen] = useState(false); // 控制弹窗显示隐藏
const [isSubmitting, setIsSubmitting] = useState(false); // 是否提交中

/**
 * 确认提交信息
 * @param values
 * @param id
 */
const onCreate = (values, id) => {
    if(isSubmitting){ return }
    setIsSubmitting(true)

    const {
        userPhone = "",
        userIntro = "",
        userEmail = "",
        userWebUrl = "",
        userAddress = [],
        userAddressDetail = ""
    } = values;

    request.get("/official-info", {
        action: 'submit_official.............',
        id: id,
        content: content,
    }).then((res) => {
        const { status, message: Message, data } = res ?? {};
        if( status === 0){
            setOpen(false);
            // 刷新数据
            openModalInfo()
            getCompanyInfo()
        }else{
            Message && window.showMessage({
                message: Message,
                type: 'error',
            });
        }
    }).finally(() => 
        setIsSubmitting(false)
    )
};

return (
    {/*创建基础表单组件*/}
    <CreateBaseForm
        open={open}
        modalType={modalType}
        item={companyDetailInfo?.audit_list[modalType]}
        default_company_abs={companyDetailInfo.default_company_abs}
        onCreate={onCreate}
        onCancel={() => {setOpen(false);}}/>
)
```