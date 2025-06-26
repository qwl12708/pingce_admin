<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 搜索区域 -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div class="flex items-center space-x-6">
        <div class="flex items-center">
          <div style="width: 120px" class="text-gray-600 mr-2">模板名称</div>
          <el-input v-model="searchKeyword" placeholder="请输入" class="w-64 text-sm" />
        </div>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
        <el-button class="!rounded-button whitespace-nowrap" @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 flex justify-between items-center border-b border-gray-100">
        <h2 class="text-lg font-medium">作答指引模版</h2>
        <div class="space-x-2">
          <el-button @click="onAdd" type="primary" class="!rounded-button whitespace-nowrap">
            <el-icon class="mr-1"><Plus /></el-icon>新增模版
          </el-button>
          <el-button class="!rounded-button whitespace-nowrap" @click="handleBatchDelete">
            <el-icon class="mr-1"><Delete /></el-icon>删除模版
          </el-button>
        </div>
      </div>

      <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="模板编号" prop="id" width="100" />
        <el-table-column label="模板名称" prop="name" width="300">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">{{ row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="模板内容" prop="content" show-overflow-tooltip>
          <template #default="{ row }">
            <div v-html="row.content" class="text-gray-500 text-sm"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
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
import { Delete, Plus } from '@element-plus/icons-vue'
import router from '@/router'
import { getAnswerTemplateList, deleteAnswerTemplate } from '@/api/product'
import { ElMessage } from 'element-plus'

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedRows = ref<any[]>([])
const tableData = ref([])

const fetchTableData = async (name = '') => {
  try {
    const { data } = await getAnswerTemplateList({ name, page: currentPage.value, pageSize: pageSize.value })
    tableData.value = data.list
    total.value = data.total
  } catch (error) {
    console.error('获取作答指引模板列表失败', error)
  }
}

onMounted(() => {
  fetchTableData()
})

const handleSearch = () => {
  fetchTableData(searchKeyword.value)
}

const handleReset = () => {
  searchKeyword.value = ''
  fetchTableData()
}

const handleEdit = (row: any) => {
  router.push(`/product/answer-guide-add?id=${row.id}`)
}

const handleDelete = async (row: any) => {
  try {
    await deleteAnswerTemplate({ ids: row.id.toString() })
    ElMessage.success('删除成功')
    fetchTableData()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

const handleBatchDelete = async () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要删除的模板')
    return
  }
  try {
    const ids = selectedRows.value.map(row => row.id).join(',')
    await deleteAnswerTemplate({ ids })
    ElMessage.success('批量删除成功')
    fetchTableData()
  } catch (error) {
    ElMessage.error('批量删除失败')
  }
}

const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchTableData()
}

const handleCurrentChange = (val: number) => {
  console.log('%c [ handleCurrentChange ]-138', 'font-size:13px; background:pink; color:#bf2c9f;', val)
  currentPage.value = val
  fetchTableData()
}

const onAdd = () => {
  router.push('/product/answer-guide-add')
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
