<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-2xl font-bold mb-6">编辑测评顾问执行区域</h2>

    <div style="width: 500px" class="bg-white rounded-lg shadow p-6">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="顾问名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入顾问名称" class="w-64" />
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号码" class="w-64" />
        </el-form-item>

        <el-form-item label="所属部门" prop="department">
          <el-input v-model="form.department" placeholder="请输入所属部门" class="w-64" />
        </el-form-item>

        <el-form-item label="所属区域" prop="regions">
          <el-tree-select
            v-model="form.regions"
            :data="regionData"
            show-checkbox
            multiple
            node-key="id"
            :props="defaultProps"
            placeholder="请选择所属区域"
            class="w-full"
          />
        </el-form-item>

        <div class="flex justify-center space-x-4 mt-8">
          <el-button type="primary" class="!rounded-button" @click="handleSubmit">确认</el-button>
          <el-button class="!rounded-button" @click="handleCancel">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { bindUserArea } from '@/api/customer'

interface FormState {
  name: string
  phone: string
  department: string
  regions: string[]
}

const formRef = ref()
const form = reactive<FormState>({
  name: '',
  phone: '',
  department: '',
  regions: []
})

const rules = ref({
  name: [{ required: true, message: '请输入顾问名称', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
  department: [{ required: true, message: '请输入所属部门', trigger: 'blur' }],
  regions: [{ required: true, message: '请选择所属区域', trigger: 'change' }]
})

const defaultProps = {
  children: 'children',
  label: 'label'
}

const regionData = [
  {
    id: 1,
    label: '河南省',
    children: [
      {
        id: 2,
        label: '郑州市',
        children: [
          { id: 3, label: '二七区' },
          { id: 4, label: '金水区' },
          { id: 5, label: '管城回族区' },
          { id: 6, label: '中原区' },
          { id: 7, label: '高新区' },
          { id: 8, label: '郑东新区' }
        ]
      }
    ]
  },
  {
    id: 9,
    label: '山东省'
  },
  {
    id: 10,
    label: '安徽省'
  }
]

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    await bindUserArea({ id: form.id, area: form.regions.join(',') })
    ElMessage.success('提交成功')
  } catch (error) {
    ElMessage.error('提交失败')
  }
}

const handleCancel = () => {
  form.name = ''
  form.phone = ''
  form.department = ''
  form.regions = []
}
</script>

<style scoped>
.el-input {
  --el-input-border-color: #dcdfe6;
}

.el-tree-select {
  width: 100%;
}
</style>
