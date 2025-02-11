<template>
  <div class="main-content min-h-screen bg-white p-6">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="140px" class="space-y-10">
      <el-form-item
        label="公告标题"
        prop="title"
        :rules="[{ required: true, message: '请输入公共标题', trigger: 'blur' }]"
      >
        <el-input v-model="form.name" placeholder="请输入公告标题" clearable />
      </el-form-item>

      <el-form-item
        label="公告图片"
        prop="image"
        :rules="[{ required: true, message: '请上传公告图片', trigger: 'blur' }]"
      >
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :limit="1"
          :file-list="fileList"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item
        label="公告内容"
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
