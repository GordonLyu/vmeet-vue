<template>
    <div>
        <el-dialog :model-value="props.open" title="修改头像" width="400px" :class="'dialog'" :z-index="1000"
            @close-auto-focus="emits('close')">
            <el-form :model="form" :label-position="'top'" @submit.prevent="submit">
                <el-form-item label="头像" :label-width="'140px'">
                    <Upload :isImg="true" :is-cropper="true" @get-file="getFile"></Upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="emits('close')">取消</el-button>
                    <el-button type="primary" @click="submit" v-loading="loading">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import api from '@/api';
import { ElMessage } from 'element-plus/lib/components/index.js';
import { reactive, ref } from 'vue';
import Upload from '@/components/Upload';
import { useUserInfoStore } from '@/stores/user';

let user = useUserInfoStore().user;
const props = defineProps<{
    open?: boolean;
}>()

const emits = defineEmits(['close'])

const loading = ref(false);
const form = new FormData();


const getFile = (file: File) => {
    console.log(file);
    
    form.append("file", file);
}

const submit = () => {
    loading.value = true;

    api.file.uploadAvatar(form).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '已修改头像'
            })
            useUserInfoStore().user = user;
            emits('close');
            location.reload();
        } else {
            ElMessage({
                type: 'error',
                message: res.msg
            })
        }
        loading.value = false;
    })
}
</script>

<style scoped>
:deep(.dialog) {
    border-radius: 10px;
}
</style>