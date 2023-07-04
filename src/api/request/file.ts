import request from "@/utils/request"
/**
 * 更换头像
 */
export const uploadAvatar = (file: FormData) => {
    return request.post('/file/update/avatar', file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

/**
 * 发送文件
 */
export const sendFile = (file: File, to: number, type: 'file' | 'image' | 'audio' | string = 'file') => {
    let data = new FormData();
    data.append('file', file);
    data.append('type', type);
    return request.post(`/file/send-to/${to}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const downloadFile = (mid: number) => {
    return request.get(`/file/download/${mid}`, {
        responseType: 'blob'
    })
}