<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 flex justify-between items-center border-b border-gray-100">
        <h2 class="text-lg font-medium">产品配置</h2>
        <div class="space-x-2">
          <el-button @click="onAdd" type="primary" class="!rounded-button whitespace-nowrap">
            <el-icon class="mr-1"><Plus /></el-icon>新增
          </el-button>
          <el-button class="!rounded-button whitespace-nowrap" @click="handleBatchDelete">
            <el-icon class="mr-1"><Delete /></el-icon>批量删除
          </el-button>
        </div>
      </div>

      <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="banner" prop="id" width="100" />
        <el-table-column label="类型" prop="tel" sortable />
        <el-table-column label="排序" prop="role" />
        <el-table-column label="创建人" prop="department" />
        <el-table-column label="状态" prop="area" />
        <el-table-column label="创建时间" prop="createdTime" sortable />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">详情</el-button>
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
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
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入" class="w-full !rounded-button" />
          </el-form-item>

          <el-form-item label="预留登录手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入" class="w-full !rounded-button" />
          </el-form-item>

          <el-form-item label="用户角色" prop="role">
            <el-select v-model="form.role" placeholder="请选择" class="w-full !rounded-button">
              <el-option label="管理员" value="admin" />
              <el-option label="普通用户" value="user" />
              <el-option label="访客" value="guest" />
            </el-select>
          </el-form-item>

          <el-form-item label="所在部门" prop="department">
            <el-select v-model="form.department" placeholder="可选择" class="w-full !rounded-button">
              <el-option label="技术部" value="tech" />
              <el-option label="市场部" value="market" />
              <el-option label="运营部" value="operation" />
            </el-select>
          </el-form-item>

          <el-form-item label="网间企业信息" prop="businessInfo">
            <div class="flex items-center gap-2">
              <el-upload class="upload-demo" action="#" :auto-upload="false" :show-file-list="false">
                <el-button type="primary" class="!rounded-button whitespace-nowrap">
                  <el-icon class="mr-1"><Plus /></el-icon>上传
                </el-button>
              </el-upload>
              <span class="text-gray-400 text-sm">支持 jpg、png 格式，大小不超过 2M</span>
            </div>
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
import { Delete, Plus } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router'

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(999)
const selectedRows = ref<any[]>([])

const tableData = ref([
  {
    id: 1,
    name: '张三',
    tel: '13800138000',
    role: '管理员',
    department: '技术部',
    area: '北京市',
    createdTime: '2021-09-01 12:00:00'
  },
  {
    id: 2,
    name: '李四',
    tel: '13800138001',
    role: 'HR',
    department: '人力资源部',
    area: '上海市',
    createdTime: '2021-09-02 12:00:00'
  },
  {
    id: 3,
    name: '王五',
    tel: '13800138002',
    role: '员工',
    department: '技术部',
    area: '广州市',
    createdTime: '2021-09-03 12:00:00'
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
