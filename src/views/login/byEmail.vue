<template>
    <div class="login-page">
        <div class="main">
            <div class="bg">
                <div class="logo"><span>V</span><span>Meet</span></div>
                <div class="bg-content">
                    <img src="@/assets/imgs/login-cover.png" alt="">
                </div>
            </div>
            <form class="login" @submit.prevent="submit">
                <h1 class="title">邮箱登录</h1>
                <p>登入您的账号</p>
                <div class="input">
                    <div>
                        <input type="mail" autosave="false" v-model="formData.email" required>
                        <label class="text">邮箱</label>
                        <div class="line"></div>
                    </div>
                    <div class="code">
                        <input type="text" autosave="false" v-model="formData.code" required>
                        <label class="text">验证码</label>
                        <div class="line"></div>
                        <el-button class="btn" @click="sendCode" :loading="codeConfig.codeLoading"
                            :disabled="!isAllowSendCode">
                            {{ codeConfig.time > 0 ? codeConfig.time : '发送验证码' }}
                        </el-button>
                    </div>


                </div>
                <div class="option" v-loading="loading">
                    <input type="submit" value="登录">
                </div>
                <div class="switch">
                    <p><a href="/login">用户名登录</a></p>
                    没有账号？<a href="register">注册</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from '@/api';
import router from '@/router';
import { useUserInfoStore } from '@/stores/user';
import type { LoginResponse } from '@/types/User';
import { ElMessage } from 'element-plus/lib/components/index.js';
import { reactive, ref } from 'vue';

const loading = ref(false);
const isAllowSendCode = ref(true);
const codeConfig = reactive({
    codeLoading: false,
    time: 0
})

const formData = reactive({
    email: '',
    code: ''
})



const countdown = async () => {
    let t = setInterval(() => {
        codeConfig.time--;
        if (codeConfig.time <= 0) {
            isAllowSendCode.value = true;
            clearInterval(t);
        }
    }, 1000)
}

const sendCode = () => {
    codeConfig.codeLoading = true;
    api.user.loginByEmail(formData.email).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '已发送邮箱验证码'
            })
        } else {
            ElMessage({
                type: 'error',
                message: res.msg
            })
        }
        isAllowSendCode.value = false;
        codeConfig.time = res.data
        codeConfig.codeLoading = false;
        countdown();
    })
}


const submit = () => {
    if (loading.value) {
        return;
    }
    loading.value = true;
    api.user.loginEmailVerifyCode(formData.email, formData.code).then((res: any) => {
        loading.value = false;
        if (res.code == '200') {
            ElMessage({
                type: 'success',
                grouping: true,
                message: res.msg
            })
            useUserInfoStore().user = res.data
            useUserInfoStore().token = res.data.token
            location.reload();
        } else {
            ElMessage({
                type: 'error',
                grouping: true,
                message: res.msg
            })
        }
    }).catch((err) => {
        loading.value = false;
    })
}

</script>

<style scoped>
.logo {
    position: absolute;
    left: 20px;
    top: 20px;
    display: inline;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 2px 0 #ccc;
    user-select: none;
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

.login-page {
    position: relative;
    display: flex;
    height: 100vh;
    background-color: #f5f5f5;
    overflow: auto;
}

.main {
    margin: auto;
    position: relative;
    display: flex;
    height: 600px;
    max-width: 1000px;
    min-width: 200px;
    width: 90%;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0px 2px 5px 0 #ccc;
}

.bg {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: #fff;
    transition: .3s;
}

.bg-content {
    width: 95%;
    height: 95%;
    border-radius: 10px;
    background-color: #f3f5f9;
    box-shadow: var(--default-shadow);
    overflow: hidden;
}

.bg-content img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media screen and (max-width:750px) {
    .bg {
        flex: 0;
        width: 0;
    }

    .login {
        width: 100%;
        max-width: none;
        min-width: none;
    }
}

.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    min-width: 200px;
    padding: 20px 60px;
    gap: 10px;
    background-color: #fff;
    transition: .3s;
}

.icon {
    border-radius: 8px;
    width: 90px;
    height: 90px;
}

.icon>* {
    width: 100%;
    height: auto;
}

.title {
    color: #555;
    font-size: 1.8em;
}

.login p {
    margin-top: -10px;
    color: #aaa;
}

input {
    outline: none;
    border: none;
    box-sizing: border-box;
}

.input {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 50px;
}

.input .text {
    color: #aaa;
    font-weight: bold;
    letter-spacing: 2px;
    position: absolute;
    transition: .2s;
    pointer-events: none;
}

.input>div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    width: 100%;
    height: 30px;
}

.input>div::after {
    display: block;
    background-color: #ccc;
    content: '';
    height: 2px;
}

.input input {
    flex: 1;
    font-size: 1.2em;
    width: 100%;
    background-color: #ffffff00;
    color: #666;
}

.input input:focus {
    color: #000;
}

.input .line {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #0db8de;
    box-shadow: 0px 0px 2px 0 #0db8de;
    width: 0px;
    transition: .2s;
}


.input input:focus~.line {
    width: 100%;
}

.input input:valid~.line {
    width: 100%;
}

.input input:focus~.text {
    transform: translateY(-120%);
    color: #888;
}

.input input:valid~.text {
    transform: translateY(-120%);
    color: #888;
}

.option {
    width: 100%;
    margin-top: 20px;
}

input[type=submit] {
    font-size: 1.05em;
    width: 100%;
    height: 40px;
    background-color: #ffffff00;
    border-radius: 10px;
    box-shadow: 0 0 1px 1px #0db8de;
    color: #0db8de;
    font-weight: bold;
    cursor: pointer;
    transition: .1s;
}

input[type=submit]:hover,
input[type=submit]:focus {
    color: white;
    box-shadow: 0 0 3px 0px #0db8de;
    background-color: #0db8de;
}

.code {
    width: 50% !important;
}

.btn {
    position: absolute;
    top: 0;
    right: -100%;
}

.switch {
    margin-top: auto;
}
</style>