<template>
  <el-upload
    class="image-uploader flex items-center justify-center"
    :show-file-list="true"
    :before-upload="beforeUpload"
    :http-request="uploadImage"
    :list-type="listType"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    v-model:file-list="fileList"
    :multiple="multiple"
  >
    <div>
      <div v-if="multiple" class="upload-placeholder">
        <el-icon><Plus /></el-icon>
        <div class="text-xs mt-1">上传</div>
      </div>
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      <p class="text-gray-400 text-xs mt-2 text-center" v-if="tip">{{ tip }}</p>
    </div>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { uploadImg } from '@/api/modules/UploadApi'

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
  multiple: {
    type: Boolean,
    default: false
  },
  // customClass: {
  //   type: String,
  //   default: ''
  // },
  tip: {
    type: String,
    default: ''
  },
  listType: {
    type: String,
    default: 'picture-card',
    validator: (value: string) => ['text', 'picture', 'picture-card'].includes(value)
  },
  returnString: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:value'])

const imageUrl = ref(props.value)
const fileList = ref([])

watch(
  () => props.value,
  newValue => {
    imageUrl.value = newValue
    // 初始化 fileList，当 props.value 有值时，确保 fileList 包含对应的图片
    if (newValue) {
      fileList.value = [{ name: 'Uploaded Image', url: newValue }]
    } else {
      fileList.value = []
    }
  },
  { immediate: true } // 确保组件加载时立即同步
)

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    ElMessage.error('文件类型错误！')
    return false
  }
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isLt10M) {
    ElMessage.error('上传图片大小不能超过 10MB!')
    return false
  }
  return true
}

const uploadImage = async (e: any) => {
  const formData = new FormData()
  formData.append('file', e.file)
  try {
    const response = await uploadImg(formData)
    fileList.value.at(-1).url = response.data.url
    if (props.multiple) {
      // fileList.value.splice(fileList.value.length - 1, 1, { url: response.data.url })
      emits('update:value', props.returnString ? fileList.value : fileList.value.map(file => file.url))
    } else {
      imageUrl.value = response.data.url
      emits('update:value', response.data.url)
    }
  } catch (error) {
    ElMessage.error('图片上传失败')
  }
  console.log('%c [ fileList ]-110', 'font-size:13px; background:pink; color:#bf2c9f;', fileList.value)
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (uploadFile, uploadFiles) => {
  fileList.value = uploadFiles
  if (props.multiple) {
    emits('update:value', props.returnString ? fileList.value : fileList.value.map(file => file.url))
  } else {
    imageUrl.value = ''
    fileList.value = [] // 清空 fileList
    emits('update:value', props.returnString ? '' : [])
  }
}

const handlePictureCardPreview = uploadFile => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>

<style scoped>
.image-uploader {
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

.image-uploader {
  width: var(--width);
  height: var(--height);
}
</style>
