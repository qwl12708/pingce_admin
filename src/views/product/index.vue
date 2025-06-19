<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div class="p-6">
      <div class="mb-4">
        <el-form :inline="true" :model="filterForm" class="flex flex-wrap gap-x-6 gap-y-2">
          <el-form-item label="套餐名称">
            <el-input v-model="filterForm.name" placeholder="请输入套餐名称" clearable style="width: 160px" />
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="filterForm.type" placeholder="请选择类别" clearable style="width: 120px">
              <el-option label="包年/月" :value="1" />
              <el-option label="点数" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="可使用问卷">
            <el-input
              v-model="filterForm.evaluation_name"
              placeholder="请输入可使用问卷"
              clearable
              style="width: 160px"
            />
          </el-form-item>
          <el-form-item label="限售区域">
            <el-tree-select
              v-model="filterForm.limit_area"
              placeholder="请选择限售区域"
              clearable
              filterable
              :data="regionData"
              show-checkbox
              multiple
              node-key="id"
              :props="defaultProps"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="filterForm.status" placeholder="全部" clearable style="width: 120px">
              <el-option label="在用" :value="1" />
              <el-option label="冻结" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="!rounded-button" @click="handleFilter">查询</el-button>
            <el-button class="!rounded-button ml-2" @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
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
        <el-table-column prop="type" label="类别" width="100" sortable>
          <template #default="{ row }">
            <span>{{ row.type === 1 ? '包年/月' : '点数' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="evaluation_name" label="可使用问卷" width="180" sortable />
        <el-table-column prop="limit_area" label="限售区域" width="120" sortable>
          <template #default="scope">
            {{ getAreaName(scope.row.limit_area) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="产品价格(元)"
          width="120"
          sortable
          :sort-method="(a: TableItem, b: TableItem) => a.price - b.price"
        />
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
import { getAreas } from '@/api/customer'

import { ElMessage } from 'element-plus'
import { formatTime } from '@/utils/formatTime'

interface TableItem {
  id: number // 新增id字段
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

const filterForm = ref({
  name: '',
  type: '',
  evaluation_name: '',
  limit_area: [],
  status: null
})

const regionData = ref<any[]>([])
const originalDataMap = ref<Record<string, any>>({})
const defaultProps = {
  children: 'children',
  label: 'label'
}

const fetchAreas = async () => {
  try {
    const { data } = await getAreas()
    originalDataMap.value = data.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
    regionData.value = transformToTree(data)
  } catch (error) {
    console.error('获取地区列表失败', error)
  }
}

const getAreaName = areaArr => {
  const area = (areaArr || []).map(item => (item || []).map(id => originalDataMap.value[id]?.name))
  return area.join(', ')
}

const transformToTree = (data: any[]) => {
  const tree: any[] = []
  const map: Record<string, any> = {}
  data.forEach(item => {
    map[item.id] = { ...item, label: item.name, children: [] }
  })
  data.forEach(item => {
    if (item.pid === 0) {
      tree.push(map[item.id])
    } else {
      if (map[item.pid]) {
        map[item.pid].children.push(map[item.id])
      }
    }
  })
  return tree
}

const handleFilter = () => {
  currentPage.value = 1
  fetchProductList()
}

const handleReset = () => {
  filterForm.value = {
    name: '',
    type: '',
    evaluation_name: '',
    limit_area: [],
    status: null
  }
  currentPage.value = 1
  fetchProductList()
}

const fetchProductList = async () => {
  const params: any = {
    page: currentPage.value,
    pageSize: pageSize.value,
    ...filterForm.value,
    limit_area: null,
    city_ids: filterForm.value.limit_area.join(',') || ''
  }
  if (!params.limit_area || params.limit_area.length === 0) {
    delete params.limit_area
  }
  if (!params.status) {
    delete params.status
  }
  const { data } = await getProductList(params)
  tableData.value = data.list
  total.value = data.total
}

onMounted(() => {
  fetchAreas()
  fetchProductList()
})

const handleSelectionChange = (val: TableItem[]) => {
  // 这里可以根据需要处理选中项
}

const handleEdit = (row: TableItem) => {
  router.push({ path: '/product/add', query: { id: row.id } })
}

const handleFreeze = async (row: TableItem) => {
  const res = await updateProductStatus({ id: row.id, status: row.status === 1 ? 0 : 1 })
  // 兼容 res.data.code 取值
  if (res && res.data && res.data.code === 200) {
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
