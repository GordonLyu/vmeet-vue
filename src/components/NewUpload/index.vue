<template>
  <el-upload ref="uploadRef" :limit="1" :on-exceed="handleExceed" :auto-upload="false" :on-change="changeFile"
    :show-file-list="props.fillParent && !props.isImg ? false : !props.hiddenList"
    :class="`${props.fillParent ? 'fill action' : ''} ${props.text ? '' : 'amend'} ${imageURL ? 'disabled' : ''}`"
    :style="`display: inline-block; opacity: ${props.transparent ? '0' : '1'}`"
    :list-type="props.isImg ? 'picture-card' : 'text'" :accept="props.isImg ? 'image/*' : ''">
    <template #trigger>
      <Icon icon="ep:circle-plus" v-if="props.isImg" />
      <el-button type="primary" :class="props.fillParent ? 'fill action' : ''" v-else-if="!isExistDefaultSlot">
        {{ props.fillParent ? props.text : props.text ? props.text : '选择文件' }}
      </el-button>
      <slot else></slot>
    </template>
    <template #tip v-if="props.fillParent ? false : props.tip">
      <div class="el-upload__tip text-red">{{ props.tip }}</div>
    </template>

    <!-- 图片显示处理 -->
    <template #file="{ file }" v-if="props.isImg">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="isZoom = true">
            <el-icon>
              <Icon icon="ep:zoom-in" />
            </el-icon>
          </span>
          <span class="el-upload-list__item-delete" @click="uploadRef?.clearFiles(); imageURL = ''; isCropperView = false;
  isCroppedImage = false;">
            <el-icon>
              <Icon icon="ep:delete" />
            </el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <!-- 图片放大弹出框 -->
  <el-dialog v-model="isZoom" width="60%">
    <img :src="imageURL" alt="预览图片" style="width: 100%" />
  </el-dialog>


  <CropperDialog :show="props.isCropper && isCropperView" :img="file!" @cropped-file="setFile" ref="CropperDialogRef">
  </CropperDialog>
</template>

<script setup lang="ts">
/*
属性：
  isImg?:boolean - 是否为图片上传模式
  isCropper?:boolean - 图片上传模式下，切换到裁剪模式
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

import { genFileId, type UploadFile, type UploadInstance, type UploadProps, type UploadRawFile } from 'element-plus';
import type { PropsInterface } from './index.d.ts'
import { ref, useSlots, watch } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import CropperDialog, { type CropperDialogInterface } from './components/CropperDialog.vue'

const uploadRef = ref<UploadInstance>()
const CropperDialogRef = ref<CropperDialogInterface>()
const imageURL = ref('')

const isExistDefaultSlot = ref(!!useSlots().default);
const file = ref<UploadRawFile>()
const isZoom = ref(false)
const isCropperView = ref(false)
const isCroppedImage = ref(false)

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
    if (props.isImg) {
      isCropperView.value = !isCroppedImage.value;
      imageURL.value = URL.createObjectURL(NV);
    }
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
  isCroppedImage.value = true;
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

.fill.action :deep(.el-upload.el-upload--text),
.fill.action :deep(.el-upload-list.el-upload-list--picture-card),
.fill.action :deep(.el-upload-list__item.is-ready),
.fill.action :deep(.el-upload.el-upload--picture-card) {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 0;
}

/** 修正 */
.amend :deep(.el-upload.el-upload--text) {
  top: -0.1em;
}
</style>