<template>
    <div>
        <el-dialog :model-value="props.open" title="修改邮箱" width="400px" :class="'dialog'" :z-index="1000"
            @close-auto-focus="emits('close')">
            <el-form :model="form" @submit.prevent="submit">
                <el-form-item label="绑定的新邮箱" :label-width="'140px'">
                    <el-input v-model="form.email" autocomplete="off" type="email" />
                </el-form-item>
                <el-form-item label="验证码" :label-width="'140px'">
                    <div style="display: flex; gap: 15px;">
                        <el-input v-model="form.code" autocomplete="off" type="text" />
                        <el-button @click="sendCode" :loading="codeConfig.codeLoading" :disabled="!isAllowSendCode">
                            {{ codeConfig.time > 0 ? codeConfig.time : '发送验证码' }}
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="emits('close')">取消</el-button>
                    <el-button type="primary" @click="submit" :loading="loading">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import api from '@/api';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const props = defineProps<{
    open?: boolean;
}>()

const emits = defineEmits(['close'])

const loading = ref(false);
const isAllowSendCode = ref(true);
const codeConfig = reactive({
    codeLoading: false,
    time: 0
})
const form = reactive({
    email: '',
    code: '',
})

const countdown = async () => {
    let t = setInterval(() => {
        codeConfig.time--;
        if (codeConfig.time <= 0) {
            isAllowSendCode.value = true;
            clearInterval(t);
        }
    }, 1000)
}

const sendCode = () => {
    console.log(form.email);
    codeConfig.codeLoading = true;
    api.user.sendChangeEmailCode(form.email).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '已发送邮箱验证码'
            })
        } else {
            ElMessage({
                type: 'error',
                message: res.msg
            })
        }
        isAllowSendCode.value = false;
        codeConfig.time = res.data
        codeConfig.codeLoading = false;
        countdown();
    })
}



const submit = () => {
    loading.value = true;
    api.user.verifyChangeEmailCode(form.email, form.code).then((res: any) => {
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '邮箱绑定成功'
            })
            setTimeout(() => {
                location.reload();
            }, 1000)
            emits('close');
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