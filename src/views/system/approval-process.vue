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
        <el-table-column label="创建时间" prop="createTime" width="200" />
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
            <el-button link type="primary" class="!rounded-button whitespace-nowrap" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-between items-center mt-4">
        <span class="text-gray-600">共 999 条</span>
        <div class="flex items-center space-x-2">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="999"
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
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import router from '@/router'

const roleValue = ref('1')
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
const currentPage = ref(1)
const pageSize = ref(10)
const tableData = ref([
  {
    name: '设备审批流1',
    scope: 'shi适用范围1',
    description: '非必填项，看情况',
    createTime: '2023-04-22 11:00-11:30',
    status: true
  },
  {
    name: '设备审批测试',
    scope: 'shi适用范围3',
    description: '非必填项，看情况',
    createTime: '2023-04-22 11:00-11:30',
    status: false
  },
  {
    name: '设备审批流2',
    scope: 'shi适用范围2',
    description: '非必填项，看情况',
    createTime: '2023-04-22 11:00-11:30',
    status: true
  },
  {
    name: '设备审批流3',
    scope: 'shi适用范围444',
    description: '非必填项，看情况',
    createTime: '2023-04-22 11:00-11:30',
    status: false
  }
])
const handleAdd = () => {
  console.log('添加')
  router.push('/system/approval-process-update')
}
const handleEdit = (row: any) => {
  console.log('编辑', row)
  router.push(`/system/approval-process-update?id=${row.id}`)
}
const handleDelete = (row: any) => {
  console.log('删除', row)
}
const handleStatus = (row: any) => {
  row.status = !row.status
}
const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}
</script>
<style scoped>
.el-pagination {
  justify-content: flex-end;
}
</style>
