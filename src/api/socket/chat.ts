import socket from "@/utils/socket"
let baseURL = import.meta.env.VITE_BASE_API.replace('http', 'ws');


export const connect = async (uid: number) => {
    await socket.connect(`${baseURL}/chat/${uid}`);
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
    id?: number;
    from: number;
    to?: number;
    content: string;
    type: string;
    timestamp: number;
    originalFilename?: string;
    size?: number;
}) => {
    socket.send(JSON.stringify(data));
}