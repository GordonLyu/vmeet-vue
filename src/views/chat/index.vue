<template>
    <div class="main">
        <div class="contact">
            <Contact></Contact>
        </div>
        <div class="contain">
            <div class="header">
                <Header></Header>
            </div>
            <div class="chatMain">
                <ChatMain :user="{
                    id: 1,
                    username: '德玛西亚',
                    avatar: '/public/imgs/test.jpg'
                }"></ChatMain>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Contact from '@/components/Chat/Contact.vue';
import ChatMain from '@/components/Chat/ChatMain.vue';
import Header from '@/components/Chat/Header.vue';


</script>

<style scoped>
.main {
    display: flex;
}

.contact {
    width: 300px;
    height: 800px;
    /* overflow: hidden; */
    transition: .3s;
}

@media screen and (max-width: 950px) {
    .contact {
        width: 0;
    }
}

.contain {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 800px;
}


.header {
    height: 60px;
    box-shadow: 0 0 1px 0 #ccc;
}

.chatMain {
    flex: 1;
}
</style>