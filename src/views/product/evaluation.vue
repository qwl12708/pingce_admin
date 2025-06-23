<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div class="mb-4">
      <el-form :inline="true" :model="filterForm" class="flex flex-wrap gap-x-6 gap-y-2">
        <el-form-item label="问卷名称">
          <el-input v-model="filterForm.name" placeholder="请输入问卷名称" clearable style="width: 160px" />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="filterForm.type" placeholder="请选择类别" clearable style="width: 120px">
            <el-option v-for="(label, value) in typeMap" :key="value" :label="label" :value="value" />
          </el-select>
        </el-form-item>
        <el-form-item label="岗位类别">
          <el-select v-model="filterForm.post_type" placeholder="请选择岗位类别" clearable style="width: 120px">
            <el-option v-for="item in postTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" placeholder="全部" clearable style="width: 120px">
            <el-option label="正常" :value="1" />
            <el-option label="冻结" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="报告生成类别">
          <el-select v-model="filterForm.report_type" placeholder="请选择" clearable style="width: 120px">
            <el-option v-for="(label, value) in reportTypeMap" :key="value" :label="label" :value="value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="!rounded-button" @click="handleFilter">查询</el-button>
          <el-button class="!rounded-button ml-2" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="flex justify-between items-center p-4 border-b">
      <h2 class="text-lg font-medium">测评问卷管理</h2>
      <div class="space-x-3">
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleAdd">
          <el-icon class="mr-1"><Plus /></el-icon>新增问卷
        </el-button>
        <el-button
          type="danger"
          class="!rounded-button whitespace-nowrap"
          :disabled="!selectedRows.length"
          @click="handleBatchDelete"
        >
          <el-icon class="mr-1"><Delete /></el-icon>批量删除
        </el-button>
      </div>
    </div>

    <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
      <el-table-column type="selection" fixed="left" width="55" />
      <el-table-column label="问卷编号" fixed="left" prop="id" width="80" />
      <el-table-column label="问卷名称" prop="name" width="200" sortable />
      <el-table-column label="类别" prop="type" width="120" sortable>
        <template #default="{ row }">
          {{ typeMap[row.type] }}
        </template>
      </el-table-column>
      <el-table-column label="岗位类别" prop="post_type" width="120" sortable />
      <el-table-column label="题目总数" prop="questions_num" width="100" />
      <el-table-column label="时长(分钟)" prop="answer_time" width="120" />
      <el-table-column label="点数" prop="score" width="80" />
      <el-table-column label="邀请函" prop="inviteTemplateName" width="80" />
      <el-table-column label="作答指引" prop="answerTemplateName" width="120" />
      <el-table-column label="测评报告" prop="report_path" width="120" />
      <el-table-column label="横向对比报告" prop="comparison_path" width="120" />
      <el-table-column label="简介" prop="info" width="200">
        <!-- 将富文本转化为文本，并且只显示10个字，超出部分显示展开 -->
        <template #default="{ row }">
          {{
            extractTextFromHTML(row.info).length > 10
              ? extractTextFromHTML(row.info).slice(0, 10) + '...'
              : extractTextFromHTML(row.info)
          }}
        </template>
      </el-table-column>
      <el-table-column label="打乱题序" prop="is_rand" width="120">
        <template #default="{ row }">
          {{ is_randMap[row.is_rand] }}
        </template>
      </el-table-column>
      <el-table-column label="限制切屏" prop="is_switching_screens" width="120">
        <template #default="{ row }">
          {{ is_switching_screensMap[row.is_switching_screens] }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" sortable>
        <template #default="{ row }">
          <span :class="row.status === 1 ? 'text-green-500' : 'text-red-500'">
            {{ statusMap[row.status] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="报告生成类别" prop="report_type" width="150" sortable>
        <template #default="{ row }">
          {{ reportTypeMap[row.report_type] }}
        </template>
      </el-table-column>
      <el-table-column label="交付日期" prop="deadlineDate" width="120" />
      <el-table-column label="操作" fixed="right" width="300" align="center">
        <template #default="scope">
          <div class="flex gap-2">
            <el-button type="primary" link @click="handleEdit(scope.row)"> 调整问卷设置 </el-button>
            <el-button type="primary" link @click="handleOnlineEdit(scope.row)"> 在线编辑试题 </el-button>
            <el-button link :type="scope.row.status === '冻结' ? 'danger' : 'warning'" @click="handleFreeze(scope.row)">
              {{ scope.row.status === '冻结' ? '解冻' : '冻结' }}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex justify-between items-center p-4">
      <span class="text-gray-500">共 {{ total }} 条</span>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :total="total"
        layout="sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import router from '@/router'
import {
  getQuestionnaireList,
  updateQuestionnaireStatus,
  getInviteTemplateList,
  getAnswerTemplateList,
  deleteQuestionnaire,
  getJobTypeList
} from '@/api/product'

interface TableItem {
  id: number
  name: string
  type: string
  post_type: string
  questions_num: number
  answer_time: number | string
  score: number
  inviteTemplateName: string
  answerTemplateName: string
  report_path: string
  comparison_path: string
  info: string
  is_rand: string
  is_switching_screens: string
  status: '正常' | '冻结'
  report_type: string
  deadlineDate: string
}

const typeMap = {
  1: '通用问卷',
  2: '岗位胜任力测评问卷',
  3: '定制问卷',
  4: '公益测评问卷'
}

const is_randMap = {
  1: '随机顺序',
  2: '固定顺序'
}

const is_switching_screensMap = {
  1: '禁止',
  2: '不禁止'
}

const statusMap = {
  1: '正常',
  2: '冻结'
}

const reportTypeMap = {
  1: '人工编制',
  2: '系统生成'
}

const tableData = ref<TableItem[]>([])
const inviteTemplates = ref<{ id: number; name: string; intro: string }[]>([])
const answerTemplates = ref<{ id: number; name: string; intro: string }[]>([])

const filterForm = ref({
  name: '',
  type: '',
  post_type: '',
  status: '',
  report_type: ''
})

const postTypeOptions = ref<{ label: string; value: string }[]>([])

const fetchPostTypeOptions = async () => {
  const { data } = await getJobTypeList()
  postTypeOptions.value = (data || []).filter(_ => _).map((item: any) => ({ label: item, value: item }))
}

const fetchTemplates = async () => {
  const inviteData = await getInviteTemplateList({ page: 1, pageSize: 100 })
  inviteTemplates.value = inviteData.data.list
  const answerData = await getAnswerTemplateList({ page: 1, pageSize: 100 })
  answerTemplates.value = answerData.data.list
}

function extractTextFromHTML(html) {
  // 创建临时容器
  const temp = document.createElement('div')
  // 注入 HTML（浏览器会自动解析）
  temp.innerHTML = html
  // 获取纯文本内容（自动处理 HTML 实体）
  return temp.textContent || temp.innerText || ''
}

const fetchQuestionnaireList = async () => {
  const params: any = {
    page: currentPage.value,
    pageSize: pageSize.value,
    name: filterForm.value.name,
    type: filterForm.value.type,
    post_type: filterForm.value.post_type,
    status: filterForm.value.status,
    report_type: filterForm.value.report_type
  }
  Object.keys(params).forEach(key => {
    if (params[key] === '' || params[key] === undefined) delete params[key]
  })
  const { data } = await getQuestionnaireList(params)
  tableData.value = data.list.map((item: any) => ({
    ...item,
    inviteTemplateName: inviteTemplates.value.find(template => template.id === item.invite_id)?.name || '',
    answerTemplateName: answerTemplates.value.find(template => template.id === item.answer_id)?.name || ''
  }))
  total.value = data.total
}

onMounted(async () => {
  await fetchPostTypeOptions()
  await fetchTemplates()
  // 读取路由参数并填充筛选表单
  const query = router.currentRoute.value.query
  let hasQuery = false
  Object.keys(filterForm.value).forEach(key => {
    const k = key as keyof typeof filterForm.value
    if (query[k] !== undefined && query[k] !== '') {
      filterForm.value[k] = query[k] as string
      hasQuery = true
    }
  })
  if (hasQuery) {
    currentPage.value = 1
    await fetchQuestionnaireList()
  } else {
    fetchQuestionnaireList()
  }
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(999)
const selectedRows = ref<TableItem[]>([])

const handleSelectionChange = (val: TableItem[]) => {
  selectedRows.value = val
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchQuestionnaireList()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchQuestionnaireList()
}

const handleAdd = () => {
  router.push('/product/evaluation-add')
}

const handleBatchDelete = async () => {
  if (!selectedRows.value.length) {
    ElMessage.warning('请选择要删除的问卷')
    return
  }
  const ids = selectedRows.value.map(row => row.id).join(',')
  await deleteQuestionnaire({ ids })
  ElMessage.success('删除成功')
  fetchQuestionnaireList()
}

const handleEdit = (row: TableItem) => {
  router.push({ path: '/product/evaluation-add', query: { id: row.id } })
}

const handleOnlineEdit = (row: TableItem) => {
  router.push({ path: '/product/evaluation-questions', query: { id: row.id } })
}

const handleFreeze = async (row: TableItem) => {
  await updateQuestionnaireStatus({ id: String(row.id) })
  fetchQuestionnaireList()
}

const handleFilter = () => {
  currentPage.value = 1
  fetchQuestionnaireList()
}

const handleReset = () => {
  filterForm.value = {
    name: '',
    type: '',
    post_type: '',
    status: '',
    report_type: ''
  }
  currentPage.value = 1
  fetchQuestionnaireList()
}
</script>

<style scoped>
.el-table :deep(.el-table__header) {
  background-color: #f5f7fa;
}

.el-table :deep(.el-table__row) {
  background-color: white;
}

.el-pagination {
  justify-content: flex-end;
}
</style>
