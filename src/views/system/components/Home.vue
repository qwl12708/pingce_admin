<template>
  <div class="main-content min-h-screen bg-white">
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-medium">为什么选择科验配置</h2>
          <div class="space-x-2">
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleAdd">
              <el-icon class="mr-1"><Plus /></el-icon>新增
            </el-button>
            <el-button class="!rounded-button whitespace-nowrap" @click="handleBatchDelete">
              <el-icon class="mr-1"><Delete /></el-icon>删除
            </el-button>
          </div>
        </div>

        <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
          <el-table-column type="selection" width="55" />
          <el-table-column label="图标" width="80">
            <template #default="scope">
              <div class="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                <img :src="scope.row.icon" class="w-full h-full object-cover" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="content" label="内容" show-overflow-tooltip />
          <el-table-column prop="sort" label="排序" width="80" />
          <el-table-column prop="creator" label="创建人" width="100" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === '显示' ? 'success' : 'info'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" />
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="scope">
              <el-button type="primary" link class="!rounded-button whitespace-nowrap" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button type="danger" link class="!rounded-button whitespace-nowrap" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm mt-6">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-medium">合作客户配置</h2>
          <div class="space-x-2">
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleAddClient">
              <el-icon class="mr-1"><Plus /></el-icon>新增
            </el-button>
            <el-button class="!rounded-button whitespace-nowrap" @click="handleBatchDeleteClient">
              <el-icon class="mr-1"><Delete /></el-icon>删除
            </el-button>
          </div>
        </div>

        <el-table :data="clientData" @selection-change="handleClientSelectionChange" class="w-full">
          <el-table-column type="selection" width="55" />
          <el-table-column label="图标" width="80">
            <template #default="scope">
              <div class="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                <img :src="scope.row.icon" class="w-full h-full object-cover" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="客户名称" />
          <el-table-column prop="sort" label="排序" width="80" />
          <el-table-column prop="creator" label="创建人" width="100" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === '显示' ? 'success' : 'info'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" />
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="scope">
              <el-button
                type="primary"
                link
                class="!rounded-button whitespace-nowrap"
                @click="handleEditClient(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                link
                class="!rounded-button whitespace-nowrap"
                @click="handleDeleteClient(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '@/router'

const tableData = ref([
  {
    icon: 'https://ai-public.mastergo.com/ai/img_res/c7fe00e9801f961e1d625fc00f964eff.jpg',
    title: '科验人才评测系统',
    content: '专业的人才测评解决方案，助力企业精准选才',
    sort: 1,
    creator: '张经理',
    status: '显示',
    createTime: '2024-04-12 13:00'
  },
  {
    icon: 'https://ai-public.mastergo.com/ai/img_res/f46b32617d1202d9e5755bd5424a2810.jpg',
    title: '智能招聘系统',
    content: '智能化的招聘流程管理，提升招聘效率',
    sort: 2,
    creator: '李总监',
    status: '隐藏',
    createTime: '2024-04-12 13:00'
  },
  {
    icon: 'https://ai-public.mastergo.com/ai/img_res/c42e1e91f69e8eb9411a73f3e92115f4.jpg',
    title: '企业管理系统',
    content: '全方位的企业管理解决方案',
    sort: 3,
    creator: '王主管',
    status: '隐藏',
    createTime: '2024-04-12 13:00'
  }
])

const clientData = ref([
  {
    icon: 'https://ai-public.mastergo.com/ai/img_res/44c9a3b1ad34eba34d43fb21b3f10fc6.jpg',
    name: '未来科技有限公司',
    sort: 1,
    creator: '陈经理',
    status: '显示',
    createTime: '2024-04-12 13:00'
  },
  {
    icon: 'https://ai-public.mastergo.com/ai/img_res/90b4a7435fddc553f5410ca822e487c3.jpg',
    name: '智慧网络科技公司',
    sort: 2,
    creator: '赵总监',
    status: '隐藏',
    createTime: '2024-04-12 13:00'
  },
  {
    icon: 'https://ai-public.mastergo.com/ai/img_res/6ef0fdce033ec43d5ad2b218a3a4238f.jpg',
    name: '创新软件科技公司',
    sort: 3,
    creator: '刘主管',
    status: '隐藏',
    createTime: '2024-04-12 13:00'
  }
])

const selectedItems = ref([])
const selectedClients = ref([])

const handleSelectionChange = (val: any[]) => {
  selectedItems.value = val
}

const handleClientSelectionChange = (val: any[]) => {
  selectedClients.value = val
}

const handleAdd = () => {
  ElMessage.success('触发新增操作')
  router.push('/system/whychoose-update')
}

const handleEdit = (row: any) => {
  ElMessage.success('触发编辑操作')
  router.push(`/system/whychoose-update?id=${row.id}`)
}

const handleDelete = (row: any) => {
  ElMessage.success('触发删除操作')
}

const handleBatchDelete = () => {
  if (selectedItems.value.length === 0) {
    ElMessage.warning('请选择要删除的项目')
    return
  }
  ElMessage.success('触发批量删除操作')
}

const handleAddClient = () => {
  ElMessage.success('触发新增客户操作')
  router.push('/system/logo-add')
}

const handleEditClient = (row: any) => {
  ElMessage.success('触发编辑客户操作')
  router.push(`/system/logo-add?id=${row.id}`)
}

const handleDeleteClient = (row: any) => {
  ElMessage.success('触发删除客户操作')
}

const handleBatchDeleteClient = () => {
  if (selectedClients.value.length === 0) {
    ElMessage.warning('请选择要删除的客户')
    return
  }
  ElMessage.success('触发批量删除客户操作')
}
</script>

<style scoped>
.el-table {
  --el-table-header-bg-color: #f5f7fa;
}

.el-table th {
  font-weight: 500;
}

/* 移除number类型input的上下箭头 */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
