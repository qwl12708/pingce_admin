<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="账户信息" name="account">
          <div class="p-6" style="width: 548px">
            <div class="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 mb-8">
              <h2 class="text-xl text-white font-medium mb-3">校园招聘通用测评包年套餐</h2>
              <p class="text-blue-100 text-sm mb-4">2024 年 7 月 30 日到期</p>
              <div class="flex gap-8">
                <span class="text-blue-100">剩余点数：10000</span>
                <span class="text-blue-100">活动赠送点数：2000</span>
              </div>
            </div>
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <el-icon class="text-blue-500"><Tickets /></el-icon>
                <h3 class="font-medium">点数到期明细</h3>
              </div>
              <el-table :data="pointsData" style="width: 100%">
                <el-table-column prop="points" label="点数" />
                <el-table-column prop="expireDate" label="截止日期" />
                <el-table-column prop="purchaseDate" label="购买时间" />
              </el-table>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-4">
                <el-icon class="text-blue-500"><Box /></el-icon>
                <h3 class="font-medium">套餐明细</h3>
              </div>
              <el-table :data="packageData" style="width: 100%">
                <el-table-column prop="name" label="套餐名称" />
                <el-table-column prop="survey" label="适用问卷" />
                <el-table-column prop="expireDate" label="截止日期" />
                <el-table-column prop="purchaseDate" label="购买时间" />
              </el-table>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="测评产品使用记录" name="usage">
          <div class="p-6">
            <el-table :data="pointsData" style="width: 100%">
              <el-table-column prop="oints" label="测评项目" />
              <el-table-column prop="expireDate1" label="使用问卷" />
              <el-table-column prop="purchaseDate" label="标准点数" />
              <el-table-column prop="urchaseDate3" label="邀请评测人数" />
              <el-table-column prop="urchaseDate4" label="冻结点数" />
              <el-table-column prop="urchaseDate5" label="消耗点数" />
              <el-table-column prop="urchaseDate6" label="操作者" />
              <el-table-column prop="urchaseDate7" label="使用时间" />
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="产品套餐购买记录" name="purchase">
          <div class="p-6">
            <el-table :data="pointsData" style="width: 100%">
              <el-table-column prop="points" label="类别" />
              <el-table-column prop="expireDate1" label="点数" />
              <el-table-column prop="purchaseDate2" label="套餐" />
              <el-table-column prop="purchaseDate3" label="可使用问卷" />
              <el-table-column prop="purchaseDate4" label="购买日期" />
              <el-table-column prop="purchaseDate5" label="合同编号" />
              <el-table-column prop="purchaseDate6" label="开通时间" />
              <el-table-column prop="purchaseDate7" label="截止日期" />
              <el-table-column prop="note" label="备注" />
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Tickets, Box } from '@element-plus/icons-vue'

const activeTab = ref('account')
const pointsData = ref([
  {
    points: 8000,
    expireDate: '2024-04-12',
    purchaseDate: '2024-04-12'
  },
  {
    points: 2000,
    expireDate: '2024-04-12',
    purchaseDate: '2024-04-12'
  }
])
const packageData = ref([
  {
    name: '企业人才测评套餐',
    survey: '职业性格测评问卷',
    expireDate: '2024-04-12',
    purchaseDate: '2024-04-12'
  },
  {
    name: '校园招聘测评套餐',
    survey: '综合能力测评问卷',
    expireDate: '2024-04-12',
    purchaseDate: '2024-04-12'
  }
])
</script>
<style scoped>
.el-table {
  --el-table-border-color: #f0f0f0;
  --el-table-header-bg-color: #fafafa;
  --el-table-row-hover-bg-color: #fafafa;
}
.el-table th {
  font-weight: 500;
}
:deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: #f0f0f0;
}
:deep(.el-tabs__item) {
  font-size: 14px;
  padding: 16px 8px;
}
:deep(.el-tabs__active-bar) {
  height: 2px;
}
</style>
