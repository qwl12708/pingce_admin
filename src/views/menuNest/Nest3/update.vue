<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-2xl font-bold mb-6">编辑测评顾问执行区域</h2>

    <div style="width: 500px" class="bg-white rounded-lg shadow p-6">
      <div class="space-y-6">
        <!-- 顾问名称 -->
        <div class="flex items-center">
          <label class="w-24 text-gray-600">顾问名称</label>
          <el-input v-model="form.name" placeholder="请输入顾问名称" class="w-64" />
        </div>

        <!-- 手机号码 -->
        <div class="flex items-center">
          <label class="w-24 text-gray-600">手机号码</label>
          <el-input v-model="form.phone" placeholder="请输入手机号码" class="w-64" />
        </div>

        <!-- 所属部门 -->
        <div class="flex items-center">
          <label class="w-24 text-gray-600">所属部门</label>
          <el-input v-model="form.department" placeholder="请输入所属部门" class="w-64" />
        </div>

        <!-- 所属区域 -->
        <div class="flex">
          <label class="w-24 text-gray-600 pt-1">所属区域</label>
          <div class="flex-1">
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
          </div>
        </div>

        <!-- 按钮组 -->
        <div class="flex justify-center space-x-4 mt-8">
          <el-button type="primary" class="!rounded-button" @click="handleSubmit">确认</el-button>
          <el-button class="!rounded-button" @click="handleCancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeNode } from 'element-plus'

interface FormState {
  name: string
  phone: string
  department: string
  regions: string[]
}

const form = ref<FormState>({
  name: '',
  phone: '',
  department: '',
  regions: []
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

const handleSubmit = () => {
  console.log('提交表单', form.value)
}

const handleCancel = () => {
  form.value = {
    name: '',
    phone: '',
    department: '',
    regions: []
  }
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
