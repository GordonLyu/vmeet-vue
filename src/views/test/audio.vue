<template>
    <div>
        <div id="types" ref="typesRef">
            音调类型: <button @click="setType(index)" v-for="item, index in audio_type_list">{{ item }}</button>
            <span id="selType" ref="selTypeRef">{{ audio_type_list[typeIndex] }}</span>
        </div>
        <button @click="start" ref="btnRef">开始播放</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { sleep } from '@/utils/timeUtil'

const typesRef = ref<HTMLDivElement>();
const selTypeRef = ref<HTMLSpanElement>();
const btnRef = ref<HTMLButtonElement>();

// 十二平均律公比
const q = Math.pow(440 / 220, 1 / 12);

// 440Hz（A4）基准的升降半音个数，正数为升，反之为降
const scale = (x: number) => {
    return 440 * Math.pow(q, x);
}

const audio_data_list = [0];

// C调
const addToneList = () => {
    // C4开始
    for (let i = 0, j = -9, k = 1; i < 20; i++, j += 2, k++) {
        if (k == 4) {
            j--;
        } else if (k == 7) {
            j--;
            k = 0;
        }
        audio_data_list.push(scale(j));
    }
}

addToneList();

const audio_type_list = ref<OscillatorType[]>(['sine', 'square', 'sawtooth', 'triangle'])
let typeIndex = ref(0)
let index = 1
function setType(i: number) {
    typeIndex.value = i
}
// const arr = [6, 6, 6, 6, 4, 4, 4, 4, 1, 1, 1, 1, 5, 5, 5, 5,]
// const arr2 = [8, 8, 8, 8, 6, 6, 6, 6, 6, 3, 3, 3, 7, 7, 7, 7,]
const litteStar = [1, 1, 5, 5, 6, 6, 5, 0, 4, 4, 3, 3, 2, 2, 1, 0,
    5, 5, 4, 4, 3, 3, 2, 0, 5, 5, 4, 4, 3, 3, 2, 0,
    1, 1, 5, 5, 6, 6, 5, 0, 4, 4, 3, 3, 2, 2, 1];

const play6415 = [6, 6, 6, 6, 4, 4, 4, 4, 1, 1, 1, 1, 5, 5, 5, 5]

// const kano1 = [8, 12, 15, 0, 5, 8, 12, 0, 6, 10, 13, 0, 3, 6, 10, 0, 4, 8, 11, 0, 1, 4, 8, 0, 4, 8, 11, 0, 5, 8, 12, 0]
const kano1 = [8, 5, 6, 3, 4, 1, 4, 5]
const kano2 = [3, 2, 1, 0, -1, -2, -1, 0]
const start = async () => {
    for (let i = 0; i < kano1.length; i++) {
        // index = arr[i % (4 * 4)];    
        await sleep(1000);
        if (kano1[i] == 0) {
            continue;
        }
        // create();
        // index = arr2[i % (4 * 4)]
        // create();
        index = kano1[i];
        create();
        index = kano2[i] + 7;
        create();
    }
}

// 升调弹奏
const ascStart = async () => {
    for (let i = 1; i < audio_data_list.length; i++) {
        index = i;
        await sleep(400);
        create();
    }
}
// start();



function create() {
    let volBl = 0.5;
    btnRef.value!.innerHTML = `基础音：${index === 7 ? '+1' : (index)}`
    // 创建音频上下文  
    const audioCtx = new AudioContext();
    // 创建音调控制对象
    const oscillator = audioCtx.createOscillator();
    // 创建音量控制对象  
    const gainNode = audioCtx.createGain();
    // 音调音量关联  
    oscillator.connect(gainNode);
    // 音量和设备关联
    gainNode.connect(audioCtx.destination);
    // 音调类型指定为正弦波  
    oscillator.type = audio_type_list.value[typeIndex.value];
    // 设置音调频率  
    console.log(audio_data_list[index]);

    oscillator.frequency.value = audio_data_list[index];
    // oscillator.frequency.value = 20000;
    // 先把当前音量设为0
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    // 0.01秒时间内音量从刚刚的0变成1，线性变化 
    gainNode.gain.linearRampToValueAtTime(1 * volBl, audioCtx.currentTime + 0.01);
    // 声音走起 
    oscillator.start(audioCtx.currentTime);
    // 1秒时间内音量从刚刚的1变成0.001，指数变化 
    gainNode.gain.exponentialRampToValueAtTime(0.1 * volBl, audioCtx.currentTime + 2);
    // 1秒后停止声音 
    oscillator.stop(audioCtx.currentTime + 2);
    if (index >= audio_data_list.length - 1) {
        index = 0
    } else {
        index++
    }
}
</script>

<style scoped></style>