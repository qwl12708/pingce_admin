<template>
  <BatchUploadDialog
    v-model="batchUploadVisible"
    :accept="'.pdf,.doc,.docx,.xls,.xlsx'"
    upload-type="report"
    @uploaded="onBatchUploaded"
  />
  <BatchUploadDialog
    v-model="batchCompareUploadVisible"
    :accept="'.xls,.xlsx,.csv,.pdf,.doc,.docx'"
    upload-type="comparison"
    @uploaded="onBatchCompareUploaded"
  />
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 搜索区域 -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
      <el-form :inline="true" :model="searchForm" class="flex flex-wrap items-center gap-4">
        <el-form-item label="手机号码">
          <el-input v-model="searchForm.phone" placeholder="请输入" class="w-48" />
        </el-form-item>
        <el-form-item label="测评问卷">
          <el-input v-model="searchForm.questionnaire_name" placeholder="请输入" class="w-48" />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.org_name" placeholder="请输入" class="w-48" />
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="searchForm.project_name" placeholder="请输入" class="w-48" />
        </el-form-item>
        <el-form-item label="答题结果">
          <el-select v-model="searchForm.result" placeholder="请选择" class="w-40">
            <el-option label="全部" value="" />
            <el-option label="合格" value="合格" />
            <el-option label="不合格" value="不合格" />
          </el-select>
        </el-form-item>
        <el-form-item label="问卷提交日期">
          <el-date-picker
            v-model="searchForm.submit_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            class="w-64"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
          <el-button class="!rounded-button whitespace-nowrap" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
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
        <div class="p-4 flex justify-end items-center border-b border-gray-100">
          <el-button
            :disabled="selectedRows.length === 0"
            @click="onExport"
            type="primary"
            class="mr-4 !rounded-button whitespace-nowrap"
          >
            导出
          </el-button>
          <template v-if="activeTab === 'pending'">
            <div class="flex">
              <el-button class="mr-4" :disabled="selectedRows.length === 0" @click="handleDownloadResult">
                测评结果批量下载
              </el-button>
              <FileUploader
                class="mr-4"
                text="线上测评报告批量上传"
                v-model:value="evaluationPath"
                style="display: none"
              />
              <el-button class="mr-4" @click="batchUploadVisible = true">线上测评报告批量上传</el-button>
              <FileUploader text="横向对比上传表批量上传" v-model:value="compareReportPath" style="display: none" />
              <el-button @click="batchCompareUploadVisible = true">横向对比上传表批量上传</el-button>
            </div>
          </template>

          <template v-if="activeTab === 'uploaded'">
            <el-button
              class="!rounded-button whitespace-nowrap mr-4"
              :disabled="selectedRows.length === 0"
              @click="handleDownloadResult"
            >
              测评结果批量下载
            </el-button>
            <el-button
              class="!rounded-button whitespace-nowrap mr-4"
              @click="handleDownloadReportResult"
              :disabled="selectedRows.length === 0"
            >
              测评报告批量下载
            </el-button>
          </template>
        </div>

        <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" prop="id" width="100" />
          <el-table-column label="姓名" prop="name">
            <template #default="{ row }">
              <el-button type="primary" link @click="handleEdit(row)">{{ row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="手机号码" prop="phone" sortable="" />
          <el-table-column label="测评问卷" prop="questionnaire_name" sortable />
          <el-table-column label="问卷提交日期" prop="submit_time" sortable>
            <template #default="{ row }"> {{ formatTime(row.submit_time) }} </template>
          </el-table-column>
          <el-table-column label="客户名称" prop="org_name" sortable />
          <el-table-column label="项目名称" prop="project_name" sortable />
          <el-table-column label="答题结果" prop="result" sortable />
          <!-- <el-table-column v-if="activeTab === 'uploaded'" label="操作" width="200">
            <template #default="{ row }">
              <el-button type="primary" link @click="handleEdit(row)">测评报告下载</el-button>
              <el-button type="primary" link @click="handleEdit(row)">测评结果下载</el-button>
            </template>
          </el-table-column> -->
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
import { ref, onMounted, watch } from 'vue'
import {
  getEvaluationReportList,
  exportReport,
  downloadResult,
  uploadReport,
  uploadComparison,
  getDoingReportList,
  getNoAnswerReportList
} from '@/api/product'
import { ElMessage } from 'element-plus'
import FileUploader from '@/components/FileUploader/index.vue'
import BatchUploadDialog from '@/components/FileUploader/BatchUploadDialog.vue'
import { formatTime } from '@/utils/formatTime'

const evaluationPath = ref('')
const compareReportPath = ref('')
const searchForm = ref({
  phone: '',
  questionnaire_name: '',
  org_name: '',
  project_name: '',
  result: '',
  submit_time: ''
})
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedRows = ref<any[]>([])
const activeTab = ref('pending')
const batchUploadVisible = ref(false)
const batchCompareUploadVisible = ref(false)

const tabs = [
  { key: 'pending', name: '待编制报告汇总' },
  { key: 'waiting', name: '未作答受测者汇总' },
  { key: 'uploaded', name: '已上传报告汇总' }
]

const tableData = ref([])

const fetchTableData = async () => {
  const actionMap: Record<string, Function> = {
    pending: getDoingReportList,
    waiting: getNoAnswerReportList,
    uploaded: getEvaluationReportList
  }
  const params: any = {
    phone: searchForm.value.phone,
    questionnaire_name: searchForm.value.questionnaire_name,
    org_name: searchForm.value.org_name,
    project_name: searchForm.value.project_name,
    result: searchForm.value.result,
    page: currentPage.value,
    pageSize: pageSize.value
  }
  if (searchForm.value.submit_time && searchForm.value.submit_time.length === 2) {
    params.submit_start_time = new Date(searchForm.value.submit_time[0]).getTime() / 1000
    params.submit_end_time = new Date(searchForm.value.submit_time[1]).getTime() / 1000
  }
  const { data } = await actionMap[activeTab.value](params)
  tableData.value = data.list
  total.value = data.total
}

onMounted(() => {
  fetchTableData()
})

const handleSearch = () => {
  currentPage.value = 1
  fetchTableData()
}

const handleReset = () => {
  Object.assign(searchForm.value, {
    phone: '',
    questionnaire_name: '',
    org_name: '',
    project_name: '',
    result: '',
    submit_time: ''
  })
  currentPage.value = 1
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

const onExport = async () => {
  if (selectedRows.value.length === 0) return
  const ids = selectedRows.value.map(row => row.id).join(',')
  const { data: blobStr, fileName } = await exportReport({ ids })
  const blob = new Blob([blobStr])
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
  ElMessage.success(`导出${fileName}成功`)
}

const handleDownloadResult = async () => {
  if (selectedRows.value.length === 0) return
  const ids = selectedRows.value.map(row => row.id).join(',')
  const { data: blobStr, fileName } = await downloadResult({ ids })
  const blob = new Blob([blobStr])
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
  ElMessage.success(`导出${fileName}成功`)
}

const handleDownloadReportResult = async () => {
  if (selectedRows.value.length === 0) return
  const ids = selectedRows.value.map(row => row.id).join(',')
  const { data: blobStr, fileName } = await downloadReportResult({ ids })
  const blob = new Blob([blobStr])
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
  ElMessage.success(`导出${fileName}成功`)
}

const onTabClick = (key: string) => {
  activeTab.value = key
  fetchTableData()
}

// const handleDownloadResult = async () => {
//   if (selectedRows.value.length === 0) return
//   const ids = selectedRows.value.map(row => row.id).join(',')
//   await downloadResult({ ids }).catch(err => {
//     console.log('下载失败', err.message)
//     ElMessage.error(err.message)
//   })
// }

const handleUploadReport = async () => {
  if (selectedRows.value.length === 0) return
  const names = selectedRows.value.map(row => row.questionnaire_name)
  await uploadReport({ report_file: JSON.stringify(names) }).catch(err => {
    console.log('上传失败', err.message)
    ElMessage.error(err.message)
  })
  ElMessage.success('上传成功')
}

const handleUploadComparison = async () => {
  if (selectedRows.value.length === 0) return
  const names = selectedRows.value.map(row => row.questionnaire_name)
  await uploadComparison({ report_file: JSON.stringify(names) }).catch(err => {
    console.log('上传失败', err.message)
    ElMessage.error(err.message)
  })
  ElMessage.success('上传成功')
}

watch(evaluationPath, async newVal => {
  if (typeof newVal === 'string' && newVal.startsWith('http')) {
    try {
      await uploadReport({ report_file: newVal })
      ElMessage.success('上传成功')
      // evaluationPath.value = ''
    } catch (err: any) {
      console.log('上传失败', err.message)
      ElMessage.error(err.message)
    }
  }
})

watch(compareReportPath, async newVal => {
  if (typeof newVal === 'string' && newVal.startsWith('http')) {
    try {
      await uploadComparison({ report_file: newVal })
      ElMessage.success('上传成功')
      // compareReportPath.value = ''
    } catch (err: any) {
      console.log('上传失败', err.message)
      ElMessage.error(err.message)
    }
  }
})

const onBatchUploaded = () => {
  batchUploadVisible.value = false
  fetchTableData()
}

const onBatchCompareUploaded = () => {
  batchCompareUploadVisible.value = false
  fetchTableData()
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
