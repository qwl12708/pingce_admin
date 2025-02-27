<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h1 class="text-2xl font-medium mb-8">新增合同</h1>
    <!-- 表单区域 -->
    <el-form :model="form" ref="formRef" label-width="120px">
      <div class="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div class="grid grid-cols-4 gap-6">
          <el-form-item label="合同编号" prop="contractNo" required>
            <el-input v-model="form.contractNo" placeholder="请输入" class="w-full" />
          </el-form-item>
          <el-form-item label="客户名称" prop="customerId" required>
            <el-select v-model="form.customerId" placeholder="请输入或选择" class="w-full">
              <el-option v-for="item in customerOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="客户类型" prop="customerType" required>
            <el-select v-model="form.customerType" placeholder="请输入或选择" class="w-full">
              <el-option
                v-for="item in customerTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="客户管理员" prop="customerManager" required>
            <el-select v-model="form.customerManager" placeholder="请输入或选择" class="w-full">
              <el-option v-for="item in managerOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>
      </div>
      <!-- 套餐按钮组 -->
      <div class="flex gap-4 mb-6">
        <el-button type="primary" class="!rounded-button" @click="showPackageDialog = true">选择套餐</el-button>
        <el-button class="!rounded-button" @click="deletePackage">删除套餐</el-button>
      </div>
      <!-- 金额统计 -->
      <div class="flex justify-end mb-4 text-sm">
        <span class="mr-6"
          >合计金额：<span class="text-blue-600">¥{{ totalAmount.toFixed(2) }}</span></span
        >
        <span
          >成交金额：<span class="text-red-500">¥{{ dealAmount.toFixed(2) }}</span></span
        >
      </div>
      <!-- 表格区域 -->
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="类别" prop="type" width="120" />
        <el-table-column label="产品套餐" prop="package" width="180" />
        <el-table-column label="可使用问卷" prop="terms" />
        <el-table-column label="金额(元)" prop="amount" width="120" />
        <el-table-column label="使用期限" prop="period" width="120" />
        <el-table-column label="限售地区" prop="region" width="120" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="成交金额(元)" width="120">
          <template #default="scope">
            <el-input v-model="scope.row.dealAmount" placeholder="请输入" class="!bg-white border rounded" />
          </template>
        </el-table-column>
        <el-table-column label="开通时间" width="180">
          <template #default="scope">
            <el-date-picker v-model="scope.row.startTime" type="date" placeholder="选择日期" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 购买日期 -->
      <div class="mt-6 mb-8">
        <el-form-item label="购买日期" prop="purchaseDate" required>
          <el-date-picker v-model="form.purchaseDate" type="date" placeholder="请选择日期" class="w-full" />
        </el-form-item>
      </div>
      <!-- 底部按钮 -->
      <div class="flex justify-center gap-4">
        <el-button type="primary" class="!rounded-button w-32" @click="submitForm">提交审批</el-button>
        <el-button class="!rounded-button w-32" @click="cancelForm">不保存</el-button>
      </div>
    </el-form>
    <!-- 选择套餐弹窗 -->
    <el-dialog title="选择套餐" v-model.value:visible="showPackageDialog" style="width: 1000px">
      <el-table :data="packageData" @selection-change="handlePackageSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="类别" prop="type" width="120" />
        <el-table-column label="产品套餐" prop="package" width="180" />
        <el-table-column label="可使用问卷" prop="terms" />
        <el-table-column label="金额(元)" prop="amount" width="120" />
        <el-table-column label="使用期限" prop="period" width="120" />
        <el-table-column label="限售地区" prop="region" width="120" />
        <el-table-column label="备注" prop="remark" />
      </el-table>
      <div class="flex justify-center pt-4">
        <el-button @click="showPackageDialog = false">取消</el-button>
        <el-button type="primary" @click="handlePackageConfirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addContract } from '@/api/contract'

const router = useRouter()
const formRef = ref(null)

const form = ref({
  contractNo: '',
  customerId: '',
  customerType: '',
  customerManager: '',
  purchaseDate: ''
})

const customerOptions = ref([
  { value: '1', label: '杭州科技有限公司' },
  { value: '2', label: '上海智能科技有限公司' }
])

const customerTypeOptions = ref([
  { value: '1', label: '企业客户' },
  { value: '2', label: '个人客户' }
])

const managerOptions = ref([
  { value: '1', label: '张文轩' },
  { value: '2', label: '刘雨晴' },
  { value: '3', label: '陈宇航' }
])

const tableData = ref([
  {
    type: '点数',
    package: '8000',
    terms: '所有问卷',
    amount: 8000.0,
    period: '365天',
    region: '杭州',
    remark: '',
    dealAmount: 8000.0,
    startTime: ''
  },
  {
    type: '包年/月',
    package: '不限问卷包年',
    terms: '所有问卷',
    amount: 8000.0,
    period: '365天',
    region: '杭州',
    remark: '',
    dealAmount: 8000.0,
    startTime: ''
  }
])

const totalAmount = ref(24000.0)
const dealAmount = ref(24000.0)
const selectedPackages = ref([])

const handleSelectionChange = (val: any) => {
  selectedPackages.value = val
}

const deletePackage = () => {
  tableData.value = tableData.value.filter(item => !selectedPackages.value.includes(item))
}

const submitForm = async () => {
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      await addContract(form.value)
      router.push('/contract')
    }
  })
}

const cancelForm = () => {
  router.push('/contract')
}

const showPackageDialog = ref(false)
const packageData = ref([
  {
    type: '点数',
    package: '8000',
    terms: '所有问卷',
    amount: 8000.0,
    period: '365天',
    region: '杭州',
    remark: ''
  },
  {
    type: '包年/月',
    package: '不限问卷包年',
    terms: '所有问卷',
    amount: 8000.0,
    period: '365天',
    region: '杭州',
    remark: ''
  }
])

const handlePackageSelectionChange = (val: any) => {
  selectedPackages.value = val
}

const handlePackageConfirm = () => {
  tableData.value = [...tableData.value, ...selectedPackages.value]
  showPackageDialog.value = false
}
</script>

<style scoped>
.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.required-label::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 4px;
}
:deep(.el-input__wrapper) {
  background-color: #f5f7fa;
}
:deep(.el-select .el-input__wrapper) {
  background-color: #f5f7fa;
}
:deep(.border.rounded .el-input__wrapper) {
  background-color: white;
  box-shadow: none;
  border: 1px solid #dcdfe6;
}
</style>
