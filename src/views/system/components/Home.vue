<template>
  <div class="main-content min-h-screen bg-white">
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-medium">为什么选择科验配置</h2>
          <div class="space-x-2">
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleAdd">
              <el-icon class="mr-1"><Plus /></el-icon>新增
            </el-button>
            <el-button
              :disabled="!selectedItems.length"
              class="!rounded-button whitespace-nowrap"
              @click="handleBatchDelete"
            >
              <el-icon class="mr-1"><Delete /></el-icon>批量删除
            </el-button>
          </div>
        </div>

        <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
          <el-table-column type="selection" width="55" />
          <el-table-column label="图标" width="80">
            <template #default="scope">
              <div class="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                <img :src="scope.row.icon" class="w-full h-full object-cover" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="content" label="内容" show-overflow-tooltip />
          <el-table-column prop="sort" label="排序" width="80" />
          <el-table-column prop="creater" label="创建人" width="100" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
                {{ scope.row.status === 1 ? '显示' : '隐藏' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="180" />
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="scope">
              <el-button type="primary" link class="!rounded-button whitespace-nowrap" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button type="danger" link class="!rounded-button whitespace-nowrap" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm mt-6">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-medium">合作客户配置</h2>
          <div class="space-x-2">
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleAddClient">
              <el-icon class="mr-1"><Plus /></el-icon>新增
            </el-button>
            <el-button
              :disabled="!selectedClients.length"
              class="!rounded-button whitespace-nowrap"
              @click="handleBatchDeleteClient"
            >
              <el-icon class="mr-1"><Delete /></el-icon>批量删除
            </el-button>
          </div>
        </div>

        <el-table :data="CustomerData" @selection-change="handleClientSelectionChange" class="w-full">
          <el-table-column type="selection" width="55" />
          <el-table-column label="图标" width="80">
            <template #default="scope">
              <div class="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                <img :src="scope.row.icon" class="w-full h-full object-cover" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="客户名称" />
          <el-table-column prop="sort" label="排序" width="80" />
          <el-table-column prop="creater" label="创建人" width="100" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
                {{ scope.row.status === 1 ? '显示' : '隐藏' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="180" />
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="scope">
              <el-button
                type="primary"
                link
                class="!rounded-button whitespace-nowrap"
                @click="handleEditClient(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                link
                class="!rounded-button whitespace-nowrap"
                @click="handleDeleteClient(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { getCustomerList, getAdvantageList, deleteCustomer, deleteAdvantage } from '@/api/website/index'

interface TableItem {
  content: string
  create_time: number
  creater: string
  id: number
  icon: string
  sort: number
  status: number
  type: number
  update_time: number
  updater: string
}

interface CustomerTableItem {
  content: string
  icon: string
  id: number
  sort: number
  status: number
  title: string
}

const tableData = ref<TableItem[]>([])
const CustomerData = ref<CustomerTableItem[]>([])

const selectedItems = ref([])
const selectedClients = ref([])

const handleSelectionChange = (val: any[]) => {
  selectedItems.value = val
}

const handleClientSelectionChange = (val: any[]) => {
  selectedClients.value = val
}

const handleAdd = () => {
  router.push('/system/whychoose-update')
}

const handleEdit = (row: any) => {
  router.push(`/system/whychoose-update?id=${row.id}`)
}

const handleDelete = async (row: any) => {
  try {
    await deleteAdvantage({ ids: row.id.toString() })
    ElMessage.success('删除成功')
    fetchAdvantageList()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

const handleBatchDelete = async () => {
  if (selectedItems.value.length === 0) {
    ElMessage.warning('请选择要删除的项目')
    return
  }
  const ids = selectedItems.value.map(item => item.id).join(',')
  try {
    await deleteAdvantage({ ids })
    ElMessage.success('批量删除成功')
    fetchAdvantageList()
  } catch (error) {
    ElMessage.error('批量删除失败')
  }
}

const handleAddClient = () => {
  router.push('/system/logo-add')
}

const handleEditClient = (row: any) => {
  router.push(`/system/logo-add?id=${row.id}`)
}

const handleDeleteClient = async (row: any) => {
  try {
    await deleteCustomer({ ids: row.id.toString() })
    ElMessage.success('删除成功')
    fetchCustomerList()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

const handleBatchDeleteClient = async () => {
  if (selectedClients.value.length === 0) {
    ElMessage.warning('请选择要删除的客户')
    return
  }
  const ids = selectedClients.value.map(item => item.id).join(',')
  try {
    await deleteCustomer({ ids })
    ElMessage.success('批量删除成功')
    fetchCustomerList()
  } catch (error) {
    ElMessage.error('批量删除失败')
  }
}

const fetchCustomerList = async () => {
  try {
    const response = await getCustomerList()
    console.log('%c [ response ]-180', 'font-size:13px; background:pink; color:#bf2c9f;', response)
    CustomerData.value = response.data
  } catch (error) {
    console.error('获取客户列表失败', error)
  }
}

const fetchAdvantageList = async () => {
  try {
    const response = await getAdvantageList()
    console.log('%c [ 获取优势列表 ]-190', 'font-size:13px; background:pink; color:#bf2c9f;', response)
    tableData.value = response.data
  } catch (error) {
    console.error('获取优势列表失败', error)
  }
}

onMounted(() => {
  fetchCustomerList()
  fetchAdvantageList()
})
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
