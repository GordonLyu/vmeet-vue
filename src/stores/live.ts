import api from "@/api";
import { ElMessage, type MessageHandler } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLiveStore = defineStore('live', () => {
    // 视频通话窗口
    const winURL = ref<WindowProxy | null>();
    // 通话通知
    const liveMessage = ref<MessageHandler | null>();

    /** 发送通知 */
    const sendNotification = (myID: number, id: number, nickname: string, type: 'open-live' | 'close-live') => {
        api.socket.chat.send({
            from: myID,
            to: id,
            content: JSON.stringify({
                nickname: nickname,
                type: '视频',
            }),
            type: type,
            timestamp: new Date().getTime()
        })
    }

    /** 打开视频通话页面 */
    const openVideoChatPage = (myID: number, id: number, nickname: string) => {
        sendNotification(myID, id, nickname, 'open-live');
        winURL.value = window.open(`/video-chat/${myID}?to=${id}`, "_blank", "resizable=1,height=1000,width=1600");
        // 判断通话窗口状态
        const loop = setInterval(() => {
            if (winURL.value && winURL.value.closed) {
                sendNotification(myID, id, nickname, 'close-live')
                ElMessage({
                    message: '已结束通话'
                })
                clearInterval(loop);
            }
        }, 500);
        window.opener = null;
    }

    const closeVideoChatPage = () => {
        winURL.value?.close();
    }
    return {
        openVideoChatPage, closeVideoChatPage, winURL, liveMessage
    }
})