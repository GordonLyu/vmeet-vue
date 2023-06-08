<template>
    <div class="menu">
        <div class="contain">
            <div class="header">
                <div class="logo"><span>V</span><span>Meet</span></div>
            </div>
            <div class="list -scrollbar">
                <el-menu default-active="1" :collapse="true" @select="selected">
                    <el-menu-item v-for="item in list" :index="item.index" :route="item.to" @click="to(item)">
                        <el-icon v-if="item.icon">
                            <Icon :icon="item.icon" />
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { onMounted, ref } from 'vue';

interface menuItem {
    index: string,
    title: string,
    icon: string,
    to: string
}

const emits = defineEmits(['itemData'])

const selected = (e: any) => {
    console.log(e);

}

const list = ref([{
    index: '1',
    title: '聊天',
    icon: 'fluent:chat-12-regular',
    to: '/chat'
}, {
    index: '2',
    title: '联系人',
    icon: 'fluent-mdl2:contact-list',
    to: '/contact'
}, {
    index: '3',
    title: '朋友圈',
    icon: 'tabler:message-circle-share',
    to: '/moments'
}, {
    index: '4',
    title: '设置',
    icon: 'uil:setting',
    to: '/settings/account'
}])

const to = (item: menuItem) => {
    router.push({
        path: item.to
    })
    emits('itemData', item);
}

onMounted(() => {
    router.currentRoute.value.path
})
</script>

<style scoped>
:deep(.el-menu) {
    border: none;
}

.logo {
    display: inline;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 5px;
    background-color: #fff;
    user-select: none;
    transform: scale(0.7);
}

.logo span {
    box-sizing: border-box;
}

.logo span:nth-of-type(1) {
    padding: 2px;
    color: #0db8de;
}

.logo span:nth-of-type(2) {
    padding: 2px;
    background-color: #0db8de;
    border-radius: 4px;
    color: #fff;
}

.menu {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1px 0 #ccc;
}

.contain {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    box-shadow: 0 1px 1px 0 #eee;
}

.list {
    flex: 1;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 15px 0;
    overflow-y: auto;
}
</style>