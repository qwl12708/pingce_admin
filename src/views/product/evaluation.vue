<template>
  <div class="main-content min-h-screen bg-white p-6">
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
      <el-table-column label="问卷编号" fixed="left" prop="code" width="80" />
      <el-table-column label="问卷名称" prop="name" width="200" sortable />
      <el-table-column label="类别" prop="type" width="120" sortable />
      <el-table-column label="岗位类别" prop="position" width="120" sortable />
      <el-table-column label="题目总数" prop="questionCount" width="100" />
      <el-table-column label="时长(分钟)" prop="duration" width="120" />
      <el-table-column label="点数" prop="points" width="80" />
      <el-table-column label="邀请函" prop="invitePaper" width="80" />
      <el-table-column label="作答指引" prop="guide" width="120" />
      <el-table-column label="测评报告" prop="report" width="120" />
      <el-table-column label="横向对比报告" prop="comparison" width="120" />
      <el-table-column label="简介" prop="desc" width="120" />
      <el-table-column label="打乱题序" prop="disruptQuestions" width="120" />
      <el-table-column label="限制切屏" prop="limitSwitchScreen" width="120" />
      <el-table-column label="状态" prop="status" width="120" sortable />
      <el-table-column label="报告生成类别" prop="reportDate" width="150" sortable />
      <el-table-column label="交付日期" prop="deadlineDate" width="120" />
      <el-table-column label="操作" fixed="right" width="300" align="center">
        <template #default="scope">
          <div class="flex gap-2">
            <el-button type="primary" link @click="handleSettings(scope.row)"> 调整问卷设置 </el-button>
            <el-button type="primary" link @click="handleEdit(scope.row)"> 在线编辑问卷 </el-button>
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
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import router from '@/router'

interface TableItem {
  code: string
  name: string
  type: string
  position: string
  questionCount: number
  duration: number | string
  points: number
  invitePaper: string
  guide: string
  report: string
  comparison: string
  desc: string
  disruptQuestions: string
  limitSwitchScreen: string
  status: '正常' | '冻结'
  reportDate: string
  deadlineDate: string
}

const tableData = ref<TableItem[]>([
  {
    code: 'KX001',
    name: '校园招聘通用测评问卷',
    type: '通用',
    position: '岗位类别名称',
    questionCount: 5,
    duration: 30,
    points: 5,
    invitePaper: '邀请函名称',
    guide: '模板名称',
    report: '模板名称',
    comparison: '模板名称',
    desc: '简介',
    disruptQuestions: '是',
    limitSwitchScreen: '是',
    status: '正常',
    reportDate: '报告生成类别',
    deadlineDate: '交付日期'
  },
  {
    code: 'KX002',
    name: '校园招聘通用测评问卷',
    type: '岗位胜任力',
    position: '调查问卷',
    questionCount: 8,
    duration: '包年/月',
    points: 5000,
    invitePaper: '邀请函名称',
    guide: '模板名称',
    report: '模板名称',
    comparison: '模板名称',
    desc: '简介',
    disruptQuestions: '是',
    limitSwitchScreen: '是',
    status: '冻结',
    reportDate: '报告生成类别',
    deadlineDate: '交付日期'
  },
  {
    code: 'KX003',
    name: '校园招聘通用测评问卷',
    type: '订制',
    position: '调查问卷',
    questionCount: 10,
    duration: 30,
    points: 5,
    invitePaper: '邀请函名称',
    guide: '模板名称',
    report: '模板名称',
    comparison: '模板名称',
    desc: '简介',
    disruptQuestions: '是',
    limitSwitchScreen: '是',
    status: '冻结',
    reportDate: '报告生成类别',
    deadlineDate: '交付日期'
  }
])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(999)
const selectedRows = ref<TableItem[]>([])

const handleSelectionChange = (val: TableItem[]) => {
  selectedRows.value = val
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

const handleAdd = () => {
  router.push('/product/evaluation-add')
}

const handleBatchDelete = () => {
  ElMessage.warning('触发批量删除操作')
}

const handleEdit = (row: TableItem) => {
  ElMessage.success(`编辑问卷: ${row.code}`)
  router.push('/product/evaluation-questions')
}

const handleOnlineEdit = (row: TableItem) => {
  ElMessage.success(`在线编辑问卷: ${row.code}`)
}

const handleToggleStatus = (row: TableItem) => {
  row.status = row.status === 'active' ? 'frozen' : 'active'
  ElMessage.success(`${row.status === 'active' ? '解冻' : '冻结'}成功`)
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
