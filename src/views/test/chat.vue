<template>
    <div>
        <p>chat</p>
        <video ref="localVideoRef" width="100" height="100" autoplay></video>
        <button type="button" @click="open(false)">打开摄像头</button>
        .<button type="button" @click="open(true)">打开共享屏幕</button>
        <button type="button" @click="connect">连接</button>
        <input type="text" placeholder="自己ID" v-model="uid"/>
        <button type="button" @click="connectServer">连接服务器</button>
        <p>远程</p>
        <video ref="remoteVideoRef" width="500" height="500" autoplay></video>
    </div>
</template>

<script setup lang="ts">
import { live } from '@/api/socket';
import { onMounted, ref } from 'vue';

const localVideoRef = ref<HTMLMediaElement>();
const remoteVideoRef = ref<HTMLMediaElement>();
const localStream = ref<MediaStream>();

const uid = ref(1)

onMounted(() => {
    live.setRemotevideoDOM(remoteVideoRef.value!);
})

const connectServer = () => {
    live.connect(uid.value); 
}

const open = (V:boolean) => {
    live.startVideo(localVideoRef.value, V).then((stream) => {
        localStream.value = stream;
    })
}

const connect = () => {
    live.sendOffer();
}

</script>

<style scoped></style>