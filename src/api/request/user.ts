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
 * 注册邮箱发送
 */
export const registerByEmail = () => {
    return request.post('/user/register/send-mail');
}

export const verifyMailCode = () => {

}

/**
 * 邮箱登录发送
 */
export const loginByEmail = (to: string) => {
    return request.post('/user/login/send-mail', {
        to: to
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

/**
 * 验证邮箱登录验证码
 */
export const loginEmailVerifyCode = (email: string, code: string) => {
    return request.post('/user/login/verify-mail', {
        email: email,
        code: code
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

/**
 * 修改邮箱验证码发送
 */
export const sendChangeEmailCode = (to: string) => {
    return request.post('/user/change-mail/send-mail', {
        to: to
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}


/**
 * 验证修改邮箱验证码
 */
export const verifyChangeEmailCode = (email: string, code: string) => {
    return request.post('/user/change-mail/verify-mail', {
        email: email,
        code: code
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

/**
 * 验证是否登录
 */
export const isLogin = () => {
    return request.get("/user/is-login");
}

/**
 * 修改密码
 * @param PasswordData 新密码数据
 */
export const changePassword = (PasswordData: { oldPassword: string, newPassword: string }) => {
    return request.post('/user/change-password', JSON.stringify(PasswordData))
}

/**
 * 修改昵称
 * @param nicknameData 新昵称数据
 */
export const changeNickname = (nicknameData: { newNickname: string }) => {
    return request.put('/user/change-nickname', JSON.stringify(nicknameData))
}

export const getContactList = () => {

}