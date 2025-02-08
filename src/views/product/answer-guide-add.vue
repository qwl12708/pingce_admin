<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-8">新增/编辑作答指引模版</h2>

    <div class="space-y-6">
      <div class="form-item">
        <label class="required-label">模版名称</label>
        <el-input v-model="form.name" placeholder="请输入模版名称" class="input" />
      </div>

      <div class="form-item">
        <label class="required-label">模版内容</label>
        <WangEditor height="400px" v-model:value="form.content" />
      </div>

      <div class="flex justify-center gap-4 mt-8">
        <el-button type="primary" class="!rounded-button" @click="handleSubmit">确认</el-button>
        <el-button class="!rounded-button" @click="handleCancel">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'
import WangEditor from '@/components/WangEditor/index.vue'

const router = useRouter()

const form = reactive({
  name: '',
  content: ''
})

const handleSubmit = () => {
  // 处理表单提交
  console.log('提交表单', form)
  // 提交后跳转回列表页面
  router.push('/product/answer-guide')
}

const handleCancel = () => {
  // 处理返回操作
  router.push('/product/answer-guide')
}
</script>

<style scoped>
.form-item {
  display: flex;
  align-items: center;
}

.form-item label {
  width: 120px;
  font-size: 14px;
  color: #333;
}

.input {
  width: 480px;
}

.editor {
  width: 100%;
  height: 300px;
}

.required-label::before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}
</style>
