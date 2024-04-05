<template>
    <div :class="`chatMain ${props.class}`">
        <div class="contain" v-if="contactUser">
            <div class="title">
                <div class="chat-user">
                    <Avatar :src="baseURL + contactUser.avatar" no-cache :username="contactUser.nickname"
                        :has-dropdown="false">
                    </Avatar>
                </div>
                <div class="option" v-if="!props.noMore">
                    <el-icon @click="openSetting">
                        <Icon :icon="'uiw:more'"></Icon>
                    </el-icon>
                </div>
            </div>
            <div class="chatMessages -scrollbar" ref="chatMessagesRef" @scroll="chatMessagesScroll($event)">
                <template v-for="item in messages">
                    <div :class="`msg ${item.receiverId == uid ? 'me' : 'other'}`" v-if="messages">
                        <div class="msg-content">
                            <p v-if="item.type == 'text'">{{ item.content }}</p>
                            <img v-else-if="item.type == 'image'" :src="baseURL + item.content" alt=""
                                @load="imgLoading">
                            <div class="file" v-else-if="item.type == 'file'">

                                <div class="desc">
                                    <p class="file-name">{{ item.originalFilename }}</p>
                                    <p class="file-size">{{ formatFileSize(item.size!) }}</p>
                                </div>
                                <div class="icon" style="width: 50px; position: relative;">

                                    <el-icon size="50px" class="icon-download">
                                        <Icon :icon="'mdi:download'"></Icon>
                                    </el-icon>
                                    <el-icon size="50px" class="icon-file">
                                        <Icon :icon="'mdi:file'"></Icon>
                                    </el-icon>
                                    <a :href="baseURL + `/file/download/${item.id}`" style="display: block; position: absolute;
                                        top: 0;left: 0; width: 100%;height: 100%;"></a>
                                </div>
                            </div>
                            <div class="time">{{ formatDate(new Date(item.timestamp).getTime()) }}</div>
                        </div>
                    </div>
                </template>
            </div>

            <div class="input">
                <div class="tool" v-if="!noTool">
                    <el-tooltip :content="item.desc" placement="top" v-for="item in tools">
                        <div @click="item.action">
                            <Upload :class="'upload'" v-if="item.type" :hidden="false"
                                @get-file="getFile($event, item!.type!)" :ref="setUploadRefs">
                            </Upload>
                            <el-icon size="25px">
                                <Icon :icon="item.icon"></Icon>
                            </el-icon>
                        </div>
                    </el-tooltip>
                    <V3Emoji class="emoji" :recent="true" @click-emoji="appendText" :fulldata="true" v-model="text">
                        <el-tooltip :content="'emoji'" placement="top">
                            <el-icon size="25px">
                                <Icon :icon="'mdi:emoticon-happy-outline'"></Icon>
                            </el-icon>
                        </el-tooltip>
                    </V3Emoji>
                </div>
                <textarea class="-scrollbar" v-model="text" @keyup.alt.enter="send" ref="textareaRef"></textarea>
            </div>


            <div class="send-btn">
                <!-- <el-button @click="send">发送</el-button> -->
                <!-- <span style="padding: 0 20px;color: #aaa;">{{ text.length }}/300</span> -->
                <button @click="send">
                    <div class="svg-wrapper-1">
                        <div class="svg-wrapper">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                    fill="currentColor"></path>
                            </svg>
                        </div>
                    </div>
                    <span>发送</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type VNodeRef } from 'vue';
import Avatar from '@/components/Avatar/index.vue'
import { Icon } from '@iconify/vue/dist/iconify.js';
import { formatDate } from '@/utils/timeUtil';
import { formatFileSize } from '@/utils/fileUtil'
import api from '@/api';
import { ElMessage } from 'element-plus';
import Upload, { type UploadRefInstance } from '@/components/Upload/Upload.vue';
import V3Emoji from 'vue3-emoji'
import { useUserInfoStore } from '@/stores/user';
import { useLiveStore } from '@/stores/live';

const uploadRefs = ref<UploadRefInstance[]>([]);

const setUploadRefs = (el: UploadRefInstance) => {
    uploadRefs.value.push(el)
    return undefined
}

const checkMessageType = (item: any) => {
    let type = item.type;
    return
}

const imgLoading = () => {
    if (currentPage.value == 1) {
        scrollTo('bottom')
    }

}



const props = defineProps<{
    noMore?: boolean;
    noTool?: boolean;
    class?: string;
    isGroup?: boolean;
}>()

const isGroup = ref(true);

// 工具栏选项
const tools = ref([{
    icon: 'mdi:microphone',
    desc: '语音通话'
}, {
    icon: 'mdi:message-video',
    desc: '视频通话',
    action() {
        let myID = useUserInfoStore().user!.id;
        useLiveStore().openVideoChatPage(myID, uid.value, contactUser.value.nickname);
    }
}, {
    icon: 'mdi:image-area',
    desc: '发送图片',
    type: 'image',
}, {
    icon: 'mdi:file',
    desc: '发送文件',
    type: 'file',
}])

const emits = defineEmits(['openSetting'])
const messages = ref<{
    id?: number;
    senderId: number;
    receiverId: number;
    content: string;
    type: string;
    timestamp: number;
    originalFilename?: string;
    size?: number;
}[]>([])

const openSetting = () => {
    emits('openSetting')
}

const baseURL = import.meta.env.VITE_BASE_API;
const contactUser = ref();
const uid = ref(-1);
const text = ref('');
const currentPage = ref(1);
const chatMessagesRef = ref<HTMLDivElement>();

interface ChatSocket {
    code: number,
    msg: string,
    data: {
        from: number,
        to?: number,
        content: string,
        type: string,
        timestamp: number
    }
}

const send = async () => {
    // if (text.value.length > 300) {
    //     ElMessage({
    //         type: 'error',
    //         message: '内容不能超过300字符！'
    //     })
    //     return;
    // }
    text.value = text.value.trim();
    console.log(text.value.split('\n'));
    if (text.value == '') {
        return;
    }

    let message = {
        senderId: 0,
        receiverId: uid.value,
        content: text.value,
        type: 'text',
        timestamp: new Date().getTime()
    };

    // 实时通讯
    let myId = useUserInfoStore().user!.id;
    try {
        api.socket.chat.send({
            from: myId,
            to: uid.value,
            content: message.content,
            type: message.type,
            timestamp: message.timestamp
        })
    } catch (e) { }

    // 存入数据库
    api.message.sendMessage(uid.value, text.value, 'text').then((res: any) => {
        if (res.code == 500) {
            ElMessage({
                type: 'error',
                message: '发送失败，服务器发生一些问题'
            })
        } else if (res.code == 400) {
            ElMessage({
                type: 'error',
                message: res.msg
            })
        } else if (res.code != 200) {
            ElMessage({
                type: 'error',
                message: '发送失败，服务器可能发生一些问题'
            })
        }
    })
    text.value = '';

    // await messages.value.splice(0, messages.value.length);
    await messages.value.push(message);
    // await pageMessages(uid.value);
    scrollTo('bottom');
}

const scrollTo = (position: 'top' | 'bottom') => {
    if (!chatMessagesRef.value!) {
        return
    }
    let scrollHeight = position == 'top' ? 0 : chatMessagesRef.value!.scrollHeight;
    chatMessagesRef.value?.scrollTo({
        top: scrollHeight
    })
}

// e获取moji
const appendText = (emoji: any) => {
    text.value = text.value + emoji.emoji;
    console.log(emoji);


}

// 获取文件
const getFile = (file: File, type: "file" | "audio" | "image" | string) => {
    api.file.sendFile(file, uid.value, type).then(async (res: any) => {
        if (res.code == 200) {
            let myId = useUserInfoStore().user!.id;
            let message = {
                senderId: myId,
                receiverId: uid.value,
                content: res.data,
                type: type,
                timestamp: new Date().getTime(),
            }
            await messages.value.push(message)
            await api.socket.chat.send({
                from: myId,
                to: uid.value,
                content: message.content,
                type: message.type,
                timestamp: message.timestamp
            })
            messages.value.splice(0, messages.value.length);
            currentPage.value = 1;
            await pageMessages(uid.value);
            scrollTo('bottom');
        } else {
            ElMessage({
                type: "error",
                message: res.msg
            })
        }

        uploadRefs.value.forEach((el) => {
            el.clearFiles();
        })

    })
}

const download = (mid: number) => {
    api.file.downloadFile(mid);
}

const getMessage = async (_contactUser: {
    id: number;
    avatar: string;
    nickname: string;
} | undefined) => {
    contactUser.value = _contactUser;
    if (_contactUser == undefined) {
        return;
    }
    uid.value = _contactUser.id;
    messages.value.splice(0, messages.value.length);
    currentPage.value = 1;
    await pageMessages(_contactUser.id);
    scrollTo('bottom');
}

const pageMessages = async (uid: number) => {
    await api.message.pageMessages({ id: uid, current: currentPage.value, size: 10 }).then((res: any) => {
        console.log(res.data);

        messages.value?.splice(0, 0, ...res.data.list);
    })
}

export interface ChatMainInstance {
    getMessage: Function;
    sendSocketMessage: Function;
}

const chatMessagesScroll = async (e: Event) => {
    let tmpHeight: number = chatMessagesRef.value?.scrollHeight!;
    if (chatMessagesRef.value?.scrollTop == 0) {
        currentPage.value++;
        await pageMessages(uid.value);
        chatMessagesRef.value.scrollTo({
            top: chatMessagesRef.value.scrollHeight - tmpHeight
        })
    }
}

const sendSocketMessage = async (data: {
    id: number,
    from: number,
    to?: number,
    content: string,
    type: string,
    timestamp: number,
    originalFilename?: string,
    size?: number
}) => {
    console.log(data.type);

    if (data.type == 'file') {
        await setTimeout(() => {
            api.message.pageMessages({ id: uid.value, current: 1, size: 10 }).then((res: any) => {
                console.log(res.data);
                messages.value?.splice(messages.value.length - 1, 0, res.data.list[9]);
            })
        }, 200)
    } else {
        await messages.value.push({
            id: data.id,
            senderId: data.from,
            receiverId: data.to!,
            content: data.content,
            type: data.type,
            timestamp: data.timestamp,
            originalFilename: data.originalFilename,
            size: data.size
        });
    }


    scrollTo('bottom');
}

defineExpose({
    getMessage, sendSocketMessage
})
</script>

<style scoped>
.upload {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.upload :deep(.el-upload) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.chatMain {
    box-sizing: border-box;
    padding: 15px 30px;
    width: 100%;
    height: 100%;
    word-break: break-all;
    word-wrap: break-word;
    /* background-color: var(--light-gray); */
}

.contain {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: auto;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2em;
    width: 100%;
    height: 40px;
    margin: auto;
}

.title .chat-user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.title .option {
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.chatMessages {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 0 auto;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: var(--default-shadow);
}

.msg {
    width: 100%;
}

.msg-content {
    display: flex;
    flex-direction: column;
    width: 100%;
}


.msg .msg-content>p {
    max-width: 80%;
    box-sizing: border-box;
    margin: 0;
    padding: 10px;
    border-radius: 6px;
    word-wrap: break-word;
}

.msg .msg-content>img {
    display: block;
    min-width: 350px;
    max-width: 50%;
    width: auto;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 #eee;
}

.msg .msg-content>.file {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 250px;
    width: 25%;
    height: 80px;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #0086ff;
    overflow: hidden;
}

.msg .msg-content>.file .desc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    padding: 10px 10px;
    word-break: break-all;
}

.msg .msg-content>.file .icon {
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition: .3s;
    cursor: pointer;
    color: #252525;
    overflow: hidden;
}

.msg .msg-content>.file .icon .icon-file,
.msg .msg-content>.file .icon .icon-download {
    /* overflow: hidden; */
    transition: .3s;
    transform: translateY(-50px);
}

.msg .msg-content>.file .icon:hover .icon-file {
    height: 0;
    transform: translateY(50px);

}

.msg .msg-content>.file .icon:hover .icon-download {
    /* transform: translateY(-200%); */
    transform: translateY(0px);
}

.msg .msg-content>.file .desc p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.msg .msg-content .time {
    color: #ccc;
    font-size: 0.8em;
}

.msg.other .msg-content .time {
    margin-right: auto;
}

.msg.other .msg-content>p {
    background-color: #f1f2f6;
    margin-right: auto;
}

.msg.other .msg-content>img {
    background-color: #f1f2f6;
}

.msg.other .msg-content>.file {
    background-color: #f1f2f6;
}

.msg.me .msg-content .time {
    margin-left: auto;
}

.msg.me .msg-content>p {
    background-color: #0086ff;
    margin-left: auto;
}

.msg.me .msg-content>img {
    margin-left: auto;
}

.msg.me .msg-content>.file {
    margin-left: auto;
}

.tool {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0px 5px;
    margin: auto;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: var(--default-shadow);
    /* overflow-x: auto; */
}

.tool>div {
    width: 25px;
    height: 25px;
    padding: 5px 20px;
    cursor: pointer;
    color: #0086ff;
    transition: .3s;
    backdrop-filter: drop-shadow(4px 4px 2px);
    /* transform: scale(0.9)translateY(0px); */
}

.tool>div:hover {
    color: #64b6fd;
    /* transform: scale(1.05) translateY(-5px); */
    /* transform: scale(0.95) translateY(-1px) translateX(-1px); */
    border-radius: 5px;
    /* background-color: #eee; */
    box-shadow: 2px 2px 5px 0 #cacaca;

}

.emoji {
    position: sticky;
}

.input {
    width: 100%;
    height: 220px;
    margin: 0 auto;
    /* overflow: hidden; */
    border-radius: 10px;
    box-shadow: var(--default-shadow);
}

.input textarea {
    width: 100%;
    height: 80%;
    resize: none;
    border: none;
    outline: none;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 1.2em;
    font-family: '微软雅黑';
}

.send-btn {
    display: flex;
    align-items: center;
    margin-left: auto;
}


.send-btn button {
    font-family: inherit;
    font-size: 20px;
    background: #0086ff;
    color: white;
    padding: 6px 10px;
    padding-left: 3px;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
}

.send-btn button span {
    display: block;
    margin-left: 0.3em;
    font-size: 0.8em;
    transition: all 0.3s ease-in-out;

}

.send-btn button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
}

.send-btn button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
}

.send-btn button:hover svg {
    transform: translateX(1.2em) rotate(45deg) scale(1);
}

.send-btn button:hover span {
    transform: translateX(5em);
}

.send-btn button:active {
    transform: scale(0.95);
}

@keyframes fly-1 {
    from {
        transform: translateY(0.05em);
    }

    to {
        transform: translateY(-0.05em);
    }
}
</style>