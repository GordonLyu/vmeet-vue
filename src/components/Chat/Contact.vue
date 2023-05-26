<template>
    <div class="contact">
        <div class="header">
            <div class="search">
                <input type="text">
            </div>
        </div>
        <div class="list -scrollbar">
            <el-badge :value="item.num ? item.num : ''" :max="99" v-for="item, index in contactPerson"
                @click="selected(index)" :class="`item ${actionIndex == index ? 'action' : ''}`">
                <div class="avatar">
                    <el-avatar src="/public/imgs/test.jpg"></el-avatar>
                </div>
                <div class="content">
                    <div class="name">{{ item.name }}</div>
                    <p>{{ item.lastMessage }}</p>
                </div>
                <div class="time">{{ item.time }}</div>
            </el-badge>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const actionIndex = ref(-1)

const selected = (index: number) => {
    if (actionIndex.value == index) {
        actionIndex.value = -1;
        return;
    }
    actionIndex.value = index;
    contactPerson.value[index].num = 0

}

const contactPerson = ref([{
    uid: 2,
    name: '德玛西亚',
    lastMessage: '哈哈哈哈',
    time: '刚刚',
    num: 100
}, {
    uid: 3,
    name: '爱丽丝',
    lastMessage: '嗡嗡嗡',
    time: '2022.25.02 22:22',
    num: 50
}, {
    uid: 4,
    name: '狗贼',
    lastMessage: '123333333333333333333333333333333333',
    time: '2022.25.02 22:22',
    num: 0
}, {
    uid: 5,
    name: '诺克萨斯',
    lastMessage: '所有人都得死',
    time: '2022.25.02 22:22',
    num: 0
}, {
    uid: 6,
    name: '亚托克斯',
    lastMessage: '世界的终结者',
    time: '2022.25.02 22:22',
    num: 0
}])

onMounted(() => {
    for (let i = 0; i < 10; i++) {
        contactPerson.value.push({
            uid: 7 + i,
            name: '亚托克斯',
            lastMessage: '世界的终结者',
            time: '2022.25.02 22:22',
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
    background-color: #fafafa;
    box-shadow: 0 0 3px 0 #ccc;
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
    background-color: #eee;
}

.list .item.action {
    background-color: #fff;
    box-shadow: var(--default-shadow);
}

.list .item .avatar {
    width: 40px;
    height: 40px;
    /* background-color: red; */
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