<template>
  <div class="main-content min-h-screen bg-white p-6">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="140px" class="space-y-10">
      <el-form-item
        label="姓名是否必填"
        prop="requireNameStatus"
        :rules="[{ required: true, message: '请选择是否必填', trigger: 'blur' }]"
      >
        <el-radio-group v-model="form.requireNameStatus">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="电话是否必填"
        prop="requireTelStatus"
        :rules="[{ required: true, message: '请选择是否必填', trigger: 'blur' }]"
      >
        <el-radio-group v-model="form.requireTelStatus">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="留言是否必填"
        prop="requireNoteStatus"
        :rules="[{ required: true, message: '请选择是否必填', trigger: 'blur' }]"
      >
        <el-radio-group v-model="form.requireNoteStatus">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="下方内容"
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
  requireNameStatus: false,
  requireTelStatus: false,
  requireNoteStatus: false
})

const rules = {
  requireNoteStatus: [{ required: true, message: '请选择是否必填', trigger: 'blur' }],
  requireTelStatus: [{ required: true, message: '请选择是否必填', trigger: 'blur' }],
  requireNameStatus: [{ required: true, message: '请选择是否必填', trigger: 'blur' }],
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
