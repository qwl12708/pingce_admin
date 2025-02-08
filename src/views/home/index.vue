<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
  <div class="bg-gray-50">
    <div class="flex min-h-screen">
      <!-- 主内容区 -->
      <div class="flex-1">
        <!-- 顶部导航 -->
        <div class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div class="text-lg">欢迎回来，今天又是充满希望的一天</div>
          <div class="flex items-center">
            <div class="relative mr-6 cursor-pointer">
              <el-badge :value="3" class="item">
                <el-icon><Bell /></el-icon>
              </el-badge>
            </div>
            <div class="flex items-center cursor-pointer">
              <el-avatar :size="32" :src="avatar" />
              <span class="ml-2">管理员</span>
            </div>
          </div>
        </div>

        <!-- 待办事项 -->
        <div class="p-6">
          <div class="grid grid-cols-2 gap-6">
            <el-card>
              <div class="flex items-center mb-4">
                <el-icon class="text-blue-500"><Document /></el-icon>
                <span class="ml-2 font-medium">待处理任务</span>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div v-for="(item, index) in todoTasks" :key="index" class="bg-blue-50 p-4 rounded-lg">
                  <div class="text-2xl font-bold text-blue-500">{{ item.count }}</div>
                  <div class="text-sm text-gray-600 mt-1">{{ item.label }}</div>
                </div>
              </div>
            </el-card>

            <el-card>
              <div class="flex items-center mb-4">
                <el-icon class="text-red-500"><Document /></el-icon>
                <span class="ml-2 font-medium">待处理合同</span>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div v-for="(item, index) in todoContracts" :key="index" class="bg-red-50 p-4 rounded-lg">
                  <div class="text-2xl font-bold text-red-500">{{ item.count }}</div>
                  <div class="text-sm text-gray-600 mt-1">{{ item.label }}</div>
                </div>
              </div>
            </el-card>
          </div>

          <!-- 统计数据 -->
          <div class="grid grid-cols-2 gap-6 mt-6">
            <el-card>
              <div class="flex items-center mb-4">
                <el-icon class="text-blue-500"><User /></el-icon>
                <span class="ml-2 font-medium">客户统计</span>
              </div>
              <div class="grid grid-cols-4 gap-4">
                <div v-for="(item, index) in customerStats" :key="index" class="text-center">
                  <div class="text-xl font-bold">{{ item.count }}</div>
                  <div class="text-sm text-gray-600 mt-1">{{ item.label }}</div>
                </div>
              </div>
            </el-card>

            <el-card>
              <div class="flex items-center mb-4">
                <el-icon class="text-blue-500"><TrendCharts /></el-icon>
                <span class="ml-2 font-medium">问卷统计</span>
              </div>
              <div class="grid grid-cols-4 gap-4">
                <div v-for="(item, index) in surveyStats" :key="index" class="text-center">
                  <div class="text-xl font-bold" :class="{ 'text-blue-500': item.highlight }">{{ item.count }}</div>
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
                  <el-icon class="text-blue-500"><component :is="section.icon" /></el-icon>
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
import { User, Document, Box, Bell, Star, TrendCharts } from '@element-plus/icons-vue'

const todoTasks = [
  { count: 54, label: '本月待审核客户' },
  { count: 415, label: '待确认项目' },
  { count: 12, label: '待处理报告' }
]

const todoContracts = [
  { count: 54, label: '待审核合同' },
  { count: 415, label: '合同待审批' },
  { count: 415, label: '即将过期合同' }
]

const customerStats = [
  { count: 54, label: '自助客户' },
  { count: 54, label: '活跃客户' },
  { count: 54, label: '测评客户' },
  { count: 415, label: '历史客户' }
]

const surveyStats = [
  { count: 54, label: '测评份数', highlight: false },
  { count: 54, label: '测评人数', highlight: false },
  { count: 545341, label: '累计测评次数', highlight: true },
  { count: 545341, label: '累计问卷数量', highlight: true }
]

const productSections = [
  {
    title: '最近上线产品套餐',
    icon: Box,
    items: ['企业人才测评基础套餐', '领导力发展评估套餐', '团队效能提升方案', '职业发展规划套餐']
  },
  {
    title: '热门产品套餐',
    icon: Star,
    items: ['组织文化诊断套餐', '人才甄选与发展套餐', '员工敬业度调研套餐', '管理者能力评估套餐']
  },
  {
    title: '最新问卷模板',
    icon: Document,
    items: ['职业倾向分析问卷', '领导力潜质评估', '团队协作能力测评', '岗位胜任力评估']
  }
]
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
