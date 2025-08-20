<template>
  <el-dialog v-model="visible" :title="title" width="500px" @close="handleClose">
    <el-upload
      class="upload-demo"
      drag
      multiple
      :file-list="fileList"
      :auto-upload="false"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :directory="true"
      :show-file-list="true"
      :limit="100"
      :accept="accept"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">支持拖拽上传</div>
      </template>
    </el-upload>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :loading="uploading" @click="handleUpload">上传</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile } from '@/api/modules/UploadApi'
import { uploadReport, uploadComparison } from '@/api/product'

const props = defineProps({
  modelValue: Boolean,
  ids: {
    type: Array,
    default: () => []
  },
  accept: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '批量上传文件'
  },
  uploadType: {
    type: String,
    default: 'report' // 'report' 或 'comparison'
  }
})
const emit = defineEmits(['update:modelValue', 'uploaded'])

const visible = ref(props.modelValue)
const fileList = ref<any[]>([])
const uploading = ref(false)
const uploadedUrls = ref<string[]>([])

watch(
  () => props.modelValue,
  val => {
    visible.value = val
  }
)
watch(visible, val => {
  emit('update:modelValue', val)
  if (!val) fileList.value = []
})

const handleChange = (file: any, files: any[]) => {
  fileList.value = files
}
const handleRemove = (file: any, files: any[]) => {
  fileList.value = files
}
const beforeUpload = () => {
  return true
}

const handleUpload = async () => {
  if (!fileList.value.length) {
    ElMessage.warning('请先选择文件')
    return
  }
  if (props.ids && props.ids.length === 0) {
    ElMessage.warning('请先勾选需要上传的报告')
    return
  }
  uploading.value = true
  try {
    uploadedUrls.value = []
    // 过滤掉文件夹本身，只上传文件（有 webkitRelativePath 的为文件）
    const filesToUpload = fileList.value.filter(f => {
      const rawFile = f.raw || f.originFileObj || f
      // 文件夹本身没有 size 或 webkitRelativePath
      return rawFile && (rawFile.size > 0 || rawFile.webkitRelativePath)
    })
    if (!filesToUpload.length) throw new Error('未检测到可上传的文件')
    for (const file of filesToUpload) {
      const rawFile = file.raw || file.originFileObj || file
      const formData = new FormData()
      formData.append('file', rawFile)
      const res = await uploadFile(formData)
      if (res?.data?.url) {
        uploadedUrls.value.push(res.data.url)
      } else {
        throw new Error('文件上传失败')
      }
    }
    let res = { data: { id: '' } }
    if (!props.ids || props.ids.length === 0) {
      throw new Error('请先选择需要上传对比表的产品')
    }
    const action = props.uploadType === 'comparison' ? uploadComparison : uploadReport
    // 循环发送请求
    for (const id of props.ids) {
      const comparisonData = { report_file: uploadedUrls.value[0], id }
      res = await action(comparisonData)
      if (!res?.code || res?.code !== 200) {
        throw new Error(`${id} 上传失败`)
      }
    }
    ElMessage.success('上传成功')
    emit('uploaded')
    visible.value = false
  } catch (e: any) {
    ElMessage.error(e.message || '上传失败')
  } finally {
    uploading.value = false
  }
}
const handleClose = () => {
  visible.value = false
}
</script>

<style scoped>
.upload-demo {
  width: 100%;
}
</style>
