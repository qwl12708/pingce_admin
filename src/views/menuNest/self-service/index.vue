<template>
  <div class="main-content min-h-screen bg-gray-50 p-6">
    <!-- 数据概览区 -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex gap-8">
        <div class="flex items-center">
          <el-icon class="mr-2 text-blue-500"><DataLine /></el-icon>
          <span>您共为 <span class="text-blue-500 font-medium">6</span> 个自助客户提供专业服务</span>
        </div>
        <div class="flex items-center">
          <el-icon class="mr-2 text-blue-500"><Timer /></el-icon>
          <span>您有 <span class="text-blue-500 font-medium">2</span> 个自助客户一周内新注册</span>
        </div>
      </div>
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="onAddCustomer">
        <el-icon class="mr-1"><Plus /></el-icon>新增客户
      </el-button>
    </div>
    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow">
      <el-table :data="tableData" style="width: 100%" class="custom-table">
        <el-table-column type="selection" width="50" />
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column prop="customerCode" label="客户编号" width="120" sortable />
        <el-table-column prop="customerName" label="客户名称" width="200" sortable />
        <el-table-column prop="registerDate" label="注册日期" width="180" sortable />
        <el-table-column prop="projectCount" label="累计项目数" width="120" sortable />
        <el-table-column prop="evaluationCount" label="累计评估人次" width="120" sortable />
        <el-table-column prop="contact" label="联系人" width="120" sortable />
        <el-table-column label="操作" fixed="right" width="400">
          <template #default="scope">
            <div class="flex gap-2">
              <el-button type="primary" link class="!rounded-button whitespace-nowrap"> 查询 </el-button>
              <el-button type="primary" link class="!rounded-button whitespace-nowrap"> 修改客户信息 </el-button>
              <el-button type="primary" link class="!rounded-button whitespace-nowrap"> 新增订单 </el-button>
              <el-button type="primary" link class="!rounded-button whitespace-nowrap" @click="toggleFreeze(scope.row)">
                {{ scope.row.isFreezed ? '解冻' : '冻结' }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="flex justify-between items-center p-4">
        <span class="text-gray-600">共 999 条</span>
        <div class="flex items-center gap-4">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="sizes, prev, pager, next, jumper"
            :total="999"
            class="!rounded-button"
          />
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { DataLine, Timer, Plus } from '@element-plus/icons-vue'
import router from '@/router'
interface TableItem {
  customerCode: string
  customerName: string
  registerDate: string
  projectCount: number
  evaluationCount: number
  contact: string
  isFreezed: boolean
}
const currentPage = ref(1)
const pageSize = ref(10)
const tableData = ref<TableItem[]>([
  {
    customerCode: 'KH20240001',
    customerName: '深圳市科技创新有限公司',
    registerDate: '2024-04-12 13:00',
    projectCount: 5,
    evaluationCount: 5,
    contact: '陈经理',
    isFreezed: false
  },
  {
    customerCode: 'KH20240002',
    customerName: '广州智慧科技股份有限公司',
    registerDate: '2024-04-12 13:00',
    projectCount: 5,
    evaluationCount: 5,
    contact: '林总监',
    isFreezed: false
  },
  {
    customerCode: 'KH20240003',
    customerName: '北京未来科技发展有限公司',
    registerDate: '2024-04-12 13:00',
    projectCount: 5,
    evaluationCount: 5,
    contact: '王经理',
    isFreezed: true
  },
  {
    customerCode: 'KH20240004',
    customerName: '上海创新科技有限公司',
    registerDate: '2024-04-12 13:00',
    projectCount: 5,
    evaluationCount: 5,
    contact: '张总监',
    isFreezed: false
  },
  {
    customerCode: 'KH20240005',
    customerName: '杭州数字科技有限公司',
    registerDate: '2024-04-12 13:00',
    projectCount: 5,
    evaluationCount: 5,
    contact: '李经理',
    isFreezed: false
  },
  {
    customerCode: 'KH20240006',
    customerName: '成都创新科技有限公司',
    registerDate: '2024-04-12 13:00',
    projectCount: 5,
    evaluationCount: 5,
    contact: '刘总监',
    isFreezed: true
  }
])
const toggleFreeze = (row: TableItem) => {
  row.isFreezed = !row.isFreezed
}

const onAddCustomer = () => {
  router.push('/menu-nest/add')
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
