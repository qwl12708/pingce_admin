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

    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      class="w-full"
      :header-cell-style="{ background: '#F5F7FA' }"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column label="问卷编号" prop="code" />
      <el-table-column label="类型" prop="type" width="120" />
      <el-table-column label="岗位类别" prop="position" width="120" />
      <el-table-column label="题目总数" prop="questionCount" width="100" />
      <el-table-column label="时长(分钟)" prop="duration" width="100" />
      <el-table-column label="点数" prop="points" width="80" />
      <el-table-column label="语言" prop="language" width="100" />
      <el-table-column label="作答指引" prop="guide" width="100" />
      <el-table-column label="测评报告" prop="report" width="100" />
      <el-table-column label="对比报告" prop="comparison" width="100" />
      <el-table-column label="操作" fixed="right" width="300">
        <template #default="{ row }">
          <div class="space-x-2">
            <el-button type="primary" link @click="handleEdit(row)"> 调整设置 </el-button>
            <el-button type="primary" link @click="handleOnlineEdit(row)"> 在线编辑 </el-button>
            <el-button type="primary" link @click="handleToggleStatus(row)">
              {{ row.status === 'active' ? '冻结' : '解冻' }}
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
  id: number
  code: string
  type: string
  position: string
  questionCount: number
  duration: number
  points: number
  language: string
  guide: string
  report: string
  comparison: string
  status: 'active' | 'frozen'
}

const tableData = ref<TableItem[]>([
  {
    id: 1,
    code: '校园招聘通用测评问卷',
    type: '通用',
    position: '岗位类别名称',
    questionCount: 50,
    duration: 30,
    points: 5,
    language: '中文',
    guide: '标准指引',
    report: '标准报告',
    comparison: '对比报告A',
    status: 'active'
  },
  {
    id: 2,
    code: '岗位胜任力测评问卷',
    type: '岗位胜任力',
    position: '技术岗位',
    questionCount: 60,
    duration: 45,
    points: 5,
    language: '中文',
    guide: '详细指引',
    report: '深度报告',
    comparison: '对比报告B',
    status: 'active'
  },
  {
    id: 3,
    code: '定制化评估问卷',
    type: '订制',
    position: '管理岗位',
    questionCount: 40,
    duration: 60,
    points: 5,
    language: '中文',
    guide: '简要指引',
    report: '简报',
    comparison: '对比报告C',
    status: 'frozen'
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
  ElMessage.success('触发新增问卷操作')
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
