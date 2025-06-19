<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 搜索区域 -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div v-if="currentTab === '1'">
        <el-form :inline="true" :model="questionnaireForm" class="flex flex-wrap items-center gap-4">
          <el-form-item label="问卷类别">
            <el-select v-model="questionnaireForm.type" placeholder="请选择问卷类别" class="w-40">
              <el-option label="全部" value="" />
              <el-option label="通用问卷" :value="1" />
              <el-option label="岗位胜任力测评问卷" :value="2" />
              <el-option label="定制问卷" :value="3" />
              <el-option label="公益测评问卷" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="问卷名称">
            <el-input v-model="questionnaireForm.name" placeholder="请输入问卷名称" class="w-48" />
          </el-form-item>
          <el-form-item label="问卷状态">
            <el-select v-model="questionnaireForm.status" placeholder="请选择问卷状态" class="w-40">
              <el-option label="全部" value="" />
              <el-option label="正常" :value="1" />
              <el-option label="冻结" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
            <el-button class="!rounded-button whitespace-nowrap" @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <el-form :inline="true" :model="projectForm" class="flex flex-wrap items-center gap-4">
          <el-form-item label="客户名称">
            <el-input v-model="projectForm.customer_name" placeholder="请输入客户名称" class="w-48" />
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="projectForm.project_name" placeholder="请输入项目名称" class="w-48" />
          </el-form-item>
          <el-form-item label="项目类别">
            <el-input v-model="projectForm.type" placeholder="请输入项目类别" class="w-48" />
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select v-model="projectForm.status" placeholder="请选择项目状态" class="w-40">
              <el-option label="全部" value="" />
              <el-option label="进行中" :value="1" />
              <el-option label="已完成" :value="2" />
              <el-option label="已关闭" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="统计报告">
            <el-select v-model="projectForm.report" placeholder="请选择" class="w-40">
              <el-option label="全部" value="" />
              <el-option label="已生成" :value="1" />
              <el-option label="未生成" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
            <el-button class="!rounded-button whitespace-nowrap" @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 flex justify-between items-center border-b border-gray-100">
        <!-- 顶部导航标签 -->
        <div class="flex items-center border-b border-gray-200">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            class="px-4 py-3 cursor-pointer whitespace-nowrap"
            :class="{ 'text-blue-500 border-b-2 border-blue-500': currentTab === tab.key }"
            @click="handleTabChange(tab.key)"
          >
            {{ tab.label }}
          </div>
        </div>
        <div class="space-x-2">
          <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleBatchExport">
            <el-icon class="mr-1"></el-icon>批量导出
          </el-button>

          <el-button v-if="currentTab === '2'" class="!rounded-button whitespace-nowrap" @click="handleBatchExport">
            <el-icon class="mr-1"></el-icon>问卷下载
          </el-button>
          <el-button v-if="currentTab === '2'" class="!rounded-button whitespace-nowrap" @click="handleBatchExport">
            <el-icon class="mr-1"></el-icon>统计报告下载
          </el-button>
        </div>
      </div>

      <el-table v-if="currentTab === '1'" :data="tableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="问卷编号" prop="id" width="100" />
        <el-table-column label="问卷类别" prop="type" sortablewidth="200">
          <template #default="{ row }">
            <span>{{ typeMap[row.type] || '未知类型' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="问卷名称" prop="name" sortable width="200" />
        <el-table-column label="问卷状态" prop="status" sortable width="150">
          <template #default="{ row }">
            <span :class="row.status === 1 ? 'text-green-500' : 'text-red-500'">
              {{ row.status === 1 ? '正常' : '冻结' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="题目总数" prop="questions_num" width="100" />
        <el-table-column label="总分" prop="questions_score" width="100" />
        <el-table-column label="标准答题时间（分钟）" prop="answer_time" width="200" />
        <el-table-column label="未提交试卷人数" prop="notSubmitTotal" width="200" sortable>
          <template #default="{ row }">
            {{ row.evaluation_num - row.answer_num }}
          </template>
        </el-table-column>
        <el-table-column label="累计测评人数" prop="answer_num" sortable width="200" />
      </el-table>

      <el-table v-else :data="selfTableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="客户编号" prop="id" width="100" />
        <el-table-column label="客户名称" prop="name" sortable width="200" />
        <el-table-column label="项目名称" prop="org_name" sortable width="200" />
        <el-table-column label="项目类型" prop="type" sortable width="200" />
        <el-table-column label="是否切屏" prop="is_change_screen" width="200" />
        <el-table-column label="切屏次数" prop="change_screen_num" width="200" />
        <el-table-column label="答题人数" prop="answer_num" sortable width="200" />
        <el-table-column label="已生成报告数量" prop="report_num" sortable width="200" />
        <el-table-column label="未读报告个人数" prop="no_read_report_num" sortable width="200" />
        <el-table-column label="已过期人数" prop="expire_num" sortable width="200" />

        <el-table-column label="问卷名称" prop="name" width="200" />
        <el-table-column label="项目状态" prop="status" sortable width="200" />
        <el-table-column label="是否查找答案" prop="is_seek_answer" width="200" />
        <el-table-column
          label="创建时间"
          prop="create_time"
          width="200"
          sortable
          :sort-method="(a, b) => new Date(a.create_time) - new Date(b.create_time)"
        >
          <template #default="{ row }">
            {{ formatTime(row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column
          label="开始时间"
          prop="start_time"
          width="200"
          sortable
          :sort-method="(a, b) => new Date(a.start_time) - new Date(b.start_time)"
        >
          <template #default="{ row }">
            {{ formatTime(row.start_time) }}
          </template>
        </el-table-column>
        <el-table-column
          label="结束时间"
          prop="end_time"
          width="200"
          sortable
          :sort-method="(a, b) => new Date(a.end_time) - new Date(b.end_time)"
        >
          <template #default="{ row }">
            {{ formatTime(row.end_time) }}
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
import { getEvaluationTotal, getSelfTotal } from '@/api/system/user'
import { formatTime } from '@/utils/formatTime'

const currentTab = ref('1')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedRows = ref<any[]>([])
const tabs = [
  { key: '1', label: '测评问卷统计' },
  { key: '2', label: '自助项目统计' }
]
const typeMap = {
  1: '通用问卷',
  2: '岗位胜任力测评问卷',
  3: '定制问卷',
  4: '公益测评问卷'
}

const tableData = ref([])
const selfTableData = ref([])

const questionnaireForm = ref({
  type: '',
  name: '',
  status: ''
})
const projectForm = ref({
  customer_name: '',
  project_name: '',
  type: '',
  status: '',
  report: ''
})

const fetchTableData = async () => {
  if (currentTab.value === '1') {
    const { data } = await getEvaluationTotal({
      page: currentPage.value,
      pageSize: pageSize.value,
      type: questionnaireForm.value.type,
      name: questionnaireForm.value.name,
      status: questionnaireForm.value.status
    })
    tableData.value = data.list
    total.value = data.total
  } else {
    const { data } = await getSelfTotal({
      page: currentPage.value,
      pageSize: pageSize.value,
      customer_name: projectForm.value.customer_name,
      project_name: projectForm.value.project_name,
      type: projectForm.value.type,
      status: projectForm.value.status,
      report: projectForm.value.report
    })
    selfTableData.value = data.list
    total.value = data.total
  }
}

onMounted(() => {
  fetchTableData()
})

const handleSearch = () => {
  currentPage.value = 1
  fetchTableData()
}

const handleReset = () => {
  if (currentTab.value === '1') {
    Object.assign(questionnaireForm.value, { type: '', name: '', status: '' })
  } else {
    Object.assign(projectForm.value, { customer_name: '', project_name: '', type: '', status: '', report: '' })
  }
  currentPage.value = 1
  fetchTableData()
}

const handleBatchExport = () => {
  // 实现批量导出逻辑
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

const handleTabChange = (tab: string) => {
  currentTab.value = tab
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
