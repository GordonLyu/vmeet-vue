<template>
  <div v-if="!props.hidden">
    <el-upload ref="uploadRef" :limit="1" :on-exceed="handleExceed" :auto-upload="false" :on-change="changeFile">
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <template #tip v-if="props.tip">
        <div class="el-upload__tip text-red">{{ props.tip }}</div>
      </template>
    </el-upload>
    <!-- <UploadImg v-if="props.isImg" @get-file="getFile" ref="uploadImgRef" :is-cropper="props.isCropper" /> -->
  </div>
</template>

<script setup lang="ts">
/*
属性:
  isImg:boolean - 是否为图片上传模式
  isCropper:boolean - 图片上传模式下，是否需要裁剪
  tip:string - 提示

事件：
  @get-file->File - 获取将要上传的文件

方法：
  clearFiles()->void - 清理将要上传的文件列表
  file(UploadRawFile)->void - 手动上传文件
*/

import { genFileId, type UploadFile, type UploadInstance, type UploadProps, type UploadRawFile } from 'element-plus/lib/components/index.js';
// import UploadImg from './components/UploadImg.vue';
import { ref, watch } from 'vue';

const uploadRef = ref<UploadInstance>()
const file = ref<UploadRawFile>()

const props = withDefaults(defineProps<{
  /** 是否为图片上传模式 */
  isImg?: boolean;
  /** 图片上传模式下，是否需要裁剪 */
  isCropper?: boolean;
  /** 提示 */
  tip?: string;
  hidden?: boolean;
}>(), {
  isImg: false,
  isCropper: false,
  hidden: false
})

const emits = defineEmits(['getFile'])

watch(file, (NV, OV) => {
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

/** 文件数量溢出处理 */
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

/** 手动选择上传文件 */
const selectFile = () => {
  
}

defineExpose({
  clearFiles, setFile, selectFile
})

export interface UploadRefInstance {
  /** 清理上传文件列表 */
  clearFiles(): void;
  /** 手动上传文件 */
  setFile(_file: UploadRawFile): void;
  /** 手动选择上传文件 */
  selectFile(): void;
}
</script>

<style scoped></style>