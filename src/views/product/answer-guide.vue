<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 搜索区域 -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div class="flex items-center space-x-6">
        <div class="flex items-center">
          <div style="width: 120px" class="text-gray-600 mr-2">模板名称</div>
          <el-input v-model="searchKeyword" placeholder="请输入" class="w-64 text-sm" />
        </div>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
        <el-button class="!rounded-button whitespace-nowrap" @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 flex justify-between items-center border-b border-gray-100">
        <h2 class="text-lg font-medium">作答指引模版</h2>
        <div class="space-x-2">
          <el-button @click="onAdd" type="primary" class="!rounded-button whitespace-nowrap">
            <el-icon class="mr-1"><Plus /></el-icon>新增模版
          </el-button>
          <el-button class="!rounded-button whitespace-nowrap" @click="handleBatchDelete">
            <el-icon class="mr-1"><Delete /></el-icon>删除模版
          </el-button>
        </div>
      </div>

      <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="模板编号" prop="id" width="100" />
        <el-table-column label="模板名称" prop="name">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">{{ row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑模版</el-button>
            <el-button type="primary" link @click="handleDelete(row)">删除模版</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-between items-center p-4">
        <div class="text-gray-500">共 {{ total }} 条</div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import router from '@/router'

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(999)
const selectedRows = ref<any[]>([])

const tableData = ref([
  {
    id: 1,
    name: '模版名称示例',
    remark: '模版内容示例模版内容示例模版内容示例模版内容示例模版内容示例'
  },
  {
    id: 2,
    name: '入职评估模版',
    remark: '用于新员工入职评估的标准模版'
  },
  {
    id: 3,
    name: '技能测评模版',
    remark: '针对不同岗位的专业技能评估模版'
  },
  {
    id: 4,
    name: '绩效考核模版',
    remark: '季度绩效考核标准评估模版'
  },
  {
    id: 5,
    name: '晋升评估模版',
    remark: '员工晋升评估专用模版'
  }
])

const handleSearch = () => {
  // 实现搜索逻辑
}

const handleReset = () => {
  searchKeyword.value = ''
}

const handleAdd = () => {
  // 实现新增逻辑
}

const handleEdit = (row: any) => {
  // 实现编辑逻辑
}

const handleDelete = (row: any) => {
  // 实现删除逻辑
}

const handleBatchDelete = () => {
  // 实现批量删除逻辑
}

const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

const onAdd = () => {
  // 跳转到新增页面
  router.push('/product/answer-guide-add')
}
</script>

<style scoped>
.el-input :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

.el-input :deep(.el-input__wrapper):hover {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

.el-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff inset;
}

.el-table :deep(th.el-table__cell) {
  background-color: #f5f7fa;
}
</style>
