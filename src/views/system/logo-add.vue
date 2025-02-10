<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-6">新增客户LOGO</h2>
    <div class="space-y-6">
      <!-- 标题 -->
      <div class="form-group flex items-center gap-4">
        <label class="required-label w-24 flex-shrink-0">客户名称</label>
        <el-input v-model="formData.title" placeholder="请输入" class="!w-[500px]" />
      </div>

      <!-- 图标上传 -->
      <div class="form-group flex items-start gap-4">
        <label class="required-label w-24 flex-shrink-0 mt-2">图标</label>
        <el-upload class="upload-demo !w-[500px]" :auto-upload="false" :limit="1" :on-change="handleFileChange">
          <template #trigger>
            <el-button type="primary" class="!rounded-button">
              <el-icon class="mr-1"><Plus /></el-icon>上传
            </el-button>
          </template>
          <template #tip>
            <div class="text-gray-400 text-sm mt-2">图片格式为jpg、jpeg、png，尺寸48*48</div>
          </template>
        </el-upload>
      </div>

      <!-- 排序 -->
      <div class="form-group flex items-center gap-4">
        <label class="required-label w-24 flex-shrink-0">排序</label>
        <el-input v-model="formData.sort" placeholder="请输入" class="!w-[500px]" />
      </div>

      <!-- 按钮组 -->
      <div class="flex justify-start space-x-4 mt-10 pl-16">
        <el-button type="primary" @click="handleSubmit" class="!rounded-button whitespace-nowrap">
          保存并发布
        </el-button>
        <el-button @click="handleCancel" class="!rounded-button whitespace-nowrap"> 返回 </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
interface FormData {
  title: string
  content: string
  icon: File | null
  sort: string
}
const formData = ref<FormData>({
  title: '',
  content: '',
  icon: null,
  sort: ''
})
const handleFileChange = (file: any) => {
  formData.value.icon = file.raw
}
const handleSubmit = () => {
  if (!formData.value.title) {
    ElMessage.warning('请输入标题')
    return
  }
  if (!formData.value.icon) {
    ElMessage.warning('请上传图标')
    return
  }
  if (!formData.value.sort) {
    ElMessage.warning('请输入排序')
    return
  }
  ElMessage.success('保存成功')
}
const handleCancel = () => {
  // 返回上一页
  history.back()
}
</script>
<style scoped>
.required-label {
  text-align: right;
}
.required-label::before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}
.form-group :deep(.el-input__wrapper),
.form-group :deep(.el-textarea__inner) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}
.form-group :deep(.el-input__wrapper:hover),
.form-group :deep(.el-textarea__inner:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}
.form-group :deep(.el-input__wrapper.is-focus),
.form-group :deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px #409eff inset;
}
/* 移除number类型input的箭头 */
.form-group :deep(.el-input__inner::-webkit-outer-spin-button),
.form-group :deep(.el-input__inner::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}
</style>
