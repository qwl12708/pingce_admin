<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-medium">产品套餐设置</h1>
        <div class="space-x-4">
          <el-button type="primary" class="!rounded-button" @click="handleAdd">
            <el-icon @click="onAddProduct" class="mr-1"><Plus /></el-icon>新增套餐
          </el-button>
          <el-button class="!rounded-button" @click="handleRefresh">
            <el-icon class="mr-1"><Refresh /></el-icon>刷新
          </el-button>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="packageCode" label="套餐编号" width="120" />
        <el-table-column prop="packageName" label="套餐名称" width="150" sortable />
        <el-table-column prop="type" label="类别" width="100" sortable />
        <el-table-column prop="availableSurveys" label="可使用问卷" width="180" sortable />
        <el-table-column prop="region" label="限制地区" width="120" sortable />
        <el-table-column prop="price" label="产品价格(元)" width="120" />
        <el-table-column prop="duration" label="使用期限" width="100" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <div class="flex items-center">
              <div :class="['w-2 h-2 rounded-full mr-2', row.status === '在用' ? 'bg-blue-500' : 'bg-red-500']"></div>
              {{ row.status }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160" sortable />
        <el-table-column prop="creator" label="创建人" width="100" />
        <el-table-column prop="freezeTime" label="冻结时间" width="160" sortable />
        <el-table-column prop="unfreezeTime" label="解冻时间" width="160" sortable />
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="{ row }">
            <el-button type="primary" link class="!rounded-button" @click="handleEdit(row)"> 编辑 </el-button>
            <el-button type="primary" link class="!rounded-button" @click="handleFreeze(row)">
              {{ row.status === '在用' ? '冻结' : '解冻' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-between items-center mt-4">
        <span class="text-gray-500">共 {{ total }} 条</span>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="total"
          layout="sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus, Refresh } from '@element-plus/icons-vue'
import router from '@/router'

interface TableItem {
  packageCode: string
  packageName: string
  type: string
  availableSurveys: string
  region: string
  price: number
  duration: string
  status: string
  createTime: string
  creator: string
  freezeTime: string
  unfreezeTime: string
}

const tableData = ref<TableItem[]>([
  {
    packageCode: 'TCBH-001',
    packageName: '校园通用测评包年',
    type: '包年/月',
    availableSurveys: '校园招聘通用测评问卷',
    region: '杭州',
    price: 5000.0,
    duration: '365天',
    status: '在用',
    createTime: '2024-04-12 13:00',
    creator: 'admin',
    freezeTime: '2024-04-12 13:00',
    unfreezeTime: '2024-04-12 13:00'
  },
  {
    packageCode: 'TCBH-002',
    packageName: '企业通用测评包月',
    type: '包年/月',
    availableSurveys: '企业通用测评问卷',
    region: '上海',
    price: 3000.0,
    duration: '365天',
    status: '冻结',
    createTime: '2024-04-12 13:00',
    creator: 'admin',
    freezeTime: '2024-04-12 13:00',
    unfreezeTime: '-'
  }
])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(999)

const handleSelectionChange = (val: TableItem[]) => {
  console.log('selection change:', val)
}

const handleAdd = () => {
  console.log('add new package')
}

const handleEdit = (row: TableItem) => {
  console.log('edit row:', row)
}

const handleFreeze = (row: TableItem) => {
  console.log('freeze/unfreeze row:', row)
}

const handleRefresh = () => {
  console.log('refresh table')
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

const onAddProduct = () => {
  console.log('add product')
  router.push('/product/add')
}
</script>

<style scoped>
.el-table {
  --el-table-header-bg-color: #f5f7fa;
}

.el-pagination {
  justify-content: flex-end;
}
</style>
