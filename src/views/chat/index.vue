<template>
    <div class="chat">
        <div class="chat-message" v-loading="loading.contact">
            <ChatMessage @get-uid="selected" ref="ChatMessageRef"></ChatMessage>
        </div>
        <div class="chat-main">
            <ChatMain @open-setting="open" ref="chatMainRef"></ChatMain>
        </div>
        <div :class="`chat-setting ${isOpenChatSetting ? 'open' : ''}`">
            <ChatSetting @close="close"></ChatSetting>
        </div>
    </div>
</template>

<script setup lang="ts">
import ChatMessage, { type ChatMessageInstance } from '@/components/Chat/ChatMessage.vue';
import ChatMain, { type ChatMainInstance } from '@/components/Chat/ChatMain.vue';
import ChatSetting from '@/components/Chat/ChatSetting.vue';
import { onMounted, ref } from 'vue';
import api from '@/api';
import { useRoute } from 'vue-router';
import { useChatStore } from '@/stores/counter';

const chatMainRef = ref<ChatMainInstance>();
const ChatMessageRef = ref<ChatMessageInstance>()

const isOpenChatSetting = ref(false);
const loading = ref({
    contact: false,
    chatMain: false
})

const uid = ref(-1)

const open = () => {
    isOpenChatSetting.value = !isOpenChatSetting.value;
}

const close = () => {
    isOpenChatSetting.value = false;
}

const selected = (contactUser: any) => {
    chatMainRef.value?.getMessage(contactUser);
    loading.value.chatMain = true;
    if (contactUser != undefined) {
        uid.value = contactUser.id;
    }
}


onMounted(() => {
    if (useChatStore().$state.selectFirst) {
        ChatMessageRef.value?.selectFirst();
    }
})

api.socket.chat.onmessage(async (res: string) => {
    let data = JSON.parse(res).data;
    if (data.type == 'tip') {
        return;
    }
    chatMainRef.value!.sendSocketMessage(data);
})
</script>
<style>
html,
body,
#app {
    height: 100%;
}
</style>

<style scoped>
.chat-message {
    width: 300px;
    height: 100%;
    transition: .3s;
}

@media screen and (max-width: 950px) {
    .chat-message {
        width: 0;
    }
}


.chat {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 500px;
}

.chat-main {
    flex: 1;
    height: 100%;
}

.chat-setting {
    width: 0px;
    overflow: hidden;
    transition: .2s;
}

.chat-setting.open {
    width: 300px;
}
</style>