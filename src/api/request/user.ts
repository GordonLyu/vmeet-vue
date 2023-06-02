import type { Login, Register } from "@/types/User"
import request from "@/utils/request"

/**
 * 登录
 * @param userLogin 用户登录数据
 */
export const login = (userLogin: Login) => {
    return request.post('/user/login', JSON.stringify(userLogin))
}

/**
 * 注册
 * @param userRegister 注册数据
 */
export const register = (userRegister: Register) => {
    return request.post('/user/register', JSON.stringify(userRegister))
}

/**
 * 修改密码
 * @param PasswordData 新密码数据
 */
export const changePassword = (PasswordData: { id: number, oldPassword: string, newPassword: string }) => {
    return request.post('/user/ChangePassword', JSON.stringify(PasswordData))
}

/**
 * 修改昵称
 * @param nicknameData 新昵称数据
 */
export const changeNickname = (nicknameData: { id: number, newNickname: string }) => {
    return request.put('/user/changeNickName', JSON.stringify(nicknameData))
}

/**
 * 上传头像
 */
export const uploadAvatar = () => {

}

export const getContactList = () => {

}