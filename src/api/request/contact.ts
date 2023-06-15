import request from "@/utils/request"

/**
 * 获取所有联系人
 */
export const getContacts = () => {
    return request.get(`/contact`);
}

/**
 * 获取一位联系人
 */
export const getOneContact = (uid: number) => {
    return request.get(`/contact/${uid}`);
}

/**
 * 获取待接受添加联系人列表
 */
export const getWaitAddContactList = () => {
    return request.get('/contact/wait/add');
}

/**
 * 获取申请待被同意联系人列表
 */
export const getWaitAgreeContactList = () => {
    return request.get('/contact/wait/agree');
}

/**
 * 添加一位联系人
 * @param username 用户名
 */
export const addContactByUsername = (username: string) => {
    return request.post(`/contact/add`, JSON.stringify({ username }));
}