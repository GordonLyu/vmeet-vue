<template>
    <div>
        <el-dialog :model-value="props.open" title="修改密码" width="400px" :class="'dialog'" :z-index="1000"
            @close-auto-focus="emits('close')">
            <el-form :model="form" :label-position="'top'" @submit.prevent="submit">
                <el-form-item label="旧密码" :label-width="'140px'">
                    <el-input v-model="form.oldPassword" autocomplete="off" type="password" />
                </el-form-item>
                <el-form-item label="新密码" :label-width="'140px'">
                    <el-input v-model="form.newPassword" autocomplete="off" type="password" />
                </el-form-item>
                <el-form-item label="再次输入新密码" :label-width="'140px'">
                    <el-input v-model="rePassword" autocomplete="off" type="password" />
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
import { useUserInfoStore } from '@/stores/user';
import { ElMessage } from 'element-plus/lib/components/index.js';
import { reactive, ref } from 'vue';

const props = defineProps<{
    open?: boolean;
}>()

const emits = defineEmits(['close'])

const loading = ref(false);
const rePassword = ref('')
const form = reactive({
    id: 0,
    oldPassword: '',
    newPassword: '',

})

const submit = () => {
    loading.value = true;
    let user = useUserInfoStore().user!;
    form.id = user.id;
    if (form.newPassword != rePassword.value) {
        ElMessage({
            type: 'warning',
            message: '再次输入密码不一致'
        })
        rePassword.value = '';
        loading.value = false;
        return;
    }
    api.user.changePassword(form).then((res: any) => {
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '密码修改成功'
            })
            emits('close');
        } else {
            ElMessage({
                type: 'error',
                message: res.msg
            })
        }
        form.newPassword = form.oldPassword = rePassword.value = ''
        loading.value = false;
    })
}
</script>

<style scoped>
:deep(.dialog) {
    border-radius: 10px;
}
</style>