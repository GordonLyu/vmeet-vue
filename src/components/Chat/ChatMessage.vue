<template>
    <div class="contact">
        <div class="header">
            <div class="title">
                消息
            </div>
            <div class="search">
                <input type="text">
            </div>
        </div>
        <div class="list -scrollbar">
            <el-badge :value="item.num ? item.num : ''" :max="99" v-for="item, index in list" @click="selected(index, item)"
                :class="`item ${actionIndex == index ? 'action' : ''}`">
                <div class="avatar">
                    <el-avatar :src="baseURL + item.avatar"></el-avatar>
                </div>
                <div class="content">
                    <div class="name">{{ item.nickname }}</div>
                    <p>{{ item.lastMessage }}</p>
                </div>
                <div class="time">{{ formatDate(item.date) }}</div>
            </el-badge>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { formatDate } from '@/utils/timeUtil';
import { formLastMessage } from '@/utils/messageUtil'
import api from '@/api';
import { useChatStore } from '@/stores/counter';
import { useUserInfoStore } from '@/stores/user';

const emit = defineEmits(['getUid'])

const list = ref<{
    id: number,
    nickname: string,
    avatar: string,
    lastMessage: string,
    date: number,
    num: number
}[]>([]);

const actionIndex = ref(-1)
const isLoaded = ref(false);

const baseURL = import.meta.env.VITE_BASE_API;

const selected = (index: number, contactUser: any) => {
    if (actionIndex.value == index) {
        actionIndex.value = -1;
        emit('getUid', undefined);
        return;
    }
    actionIndex.value = index;
    emit('getUid', contactUser)
}

onMounted(async () => {
    let id = useUserInfoStore().user!.id;
    let messageList: number[] = JSON.parse(localStorage.getItem('messageList-' + id)!);
    if (messageList != null) {
        for (let i = 0, len = messageList.length; i < len; i++) {
            let t = { lastMessage: '', date: 0 };
            await api.message.getLastMessage(messageList[i]).then((res: any) => {
                if (res.data != null) {
                    t = {
                        lastMessage: formLastMessage(res.data.content, res.data.type),
                        date: res.data.timestamp
                    }
                }
            })
            await api.contact.getOneContact(messageList[i]).then((res: any) => {
                list.value.push({
                    id: res.data.id,
                    avatar: res.data.avatar,
                    nickname: res.data.nickname,
                    lastMessage: t.lastMessage,
                    date: t.date,
                    num: 0
                })
            })
        }
        isLoaded.value = true;
        console.log(list.value);
    }
})



// 选择第一个
const selectFirst = () => {
    let t = setInterval(() => {
        if (isLoaded.value) {
            selected(0, list.value[0]);
            clearInterval(t);
            useChatStore().$state.selectFirst = false;
        }
    }, 200)
}

export interface ChatMessageInstance {
    selectFirst: Function
}

defineExpose({
    selectFirst
})


</script>

<style scoped>
.contact {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-right: 5px;
    padding-bottom: 15px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 10px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 20px;
    padding-right: 30px;
    box-shadow: 0 0 1px 0 #ccc;
}

.header .title {
    font-size: 1.1em;
    font-weight: 600;
    word-spacing: 40px;
}

.header .search {
    display: flex;
    width: 70%;
}

.header .search input {
    width: 0%;
    outline: none;
    border: none;
    margin-left: auto;
    box-sizing: border-box;
    padding: 10px 20px;
    font-size: 1.1em;
    border-radius: 50px;
    box-shadow: 0 0 5px 0 #ccc;
    transition: .3s;
}

.header .search input:focus {
    width: 100%;
}

.list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    padding-right: 30px;
    overflow-y: auto;
    box-shadow: 0 0 1px 0 #ccc;
}

.list .item {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    box-sizing: border-box;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0px 1px 1px 0 #eee;
    transition: .3s;
}

/* .list .item.has-msg::before {
    position: absolute;
    top: -5px;
    right: -5px;
    display: flex;
    justify-content: center;
    align-items: center;
    content: attr(num);
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: red;
} */

.list .item:hover {
    background-color: #f8f8f8;
}

.list .item.action {
    box-shadow: var(--default-shadow);
    transform: translate(10px);
}

.list .item::before {
    opacity: 0;
    position: absolute;
    margin: auto 0;
    left: 4px;
    top: 0;
    bottom: 0;
    display: block;
    content: '';
    width: 6px;
    height: 0%;
    background-color: #0086ff;
    box-shadow: 2px 2px 5px 0 #003e75 inset, -2px -2px 5px 0 #bde0ff inset;
    border-radius: 10px;
    transition: .2s;
}

.list .item.action::before {
    opacity: 1;
    height: 80%;
}

.list .item .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    overflow: hidden;
}

.list .item .content {
    display: flex;
    width: 0%;
    flex: 1;
    flex-direction: column;
    justify-content: center;
}

.list .item .content .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
}

.list .item .content p {
    margin: 0;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8em;
    color: #555;
}

.list .item .time {
    text-align: end;
    flex: 1;
    font-size: 0.8em;
    color: #ccc;
}
</style>