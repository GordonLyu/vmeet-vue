import socket from "@/utils/socket"
let baseURL = import.meta.env.VITE_BASE_API.replace('http', 'ws');


export const connect = (uid: number) => {
    socket.connect(`${baseURL}/chat/${uid}`);
}

export const close = () => {
    socket.disconnect();
}

export const onmessage = (fn: Function) => {
    socket.onmessage((res: MessageEvent) => {
        fn(res.data)
    })

}

export const send = (data: {
    from: number,
    to?: number,
    content: string,
    type: string,
    timestamp: number
}) => {
    socket.send(JSON.stringify(data));
}