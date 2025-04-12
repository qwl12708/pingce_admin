<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div class="flex justify-between items-center p-6 border-b">
      <div class="flex items-center">
        <div class="text-gray-600 mr-4">审批角色</div>
        <el-select v-model="roleValue" class="w-32">
          <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleAdd">
        <el-icon class="mr-1"><Plus /></el-icon>添加自定义审批
      </el-button>
    </div>
    <div class="p-6">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="适用范围" prop="scope" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="创建时间" prop="create_time" width="200">
          <template #default="{ row }">
            <div class="text-gray-600">{{ formatTime(row.create_time) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <div class="flex items-center">
              <span class="w-2 h-2 rounded-full mr-2" :class="row.status ? 'bg-green-500' : 'bg-red-500'"></span>
              {{ row.status ? '正常' : '停用' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button link type="primary" class="!rounded-button whitespace-nowrap" @click="handleStatus(row)">
              {{ row.status ? '停用' : '启用' }}
            </el-button>
            <el-button link type="primary" class="!rounded-button whitespace-nowrap" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button link type="danger" class="!rounded-button whitespace-nowrap" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-between items-center mt-4">
        <span class="text-gray-600">共 {{ total }} 条</span>
        <div class="flex items-center space-x-2">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="total"
            :page-sizes="[10, 20, 30, 40]"
            layout="sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import router from '@/router'
import { deleteApprovalFlow, getApprovalFlowList } from '@/api/system/user'

import { ElMessage } from 'element-plus'
import { formatTime } from '@/utils/formatTime'

const page = ref(1)
const pageSize = ref(10)
const roleValue = ref('1')
const total = ref(0)
const tableData = ref<any[]>([])

const roleOptions = [
  {
    value: '1',
    label: '合同审批1'
  },
  {
    value: '2',
    label: '合同审批2'
  },
  {
    value: '3',
    label: '合同审批3'
  }
]

const fetchApprovalTypeList = async () => {
  const response = await getApprovalFlowList({ page: page.value, pageSize: pageSize.value })
  tableData.value = response.data.list

  total.value = response.data.total
}

onMounted(() => {
  fetchApprovalTypeList()
})

const handleAdd = () => {
  console.log('添加')
  router.push('/system/approval-process-update')
}
const handleEdit = (row: any) => {
  console.log('编辑', row)
  router.push(`/system/approval-process-update?id=${row.id}`)
}
const handleDelete = (row: any) => {
  deleteApprovalFlow({ id: row.id })
    .then(() => {
      ElMessage.success('删除成功')
      fetchApprovalTypeList()
    })
    .catch(e => console.error('error', e))
}
const handleStatus = (row: any) => {
  row.status = !row.status
}
const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchApprovalTypeList()
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchApprovalTypeList()
}
</script>
<style scoped>
.el-pagination {
  justify-content: flex-end;
}
</style>
