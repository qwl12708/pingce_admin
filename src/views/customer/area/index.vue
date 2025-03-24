<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 头部筛选区域 -->
    <div class="bg-white p-4 rounded-lg mb-4 flex items-center justify-between">
      <div class="flex gap-4">
        <el-tree-select
          v-model="regions"
          :data="regionData"
          show-checkbox
          multiple
          node-key="id"
          placeholder="请选择所属区域"
          class="w-full"
        />

        <el-select v-model="customer" placeholder="客户" class="w-48">
          <el-option v-for="item in consultantOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="bg-white p-4 rounded-lg">
      <div class="text-xl font-medium mb-4">测评顾问区域管理</div>
      <el-table :data="tableData" style="width: 100%" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" fixed="left" />
        <el-table-column label="序号" type="index" fixed="left" />
        <el-table-column prop="name" label="测评顾问名称" fixed="left" />
        <el-table-column prop="phone" label="手机号码" sortable />
        <el-table-column prop="dept_name" label="部门" sortable />
        <el-table-column prop="undertakeArea" label="负责区域" sortable>
          <template #default="{ row }">
            <span>{{
              row.undertakeArea
                .map(({ province_name, city_name, area_name }) => province_name + city_name + area_name)
                .join('、')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="counsellor_phone" label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="onUpdate(row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-between items-center mt-4">
        <span class="text-gray-500">共 {{ total }} 条</span>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="total"
          layout="sizes, prev, pager, next"
        />
      </div>
    </div>

    <!-- 弹窗 -->
    <el-dialog title="分配/变更测评顾问" v-model.value:visible="showDialog">
      <el-form :model="dialogForm" label-width="120px">
        <el-form-item label="分配测评顾问">
          <el-select v-model="dialogForm.consultant" placeholder="请选择">
            <el-option v-for="item in consultantOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="flex justify-end pt-4">
        <el-button class="ml-4" @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import router from '@/router'
import { getAreas, getConsultantList, bindConsultant, getSegmenteList } from '@/api/customer'
import { ElMessage, ElTreeSelect } from 'element-plus'

const showDialog = ref(false)
const dialogForm = ref({
  consultant: ''
})
const consultantOptions = ref([])
const regionData = ref([])
const regions = ref([])

const customer = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const tableData = ref([])
const selectedIds = ref<string[]>([])

const fetchAreas = async () => {
  try {
    const { data } = await getAreas()
    regionData.value = transformToTree(data)
  } catch (error) {
    console.error('获取区域失败', error)
  }
}
const transformToTree = data => {
  const tree = []
  const map = {}

  data.forEach(item => {
    map[item.id] = { ...item, label: item.name, children: [] }
  })

  data.forEach(item => {
    if (item.pid === 0) {
      tree.push(map[item.id])
    } else {
      if (map[item.pid]) {
        map[item.pid].children.push(map[item.id])
      }
    }
  })

  return tree
}

const fetchTableData = async () => {
  fetchConsultantList()
}

const fetchConsultantList = async () => {
  try {
    const { data } = await getConsultantList()
    consultantOptions.value = data.map(item => ({ value: item.id, label: item.name }))
    tableData.value = data
    total.value = data.length
  } catch (error) {
    console.error('获取测评顾问列表失败', error)
  }
}

onMounted(() => {
  fetchTableData()
  fetchAreas()
})

const handleSelectionChange = selection => {
  selectedIds.value = selection.map(item => item.id)
}

const handleSearch = () => {
  fetchTableData()
}

const onUpdate = id => {
  router.push(`/customer/admin-area-update?id=${id}`)
}

const handleDialogSubmit = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请先勾选客户')
    return
  }
  try {
    await bindConsultant({ id: selectedIds.value.join(','), consultant_id: dialogForm.value.consultant })
    ElMessage.success('分配成功')
    showDialog.value = false
    fetchTableData()
  } catch (error) {
    ElMessage.error('分配失败')
  }
}
</script>

<style scoped>
.el-table {
  --el-table-header-bg-color: #f5f7fa;
}

.el-table th {
  font-weight: 500;
  color: #606266;
}

.el-pagination {
  justify-content: flex-end;
}
</style>
