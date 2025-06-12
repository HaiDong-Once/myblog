
# chatGPT中连续推送数据流 SSE
[[toc]]


## http、sse、websocket区别
- `http` 是客户端发送请求，然后服务端进行响应的单向通道网络传输协议；
- `SSE`（ `Server-sent Events` ）则相反，只能是服务器向客户端发送消息，如果客户端需要向服务器发送消息，则需要一个新的 `HTTP` 请求，属于单向通道传输；
- `WebSocket` 是双工通道，服务器和客户端可以互发消息；


## 概念
`Server-Sent Events`（SSE）是一种用于在客户端和服务器之间实现单向实时通信的技术。它允许服务器向客户端发送数据，
而无需客户端发起请求。SSE 基于 HTTP 协议，使用简单的文本格式进行通信，适用于实时更新、通知和事件推送等场景。


## 工作原理
1. 客户端通过创建一个 `EventSource` 对象与服务器建立连接。
2. 服务器在建立连接后，使用 `HTTP` 响应头中的 `"Content-Type: text/event-stream"` 表示响应是 SSE 格式。
3. 服务器通过发送一系列格式为 `"event: eventName\ndata: eventData\n\n"` 的数据块来向客户端发送事件。
   - `event` 字段可选，用于指定事件名称。 
   - `data` 字段用于指定事件的数据。 
   - 每个数据块以两个换行符结尾 (`"\n\n"`)。
4. 客户端通过监听 `EventSource` 对象的 "`message`" 事件来接收服务器发送的事件数据。


## 介绍
一般来说HTTP协议是要客户端先请求服务器，服务器才能响应给客户端，无法做到服务器主动推送信息。但是，有一种变通方法，就是服务器向客户端声明，
接下来要发送的是流信息（`event-streaming`）。也就是说，发送的不是一次性的数据包，而是一个数据流，会连续不断地发送过来。这时，客户端不会关闭连接，
会一直等着服务器发过来的新的数据流，视频播放就是这样的例子。本质上，这种通信就是以流信息的方式，完成一次用时很长的下载。SSE 就是利用这种机制，使用流信息向客户端推送信息。
![图片](/images/tools/chatGPT/img_27.png)

客户端请求建立事件流类型的连接，即 `Request Headers Accept = text/event-stream。`
![图片](/images/tools/chatGPT/img_28.png)

服务端响应请求，并将`Response Headers Content-Type`设置为`text/event-stream`，证明数据将以这种类型传送。
![图片](/images/tools/chatGPT/img_29.png)


## SSE的特点
| WebSocket                                 | SSE                                           |
|-------------------------------------------|-----------------------------------------------|
| 全双工，可以同时发送和接收消息            | 单工，只能服务端单向发送消息                 |
| 独立的协议                                | 基于HTTP协议                                 |
| 协议相对复杂                              | 协议相对简单，易于理解和使用                   |
| 默认不支持断线重连                        | 默认支持断线重连                               |
| 默认支持传送二进制数据                    | 一般只用来传送文本，二进制数据需要编码后传送   |
| 不支持自定义发送的数据类型                | 支持自定义发送的数据类型                       |
| 支持CORS                                  | 不支持CORS，协议和端口都必须相同               |


## SSE的推送数据格式
- `event`: 事件类型，服务端可以自定义，默认是 `message` 事件
- `Id`: 每一条事件流的ID，在失败重传事件流的时候有重要作用
- `retry`： 浏览器连接断开之后重连的间隔时间，单位：毫秒，在自动重新连接的过程中，之前收到的最后一个事件流ID会被发送到服务端。
- `data`: 发送的数据
（每个字段K-V后面用"\n"结尾）<br>

真正的数据用data字段表示，一般放到最后，使用"\n\n"结尾。
如果数据很长，可以分成多行，最后一行用\n\n结尾，前面行都用\n结尾。
```json
data: {\n
data: "name": "xujian",\n
data: "age", 18\n
data: }\n\n
```


## 使用案例1
SSE 可以用于实现实时的通知、即时聊天、实时数据更新等场景。以下是一个简单的使用案例，展示了如何使用 SSE 在客户端实时接收服务器发送的时间数据
- 服务器端代码（Node.js）：
```js
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // 每秒向客户端发送一个时间事件
  setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    res.write(`event: time\ndata: ${currentTime}\n\n`);
  }, 1000);
}).listen(3000);

console.log('Server running at http://localhost:3000/');
```
- 客户端代码（HTML + JavaScript）：
```html
<!DOCTYPE html>
<html>
<head>
  <title>SSE Example</title>
</head>
<body>
  <h1>Server-Sent Events Example</h1>
  <div id="time"></div>

  <script>
    const timeElement = document.getElementById('time');
    const eventSource = new EventSource('http://localhost:3000/');

    eventSource.addEventListener('time', function(event) {
      const currentTime = event.data;
      timeElement.textContent = 'Current time: ' + currentTime;
    });
  </script>
</body>
</html>
```

在上面的例子中，服务器每秒向客户端发送一个时间事件，并使用 `SSE` 格式进行传输。客户端通过创建 `EventSource` 对象与服务器建立连接，
并监听 "`time`" 事件。每当服务器发送一个时间事件时，客户端的事件处理函数会更新页面上显示的当前时间。<br>
可以根据实际需求进行扩展和定制。`SSE` 提供了更多的功能，比如支持重连、错误处理等。


## 使用案例2
**客户端：** 对于大部分浏览器都通过 `EventSource API` 支持了SSE。
- 判断你的浏览器是否支持SSE：
```js
if(typeof(EventSource)!=="undefined")
{
    alert('支持')
}
else
{
    alert('不支持')
}
```
- 如果支持，编写测试页面：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

</body>
<script>
var username = 'xujian';
// 创建EventSource对象，同时建立连接
<!--服务端使用SseEmitter时使用-->
var source = new EventSource('http://localhost:8080/sseEmitter/connect/'+ username);
<!--服务端不使用SseEmitter时使用-->
<!-- var source = new EventSource('http://localhost:8080/sseEmitter/data'); -->

document.write(username + '正在连接...<br>');

// 监听连接建立完成事件
source.addEventListener('open', function (e) {
    document.write(username + '连接成功～<br>');
}, false);

// 监听连接错误事件
source.addEventListener('error', function (e) {
    document.write(username + '连接错误！<br>');
});

// 监听自定义消息推送事件，事件名称为“psh”，这个名字由服务端设置
source.addEventListener('psh', function (e) {
    document.write('收到消息：' + e.data + '<br>');
});
</script>
</html>
```

**服务端：** 如果使用了 `Springboot`，其内置了 `SseEmitter` 封装了对 `SSE` 的支持。
```ts
package com.example.springbootdemo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/sseEmitter")
public class SseEmitterController {
    private static final Map<String, SseEmitter> emitterMap = new HashMap<>();

    /**
     * 服务端不使用SseEmitter时使用
     *
     * @param response
     * @throws IOException
     */
    @GetMapping(value = "/data")
    public void getData(HttpServletResponse response) throws IOException {
        response.setContentType("text/event-stream;charset=UTF-8");
        response.getWriter().write("retry: 5000\n");
        response.getWriter().write("data: hahahaha\n\n");
        response.getWriter().flush();
        System.in.read();
    }

    /**
     * 服务端使用SseEmitter时使用
     * @param username
     * @return
     * @throws IOException
     */
    @GetMapping(value = "/connect/{username}", produces = "text/event-stream;charset=UTF-8")
    public SseEmitter connect(@PathVariable String username) throws IOException {
        SseEmitter sseEmitter = new SseEmitter(0L);
        sseEmitter.onCompletion(() -> {
            System.out.println(username + "连接结束！");
            emitterMap.remove(username);
        });
        sseEmitter.onError((t) -> {
            System.out.println(username + "连接出错！错误信息：" + t.getMessage());
            emitterMap.remove(username);
        });
        sseEmitter.onTimeout(() -> {
            System.out.println(username + "连接超时！");
            emitterMap.remove(username);
        });
        emitterMap.put(username, sseEmitter);

        sseEmitter.send("连接建立成功");
        return sseEmitter;
    }

    /**
     * 服务端使用SseEmitter时使用
     *
     * @param username
     * @return
     * @throws IOException
     */
    @GetMapping(value = "/send/{username}")
    public String send(@PathVariable String username) throws IOException {
        SseEmitter sseEmitter = emitterMap.get(username);
        if (sseEmitter == null) {
            return "没查询到该用户的连接！";
        }
        sseEmitter.send(SseEmitter.event().name("psh").data("Hello～"));
        return "发送成功～";
    }

    /**
     * 服务端使用SseEmitter时使用
     *
     * @return
     * @throws IOException
     */
    @GetMapping(value = "/sendAll")
    public String sendAll() throws IOException {
        for (SseEmitter sseEmitter : emitterMap.values()) {
            sseEmitter.send(SseEmitter.event().name("psh").data("Hello～"));
        }
        return "发送完成～";
    }
}

```

## 参考地址
- 参考地址： [https://blog.csdn.net/qq_18515155/article/details/126085205](https://blog.csdn.net/qq_18515155/article/details/126085205)
- 参考地址： [https://blog.csdn.net/weixin_44761091/article/details/124266235](https://blog.csdn.net/qq_18515155/article/details/126085205)