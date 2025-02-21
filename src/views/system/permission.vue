<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center">
        <el-input v-model="searchKeyword" placeholder="请输入" class="w-64 mr-4">
          <template #prefix>
            <el-icon class="text-gray-400">
              <Search />
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary" class="!rounded-button" @click="handleSearch">查询</el-button>
        <el-button class="ml-2 !rounded-button" @click="handleReset">重置</el-button>
      </div>
      <div>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleAdd">
          <el-icon class="mr-1"><Plus /></el-icon>新增
        </el-button>
        <el-button
          class="ml-2 !rounded-button whitespace-nowrap"
          :disabled="!selectedRows.length"
          @click="handleBatchDelete"
        >
          批量删除
        </el-button>
      </div>
    </div>

    <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" prop="id" width="80" />
      <el-table-column label="角色类型" prop="roleType.name" sortable width="120" />
      <el-table-column label="角色名称" prop="name" sortable width="120" />
      <el-table-column label="显示顺序" prop="sort" width="100" />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" class="whitespace-nowrap">
            {{ row.status ? '开启' : '关闭' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="creator" width="120" />
      <el-table-column label="创建时间" prop="create_time" sortable width="180">
        <template #header>
          <span>创建时间</span>
          <el-icon class="ml-1"><ArrowDown /></el-icon>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link class="!rounded-button whitespace-nowrap"> 编辑 </el-button>
          <el-button type="primary" link class="!rounded-button whitespace-nowrap">
            {{ row.status ? '关闭' : '开启' }}
          </el-button>
          <el-button type="primary" link class="!rounded-button whitespace-nowrap"> 数据权限 </el-button>
          <el-button type="primary" link class="!rounded-button whitespace-nowrap"> 分配用户 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex justify-between items-center mt-4">
      <span class="text-gray-500">共 {{ total }} 条</span>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 30, 40]"
        layout="prev, pager, next, jumper, sizes"
        class="text-center"
      />
    </div>

    <el-dialog
      v-model="roleDialogVisible"
      title="新增角色"
      width="520px"
      :close-on-click-modal="false"
      :show-close="true"
    >
      <div class="form-content">
        <el-form :model="form" label-width="80px">
          <el-form-item label="角色类型" required>
            <el-select v-model="form.type_id" class="w-full">
              <el-option v-for="type in roleTypeOptions" :key="type.value" :label="type.label" :value="type.value" />
            </el-select>
          </el-form-item>

          <el-form-item label="角色名称" required>
            <el-input v-model="form.name" placeholder="请输入" />
          </el-form-item>

          <el-form-item label="显示顺序" required>
            <el-input-number v-model="form.sort" :min="0" class="w-full" />
          </el-form-item>

          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio label="1">正常</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="管理员">
            <el-checkbox v-model="form.isAdmin">设为管理员</el-checkbox>
          </el-form-item>

          <el-form-item label="菜单权限">
            <el-tree
              ref="menuTree"
              class="mt-2 permission-tree"
              :data="menuData"
              show-checkbox
              node-key="id"
              :props="defaultProps"
              default-expand-all
            />
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="roleDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Search, Plus, ArrowDown } from '@element-plus/icons-vue'
import { getRoleList, deleteRoleType, getRoleTypeList } from '@/api/system/user'

const searchKeyword = ref('')
const selectedRows = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const tableData = ref<any[]>([])

const fetchRoleList = async (params = {}) => {
  const response = await getRoleList(params)
  tableData.value = response.data.list
  total.value = response.data.total
}

onMounted(() => {
  fetchRoleList()
  fetchRoleTypeList()
})

const handleSearch = () => {
  fetchRoleList({ name: searchKeyword.value })
}

const handleReset = () => {
  searchKeyword.value = ''
  fetchRoleList()
}

const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const handleAdd = () => {
  // 处理新增
  roleDialogVisible.value = true
}

const handleBatchDelete = async () => {
  if (selectedRows.value.length === 0) {
    return
  }

  const ids = selectedRows.value.map(row => row.id).join(',')
  try {
    await deleteRoleType({ id: ids })
    fetchRoleList() // 重新获取角色列表
  } catch (error) {
    console.error('批量删除失败', error)
  }
}

const roleDialogVisible = ref(false)

const form = ref({
  type_id: '',
  name: '',
  sort: 0,
  status: '1',
  isAdmin: false
})

const roleTypeOptions = ref<any[]>([])

const fetchRoleTypeList = async () => {
  const response = await getRoleTypeList()
  roleTypeOptions.value = response.data.map((item: any) => ({
    value: item.id,
    label: item.name
  }))
}

const menuData = [
  {
    id: 1,
    label: '客户管理',
    children: [
      {
        id: 2,
        label: '自助客户',
        children: [
          {
            id: 3,
            label: '新增'
          },
          {
            id: 4,
            label: '审批'
          },
          {
            id: 5,
            label: '编辑'
          },
          {
            id: 6,
            label: '添加订单'
          }
        ]
      },
      {
        id: 7,
        label: '潜在客户'
      }
    ]
  },
  {
    id: 8,
    label: '合同管理'
  },
  {
    id: 9,
    label: '产品管理'
  },
  {
    id: 10,
    label: '系统管理'
  }
]

const defaultProps = ref({
  children: 'children',
  label: 'label'
})

const handleSubmit = () => {
  roleDialogVisible.value = false
}
</script>

<style scoped>
.el-input :deep(.el-input__wrapper) {
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: none;
}

.el-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff;
}

.el-table :deep(.el-table__header) {
  background-color: #f5f7fa;
}

.el-pagination {
  justify-content: flex-end;
}
</style>
