<template>
    <header>
        <div class="container">
            <div class="left">
                <h2>标题</h2>
            </div>
            <div class="middle"></div>
            <div class="right">
                <div class="persion">
                    <Avatar :has-dropdown="true" :src="'/public/imgs/test.jpg'" :dropdown-config="dropdownConfig"></Avatar>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import Avatar, { type DropdownConfig } from '@/components/Avatar/index.vue'

const dropdownConfig: DropdownConfig[] = [{
    name: "个人中心",
    to: '/settings'
}, {
    name: '清理缓存',
    click: (e: Event) => {
        console.log(e);
        let t = localStorage.getItem('token');
        localStorage.clear();
        localStorage.setItem('token', t!);
        location.reload();
    }
}, {
    name: '退出登录',
    divided: true,
    click: () => {
        console.log("退出登录");
        localStorage.removeItem('token');
        location.reload();
    }
}]

</script>

<style scoped>
header {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /* padding: 0 20px; */
    box-shadow: 0 0 1px 0 #ccc;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    height: 100%;
    margin: auto;
}

.avatar:hover {
    box-shadow: 0 0 3px 0 #ccc;
    /* transform: scale(1.05); */
    /* transition: .3s; */
}
</style>