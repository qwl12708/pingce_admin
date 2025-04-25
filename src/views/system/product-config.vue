<template>
  <div class="main-content min-h-screen bg-white pl-5 pt-10">
    <div class="bg-white rounded-lg shadow-sm">
      <!-- banner配置 -->
      <div class="flex justify-between items-center py-4">
        <div class="text-lg font-medium">产品配置</div>
        <div class="flex gap-2">
          <el-button type="primary" class="!rounded-button" @click="handleAdd">
            <el-icon class="mr-1"><Plus /></el-icon>新增
          </el-button>
          <el-button class="!rounded-button" @click="handleDelete" :disabled="!selectedRows.length">
            <el-icon class="mr-1"><Delete /></el-icon>批量删除
          </el-button>
        </div>
      </div>

      <!-- 表格区域 -->
      <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="缩略图" width="100">
          <template #default="scope">
            <el-image :src="scope.row.img" class="w-16 h-16 object-cover" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="creater" label="创建人" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
              {{ scope.row.status === 1 ? '显示' : '隐藏' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template #default="scope">
            {{ formatTime(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="scope">
            <el-button link type="primary" @click="handleDetail(scope.row.id)">详情</el-button>
            <el-button link type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button link type="danger" @click="handleRowDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-between items-center py-4">
        <div class="text-gray-500">共 {{ total }} 条</div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="total"
          layout="sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import router from '@/router'
import { getProductList, deleteProduct } from '@/api/website/index'

import { formatTime } from '@/utils/formatTime'

interface TableItem {
  content: string
  create_time: number
  creater: string
  id: number
  img: string
  sort: number
  status: number
  type: number
  update_time: number
  updater: string
}

const selectedRows = ref<TableItem[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const tableData = ref<TableItem[]>([])

const handleSelectionChange = (rows: TableItem[]) => {
  selectedRows.value = rows
}

const handleAdd = () => {
  console.log('Add new item')
  router.push('/system/product-banner-add')
}

const handleDelete = async () => {
  if (selectedRows.value.length === 0) return
  const ids = selectedRows.value.map(row => row.id).join(',')
  try {
    await deleteProduct({ ids })
    console.log('Delete selected items', selectedRows.value)
    // 删除成功后刷新列表
    fetchBannerList()
  } catch (error) {
    console.error('删除失败', error)
  }
}

const handleDetail = (id: number) => {
  router.push(`/system/product-banner-add?id=${id}&type=detail`)
}

const handleEdit = (id: number) => {
  router.push(`/system/product-banner-add?id=${id}&type=edit`)
}

const handleRowDelete = async (row: any) => {
  try {
    await deleteProduct({ ids: row.id })
    console.log('Delete single item', row)
    // 删除成功后刷新列表
    fetchBannerList()
  } catch (error) {
    console.error('删除失败', error)
  }
}

const fetchBannerList = async () => {
  try {
    const response = await getProductList()
    tableData.value = response.data
    total.value = response.total || response.data.length
  } catch (error) {
    console.error('获取Banner列表失败', error)
  }
}

onMounted(() => {
  fetchBannerList()
})

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}
</script>

<style scoped>
.el-table {
  --el-table-header-bg-color: #f5f7fa;
}

.el-table th {
  font-weight: 500;
}

/* 移除number类型input的上下箭头 */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
