<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div>
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="账户信息" name="account">
          <div class="p-6" style="width: 548px">
            <div class="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 mb-8">
              <h2 class="text-xl text-white font-medium mb-3">校园招聘通用测评包年套餐</h2>
              <div class="flex gap-8">
                <span class="text-blue-100">剩余点数：{{ scoreInfo.score_num }}</span>
                <span class="text-blue-100">冻结点数之和：{{ scoreInfo.freeze_score_num }}</span>
              </div>
            </div>
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <el-icon class="text-blue-500"><Tickets /></el-icon>
                <h3 class="font-medium">点数到期明细</h3>
              </div>
              <el-table :data="expireScoreData" style="width: 100%">
                <el-table-column prop="score" label="点数" />
                <el-table-column prop="end_time" label="截止日期">
                  <template #default="scope">
                    {{ formatTime(scope.row.end_time) }}
                  </template>
                </el-table-column>
                <el-table-column prop="buy_time" label="购买时间">
                  <template #default="scope">
                    {{ formatTime(scope.row.buy_time) }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-4">
                <el-icon class="text-blue-500"><Box /></el-icon>
                <h3 class="font-medium">套餐明细</h3>
              </div>
              <el-table :data="usedProductData" style="width: 100%">
                <el-table-column prop="name" label="套餐名称" />
                <el-table-column prop="questionnaire_name" label="适用问卷" />
                <el-table-column prop="end_time" label="截止日期">
                  <template #default="scope">
                    {{ formatTime(scope.row.end_time) }}
                  </template>
                </el-table-column>
                <el-table-column prop="buy_time" label="购买时间">
                  <template #default="scope">
                    {{ formatTime(scope.row.buy_time) }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="测评产品使用记录" name="usage">
          <div class="p-6">
            <el-table :data="scoreProductData" style="width: 100%">
              <el-table-column prop="project_name" label="测评项目" />
              <el-table-column prop="questionnaire_name" label="使用问卷" />
              <el-table-column prop="score_num" label="标准点数" />
              <el-table-column prop="invite_count" label="邀请评测人数" />
              <el-table-column prop="freeze_num" label="冻结点数" />
              <el-table-column prop="use_num" label="消耗点数" />
              <el-table-column prop="creater" label="操作者" />
              <el-table-column prop="create_time" label="创建时间" />
            </el-table>
            <el-pagination
              class="mt-4"
              background
              layout="prev, pager, next, jumper, ->, total"
              :current-page="usagePage"
              :page-size="usagePageSize"
              :total="usageTotal"
              @current-change="handleUsagePageChange"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane label="产品套餐购买记录" name="purchase">
          <div class="p-6">
            <el-table :data="allProductData" style="width: 100%">
              <el-table-column prop="type" label="类别">
                <template #default="scope">
                  {{ scope.row.type === 1 ? '包年包月' : '点数' }}
                </template>
              </el-table-column>
              <el-table-column prop="score_num" label="点数" />
              <el-table-column prop="name" label="套餐" />
              <el-table-column prop="questionnaire_name" label="可使用问卷" />
              <el-table-column prop="buy_time" label="购买日期">
                <template #default="scope">
                  {{ formatTime(scope.row.buy_time) }}
                </template>
              </el-table-column>
              <el-table-column prop="contract_no" label="合同编号" />
              <el-table-column prop="start_time" label="开通时间">
                <template #default="scope">
                  {{ formatTime(scope.row.start_time) }}
                </template>
              </el-table-column>
              <el-table-column prop="end_time" label="截止日期">
                <template #default="scope">
                  {{ formatTime(scope.row.end_time) }}
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" />
            </el-table>
            <el-pagination
              class="mt-4"
              background
              layout="prev, pager, next, jumper, ->, total"
              :current-page="purchasePage"
              :page-size="purchasePageSize"
              :total="purchaseTotal"
              @current-change="handlePurchasePageChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getScoreInfo, getExpireScore, getUsedProduct, getScoreProduct, getAllProduct } from '@/api/customer'
import { Tickets, Box } from '@element-plus/icons-vue'
import { formatTime } from '@/utils/formatTime'

const route = useRoute()
const customerId = ref(route.query.id)

const activeTab = ref('account')
const scoreInfo = ref({ score_num: 0, freeze_score_num: 0 })
const expireScoreData = ref([])
const usedProductData = ref([])
const scoreProductData = ref([])
const allProductData = ref([])

// 分页相关变量
const usagePage = ref(1)
const usagePageSize = ref(10)
const usageTotal = ref(0)
const purchasePage = ref(1)
const purchasePageSize = ref(10)
const purchaseTotal = ref(0)

const fetchScoreInfo = async () => {
  const { data } = await getScoreInfo({ id: customerId.value })
  scoreInfo.value = data
}

const fetchExpireScore = async () => {
  const { data } = await getExpireScore({ id: Number(customerId.value), page: 1, pageSize: 100 })
  expireScoreData.value = data.list
}

const fetchUsedProduct = async () => {
  const { data } = await getUsedProduct({ id: Number(customerId.value), page: 1, pageSize: 100 })
  usedProductData.value = data.list
}

const fetchScoreProduct = async () => {
  const { data } = await getScoreProduct({
    id: Number(customerId.value),
    page: usagePage.value,
    pageSize: usagePageSize.value
  })
  scoreProductData.value = data.list
  usageTotal.value = data.total || 0
}

const fetchAllProduct = async () => {
  const { data } = await getAllProduct({
    id: Number(customerId.value),
    page: purchasePage.value,
    pageSize: purchasePageSize.value
  })
  allProductData.value = data.list
  purchaseTotal.value = data.total || 0
}

onMounted(() => {
  fetchScoreInfo()
  fetchExpireScore()
  fetchUsedProduct()
})

const handleTabClick = (tab: any) => {
  if (tab.props.name === 'purchase') {
    fetchAllProduct()
  } else if (tab.props.name === 'usage') {
    fetchScoreProduct()
  }
}

const handleUsagePageChange = (page: number) => {
  usagePage.value = page
  fetchScoreProduct()
}
const handlePurchasePageChange = (page: number) => {
  purchasePage.value = page
  fetchAllProduct()
}
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
