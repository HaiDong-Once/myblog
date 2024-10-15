

# react 实现 ant-design 中 message 组件自定义封装
[[toc]]


## 一、前言
公司 php Web 项目中混入了 react+antd, 使用了message 全局消息提醒组件，但是发现antd5.0以后的版本，
并不支持chrome78一下的浏览器，所以觉得自己手动封装一个这样的message全局消息提醒组件，类型包括错误、成功、警告和普通信息

## 二、组件设计
首先，我们需要设计一个接收几个参数的组件：
- message：显示的消息内容
- type：消息的类型，可以是 'error'、'success'、'warn' 或 'info'
- duration：消息显示的持续时间
- style：自定义样式

组件使用方式
```ts
window.showMessage({
    message: 'This is a message',
    type: 'error',
    duration: 4000,
    style: {marginTop: '400px'}
});
```

## 三、组件实现
组件主要由两部分组成，一个是 Message，用于显示单条消息，另一个是 GlobalMessage，用于管理全局的消息队列

### Message 组件
Message 组件接收 message、type、duration、style 和 onClose 作为参数。
useEffect Hook 用于在消息显示后的一段时间后自动关闭消息
```ts
useEffect(() => {
    const timer = setTimeout(() => {
        onClose();
    }, duration);
    return () => clearTimeout(timer);
}, []);
```

### GlobalMessage 组件
GlobalMessage 组件负责管理全局的消息队列。使用 useState Hook 来存储消息队列，
每条消息包括 message、type、duration、style 和一个随机生成的 id。
```ts
const [messages, setMessages] = useState([]);
```
使用 useEffect Hook 在组件挂载时，将 showMessage 函数挂载到 window 对象上，
使其可以在全局使用。showMessage 函数接收一个包含 message、
type、duration 和 style 的对象作为参数，然后将这个对象添加到消息队列中。
```ts
useEffect(() => {
    window.showMessage = ({message, type, duration, style}) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { message, type, duration, style, id: Math.random() },
        ]);
    };
}, []);
```
定义一个 handleClose 函数，用于从消息队列中删除指定的消息。这个函数接收一个 id 作为参数，
然后返回一个新的消息队列，新的队列中不包含这个 id 的消息
```ts
const handleClose = useCallback((id) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
}, []);
```

## 四、代码实现
### js代码
```js
/**
 * 公共信息提交弹窗
 * @param props{
 *  message： 提示信息
 *  type: 类型：error， success， warn， info
 *  duration： 停留时间
 *  style: 自定义样式
 * }
 * @return {JSX.Element|null}
 * @constructor
 * import {GlobalMessage }  from "../../../components/message";
 * <GlobalMessage />
 *
 * window.showMessage({
 *     message: Message,
 *     type: 'error',
 *     duration: 4000,
 *     style: {marginTop: '400px'}
 * });
 */


import React, { useState, useEffect, useCallback } from 'react';
import './index.scss'
import { CloseCircleFilled, CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

const MessageType = {
    ERROR: 'error',
    SUCCESS: 'success',
    WARN: 'warn',
    INFO: 'info',
};

const Message = ({ message, type = 'info', duration = 3000, style, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer); // 组件卸载时清除定时器
    }, []);

    const getIcon = () => {
        switch (type) {
            case MessageType.ERROR:
                return <CloseCircleFilled style={{ fontSize: '16px', color: 'red' }} className="icon" />;
            case MessageType.SUCCESS:
                return <CheckCircleFilled style={{ fontSize: '16px', color: '#32CD32' }} className="icon" />;
            case MessageType.WARN:
                return <ExclamationCircleFilled style={{ fontSize: '16px', color: '#FFA500' }} className="icon" />;
            case MessageType.INFO:
            default:
                return <ExclamationCircleFilled style={{ fontSize: '16px', color: '#007FFF' }} className="icon" />;
        }
    };

    return (
        <div>
            <div className={`message message-${type}`} style={style}>
                {getIcon()}
                {message}
            </div>
        </div>
    );
};

export function GlobalMessage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        window.showMessage = ({message, type, duration, style}) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { message, type, duration, style, id: Math.random() },
            ]);
        };
    }, []);

    const handleClose = useCallback((id) => {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    }, []);

    return (
        <>
            <div className="message-box">
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        message={message.message}
                        type={message.type}
                        duration={message.duration}
                        style={message.style}
                        onClose={() => handleClose(message.id)}
                    />
                ))}
            </div>
        </>
    );
}
```

### css代码
```scss
.message-box{
  position: fixed;
  top: 8px;
  width: 100%;
  text-align: center;
  z-index: 1000;
  pointer-events: none;
}
.message{
  display: inline-block;
  padding: 9px 12px 9px 36px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 
  0 3px 6px -4px rgba(0, 0, 0, 0.12), 
  0 9px 28px 8px rgba(0, 0, 0, 0.05);
  pointer-events: all;
  color: #333;
  margin: 20px auto 0;
  box-sizing: border-box;
  animation: slide-up 0.4s ease-out forwards;
  position: relative;
  .icon{
    top: 12px;
    left: 12px;
    position: absolute;
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(0);
    opacity: 0.5;
  }
  100% {
    transform: translateY(10px);
    opacity: 1;
  }
}
```