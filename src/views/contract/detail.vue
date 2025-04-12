<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 合同详情头部 -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-medium">{{ contractInfo.contract_no }}</h1>
      <div class="flex items-center gap-4">
        <el-button @click="goBack" type="default" class="!rounded-button whitespace-nowrap">返回</el-button>
      </div>
    </div>
    <!-- 合同基本信息 -->
    <div class="bg-white rounded-lg p-4 mb-6">
      <div class="flex items-center mb-4">
        <div class="flex items-center mr-8">
          <span class="text-gray-500">创建人：</span>
          <span>{{ contractInfo.creater }}</span>
        </div>
        <div class="flex items-center mr-8">
          <span class="text-gray-500">创建时间：</span>
          <span>{{ formatTime(contractInfo.create_time) }}</span>
        </div>
        <div class="flex items-center mr-8">
          <span class="text-gray-500">状态：</span>
          <span class="text-blue-500">{{ statusMap[contractInfo.status] }}</span>
        </div>
        <div class="flex items-center">
          <el-button type="primary" @click="showApprovalRecordDialog = true">审批记录</el-button>
          <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="showApprovalDialog = true"
            >审批合同</el-button
          >
        </div>
      </div>

      <el-steps
        :active="contractInfo?.approve_content?.length"
        finish-status="success"
        class="mt-4 border-t border-gray-100 pt-4"
      >
        <el-step
          v-for="(record, index) in contractInfo?.approve_content || []"
          :key="index"
          :title="record.name + (record.status === 1 ? '（已通过）' : '（待处理）')"
          :description="`${record.approver.join('，')}`"
        >
        </el-step>
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
          <span>{{ contractInfo.customer_id }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-500 w-24">客户名称：</span>
          <span>{{ contractInfo.customer_name }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-500 w-24">客户管理员：</span>
          <span>{{ contractInfo.customer_contacts }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-500 w-24">合同编号：</span>
          <span>{{ contractInfo.contract_no }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-500 w-24">购买日期：</span>
          <span>{{ formatTime(contractInfo.buy_time) }} </span>
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
          <span class="text-blue-500 text-lg">¥ {{ contractInfo.money }}</span>
          <span class="text-gray-500">成交金额：</span>
          <span class="text-red-500 text-lg">¥ {{ contractInfo.real_money }}</span>
        </div>
      </div>
      <el-table :data="tableData" border>
        <el-table-column type="selection" width="55" />
        <el-table-column label="类别" prop="type" />
        <el-table-column label="产品套餐" prop="name" />
        <el-table-column label="可使用问卷" prop="evaluation_name" />
        <el-table-column label="金额(元)" prop="price" />
        <el-table-column label="使用期限" prop="day" />
        <el-table-column label="限制地区" prop="limit_area">
          <template #default="{ row }">
            <span>{{ getAreaName(row.limit_area) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="成交金额(元)" prop="real_money" />
        <el-table-column label="开通时间" prop="open_time">
          <template #default="{ row }">
            <span>{{ formatTime(row.open_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截止日期" prop="freeze_time">
          <template #default="{ row }">
            <span>{{ formatTime(row.freeze_time) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 审批记录弹窗 -->
    <el-dialog title="审批记录" v-model.value:visible="showApprovalRecordDialog">
      <el-steps
        :active="contractApproveRecord.length"
        direction="vertical"
        :space="80"
        style="max-height: 500px; overflow-y: scroll"
      >
        <el-step
          v-for="(record, index) in contractApproveRecord"
          :key="index"
          :title="new Date(record.create_time * 1000).toLocaleString()"
          :description="`${record.user_name + record.user_phone} - ${record.info}`"
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
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="驳回原因" v-if="approvalForm.result === 2">
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getContractInfo, approvalContract, getContractApproveRecord } from '@/api/contract'
import { Document, Tickets } from '@element-plus/icons-vue'
import { getAreas } from '@/api/customer'
import { formatTime } from '@/utils/formatTime'

const route = useRoute()
const router = useRouter()

const contractId = ref(route.query.id)
const contractInfo = ref<any>({})
const tableData = ref([])
const contractApproveRecord = ref([])
const originalDataMap = ref({})

const statusMap = {
  4: '撤销', // 4
  3: '驳回', // 3
  2: '审批通过', // 2
  1: '未审批', // 1
  0: '草稿' // 0
}

const fetchContractInfo = async () => {
  const { data } = await getContractInfo({ id: Number(contractId.value) })
  contractInfo.value = data
  console.log('%c [ contractInfo ]-184', 'font-size:13px; background:pink; color:#bf2c9f;', contractInfo)
  tableData.value = data.contract_content || []
}

const fetchContractApproveRecord = async () => {
  const { data } = await getContractApproveRecord({ id: Number(contractId.value) })
  contractApproveRecord.value = data
}

onMounted(async () => {
  await fetchAreas()
  fetchContractInfo()
  fetchContractApproveRecord()
})

const fetchAreas = async () => {
  try {
    const { data } = await getAreas()
    originalDataMap.value = data.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
  } catch (error) {
    console.error('获取地区列表失败', error)
  }
}

const getAreaName = areaArr => {
  const area = (areaArr || []).map(item => (item || []).map(id => originalDataMap.value[id]?.name))
  return area.join(', ')
}

const showApprovalRecordDialog = ref(false)

const showApprovalDialog = ref(false)
const approvalForm = ref({
  result: 1,
  comment: ''
})

const handleApprovalSubmit = async () => {
  await approvalContract({
    id: contractId.value,
    type: approvalForm.value.result,
    comment: approvalForm.value.comment
  })
  showApprovalDialog.value = false
  fetchContractInfo()
}

const goBack = () => {
  router.push('/contract/list')
}
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
