<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 合同详情头部 -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-medium">HTBH-001</h1>
      <div class="flex items-center gap-4">
        <el-button @click="goBack" type="default" class="!rounded-button whitespace-nowrap">返回</el-button>
      </div>
    </div>
    <!-- 合同基本信息 -->
    <div class="bg-white rounded-lg p-4 mb-6">
      <div class="flex items-center mb-4">
        <div class="flex items-center mr-8">
          <span class="text-gray-500">创建人：</span>
          <span>admin</span>
        </div>
        <div class="flex items-center mr-8">
          <span class="text-gray-500">创建时间：</span>
          <span>2022-01-19 10:37</span>
        </div>
        <div class="flex items-center mr-8">
          <span class="text-gray-500">状态：</span>
          <span class="text-blue-500">待审核</span>
        </div>
        <div class="flex items-center">
          <el-button type="primary" @click="showApprovalRecordDialog = true">审批记录</el-button>
          <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="showApprovalDialog = true"
            >审批合同</el-button
          >
        </div>
      </div>
      <el-steps :active="1" finish-status="success" class="mt-4 border-t border-gray-100 pt-4">
        <el-step title="已发起" description="小张15238198135 2022-01-25 23:22" />
        <el-step title="审核中" description="审核员（审核中）" />
        <el-step title="完成" />
      </el-steps>
    </div>
    <!-- 详细信息 -->
    <div class="bg-white rounded-lg p-6 mb-6">
      <h2 class="text-lg font-medium mb-6 flex items-center">
        <el-icon class="mr-2"><Document /></el-icon>
        详细信息
      </h2>
      <div class="grid grid-cols-3 gap-6">
        <div class="flex items-center">
          <span class="text-gray-500 w-24">客户编号：</span>
          <span>001</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-500 w-24">客户名称：</span>
          <span>软件开发</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-500 w-24">客户管理员：</span>
          <span>小吴</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-500 w-24">合同编号：</span>
          <span>HTBH-001</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-500 w-24">购买日期：</span>
          <span>2024年05月07日13时</span>
        </div>
      </div>
    </div>
    <!-- 合同套餐 -->
    <div class="bg-white rounded-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-medium flex items-center">
          <el-icon class="mr-2"><Tickets /></el-icon>
          合同套餐
        </h2>
        <div class="flex items-center space-x-4">
          <span class="text-gray-500">合计金额：</span>
          <span class="text-blue-500 text-lg">¥ 24000.00</span>
          <span class="text-gray-500">成交金额：</span>
          <span class="text-red-500 text-lg">¥ 24000.00</span>
        </div>
      </div>
      <el-table :data="tableData" border>
        <el-table-column type="selection" width="55" />
        <el-table-column label="类别" prop="type" />
        <el-table-column label="产品套餐" prop="package" />
        <el-table-column label="可使用问卷" prop="usableQuestionnaire" />
        <el-table-column label="金额(元)" prop="amount" />
        <el-table-column label="使用期限" prop="period" />
        <el-table-column label="限制地区" prop="area" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="成交金额(元)" prop="dealAmount" />
        <el-table-column label="开通时间" prop="startTime" />
        <el-table-column label="截止日期" prop="endTime" />
      </el-table>
    </div>

    <!-- 审批记录弹窗 -->
    <el-dialog title="审批记录" v-model.value:visible="showApprovalRecordDialog">
      <el-steps
        :active="approvalRecords.length"
        direction="vertical"
        :space="80"
        style="max-height: 500px; overflow-y: scroll"
      >
        <el-step
          v-for="(record, index) in approvalRecords"
          :key="index"
          :title="record.approver"
          :description="`${record.time} - ${record.result}`"
        >
        </el-step>
      </el-steps>
      <div class="flex justify-end pt-4">
        <el-button @click="showApprovalRecordDialog = false">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 审批合同弹窗 -->
    <el-dialog title="审批合同" v-model.value:visible="showApprovalDialog">
      <el-form :model="approvalForm" label-width="120px">
        <el-form-item
          label="审批结果"
          prop="result"
          :rules="[{ required: true, message: '请选择审批结果', trigger: 'change' }]"
        >
          <el-radio-group v-model="approvalForm.result">
            <el-radio label="通过">通过</el-radio>
            <el-radio label="驳回">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="驳回原因" v-if="approvalForm.result === '驳回'">
          <el-input type="textarea" v-model="approvalForm.comment" placeholder="请输入驳回原因" />
        </el-form-item>
      </el-form>
      <div class="flex justify-end pt-4">
        <el-button @click="showApprovalDialog = false">取消</el-button>
        <el-button type="primary" @click="handleApprovalSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Document, Tickets, Check, Close } from '@element-plus/icons-vue';

interface TableItem {
  type: string;
  package: string;
  usableQuestionnaire: string;
  amount: number;
  period: string;
  area: string;
  remark: string;
  dealAmount: number;
  startTime: string;
  endTime: string;
}
const tableData = ref<TableItem[]>([
  {
    type: '点数',
    package: '8000',
    usableQuestionnaire: '所有问卷',
    amount: 8000.0,
    period: '365天',
    area: '杭州',
    remark: '这是备注内容',
    dealAmount: 8000.0,
    startTime: '2024-04-12 13:00',
    endTime: '2024-04-12 13:00'
  },
  {
    type: '包年/月',
    package: '不限问卷包年',
    usableQuestionnaire: '所有问卷',
    amount: 8000.0,
    period: '365天',
    area: '杭州',
    remark: '这是备注内容',
    dealAmount: 8000.0,
    startTime: '2024-04-12 13:00',
    endTime: '2024-04-12 13:00'
  },
  {
    type: '点数',
    package: '校园招聘通用测评包年',
    usableQuestionnaire: '校园招聘通用测评问卷',
    amount: 8000.0,
    period: '365天',
    area: '杭州',
    remark: '这是备注内容',
    dealAmount: 8000.0,
    startTime: '2024-04-12 13:00',
    endTime: '2024-04-12 13:00'
  }
]);

const showApprovalRecordDialog = ref(false);
const approvalRecords = ref([
  { approver: '张三15246372929（发起人）', time: '2024-04-12 13:00', result: '发起' },
  { approver: '李四17817817888（审批人）', time: '2024-04-13 14:00', result: '驳回' }
]);

const showApprovalDialog = ref(false);
const approvalForm = ref({
  result: '',
  comment: ''
});

const handleApprovalSubmit = () => {
  console.log('审批结果', approvalForm.value);
  showApprovalDialog.value = false;
};

const goBack = () => {
  router.push('/hetong/list');
};
</script>

<style scoped>
.el-table {
  --el-table-border-color: #e5e7eb;
  --el-table-header-bg-color: #f9fafb;
  --el-table-row-hover-bg-color: #f3f4f6;
}
.el-table th {
  font-weight: 500;
  color: #374151;
}
.el-table td {
  color: #4b5563;
}
</style>
