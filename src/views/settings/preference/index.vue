<template>
    <div class="main" v-if="isShow">
        <div class="contain">
            <div class="title">
                <h3>偏好设置</h3>
                <p>更改个人偏好设置</p>
            </div>
            <div class="content">
                <div class="list">
                    <div class="item">
                        <div class="title">
                            <h4>更改主题颜色</h4>
                            <p></p>
                        </div>
                        <div class="mid"></div>
                        <a href="#">修改</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserInfoStore } from '@/stores/user';
import { ref } from 'vue';

const isShow = ref(true);
const nickname = ref(useUserInfoStore().user!.nickname);

const reload = () => {
    nickname.value = useUserInfoStore().user!.nickname;
}
</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 15px 30px;
    overflow-y: auto;
}

.contain {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    /* box-shadow: var(--default-shadow); */
}

.contain>.title {
    height: 60px;
}

.avatar {
    position: relative;
}

.avatar .icon {
    position: absolute;
    right: -10px;
    bottom: -10px;
    color: #0db8de;
}

:deep(.avatar) .el-avatar {
    width: 100px;
    height: 100px;
}

.contain>.title p {
    font-size: 0.8em;
    color: #888;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;
    margin: 20px 0;
    /* box-shadow: var(--default-shadow); */
    background-color: #f8f8f8;
    overflow: hidden;
    border-radius: 10px;
}

.list .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 70px;
    margin: auto;
    box-sizing: border-box;
    padding: 20px 30px;
    cursor: pointer;
    transition: .3s;
}

.list .item:hover {
    /* border-radius: 10px; */
    background-color: #eee;
}

.content .list .item .title p {
    font-size: 0.8em;
    color: #888;
}
</style>