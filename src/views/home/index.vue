<template>
  <div class="bg-gray-50">
    <div class="flex min-h-screen">
      <!-- 主内容区 -->
      <div class="flex-1">
        <!-- 顶部导航 -->
        <div class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div class="text-lg font-bold">环境：测试。欢迎回来，今天又是充满希望的一天</div>
        </div>

        <!-- 待办事项 -->
        <div class="p-6">
          <div class="grid grid-cols-2 gap-6">
            <el-card>
              <div class="flex items-center mb-4">
                <el-icon class="text-red-500">
                  <img class="" src="../../assets/image/icons/icon-task.png" />
                </el-icon>
                <span class="ml-2 font-bold">待处理任务</span>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  v-for="(item, index) in todoTasks"
                  :key="index"
                  class="bg-blue-50 p-4 rounded-lg"
                  @click="handleCustomerTaskClick(item)"
                >
                  <div class="text-2xl font-bold text-green-500">
                    {{ item.count }}<span class="ml-1 text-sm text-black">个</span>
                  </div>
                  <div class="text-sm text-gray-600 mt-1">{{ item.label }}</div>
                </div>
              </div>
            </el-card>

            <el-card>
              <div class="flex items-center mb-4">
                <el-icon class="text-red-500">
                  <img class="" src="../../assets/image/icons/icon-contract.png" />
                </el-icon>
                <span class="ml-2 font-bold">待处理合同</span>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  v-for="(item, index) in todoContracts"
                  :key="index"
                  class="bg-red-50 p-4 rounded-lg"
                  @click="handleCustomerContractsClick(item)"
                >
                  <div class="text-2xl font-bold text-red-500">
                    {{ item.count }}<span class="ml-1 text-sm text-black">个</span>
                  </div>
                  <div class="text-sm text-gray-600 mt-1">{{ item.label }}</div>
                </div>
              </div>
            </el-card>
          </div>

          <!-- 统计数据 -->
          <div class="grid grid-cols-2 gap-6 mt-6">
            <el-card>
              <div class="flex items-center mb-4">
                <el-icon class="text-orange-500">
                  <img class="" src="../../assets/image/icons/icon-kehu.png" />
                </el-icon>
                <span class="ml-2 font-bold">客户统计</span>
              </div>
              <div class="grid grid-cols-4 gap-4">
                <div
                  v-for="(item, index) in customerStats"
                  :key="index"
                  class="text-center cursor-pointer"
                  @click="handleCustomerStatsClick(index)"
                >
                  <div class="text-xl text-orange-500 font-bold">
                    {{ item.count }}<span class="ml-1 text-sm text-black">个</span>
                  </div>
                  <div class="text-sm text-gray-600 mt-1">{{ item.label }}</div>
                </div>
              </div>
            </el-card>

            <el-card>
              <div class="flex items-center mb-4">
                <el-icon class="text-blue-500">
                  <img class="" src="../../assets/image/icons/icon-wenjuan.png" />
                </el-icon>
                <span class="ml-2 font-bold">问卷统计</span>
              </div>
              <div class="grid grid-cols-4 gap-4">
                <div
                  v-for="(item, index) in surveyStats"
                  :key="index"
                  class="text-center cursor-pointer"
                  @click="handleSurveyStatsClick(index)"
                >
                  <div class="text-xl font-bold text-blue-500">
                    {{ item.count }}<span class="ml-1 text-sm text-black">{{ item.danwei }}</span>
                  </div>
                  <div class="text-sm mt-1 text-orange-400 font-bold">
                    {{ item.papelName }}
                  </div>
                  <div class="text-sm text-gray-600 mt-1">{{ item.label }}</div>
                </div>
              </div>
            </el-card>
          </div>

          <!-- 产品数据 -->
          <div class="grid grid-cols-3 gap-6 mt-6">
            <el-card v-for="(section, index) in productSections" :key="index">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <el-icon class="text-blue-500">
                    <img :src="section.icon" />
                  </el-icon>
                  <span class="ml-2 font-bold">{{ section.title }}</span>
                </div>
              </div>
              <div class="space-y-4">
                <div v-for="(item, itemIndex) in section.list" :key="itemIndex" class="p-3 bg-gray-50 rounded">
                  {{ item.name }}
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import taocan1 from '@/assets/image/icons/icon-taocan1.png'
import taocan2 from '@/assets/image/icons/icon-taocan2.png'
import taocan3 from '@/assets/image/icons/icon-taocan3.png'
import taocan4 from '@/assets/image/icons/icon-taocan4.png'
import taocan5 from '@/assets/image/icons/icon-taocan5.png'
import taocan6 from '@/assets/image/icons/icon-taocan6.png'
import { useRouter } from 'vue-router'
import { getTaskStats, getContractStats, getCustomerStats, getProductStats, getQuestionnaire } from '@/api/home/index'

const router = useRouter()

const todoTasks = ref()

const todoContracts = ref()

const customerStats = ref([])

const surveyStats = ref([])

const productSections = ref([
  {
    title: '最近15天新上线产品套餐',
    icon: taocan1,
    list: []
  },
  {
    title: '最近15天新屏蔽产品套餐',
    icon: taocan2,
    list: []
  },
  {
    title: '最近15天新解除屏蔽产品套餐',
    icon: taocan3,
    list: []
  },
  {
    title: '客户购买数量最多的产品套餐',
    icon: taocan4,
    list: []
  },
  {
    title: '最近30天客户购买数量最多的产品套餐',
    icon: taocan5,
    list: []
  },
  {
    title: '最近15天新交付问卷',
    icon: taocan6,
    list: []
  }
])

onMounted(async () => {
  const {
    data: { money_num, week_num }
  } = await getTaskStats()
  todoTasks.value = [
    { count: money_num, label: '三个月内服务期满客户', tab: 'three' },
    { count: week_num, label: '新客户一周内首次建立测评项目', tab: 'one' },
    { count: 0, label: '待人工编制报告数', tab: 'all' }
  ]

  const {
    data: { back_count, pass_count, pending_count }
  } = await getContractStats()
  todoContracts.value = [
    { count: back_count, label: '合同被退回数量', tab: 1 },
    { count: pending_count, label: '合同待审批', tab: 4 },
    { count: pass_count, label: '审批通过未查阅', tab: 3 }
  ]

  const {
    data: { all_user, evaluation_user, self_user, self_week_user }
  } = await getCustomerStats()
  customerStats.value = [
    { count: self_user, label: '自助客户' },
    { count: self_week_user, label: '一周内新注册自助客户' },
    { count: evaluation_user, label: '测评客户' },
    { count: all_user, label: '历史客户' }
  ]

  const {
    data: { evaluator_num, questionnaire_num, use_max_questionnaire, use_max_questionnaire_15 }
  } = await getQuestionnaire()
  surveyStats.value = [
    { count: questionnaire_num, label: '测评问卷', highlight: false, danwei: '份' },
    { count: evaluator_num, label: '累计测评人数', highlight: false, danwei: '人' },
    {
      count: use_max_questionnaire.count,
      label: '累计使用人次最多的测评问卷',
      highlight: true,
      papelName: use_max_questionnaire.questionnaire_name,
      danwei: '人次'
    },
    {
      count: use_max_questionnaire_15.count,
      label: '近15天使用人次最多的测评问卷',
      highlight: true,
      papelName: use_max_questionnaire_15.questionnaire_name,
      danwei: '人次'
    }
  ]

  const productRes = await getProductStats()
  const icons = [taocan1, taocan2, taocan3, taocan4, taocan5, taocan6]
  productSections.value = productRes.data.map((e, i) => ({
    ...e,
    icon: icons[i]
  }))
})

const handleCustomerTaskClick = (item: any) => {
  console.log(item)
  router.push({ path: `/customer/evaluate`, query: { tab: item.tab } })
}

const handleCustomerContractsClick = (item: any) => {
  console.log(item)
  router.push({ path: `/contract/list`, query: { tab: item.tab } })
}

const handleCustomerStatsClick = (index: number) => {
  const tabMap = ['all', 'one', 'all', 'all']
  const pathMap = ['/customer/self-service', '/customer/self-service', '/customer/evaluate', '/customer/evaluate']
  router.push({ path: pathMap[index], query: { tab: tabMap[index] } })
}

const handleSurveyStatsClick = (index: number) => {
  router.push({ path: '/contract/list', query: { tab: index + 1 } })
}
</script>

<style scoped>
.sidebar-item:hover {
  background-color: rgba(22, 119, 255, 0.1);
}

.sidebar-item.active {
  background-color: rgba(22, 119, 255, 0.1);
  border-right: 3px solid #1677ff;
}
</style>
