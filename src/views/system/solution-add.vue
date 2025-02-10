<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-6">新增解决方案</h2>

    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" class="space-y-6">
      <el-form-item
        label="方案名称"
        prop="name"
        :rules="[{ required: true, message: '请输入方案名称', trigger: 'blur' }]"
      >
        <el-input v-model="form.name" placeholder="请输入" maxlength="50" show-word-limit class="w-full" />
      </el-form-item>

      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="0" placeholder="请输入" class="w-48" />
      </el-form-item>

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

// import type { FormInstance } from 'element-plus'
import WangEditor from '@/components/WangEditor/index.vue'

const formRef = ref()

const form = ref({
  name: '',
  sort: 0,
  content: ''
})

const rules = {
  name: [
    { required: true, message: '请输入方案名称', trigger: 'blur' },
    { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
  ],
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

const onCancel = () => {
  formRef.value?.resetFields()
}
</script>

<style scoped>
.el-input-number :deep(.el-input__inner) {
  text-align: left;
}
</style>
