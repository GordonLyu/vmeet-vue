<template>
    <VuePictureCropper :img="imageURL" :options="options" @cropmove="getImageFile" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import VuePictureCropper, { cropper } from "vue-picture-cropper";


const props = defineProps<{
    imageFile: File;
}>();

const emits = defineEmits(['croppedFile'])

const options = ref({
    viewMode: 1,
    dragMode: 'move',
    canScale: false,
    aspectRatio: 1 / 1,
    scalable: false,
    autoCrop: true
})
const imageURL = ref('')

onMounted(async () => {
    await showInCropper();
    setTimeout(() => {
        getImageFile();
    }, 100)

})

const showInCropper = () => {
    return new Promise(async (resolve) => {

        setTimeout(() => {
            const reader: FileReader = new FileReader();
            reader.readAsDataURL(props.imageFile);
            reader.onload = () => {
                // 更新裁切弹窗的图片源
                imageURL.value = String(reader.result);
            }
            resolve(true);
        }, 100)
    })
}

const getImageFile = () => {
    emits('croppedFile', cropper?.getFile())
}
</script>

<style scoped></style>