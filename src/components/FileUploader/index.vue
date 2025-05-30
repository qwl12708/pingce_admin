<template>
  <el-upload
    class="image-uploader flex items-center justify-center"
    :class="customClass"
    :before-upload="beforeUpload"
    :http-request="_uploadFile"
    v-model:file-list="fileList"
    :on-remove="handleRemove"
  >
    <div>
      <el-button v-if="!fileUrl" type="primary">{{ text }}</el-button>
      <p v-if="tip">{{ tip }}</p>
    </div>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile } from '@/api/modules/UploadApi'

const props = defineProps({
  value: String,
  width: {
    type: String,
    default: '180px'
  },
  height: {
    type: String,
    default: '180px'
  },
  customClass: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: '上传'
  }
})

const emits = defineEmits(['update:value'])

const fileUrl = ref(props.value)
const fileList = ref([])

watch(
  () => props.value,
  newValue => {
    fileUrl.value = newValue
    fileList.value = [{ name: newValue?.split('/').at(-1), url: newValue }]
  }
)

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  if (isImage) {
    ElMessage.error('文件类型错误！')
    return false
  }

  const isLt3M = file.size / 1024 / 1024 < 3

  if (!isLt3M) {
    ElMessage.error('上传文件大小不能超过 3MB!')
    return false
  }
  return true
}

const _uploadFile = async (e: any) => {
  const formData = new FormData()
  formData.append('file', e.file)
  try {
    const response = await uploadFile(formData)
    fileUrl.value = response.data.url
    const filename = response.data.url.split('/').at(-1)
    fileList.value = [
      {
        name: filename,
        url: response.data.url
      }
    ]
    emits('update:value', response.data.url)
  } catch (error) {
    ElMessage.error('文件上传失败')
  }
}

const handleRemove = (uploadFile, uploadFiles) => {
  fileList.value = []
  fileUrl.value = ''
}
</script>

<style scoped>
.image-uploader {
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

.image-uploader {
  width: var(--width);
  height: var(--height);
}
</style>
