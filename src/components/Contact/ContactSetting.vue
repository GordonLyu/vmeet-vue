<template>
    <div class="main" v-if="props.user">
        <div class="contain">
            <div class="avatar">
                <Avatar :src="baseURL + props.user?.avatar"></Avatar>
            </div>
            <div class="info">
                <div class="nickname"><span>昵称：</span>{{ props.user?.nickname }}</div>
                <div class="username"><span>用户名：</span>{{ props.user?.username }}</div>
            </div>

            <div class="chat-mode">
                <div class="text" @click="to(props.user.id, '/chat')">消息</div>
                <div class="call">音频</div>
                <div class="video">视频</div>
            </div>
            <div class="option">
                <el-button type="danger">删除联系人</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/Avatar/index.vue'
import router from '@/router';
import type { User } from '@/types/User';

const baseURL = import.meta.env.VITE_BASE_API;

const props = defineProps<{
    user?: User;
}>();

const to = (uid: number, url: string) => {
    // 使联系人出现在消息列表中,且在第一位
    let messageList: number[] = [];
    let id = JSON.parse(localStorage.getItem('user')!).id;
    if (localStorage.getItem('messageList-' + id)) {
        messageList = JSON.parse(localStorage.getItem('messageList-' + id)!);
        for (let i = 0, len = messageList.length; i < len; i++) {
            if (messageList[i] == uid) {
                messageList.splice(i, 1);
                break;
            }
        }
        messageList.splice(0, 0, uid);
    } else {
        messageList.push(uid);
    }
    localStorage.setItem('messageList-' + id, JSON.stringify(messageList));
    router.push(url);
}

</script>

<style scoped>
.main {
    width: 100%;
}

.contain {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    /* background-color: #eee; */
}

.avatar {
    margin-top: 50px;
}


:deep(.avatar) .el-avatar {
    width: 120px;
    height: 120px;
}

.info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    min-width: 80px;
    max-width: 300px;
    margin: 0 auto;
    margin-top: 20px;
}

.info div {
    color: #888;
    /* width: 50%; */
    margin: 20px 0;
}

.chat-mode {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-width: 80px;
    max-width: 300px;
    margin: 0 auto;
    margin-top: 40px;
}

.chat-mode div {
    box-sizing: border-box;
    padding: 10px 20px;
    flex-grow: 1;
    text-align: center;
    background-color: #f5f5f5;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s;
}

.chat-mode div:hover {
    background-color: #eee;
}

.option {
    width: 100%;
    min-width: 80px;
    max-width: 300px;
    margin: 0 auto;
    margin-top: 40px;
    text-align: center;
}
</style>