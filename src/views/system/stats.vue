<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 搜索区域 -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div class="flex items-center space-x-6">
        <div class="flex items-center">
          <div style="width: 100px" class="text-gray-600 mr-2">数据统计</div>
          <el-input v-model="searchKeyword" placeholder="请输入" class="w-64 text-sm" />
        </div>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
        <el-button class="!rounded-button whitespace-nowrap" @click="handleReset">重置</el-button>
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
        <el-table-column label="问卷编号" prop="id" />
        <el-table-column label="问卷类别" prop="type" sortable />
        <el-table-column label="问卷名称" prop="questionnaire_name" sortable />
        <el-table-column label="问卷状态" prop="questionnaire_status" sortable />
        <el-table-column label="题目总数" prop="questions_num" />
        <el-table-column label="总分" prop="questions_score" />
        <el-table-column label="标准答题时间（分钟）" prop="answer_time" />
        <el-table-column label="未提交试卷人数" prop="notSubmitTotal">
          <template #default="{ row }">
            {{ row.evaluation_num - row.answer_num }}
          </template>
        </el-table-column>
        <el-table-column label="累计测评人数" prop="answer_num" sortable />
      </el-table>

      <el-table v-else :data="selfTableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="客户编号" prop="id" />
        <el-table-column label="客户名称" prop="name" sortable />
        <el-table-column label="项目名称" prop="org_name" sortable />
        <el-table-column label="项目类型" prop="type" sortable />
        <el-table-column label="是否切屏" prop="is_change_screen" />
        <el-table-column label="切屏次数" prop="change_screen_num" />
        <el-table-column label="答题人数" prop="answer_num" sortable />
        <el-table-column label="已生成报告数量" prop="report_num" sortable />
        <el-table-column label="未读报告个人数" prop="no_read_report_num" sortable />
        <el-table-column label="已过期人数" prop="expire_num" sortable />

        <el-table-column label="问卷名称" prop="questionnaire_name" />
        <el-table-column label="项目状态" prop="status" sortable />
        <el-table-column label="是否查找答案" prop="is_seek_answer" />
        <el-table-column label="创建时间" prop="create_time">
          <template #default="{ row }">
            {{ dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="开始时间" prop="start_time">
          <template #default="{ row }">
            {{ dayjs(row.start_time).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" prop="end_time">
          <template #default="{ row }">
            {{ dayjs(row.end_time).format('YYYY-MM-DD HH:mm:ss') }}
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
import dayjs from 'dayjs'

const searchKeyword = ref('')
const currentTab = ref('1')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedRows = ref<any[]>([])
const tabs = [
  { key: '1', label: '测评问卷统计' },
  { key: '2', label: '自助项目统计' }
]

const tableData = ref([])
const selfTableData = ref([])

const fetchTableData = async () => {
  const api = currentTab.value === '1' ? getEvaluationTotal : getSelfTotal
  const { data } = await api({ page: currentPage.value, pageSize: pageSize.value })
  if (currentTab.value === '1') {
    tableData.value = data.list
  } else {
    selfTableData.value = data.list
  }
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
