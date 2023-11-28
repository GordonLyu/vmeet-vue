<template>
    <div style="background-color: #f8f8f8; height: 100%;">
        <div class="main">
            <NewUpload ref="newUploadRef" @get-file="getFile" :tip="'1111'" hidden></NewUpload>

            <div class="upload" @click="selectFile">上传</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import NewUpload, { type UploadRefInstance } from '@/components/NewUpload/index.vue'
import { ref } from 'vue';

const newUploadRef = ref<UploadRefInstance>()

const getFile = (file: File) => {
    console.log(file);
}

const selectFile = () => {
    newUploadRef.value?.selectFile();
}
</script>

<style scoped>
.main {
    position: relative;
    margin: auto;
    top: 100px;
    width: 400px;
    height: 400px;
    background-color: #fff;
    box-shadow: 0 5px 10px 0 #ddd;
    border-radius: 20px;
    overflow: hidden;
}

.upload {
    display: inline-block;
    padding: 10px 20px;
    background-color: rgb(107, 120, 235);
    cursor: pointer;
}
</style>