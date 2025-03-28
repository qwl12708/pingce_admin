<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 顶部状态栏 -->
    <div class="flex items-center justify-between py-4 mb-6">
      <div class="flex gap-8">
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'tui' }]"
          @click="activeTab = 'tui'"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../assets/image/icons/tui.png" />
          </el-icon>
          <span
            >您有 <span class="text-blue-500 font-medium">{{ back_count }}</span> 个合同验退回</span
          >
        </div>
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'guan' }]"
          @click="activeTab = 'guan'"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../assets/image/icons/guan.png" />
          </el-icon>
          <span
            >您共管理
            <span class="text-blue-500 font-medium">{{ back_count + pass_count + pending_count }}</span> 个合同</span
          >
        </div>
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'cha' }]"
          @click="activeTab = 'cha'"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../assets/image/icons/cha.png" />
          </el-icon>
          <span
            >您有 <span class="text-blue-500 font-medium">{{ pending_count }}</span> 个审批通过的合同未查看</span
          >
        </div>

        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'shen' }]"
          @click="activeTab = 'shen'"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../assets/image/icons/shen.png" />
          </el-icon>
          <span
            >您有 <span class="text-blue-500 font-medium">{{ pass_count }}</span> 个合同待审批</span
          >
        </div>
      </div>
      <el-button @click="onAddContract" type="primary" class="!rounded-button whitespace-nowrap">新增合同</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%" class="mb-4">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="contract_no" label="合同编号" width="120" />
      <el-table-column prop="customer_id" label="客户编号" width="100" />
      <el-table-column prop="customer_name" label="客户名称" width="180" />
      <el-table-column prop="buy_time" label="购买时间" width="160" />
      <el-table-column prop="creater" label="创建人" width="120" />
      <el-table-column prop="money" label="合同金额(元)" width="120" />
      <el-table-column prop="status_name" label="合同状态" width="120" />
      <el-table-column prop="approve_user_current" label="审批人" width="120" />
      <el-table-column prop="approve_time" label="审批时间" width="160" />
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
            <el-button v-if="scope.row.status === 3" link type="primary" size="small">编辑合同</el-button>
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
  ElMessage,
  type FormInstance,
  type FormRules
} from 'element-plus'

const router = useRouter()
const activeTab = ref('tui')
const currentPage = ref(1)
const pageSize = ref(10)
const jumpPage = ref(1)
const back_count = ref(0)
const pass_count = ref(0)
const total = ref(0)
const pending_count = ref(0)
const tableData = ref([])

const id = ref('')
const formRef = ref<FormInstance>()

const fetchContractList = async () => {
  const { data } = await getContractList({ page: currentPage.value, pageSize: pageSize.value })
  tableData.value = data.list
  total.value = data.total
  back_count.value = data.back_count
  pass_count.value = data.pass_count
  pending_count.value = data.pending_count
}

// const _readContract = async id => {
//   const res = await readContract({ id })
//   const { code } = res
//   if (code === 200) {
//     ElMessage.success('操作成功')
//     return
//   }
//   ElMessage.error('操作失败')
// }

onMounted(() => {
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
    type: Number(approvalForm.value.type),
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

const handleShowDialog = contractId => {
  console.log('%c [ id ]-222', 'font-size:13px; background:pink; color:#bf2c9f;', id)
  showApprovalDialog.value = true
  id.value = contractId
}
const handleCloseDialog = () => {
  formRef.value?.resetFields()
  showApprovalDialog.value = false
  id.value = ''
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
