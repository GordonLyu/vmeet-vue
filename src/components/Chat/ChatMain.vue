<template>
    <div :class="`chatMain ${props.class}`">
        <div class="contain" v-if="contactUser">
            <div class="title">
                <div class="chat-user">
                    <Avatar :src="baseURL + contactUser.avatar" :username="contactUser.nickname" :has-dropdown="false">
                    </Avatar>
                </div>
                <div class="option" v-if="!props.noMore">
                    <el-icon @click="openSetting">
                        <Icon :icon="'uiw:more'"></Icon>
                    </el-icon>
                </div>
            </div>
            <div class="chatMessages -scrollbar" ref="chatMessagesRef" @scroll="chatMessagesScroll($event)">
                <div :class="`msg ${item.receiverId == uid ? 'me' : 'other'}`" v-if="messages" v-for="item in messages">
                    <div class="msg-content">
                        <p>{{ item.content }}</p>
                        <div class="time">{{ formatDate(new Date(item.timestamp).getTime()) }}</div>
                    </div>
                </div>
            </div>
            <div class="tool" v-if="!noTool">
                <div>语音</div>
                <div>视频</div>
            </div>
            <div class="input">
                <textarea class="-scrollbar" v-model="text" @keyup.alt.enter="send" ref="textareaRef"></textarea>
            </div>
            <div class="send-btn">
                <!-- <el-button @click="send">发送</el-button> -->
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
import { onMounted, ref } from 'vue';
import Avatar from '@/components/Avatar/index.vue'
import { Icon } from '@iconify/vue/dist/iconify.js';
import { formatDate } from '@/utils/timeUtil';
import api from '@/api';
import { ElMessage } from 'element-plus/lib/components/index.js';

const props = defineProps<{
    noMore?: boolean;
    noTool?: boolean;
    class?: string;
    isGroup?: boolean;
}>()

const isGroup = ref(true);

const emits = defineEmits(['openSetting'])
const messages = ref<{
    senderId: number,
    receiverId: number,
    content: string,
    type: string,
    timestamp: number
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
    let myId = JSON.parse(localStorage.getItem('user')!).id;
    api.socket.chat.send({
        from: myId,
        to: uid.value,
        content: message.content,
        type: message.type,
        timestamp: message.timestamp
    })

    // 存入数据库
    api.message.sendMessage(uid.value, text.value, 'text').then((res: any) => {
        if (res.code != 200) {
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
    from: number,
    to?: number,
    content: string,
    type: string,
    timestamp: number
}) => {
    await messages.value.push({
        senderId: data.from,
        receiverId: data.to!,
        content: data.content,
        type: data.type,
        timestamp: data.timestamp
    });
    scrollTo('bottom');
}

defineExpose({
    getMessage, sendSocketMessage
})
</script>

<style scoped>
.chatMain {
    box-sizing: border-box;
    padding: 15px 30px;
    width: 100%;
    height: 100%;
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

.msg.me .msg-content .time {
    margin-left: auto;
}

.msg.me .msg-content>p {
    background-color: #0086ff;
    margin-left: auto;
}

.tool {
    display: flex;
    gap: 10px;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 10px 10px;
    margin: auto;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: var(--default-shadow);
}

.tool div {
    cursor: pointer;
}

.input {
    width: 100%;
    height: 150px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: var(--default-shadow);
}

.input textarea {
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    outline: none;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 1.2em;
    font-family: '微软雅黑';
}

.send-btn {
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