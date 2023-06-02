<template>
    <div class="chat">
        <div class="contact" v-loading="loading.contact">
            <Contact :list="contacts" @get-uid="test"></Contact>
        </div>
        <div class="chatMain" v-if="ChatToUser" v-loading="loading.chatMain">
            <ChatMain :message="messages" :user="ChatToUser" @open-setting="open"></ChatMain>
        </div>
        <div :class="`chatSetting ${isOpenChatSetting ? 'open' : ''}`" v-if="ChatToUser" v-loading="loading.chatMain">
            <ChatSetting @close="close">

            </ChatSetting>
        </div>
    </div>
</template>

<script setup lang="ts">
import Contact from '@/components/Chat/Contact.vue';
import ChatMain from '@/components/Chat/ChatMain.vue';
import ChatSetting from '@/components/Chat/ChatSetting.vue';
import { onMounted, ref } from 'vue';
import api from '@/api';
import type { User } from '@/types/User';

const isOpenChatSetting = ref(true);
const ChatToUser = ref<User>()
const loading = ref({
    contact: true,
    chatMain: true
})

onMounted(() => {
    api.mockContact.getContacts(1).then((res: any) => {
        contacts.value = res;
        // console.log(contacts.value);
        loading.value.contact = false;
    })

})
interface Contact {
    id: number,
    username: string,
    avatar: string,
    lastMessage: string,
    date: number,
    num: number
}
interface Message {
    id: number,
    sendId: number,
    receiveId: number,
    content: string,
    date: number
}
const messages = ref<Message[]>([])
const contacts = ref<Contact[]>([]);

const open = () => {
    isOpenChatSetting.value = !isOpenChatSetting.value;
}

const close = () => {
    isOpenChatSetting.value = false;
}

const test = (uid: number) => {
    loading.value.chatMain = true;
    api.mockUser.getOne(uid).then((res: any) => {
        // console.log(res);
        ChatToUser.value = {
            id: res.id,
            username: res.username,
            avatar: res.avatar
        }
    })
    api.mockMessage.getMessage(uid).then((res: any) => {
        messages.value = res;
        loading.value.chatMain = false;
    })
}


</script>
<style>
html,
body,
#app {
    height: 100%;
}
</style>

<style scoped>
.contact {
    width: 300px;
    height: 100%;
    transition: .3s;
}

@media screen and (max-width: 950px) {
    .contact {
        width: 0;
    }
}


.chat {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 500px;
}

.chatMain {
    flex: 1;
    height: 100%;
}

.chatSetting {
    width: 0px;
    overflow: hidden;
    transition: .2s;
}

.chatSetting.open {
    width: 300px;
}
</style>