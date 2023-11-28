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

            <div class="chat-mode" v-if="user?.status == 'added'">
                <div class="text" @click="to(props.user.id, '/chat')">消息</div>
                <div class="call">音频</div>
                <div class="video" @click="toVideo(props.user.id)">视频</div>
            </div>
            <div class="option">
                <el-button type="success" v-if="user?.status == 'waitAdd'"
                    @click="agreeAdd(props.user.username)">添加联系人</el-button>
                <el-button type="danger" v-if="user?.status == 'waitAdd'">拒绝</el-button>
                <div v-if="user?.status == 'waitAgree'">等待对方同意添加联系人</div>
                <el-button type="danger" @click="del(props.user.id)" v-if="user?.status == 'added'">删除联系人</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from '@/api';
import Avatar from '@/components/Avatar/index.vue'
import router from '@/router';
import type { Contact } from '@/types/Contact';
import { ElMessage, ElMessageBox } from 'element-plus/lib/components/index.js';
import { useChatStore } from '@/stores/counter'
import { useUserInfoStore } from '@/stores/user';

const baseURL = import.meta.env.VITE_BASE_API;

const props = defineProps<{
    user?: Contact;
}>();

const to = (uid: number, url: string) => {
    // 使联系人出现在消息列表中,且在第一位
    let messageList: number[] = [];
    let id = useUserInfoStore().user!.id;
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
    useChatStore().$state.selectFirst = true;
    router.push(url);
}

const toVideo = (id: number) => {
    let myID = useUserInfoStore().user!.id;
    window.open(`/video-chat/${myID}?to=${id}`, "_blank", "resizable=1,height=1000,width=1600");
    window.opener = null;

}

const agreeAdd = (username: string) => {
    api.contact.addContactByUsername(username).then((res: any) => {
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '添加成功'
            })
            location.reload();
        }
        console.log(res);
    })
}


// 删除
const del = (uid: number) => {
    ElMessageBox.confirm(`是否删除该联系人（${props.user?.nickname}）？`, '删除联系人', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'chat-setting-del-confirm-button',
        type: 'warning',
    }).then(() => {
        api.contact.delOneContact(uid).then((res: any) => {
            if (res.code == 200) {
                ElMessage({
                    type: 'warning',
                    message: '已删除联系人',
                })
                location.reload();
            } else {
                ElMessage({
                    type: 'warning',
                    message: '删除联系人失败，用户不存在或服务器出现错误',
                })
            }
        })
    })
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
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    min-width: 80px;
    max-width: 300px;
    margin: 0 auto;
    margin-top: 40px;
    gap: 20px;
}
</style>