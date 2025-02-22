<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-8">{{ form.id ? '编辑' : '新增' }}作答指引模版</h2>

    <div class="space-y-6">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="模版名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入模版名称" class="input" />
        </el-form-item>

        <el-form-item label="模版内容" prop="content">
          <WangEditor height="400px" v-model:value="form.content" />
        </el-form-item>

        <div class="flex justify-center gap-4 mt-8">
          <el-button type="primary" class="!rounded-button" @click="handleSubmit">保存</el-button>
          <el-button class="!rounded-button" @click="handleCancel">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { addAnswerTemplate, editAnswerTemplate, getAnswerTemplateInfo } from '@/api/product'
import { ElMessage } from 'element-plus'
import WangEditor from '@/components/WangEditor/index.vue'

const router = useRouter()
const route = useRoute()
const formRef = ref()

const form = reactive({
  name: '',
  content: '',
  id: null
})

const rules = ref({
  name: [{ required: true, message: '请输入模版名称', trigger: 'blur' }],
  content: [{ required: true, message: '请输入模版内容', trigger: 'blur' }]
})

onMounted(async () => {
  const id = route.query.id
  if (id) {
    form.id = Number(id)
    try {
      const { data } = await getAnswerTemplateInfo({ id: form.id })
      Object.assign(form, data)
    } catch (error) {
      ElMessage.error('获取模版详情失败')
    }
  }
})

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    if (form.id) {
      await editAnswerTemplate(form)
    } else {
      await addAnswerTemplate(form)
    }
    ElMessage.success('提交成功')
    router.push('/product/answer-guide')
  } catch (error) {
    ElMessage.error('提交失败')
  }
}

const handleCancel = () => {
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
