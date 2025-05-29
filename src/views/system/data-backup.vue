<template>
  <div class="main-content min-h-screen bg-white p-6">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="140px" class="space-y-10">
      <el-form-item
        label="选择备份数据"
        prop="selectedItems"
        :rules="[{ required: true, message: '选择备份数据', trigger: 'blur' }]"
      >
        <el-checkbox-group class="flex flex-col" v-model="form.selectedItems">
          <el-checkbox v-for="item in checkData" :label="item.name" :key="item.name">
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <div class="flex justify-center gap-4 mt-8">
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="onSubmit">确认备份</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBackupConfig, setBackupConfig } from '@/api/system/user'
import { ElMessage } from 'element-plus'

const formRef = ref()
const checkData = ref([])

const form = ref({
  selectedItems: []
})

const rules = {
  selectedItems: [{ required: true, message: '请选择备份数据', trigger: 'blur' }]
}

const fetchBackupConfig = async () => {
  const { data } = await getBackupConfig()
  checkData.value = data
}

onMounted(() => {
  fetchBackupConfig()
})

const onSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (valid) {
      const content = Object.values(checkData.value).filter(e => form.value.selectedItems.includes(e.name))

      const promiseList = content.map(
        async contentItem => await setBackupConfig({ content: JSON.stringify([contentItem]) })
      )
      const results = await Promise.all(promiseList)
      results.forEach(item => {
        downloadFile(item.data, item.fileName)
      })
    }
  })
}

function downloadFile(blobStr, fileName) {
  const blob = new Blob([blobStr])
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
  ElMessage.success(`导出${fileName}成功`)
}
</script>

<style scoped>
.el-input-number :deep(.el-input__inner) {
  text-align: left;
}
</style>
