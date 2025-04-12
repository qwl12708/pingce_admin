<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-medium">产品套餐设置</h1>
        <div class="space-x-4">
          <el-button type="primary" class="!rounded-button" @click="onAddProduct">
            <el-icon class="mr-1"><Plus /></el-icon>新增套餐
          </el-button>
          <el-button class="!rounded-button" @click="handleRefresh">
            <el-icon class="mr-1"><Refresh /></el-icon>刷新
          </el-button>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="product_no" label="套餐编号" width="120" />
        <el-table-column prop="name" label="套餐名称" width="150" sortable />
        <el-table-column prop="type" label="类别" width="100" sortable />
        <el-table-column prop="evaluation_name" label="可使用问卷" width="180" sortable />
        <el-table-column prop="limit_area" label="限制区域" width="120" sortable />
        <el-table-column prop="price" label="产品价格(元)" width="120" />
        <el-table-column prop="day" label="使用周期" width="100" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <div class="flex items-center">
              <div :class="['w-2 h-2 rounded-full mr-2', row.status === 1 ? 'bg-blue-500' : 'bg-red-500']"></div>
              {{ row.status === 1 ? '在用' : '冻结' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="160" sortable>
          <template #default="{ row }">
            {{ formatTime(row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="creater" label="创建人" width="100" />
        <el-table-column prop="status_time" label="状态时间" width="160" sortable>
          <template #default="{ row }">
            {{ formatTime(row.status_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="{ row }">
            <el-button type="primary" link class="!rounded-button" @click="handleEdit(row)"> 编辑 </el-button>
            <el-button type="danger" link class="!rounded-button" @click="handleFreeze(row)">
              {{ row.status === 1 ? '冻结' : '解冻' }}
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
import { ref, onMounted } from 'vue'
import { Plus, Refresh } from '@element-plus/icons-vue'
import router from '@/router'
import { getProductList, updateProductStatus } from '@/api/product'

import { ElMessage } from 'element-plus'
import { formatTime } from '@/utils/formatTime'

interface TableItem {
  product_no: string
  name: string
  type: number
  evaluation_name: string
  limit_area: string[]
  price: number
  day: number
  status: number
  create_time: number
  creater: string
  status_time: number
}

const tableData = ref<TableItem[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const fetchProductList = async () => {
  const { data } = await getProductList({ page: currentPage.value, pageSize: pageSize.value })
  tableData.value = data.list
  total.value = data.total
}

onMounted(() => {
  fetchProductList()
})

const handleSelectionChange = (val: TableItem[]) => {
  console.log('selection change:', val)
}

const handleEdit = (row: TableItem) => {
  console.log('edit row:', row)
  router.push({ path: '/product/add', query: { id: row.id } })
}

const handleFreeze = async (row: TableItem) => {
  console.log('freeze/unfreeze row:', row)
  const res = await updateProductStatus({ id: row.id, status: row.status === 1 ? 0 : 1 })
  if (res.code === 200) {
    fetchProductList()
    ElMessage.success('操作成功')
  }
}

const handleRefresh = () => {
  console.log('refresh table')
  fetchProductList()
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchProductList()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchProductList()
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
