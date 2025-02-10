<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
  <div class="min-h-screen bg-white p-4">
    <div class="max-w-4xl bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-medium mb-6">新增 banner 图</h2>

      <div class="space-y-6">
        <!-- 类型选择 -->
        <div class="flex items-center">
          <span class="text-red-500 mr-1">*</span>
          <span class="w-24 text-gray-600">类型</span>
          <div class="flex gap-6">
            <el-radio-group v-model="type">
              <el-radio label="image">图文详情</el-radio>
              <el-radio label="link">跳转链接</el-radio>
              <el-radio label="module">跳转模块</el-radio>
            </el-radio-group>
          </div>
        </div>

        <!-- Banner图片上传 -->
        <div class="flex">
          <span class="text-red-500 mr-1">*</span>
          <span class="w-24 text-gray-600">banner图片</span>
          <div>
            <el-upload
              class="banner-uploader"
              :show-file-list="false"
              :before-upload="beforeUpload"
              v-model:file-list="fileList"
            >
              <div v-if="!imageUrl" class="upload-placeholder">
                <el-icon><Plus /></el-icon>
                <div class="text-xs mt-1">上传</div>
              </div>
              <img v-else :src="imageUrl" class="uploaded-image" />
            </el-upload>
            <div class="text-gray-400 text-xs mt-2">图片格式为jpg、jpeg、png，尺寸1920*366</div>
          </div>
        </div>

        <!-- 排序 -->
        <div class="flex items-center">
          <span class="text-red-500 mr-1">*</span>
          <span class="w-24 text-gray-600">排序</span>
          <el-input v-model="sort" class="w-64" placeholder="请输入" />
        </div>

        <!-- 根据类型显示不同字段 -->
        <div v-if="type === 'image'" class="flex">
          <span class="text-red-500 mr-1">*</span>
          <span class="w-24 text-gray-600">详情内容</span>
          <div class="flex-1">
            <el-input type="textarea" v-model="content" :rows="6" placeholder="请输入详情内容" />
          </div>
        </div>

        <div v-if="type === 'link'" class="flex">
          <span class="text-red-500 mr-1">*</span>
          <span class="w-24 text-gray-600">链接地址</span>
          <el-input v-model="link" class="w-64" placeholder="请输入链接地址" />
        </div>

        <div v-if="type === 'module'" class="flex">
          <span class="text-red-500 mr-1">*</span>
          <span class="w-24 text-gray-600">跳转模块</span>
          <el-select v-model="module" class="w-64" placeholder="请选择">
            <el-option label="解决方案" value="solution" />
            <el-option label="公益测评" value="publicTest" />
            <el-option label="渠道合作" value="channel" />
            <el-option label="了解科1" value="about" />
            <el-option label="联系我们" value="contact" />
            <el-option label="注册页面" value="register" />
            <el-option label="登录页面" value="login" />
          </el-select>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-center gap-4 mt-8">
        <el-button type="primary" class="!rounded-button" @click="handleSubmit"> 保存并发布 </el-button>
        <el-button class="!rounded-button" @click="handleCancel">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const type = ref('image')
const imageUrl = ref('')
const fileList = ref([])
const sort = ref('')
const content = ref('')
const link = ref('')
const module = ref('')

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

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    imageUrl.value = reader.result as string
  }
  return false
}

const handleSubmit = () => {
  ElMessage.success('保存成功')
}

const handleCancel = () => {
  history.back()
}
</script>

<style scoped>
.banner-uploader {
  width: 360px;
  height: 180px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.banner-uploader:hover {
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

.custom-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
