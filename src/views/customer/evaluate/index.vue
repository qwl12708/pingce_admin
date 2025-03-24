<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 顶部提示区域 -->
    <div class="flex items-center justify-between py-4 mb-6">
      <div class="flex gap-8">
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'three' }]"
          @click="activeTab = 'three'"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../../assets/image/icons/three.png" />
          </el-icon>
          <span>您有 <span class="text-blue-500 font-medium">*</span> 个客户三个月内服务期满</span>
        </div>
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'one' }]"
          @click="activeTab = 'one'"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../../assets/image/icons/one.png" />
          </el-icon>
          <span>您有 <span class="text-blue-500 font-medium">*</span> 个新客户一周内首次建立测评项目</span>
        </div>
        <div
          :class="['flex items-center', { 'text-blue-500 border-b-2 border-blue-500': activeTab === 'all' }]"
          @click="activeTab = 'all'"
        >
          <el-icon class="mr-2 text-blue-500">
            <img src="../../../assets/image/icons/all.png" />
          </el-icon>
          <span>您共为 <span class="text-blue-500 font-medium">*</span> 个客户提供专业服务</span>
        </div>
      </div>
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="onAddCustomer">
        <el-icon class="mr-1"><Plus /></el-icon>新增客户
      </el-button>
    </div>
    <!-- 表格区域 -->
    <el-table :data="tableData" class="mb-4 bg-white">
      <el-table-column type="selection" />
      <el-table-column label="序号" prop="index" />
      <el-table-column label="客户编号" prop="code" />
      <el-table-column label="客户名称" prop="name" sortable />
      <el-table-column label="剩余点数" prop="remainingCount" sortable />
      <el-table-column label="点数最后截止日期" prop="pointsEndDate" />
      <el-table-column label="套餐最后截止日期" prop="packageEndDate" />
      <el-table-column label="操作" fixed="right" width="500">
        <template #default="scope">
          <div class="flex items-center gap-2">
            <el-button type="primary" link>查询</el-button>
            <el-button @click="goDetail(scope.row.id)" type="primary" link>修改客户信息</el-button>
            <el-button @click="goAddContract(scope.row.id)" type="primary" link>新增订单</el-button>
            <el-button type="primary" link class="!rounded-button whitespace-nowrap" @click="updataStatus(scope.row)">
              {{ scope.row.status ? '解冻' : '冻结' }}
            </el-button>
            <el-button @click="onSeeRecord" type="primary" link>查看客户使用记录</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div class="flex items-center justify-between py-4">
      <span class="text-gray-600">共 999 条</span>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :total="999"
        layout="sizes, prev, pager, next"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { updateInstitutionStatus } from '@/api/customer'

const activeTab = ref('three') // one: 一周内, three: 三个月内, all: 全部
const currentPage = ref(1)
const pageSize = ref(10)
const tableData = ref([
  {
    index: 1,
    code: '20240412001',
    name: '深圳市科技创新有限公司',
    remainingCount: 5,
    pointsEndDate: '2024-04-12 13:00',
    packageEndDate: '2024-04-12 13:00'
  },
  {
    index: 2,
    code: '20240412002',
    name: '广州未来教育科技有限公司',
    remainingCount: 5,
    pointsEndDate: '2024-04-12 13:00',
    packageEndDate: '2024-04-12 13:00'
  },
  {
    index: 3,
    code: '20240412003',
    name: '北京智慧人才评估中心',
    remainingCount: 5,
    pointsEndDate: '2024-04-12 13:00',
    packageEndDate: '2024-04-12 13:00'
  },
  {
    index: 4,
    code: '20240412004',
    name: '上海卓越人才服务有限公司',
    remainingCount: 5,
    pointsEndDate: '2024-04-12 13:00',
    packageEndDate: '2024-04-12 13:00'
  },
  {
    index: 5,
    code: '20240412005',
    name: '杭州人才发展研究院',
    remainingCount: 5,
    pointsEndDate: '2024-04-12 13:00',
    packageEndDate: '2024-04-12 13:00'
  },
  {
    index: 6,
    code: '20240412006',
    name: '成都人力资源服务有限公司',
    remainingCount: 5,
    pointsEndDate: '2024-04-12 13:00',
    packageEndDate: '2024-04-12 13:00'
  }
])

const onSeeRecord = () => {
  console.log('查看客户使用记录')
  router.push('/customer/use-record')
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

const updataStatus = async id => {
  const res = await updateInstitutionStatus({ id })
  if (!res) return
  if (res.code !== 200) {
    ElMessage.error('更新失败！')
    return
  }
  ElMessage.success('更新成功！')
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
