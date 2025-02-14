<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
  <div class="bg-gray-50">
    <div class="flex min-h-screen">
      <!-- 主内容区 -->
      <div class="flex-1">
        <!-- 顶部导航 -->
        <div class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div class="text-lg">欢迎回来，今天又是充满希望的一天</div>
        </div>

        <!-- 待办事项 -->
        <div class="p-6">
          <div class="grid grid-cols-2 gap-6">
            <el-card>
              <div class="flex items-center mb-4">
                <el-icon class="text-red-500">
                  <img class="" src="../../assets/image/icons/icon-task.png" />
                </el-icon>
                <span class="ml-2 font-medium">待处理任务</span>
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
                  <img class="" src="../../assets/image/icons/icon-hetong.png" />
                </el-icon>
                <span class="ml-2 font-medium">待处理合同</span>
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
                <span class="ml-2 font-medium">客户统计</span>
              </div>
              <div class="grid grid-cols-4 gap-4">
                <div v-for="(item, index) in customerStats" :key="index" class="text-center">
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
                <span class="ml-2 font-medium">问卷统计</span>
              </div>
              <div class="grid grid-cols-4 gap-4">
                <div v-for="(item, index) in surveyStats" :key="index" class="text-center">
                  <div class="text-xl font-bold text-blue-500">
                    {{ item.count }}<span class="ml-1 text-sm text-black">{{ item.danwei }}</span>
                  </div>
                  <div class="text-sm mt-1 text-orange-400 font-bold">{{ item.papelName }}</div>
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
                  <span class="ml-2 font-medium">{{ section.title }}</span>
                </div>
              </div>
              <div class="space-y-4">
                <div v-for="(item, itemIndex) in section.items" :key="itemIndex" class="p-3 bg-gray-50 rounded">
                  {{ item }}
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
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const todoTasks = [
  { count: 54, label: '三个月内服务期满客户' },
  { count: 415, label: '新客户一周内首次建立测评项目' },
  { count: 12, label: '待人工编制报告数' }
]

const todoContracts = [
  { count: 54, label: '合同被退回数量' },
  { count: 415, label: '合同待审批' },
  { count: 415, label: '审批通过未查阅' }
]

const customerStats = [
  { count: 54, label: '自助客户' },
  { count: 54, label: '一周内新注册自助客户' },
  { count: 54, label: '测评客户' },
  { count: 415, label: '历史客户' }
]

const surveyStats = [
  { count: 54, label: '测评问卷', highlight: false, danwei: '份' },
  { count: 54, label: '累计测评人数', highlight: false, danwei: '人' },
  { count: 545341, label: '累计使用人次最多的测评问卷', highlight: true, papelName: '问卷名称', danwei: '人次' },
  { count: 545341, label: '近15天使用人次最多的测评问卷', highlight: true, papelName: '问卷名称', danwei: '人次' }
]

const productSections = [
  {
    title: '最近15天新上线产品套餐',
    icon: '/src/assets/image/icons/icon-taocan1.png',
    items: ['企业人才测评基础套餐', '领导力发展评估套餐', '团队效能提升方案', '职业发展规划套餐']
  },
  {
    title: '最近15天新屏蔽产品套餐',
    icon: '/src/assets/image/icons/icon-taocan2.png',
    items: ['组织文化诊断套餐', '人才甄选与发展套餐', '员工敬业度调研套餐', '管理者能力评估套餐']
  },
  {
    title: '最近15天新解除屏蔽产品套餐',
    icon: '/src/assets/image/icons/icon-taocan3.png',
    items: ['职业倾向分析问卷', '领导力潜质评估', '团队协作能力测评', '岗位胜任力评估']
  },
  {
    title: '客户购买数量最多的产品套餐',
    icon: '/src/assets/image/icons/icon-taocan4.png',
    items: ['企业人才测评基础套餐', '领导力发展评估套餐', '团队效能提升方案', '职业发展规划套餐']
  },
  {
    title: '最近30天客户购买数量最多的产品套餐',
    icon: '/src/assets/image/icons/icon-taocan5.png',
    items: ['组织文化诊断套餐', '人才甄选与发展套餐', '员工敬业度调研套餐', '管理者能力评估套餐']
  },
  {
    title: '最近15天新交付问卷',
    icon: '/src/assets/image/icons/icon-taocan6.png',
    items: ['职业倾向分析问卷', '领导力潜质评估', '团队协作能力测评', '岗位胜任力评估']
  }
]

const handleCustomerTaskClick = (item: any) => {
  console.log(item)
  router.push({ path: '/customer/evaluate' })
}

const handleCustomerContractsClick = (item: any) => {
  console.log(item)
  router.push({ path: '/hetong/list' })
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
