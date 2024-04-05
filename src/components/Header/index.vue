<template>
    <header>
        <div class="container">
            <div class="left">
                <h2>{{ props.title }}</h2>
            </div>
            <div class="middle">
                <!-- <input type="text"> -->
                <!-- <h2>{{ props.title }}</h2> -->
            </div>
            <div class="right">
                <div class="persion">
                    <Avatar :has-dropdown="true" :src="baseURL + props.avatar" no-cache
                        :dropdown-config="dropdownConfig" :dropdown-trigger="'click'"></Avatar>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import api from '@/api';
import Avatar, { type DropdownConfig } from '@/components/Avatar/index.vue'
import { useUserInfoStore } from '@/stores/user';

const baseURL = import.meta.env.VITE_BASE_API;

const props = defineProps<{
    title: string;
    avatar?: string;
}>();

const dropdownConfig: DropdownConfig[] = [{
    name: "个人中心",
    to: `/person/${useUserInfoStore().user!.id}`
}, {
    name: '清理缓存',
    click: (e: Event) => {
        console.log(e);
        let userTemp = useUserInfoStore().user;
        let t = useUserInfoStore().token;
        localStorage.clear()
        useUserInfoStore().user = userTemp;
        useUserInfoStore().token = t;
        location.reload();
    }
}, {
    name: '退出登录',
    divided: true,
    click: () => {
        console.log("退出登录");
        useUserInfoStore().user = undefined;
        useUserInfoStore().token = '';
        api.socket.chat.close();
        location.reload();
    }
}]

</script>

<style scoped>
header {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    box-shadow: 0 0px 1px 0 #ccc;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 30px;
    width: 100%;
    height: 100%;
    margin: auto;
}

.avatar:hover {
    box-shadow: 0 0 3px 0 #ccc;
    /* transform: scale(1.05); */
    /* transition: .3s; */
}
</style>