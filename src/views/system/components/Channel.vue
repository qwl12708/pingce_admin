<template>
  <div class="main-content min-h-screen bg-white p-6">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" class="space-y-6">
      <el-form-item
        label="详情内容"
        prop="content"
        :rules="[{ required: true, message: '请输入详情内容', trigger: 'blur' }]"
      >
        <WangEditor height="300px" v-model:value="form.content" class="w-full border rounded-md" />
      </el-form-item>
    </el-form>

    <div class="flex justify-center gap-4 mt-8">
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="onSubmit"> 保存并发布 </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import WangEditor from '@/components/WangEditor/index.vue'
import { getCooperation, setCooperation } from '@/api/website/index'

const formRef = ref()

const form = ref({
  content: ''
})

const rules = {
  content: [{ required: true, message: '请输入详情内容', trigger: 'blur' }]
}

const fetchCooperation = async () => {
  try {
    const response = await getCooperation()
    form.value.content = response.data.info
  } catch (error) {
    ElMessage.error('获取详情失败')
  }
}

onMounted(() => {
  fetchCooperation()
})

const onSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (valid) {
      try {
        await setCooperation({ info: form.value.content })
        ElMessage.success('保存成功')
      } catch (error) {
        ElMessage.error('保存失败')
      }
    }
  })
}
</script>

<style scoped>
.el-input-number :deep(.el-input__inner) {
  text-align: left;
}
</style>
