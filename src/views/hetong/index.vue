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
          <span>您有 <span class="text-blue-500 font-medium">*</span> 个合同验退回</span>
        </div>
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'guan' }]"
          @click="activeTab = 'guan'"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../assets/image/icons/guan.png" />
          </el-icon>
          <span>您共管理 <span class="text-blue-500 font-medium">*</span> 个合同</span>
        </div>
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'cha' }]"
          @click="activeTab = 'cha'"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../assets/image/icons/cha.png" />
          </el-icon>
          <span>您有 <span class="text-blue-500 font-medium">*</span> 个审批通过的合同未查看</span>
        </div>

        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'shen' }]"
          @click="activeTab = 'shen'"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../assets/image/icons/shen.png" />
          </el-icon>
          <span>您有 <span class="text-blue-500 font-medium">*</span> 个合同待审批</span>
        </div>
      </div>
      <el-button @click="onAddContract" type="primary" class="!rounded-button whitespace-nowrap">新增合同</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%" class="mb-4">
      <el-table-column prop="contractNo" label="合同编号" width="120" />
      <el-table-column prop="customerCode" label="客户编号" width="100" />
      <el-table-column prop="customerName" label="客户名称" width="180" />
      <el-table-column prop="customerContact" label="客户联系人" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column prop="creator" label="创建人" width="120" />
      <el-table-column prop="amount" label="合同金额(元)" width="120" />
      <el-table-column prop="status" label="合同状态" width="120">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="approver" label="审批人" width="120" />
      <el-table-column prop="approveTime" label="审批时间" width="160" />
      <el-table-column prop="returnReason" label="退回说明" width="160" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <div class="flex gap-2">
            <el-button @click="goDetail" link type="primary" size="small">合同详情</el-button>
            <el-button
              v-if="scope.row.status === '待审批'"
              link
              type="primary"
              size="small"
              @click="showApprovalDialog = true"
              >审批合同</el-button
            >
            <el-button v-if="scope.row.status === '草稿'" link type="primary" size="small">编辑合同</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 审批合同弹窗 -->
    <el-dialog title="审批合同" v-model.value:visible="showApprovalDialog">
      <el-form :model="approvalForm" label-width="120px">
        <el-form-item label="审批结果">
          <el-radio-group v-model="approvalForm.result">
            <el-radio label="通过">通过</el-radio>
            <el-radio label="不通过">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审批意见">
          <el-input type="textarea" v-model="approvalForm.comment" placeholder="请输入审批意见" />
        </el-form-item>
      </el-form>
      <div class="flex justify-end pt-4">
        <el-button @click="showApprovalDialog = false">取消</el-button>
        <el-button type="primary" @click="handleApprovalSubmit">确认</el-button>
      </div>
    </el-dialog>

    <!-- 分页区域 -->
    <div class="flex items-center justify-between py-4">
      <span class="text-gray-600">共 999 条</span>
      <div class="flex items-center">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="999"
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
import { ref } from 'vue'
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElTag,
  ElPagination,
  ElInput,
  ElDialog,
  ElForm,
  ElFormItem,
  ElRadioGroup,
  ElRadio
} from 'element-plus'
import router from '@/router'

const activeTab = ref('tui')
const currentPage = ref(1)
const pageSize = ref(10)
const jumpPage = ref(1)

const tableData = ref([
  {
    contractNo: 'HTBH-001',
    customerCode: '123',
    customerName: '深圳科技有限公司',
    customerContact: '张经理',
    createTime: '2024-04-12 13:00',
    creator: '张三丰',
    amount: '3000.00',
    status: '已通过',
    approver: '张三丰',
    approveTime: '2024-04-12 13:00',
    returnReason: '金额未满足'
  },
  {
    contractNo: 'HTBH-001',
    customerCode: '123',
    customerName: '广州科技有限公司',
    customerContact: '李经理',
    createTime: '2024-04-12 13:00',
    creator: '张三丰',
    amount: '3000.00',
    status: '待审批',
    approver: '张三丰',
    approveTime: '-',
    returnReason: '-'
  },
  {
    contractNo: 'HTBH-001',
    customerCode: '123',
    customerName: '北京科技有限公司',
    customerContact: '王经理',
    createTime: '2024-04-12 13:00',
    creator: '张三丰',
    amount: '3000.00',
    status: '未审批',
    approver: '张三丰',
    approveTime: '-',
    returnReason: '-'
  },
  {
    contractNo: 'HTBH-001',
    customerCode: '123',
    customerName: '上海科技有限公司',
    customerContact: '刘经理',
    createTime: '2024-04-12 13:00',
    creator: '张三丰',
    amount: '3000.00',
    status: '草稿',
    approver: '张三丰',
    approveTime: '-',
    returnReason: '-'
  }
])

const getStatusType = (status: string) => {
  const statusMap: Record<string, string> = {
    已通过: 'success',
    待审批: 'warning',
    未审批: 'danger',
    草稿: 'info'
  }
  return statusMap[status] || 'info'
}

const onAddContract = () => {
  router.push('/hetong/add')
}

const goDetail = () => {
  router.push('/hetong/detail')
}

const showApprovalDialog = ref(false)
const approvalForm = ref({
  result: '',
  comment: ''
})

const handleApprovalSubmit = () => {
  console.log('审批结果', approvalForm.value)
  showApprovalDialog.value = false
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
