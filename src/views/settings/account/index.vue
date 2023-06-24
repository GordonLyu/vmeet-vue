<template>
    <div class="main" v-if="isShow">
        <ChangNicknameDialog :open="changeNicknameDialog" @close="changeNicknameDialog = false; reload();" />
        <ChangePasswordDialog :open="changePasswordDialog" @close="changePasswordDialog = false" />
        <ChangeAvatarDialog :open="changeAvatarDialog" @close="changeAvatarDialog = false" />
        <ChangeEmailDialog :open="changeEmailDialog" @close="changeEmailDialog = false" />
        <div class="contain">
            <div class="title">
                <h3>账户和密码</h3>
                <p>修改密码或更改账户信息</p>
            </div>
            <div class="content">
                <div class="list">
                    <div class="item avatar-item">
                        <div class="title">
                            <h4></h4>
                            <p></p>
                        </div>
                        <div class="avatar" @click="changeAvatarDialog = true">
                            <Avatar :src="baseURL + avatar"></Avatar>
                            <div class="icon">
                                <el-icon size="40">
                                    <Icon icon="bxs:edit"></Icon>
                                </el-icon>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div class="list">
                    <div class="item" @click="changeNicknameDialog = true">

                        <div class="title">
                            <h4>昵称</h4>
                            <p></p>
                        </div>
                        <div>{{ nickname }}</div>
                        <a>
                            <el-icon :size="20">
                                <Icon icon="uiw:right"></Icon>
                            </el-icon>
                        </a>
                    </div>
                </div>

                <div class="list">
                    <div class="item" @click="changePasswordDialog = true">

                        <div class="title">
                            <h4>修改密码</h4>
                            <p></p>
                        </div>
                        <div class="mid"></div>
                        <a>
                            <el-icon :size="20">
                                <Icon icon="uiw:right"></Icon>
                            </el-icon>
                        </a>
                    </div>
                    <div class="item" @click="changeEmailDialog = true">
                        <div class="title">
                            <h4>邮箱</h4>
                            <p>绑定的邮箱</p>
                        </div>
                        <div class="mid">{{ email }}</div>
                        <a>
                            <el-icon :size="20">
                                <Icon icon="uiw:right"></Icon>
                            </el-icon>
                        </a>
                    </div>
                    <div class="item">
                        <div class="title">
                            <h4>账号注销</h4>
                            <p>注销期间，您有7天的时间决定撤销，7天过后账号将永远销毁</p>
                        </div>
                        <div class="mid"></div>
                        <a>
                            <el-icon :size="20">
                                <Icon icon="uiw:right"></Icon>
                            </el-icon>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChangePasswordDialog from './components/ChangePasswordDialog.vue';
import ChangNicknameDialog from './components/ChangNicknameDialog.vue';
import ChangeAvatarDialog from './components/ChangeAvatarDialog.vue';
import ChangeEmailDialog from './components/ChangeEmailDialog.vue';
import Avatar from '@/components/Avatar/index.vue'
import { Icon } from '@iconify/vue/dist/iconify.js';

const baseURL = import.meta.env.VITE_BASE_API;
const changePasswordDialog = ref(false);
const changeNicknameDialog = ref(false);
const changeAvatarDialog = ref(false);
const changeEmailDialog = ref(false);
const isShow = ref(true);
const nickname = ref(JSON.parse(localStorage.getItem('user')!).nickname);
const avatar = JSON.parse(localStorage.getItem('user')!).avatar;
const email = ref(JSON.parse(localStorage.getItem('user')!).email);

const reload = () => {
    nickname.value = JSON.parse(localStorage.getItem('user')!).nickname;
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

.contain .item.avatar-item {
    background-color: #fff;
    cursor: default;
}

.contain .item.avatar-item:hover {
    background-color: #fff;
}

.avatar {
    position: relative;
    cursor: pointer;
    transition: .3s;
}

.avatar:hover {
    transform: scale(0.95);
}

.avatar .icon {
    position: absolute;
    right: -10px;
    bottom: -10px;
    color: #497dff;
    transition: .3s;
}

.avatar:hover .icon {
    transform: scale(0.9);
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