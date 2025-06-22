<template>
  <div class="main-content min-h-screen bg-gray-50 p-6">
    <!-- 搜索区域 -->
    <div class="flex items-center gap-0 mb-4">
      <el-tree-select
        v-model="selectedRegions"
        :data="regionData"
        show-checkbox
        multiple
        node-key="id"
        placeholder="请选择省市"
        class="mr-2"
        style="min-width: 180px; max-width: 220px"
        :props="{ label: 'label', value: 'id', children: 'children' }"
      />
      <!-- 新增客户状态筛选 -->
      <el-select v-model="status" placeholder="客户状态" class="mr-2" style="width: 120px">
        <el-option label="全部" :value="''" />
        <el-option label="正常" :value="1" />
        <el-option label="冻结" :value="2" />
      </el-select>
      <el-input v-model="searchValue" placeholder="请输入搜索内容" style="width: 380px" clearable>
        <template #prepend>
          <el-select v-model="searchField" placeholder="选择字段" style="width: 140px">
            <el-option label="客户名称" value="org_name" />
            <el-option label="联系人" value="contacts" />
            <el-option label="联系人手机号码" value="phone" />
            <el-option label="所属行业" value="industry_name" />
            <el-option label="预留电子邮箱" value="email" />
            <el-option label="测评顾问" value="counsellor_name" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="onSearch" />
        </template>
      </el-input>
      <el-button class="ml-2" @click="onReset">重置</el-button>
    </div>
    <!-- 数据概览区 -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex gap-8">
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'all' }]"
          @click="handleClickTab('all')"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../../assets/image/icons/all.png" />
          </el-icon>
          <span
            >您共为 <span class="text-blue-500 font-medium">{{ total }}</span> 个自助客户提供专业服务</span
          >
        </div>
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'one' }]"
          @click="handleClickTab('one')"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../../assets/image/icons/one.png" />
          </el-icon>
          <span
            >您有 <span class="text-blue-500 font-medium">{{ week_total }}</span> 个自助客户一周内新注册</span
          >
        </div>
      </div>
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="onAddCustomer">
        <el-icon class="mr-1"><Plus /></el-icon>新增客户
      </el-button>
    </div>
    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow">
      <el-table :data="tableData" class="custom-table" @sort-change="handleSortChange">
        <el-table-column type="selection" />
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column prop="user_no" label="客户编号" width="200" />
        <el-table-column prop="org_name" label="客户名称" width="200" />
        <el-table-column prop="create_time" label="注册日期" width="200">
          <template #default="{ row }">
            {{ formatTime(row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="project_num" label="累计项目数" width="200" />
        <el-table-column prop="answer_num" label="累计评估人次" width="200" />
        <el-table-column prop="contacts" label="联系人" width="200" />
        <el-table-column prop="phone" label="联系人手机号码" width="200" />
        <el-table-column prop="employees_num" label="员工人数" sortable width="200" />
        <el-table-column prop="industry_name" label="所属行业" width="200" />
        <el-table-column prop="email" label="预留电子邮箱" width="200" />
        <el-table-column prop="province_name" label="单位所在省" width="200" />
        <el-table-column prop="city_name" label="单位所在市" width="200" />
        <el-table-column prop="counsellor_name" label="测评顾问" width="200" />
        <el-table-column prop="status" label="客户状态" width="200">
          <template #default="{ row }">
            <span :class="row.status === 2 ? 'text-red-500' : 'text-green-500'">
              {{ row.status === 2 ? '冻结' : '正常' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300" align="center">
          <template #default="scope">
            <div class="flex gap-2">
              <el-button @click="goDetail(scope.row.id)" type="primary" link class="!rounded-button whitespace-nowrap">
                修改客户信息
              </el-button>
              <el-button
                @click="goContract(scope.row.id)"
                type="primary"
                link
                class="!rounded-button whitespace-nowrap"
              >
                新增订单
              </el-button>
              <el-button
                type="danger"
                link
                class="!rounded-button whitespace-nowrap"
                @click="updataStatus(scope.row.id)"
              >
                {{ scope.row.status === 2 ? '解冻' : '冻结' }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="flex justify-between items-center p-4">
        <span class="text-gray-600">共 {{ total }} 条</span>
        <div class="flex items-center gap-4">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="sizes, prev, pager, next, jumper"
            :total="total"
            class="!rounded-button"
            @current-change="fetchTableData"
            @size-change="fetchTableData"
          />
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import router from '@/router'
import { getInstitutionList, updateInstitutionStatus, getAreas, getConsultantList, getIndustries } from '@/api/customer'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { formatTime } from '@/utils/formatTime'

interface TableItem {
  id: number // 添加 id 属性
  org_code: string
  org_name: string
  created_at: string
  project_count: number
  evaluation_count: number
  contact_name: string
  phone: string
  employees_num: number
  industry_id: number // 添加 industry_id 属性
  counsellor_id: number // 添加 counsellor_id 属性
  email: string
  province_id: number // 添加 province_id 属性
  city_id: number // 添加 city_id 属性
  province_name: string
  city_name: string
  address: string
  counsellor_name: string
  status: number
  reject_reason: string
  isFreezed: boolean
}

const activeTab = ref('all')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const week_total = ref(0)
const tableData = ref<TableItem[]>([])

const searchField = ref('org_name')
const searchValue = ref('')

const searchParams = ref<{ [key: string]: any }>({})

const areaMap = ref<Map<number, string>>(new Map())
const consultantsMap = ref<Map<number, string>>(new Map())
const industryMap = ref<Map<number, string>>(new Map())

const fetchBaseData = async () => {
  const [areaRes, industriesRes, consultantsRes] = await Promise.all([getAreas(), getIndustries(), getConsultantList()])
  areaMap.value = new Map(areaRes.data.map((item: { id: number; name: string }) => [item.id, item.name]))
  consultantsMap.value = new Map(consultantsRes.data.map((item: { id: number; name: string }) => [item.id, item.name]))
  industryMap.value = new Map(industriesRes.data.map((item: { id: number; name: string }) => [item.id, item.name]))
  regionData.value = transformToTree(areaRes.data)
}

const status = ref<string | number>('')

const fetchTableData = async () => {
  try {
    const params: any = {
      type: activeTab.value === 'one' ? 1 : 0,
      page: currentPage.value,
      pageSize: pageSize.value,
      ...searchParams.value
    }
    if (selectedRegions.value && selectedRegions.value.length > 0) {
      params.city_ids = selectedRegions.value.join(',')
    }
    // 客户状态筛选
    if (status.value !== '') {
      params.status = status.value
    }
    const institutionRes = await getInstitutionList(params)
    tableData.value = institutionRes.data.list.map((item: TableItem) => ({
      ...item,
      industry_name: industryMap.value.get(item.industry_id) || '未知行业',
      province_name: areaMap.value.get(item.province_id) || '未知省份',
      city_name: areaMap.value.get(item.city_id) || '未知城市',
      counsellor_name: consultantsMap.value.get(item.counsellor_id) || '未知顾问'
    }))
    total.value = institutionRes.data.total
    week_total.value = institutionRes.data.week_total
  } catch (error) {
    console.error('获取客户列表失败', error)
  }
}

const route = useRoute()

const selectedRegions = ref<any[]>([])
const regionData = ref<any[]>([])

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

onMounted(async () => {
  const tab = route.query.tab as string
  if (tab) {
    activeTab.value = tab
  }
  await fetchBaseData()
  fetchTableData()
})

const goDetail = (id: number) => {
  router.push(`/customer/add?type=1&id=${id}`)
}

const goContract = (id: number) => {
  router.push(`/contract/add?id=${id}`)
}

const handleClickTab = (tab: string) => {
  activeTab.value = tab
  currentPage.value = 1
  fetchTableData()
}

const onAddCustomer = () => {
  router.push('/customer/add?type=1')
}
const updataStatus = async (id: number) => {
  const res = await updateInstitutionStatus({ id })
  if (!res || res.status !== 200) {
    ElMessage.error('更新失败！')
    return
  }
  ElMessage.success('更新成功！')
  tableData.value = tableData.value.map(item => {
    if (item.id === id) {
      item.status = item.status === 2 ? 1 : 2
    }
    return item
  })
}

const sortOrder = ref<'asc' | 'desc' | null>(null)

function handleSortChange({ prop, order }: { prop: string; order: 'ascending' | 'descending' | null }) {
  if (prop === 'employees_num') {
    sortOrder.value = order === 'ascending' ? 'asc' : order === 'descending' ? 'desc' : null
    if (sortOrder.value) {
      tableData.value = [...tableData.value].sort((a, b) => {
        if (sortOrder.value === 'asc') {
          return a.employees_num - b.employees_num
        } else {
          return b.employees_num - a.employees_num
        }
      })
    } else {
      fetchTableData() // 还原原始顺序
    }
  }
}

const onSearch = () => {
  if (!searchField.value || !searchValue.value) {
    ElMessage.warning('请选择字段并输入搜索内容')
    return
  }
  searchParams.value = { [searchField.value]: searchValue.value }
  currentPage.value = 1
  fetchTableData()
}

const onReset = () => {
  searchField.value = 'org_name'
  searchValue.value = ''
  searchParams.value = {}
  status.value = ''
  currentPage.value = 1
  fetchTableData()
}

watch(selectedRegions, () => {
  currentPage.value = 1
  fetchTableData()
})
// 客户状态筛选变化时刷新表格
watch(status, () => {
  currentPage.value = 1
  fetchTableData()
})
</script>

<style scoped>
.custom-table :deep(.el-table__header) {
  background-color: #f8fafc;
}
.custom-table :deep(.el-table__row) {
  cursor: pointer;
}
.custom-table :deep(.el-table__row:hover) {
  background-color: #f8fafc;
}
.custom-table :deep(.el-button--primary.is-link) {
  color: #3b82f6;
}
.custom-table :deep(.el-button--primary.is-link:hover) {
  color: #2563eb;
}
</style>
