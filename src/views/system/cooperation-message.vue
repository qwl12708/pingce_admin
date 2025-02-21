<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div class="bold mb-4">代理合作留言</div>
    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" prop="id" width="100" />
        <el-table-column label="留言者姓名" prop="name" sortable />
        <el-table-column label="留言者电话" prop="phone" sortable />
        <el-table-column label="留言时间" prop="create_time" sortable />
        <el-table-column label="回复时间" prop="reply_time" sortable />
        <el-table-column label="留言内容" prop="content" sortable />
        <el-table-column label="回复状态" prop="reply_status" sortable />
        <el-table-column label="回复人" prop="replier" sortable />
        <el-table-column label="回复记录" prop="reply_record" sortable />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="handleEdit(row)">回复</el-button>
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
          <el-form-item label="回复记录" prop="reply_record">
            <el-input
              type="textarea"
              v-model="form.reply_record"
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

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedRows = ref<any[]>([])

const tableData = ref([])

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  id: null,
  reply_record: '',
  reply_time: ''
})

const rules: FormRules = {
  reply_record: [{ required: true, message: '请输入回复记录', trigger: 'blur' }],
  reply_time: [{ required: true, message: '请选择回复时间', trigger: 'change' }]
}

const fetchMessages = async () => {
  try {
    const { data } = await getSupplierMessages({ page: currentPage.value, pageSize: pageSize.value })
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
          replay_content: form.reply_record,
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
  form.reply_record = row.reply_record
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
