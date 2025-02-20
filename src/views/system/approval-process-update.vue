<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 页面主体内容 -->
    <!-- 标签页 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="flex justify-between mb-6">
        <div class="flex justify-items-center">
          <div
            v-for="tab in tabs"
            :key="tab.key"
            :class="[
              'px-6 py-4 cursor-pointer text-sm',
              activeTab === tab.key ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
            ]"
            @click="onTabClick(tab.key)"
          >
            {{ tab.name }}
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-between py-2">
          <el-button type="primary" class="!rounded-button" @click="handlePublish">
            <el-icon><Plus /></el-icon>
            <span>发布</span>
          </el-button>
        </div>
      </div>

      <div v-if="activeTab === 'basic-design'" class="space-y-6 max-w-3xl">
        <!-- 审批流名称 -->
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">
            <span class="text-red-500 mr-1">*</span>审批流名称
          </label>
          <el-input v-model="formData.name" placeholder="请输入" class="w-full !rounded-button" />
        </div>

        <!-- 适用范围 -->
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">
            <span class="text-red-500 mr-1">*</span>适用范围
          </label>
          <el-select v-model="formData.scope" placeholder="请选择" class="w-full !rounded-button">
            <el-option v-for="item in scopeOptions" :key="item.value" :label="item.label" :value="item.value" />
            <template #footer>
              <el-button v-if="!isAdding" text bg size="small" @click="onAddOption"> 新增适用范围 </el-button>
              <template v-else>
                <el-input v-model="optionName" class="option-input" placeholder="input option name" size="small" />
                <el-button type="primary" size="small" @click="onConfirm"> confirm </el-button>
                <el-button size="small" @click="clear">cancel</el-button>
              </template>
            </template>
          </el-select>
        </div>

        <!-- 抄送人 -->
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">
            <span class="text-red-500 mr-1">*</span>抄送人
          </label>
          <el-select v-model="formData.ccUser" placeholder="请选择适用范围" class="w-full !rounded-button">
            <el-option v-for="item in ccUserOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>

        <!-- 审批描述 -->
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700"> 审批描述 </label>
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="4"
            placeholder="请输入..."
            class="w-full !rounded-button"
          />
        </div>
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div v-if="activeTab === 'basic-design'" class="flex justify-end mt-6">
      <el-button type="primary" class="!rounded-button whitespace-nowrap">
        <el-icon class="mr-1"><Document /></el-icon>
        保存审批并设置审批流程
      </el-button>
    </div>

    <div v-if="activeTab === 'process-design'" class="max-w-7xl mx-auto">
      <!-- 流程图和配置区域 -->
      <div class="flex space-x-8">
        <!-- 左侧流程图 -->
        <div class="flex-1 bg-white rounded-lg shadow-sm p-6">
          <div class="flow-chart">
            <!-- 起始节点 -->
            <div class="node start-node">
              <div class="node-content bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                <el-icon class="mr-2"><User /></el-icon>
                发起人
                <div class="text-sm mt-1">全公司</div>
              </div>
            </div>

            <!-- 连接线 -->
            <div class="connector"></div>

            <!-- TODO: -->
            <!-- 审批节点1 -->
            <div class="node">
              <div class="node-content bg-orange-100 text-orange-800 p-4 rounded-lg mb-4">
                <el-icon class="mr-2"><UserFilled /></el-icon>
                审批人
                <div class="text-sm mt-1">
                  <div>审批人类型：指定成员</div>
                  <div>审批人：盛彭</div>
                </div>
              </div>
            </div>

            <!-- 连接线 -->
            <div class="connector"></div>

            <!-- 审批节点2 -->
            <div class="node">
              <div class="node-content bg-orange-100 text-orange-800 p-4 rounded-lg mb-4">
                <el-icon class="mr-2"><UserFilled /></el-icon>
                审批人
                <div class="text-sm mt-1">
                  <div>审批人类型：发起人自选</div>
                  <div>审批人：大西大利, 风清扬, 高光亮</div>
                </div>
              </div>
            </div>

            <!-- 连接线 -->
            <div class="connector"></div>

            <!-- 结束节点 -->
            <div class="node end-node">
              <div class="node-content bg-gray-100 text-gray-800 p-4 rounded-lg">流程结束</div>
            </div>
          </div>
        </div>

        <!-- 右侧配置面板 -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg mb-6">审批节点设置</h3>

          <!-- 审批方式选择 -->
          <div class="mb-6">
            <div class="flex items-center justify-start mb-4 flex-wrap">
              <label class="flex items-center">
                <input type="radio" name="approveType" class="form-radio text-blue-600" checked />
                <span class="mr-3">指定成员</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="approveType" class="form-radio text-blue-600" />
                <span class="mr-3">发起人自选</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="approveType" class="form-radio text-blue-600" />
                <span class="mr-3">上一审批人自选</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="role" class="form-radio text-blue-600" />
                <span class="mr-3">主管</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="role" class="form-radio text-blue-600" />
                <span class="mr-3">连续多级主管</span>
              </label>
            </div>

            <!-- 人员选择 -->
            <div class="mb-4">
              <el-select v-model="selectedUser" placeholder="选择人员" class="w-full">
                <el-option label="盛彭" value="盛彭"></el-option>
              </el-select>
            </div>

            <!-- 会签设置 -->
            <div class="mb-4">
              <div class="flex items-center justify-between">
                <span>会签（该审批节点需所有审批人全部通过）</span>
                <el-switch v-model="needAllApprove" />
              </div>
            </div>

            <!-- 或签设置 -->
            <div class="mb-4">
              <div class="flex items-center justify-between">
                <span>或签（该审批节点需一人通过即可）</span>
                <el-switch v-model="needSomeApprove" />
              </div>
            </div>

            <!-- 节点名称 -->
            <div class="mb-4">
              <label class="block mb-2">节点名称</label>
              <el-input v-model="nodeName" placeholder="请输入节点名称" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Document } from '@element-plus/icons-vue'
import { getApprovalRangeList } from '@/api/system/user'

interface FormData {
  name: string
  scope: string
  ccUser: string
  description: string
}

const activeTab = ref('basic-design')
const isAdding = ref(false)
const formData = ref<FormData>({
  name: '',
  scope: '',
  ccUser: '',
  description: ''
})

const scopeOptions = ref<any[]>([])
const optionName = ref('')

const fetchApprovalRangeList = async () => {
  const response = await getApprovalRangeList()
  scopeOptions.value = response.data.map((item: any) => ({
    value: item.id,
    label: item.name
  }))
}

onMounted(() => {
  fetchApprovalRangeList()
})

const onAddOption = () => {
  isAdding.value = true
}

const onConfirm = () => {
  if (optionName.value) {
    scopeOptions.value.push({
      label: optionName.value,
      value: optionName.value
    })
    clear()
  }
}

const clear = () => {
  optionName.value = ''
  isAdding.value = false
}

const ccUserOptions = [
  { value: '1', label: '部门主管' },
  { value: '2', label: '人事经理' },
  { value: '3', label: '财务主管' },
  { value: '4', label: '总经理' }
]

const tabs = [
  { key: 'basic-design', name: '基础设计' },
  { key: 'process-design', name: '流程设计' }
]

const onTabClick = (key: string) => {
  activeTab.value = key
}
</script>

<style scoped>
.el-input :deep(.el-input__wrapper) {
  background-color: #f5f5f5;
  border: none;
}

.el-select :deep(.el-input__wrapper) {
  background-color: #f5f5f5;
  border: none;
}

.el-textarea :deep(.el-textarea__inner) {
  background-color: #f5f5f5;
  border: none;
}
.form-radio {
  margin-right: 10px;
}
</style>
