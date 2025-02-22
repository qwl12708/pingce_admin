<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 头部筛选区域 -->
    <div class="bg-white p-4 rounded-lg mb-4 flex items-center justify-between">
      <div class="flex gap-4">
        <el-select v-model="province" placeholder="省市区" class="w-48">
          <el-option v-for="item in provinceOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="customer" placeholder="客户" class="w-48">
          <el-option v-for="item in customerOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
      </div>
      <div class="flex gap-4">
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="showDialog = true">
          <el-icon class="mr-1"><UserFilled /></el-icon>
          分配/变更测评顾问
        </el-button>
        <el-button @click="onUpdate" type="primary" class="!rounded-button whitespace-nowrap">
          <el-icon class="mr-1"><Setting /></el-icon>
          测评部门负责区域设置
        </el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="bg-white p-4 rounded-lg">
      <div class="text-xl font-medium mb-4">客户划分</div>
      <el-table :data="tableData" style="width: 100%" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" fixed="left" />
        <el-table-column label="序号" type="index" fixed="left" />
        <el-table-column prop="id" label="客户编号" fixed="left" />
        <el-table-column prop="org_name" label="客户名称" sortable />
        <el-table-column prop="province_name" label="单位所在省/市/自治区" sortable />
        <el-table-column prop="address" label="详细地址" />
        <el-table-column prop="create_time" label="创建时间" sortable>
          <template #default="{ row }">
            <span>{{ dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="project_num" label="累计项目数" sortable />
        <el-table-column prop="amount" label="累计合同金额（元）" sortable />
        <el-table-column prop="type" label="类别" sortable />
        <el-table-column prop="contacts" label="联系人" sortable />
        <el-table-column prop="phone" label="联系人手机号码" sortable />
        <el-table-column prop="employees_num" label="员工人数" sortable />
        <el-table-column prop="industry_name" label="所属行业" />
        <el-table-column prop="email" label="预留电子邮箱" sortable />
        <el-table-column prop="counsellor_name" label="测评顾问" sortable />
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-between items-center mt-4">
        <span class="text-gray-500">共 999 条</span>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="total"
          layout="sizes, prev, pager, next"
        />
      </div>
    </div>

    <!-- 弹窗 -->
    <el-dialog title="分配/变更测评顾问" v-model.value:visible="showDialog">
      <el-form :model="dialogForm" label-width="120px">
        <el-form-item label="分配测评顾问">
          <el-select v-model="dialogForm.consultant" placeholder="请选择">
            <el-option v-for="item in consultantOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="flex justify-end pt-4">
        <el-button class="ml-4" @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { UserFilled, Setting } from '@element-plus/icons-vue'
import router from '@/router'
import { getInstitutionList, getConsultantList, bindConsultant } from '@/api/customer'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'

const showDialog = ref(false)
const dialogForm = ref({
  consultant: ''
})
const consultantOptions = ref([])

const province = ref('')
const customer = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const tableData = ref([])
const selectedIds = ref<string[]>([])

const fetchTableData = async () => {
  try {
    const { data } = await getInstitutionList({
      page: [currentPage.value.toString()],
      pageSize: pageSize.value.toString()
    })
    tableData.value = data.list
    total.value = data.total
  } catch (error) {
    console.error('获取客户列表失败', error)
  }
}

const fetchConsultantList = async () => {
  try {
    const { data } = await getConsultantList()
    consultantOptions.value = data.map(item => ({ value: item.id, label: item.name }))
  } catch (error) {
    console.error('获取测评顾问列表失败', error)
  }
}

onMounted(() => {
  fetchTableData()
  fetchConsultantList()
})

const handleSelectionChange = selection => {
  selectedIds.value = selection.map(item => item.id)
}

const handleSearch = () => {
  fetchTableData()
}

const onUpdate = () => {
  router.push('/customer/admin-area-update')
}

const handleDialogSubmit = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请先勾选客户')
    return
  }
  try {
    await bindConsultant({ id: selectedIds.value.join(','), consultant_id: dialogForm.value.consultant })
    ElMessage.success('分配成功')
    showDialog.value = false
    fetchTableData()
  } catch (error) {
    ElMessage.error('分配失败')
  }
}
</script>

<style scoped>
.el-table {
  --el-table-header-bg-color: #f5f7fa;
}

.el-table th {
  font-weight: 500;
  color: #606266;
}

.el-pagination {
  justify-content: flex-end;
}
</style>
