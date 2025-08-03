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
      <el-table-column label="角色类型" prop="role_type" sortable>
        <template #default="{ row }">
          <el-tag :type="row.role_type === 1 ? 'success' : 'info'">
            {{ row.role_type }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="name" sortable />
      <el-table-column label="显示顺序" prop="sort" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" class="whitespace-nowrap">
            {{ row.status === 1 ? '开启' : '关闭' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="creator" />
      <el-table-column label="创建时间" prop="create_time" sortable width="180">
        <template #default="{ row }">
          {{ formatTime(row.create_time) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link class="!rounded-button whitespace-nowrap" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button type="danger" link class="!rounded-button whitespace-nowrap" @click="handleToggleStatus(row)">
            {{ row.status === 1 ? '关闭' : '开启' }}
          </el-button>
          <el-button type="primary" link class="!rounded-button whitespace-nowrap" @click="handleBoundUsers(row)">
            已绑定用户
          </el-button>
          <el-button type="primary" link class="!rounded-button whitespace-nowrap" @click="handleAssignUsers(row)">
            分配用户
          </el-button>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
      v-model="roleDialogVisible"
      :title="form.id ? '编辑角色' : '新增角色'"
      width="520px"
      :close-on-click-modal="false"
      :show-close="true"
    >
      <div class="form-content">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
          <el-form-item label="角色类型" required>
            <el-select v-model="form.role_type" class="w-full">
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
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- <el-form-item label="管理员">
            <el-checkbox v-model="form.isAdmin">设为管理员</el-checkbox>
          </el-form-item> -->

          <el-form-item label="菜单权限">
            <el-tree
              :ref="menuTree"
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

    <el-dialog
      v-model="boundUsersDialogVisible"
      title="已绑定用户"
      width="800px"
      :close-on-click-modal="false"
      :show-close="true"
    >
      <el-table :data="boundUsersList" class="w-full">
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="用户名" prop="nickname" />
        <el-table-column label="姓名" prop="name" />
        <!-- <el-table-column label="手机号" prop="phone" /> -->
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="danger" link @click="handleUnbind(row)"> 解绑 </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-between items-center mt-4">
        <span class="text-gray-500">共 {{ boundUsersTotal }} 条</span>
        <el-pagination
          v-model:current-page="boundUsersPage"
          v-model:page-size="boundUsersPageSize"
          :total="boundUsersTotal"
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next, jumper, sizes"
        />
      </div>
    </el-dialog>

    <!-- 分配用户弹窗 -->
    <el-dialog
      v-model="assignUsersDialogVisible"
      title="分配用户"
      width="800px"
      :close-on-click-modal="false"
      :show-close="true"
    >
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <el-input v-model="assignUserSearchKeyword" placeholder="请输入用户名或姓名" class="w-64 mr-4">
            <template #prefix>
              <el-icon class="text-gray-400">
                <Search />
              </el-icon>
            </template>
          </el-input>
          <el-button type="primary" @click="handleAssignUserSearch">查询</el-button>
          <el-button @click="handleAssignUserReset">重置</el-button>
        </div>
      </div>

      <el-table :data="assignUsersList" @selection-change="handleAssignUserSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="用户名" prop="nickname" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="手机号" prop="phone" />
        <el-table-column label="状态" prop="status">
          <template #default="{ row }">
            <el-tag :type="row.status ? 'success' : 'danger'">
              {{ row.status === 1 ? '开启' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-between items-center mt-4">
        <span class="text-gray-500">共 {{ assignUsersTotal }} 条</span>
        <el-pagination
          v-model:current-page="assignUsersPage"
          v-model:page-size="assignUsersPageSize"
          :total="assignUsersTotal"
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next, jumper, sizes"
        />
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="assignUsersDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmAssign" :disabled="!selectedAssignUsers.length">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import {
  getRoleList,
  deleteRole,
  createRole,
  editRole,
  getRoleInfo,
  toggleRoleStatus,
  getBoundUserList,
  unbindUserRole,
  getUserList,
  bindUserRole
} from '@/api/system/user'

import { formatTime } from '@/utils/formatTime'
import { asyncRoutes } from '@/router/modules/asyncRouter'

// 将路由转换为树形结构
const convertRoutesToMenuTree = (routes: MenuType.MenuOptions[]): any[] => {
  return routes.map(route => {
    const node: any = {
      id: route.meta?.id,
      label: route.meta?.title
    }

    // 只有当子路由存在且不为空时才处理子路由
    if (route.children && route.children.length > 0) {
      const children = convertRoutesToMenuTree(route.children)
      if (children.length > 0) {
        node.children = children
      }
    }

    return node
  })
}

// 替换原有的menuData静态数据
const menuData = ref(convertRoutesToMenuTree(asyncRoutes))
console.log('%c [ menuData ]-266', 'font-size:13px; background:pink; color:#bf2c9f;', menuData)

const searchKeyword = ref('')
const selectedRows = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const tableData = ref<any[]>([])
const roleTypeOptions = ref<any[]>([
  { value: 'admin', label: '管理员' },
  { value: 'consultant', label: '客服顾问' },
  { value: 'user', label: '普通角色' }
])

const fetchRoleList = async (params = {}) => {
  const response = await getRoleList(params)
  tableData.value = response.data.list
  total.value = response.data.total
}

onMounted(() => {
  fetchRoleList()
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
  if (selectedRows.value.length === 0) return

  try {
    await ElMessageBox.confirm('确认要删除选中的角色吗？', '提示', {
      type: 'warning'
    })
    const ids = selectedRows.value.map(row => row.id).join(',')
    await deleteRole({ ids })
    ElMessage.success('删除成功')
    fetchRoleList()
  } catch (error) {
    console.error('删除失败', error)
  }
}

const roleDialogVisible = ref(false)

const formRef = ref<FormInstance>()
const rules = {
  role_type: [{ required: true, message: '请选择角色类型', trigger: 'change' }],
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入显示顺序', trigger: 'blur' }]
}

const form = ref({
  id: undefined,
  role_type: '',
  name: '',
  sort: 0,
  status: 1
  // isAdmin: false
})

const menuTree = ref(null)

const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1
  fetchRoleList({ page: currentPage.value, pageSize: pageSize.value, name: searchKeyword.value })
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchRoleList({ page: currentPage.value, pageSize: pageSize.value, name: searchKeyword.value })
}

const resetForm = () => {
  form.value = {
    id: undefined,
    role_type: '',
    name: '',
    sort: 0,
    status: 1
    // isAdmin: false
  }
  menuTree.value?.setCheckedKeys([])
}

const handleEdit = async (row: any) => {
  const res = await getRoleInfo({ id: row.id })
  form.value = {
    id: row.id,
    role_type: res.data.role_type,
    name: res.data.name,
    sort: res.data.sort,
    status: res.data.status
    // isAdmin: res.data.isAdmin
  }

  // 处理菜单权限回显
  if (res.data.rules) {
    const menuIds = res.data.rules
      .split(',')
      .map(Number)
      .filter(id => id)
    console.log('menuIds', menuIds)
    // 设置选中的节点
    menuTree.value?.setCheckedKeys(menuIds)
    // 设置新的选中状态 menuTree.value?.setCheckedKeys([])
    if (menuIds.length > 0) {
      nextTick(() => {
        menuTree.value?.setCheckedKeys(menuIds)
        roleDialogVisible.value = true
      })
    }

    // 展开所有节点以便查看
    menuTree.value?.expandAll()
  } else {
    menuTree.value?.setCheckedKeys([])
  }

  roleDialogVisible.value = true
}

const handleToggleStatus = async (row: any) => {
  try {
    await toggleRoleStatus({ id: row.id })
    ElMessage.success('状态修改成功')
    fetchRoleList()
  } catch (error) {
    console.error('状态修改失败', error)
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (valid) {
      const checkedKeys = menuTree.value.getCheckedKeys()
      const halfCheckedKeys = menuTree.value.getHalfCheckedKeys()
      // 合并完全选中和半选中的节点
      const allSelectedKeys = [...new Set([...checkedKeys, ...halfCheckedKeys])]

      const { status, name, sort, role_type } = form.value
      const data = {
        status,
        name,
        role_type,
        sort,
        rules: allSelectedKeys.join(',')
      }

      try {
        if (form.value.id) {
          await editRole({
            id: form.value.id,
            ...data
          })
          ElMessage.success('编辑成功')
        } else {
          await createRole(data)
          ElMessage.success('创建成功')
        }
        roleDialogVisible.value = false
        resetForm()
        fetchRoleList()
      } catch (error) {
        console.error('保存失败', error)
      }
    }
  })
}

const defaultProps = ref({
  children: 'children',
  label: 'label'
})

// 已绑定用户相关
const boundUsersDialogVisible = ref(false)
const boundUsersList = ref<any[]>([])
const boundUsersTotal = ref(0)
const boundUsersPage = ref(1)
const boundUsersPageSize = ref(10)
const currentRoleId = ref<number>()

const fetchBoundUsers = async () => {
  const res = await getBoundUserList({
    id: currentRoleId.value,
    page: boundUsersPage.value,
    pageSize: boundUsersPageSize.value
  })
  boundUsersList.value = res.data.list
  boundUsersTotal.value = res.data.total
}

const handleBoundUsers = async (row: any) => {
  currentRoleId.value = row.id
  boundUsersPage.value = 1
  boundUsersDialogVisible.value = true
  await fetchBoundUsers()
}

const handleUnbind = async (row: any) => {
  try {
    await ElMessageBox.confirm('确认要解绑该用户吗？', '提示', {
      type: 'warning'
    })
    await unbindUserRole({
      role_id: currentRoleId.value,
      user_id: row.id
    })
    ElMessage.success('解绑成功')
    await fetchBoundUsers()
  } catch (error) {
    console.error('解绑失败', error)
  }
}

// 监听分页变化
watch([boundUsersPage, boundUsersPageSize], () => {
  if (boundUsersDialogVisible.value) {
    fetchBoundUsers()
  }
})

// 分配用户相关
const assignUsersDialogVisible = ref(false)
const assignUsersList = ref<any[]>([])
const assignUsersTotal = ref(0)
const assignUsersPage = ref(1)
const assignUsersPageSize = ref(10)
const assignUserSearchKeyword = ref('')
const selectedAssignUsers = ref<any[]>([])

const fetchAssignUsersList = async () => {
  const res = await getUserList({
    name: assignUserSearchKeyword.value,
    page: assignUsersPage.value,
    pageSize: assignUsersPageSize.value
  })
  assignUsersList.value = res.data.list
  assignUsersTotal.value = res.data.total
}

const handleAssignUsers = (row: any) => {
  currentRoleId.value = row.id
  assignUsersPage.value = 1
  assignUserSearchKeyword.value = ''
  assignUsersDialogVisible.value = true
  fetchAssignUsersList()
}

const handleAssignUserSearch = () => {
  assignUsersPage.value = 1
  fetchAssignUsersList()
}

const handleAssignUserReset = () => {
  assignUserSearchKeyword.value = ''
  assignUsersPage.value = 1
  fetchAssignUsersList()
}

const handleAssignUserSelectionChange = (rows: any[]) => {
  selectedAssignUsers.value = rows
}

const handleConfirmAssign = async () => {
  try {
    await bindUserRole({
      role_id: currentRoleId.value,
      user_ids: selectedAssignUsers.value.map(user => user.id).join(',')
    })
    ElMessage.success('分配用户成功')
    assignUsersDialogVisible.value = false
    fetchBoundUsers()
  } catch (error) {
    console.error('分配用户失败', error)
  }
}

// 监听分页变化
watch([assignUsersPage, assignUsersPageSize], () => {
  if (assignUsersDialogVisible.value) {
    fetchAssignUsersList()
  }
})
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
