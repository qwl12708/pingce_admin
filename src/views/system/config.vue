<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-6">系统 LOGO 设置</h2>

    <div class="bg-gray-50 w-80 h-80 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
      <img v-if="logoUrl" :src="logoUrl" alt="系统 Logo" class="w-full h-full object-contain" />
      <el-icon v-else class="text-gray-300 text-6xl"><Picture /></el-icon>
    </div>

    <el-upload
      class="mb-6"
      :auto-upload="false"
      :show-file-list="false"
      accept=".jpg,.jpeg,.png,.gif"
      @change="handleLogoChange"
    >
      <el-button type="primary" class="!rounded-button whitespace-nowrap">上传图片</el-button>
    </el-upload>

    <p class="text-gray-400 text-sm mb-8">支持图片格式：JPG/GIF/PNG/JPEG，文件大小小于2M，尺寸建议320x320以上</p>

    <div class="space-y-2">
      <div class="flex items-center">
        <span class="w-32 text-gray-600">平台名称</span>
        <el-input v-model="platformName" placeholder="请输入平台名称" class="!w-80 mr-4" />
        <el-button type="primary" class="!rounded-button whitespace-nowrap">修改</el-button>
      </div>

      <div class="flex items-center">
        <span class="w-32 text-gray-600">自动服务功能</span>
        <el-switch v-model="autoService" />
      </div>

      <div class="flex items-center">
        <span class="w-32 text-gray-600">用户注册审批</span>
        <el-switch v-model="userRegisterApproval" />
      </div>

      <div class="flex items-center">
        <span class="w-32 text-gray-600">操作日志保存期限</span>
        <el-input v-model="logRetentionDays" placeholder="请输入天数" class="!w-80 mr-4" />
        <el-button type="primary" class="!rounded-button whitespace-nowrap">修改</el-button>
      </div>
    </div>

    <div class="flex justify-start mt-10 space-x-4">
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSave">保存</el-button>
      <el-button class="!rounded-button whitespace-nowrap" @click="handleCancel">不保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const logoUrl = ref('')
const platformName = ref('人才素质及学生心理测评系统')
const autoService = ref(true)
const userRegisterApproval = ref(false)
const logRetentionDays = ref('10')

const handleLogoChange = (file: any) => {
  if (file.raw.size > 2 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }
  logoUrl.value = URL.createObjectURL(file.raw)
}

const handleSave = () => {
  ElMessage.success('保存成功')
}

const handleCancel = () => {
  ElMessage.info('已取消保存')
}
</script>

<style scoped>
.el-input :deep(.el-input__wrapper) {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: none !important;
}

.el-input :deep(.el-input__wrapper.is-focus) {
  border-color: #409eff;
}

.el-button.is-text {
  border: none;
}
</style>
