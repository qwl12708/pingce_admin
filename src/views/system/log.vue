<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 搜索区域 -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div class="flex items-center space-x-6">
        <div class="flex items-center">
          <div style="width: 120px" class="text-gray-600 mr-2">日志类型</div>
          <el-input v-model="searchKeyword" placeholder="请输入" class="w-64 text-sm" />
        </div>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
        <el-button class="!rounded-button whitespace-nowrap" @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="ID" prop="id" width="100" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="标题" prop="title" />
        <el-table-column label="URL" prop="url" sortable />
        <el-table-column label="IP" prop="ip" sortable />
        <el-table-column label="记录时间" prop="create_time" sortable>
          <template #default="{ row }">
            {{ formatTime(row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="{ row }">
            <el-button type="primary" link class="!rounded-button" @click="handleDetail(row)"> 详情 </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-between items-center p-4">
        <div class="text-gray-500">共 {{ total }} 条</div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getLoglist } from '@/api/system/user'

import { formatTime } from '@/utils/formatTime'

const router = useRouter()
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedRows = ref<any[]>([])

const tableData = ref([])

const fetchLogList = async () => {
  const { data } = await getLoglist({ page: currentPage.value, pageSize: pageSize.value })
  tableData.value = data.list
  total.value = data.total
}

onMounted(() => {
  fetchLogList()
})

const handleSearch = () => {
  fetchLogList()
}

const handleReset = () => {
  searchKeyword.value = ''
  fetchLogList()
}

const handleDetail = (row: any) => {
  router.push({ path: '/system/log/detail', query: { id: row.id } })
}

const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchLogList()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchLogList()
}
</script>

<style scoped>
.el-input :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

.el-input :deep(.el-input__wrapper):hover {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

.el-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff inset;
}

.el-table :deep(th.el-table__cell) {
  background-color: #f5f7fa;
}
</style>
