<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-6">{{ isEditPage ? '编辑客户LOGO' : '新增客户LOGO' }}</h2>
    <el-form :model="formData" label-width="120px">
      <el-form-item label="客户名称" prop="title" required>
        <el-input v-model="formData.title" placeholder="请输入" class="!w-[500px]" />
      </el-form-item>

      <el-form-item label="图标" prop="icon" required>
        <ImageUploader v-model:value="formData.icon" />
        <div class="text-gray-400 text-sm mt-2">图片格式为jpg、jpeg、png，尺寸48*48</div>
      </el-form-item>

      <el-form-item label="排序" prop="sort" required>
        <el-input v-model="formData.sort" placeholder="请输入" class="!w-[500px]" />
      </el-form-item>

      <div class="flex justify-start space-x-4 mt-10 pl-16">
        <el-button type="primary" @click="handleSubmit" class="!rounded-button whitespace-nowrap">
          保存并发布
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getCustomerInfo, addCustomer, editCustomer } from '@/api/website/index'
import ImageUploader from '@/components/ImageUploader/index.vue'

const route = useRoute()
const router = useRouter()
const isEditPage = ref(false)
const formData = reactive({
  title: '',
  icon: '',
  sort: ''
})

const fetchCustomerInfo = async (id: string) => {
  try {
    const response = await getCustomerInfo({ id })
    formData.title = response.data.title
    formData.icon = response.data.icon
    formData.sort = response.data.sort
  } catch (error) {
    ElMessage.error('获取详情失败')
  }
}

onMounted(() => {
  if (route.query.id) {
    isEditPage.value = true
    const id = route.query.id as string
    fetchCustomerInfo(id)
  }
})

const handleSubmit = async () => {
  if (!formData.title) {
    ElMessage.warning('请输入标题')
    return
  }
  if (!formData.icon) {
    ElMessage.warning('请上传图标')
    return
  }
  if (!formData.sort) {
    ElMessage.warning('请输入排序')
    return
  }
  try {
    if (isEditPage.value) {
      await editCustomer({ ...formData, id: route.query.id as string })
    } else {
      await addCustomer(formData)
    }
    ElMessage.success('保存成功')
    router.push('/system/website-config?tab=home')
  } catch (error) {
    ElMessage.error('保存失败')
  }
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
