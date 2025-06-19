<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div class="bold mb-4">代理合作留言</div>
    <!-- 搜索区域 -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
      <el-form :inline="true" :model="searchForm" class="flex flex-wrap items-center gap-4">
        <el-form-item label="留言者姓名">
          <el-input v-model="searchForm.name" placeholder="请输入留言者姓名" class="w-48" clearable />
        </el-form-item>
        <el-form-item label="留言者电话">
          <el-input v-model="searchForm.phone" placeholder="请输入留言者电话" class="w-48" clearable />
        </el-form-item>
        <el-form-item label="留言内容">
          <el-input v-model="searchForm.content" placeholder="请输入留言内容" class="w-48" clearable />
        </el-form-item>
        <el-form-item label="回复状态">
          <el-select v-model="searchForm.status" placeholder="请选择回复状态" class="w-40" clearable>
            <el-option label="全部" value="" />
            <el-option label="未回复" :value="1" />
            <el-option label="已回复" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="回复人">
          <el-input v-model="searchForm.reply_user" placeholder="请输入回复人" class="w-48" clearable />
        </el-form-item>
        <el-form-item label="回复记录">
          <el-input v-model="searchForm.replay_content" placeholder="请输入回复记录" class="w-48" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
          <el-button class="!rounded-button whitespace-nowrap" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" prop="id" width="100" />
        <el-table-column label="留言者姓名" prop="name" sortable />
        <el-table-column label="留言者电话" prop="phone" sortable />
        <el-table-column label="留言时间" prop="create_time" sortable>
          <template #default="{ row }">
            {{ formatTime(row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column label="回复时间" prop="replay_time" sortable>
          <template #default="{ row }">
            {{ formatTime(row.replay_time) }}
          </template>
        </el-table-column>
        <el-table-column label="留言内容" prop="content" sortable />
        <el-table-column label="回复状态" prop="status" sortable>
          <template #default="{ row }">
            <span v-if="row.status === 0" class="text-red-500">未回复</span>
            <span v-if="row.status === 1" class="text-green-500">已回复</span>
          </template>
        </el-table-column>
        <el-table-column label="回复人" prop="reply_user" sortable />
        <el-table-column label="回复记录" prop="replay_content" sortable />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">回复</el-button>
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
        title="回复留言"
        width="500px"
        :close-on-click-modal="false"
        :show-close="true"
        class="rounded-lg"
      >
        <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" class="mt-4">
          <el-form-item label="回复记录" prop="replay_content">
            <el-input
              type="textarea"
              v-model="form.replay_content"
              placeholder="请输入回复记录"
              class="w-full !rounded-button"
            />
          </el-form-item>

          <el-form-item label="回复时间" prop="reply_time">
            <el-date-picker
              v-model="form.reply_time"
              type="datetime"
              placeholder="选择日期时间"
              class="w-full !rounded-button"
            />
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
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { getSupplierMessages, replySupplierMessage } from '@/api/system/user'

import { formatTime } from '@/utils/formatTime'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedRows = ref<any[]>([])

const tableData = ref([])

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  id: null,
  replay_content: '',
  reply_time: ''
})

const searchForm = reactive({
  name: '',
  phone: '',
  content: '',
  status: '',
  reply_user: '',
  replay_content: ''
})

const rules: FormRules = {
  replay_content: [{ required: true, message: '请输入回复记录', trigger: 'blur' }],
  reply_time: [{ required: true, message: '请选择回复时间', trigger: 'change' }]
}

const fetchMessages = async () => {
  try {
    const params: any = {
      page: currentPage.value,
      pageSize: pageSize.value,
      name: searchForm.name,
      phone: searchForm.phone,
      content: searchForm.content,
      status: searchForm.status,
      reply_user: searchForm.reply_user,
      replay_content: searchForm.replay_content
    }
    const { data } = await getSupplierMessages(params)
    tableData.value = data.list
    total.value = data.total
  } catch (error) {
    ElMessage.error('获取留言列表失败')
    console.log('getSupplierMessages', error)
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (valid) {
      try {
        await replySupplierMessage({
          id: form.id,
          replay_content: form.replay_content,
          replay_time: form.reply_time
        })
        dialogVisible.value = false
        fetchMessages()
      } catch (error) {
        console.log('replySupplierMessage', error)
        ElMessage.error('回复失败')
      }
    }
  })
}

const handleCancel = () => {
  dialogVisible.value = false
}

const handleEdit = (row: any) => {
  form.id = row.id
  form.replay_content = row.replay_content
  form.reply_time = row.reply_time
  dialogVisible.value = true
}

const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchMessages()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchMessages()
}

const handleSearch = () => {
  currentPage.value = 1
  fetchMessages()
}

const handleReset = () => {
  Object.assign(searchForm, {
    name: '',
    phone: '',
    content: '',
    status: '',
    reply_user: '',
    replay_content: ''
  })
  currentPage.value = 1
  fetchMessages()
}

onMounted(() => {
  fetchMessages()
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
