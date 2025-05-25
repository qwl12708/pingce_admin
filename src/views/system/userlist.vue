<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 搜索区域 -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div class="flex items-center space-x-6">
        <div class="flex items-center">
          <div style="width: 120px" class="text-gray-600 mr-2">用户名称</div>
          <el-input v-model="searchKeyword" placeholder="请输入" class="w-64 text-sm" />
        </div>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
        <el-button class="!rounded-button whitespace-nowrap" @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 flex justify-between items-center border-b border-gray-100">
        <h2 class="text-lg font-medium">用户列表</h2>
        <div class="space-x-2">
          <el-button @click="onAdd" type="primary" class="!rounded-button whitespace-nowrap">
            <el-icon class="mr-1"><Plus /></el-icon>新增
          </el-button>
          <el-button
            :disabled="!selectedRows.length"
            class="!rounded-button whitespace-nowrap"
            @click="handleBatchDelete"
          >
            <el-icon class="mr-1"><Delete /></el-icon>批量删除
          </el-button>
        </div>
      </div>

      <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" prop="id" width="100" />
        <el-table-column label="用户名称" prop="name" />
        <el-table-column label="花名" prop="nickname" />
        <el-table-column label="手机号码" prop="phone" sortable />
        <el-table-column label="用户角色" prop="role_name" />
        <el-table-column label="所在部门" prop="dept_name" />
        <el-table-column label="负责区域" prop="undertakeArea">
          <template #default="{ row }">
            {{
              row.undertakeArea.reduce((acc, cur) => acc + '，' + cur.province_name + cur.city_name + cur.area_name, '')
            }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="create_time" sortable>
          <template #default="{ row }">
            {{ formatTime(row.create_time) }}
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
        title="新增用户"
        width="500px"
        :close-on-click-modal="false"
        :show-close="true"
        class="rounded-lg"
      >
        <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" class="mt-4">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入" class="w-full !rounded-button" />
          </el-form-item>

          <el-form-item label="预留登录手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入" class="w-full !rounded-button" />
          </el-form-item>

          <el-form-item label="用户角色" prop="role_id">
            <el-select v-model="form.role_id" placeholder="请选择" class="w-full !rounded-button">
              <el-option v-for="role in roleOptions" :key="role.value" :label="role.label" :value="role.value" />
            </el-select>
          </el-form-item>

          <el-form-item label="所在部门" prop="dept_id">
            <el-select v-model="form.dept_id" placeholder="可选择" class="w-full !rounded-button">
              <el-option
                v-for="department in departmentOptions"
                :key="department.value"
                :label="department.label"
                :value="department.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="顾问企业微信号" prop="wechat_account">
            <ImageUploader v-model:value="form.wechat_account" />
            <span class="text-gray-400 text-sm">支持 jpg、png 格式，大小不超过 2M</span>
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
import { reactive, ref, onMounted } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { getUserList, getDepartmentList, getRoleList, deleteUsers, createPlatformUser } from '@/api/system/user'
import ImageUploader from '@/components/ImageUploader/index.vue'

import { formatTime } from '@/utils/formatTime'

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(999)
const selectedRows = ref<any[]>([])

const tableData = ref([])

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  name: '',
  phone: '',
  role_id: '',
  dept_id: '',
  wechat_account: ''
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  role_id: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
  dept_id: [{ required: true, message: '请选择所在部门', trigger: 'change' }]
})

interface RoleOption {
  value: number
  label: string
}

const roleOptions = ref<RoleOption[]>([])
interface DepartmentOption {
  value: number
  label: string
}

const departmentOptions = ref<DepartmentOption[]>([])

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (valid) {
      try {
        await createPlatformUser({
          name: form.name,
          phone: form.phone,
          role_id: form.role_id,
          dept_id: form.dept_id,
          wechat_account: form.wechat_account
        })
        console.log('表单提交', form)
        dialogVisible.value = false
        fetchUserList() // 重新获取用户列表
      } catch (error) {
        console.error('创建平台账号失败', error)
      }
    }
  })
}

const handleCancel = () => {
  dialogVisible.value = false
}

// 实现搜索逻辑
const handleSearch = () => {
  fetchUserList({ name: searchKeyword.value })
}

const handleReset = () => {
  searchKeyword.value = ''
  fetchUserList()
}

const handleBatchDelete = async () => {
  if (selectedRows.value.length === 0) {
    return
  }

  const ids = selectedRows.value.map(row => row.id).join(',')
  try {
    const res = await deleteUsers({ ids })
    if (res.code === 200) {
      ElMessage.success('批量删除成功')
      fetchUserList() // 重新获取用户列表
    }
  } catch (error) {
    console.error('批量删除失败', error)
  }
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

const fetchUserList = async (params = {}) => {
  const response = await getUserList({ page: currentPage.value, pageSize: pageSize.value, ...params })
  tableData.value = response.data.list
  total.value = response.data.total
}

const fetchDepartmentList = async () => {
  const response = await getDepartmentList()
  departmentOptions.value = response.data.map((item: any) => ({
    value: item.id,
    label: item.name
  }))
}

const fetchRoleList = async () => {
  const response = await getRoleList()
  roleOptions.value = response.data.list.map((item: any) => ({
    value: item.id,
    label: item.name
  }))
}

onMounted(() => {
  fetchUserList()
  fetchDepartmentList()
  fetchRoleList()
})
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
