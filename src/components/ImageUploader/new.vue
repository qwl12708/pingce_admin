<template>
  <el-upload
    v-model:file-list="fileListRef"
    class="custom-upload"
    :action="props.action"
    :accept="props.accept"
    :multiple="props.multiple"
    :limit="props.limit"
    :disabled="props.disabled || uploading"
    :show-file-list="props.showFileList"
    :http-request="httpRequest"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-progress="handleProgress"
  >
    <!-- 自定义上传按钮 -->
    <template #trigger>
      <el-button :type="props.buttonType" :disabled="props.disabled || uploading">
        {{ uploading ? '上传中...' : props.buttonText }}
      </el-button>
    </template>

    <!-- 提示信息 -->
    <template #tip>
      <div v-if="props.tip" class="upload-tip">
        {{ props.tip }}
      </div>
    </template>

    <!-- 自定义文件列表展示 -->
    <template #file="{ file }">
      <div class="file-item">
        <span>{{ file.name }}</span>
        <span v-if="file.status === 'uploading'" class="progress"> ({{ file.percentage }}%) </span>
        <el-icon v-if="file.status === 'success'" class="success-icon">
          <Check />
        </el-icon>
      </div>
    </template>
  </el-upload>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { uploadImg } from '@/api/modules/UploadApi'

const props = defineProps({
  // 必填参数
  action: {
    type: String,
    required: true
  },
  // 自定义请求方法 (可覆盖默认的 axios 上传)
  httpRequest: {
    type: Function,
    default: null
  },
  // 其他配置参数
  buttonText: {
    type: String,
    default: '点击上传'
  },
  buttonType: {
    type: String,
    default: 'primary'
  },
  limit: {
    type: Number,
    default: 5
  },
  multiple: {
    type: Boolean,
    default: true
  },
  accept: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  tip: {
    type: String,
    default: ''
  },
  showFileList: {
    type: Boolean,
    default: true
  },
  // 文件校验
  maxSize: {
    type: Number, // 单位 MB
    default: 10
  },
  acceptType: {
    type: Array,
    default: () => ['image/jpeg', 'image/png']
  }
})

const emit = defineEmits(['success', 'error', 'exceed', 'progress'])

// 响应式状态
const fileListRef = ref([])
const uploading = ref(false)

// 默认的 HTTP 请求方法 (可被 props.httpRequest 覆盖)
const defaultHttpRequest = async ({ file, onProgress, onSuccess, onError }) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await uploadImg(formData, {
      onUploadProgress: progressEvent => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress({ percent })
      }
    })

    // axios.post(props.action, formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   onUploadProgress: progressEvent => {
    //     const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //     onProgress({ percent })
    //   }
    // })
    onSuccess(res.data)
  } catch (err) {
    onError(err)
  }
}

// 覆盖 el-upload 的默认请求
const httpRequest = options => {
  return props.httpRequest ? props.httpRequest(options) : defaultHttpRequest(options)
}

// 上传前校验
const beforeUpload = file => {
  // 文件类型校验
  const isTypeValid = props.acceptType.includes(file.type)
  if (!isTypeValid) {
    ElMessage.error(`文件类型不支持，仅支持 ${props.acceptType.join(', ')}`)
    return false
  }

  // 文件大小校验 (MB 转字节)
  const isSizeValid = file.size / 1024 / 1024 < props.maxSize
  if (!isSizeValid) {
    ElMessage.error(`文件大小不能超过 ${props.maxSize}MB`)
    return false
  }

  return true
}

// 处理上传成功
const handleSuccess = (response, file) => {
  uploading.value = false
  emit('success', { response, file })
  ElNotification.success({ title: '上传成功', message: file.name })
}

// 处理上传失败
const handleError = (err, file) => {
  uploading.value = false
  emit('error', { err, file })
  ElNotification.error({ title: '上传失败', message: file.name })
}

// 处理上传进度
const handleProgress = (event, file) => {
  emit('progress', { percent: event.percent, file })
}

// 处理超出文件数量限制
const handleExceed = files => {
  emit('exceed', files)
  ElMessage.warning(`最多允许上传 ${props.limit} 个文件`)
}
</script>

<style scoped>
.custom-upload {
  margin: 20px 0;
}

.upload-tip {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 5px;
}

.success-icon {
  color: #67c23a;
  margin-left: 8px;
}

.progress {
  color: #409eff;
  margin-left: 8px;
}
</style>
