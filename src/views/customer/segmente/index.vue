<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 头部筛选区域  -->
    <div class="bg-white p-4 pb-0 rounded-lg mb-4">
      <div class="flex flex-wrap items-start gap-4">
        <el-form :model="filterForm" class="flex flex-wrap gap-x-6 gap-y-2 grow">
          <el-form-item label="客户名称">
            <el-input v-model="filterForm.org_name" placeholder="请输入客户名称" clearable style="width: 180px" />
          </el-form-item>
          <el-form-item label="类别">
            <el-input v-model="filterForm.type" placeholder="请输入类别" clearable style="width: 120px" />
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="filterForm.contacts" placeholder="请输入联系人" clearable style="width: 120px" />
          </el-form-item>
          <el-form-item label="联系人手机号码">
            <el-input v-model="filterForm.phone" placeholder="请输入手机号码" clearable style="width: 140px" />
          </el-form-item>
          <el-form-item label="所属行业">
            <el-input v-model="filterForm.industry_name" placeholder="请输入所属行业" clearable style="width: 120px" />
          </el-form-item>
          <el-form-item label="预留电子邮箱">
            <el-input v-model="filterForm.email" placeholder="请输入邮箱" clearable style="width: 150px" />
          </el-form-item>
          <el-form-item label="测评顾问">
            <el-input
              v-model="filterForm.counsellor_name"
              placeholder="请输入测评顾问"
              clearable
              style="width: 120px"
            />
          </el-form-item>
          <el-form-item label="所属区域">
            <el-tree-select
              v-model="regions"
              :data="regionData"
              show-checkbox
              multiple
              node-key="id"
              placeholder="请选择所属区域"
              class="w-full"
              style="min-width: 180px; max-width: 220px"
            />
          </el-form-item>
          <el-form-item label="客户顾问">
            <el-select v-model="customer" placeholder="客户" class="w-48">
              <el-option v-for="item in consultantOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
            <el-button class="!rounded-button whitespace-nowrap ml-2" @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="flex flex-col gap-2 items-end shrink-0 ml-auto">
          <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="showDialog = true">
            <el-icon class="mr-1"><UserFilled /></el-icon>
            分配/变更测评顾问
          </el-button>
          <el-button @click="onUpdate" type="link" class="!rounded-button whitespace-nowrap">
            <el-icon class="mr-1"><Setting /></el-icon>
            负责区域设置
          </el-button>
        </div>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="bg-white p-4 rounded-lg">
      <div class="text-xl font-medium mb-4">客户划分</div>
      <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" fixed="left" width="55" />
        <el-table-column label="序号" type="index" fixed="left" width="60" />
        <el-table-column prop="user_no" label="客户编号" fixed="left" min-width="120" />
        <el-table-column prop="org_name" label="客户名称" sortable min-width="150" />
        <el-table-column prop="province_name" label="单位所在省" sortable min-width="120" />
        <el-table-column prop="city_name" label="单位所在市" sortable min-width="120" />
        <el-table-column prop="address" label="详细地址" min-width="200" show-overflow-tooltip />
        <el-table-column prop="create_time" label="创建时间" sortable min-width="150">
          <template #default="{ row }">
            {{ formatTime(row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="project_num" label="累计项目数" sortable min-width="120" />
        <el-table-column prop="contract_moey" label="累计合同金额（元）" sortable min-width="150" />
        <el-table-column prop="type" label="类别" sortable min-width="100" />
        <el-table-column prop="contacts" label="联系人" sortable min-width="100" />
        <el-table-column prop="phone" label="联系人手机号码" sortable min-width="140" />
        <el-table-column prop="employees_num" label="员工人数" sortable min-width="120" />
        <el-table-column prop="industry_name" label="所属行业" min-width="120" />
        <el-table-column prop="email" label="预留电子邮箱" sortable min-width="150" show-overflow-tooltip />
        <el-table-column prop="counsellor_name" label="测评顾问" sortable min-width="120" />
        <el-table-column prop="counsellor_phone" label="测评顾问手机号码" sortable min-width="160" />
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-between items-center mt-4">
        <span class="text-gray-500">共 {{ total }} 条</span>
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
import { getAreas, getConsultantList, bindConsultant, getSegmenteList } from '@/api/customer'
import { ElMessage, ElTreeSelect } from 'element-plus'
import { formatTime } from '@/utils/formatTime'

const showDialog = ref(false)
const dialogForm = ref({
  consultant: ''
})
const consultantOptions = ref<{ value: string | number; label: string }[]>([])
const regionData = ref<any[]>([])
const regions = ref([])

const customer = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const tableData = ref([])
const selectedIds = ref<string[]>([])

// 表单筛选数据
const filterForm = ref({
  org_name: '',
  type: '',
  contacts: '',
  phone: '',
  industry_name: '',
  email: '',
  counsellor_name: ''
})

// 查询
const handleSearch = () => {
  currentPage.value = 1
  fetchTableData()
}

const handleReset = () => {
  filterForm.value = {
    org_name: '',
    type: '',
    contacts: '',
    phone: '',
    industry_name: '',
    email: '',
    counsellor_name: ''
  }
  regions.value = []
  customer.value = ''
  currentPage.value = 1
  fetchTableData()
}

const fetchTableData = async () => {
  try {
    const params: Record<string, any> = {
      city_ids: regions.value.join(','),
      customer_ids: customer.value,
      page: currentPage.value,
      pageSize: pageSize.value,
      ...filterForm.value
    }
    const { data } = await getSegmenteList(params)
    tableData.value = data.list
    total.value = data.total
  } catch (error) {
    console.error('获取客户列表失败', error)
  }
}

const fetchAreas = async () => {
  try {
    const { data } = await getAreas()
    regionData.value = transformToTree(data)
  } catch (error) {
    console.error('获取区域失败', error)
  }
}
const transformToTree = (data: any[]): any[] => {
  const tree: any[] = []
  const map: Record<string, any> = {}

  data.forEach((item: any) => {
    map[item.id] = { ...item, label: item.name, children: [] }
  })

  data.forEach((item: any) => {
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

const fetchConsultantList = async () => {
  try {
    const { data } = await getConsultantList()
    consultantOptions.value = data.map((item: any) => ({ value: item.id, label: item.name }))
    total.value = data.length
  } catch (error) {
    console.error('获取测评顾问列表失败', error)
  }
}

onMounted(() => {
  fetchTableData()
  fetchAreas()
  fetchConsultantList()
})

const handleSelectionChange = (selection: any[]) => {
  selectedIds.value = selection.map((item: any) => item.id)
}

const onUpdate = () => {
  router.push(`/customer/area`)
}

const handleDialogSubmit = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请先勾选客户')
    return
  }
  try {
    await bindConsultant({ ids: selectedIds.value.join(','), consultant_id: Number(dialogForm.value.consultant) })
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
  width: 100%;
}

/* 表头样式 */
:deep(.el-table__header-wrapper th) {
  background: var(--el-table-header-bg-color);
  color: var(--el-text-color-primary);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  text-overflow: ellipsis;
  padding: 12px 0;
}

/* 单元格样式 */
:deep(.el-table__cell) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 表格横向滚动 */
:deep(.el-table__body-wrapper) {
  overflow-x: auto !important;
}

.el-table th {
  font-weight: 500;
  color: #606266;
}

.el-pagination {
  justify-content: flex-end;
}

.bg-white.p-4.rounded-lg.mb-4 .el-form {
  flex: 1 1 0%;
}
</style>
