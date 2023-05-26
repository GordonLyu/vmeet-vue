import socket from "@/utils/socket"
let baseURL = import.meta.env.VITE_BASE_IP_API;


export const connect = () => {
    socket.connect(`ws//${baseURL}/live/`);
}

export const close = () => {
    
}

export const onmessage = () => {
    
}