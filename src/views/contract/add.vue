<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h1 class="text-2xl font-medium mb-8">新增合同</h1>
    <!-- 表单区域 -->
    <el-form :model="form" ref="formRef" label-width="120px">
      <div class="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div class="grid grid-cols-4 gap-6">
          <el-form-item label="合同编号" prop="name" required>
            <el-input v-model="form.name" placeholder="请输入合同编号" class="w-full" />
          </el-form-item>
          <el-form-item label="客户编号" prop="customer_id" required>
            <el-select
              v-model="form.customer_id"
              placeholder="请输入客户编号"
              class="w-full"
              @change="handleCustomerChange"
            >
              <el-option
                v-for="item in customerOptions"
                :key="item.value"
                :label="item.userNoLabel"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="客户名称" prop="customerName" required>
            <el-select
              v-model="form.customerName"
              placeholder="请选择客户名称"
              class="w-full"
              @change="handleCustomerChange"
            >
              <el-option v-for="item in customerOptions" :key="item.value" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="客户管理员" prop="customerManager" required>
            <el-select v-model="form.customerManager" placeholder="请选择客户管理员" class="w-full">
              <el-option v-for="item in managerOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item label="审批流名称" prop="approve_id" required>
            <el-select v-model="form.approve_id" placeholder="请选择客户管理员" class="w-full">
              <el-option
                v-for="item in approvalFlowOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>
      <!-- 套餐按钮组 -->
      <div class="flex gap-4 mb-6">
        <el-button type="primary" class="!rounded-button" @click="handleShowPackageDialog">选择套餐</el-button>
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

      <el-form-item prop="contract_content">
        <!-- 表格区域 -->
        <el-table :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column label="类别" prop="type" width="120" />
          <el-table-column label="产品套餐" prop="name" width="180" />
          <el-table-column label="可使用问卷" prop="evaluation_name" />
          <el-table-column label="金额(元)" prop="price" width="120" />
          <el-table-column label="使用期限" prop="day" width="120" />
          <el-table-column label="限售地区" prop="limit_area" width="120" />
          <el-table-column label="备注" prop="remark" />
          <el-table-column label="成交金额(元)" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.real_money" placeholder="请输入" class="!bg-white border rounded" />
            </template>
          </el-table-column>
          <el-table-column label="开通时间" width="180">
            <template #default="scope">
              <el-date-picker v-model="scope.row.open_time" type="date" placeholder="选择日期" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <!-- 购买日期 -->
      <div class="mt-6 mb-8">
        <el-form-item label="购买日期" prop="buy_time" required>
          <el-date-picker v-model="form.buy_time" type="date" placeholder="请选择日期" class="w-full" />
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
      <el-table
        ref="tableRef"
        :data="packageData"
        row-key="id"
        @selection-change="handlePackageSelectionChange"
        :default-selection="selectedPackages"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="类别" prop="type" width="120" />
        <el-table-column label="产品套餐" prop="name" width="180" />
        <el-table-column label="可使用问卷" prop="evaluation_name" />
        <el-table-column label="金额(元)" prop="price" width="120" />
        <el-table-column label="使用期限" prop="day" width="120" />
        <el-table-column label="限售地区" prop="limit_area" width="120" />
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getInstitutionList, getInstitutionInfo } from '@/api/customer'
import { addContract } from '@/api/contract'
import { getUserList, getApprovalFlowList } from '@/api/system/user'
import { getProductList } from '@/api/product'

const tableRef = ref()
const router = useRouter()
const route = useRoute()
const formRef = ref(null)

const form = ref({
  name: '',
  customer_id: '',
  customerName: '',
  customerManager: '',
  buy_time: 0
})

const customerOptions = ref([])
const managerOptions = ref([])
const approvalFlowOptions = ref([])

const tableData = ref([])
const packageData = ref([])
const showPackageDialog = ref(false)
const totalAmount = ref(24000.0)
const dealAmount = ref(24000.0)
const selectedPackages = ref([])
const selectedTableRows = ref([])

const fetchCustomerOptions = async () => {
  const { data } = await getInstitutionList({ page: 1, pageSize: 100 })
  customerOptions.value = data.list.map((item: any) => ({
    value: item.id,
    label: item.org_name,
    userNoLabel: item.user_no
  }))
}

const fetchApprovalFlowOptions = async () => {
  const { data } = await getApprovalFlowList({ page: 1, pageSize: 100 })
  approvalFlowOptions.value = data.list.map((item: any) => ({
    value: item.id,
    label: item.name
  }))
}

const handleCustomerChange = async (value: any) => {
  const selectedCustomer = customerOptions.value.find((item: any) => item.value === value)
  if (selectedCustomer) {
    form.value.customer_id = selectedCustomer.value
    form.value.customerName = selectedCustomer.label
  }
}

const _getUserList = async () => {
  const { data } = await getUserList({ page: 1, pageSize: 20 })
  managerOptions.value = data.list.map((item: any) => ({
    value: item.id,
    label: item.name
  }))
}

onMounted(async () => {
  fetchApprovalFlowOptions()
  await fetchCustomerOptions()
  fetchPackageData()
  _getUserList()
  const { id } = route.query
  if (id) {
    const { data } = await getInstitutionInfo({ id: Number(id) })
    form.value.customer_id = data.id
    form.value.customerName = data.org_name
  }
})

const handleSelectionChange = (val: any) => {
  selectedTableRows.value = val
}

const deletePackage = () => {
  if (selectedTableRows.value.length === 0) {
    return
  }
  const ids = selectedTableRows.value.map(e => e.id)
  tableData.value = tableData.value.filter(item => !ids.includes(item.id))
  packageData.value.forEach(e => {
    if (ids.includes(e.id)) {
      tableRef.value?.toggleRowSelection(e, false)
    }
  })
}

const submitForm = async () => {
  console.log('%c [ form.value ]-188', 'font-size:13px; background:pink; color:#bf2c9f;', form.value)
  const contract_content = JSON.stringify(
    tableData.value.map(({ id, real_money, open_time }) => ({
      id,
      real_money,
      open_time
    }))
  )
  console.log('%c [ contract_content ]-227', 'font-size:13px; background:pink; color:#bf2c9f;', tableData.value)

  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const buy_time = new Date(form.value.buy_time).getTime() / 1000

      await addContract({
        ...form.value,
        buy_time,
        contract_content
      })
      router.push('/contract')
    }
  })
}

const cancelForm = () => {
  router.push('/contract')
}

const fetchPackageData = async () => {
  const { data } = await getProductList({ page: 1, pageSize: 100 })
  packageData.value = data.list
}

const handlePackageSelectionChange = (val: any) => {
  selectedPackages.value = val
}

const handlePackageConfirm = () => {
  tableData.value = [...tableData.value, ...selectedPackages.value]
  showPackageDialog.value = false
}

const handleShowPackageDialog = async () => {
  selectedPackages.value = tableData.value
  showPackageDialog.value = true
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
