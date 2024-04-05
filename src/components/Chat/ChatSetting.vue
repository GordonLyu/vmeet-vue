<template>
    <div class="setting">
        <div class="contain">
            <div class="header">
                <div class="title">设置</div>
                <div class="close" @click="close">
                    <Icon icon="ep:close"></Icon>
                </div>
            </div>
            <div class="content">
                111
                <div class="btn">
                    <el-button type="danger" plain @click="del">删除联系人</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ElMessage, ElMessageBox } from 'element-plus';

const emits = defineEmits(['close']);

const close = () => {
    emits('close');
}

// 删除
const del = () => {
    ElMessageBox.confirm('是否删除该联系人（德玛西亚）？', '删除联系人', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'chat-setting-del-confirm-button',
        type: 'warning',
    }).then(() => {
        ElMessage({
            type: 'warning',
            message: '已删除联系人',
        })
    })
}

</script>
<style>
.chat-setting-del-confirm-button {
    background-color: #f56c6c !important;
}

.chat-setting-del-confirm-button:hover {
    background-color: #ff2d2d !important;
}
</style>

<style scoped>
.setting {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 15px 0;
    overflow: hidden;
}

.contain {
    display: flex;
    gap: 15px;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 30px;
    padding-left: 10px;
    height: 100%;
    margin: auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
}

.header .close {
    cursor: pointer;
    transition: .2s;
}

.header .close:hover {
    transform: scale(1.05);
}


.content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px;
    box-shadow: var(--default-shadow);
    border-radius: 10px;
}

.btn {
    display: grid;
    place-items: center;
    margin-top: auto;
}
</style>