<template>
  <div class="main-content min-h-screen bg-white p-6">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="140px" class="space-y-10">
      <el-form-item
        label="姓名是否必填"
        prop="is_name_need"
        :rules="[{ required: true, message: '请选择是否必填', trigger: 'blur' }]"
      >
        <el-radio-group v-model="form.is_name_need">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="电话是否必填"
        prop="is_phone_need"
        :rules="[{ required: true, message: '请选择是否必填', trigger: 'blur' }]"
      >
        <el-radio-group v-model="form.is_phone_need">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="留言是否必填"
        prop="is_feedback_need"
        :rules="[{ required: true, message: '请选择是否必填', trigger: 'blur' }]"
      >
        <el-radio-group v-model="form.is_feedback_need">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="下方内容"
        prop="info"
        :rules="[{ required: true, message: '请输入详情内容', trigger: 'blur' }]"
      >
        <WangEditor height="300px" v-model:value="form.info" class="w-full border rounded-md" />
      </el-form-item>
    </el-form>

    <div class="flex justify-center gap-4 mt-8">
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="onSubmit"> 保存并发布 </el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import WangEditor from '@/components/WangEditor/index.vue'
import { getContact, setContact } from '@/api/website/index'

const formRef = ref()

const form = reactive({
  info: '',
  is_name_need: false,
  is_phone_need: false,
  is_feedback_need: false
})

const rules = {
  is_feedback_need: [{ required: true, message: '请选择是否必填', trigger: 'blur' }],
  is_phone_need: [{ required: true, message: '请选择是否必填', trigger: 'blur' }],
  is_name_need: [{ required: true, message: '请选择是否必填', trigger: 'blur' }],
  info: [{ required: true, message: '请输入详情内容', trigger: 'blur' }]
}

const fetchContact = async () => {
  try {
    const response = await getContact()
    form.info = response.data.info
    form.is_name_need = response.data.is_name_need
    form.is_phone_need = response.data.is_phone_need
    form.is_feedback_need = response.data.is_feedback_need
  } catch (error) {
    ElMessage.error('获取详情失败')
  }
}

onMounted(() => {
  fetchContact()
})

const onSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (valid) {
      try {
        await setContact({
          info: form.info,
          is_name_need: form.is_name_need,
          is_phone_need: form.is_phone_need,
          is_feedback_need: form.is_feedback_need
        })
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
