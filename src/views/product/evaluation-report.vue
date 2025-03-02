<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 搜索区域 -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div class="flex items-center space-x-6">
        <div class="flex items-center">
          <div style="width: 120px" class="text-gray-600 mr-2">手机号码</div>
          <el-input type="number" v-model="searchKeyword" placeholder="请输入" class="w-64 text-sm" />
        </div>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
        <el-button class="!rounded-button whitespace-nowrap" @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 标签页区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="border-b">
        <div class="flex">
          <div
            v-for="tab in tabs"
            :key="tab.key"
            :class="[
              'px-6 py-4 cursor-pointer text-sm',
              activeTab === tab.key ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
            ]"
            @click="onTabClick(tab.key)"
          >
            {{ tab.name }}
          </div>
        </div>
      </div>

      <!-- 表格区域 -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-4 flex justify-between items-center border-b border-gray-100">
          <h2 class="text-lg font-medium">邀请函模版</h2>
          <div class="space-x-2">
            <el-button @click="onAdd" type="primary" class="!rounded-button whitespace-nowrap"> 导出 </el-button>
            <template v-if="activeTab === 'pending'">
              <el-button class="!rounded-button whitespace-nowrap" @click="handleDownloadResult">
                测评结果批量下载
              </el-button>
              <el-button class="!rounded-button whitespace-nowrap" @click="handleUploadReport">
                线上测评报告批量上传
              </el-button>
              <el-button class="!rounded-button whitespace-nowrap" @click="handleUploadComparison">
                横向对比上传表批量上传
              </el-button>
            </template>

            <template v-if="activeTab === 'uploaded'">
              <el-button class="!rounded-button whitespace-nowrap" @click="handleDownloadResult">
                测评结果批量下载
              </el-button>
              <el-button class="!rounded-button whitespace-nowrap" @click="handleDownloadResult">
                测评报告批量下载
              </el-button>
            </template>
          </div>
        </div>

        <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" prop="id" width="100" />
          <el-table-column label="姓名" prop="name">
            <template #default="{ row }">
              <el-button type="primary" link @click="handleEdit(row)">{{ row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="手机号码" prop="tel" sortable="" />
          <el-table-column label="测评问卷" prop="paper" sortable />
          <el-table-column label="问卷提交日期" prop="submitDate" sortable />
          <el-table-column label="客户名称" prop="customerName" sortable />
          <el-table-column label="项目名称" prop="productName" sortable />
          <el-table-column label="答题结果" prop="result" sortable />
          <el-table-column v-if="activeTab === 'uploaded'" label="操作" width="200">
            <template #default="{ row }">
              <el-button type="primary" link @click="handleEdit(row)">测评报告下载</el-button>
              <el-button type="primary" link @click="handleEdit(row)">测评结果下载</el-button>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  getEvaluationReportList,
  exportReport,
  downloadResult,
  uploadReport,
  uploadComparison,
  getDoingReportList,
  getNoAnswerReportList
} from '@/api/product'

const router = useRouter()
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedRows = ref<any[]>([])
const activeTab = ref('pending')

const tabs = [
  { key: 'pending', name: '待编制报告汇总' },
  { key: 'waiting', name: '未作答受测者汇总' },
  { key: 'uploaded', name: '已上传报告汇总' }
]

const tableData = ref([])

const fetchTableData = async () => {
  const actionMap = {
    pending: getDoingReportList,
    waiting: getNoAnswerReportList,
    uploaded: getEvaluationReportList
  }
  const { data } = await actionMap[activeTab.value]({
    name: searchKeyword.value,
    page: currentPage.value,
    pageSize: pageSize.value
  })
  tableData.value = data.list
  total.value = data.total
}

onMounted(() => {
  fetchTableData()
})

const handleSearch = () => {
  fetchTableData()
}

const handleReset = () => {
  searchKeyword.value = ''
  fetchTableData()
}

const handleAdd = () => {
  // 实现新增逻辑
}

const handleEdit = (row: any) => {
  // 实现编辑逻辑
}

const handleDelete = (row: any) => {
  // 实现删除逻辑
}

const handleBatchDelete = () => {
  // 实现批量删除逻辑
}

const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchTableData()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchTableData()
}

const onAdd = async () => {
  await exportReport()
}

const onTabClick = (key: string) => {
  activeTab.value = key
  fetchTableData()
}

const handleDownloadResult = async () => {
  await downloadResult()
}

const handleUploadReport = async () => {
  await uploadReport()
}

const handleUploadComparison = async () => {
  await uploadComparison()
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
