<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 顶部提示区域 -->
    <div class="flex items-center justify-between py-4 mb-6">
      <div class="flex gap-8">
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'three' }]"
          @click="handleClickTab('three')"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../../assets/image/icons/three.png" />
          </el-icon>
          <span
            >您有 <span class="text-blue-500 font-medium">{{ three_month_total }}</span> 个客户三个月内服务期满</span
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
            >您有 <span class="text-blue-500 font-medium">{{ week_total }}</span> 个新客户一周内首次建立测评项目</span
          >
        </div>
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'all' }]"
          @click="handleClickTab('all')"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../../assets/image/icons/all.png" />
          </el-icon>
          <span
            >您共为 <span class="text-blue-500 font-medium">{{ all }}</span> 个客户提供专业服务</span
          >
        </div>
      </div>
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="onAddCustomer">
        <el-icon class="mr-1"><Plus /></el-icon>新增客户
      </el-button>
    </div>
    <!-- 表格区域 -->
    <el-table :data="tableData" class="mb-4 bg-white">
      <el-table-column type="selection" />
      <el-table-column label="序号" type="index" />
      <el-table-column prop="user_no" label="客户编号" sortable />
      <el-table-column prop="org_name" label="客户名称" sortable />
      <el-table-column label="剩余点数" prop="remainingCount" sortable />
      <el-table-column label="点数最后截止日期" prop="pointsEndDate" />
      <el-table-column label="套餐最后截止日期" prop="packageEndDate" />
      <el-table-column label="操作" fixed="right" width="500">
        <template #default="scope">
          <div class="flex items-center gap-2">
            <el-button @click="goDetail(scope.row.id)" type="primary" link>修改客户信息</el-button>
            <el-button @click="goAddContract(scope.row.id)" type="primary" link>新增订单</el-button>
            <el-button type="danger" link class="!rounded-button whitespace-nowrap" @click="updataStatus(scope.row.id)">
              {{ scope.row.status === 2 ? '解冻' : '冻结' }}
            </el-button>
            <el-button @click="onSeeRecord(scope.row.id)" type="primary" link>查看客户使用记录</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div class="flex items-center justify-between py-4">
      <span class="text-gray-600">共 {{ total }} 条</span>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :total="total"
        layout="sizes, prev, pager, next"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { getEvaluationList, updateInstitutionStatus } from '@/api/customer'

const activeTab = ref('three') // one: 一周内, three: 三个月内, all: 全部
const tabMap = {
  all: 0,
  one: 1,
  three: 2
}
const currentPage = ref(1)
const pageSize = ref(10)

const total = ref(0)
const all = ref(0)
const week_total = ref(0)
const three_month_total = ref(0)
const tableData = ref([])

const fetchTableData = async () => {
  try {
    const { data } = await getEvaluationList({
      type: tabMap[activeTab.value],
      page: currentPage.value,
      pageSize: pageSize.value
    })
    tableData.value = data.list
    total.value = data.total
    all.value = data.all
    week_total.value = data.week_total
    three_month_total.value = data.three_month_total
  } catch (error) {
    console.error('获取客户列表失败', error)
  }
}

onMounted(() => {
  const tab = router.currentRoute.value.query?.tab
  if (tab) {
    activeTab.value = tab
  }
  fetchTableData()
})

const onSeeRecord = id => {
  console.log('查看客户使用记录')
  router.push(`/customer/use-record?id=${id}`)
}

const onAddCustomer = () => {
  router.push({ path: '/customer/add', query: { type: 2 } })
}

const goDetail = id => {
  router.push({ path: '/customer/add', query: { type: 2, id } })
}

const goAddContract = id => {
  router.push({ path: '/contract/add', query: { id } })
}

const handleClickTab = tab => {
  activeTab.value = tab
  currentPage.value = 1
  fetchTableData()
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
.el-table {
  --el-table-border-color: #ebeef5;
  --el-table-header-bg-color: #f5f7fa;
}
.el-pagination {
  justify-content: flex-end;
}
</style>
