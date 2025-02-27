<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h1 class="text-2xl font-medium mb-8">日志详情</h1>
    <div class="bg-white rounded-lg p-6 mb-6 shadow-sm">
      <div class="grid grid-cols-2 gap-6">
        <div class="form-item">
          <label class="text-gray-500">日志ID：</label>
          <span>{{ logInfo.id }}</span>
        </div>
        <div class="form-item">
          <label class="text-gray-500">日志内容：</label>
          <span>{{ logInfo.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getLogInfo } from '@/api/system/user'

const route = useRoute()

const logId = ref(route.query.id)
const logInfo = ref<any>({})

const fetchLogInfo = async () => {
  const { data } = await getLogInfo({ id: Number(logId.value) })
  logInfo.value = data
}

onMounted(() => {
  fetchLogInfo()
})
</script>

<style scoped>
.form-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
