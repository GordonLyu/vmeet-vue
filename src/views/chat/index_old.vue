<template>
    <div class="main">
        <div class="menu">
            <Menu></Menu>
        </div>
        <div class="contact">
            <Contact></Contact>
        </div>
        <div class="contain">
            <div class="header">
                <Header></Header>
            </div>
            <div class="chat">
                <div class="chatMain">
                    <ChatMain :user="{
                        id: 1,
                        username: '德玛西亚',
                        avatar: '/public/imgs/test.jpg'
                    }" @open-setting="open"></ChatMain>
                </div>
                <div :class="`chatSetting ${isOpenChatSetting ? 'open' : ''}`">
                    <ChatSetting @close="close">

                    </ChatSetting>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Contact from '@/components/Chat/Contact.vue';
import ChatMain from '@/components/Chat/ChatMain.vue';
import Header from '@/components/Chat/Header.vue';
import ChatSetting from '@/components/Chat/ChatSetting.vue';
import Menu from '@/components/Menu/index.vue';
import { ref } from 'vue';

const isOpenChatSetting = ref(true);

const open = () => {
    isOpenChatSetting.value = !isOpenChatSetting.value;
}

const close = () => {
    isOpenChatSetting.value = false;
}

</script>

<style>
/* html,
body,
#app {
    height: 100%;
} */
</style>

<style scoped>
.main {
    display: flex;
    gap: 5px;
    height: 100vh;
}

.menu {
    width: 60px;
    min-height: 900px;
}

.contact {
    width: 300px;
    min-height: 900px;
    transition: .3s;
}

@media screen and (max-width: 950px) {
    .contact {
        width: 0;
    }
}

.contain {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 900px;
}


.header {
    height: 60px;
    box-shadow: 0 0 1px 0 #ccc;
}

.chat {
    display: flex;
    flex: 1;
}

.chatMain {
    flex: 1;
}

.chatSetting {
    width: 0px;
    transition: .2s;
}

.chatSetting.open {
    width: 300px;
}
</style>