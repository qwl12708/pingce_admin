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
        <el-table-column prop="name" label="部门名称" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="creater" label="创建人" />
        <el-table-column prop="director_username" label="部门负责人">
          <template #default="{ row }">
            {{ row.director_username || row.directorInfo?.name }}
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template #default="{ row }">
            {{ formatTime(row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间">
          <template #default="{ row }">
            {{ formatTime(row.update_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
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
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入" class="w-full !rounded-button" />
          </el-form-item>

          <el-form-item label="所在上级部门" prop="pid">
            <el-select v-model="form.pid" placeholder="可选择" class="w-full !rounded-button">
              <el-option
                v-for="option in departmentOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="排序" prop="sort">
            <el-input v-model="form.sort" placeholder="请输入" class="w-full !rounded-button" />
          </el-form-item>

          <el-form-item label="部门负责人" prop="director_id">
            <el-select v-model="form.director_id" placeholder="请选择" class="w-full !rounded-button">
              <el-option
                v-for="option in directorOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
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
import { onMounted, reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { getDepartmentList, createDepartment, editDepartment, getUserList, deleteDepartment } from '@/api/system/user'
import { formatTime } from '@/utils/formatTime'

interface directorOptions {
  value: number
  label: string
}
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedRows = ref<any[]>([])
const directorOptions = ref<directorOptions[]>([])

const tableData = ref<any[]>([])
const departmentOptions = ref<any[]>([])
const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({
  id: null,
  name: '',
  pid: null,
  sort: '',
  director_id: ''
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
  director_id: [{ required: true, message: '请选择部门负责人', trigger: 'change' }]
})

onMounted(() => {
  fetchDepartmentList()
  fetchUserList()
})

const fetchDepartmentList = async (params = {}) => {
  const response = await getDepartmentList({ ...params })
  departmentOptions.value = response.data
    .map((item: any) => ({
      value: item.id,
      label: item.name
    }))
    .concat({ label: '暂无', value: 0 })
  tableData.value = convertToTree(response.data)
  total.value = response.data.length
}

const convertToTree = (data: any[]) => {
  const map = new Map()
  const roots: any[] = []

  data.forEach(item => {
    if (item.id === item.pid) {
      item.pid = null
    }
    map.set(item.id, { ...item, children: [] })
  })

  data.forEach(item => {
    const parent = map.get(item.pid)
    if (parent) {
      parent.children.push(map.get(item.id))
    } else {
      roots.push(map.get(item.id))
    }
  })

  return roots
}

const fetchUserList = async () => {
  const response = await getUserList()
  directorOptions.value = response.data.list.map((item: any) => ({
    value: item.id,
    label: item.name
  }))
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (valid) {
      try {
        if (form.id) {
          await editDepartment({
            id: form.id,
            name: form.name,
            pid: form.pid,
            sort: form.sort,
            director_id: form.director_id
          })
        } else {
          await createDepartment({
            name: form.name,
            pid: form.pid || 0,
            sort: form.sort,
            director_id: form.director_id
          })
        }
        console.log('表单提交', form)
        dialogVisible.value = false
        fetchDepartmentList() // 重新获取部门列表
      } catch (error) {
        console.error('操作失败', error)
      }
    }
  })
}

const handleCancel = () => {
  dialogVisible.value = false
}

const handleSearch = () => {
  // 实现搜索逻辑
  fetchDepartmentList({ name: searchKeyword.value })
}

const handleReset = () => {
  searchKeyword.value = ''
}

const handleAdd = () => {
  // 实现新增逻辑
}

const handleEdit = (row: any) => {
  form.id = row.id
  form.name = row.name
  form.pid = row.pid
  form.sort = row.sort
  form.director_id = row.directorInfo.id
  dialogVisible.value = true
}

const handleDelete = async (row: any) => {
  // 实现删除逻辑
  const res = await deleteDepartment({ id: row.id })
  if (!res) return
  if (res.code === 200) {
    ElMessage.success('删除成功')
    fetchDepartmentList()
    return
  }
  ElMessage.error('删除失败')
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
  formRef.value?.resetFields()
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
