<template>
  <el-upload v-if="!props.isImg" ref="uploadRef" :limit="1" :on-exceed="handleExceed" :auto-upload="false"
    :on-change="changeFile" :show-file-list="props.fillParent ? false : !props.hiddenList"
    :class="`${props.fillParent ? 'fill action' : ''} ${props.text ? '' : 'amend'}`"
    :style="`display: inline-block; opacity: ${props.transparent ? '0' : '1'}`">
    <template #trigger>
      <el-button type="primary" :class="props.fillParent ? 'fill action' : ''" v-if="!isExistDefaultSlot">
        {{ props.fillParent ? props.text : props.text ? props.text : '选择文件' }}
      </el-button>
      <slot else></slot>
    </template>
    <template #tip v-if="props.fillParent ? false : props.tip">
      <div class="el-upload__tip text-red">{{ props.tip }}</div>
    </template>
  </el-upload>
  <UploadImg v-else @get-file="getFile" ref="uploadImgRef" :is-cropper="props.isCropper" />
</template>

<script setup lang="ts">
/*
属性：
  isImg?:boolean - 是否为图片上传模式
  isCropper?:boolean - 图片上传模式下，是否需要裁剪
  tip?:string - 提示
  hiddenList?:boolean - 是否隐藏已上传文件列表
  fillParent?:boolean - 元素大小填充父元素，且隐藏上传文件列表和提示
  text?:string - 按钮文字
  transparent?:boolean - 是否透明

事件：
  @get-file->File - 获取将要上传的文件

方法：
  clearFiles()->void - 清理将要上传的文件列表
  setFile(UploadRawFile)->void - 手动上传文件

插槽：
  default：若无插槽，则显示默认按钮
*/

import { genFileId, type UploadFile, type UploadInstance, type UploadProps, type UploadRawFile } from 'element-plus/lib/components/index.js';
import UploadImg from './components/UploadImg.vue';
import type { PropsInterface } from './index.d.ts'
import { ref, useSlots, watch } from 'vue';

const uploadRef = ref<UploadInstance>()

const isExistDefaultSlot = ref(!!useSlots().default);
const file = ref<UploadRawFile>()

const props = withDefaults(defineProps<PropsInterface>(), {
  isImg: false,
  isCropper: false,
  hiddenList: false,
  fillParent: false,
  transparent: false
})

const emits = defineEmits(['getFile'])

watch(file, (NV) => {
  if (NV) {
    swapFile(NV);
    getFile();
  }

})

/** 获取文件 */
const getFile = () => {
  let _file: File = file.value!;
  emits('getFile', _file)
}

const changeFile = (_file: UploadFile) => {
  file.value = _file.raw;
}

/** 替换上传文件 */
const swapFile = (_file: UploadRawFile) => {
  uploadRef.value?.clearFiles();
  _file.uid = genFileId();
  uploadRef.value?.handleStart(_file);

}

/** 文件溢出处理 */
const handleExceed: UploadProps['onExceed'] = (files: UploadRawFile[]) => {
  file.value = files[0];
}

/** 清理上传文件列表 */
const clearFiles = (): void => {
  uploadRef.value?.clearFiles();
}

/** 手动上传文件 */
const setFile = (_file: UploadRawFile): void => {
  file.value = _file;
}

defineExpose({
  clearFiles, setFile
})

export interface UploadRefInstance {
  /** 清理上传文件列表 */
  clearFiles(): void;
  /** 手动上传文件 */
  setFile(_file: UploadRawFile): void;
}
</script>

<style scoped>
.fill.action {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
}

.fill.action :deep(.el-upload.el-upload--text) {
  position: relative;
  width: 100%;
  height: 100%;
}

/** 修正 */
.amend :deep(.el-upload.el-upload--text) {
  top: -0.1em;
}
</style>