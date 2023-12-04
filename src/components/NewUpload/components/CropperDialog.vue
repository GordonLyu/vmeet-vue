<template>
    <el-dialog v-model="action" title="裁剪" width="600px" :show-close="false" class="dialog">
        <div class="box">
            <div class="crop-box">
                <PictureCropper ref="cropperRef" />
                <div class="view">
                    <img :src="croppedImageURL" alt="" width="200" height="200" />
                    <h1>预览图片</h1>
                </div>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="action = false">取消</el-button>
                <el-button type="primary">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import type { UploadRawFile } from 'element-plus/lib/components/index.js';
import { ref, watch } from 'vue';
import PictureCropper from './PictureCropper.vue'
const props = defineProps<{
    /** 是否弹出裁剪框 */
    show?: boolean;
    /** 图片文件 */
    img: UploadRawFile | undefined;
}>();

const action = ref(false)
const croppedImageURL = ref('')

watch(props, () => {
    action.value = props.show;
    croppedImageURL.value = URL.createObjectURL(props.img!);
})

</script>

<style scoped></style>