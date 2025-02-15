<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 搜索区域 -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div class="flex items-center space-x-6">
        <div class="flex items-center">
          <div style="width: 120px" class="text-gray-600 mr-2">部门名称</div>
          <el-input v-model="searchKeyword" placeholder="请输入" class="w-64 text-sm" />
        </div>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
        <el-button class="!rounded-button whitespace-nowrap" @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 flex justify-between items-center border-b border-gray-100">
        <h2 class="text-lg font-medium">部门列表</h2>
        <div class="space-x-2">
          <el-button @click="onAdd" type="primary" class="!rounded-button whitespace-nowrap">
            <el-icon class="mr-1"><Plus /></el-icon>新增
          </el-button>
        </div>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        @selection-change="handleSelectionChange"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="部门名称" min-width="200" />
        <el-table-column prop="sort" label="排序" width="120" />
        <el-table-column prop="creator" label="创建人" width="120" />
        <el-table-column prop="manager" label="部门负责人" width="120" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <template v-if="row.children">
              <el-button type="primary" link class="!rounded-button whitespace-nowrap" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button type="danger" link class="!rounded-button whitespace-nowrap" @click="handleDelete(row)">
                删除
              </el-button>
            </template>
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

      <el-dialog
        v-model="dialogVisible"
        title="新增/编辑部门"
        width="500px"
        :close-on-click-modal="false"
        :show-close="true"
        class="rounded-lg"
      >
        <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" class="mt-4">
          <el-form-item label="部门名称" prop="username">
            <el-input v-model="form.username" placeholder="请输入" class="w-full !rounded-button" />
          </el-form-item>

          <el-form-item label="所在上级部门" prop="department">
            <el-select v-model="form.department" placeholder="可选择" class="w-full !rounded-button">
              <el-option label="技术部" value="tech" />
              <el-option label="市场部" value="market" />
              <el-option label="运营部" value="operation" />
            </el-select>
          </el-form-item>

          <el-form-item label="排序" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入" class="w-full !rounded-button" />
          </el-form-item>

          <el-form-item label="部门负责人" prop="role">
            <el-select v-model="form.role" placeholder="请选择" class="w-full !rounded-button">
              <el-option label="老板" value="admin" />
              <el-option label="普通用户" value="user" />
              <el-option label="访客" value="guest" />
            </el-select>
          </el-form-item>
        </el-form>

        <template #footer>
          <div class="flex justify-end gap-4">
            <el-button @click="handleCancel" class="!rounded-button whitespace-nowrap">取消</el-button>
            <el-button type="primary" @click="handleSubmit" class="!rounded-button whitespace-nowrap">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(999)
const selectedRows = ref<any[]>([])

const tableData = ref([
  {
    id: 1,
    name: '研发中心',
    sort: 999,
    creator: 'admin',
    manager: 'admin',
    createTime: '2024-04-12 13:00',
    updateTime: '2024-04-12 13:00',
    children: [
      {
        id: 2,
        name: '前端开发部',
        sort: 999,
        creator: 'admin',
        manager: 'admin',
        createTime: '2024-04-12 13:00',
        updateTime: '2024-04-12 13:00'
      },
      {
        id: 3,
        name: '后端开发部',
        sort: 999,
        creator: 'admin',
        manager: 'admin',
        createTime: '2024-04-12 13:00',
        updateTime: '2024-04-12 13:00'
      }
    ]
  },
  {
    id: 4,
    name: '产品设计中心',
    sort: 999,
    creator: 'admin',
    manager: 'admin',
    createTime: '2024-04-12 13:00',
    updateTime: '2024-04-12 13:00',
    children: [
      {
        id: 5,
        name: 'UI设计部',
        sort: 999,
        creator: 'admin',
        manager: 'admin',
        createTime: '2024-04-12 13:00',
        updateTime: '2024-04-12 13:00'
      }
    ]
  }
])

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  phone: '',
  role: '',
  department: '',
  businessInfo: ''
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  role: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
  department: [{ required: true, message: '请选择所在部门', trigger: 'change' }]
})

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(valid => {
    if (valid) {
      console.log('表单提交', form)
      dialogVisible.value = false
    }
  })
}

const handleCancel = () => {
  dialogVisible.value = false
}

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
  dialogVisible.value = true
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
  dialogVisible.value = true
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
