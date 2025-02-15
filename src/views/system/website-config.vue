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

    <!-- banner配置 -->
    <div v-if="currentTab === 'banner'">
      <!-- 功能按钮区 -->
      <div class="flex justify-between items-center py-4">
        <div class="text-lg font-medium">{{ currentTabLabel }}</div>
        <div class="flex gap-2">
          <el-button type="primary" class="!rounded-button" @click="handleAdd">
            <el-icon class="mr-1"><Plus /></el-icon>新增
          </el-button>
          <el-button class="!rounded-button" @click="handleDelete" :disabled="!selectedRows.length">
            <el-icon class="mr-1"><Delete /></el-icon>删除
          </el-button>
        </div>
      </div>

      <!-- 表格区域 -->
      <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="缩略图" width="100">
          <template #default="scope">
            <el-image :src="scope.row.image" class="w-16 h-16 object-cover" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="180" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="creator" label="创建人" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '显示' ? 'success' : 'info'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="scope">
            <el-button link type="primary" @click="handleDetail(scope.row)">详情</el-button>
            <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button link type="danger" @click="handleRowDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-between items-center py-4">
        <div class="text-gray-500">共 {{ total }} 条</div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="total"
          layout="sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 动态组件显示 -->
    <component :is="currentComponent" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import Home from './components/Home.vue'
import Solution from './components/Solution.vue'
import Evaluation from './components/Evaluation.vue'
import Channel from './components/Channel.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import router from '@/router'

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
const currentTabLabel = ref('banner图')
const selectedRows = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(999)

const tableData = ref([
  {
    image: 'https://ai-public.mastergo.com/ai/img_res/fe7ec6348c3e43a617d72aa412f42780.jpg',
    type: '图文详情',
    sort: 1,
    creator: 'admin',
    status: '显示',
    createTime: '2024-05-25 09:09:12'
  },
  {
    image: 'https://ai-public.mastergo.com/ai/img_res/51c8c30604fce28177ac7b1d69abe6a6.jpg',
    type: '源转链接',
    sort: 2,
    creator: 'admin',
    status: '隐藏',
    createTime: '2024-05-25 09:09:12'
  },
  {
    image: 'https://ai-public.mastergo.com/ai/img_res/7df1b98648778b3d06697dc85640bedc.jpg',
    type: '源转模块',
    sort: 3,
    creator: 'admin',
    status: '隐藏',
    createTime: '2024-05-25 09:09:12'
  }
])

const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const handleAdd = () => {
  console.log('Add new item')
  router.push('/system/banner-add')
}

const handleDelete = () => {
  console.log('Delete selected items', selectedRows.value)
}

const handleDetail = (row: any) => {
  console.log('View detail', row)
}

const handleEdit = (row: any) => {
  console.log('Edit item', row)
  router.push(`/system/banner-add?id=${row.id}`)
}

const handleRowDelete = (row: any) => {
  console.log('Delete single item', row)
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
}

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
