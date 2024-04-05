<template>
    <el-dialog v-model="action" title="裁剪" width="600px" :show-close="false" class="dialog" destroy-on-close
        @close="enter">
        <div class="box">
            <div class="crop-box">
                <PictureCropper ref="cropperRef" :image-file="rawImage!" @cropped-file="getCroppedFile" />
                <div class="view">
                    <img :src="croppedImageURL" alt="" width="200" height="200" />
                    <h1>预览图片</h1>
                </div>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="enter">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import type { UploadRawFile } from 'element-plus';
import { ref, watch } from 'vue';
import PictureCropper from './PictureCropper.vue'
const props = defineProps<{
    /** 是否弹出裁剪框 */
    show?: boolean;
    /** 图片文件 */
    img: UploadRawFile | undefined;
}>();

const emits = defineEmits(['croppedFile'])

const action = ref(false)
const croppedImage = ref<File>()
const croppedImageURL = ref<string>()
const rawImage = ref<File>()

watch(props, (NV) => {
    action.value = NV.show;
    rawImage.value = NV.img;
})

/** 获取裁剪后图片文件 */
const getCroppedFile = (file: Promise<File>) => {
    file.then((res) => {
        croppedImage.value = res;
        croppedImageURL.value = URL.createObjectURL(res);
    })
}

const enter = () => {
    emits('croppedFile', croppedImage.value)
}

const getCroppedImage = () => {
    return croppedImage.value;
}

export interface CropperDialogInterface {
    getCroppedImage(): File;
}

defineExpose({ getCroppedImage })

</script>

<style scoped></style>