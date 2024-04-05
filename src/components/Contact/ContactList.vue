<template>
    <AddContactDialog :open="addContactDialog" @close="addContactDialog = false" />
    <div class="contact">
        <div class="header">
            <div class="search">
                <input type="text" v-model="searchText" @input="searchContact" placeholder="搜索联系人">
                <el-tooltip content="添加联系人" effect="light">
                    <div class="add" @click="addContactDialog = true" content="添加联系人">
                        <el-icon :size="26">
                            <Icon icon="mdi:add" />
                        </el-icon>
                    </div>
                </el-tooltip>
            </div>
        </div>
        <div class="list -scrollbar" v-loading="loading">

            <!-- 联系人列表 -->
            <div v-for="item, index in contacts" @click="selected(item)">
                <div :key="item.id" :class="`item ${actionIndex == item.id ? 'action' : ''}`">
                    <div class="avatar">
                        <el-avatar :src="baseURL + item.avatar + `?r=${Math.random()}`"></el-avatar>
                    </div>
                    <div class="content">
                        <div class="name">{{ item.nickname }}</div>
                        <p v-if="searching">{{ item.username }}</p>
                    </div>
                </div>
            </div>
            <el-collapse :accordion="true" @change="collapseChanged" v-model="actionCollapseName">
                <el-collapse-item title="新联系人" name="1" v-if="newContacts.length != 0">
                    <div v-for="item, index in newContacts" @click="selected(item)">
                        <div :key="item.id" :class="`item ${actionIndex == item.id ? 'action' : ''}`">
                            <div class="avatar">
                                <el-avatar :src="baseURL + item.avatar"></el-avatar>
                            </div>
                            <div class="content">
                                <div class="name">{{ item.nickname }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="newContacts.length == 0" style="text-align: center;">未有联系人申请</div>
                </el-collapse-item>
                <el-collapse-item title="已发送添加联系人申请" name="2">
                    <div v-for="item, index in appliedAddContacts" @click="selected(item)"
                        v-if="appliedAddContacts.length != 0">
                        <div :key="item.id" :class="`item ${actionIndex == item.id ? 'action' : ''}`">
                            <div class="avatar">
                                <el-avatar :src="baseURL + item.avatar"></el-avatar>
                            </div>
                            <div class="content">
                                <div class="name">{{ item.nickname }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="appliedAddContacts.length == 0" style="text-align: center;">联系人已全部同意申请添加</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '@/api';
import type { Contact } from '@/types/Contact';
import { Icon } from '@iconify/vue/dist/iconify.js';
import AddContactDialog from './components/AddContactDialog.vue'
const addContactDialog = ref(false);
const baseURL = import.meta.env.VITE_BASE_API;

const emit = defineEmits(['selected'])

const actionCollapseName = ref('0');
const actionIndex = ref(-1);
const searchText = ref('');
const tempContacts = ref<Contact[]>([]);
const contacts = ref<Contact[]>([]);
const newContacts = ref<Contact[]>([]);
const appliedAddContacts = ref<Contact[]>([]);
const loading = ref(true);

const selected = (user: Contact) => {
    if (actionIndex.value == user.id) {
        actionIndex.value = -1;
        emit('selected', null);
        return;
    }
    actionIndex.value = user.id;
    emit('selected', user);
}


onMounted(() => {
    api.contact.getContacts().then(async (res: any) => {
        contacts.value = [...res.data.filter((item: Contact) => {
            item.status = 'added';
            return item;
        })];
        loading.value = false;

        api.contact.getWaitAddContactList().then(res => {
            res.data.forEach((item: Contact) => {
                item.status = 'waitAdd'
                newContacts.value.splice(0, 0, item)
            })
            if (res.data.length != 0) {
                actionCollapseName.value = '1';
            }
        })

        api.contact.getWaitAgreeContactList().then(res => {
            res.data.forEach((item: Contact) => {
                item.status = 'waitAgree'
                appliedAddContacts.value.splice(0, 0, item)
            })

        })
    })
})

const collapseChanged = (e: string) => {
    if (e == '') {
        emit('selected', null);
    }
}

let searching = ref(false);
const searchContact = () => {
    emit('selected', null);
    let text = searchText.value;
    let t: Contact[] = [];
    if (text == '') {
        t = [...contacts.value];
        contacts.value.splice(0, contacts.value.length, ...tempContacts.value);
        searching.value = false;
    } else {
        if (!searching.value) {
            searching.value = true;
            tempContacts.value.splice(0, tempContacts.value.length, ...contacts.value);
        }
        contacts.value.splice(0, contacts.value.length);
        contacts.value.push(...tempContacts.value.filter(item => {
            if (item.nickname.includes(text) || item.username.includes(text)) {
                return item;
            }
        }))
    }

    if (contacts.value.length == 0 && text == '') {
        contacts.value = t;
    }
}


</script>

<style scoped>
:deep(.el-collapse-item__wrap) {
    padding: 10px 0;
    padding-right: 20px;
}

:deep(.el-collapse-item__content) {
    display: flex;
    flex-direction: column;
    gap: 10px;
}


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