<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 顶部状态栏 -->
    <div class="flex items-center justify-between py-4 mb-6">
      <div class="flex gap-8">
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 1 }]"
          @click="handleClickTab(1)"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../assets/image/icons/tui.png" />
          </el-icon>
          <span
            >您有 <span class="text-blue-500 font-medium">{{ back_count }}</span> 个合同验退回</span
          >
        </div>
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 2 }]"
          @click="handleClickTab(2)"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../assets/image/icons/guan.png" />
          </el-icon>
          <span
            >您共管理 <span class="text-blue-500 font-medium">{{ manager_count }}</span> 个合同</span
          >
        </div>
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 3 }]"
          @click="handleClickTab(3)"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../assets/image/icons/cha.png" />
          </el-icon>
          <span
            >您有 <span class="text-blue-500 font-medium">{{ pass_count }}</span> 个审批通过的合同未查看</span
          >
        </div>

        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 4 }]"
          @click="handleClickTab(4)"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../assets/image/icons/shen.png" />
          </el-icon>
          <span
            >您有 <span class="text-blue-500 font-medium">{{ pending_count }}</span> 个合同待审批</span
          >
        </div>
      </div>
      <el-button @click="onAddContract" type="primary" class="!rounded-button whitespace-nowrap">新增合同</el-button>
    </div>
    <!-- 筛选表单 -->
    <el-form :inline="true" class="mb-4" @submit.prevent>
      <el-form-item label="客户名称">
        <el-input v-model="filters.customer_name" placeholder="请输入客户名称" clearable />
      </el-form-item>
      <el-form-item label="客户管理员">
        <el-input v-model="filters.counsellor_name" placeholder="请输入客户管理员" clearable />
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="filters.creater" placeholder="请输入创建人" clearable />
      </el-form-item>
      <el-form-item label="合同状态">
        <el-select v-model="filters.status" placeholder="请选择合同状态" clearable style="width: 120px">
          <el-option v-for="item in contractStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="审批人">
        <el-input v-model="filters.approve_user" placeholder="请输入审批人" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%" class="mb-4">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="contract_no" label="合同编号" width="120" />
      <el-table-column prop="user_no" label="客户编号" width="200" />
      <el-table-column prop="customer_name" label="客户名称" width="180" />
      <el-table-column prop="buy_time" label="购买时间" width="180">
        <template #default="{ row }">
          {{ formatTime(row.buy_time) }}
        </template>
      </el-table-column>
      <el-table-column prop="creater" label="创建人" width="120" />
      <el-table-column prop="money" label="合同金额(元)" width="120" />
      <el-table-column prop="status_name" label="合同状态" width="120" />
      <el-table-column prop="counsellor_name" label="客户管理员" width="120" />
      <!-- 以逗号分隔换行显示每一个 -->
      <el-table-column prop="approve_user" label="审批人" width="200" show-overflow-tooltip />

      <el-table-column prop="approve_time" label="审批时间" width="180">
        <template #default="{ row }">
          {{ formatTime(row.approve_time) }}
        </template>
      </el-table-column>
      <el-table-column prop="approve_info" label="退回说明" width="160" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <div class="flex gap-2">
            <el-button @click="goDetail(scope.row)" link type="primary" size="small">合同详情</el-button>
            <el-button
              v-if="scope.row.status === 1"
              link
              type="primary"
              size="small"
              @click="handleShowDialog(scope.row.id)"
              >审批合同</el-button
            >
            <el-button
              v-if="scope.row.status === 3 && scope.row.is_edit === 1"
              link
              type="primary"
              size="small"
              @click="goEdit(scope.row.id)"
              >编辑合同</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 审批合同弹窗 -->
    <el-dialog title="审批合同" v-model.value:visible="showApprovalDialog">
      <el-form ref="formRef" :model="approvalForm" label-width="120px">
        <el-form-item label="审批结果">
          <el-radio-group v-model="approvalForm.type">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="approvalForm.type === 2" label="审批意见">
          <el-input type="textarea" v-model="approvalForm.comment" placeholder="请输入审批意见" />
        </el-form-item>
      </el-form>
      <div class="flex justify-end pt-4">
        <el-button @click="handleCloseDialog">取消</el-button>
        <el-button type="primary" @click="handleApprovalSubmit">确认</el-button>
      </div>
    </el-dialog>

    <!-- 分页区域 -->
    <div class="flex items-center justify-between py-4">
      <span class="text-gray-600">共 {{ total }} 条</span>
      <div class="flex items-center">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="total"
          layout="sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <span class="text-gray-600">跳至</span>
        <el-input v-model="jumpPage" class="w-16" />
        <span class="text-gray-600">页</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getContractList, approvalContract } from '@/api/contract'
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElInput,
  ElDialog,
  ElForm,
  ElFormItem,
  ElRadioGroup,
  ElRadio,
  type FormInstance
} from 'element-plus'
import { useRoute } from 'vue-router'
import { formatTime } from '@/utils/formatTime'

const router = useRouter()
const route = useRoute()

const activeTab = ref(2) // 1: 退回。 2: 全部。  3: 审批通过。4: 待审批
const currentPage = ref(1)
const pageSize = ref(10)
const jumpPage = ref(1)
const back_count = ref(0)
const pass_count = ref(0)
const total = ref(0)
const manager_count = ref(0) // 管理的合同数量
const pending_count = ref(0)
const tableData = ref([])

const id = ref('')
const formRef = ref<FormInstance>()

const filters = ref({
  customer_name: '',
  counsellor_name: '',
  creater: '',
  status: '',
  approve_user: ''
})

const contractStatusOptions = [
  { label: '草稿', value: 0 },
  { label: '审批中', value: 1 },
  { label: '审批通过', value: 2 },
  { label: '驳回', value: 3 },
  { label: '撤回', value: 4 }
]

const fetchContractList = async () => {
  const params = {
    type: activeTab.value,
    page: currentPage.value,
    pageSize: pageSize.value,
    ...filters.value
  }
  const { data } = await getContractList(params)
  tableData.value = data.list
  total.value = data.total
  back_count.value = data.back_count
  pass_count.value = data.pass_count
  pending_count.value = data.pending_count
  manager_count.value = data.manager_count
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchContractList()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchContractList()
}

onMounted(() => {
  const tab = route.query.tab as string
  if (tab) {
    activeTab.value = Number(tab)
  }
  fetchContractList()
})

const onAddContract = () => {
  router.push('/contract/add')
}

const goDetail = (row: any) => {
  router.push({ path: '/contract/detail', query: { id: row.id } })
}

const showApprovalDialog = ref(false)
const approvalForm = ref({
  type: 1,
  comment: ''
})

const handleApprovalSubmit = async () => {
  const p = approvalForm.value.type === 2 ? { comment: approvalForm.value.comment } : {}
  await approvalContract({
    id: Number(id.value),
    type: String(approvalForm.value.type),
    ...p
  })
  showApprovalDialog.value = false
  id.value = ''
  formRef.value?.resetFields()
  fetchContractList()
}

// const handleSelectionChange = (rows: any[]) => {
//   selectedRows.value = rows
// }

const handleShowDialog = (contractId: number) => {
  showApprovalDialog.value = true
  id.value = String(contractId)
}
const handleCloseDialog = () => {
  formRef.value?.resetFields()
  showApprovalDialog.value = false
  id.value = ''
}

const handleClickTab = (tab: number) => {
  activeTab.value = tab
  currentPage.value = 1
  fetchContractList()
}

const handleSearch = () => {
  currentPage.value = 1
  fetchContractList()
}

const handleReset = () => {
  filters.value = {
    customer_name: '',
    counsellor_name: '',
    creater: '',
    status: '',
    approve_user: ''
  }
  currentPage.value = 1
  fetchContractList()
}

const goEdit = (contractId: number) => {
  router.push({ path: '/contract/add', query: { id: contractId } })
}
</script>

<style scoped>
.el-input {
  width: auto;
}
.el-input__inner {
  text-align: center;
}
</style>
