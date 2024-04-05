<template>
    <div class="main">
        <div class="video-chat">
            <div class="more">
                <el-icon :size="20">
                    <Icon icon="uiw:more"></Icon>
                </el-icon>
            </div>
            <div id="video-me">
                <video src="" autoplay ref="remoteVideo"></video>
            </div>
            <div id="video-other">
                <video src="" autoplay ref="localVideo"></video>
            </div>
            <div class="option">
                <div class="camera" @click="isFrontCamera = !isFrontCamera">
                    <el-icon :size="25">
                        <Icon icon="mdi:camera-flip"></Icon>
                    </el-icon>
                </div>
                <div class="autdio" @click="isOpenAudio = !isOpenAudio">
                    <el-icon :size="25">
                        <Icon :icon="isOpenAudio ? 'eva:mic-fill' : 'eva:mic-off-fill'"></Icon>
                    </el-icon>
                </div>
                <div class="screen" @click="isScreenShare = !isScreenShare">
                    <el-icon :size="25">
                        <Icon icon="material-symbols:screen-share"></Icon>
                    </el-icon>
                </div>
                <div :class="`connect`" @click="hangUp">
                    <el-icon :size="25">
                        <Icon :icon="'subway:call'"></Icon>
                    </el-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from '@/api';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const localVideo = ref<HTMLMediaElement>()
const remoteVideo = ref<HTMLMediaElement>()

const isOpenAudio = ref(true);
const isScreenShare = ref(false);
const isFrontCamera = ref(false);
const isConnect = ref(false);

// 开启远程视频
const connect = () => {
    api.socket.live.startRemote();
}

// 挂断
const hangUp = () => {
    api.socket.live.close();
    api.socket.live.stopPeerConnection();
    api.socket.live.stopStream();
    window.close();
}

// 更新视频配置
const updateVideoConfig = async (update?: boolean) => {
    // 电脑用户改为使用后置摄像头
    await api.socket.live.stopStream();
    let exact = isFrontCamera.value ? 'environment' : 'user'
    if (navigator.userAgent.toLowerCase().includes('window')) {
        exact = 'user';
    }
    await api.socket.live.startVideo(localVideo.value, isScreenShare.value, {
        audio: isOpenAudio.value,
        video: isScreenShare.value ? isScreenShare.value : {
            facingMode: {
                exact: exact
            }
        },
    });
    if (update) {
        api.socket.live.startRemote();
    }
}

watch([isFrontCamera, isOpenAudio, isScreenShare], () => {
    updateVideoConfig(true);
})

watch(isConnect, () => {
    if (isConnect.value) {
        connect();
    } else {
        hangUp();
    }
})

onMounted(async () => {
    console.log(useRoute().query.to);
    api.socket.live.setRemoteVideoDOM(remoteVideo.value);
    let id = Number(useRoute().params.id);
    api.socket.live.connect(id);
    await updateVideoConfig();
    connect();
})

</script>

<style>
html,
body,
#app {
    width: 100%;
    height: 100%;
}
</style>

<style scoped>
.main {
    height: 100%;
}

.video-chat {
    width: 100%;
    height: 100%;
}

.more {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
    opacity: 0.4;
    cursor: pointer;
    transition: .3s;
}

.more:hover,
.more.action {
    opacity: 0.8;
}

video {
    display: block;
    width: 100%;
    height: 100%;
}

#video-me {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #aaa;
}

#video-other {
    position: absolute;
    width: 400px;
    height: 225px;
    right: 5px;
    bottom: 5px;
    background-color: #bbb;
}

.option {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 5px;
    width: 300px;
    height: 50px;
    box-sizing: border-box;
    /* background-color: #00000040; */
    border-radius: 50px;
    /* overflow: hidden; */
    /* transition: .3s; */
}

.option>div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    background-color: #ccc;
    color: #fff;
    cursor: pointer;
    transition: .2s;
    opacity: 0.6;
}

.option>div:hover {
    transform: translateY(-5px) scale(1.1);
    opacity: 1;
}


.option .connect {
    background-color: #fb5d59;
}

.option .connect.hang-up {
    background-color: #61b695;
}
</style>