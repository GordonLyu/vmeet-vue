<template>
    <div class="main">
        <div class="select -scrollbar">
            <div class="list">
                <div :class="`item ${actionIndex == index ? 'action' : ''}`" @click="to(item.path, index)"
                    v-for="item, index in selectList">
                    <el-icon size="30">
                        <Icon :icon="item.icon"></Icon>
                    </el-icon>
                    <span>{{ item.title }}</span>
                </div>
            </div>
        </div>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { getRouter } from '@/utils/URLUtil'

const actionIndex = ref(0)

const selectList = ref<any[]>([])

const to = (url: string, index: number) => {
    actionIndex.value = index;
    router.push("/settings/" + url);
}

onMounted(() => {
    getRouter('/settings')?.children.forEach(item => {
        selectList.value!.push({
            path: item.path,
            ...item.meta!
        });
    })
})
</script>

<style scoped>
.main {
    display: flex;
    justify-content: space-between;
}

.select {
    width: 250px;
    box-sizing: border-box;
    padding: 20px 10px;
    overflow-y: auto;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.list .item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 1.1em;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 0 2px 0 #ccc;
    transition: .3s;
}

.list .item:hover {
    background-color: #f5f5f5;
}

.list .item.action {
    background-color: var(--light-gray);
    box-shadow: var(--default-shadow);
}

.content {
    flex: 1;
}
</style>