import request from "@/utils/request"
/**
 * 上传头像
 */
export const uploadAvatar = (File: FormData) => {
    return request.post('/upload/avatar', File, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

}