<template>
  <el-upload
    class="image-uploader flex items-center justify-center"
    :show-file-list="false"
    :before-upload="beforeUpload"
    :http-request="uploadImage"
    v-model:file-list="fileList"
  >
    <div v-if="!imageUrl" class="upload-placeholder">
      <el-icon><Plus /></el-icon>
      <div class="text-xs mt-1">上传</div>
    </div>
    <img v-else :src="imageUrl" class="uploaded-image" />
  </el-upload>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { uploadImg } from '@/api/modules/UploadApi'

const props = defineProps({
  value: String
})

const emits = defineEmits(['update:value'])

const imageUrl = ref(props.value)
const fileList = ref([])

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('上传文件只能是图片格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!')
    return false
  }
  return true
}

const uploadImage = async e => {
  const formData = new FormData()
  formData.append('file', e.file)
  try {
    const response = await uploadImg(formData)
    imageUrl.value = response.data.url
    emits('update:value', response.data.url)
  } catch (error) {
    ElMessage.error('图片上传失败')
  }
}
</script>

<style scoped>
.image-uploader {
  width: 360px;
  height: 180px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.image-uploader:hover {
  border-color: #409eff;
}

.upload-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8c939d;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
