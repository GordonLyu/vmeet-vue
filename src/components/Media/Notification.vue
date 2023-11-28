<template>
    <div>
        <el-button>
            哇哇哇哇哇
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus/lib/components/index.js';

const runMessage = () => {
    ElMessage({
        type: 'success',
        message: '密码修改成功'
    })
}

defineExpose({
    runMessage
})
</script>

<style scoped></style>