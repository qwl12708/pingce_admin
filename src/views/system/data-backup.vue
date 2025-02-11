<template>
  <div class="main-content min-h-screen bg-white p-6">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="140px" class="space-y-10">
      <el-form-item
        label="选择备份数据"
        prop="title"
        :rules="[{ required: true, message: '选择备份数据', trigger: 'blur' }]"
      >
        <el-checkbox-group class="flex flex-col" v-model="form.title">
          <el-checkbox v-for="item in checkData" :label="item.value" :key="item.value">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <div class="flex justify-center gap-4 mt-8">
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="onSubmit">保 存</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref()

const form = ref({
  name: ''
})

const checkData = [
  { label: '当期客户汇总表', value: 'backup' },
  { label: '产品套餐汇总表', value: 'backup-1' },
  { label: '公告项目测评汇总表', value: 'backup-2' },
  { label: '合同汇总表', value: 'backup-3' },
  { label: '系统管理员汇总表', value: 'backup-4' },
  { label: '系统测评问卷汇总表', value: 'backup-5' }
]

const rules = {
  name: [{ required: true, message: '请选择是否必填', trigger: 'blur' }]
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
