<template>
    <div class="contact">
        <div class="header">
            <div class="search">
                <input type="text">
                <div class="add" @click="addContact">
                    <el-icon :size="26">
                        <Icon icon="mdi:add" />
                    </el-icon>
                </div>
            </div>
        </div>
        <div class="list -scrollbar" v-loading="loading">
            <div v-for="item, index in contacts" @click="selected(index, item)" :key="item.id"
                :class="`item ${actionIndex == index ? 'action' : ''}`">
                <div class="avatar">
                    <el-avatar :src="baseURL + item.avatar"></el-avatar>
                </div>
                <div class="content">
                    <div class="name">{{ item.nickname }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '@/api';
import type { User } from '@/types/User';
import { Icon } from '@iconify/vue/dist/iconify.js';

const baseURL = import.meta.env.VITE_BASE_API;

const emit = defineEmits(['selected'])

const actionIndex = ref(-1)
const contacts = ref<User[]>([]);
const loading = ref(true);

const selected = (index: number, user: User) => {
    if (actionIndex.value == index) {
        actionIndex.value = -1;
        emit('selected', null);
        return;
    }
    actionIndex.value = index;
    emit('selected', user);
}

const addContact = () => {
    
}

onMounted(() => {
    api.contact.getContacts().then((res: any) => {
        contacts.value = res.data;
        loading.value = false;
    })
})


</script>

<style scoped>
.contact {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-bottom: 15px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 0 1px 0 #ccc;
}

.header {
    display: grid;
    place-items: center;
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 0;
    box-shadow: 0 0 1px 0 #ccc;
}

.header .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
}

.header .search input {
    width: 80%;
    outline: none;
    border: none;
    box-sizing: border-box;
    padding: 10px 20px;
    font-size: 1.1em;
    border-radius: 50px;
    box-shadow: 0 0 5px 0 #ccc;
}


.header .search .add {
    display: grid;
    place-items: center;
    background-color: #eee;
    border-radius: 50px;
    cursor: pointer;
    transition: .2s;
}

.header .search .add:hover {
    background-color: #ccc;
}

.list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    padding-right: 30px;
    overflow-y: auto;
    box-shadow: 0 0 1px 0 #ccc;
}

.list .item {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    box-sizing: border-box;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0px 1px 1px 0 #eee;
    transition: .3s;
}

/* .list .item.has-msg::before {
    position: absolute;
    top: -5px;
    right: -5px;
    display: flex;
    justify-content: center;
    align-items: center;
    content: attr(num);
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: red;
} */

.list .item:hover {
    background-color: #f8f8f8;
}

.list .item.action {
    box-shadow: var(--default-shadow);
    transform: translate(10px);
}

.list .item::before {
    opacity: 0;
    position: absolute;
    margin: auto 0;
    left: 4px;
    top: 0;
    bottom: 0;
    display: block;
    content: '';
    width: 6px;
    height: 0%;
    background-color: #0086ff;
    box-shadow: 2px 2px 5px 0 #003e75 inset, -2px -2px 5px 0 #bde0ff inset;
    border-radius: 10px;
    transition: .2s;
}

.list .item.action::before {
    opacity: 1;
    height: 80%;
}

.list .item .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    overflow: hidden;
}

.list .item .content {
    display: flex;
    width: 0%;
    flex: 1;
    flex-direction: column;
    justify-content: center;
}

.list .item .content .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
}

.list .item .content p {
    margin: 0;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8em;
    color: #555;
}

.list .item .time {
    text-align: end;
    flex: 1;
    font-size: 0.8em;
    color: #ccc;
}
</style>