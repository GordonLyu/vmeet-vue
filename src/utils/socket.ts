let ws: WebSocket;

/**
 * 连接wesocket
 * @param url wesocket地址
 */
const connect = (url: string) => {
    ws = new WebSocket(url);
}

/**
 * 断开连接
 */
const disconnect = () => {
    ws.close();
}

/**
 * 连接时
 * @param fn 回调函数
 */
const onopen = (fn: Function) => {
    ws.onopen = (e: Event) => {
        fn(e);
    }
}

/**
 * 收到消息时
 * @param fn 回调函数
 */
const onmessage = (fn: Function) => {
    ws.onmessage = (e: MessageEvent) => {
        fn(e);
    };
}

/**
 * 出现错误时
 * @param fn 回调函数
 */
const onerror = (fn: Function) => {
    ws.onerror = (e: Event) => {
        fn(e);
    }
}

/**
 * 发送消息
 * @param msg 发送的消息
 */
const send = (msg: string) => {
    ws.send(msg);
}


export default {
    connect, disconnect, onmessage, send, onopen, onerror
}