<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-6">系统配置</h2>

    <el-form :model="form" label-width="140px" class="space-y-6">
      <el-form-item label="系统LOGO">
        <div>
          <ImageUploader v-model:value="form.logo" />
          <p class="text-gray-400 text-sm mt-2">支持图片格式：JPG/GIF/PNG/JPEG，文件大小小于2M，尺寸建议320x320以上</p>
        </div>
      </el-form-item>

      <el-form-item label="平台名称">
        <el-input v-model="form.name" placeholder="请输入平台名称" class="!w-80" />
      </el-form-item>

      <el-form-item label="自动服务功能">
        <el-switch :inactive-value="0" :active-value="1" v-model="form.self_service" />
      </el-form-item>

      <el-form-item label="用户注册审批">
        <el-switch :inactive-value="0" :active-value="1" v-model="form.user_register_approval" />
      </el-form-item>

      <el-form-item label="操作日志保存期限">
        <el-input v-model="form.log_expire_time" placeholder="请输入天数" class="!w-40">
          <template #append>天</template>
        </el-input>
      </el-form-item>
    </el-form>

    <div class="flex justify-start mt-10 space-x-4">
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSave">保存</el-button>
      <el-button class="!rounded-button whitespace-nowrap" @click="handleCancel">不保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

import { ElMessage } from 'element-plus'
import { getSystemConfig, setSystemConfig } from '@/api/system/user'
import ImageUploader from '@/components/ImageUploader/index.vue'

const form = reactive({
  logo: '',
  name: '',
  self_service: false,
  user_register_approval: false,
  log_expire_time: ''
})

const fetchSystemConfig = async () => {
  const response = await getSystemConfig()
  Object.assign(form, response.data)
}

onMounted(() => {
  fetchSystemConfig()
})

const handleSave = async () => {
  try {
    await setSystemConfig(form)
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

const handleCancel = () => {
  fetchSystemConfig()
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
