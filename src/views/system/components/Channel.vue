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
import { ref } from 'vue'
import WangEditor from '@/components/WangEditor/index.vue'

const formRef = ref()

const form = ref({
  content: ''
})

const rules = {
  content: [{ required: true, message: '请输入详情内容', trigger: 'blur' }]
}

const onSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(valid => {
    if (valid) {
      console.log('submit form', form.value)
    }
  })
}
</script>

<style scoped>
.el-input-number :deep(.el-input__inner) {
  text-align: left;
}
</style>
