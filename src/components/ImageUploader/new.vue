<template>
  <div class="upload-container">
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      :multiple="multiple"
      :show-file-list="true"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :http-request="uploadFile"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
      :accept="acceptTypes"
      list-type="picture-card"
    >
      <el-icon><Plus /></el-icon>

      <template #file="{ file }">
        <div class="file-item">
          <div class="preview" v-if="isImage(file)">
            <img :src="file.url" class="image" />
          </div>
          <div class="preview" v-else-if="isVideo(file)">
            <video class="video">
              <source :src="file.url" :type="file.type" />
            </video>
            <div class="play-icon">
              <el-icon><VideoPlay /></el-icon>
            </div>
          </div>
          <div class="preview" v-else-if="isAudio(file)">
            <el-icon><Headset /></el-icon>
          </div>
          <div class="preview" v-else>
            <el-icon><Document /></el-icon>
          </div>

          <div class="file-info">
            <span class="filename">{{ file.name }}</span>
            <span class="filesize">{{ formatFileSize(file.size) }}</span>
          </div>

          <span class="delete-btn" @click="handleRemove(file)">
            <el-icon><Close /></el-icon>
          </span>
        </div>
      </template>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, VideoPlay, Headset, Document } from '@element-plus/icons-vue'
import { uploadImg, uploadFile as _uploadFile } from '@/api/modules/UploadApi'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: () => false
  }
})

const emit = defineEmits(['update:modelValue'])

// 支持的文件类型
const acceptTypes = 'image/*, video/*, audio/*, .pdf, .doc, .docx, .xls, .xlsx'

// 文件列表处理
const fileList = ref([...props.modelValue])

// 类型判断方法
const isImage = file => file.type?.startsWith('image/')
const isVideo = file => file.type?.startsWith('video/')
const isAudio = file => file.type?.startsWith('audio/')

// 文件大小格式化
const formatFileSize = size => {
  if (size === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(size) / Math.log(k))
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 上传前校验
const beforeUpload = file => {
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    ElMessage.error('文件大小不能超过10MB')
    return false
  }
  return true
}

// 文件变化处理
const handleChange = file => {
  // 生成预览URL
  if (!file.url && file.raw) {
    file.url = URL.createObjectURL(file.raw)
  }
}

// 自定义上传方法
const uploadFile = async options => {
  console.log('%c [ options ]-115', 'font-size:13px; background:pink; color:#bf2c9f;', options)
  const { file, onSuccess, onError } = options
  try {
    // 调用实际的上传接口
    const res = await uploadFileAPI(file)
    console.log('%c [ res ]-105', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    onSuccess(res)

    // 更新文件列表
    const index = fileList.value.findIndex(item => item.uid === file.uid)
    if (index > -1) {
      const newFile = {
        uid: file.uid,
        name: file.name,
        url: res.url,
        type: file.type,
        size: file.size
      }
      fileList.value.splice(index, 1, newFile)
    }
    emitUpdate()
  } catch (err) {
    onError(err)
    ElMessage.error('上传失败')
    // 更新文件状态为失败
    const index = fileList.value.findIndex(item => item.uid === file.uid)
    if (index > -1) {
      fileList.value.splice(index, 1, {
        ...fileList.value[index],
        status: 'exception'
      })
    }
  }
}

// 触发更新事件
const emitUpdate = () => {
  const formattedList = fileList.value.map(item => ({
    name: item.name,
    url: item.url,
    type: item.type,
    size: item.size
  }))
  emit('update:modelValue', formattedList)
}

// 上传接口
const uploadFileAPI = file => {
  const action = isImage(file) ? uploadImg : _uploadFile
  const formData = new FormData()
  formData.append('file', file)
  return new Promise(async resolve => {
    const response = await action(formData)
    resolve({
      url: response.data.url,
      name: file.name,
      type: file.type
    })
  })
}

// 监听外部数据变化
watch(
  () => props.modelValue,
  newVal => {
    fileList.value = [...newVal]
  }
)

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 删除文件处理
const handleRemove = file => {
  fileList.value = fileList.value.filter(item => item.uid !== file.uid)
  emitUpdate()
}

const handlePictureCardPreview = uploadFile => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>

<style scoped>
.upload-container {
  position: relative;
}

.file-item {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  border-radius: 6px;
  overflow: hidden;
}

.image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-icon {
  position: absolute;
  font-size: 24px;
  color: white;
}

.file-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}

.filename {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.filesize {
  margin-left: 8px;
  flex-shrink: 0;
}

.delete-btn {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 0 6px 0 6px;
}
</style>
