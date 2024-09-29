# react 父组件调用子组件方法


## 父组件
```jsx
import React, { useRef } from 'react';
import Child from './Child';
export default () => {
    const productServePayPopRef = useRef(null)
    return (
        <div>
            <ProductServePayPop ref={productServePayPopRef}/>
            <button onClick={this.handleClick}>调用子组件方法</button>
        </div>
    )

    // 调用子组件方法
    handleClick = () => {
        if (productServePayPopRef.current){
          productServePayPopRef.current.openProductServePayPop()
        }
    }
}

export default Parent;
```

## 子组件
```jsx
import React, {useEffect, useState, forwardRef, useImperativeHandle} from "react";

export default forwardRef(props,refParent)=> {
    childMethod = () => {
        console.log('子组件方法被调用了');
    }
    return (
        /**
         * 给父组件祖册暴露方法
         */
        useImperativeHandle(refParent, () => ({
            /**
             * 打开支付弹窗
             */
            openProductServePayPop: () => {
                requestPayData()
            },

            /**
             * 打开支付成功弹窗
             */
            openPaySuccessPop: () => {
                setIsShowProductPayPop(true)
                setIsPaySuccess(true)
            }
        }))
    )
}