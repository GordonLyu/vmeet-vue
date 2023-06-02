<template>
    <div>
        <div :class="`chat-box ${isAction ? 'action' : ''}`" @drag="test($event)">
            <div class="option">
                <div class="minimize" @click="isAction = false">
                    <el-icon size="20">
                        <Icon icon="mdi:minimize"></Icon>
                    </el-icon>
                </div>
            </div>
            <div class="chat">
                <ChatMain :message="msg" :user="user" :no-more="true" :no-tool="true" class="chatMain"></ChatMain>
            </div>

            <div class="expansion-box" @click="isAction = true">
                <el-icon size="30">
                    <Icon icon="material-symbols:add-box-outline"></Icon>
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from '@/api';
import ChatMain from '@/components/Chat/ChatMain.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { onMounted, ref } from 'vue';

const msg = ref<any>();
const user = ref<any>();
const isAction = ref(false);

const test = (e: DragEvent) => {
    console.log(e);

}

onMounted(() => {
    api.mockMessage.getMessage(2).then((res) => {
        msg.value = res;
    })
    api.mockUser.getOne(2).then(res => {
        user.value = res;
    })
})
</script>

<style scoped>
.chat-box {
    bottom: 20px;
    right: 20px;
    position: absolute;
    width: 50px;
    height: 50px;
    padding: 0;
    overflow: hidden;
    border-radius: 50px;
    background-color: #0086ff;
    box-shadow: 0 0 5px 0 #ccc;
    transition: .3s;
}

.chat-box.action {
    width: 340px;
    height: 600px;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--light-gray);
    box-shadow: var(--default-shadow);
}

.expansion-box {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 50px;
    opacity: 1;
    transition: .3s;
}

.expansion-box:hover {
    background-color: #ffffff55;
}

.chat-box.action .expansion-box {
    width: 0;
    height: 0;
    opacity: 0;
}

.option {
    display: flex;
    width: 0;
    box-sizing: border-box;
    padding: 0;
    overflow: hidden;
    transition: .2s;
}

.chat-box.action .option {
    width: 100%;
}


.minimize {
    cursor: pointer;
    margin-left: auto;
}

.minimize:hover {
    color: #0086ff;
}

.chat {
    opacity: 0;
    width: 0;
    height: 0;
    transition: .2s;
}

.chat-box.action .chat {
    opacity: 1;
    width: 100%;
    height: calc(100% - 20px);
}

.chatMain {
    padding: 0;
}
</style>