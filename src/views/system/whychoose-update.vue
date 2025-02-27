<template>
  <div class="min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-6">{{ isEditPage ? '编辑' : '新增' }}</h2>
    <el-form ref="formRef" :model="form" label-width="120px">
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="内容" prop="content" required>
        <el-input type="textarea" v-model="form.content" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="图标" prop="icon" required>
        <ImageUploader v-model:value="form.icon" />
      </el-form-item>
      <el-form-item label="排序" prop="sort" required>
        <el-input-number v-model="form.sort" :min="1" />
      </el-form-item>
      <div class="flex justify-center gap-4 mt-8">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getAdvantageInfo, addAdvantage, editAdvantage } from '@/api/website/index'
import ImageUploader from '@/components/ImageUploader/index.vue'
import type { FormInstance } from 'element-plus'

const route = useRoute()
const router = useRouter()
const isEditPage = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({
  title: '',
  content: '',
  icon: '',
  sort: 1
})

const fetchAdvantageInfo = async (id: number) => {
  try {
    const response = await getAdvantageInfo({ id })
    form.title = response.data.title
    form.content = response.data.content
    form.icon = response.data.icon
    form.sort = response.data.sort
  } catch (error) {
    ElMessage.error('获取详情失败')
  }
}

onMounted(() => {
  if (route.query.id) {
    isEditPage.value = true
    const id = Number(route.query.id)
    fetchAdvantageInfo(id)
  }
})

const handleSubmit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    if (isEditPage.value) {
      await editAdvantage({ ...form, id: Number(route.query.id) })
    } else {
      await addAdvantage(form)
    }
    ElMessage.success('保存成功')
    router.push('/website-config')
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

const handleCancel = () => {
  router.back()
}
</script>

<style scoped>
.avatar-uploader {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
