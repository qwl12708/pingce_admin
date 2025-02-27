<template>
  <div class="main-content min-h-screen bg-white">
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6">
        <div class="flex justify-end items-center mb-6">
          <div class="space-x-2">
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleAdd">
              <el-icon class="mr-1"><Plus /></el-icon>新增
            </el-button>
            <el-button
              :disabled="!selectedItems.length"
              class="!rounded-button whitespace-nowrap"
              @click="handleBatchDelete"
            >
              <el-icon class="mr-1"><Delete /></el-icon>删除
            </el-button>
          </div>
        </div>

        <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="sort" label="排序" />
          <el-table-column prop="creator" label="创建人" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === '显示' ? 'success' : 'info'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column label="操作" fixed="right">
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
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { getSolutionList, deleteSolution } from '@/api/website/index'

const tableData = reactive([])

const selectedItems = ref([])

const handleSelectionChange = (val: any[]) => {
  selectedItems.value = val
}

const handleAdd = () => {
  router.push('/system/solution-add')
}

const handleEdit = (row: any) => {
  router.push(`/system/solution-add?id=${row.id}`)
}

const handleDelete = async (row: any) => {
  try {
    await deleteSolution({ ids: row.id.toString() })
    ElMessage.success('删除成功')
    fetchSolutionList()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

const handleBatchDelete = async () => {
  if (selectedItems.value.length === 0) {
    ElMessage.warning('请选择要删除的项目')
    return
  }
  const ids = selectedItems.value.map(item => item.id).join(',')
  try {
    await deleteSolution({ ids })
    ElMessage.success('批量删除成功')
    fetchSolutionList()
  } catch (error) {
    ElMessage.error('批量删除失败')
  }
}

const fetchSolutionList = async () => {
  try {
    const res = await getSolutionList()
    tableData.splice(0, tableData.length, ...res.data)
  } catch (error) {
    ElMessage.error('获取解决方案列表失败')
  }
}

onMounted(() => {
  fetchSolutionList()
})
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
