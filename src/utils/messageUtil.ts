import api from '@/api';
import { useLiveStore } from '@/stores/live';
import { useUserInfoStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { h } from 'vue'

/** 
 * 格式化最后一条消息
 * @returns {string} 格式化后字符串
 */
export const formLastMessage = (content: string, type: 'image' | 'video' | 'text' | 'file') => {
    if (type == 'image') {
        return '[图片消息]'
    } else if (type == 'video') {
        return '[视频消息]'
    } else if (type == 'file') {
        return '[文件消息]'
    } else {
        return content;
    }
}

/**
 * 接收通话通知
 * @param id 用户id
 * @param nickname 用户名
 * @param type 通话类型
 * @param people 人员类型
 */
export const liveMessage = (id: number, nickname: string, type: '视频' | '语音') => {
    const answer = () => {
        let myID = useUserInfoStore().user!.id;
        useLiveStore().openVideoChatPage(myID, id, nickname);
        elMessage.close();
    }
    const handUp = () => {
        elMessage.close();
        api.socket.live.stopStream();
    }

    const elMessage = ElMessage({
        duration: 0,
        message: h('div', { class: 'live-message' }, [
            h('p', null, `${nickname} 给你发起了 ${type}通话`),
            h('div', { class: 'btns' }, [
                h('div', { class: 'btn', onClick: answer, }, '接听'),
                h('div', { class: 'btn', style: 'color: red', onClick: handUp }, '挂断'),
            ])
        ]),
    })
    return {
        handUp, elMessage
    }
}