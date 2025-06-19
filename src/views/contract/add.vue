<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h1 class="text-2xl font-medium mb-8">
      {{ route.query.id ? '编辑合同' : '新增合同' }}
    </h1>
    <!-- 表单区域 -->
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
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
          <!-- <el-form-item label="客户管理员" prop="customerManager" required>
            <el-select v-model="form.customerManager" placeholder="请选择客户管理员" class="w-full">
              <el-option v-for="item in managerOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item> -->

          <el-form-item label="客户管理员" prop="approve_id" required>
            <el-select v-model="form.approve_id" placeholder="默认读取" class="w-full">
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
          >合计金额：<span class="text-blue-600"
            >¥{{ tableData.length ? advancedSum(tableData, 'price') : 0 }}</span
          ></span
        >
        <span
          >成交金额：<span class="text-red-500"
            >¥{{ tableData.length && tableData[0].real_money ? advancedSum(tableData, 'real_money') : 0 }}</span
          ></span
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
          <el-table-column label="限售地区" prop="limit_area" width="120">
            <template #default="scope">
              {{ getAreaName(scope.row.limit_area) }}
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" />
          <el-table-column label="成交金额(元)" prop="real_money" width="120">
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
        <el-button type="primary" class="!rounded-button w-32" @click="submitForm(1)">提交审批</el-button>
        <el-button class="!rounded-button w-32" @click="submitForm(0)">保存为草稿</el-button>
      </div>
    </el-form>

    <!-- 选择套餐弹窗 -->
    <el-dialog title="选择套餐" v-model.value:visible="showPackageDialog" style="width: 1000px">
      <!-- 套餐筛选表单 -->
      <el-form :model="packageFilterForm" class="flex flex-wrap gap-x-6 gap-y-2 mb-4">
        <el-form-item label="类别">
          <el-input v-model="packageFilterForm.type" placeholder="请输入类别" clearable style="width: 120px" />
        </el-form-item>
        <el-form-item label="产品套餐">
          <el-input v-model="packageFilterForm.name" placeholder="请输入产品套餐" clearable style="width: 180px" />
        </el-form-item>
        <el-form-item label="可使用问卷">
          <el-input
            v-model="packageFilterForm.evaluation_name"
            placeholder="请输入可使用问卷"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item label="限售地区">
          <el-tree-select
            v-model="packageFilterForm.limit_area"
            placeholder="请选择限售地区"
            clearable
            filterable
            :data="regionData"
            show-checkbox
            multiple
            node-key="id"
            :props="defaultProps"
            class="w-full"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handlePackageFilter">
            查询
          </el-button>
          <el-button class="!rounded-button whitespace-nowrap ml-2" @click="handlePackageReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="tableRef"
        :data="packageData"
        row-key="id"
        @selection-change="handleSelectionChange"
        :default-selection="selectedPackages"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="类别" prop="type" width="120" />
        <el-table-column label="产品套餐" prop="name" width="180" />
        <el-table-column label="可使用问卷" prop="evaluation_name" />
        <el-table-column label="金额(元)" prop="price" width="120" />
        <el-table-column label="使用期限" prop="day" width="120" />
        <el-table-column label="限售地区" prop="limit_area" width="120">
          <template #default="scope">
            {{ getAreaName(scope.row.limit_area) }}
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" />
      </el-table>
      <el-pagination
        class="mt-4 flex justify-end"
        v-model:current-page="packagePage"
        v-model:page-size="packagePageSize"
        :total="packageTotal"
        :page-sizes="[10, 20, 30, 40]"
        layout="sizes, prev, pager, next"
        @current-change="handlePackagePageChange"
        @size-change="handlePackageSizeChange"
      />
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
import { getAreas, getSegmenteList } from '@/api/customer'
import { addContract, editContract, getContractInfo } from '@/api/contract'
import { getUserList, getApprovalFlowList } from '@/api/system/user'
import { getProductList } from '@/api/product'
import { ElMessage } from 'element-plus'

const tableRef = ref()
const router = useRouter()
const route = useRoute()
const formRef = ref(null)
const rules = ref({
  name: [{ required: true, message: '合同编号必填', trigger: 'blur' }],
  customer_id: [{ required: true, message: '客户编号必选', trigger: 'blur' }],
  customerManager: [{ required: true, message: '客户名称必选', trigger: 'blur' }],
  approve_id: [{ required: true, message: '审批流名称必填', trigger: 'blur' }],
  buy_time: [{ required: true, message: '购买日期', trigger: 'change' }]
})
const regionData = ref([])
const defaultProps = {
  children: 'children',
  label: 'label'
}

const form = ref({
  name: '',
  customer_id: '',
  customerName: '',
  customerManager: '',
  approve_id: null,
  buy_time: 0
})

const customerOptions = ref([])
const managerOptions = ref([])
const approvalFlowOptions = ref([])
const originalDataMap = ref({})

const tableData = ref([])
const packageData = ref([])
const showPackageDialog = ref(false)
const selectedPackages = ref([])
const selectedTableRows = ref([])

const packageFilterForm = ref({
  type: '',
  name: '',
  evaluation_name: '',
  limit_area: ''
})
const packagePage = ref(1)
const packagePageSize = ref(10)
const packageTotal = ref(0)

const fetchCustomerOptions = async () => {
  const { data } = await getSegmenteList({ page: 1, pageSize: 100 })
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

const fetchAreas = async () => {
  try {
    const { data } = await getAreas()
    originalDataMap.value = data.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
    regionData.value = transformToTree(data)
  } catch (error) {
    console.error('获取地区列表失败', error)
  }
}

const transformToTree = data => {
  const tree = []
  const map = {}

  data.forEach(item => {
    map[item.id] = { ...item, label: item.name, children: [] }
  })

  data.forEach(item => {
    if (item.pid === 0) {
      tree.push(map[item.id])
    } else {
      if (map[item.pid]) {
        map[item.pid].children.push(map[item.id])
      }
    }
  })

  return tree
}

const getAreaName = areaArr => {
  const area = (areaArr || []).map(item => (item || []).map(id => originalDataMap.value[id]?.name))
  return area.join(', ')
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

// 获取最大小数位数
const getDecimals = num => {
  const str = (num || '').split('.') || ''
  return str.length
}
// 通用高精度计算方案（处理任意小数位）
const advancedSum = (data, key) => {
  const maxDecimals = Math.max(...data.map(item => getDecimals(item[key])))
  const factor = 10 ** maxDecimals

  return (
    data.reduce((acc, curr) => {
      const value = Number(Number(curr[key]).toFixed(maxDecimals))
      return acc + Math.round(value * factor)
    }, 0) / factor
  )
}

onMounted(async () => {
  fetchApprovalFlowOptions()
  await fetchCustomerOptions()
  _getUserList()
  await fetchAreas()
  const { id } = route.query
  if (id) {
    // 编辑页面，获取合同详情
    const { data } = await getContractInfo({ id: Number(id) })
    form.value = {
      name: data.contract_no,
      customer_id: data.customer_id,
      customerName: data.customer_name,
      approve_id: data.approve_id,
      buy_time: data.buy_time * 1000 // 转换为毫秒
    }
    tableData.value = data.contract_content.map(item => ({
      ...item,
      open_time: item.open_time ? new Date(item.open_time) : null
    }))
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

const submitForm = async (status: number) => {
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
      const payload = {
        ...form.value,
        buy_time,
        contract_content,
        status
      }
      if (route.query.id) {
        // 编辑合同
        await editContract({ ...payload, id: Number(route.query.id) })
      } else {
        // 新增合同
        await addContract(payload)
      }
      ElMessage.success('操作成功')
      router.push('/contract/list')
    }
  })
}

const fetchPackageData = async () => {
  if (!form.value.customer_id) {
    ElMessage.error('请先选择客户编号')
    return new Promise((_, reject) => {
      reject('请先选择客户编号')
    })
  }
  const params = {
    customer_id: form.value.customer_id,
    page: packagePage.value,
    pageSize: packagePageSize.value,
    ...packageFilterForm.value
  }
  const { data } = await getProductList(params)
  packageData.value = data.list
  packageTotal.value = data.total
}

const handlePackageFilter = () => {
  packagePage.value = 1
  fetchPackageData()
}
const handlePackageReset = () => {
  packageFilterForm.value = {
    type: '',
    name: '',
    evaluation_name: '',
    limit_area: ''
  }
  packagePage.value = 1
  fetchPackageData()
}
const handlePackagePageChange = (page: number) => {
  packagePage.value = page
  fetchPackageData()
}
const handlePackageSizeChange = (size: number) => {
  packagePageSize.value = size
  packagePage.value = 1
  fetchPackageData()
}

const handleShowPackageDialog = async () => {
  packagePage.value = 1
  fetchPackageData().then(() => {
    selectedPackages.value = tableData.value
    showPackageDialog.value = true
  })
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
