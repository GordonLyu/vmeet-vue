<template>
    <div>
        <el-dialog :model-value="props.open" title="添加联系人" width="400px" :class="'dialog'" :z-index="1000"
            @close-auto-focus="emits('close')">
            <el-form :model="form" :label-position="'top'" @submit.prevent="submit">
                <el-form-item label="用户名" :label-width="'140px'">
                    <el-input v-model="form.username" autocomplete="off" type="text" placeholder="需要添加的联系人用户名" />
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

const props = defineProps<{
    open?: boolean;
}>()

const emits = defineEmits(['close'])

const loading = ref(false);
const form = reactive({
    username: ''
})

const submit = () => {
    loading.value = true;
    if (form.username == "") {
        ElMessage({
            type: 'warning',
            message: '用户名不能为空'
        })
        loading.value = false;
        return;
    } else if (form.username == JSON.parse(localStorage.getItem('user')!).username) {
        ElMessage({
            type: 'warning',
            message: '不能添加自己'
        })
        loading.value = false;
        return;
    }
    api.contact.addContactByUsername(form.username).then((res: any) => {
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '已发送添加申请'
            })
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