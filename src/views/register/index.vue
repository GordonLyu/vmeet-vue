<template>
    <div class="register-page">
        <div class="main">
            <div class="bg">
                <div class="logo"><span>V</span><span>Meet</span></div>
                <div class="bg-content">

                </div>
            </div>
            <form class="register" @submit.prevent="submit">
                <h1 class="title">注册</h1>
                <p>创建您的账号</p>
                <div class="input">
                    <div>
                        <input type="text" autosave="false" v-model="formData.username" required>
                        <label class="text">用户名</label>
                        <div class="line"></div>
                    </div>
                    <div>
                        <input type="text" autosave="false" v-model="formData.nickname" required>
                        <label class="text">昵称</label>
                        <div class="line"></div>
                    </div>
                    <div>
                        <input type="password" autosave="false" v-model="formData.password" required>
                        <label class="text">密码</label>
                        <div class="line"></div>
                    </div>
                    <div>
                        <input type="password" autosave="false" v-model="repassword" required>
                        <label class="text">再次输入密码</label>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="option">
                    <input type="submit" value="注册">
                </div>
                <div class="switch">
                    已有账号？<a href="login">登录</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from '@/api';
import type { Register } from '@/types/User';
import { ElMessage } from 'element-plus/lib/components/index.js';
import { ref, reactive } from 'vue';

const repassword = ref('')

const formData = reactive<Register>({
    username: '',
    nickname: '',
    password: ''
})

const submit = () => {
    if (formData.password != repassword.value) {
        ElMessage({
            type: 'warning',
            message: '再次输入密码不一致'
        })
        repassword.value = ''
        return;
    }

    if (formData.nickname == '') {
        formData.nickname = formData.username;
    }

    api.user.register(formData).then((res: any) => {
        console.log(res);
    })
}
</script>

<style scoped>
.logo {
    position: absolute;
    left: 5px;
    top: 5px;
    display: inline;
    box-sizing: border-box;
    padding: 5px;
    background-color: #fff;
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
    color: #fff;
}

.register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    overflow: auto;
}

.main {
    position: relative;
    display: flex;
    height: 600px;
    max-width: 800px;
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
}

@media screen and (max-width:750px) {
    .bg {
        flex: 0;
        width: 0;
    }

    .register {
        width: 100%;
    }
}

.register {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
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

.register p {
    margin-top: -20px;
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

.switch {
    margin-top: auto;
}
</style>