<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 顶部导航标签 -->
    <div class="flex items-center border-b border-gray-200">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="px-4 py-3 cursor-pointer whitespace-nowrap"
        :class="{ 'text-blue-500 border-b-2 border-blue-500': currentTab === tab.key }"
        @click="handleTabChange(tab.key)"
      >
        {{ tab.label }}
      </div>
    </div>

    <!-- 动态组件显示 -->
    <component :is="currentComponent" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import Home from './components/Home.vue'
import Banner from './components/Banner.vue'
import Solution from './components/Solution.vue'
import Evaluation from './components/Evaluation.vue'
import Channel from './components/Channel.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'

const tabs = [
  { key: 'banner', label: 'banner图' },
  { key: 'home', label: '首页' },
  { key: 'solution', label: '解决方案' },
  { key: 'evaluation', label: '公益测评' },
  { key: 'channel', label: '渠道合作' },
  { key: 'about', label: '了解科懿' },
  { key: 'contact', label: '联系我们' }
]
const currentComponent = computed(() => {
  switch (currentTab.value) {
    case 'home':
      return Home
    case 'banner':
      return Banner
    case 'solution':
      return Solution
    case 'evaluation':
      return Evaluation
    case 'channel':
      return Channel
    case 'about':
      return About
    case 'contact':
      return Contact
    default:
      return ''
  }
})
const currentTab = ref('banner')

const handleTabChange = (tab: string) => {
  currentTab.value = tab
}
</script>

<style scoped>
.el-table {
  --el-table-border-color: #f0f0f0;
  --el-table-header-bg-color: #fafafa;
}

.el-pagination {
  --el-pagination-button-bg-color: transparent;
}
</style>
