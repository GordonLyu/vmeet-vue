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



export const addContact = () => {
    return request.get(`/add`);
}