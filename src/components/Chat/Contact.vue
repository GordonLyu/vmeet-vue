<template>
    <div class="contact">
        <div class="header">
            <div class="search">
                <input type="text">
            </div>
        </div>
        <div class="list -scrollbar">
            <el-badge :value="item.num ? item.num : ''" :max="99" v-for="item, index in props.list"
                @click="selected(index, item.id)" :class="`item ${actionIndex == index ? 'action' : ''}`">
                <div class="avatar">
                    <el-avatar src="/public/imgs/test.jpg"></el-avatar>
                </div>
                <div class="content">
                    <div class="name">{{ item.username }}</div>
                    <p>{{ item.lastMessage }}</p>
                </div>
                <div class="time">{{ formatDate(item.date) }}</div>
            </el-badge>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { formatDate } from '@/utils/timeUtil';

const emit = defineEmits(['getUid'])
const props = defineProps<{
    list: {
        id: number,
        username: string,
        avatar: string,
        lastMessage: string,
        date: number,
        num: number
    }[] | undefined;
}>()

const actionIndex = ref(-1)

const selected = (index: number, uid: number) => {
    if (actionIndex.value == index) {
        actionIndex.value = -1;
        return;
    }
    actionIndex.value = index;
    contactPerson.value[index].num = 0
    emit('getUid', uid)
}

const contactPerson = ref([{
    id: 2,
    username: '德玛西亚',
    lastMessage: '哈哈哈哈',
    date: '刚刚',
    num: 100
}, {
    id: 3,
    username: '爱丽丝',
    lastMessage: '嗡嗡嗡',
    date: '2022.25.02 22:22',
    num: 50
}, {
    id: 4,
    username: '狗贼',
    lastMessage: '123333333333333333333333333333333333',
    date: '2022.25.02 22:22',
    num: 0
}, {
    id: 5,
    username: '诺克萨斯',
    lastMessage: '所有人都得死',
    date: '2022.25.02 22:22',
    num: 0
}, {
    id: 6,
    username: '亚托克斯',
    lastMessage: '世界的终结者',
    date: '2022.25.02 22:22',
    num: 0
}])

onMounted(() => {
    for (let i = 0; i < 10; i++) {
        contactPerson.value.push({
            id: 7 + i,
            username: '亚托克斯',
            lastMessage: '世界的终结者',
            date: '2022.25.02 22:22',
            num: 0
        })
    }
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
    width: 70%;
}

.header .search input {
    width: 100%;
    outline: none;
    border: none;
    box-sizing: border-box;
    padding: 10px 20px;
    font-size: 1.1em;
    border-radius: 50px;
    box-shadow: 0 0 5px 0 #ccc;
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