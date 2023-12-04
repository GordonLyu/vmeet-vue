<template>
    <div style="background-color: #f8f8f8; height: 100%;">
        <div class="main">
            <div class="upload">
                <NewUpload ref="newUploadRef" @get-file="getFile" is-img fill-parent is-cropper></NewUpload>
            </div>
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
</script>

<style scoped>
.main {
    position: relative;
    display: grid;
    place-items: center;
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
    width: 200px;
    height: 200px;
    background-color: rgb(107, 120, 235);
    transition: 0.3s;
}

/* .upload:hover {
    transform: translateY(-5px) scale(1.05);
} */
</style>