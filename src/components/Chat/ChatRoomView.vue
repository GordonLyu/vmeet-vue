<template>
    <div class="main">
        <div class="room">
            <div class="info">
                <h3 class="title">德玛西亚</h3>
            </div>
            <div class="msgs -scrollbar" ref="msgsRef">
                <div :class="`msg ${item.type=='tip'?'tip':''} ${myID == item.id ? 'me' : 'another'}`" v-for="item in msgs" :key="item.id">{{ item.msg }}</div>
            </div>

            <div class="text">
                <textarea autosave="none" @keydown.stop.enter="send" @keyup.enter.ctrl="newLine" class="-scrollbar" ref="textRef"></textarea>
            </div>
            <div class="send">
                <div class="btn" @click="send" @touchstart="send">发送</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onUnmounted } from 'vue';
import ws from '@/utils/socket'

interface responseUser {
    code: number; msg: string; data: userData;
}

interface userData {
    id: string; msg: string; type: string; date: Date | null;
}

const myID = ref<string>('');
const textRef = ref();
const msgsRef = ref();
let f = true;

const msgs = reactive<userData[]>([]);

const send = () => {
    const el = textRef.value;
    if(el.value=='\n'){
        el.value = '';
    }
    if(el.value==''){
        return;
    }
    
    ws.send(el.value);
    el.value = '';
}

const newLine = (e: KeyboardEvent) => {
    const el: any = e.target;
    el.value += "\n";
}

ws.connect("ws://localhost:8050/ws/chat")

const toBottom = () => {
   const h = msgsRef.value.scrollHeight;
   msgsRef.value.scrollTo(0, h);
}

ws.onmessage(async (e: MessageEvent) => {    
    const data = JSON.parse(e.data).data;
    // console.log(JSON.parse(data));
    
    if (data.type == 'tip') {
        if (f) {
            myID.value = data.id;
            f = !f;
        }
        data.msg = "游客"+data.id+' '+data.msg;
    }
    await msgs.push(data);
    toBottom();
})

onUnmounted(() => {
    ws.disconnect()
}),

ws.onerror(()=>{
    console.log(111111);
    
})

</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: #f8f8f8;
}

.room {
    box-sizing: border-box;
    padding: 4px 10px;
    width: 100%;
    height: 100%;
    min-width: 300px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    position: relative;
    box-shadow: 0 0 3px 0 #aaa;
}

.info {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6%;
    width: 90%;
    margin: 0 auto;
}

.info .title {
    flex: 1 50%;
    text-align: center;
}

.info .online {
    flex: 1 20%;
    text-align: start;
}

.info .id {
    flex: 1 20%;
    text-align: end;
    overflow: hidden;
}

.msgs {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 5px 10px;
    gap: 10px;
    height: 100%;
    border-radius: 10px;
    margin: 10px 0;
    background-color: #efefef;
    box-shadow: 0 0 2px 0 #aaa;
}

.msgs .msg {
    box-sizing: border-box;
    padding: 8px 15px;
    background-color: #fff;
    border-radius: 5px;
    max-width: 48%;
    word-wrap: break-word;
}

.msgs .another {
    margin-right: auto;
}

.msgs .me {
    margin-left: auto;
}

.msgs .tip{
    margin:0 auto;
    font-size: 0.5em;
    padding: 4px 10px;
    background-color: #ffffffbb;
    border-radius: 10px;
    box-shadow: 0 0 4px 0 #aaa;
}

.text {
    text-align: center;
    height: 50%;
}

textarea {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
    margin: auto;
    resize: none;
    border: none;
    outline: none;
    background-color: #efefef;
    box-shadow: 0 0 2px 0 #aaa;
    border-radius: 10px;
    font-size: 1.2em;
    font-family: '微软雅黑';
}

.send {
    display: flex;
    justify-content: flex-end;
}

.send .btn {
    margin: 10px 0;
    bottom: 0;
    right: 0;
    padding: 5px 20px;
    background-color: #efefef;
    box-shadow: 0 0 2px 0 #aaa;
    border-radius: 10px;
    cursor: pointer;
}
</style>