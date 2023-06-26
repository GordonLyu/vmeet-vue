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