<template>
  <div class="main-content min-h-screen bg-gray-50 p-6">
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
      <el-table :data="tableData" style="width: 100%" class="custom-table">
        <el-table-column type="selection" />
        <el-table-column label="序号" type="index" />
        <el-table-column prop="user_no" label="客户编号" sortable />
        <el-table-column prop="org_name" label="客户名称" sortable />
        <el-table-column prop="create_time" label="注册日期" sortable>
          <template #default="{ row }">
            <span>{{ dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="project_num" label="累计项目数" sortable />
        <el-table-column prop="answer_num" label="累计评估人次" sortable />
        <el-table-column prop="contacts" label="联系人" sortable />
        <el-table-column label="操作" fixed="right" width="300" align="center">
          <template #default="scope">
            <div class="flex gap-2">
              <el-button type="primary" @click="goRecord(scope.row.id)" link class="!rounded-button whitespace-nowrap">
                查询
              </el-button>
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
          />
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import router from '@/router'
import { getInstitutionList, updateInstitutionStatus } from '@/api/customer'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'

interface TableItem {
  org_code: string
  org_name: string
  created_at: string
  project_count: number
  evaluation_count: number
  contact_name: string
  isFreezed: boolean
}

const activeTab = ref('all')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const week_total = ref(0)
const tableData = ref<TableItem[]>([])

const fetchTableData = async () => {
  try {
    const { data } = await getInstitutionList({
      type: activeTab.value === 'one' ? 1 : 0,
      page: currentPage.value,
      pageSize: pageSize.value
    })
    tableData.value = data.list
    total.value = data.total
    week_total.value = data.week_total
  } catch (error) {
    console.error('获取客户列表失败', error)
  }
}

onMounted(() => {
  fetchTableData()
})

const goDetail = id => {
  router.push(`/customer/add?type=1&id=${id}`)
}

const goContract = id => {
  router.push(`/contract/add?id=${id}`)
}

const goRecord = id => {
  router.push(`/customer/use-record?id=${id}`)
}

const handleClickTab = (tab: string) => {
  activeTab.value = tab
  currentPage.value = 1
  fetchTableData()
}

const onAddCustomer = () => {
  router.push('/customer/add?type=1')
}
const updataStatus = async id => {
  const res = await updateInstitutionStatus({ id })
  if (!res) return
  if (res.code !== 200) {
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
