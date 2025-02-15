<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div class="bold mb-4">代理合作留言</div>
    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <el-table :data="tableData" @selection-change="handleSelectionChange" class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" prop="id" width="100" />
        <el-table-column label="留言者姓名" prop="name" sortable />
        <el-table-column label="留言者电话" prop="name" sortable />
        <el-table-column label="留言时间" prop="messageTime" sortable />
        <el-table-column label="回复时间" prop="replyTime" sortable />
        <el-table-column label="留言内容" prop="replyContent" sortable />
        <el-table-column label="回复状态" prop="replyStatus" sortable />
        <el-table-column label="回复人" prop="replier" sortable />
        <el-table-column label="回复记录" prop="replyRecord" sortable />
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
          <el-form-item label="回复记录" prop="replyRecord">
            <el-input
              type="textarea"
              v-model="form.replyRecord"
              placeholder="请输入回复记录"
              class="w-full !rounded-button"
            />
          </el-form-item>

          <el-form-item label="回复时间" prop="replyTime">
            <el-date-picker
              v-model="form.replyTime"
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
    name: '张三',
    messageTime: '2025-02-10 10:00:00',
    replyTime: '2025-02-10 12:00:00',
    replyContent: '感谢您的留言，我们会尽快处理。',
    replyStatus: '已回复',
    replier: '管理员',
    replyRecord: '2025-02-10 12:00:00 管理员: 感谢您的留言，我们会尽快处理。'
  },
  {
    id: 2,
    name: '李四',
    messageTime: '2025-02-11 09:00:00',
    replyTime: '',
    replyContent: '',
    replyStatus: '未回复',
    replier: '',
    replyRecord: ''
  },
  {
    id: 3,
    name: '王五',
    messageTime: '2025-02-11 11:00:00',
    replyTime: '2025-02-11 13:00:00',
    replyContent: '您的问题已解决，请查看。',
    replyStatus: '已回复',
    replier: '管理员',
    replyRecord: '2025-02-11 13:00:00 管理员: 您的问题已解决，请查看。'
  }
])

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  replyRecord: '',
  replyTime: ''
})

const rules: FormRules = {
  replyRecord: [{ required: true, message: '请输入回复记录', trigger: 'blur' }],
  replyTime: [{ required: true, message: '请选择回复时间', trigger: 'change' }]
}

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

const handleEdit = (row: any) => {
  form.replyRecord = row.replyRecord
  form.replyTime = row.replyTime
  dialogVisible.value = true
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
