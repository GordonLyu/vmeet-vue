<template>
    <div>
        <el-dialog :model-value="props.open" title="修改头像" width="400px" :class="'dialog'" :z-index="1000"
            @close-auto-focus="emits('close')">
            <el-form :model="form" :label-position="'top'" @submit.prevent="submit">
                <el-form-item label="头像" :label-width="'140px'">
                    <!-- <el-input v-model="form.newNickname" autocomplete="off" type="text" /> -->
                    <Upload :isImg="true" :is-cropper="true"></Upload>
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

let user = JSON.parse(localStorage.getItem('user')!);
const props = defineProps<{
    open?: boolean;
}>()

const emits = defineEmits(['close'])

const loading = ref(false);
const form = reactive({
    id: 0,
    newNickname: user.nickname
})

const submit = () => {
    loading.value = true;

    form.id = user.id;
    if (form.newNickname == "") {
        ElMessage({
            type: 'warning',
            message: '昵称不能为空'
        })
        return;
    }
    api.user.changeNickname(form).then((res: any) => {
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '昵称修改成功'
            })
            user.nickname = form.newNickname;
            localStorage.setItem('user', JSON.stringify(user))
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