<template>
    <div class="chatMain">
        <div class="title">
            <div class="chat-user">
                <Avatar :src="props.user.avatar" :username="props.user.username" :has-dropdown="false"></Avatar>
            </div>
            <div class="option">
                <el-icon>
                    <Icon :icon="'uiw:more'"></Icon>
                </el-icon>
            </div>
        </div>
        <div class="chatMessages -scrollbar" ref="chatMessagesRef">
            <div :class="`msg ${item.uid == 1 ? 'me' : 'other'}`" v-for="item in msgs">
                <div class="msg-content">
                    <p>{{ item.msg }}</p>
                    <div class="time">{{ formatDate(new Date(item.date).getTime()) }}</div>
                </div>
            </div>
        </div>
        <div class="tool">
            <div>语音</div>
            <div>视频</div>
        </div>
        <div class="input">
            <textarea class="-scrollbar" v-model="text" @keyup.alt.enter="send" ref="textareaRef"></textarea>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/User';
import { reactive, ref } from 'vue';
import Avatar from '@/components/Avatar/index.vue'
import { Icon } from '@iconify/vue/dist/iconify.js';

const props = defineProps<{
    user: User;
}>()

const text = ref('')
const chatMessagesRef = ref<HTMLDivElement>();

const send = async () => {
    if (text.value == '') {
        return;
    }
    text.value = text.value.trim();
    console.log(text.value.split('\n'));

    await msgs.push({
        uid: 1,
        date: new Date().toUTCString(),
        msg: text.value
    })
    text.value = '';
    toBottom();

}

const toBottom = () => {
    chatMessagesRef.value?.scrollTo({
        top: chatMessagesRef.value.scrollHeight
    })
}

// 日期格式化
const formatDate = (timestamp: number) => {
    let fixedDuration = 3 * 60 * 1000;
    let duration = new Date().getTime() - timestamp;
    if (duration < 60 * 1000) {
        return '刚刚'
    } else if (duration < fixedDuration) {
        return `${(duration / (60 * 1000)).toFixed()}分钟前`
    }
    let date = new Date(timestamp);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} 
        ${date.getHours()}:${date.getMinutes()}`
}


const msgs = reactive([{
    uid: 1,
    date: '2023.5.23 12:40',
    msg: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
}, {
    uid: 2,
    date: '2023.5.23',
    msg: '23333333333333333333333333333333'
}, {
    uid: 1,
    date: '2023.5.23',
    msg: '嗡嗡嗡'
}, {
    uid: 1,
    date: '2023.5.23',
    msg: '哇哇哇'
}, {
    uid: 1,
    date: '2023.5.23',
    msg: '哇哇哇'
}])

</script>

<style scoped>
.chatMain {
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-sizing: border-box;
    padding: 15px 0;
    width: 100%;
    height: 100%;
    /* background-color: var(--light-gray); */
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2em;
    width: 95%;
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
    /* flex: 3; */
    gap: 20px;
    width: 95%;
    height: 500px;
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
    width: 95%;
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
    width: 95%;
    flex: 1;
    /* height: 200px; */
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
</style>