<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-6">{{ isEditPage ? '编辑解决方案' : '新增解决方案' }}</h2>

    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" class="space-y-6">
      <el-form-item
        label="方案名称"
        prop="title"
        :rules="[{ required: true, message: '请输入方案名称', trigger: 'blur' }]"
      >
        <el-input v-model="form.title" placeholder="请输入" maxlength="50" show-word-limit class="w-full" />
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
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSubmit"> 保存并发布 </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getSolutionInfo, addSolution, editSolution } from '@/api/website/index'
import WangEditor from '@/components/WangEditor/index.vue'

const route = useRoute()
const router = useRouter()
const isEditPage = ref(false)
const formRef = ref()

const form = reactive({
  title: '',
  sort: 0,
  content: ''
})

const rules = {
  title: [
    { required: true, message: '请输入方案名称', trigger: 'blur' },
    { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
  ],
  content: [{ required: true, message: '请输入详情内容', trigger: 'blur' }]
}

const fetchSolutionInfo = async id => {
  try {
    const {
      data: {
        info: { title, content, sort }
      }
    } = await getSolutionInfo({ id })
    Object.assign(form, {
      title,
      content,
      sort
    })
  } catch (error) {
    ElMessage.error('获取详情失败')
  }
}

onMounted(() => {
  if (route.query.id) {
    isEditPage.value = true
    const id = Number(route.query.id)
    fetchSolutionInfo(id)
  }
})

const handleSubmit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    if (isEditPage.value) {
      await editSolution({ ...form, id: Number(route.query.id) })
    } else {
      await addSolution(form)
    }
    ElMessage.success('保存成功')
    router.push('/system/website-config')
  } catch (error) {
    ElMessage.error('保存失败')
  }
}
</script>

<style scoped>
.el-input-number :deep(.el-input__inner) {
  text-align: left;
}
</style>
