import request from "@/utils/request"

/**
 * 获取用户之间的所有消息
 * @param id 对方用户ID
 */
export const getMessages = (id: number) => {
    return request.get(`/message/${id}`);
}


/**
 * 分页获取用户之间的消息
 * @param pageData 分页数据
 */
export const pageMessages = (pageData: { id: number, current: number, size: number }) => {
    return request.get(`/message/page`, {
        params: pageData
    });
}

/**
 * 获取用户之间的最后一条消息
 * @param uid 对方用户ID
 */
export const getLastMessage = (uid: number) => {
    return request.get(`/message/last/${uid}`);
}

/**
 * 发送消息
 * @param receiverId 接收者ID
 * @param content 消息内容
 * @param type 消息类型
 */
export const sendMessage = (receiverId: number, content: string, type: 'text' | 'img' | 'audio' | 'video' | 'tip') => {
    let sendMessageData = {
        receiverId, content, type
    }
    return request.put(`/message`, JSON.stringify(sendMessageData));
}