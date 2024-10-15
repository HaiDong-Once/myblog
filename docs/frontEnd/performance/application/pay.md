

# 支付轮询可替代方案研究
[[toc]]


## 常用检查支付轮询方案
```js
const [payCheckTimer, setPayCheckTimer] = useState(null); // 轮询定时器

/**
 * 检查支付状态（订单号）
 * @param order_no 订单号
 */
const checkPayStatus = (order_no, type) =>{
    payCheckTimer && clearInterval(payCheckTimer);
    if(order_no){
        const timer = setInterval(() => {
            return new Promise((resolve, reject) => {
                request.get("/pay", {
                        action: "check_pay_.......",
                        order_no: order_no,
                        t: new Date().getTime(),
                    })
                    .then((res) => {
                        if (+res.payed === 1) {
                            payCheckTimer && clearInterval(payCheckTimer);
                            timer && clearInterval(timer);
                            // 普通浏览器支付成功
                            if(type === 1){
                                kbnClickAna('pc评价页牌匾扫码支付成功')
                                PinganAna.fire(5357)
                                setPayStatus(3)
                            }
                            resolve();
                        }
                    })
                    .catch((error) => {
                        console.error('Error checking payment status:', error);
                        payCheckTimer && clearInterval(payCheckTimer);
                        timer && clearInterval(timer);
                        reject(error);
                    });
            });
        }, 2000);
        setPayCheckTimer(timer)
    }
}
```

## 可替代方案
### 使用Websocket
Websocket提供了一个双向通信的通道，服务器可以在支付状态改变时主动向客户端发送消息，需要服务端支持。
```js
// 假设 wsUrl 是你的 WebSocket 服务的 URL
const socket = new WebSocket(wsUrl);

socket.onopen = function(e) {
  console.log("Connection established");
  // 发送订单号到服务器，让服务器知道要监控哪个订单的支付状态
  socket.send(JSON.stringify({ order_no: order_no }));
};

socket.onmessage = function(event) {
  console.log(`Data received from server: ${event.data}`);
  let res = JSON.parse(event.data);
  if (+res.payed === 1) {
    // 普通浏览器支付成功
    if(type === 1){
      kbnClickAna('pc评价页牌匾扫码支付成功')
      PinganAna.fire(5357)
      setPayStatus(3)
    } else {
      kbnClickAna('pc评价页报告扫码支付成功')
      PinganAna.fire(5358)
      setPayStatus(4)
    }
  }
};

socket.onerror = function(error) {
  console.log(`WebSocket error: ${error}`);
};

// 你可能还需要处理连接关闭的情况
socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`Connection closed cleanly, 
    code=${event.code} reason=${event.reason}`);
  } else {
    console.log('Connection died');
  }
};
```

### 使用长轮询（Long Polling）
长轮询是一种HTTP轮询的变种，客户端发送一个请求到服务器，如果服务器没有可用的数据，那么它就会保持这个请求打开，
直到有数据可用。这种方式也比原始的轮询更高效。减少了无用的 HTTP 请求。
#### 普通轮训与长轮训区别
**setInterval和长轮询（或者说递归的setTimeout）在某些情况下都可以用来实现轮询，但它们之间存在一些关键的区别：**

1. 并发请求的控制： 使用setInterval，你将在每个指定的时间间隔发起一个新的请求，而不管上一个请求是否已经完成。
这可能会导致并发请求的数量增加，尤其是当服务器响应时间慢或者网络状况不佳的时候。而使用长轮询或递归的setTimeout，
新的请求将在上一个请求完成之后才发起，这样可以避免并发请求的问题。
2. 服务器压力： 由于setInterval无视请求的完成情况，如果服务器处理请求的速度跟不上请求发送的速度，可能会导致服务器压力增加。
而长轮询或递归的setTimeout则可以根据服务器的处理速度动态调整请求的频率。
3. 错误处理： 使用setInterval，如果一个请求出错，其他的请求还会继续进行。而使用长轮询或递归的setTimeout， 
你可以在一个请求出错时停止后续的请求，或者进行一些恢复操作，然后再继续请求。

```js
function checkPayStatus(order_no, type) {
    request.get("/pay", {
        action: "check_pay_status_by_order",
        order_no: order_no,
        t: new Date().getTime(),
    })
    .then((res) => {
        if (+res.payed === 1) {
            // 普通浏览器支付成功
            if(type === 1){
                kbnClickAna('pc评价页牌匾扫码支付成功')
                PinganAna.fire(5357)
                setPayStatus(3)
            } else {
                kbnClickAna('pc评价页报告扫码支付成功')
                PinganAna.fire(5358)
                setPayStatus(4)
            }
        } else {
            // 如果支付状态还未改变，过2秒再次请求
            setTimeout(() => {
                checkPayStatus(order_no, type);
            }, 2000);
        }
    })
    .catch((error) => {
        console.error('Error checking payment status:', error);
        // 如果出现错误，过2秒再次请求
        setTimeout(() => {
            checkPayStatus(order_no, type);
        }, 2000);
    });
}

// 使用方式
checkPayStatus(order_no, type);
```

### 使用服务器发送事件（Server Sent Events）
服务器发送事件是一种允许服务器向客户端推送事件的技术。它可以用来替代轮询，当支付状态改变时，服务器可以发送一个事件到客户端。
#### 服务器端（Node.js）
```js
const express = require('express');
const app = express();

app.get('/payment-status', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 这里只是一个示例，你应该根据实际的支付状态来发送事件
    setInterval(() => {
        const paymentStatus = getPaymentStatus(); // 获取支付状态的函数
        res.write(`data: ${JSON.stringify(paymentStatus)}\n\n`);
    }, 2000);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

#### 客户端（JavaScript）
```js
const eventSource = new EventSource('http://localhost:3000/payment-status');

eventSource.onmessage = function(event) {
    const paymentStatus = JSON.parse(event.data);
    // 在这里处理支付状态
    console.log(paymentStatus);
};

eventSource.onerror = function(error) {
    console.log('Error!', error);
};


```