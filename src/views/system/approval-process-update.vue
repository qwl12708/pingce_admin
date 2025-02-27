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
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px" class="mt-4">
          <!-- 审批流名称 -->
          <el-form-item label="审批流名称" prop="name" required>
            <el-input v-model="formData.name" placeholder="请输入审批流名称" class="w-full !rounded-button" />
          </el-form-item>

          <!-- 适用范围 -->
          <!-- <el-form-item label="适用范围" prop="scope">
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
          </el-form-item> -->

          <!-- 抄送人 -->
          <!-- <el-form-item label="抄送人" prop="ccUser">
            <el-select v-model="formData.ccUser" placeholder="请选择适用范围" class="w-full !rounded-button">
              <el-option v-for="item in ccUserOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item> -->

          <!-- 审批描述 -->
          <el-form-item label="审批描述">
            <el-input
              v-model="formData.description"
              type="textarea"
              :rows="4"
              placeholder="请输入..."
              class="w-full !rounded-button"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div v-if="activeTab === 'basic-design'" class="flex justify-end mt-6">
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleNext">
        <el-icon class="mr-1"><Document /></el-icon>
        保存审批并设置审批流程
      </el-button>
    </div>

    <div v-if="activeTab === 'process-design'" class="w-[400px] mx-auto">
      <div class="flex justify-between items-center p-6 border-b">
        <h2 class="text-lg font-medium">审批流程设计</h2>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleAddNode">
          <el-icon class="mr-1"><Plus /></el-icon>添加节点
        </el-button>
      </div>
      <div class="p-6">
        <div class="flow-chart">
          <div class="node start-node">
            <div class="node-content bg-green-100 text-green-800 p-4 rounded-lg mb-4">
              <el-icon class="mr-2"><User /></el-icon>
              发起人
              <div class="text-sm mt-1">全公司</div>
            </div>
          </div>
          <div class="connector"></div>
          <div v-for="(node, index) in nodes" :key="index" class="node">
            <div class="node-content bg-orange-100 text-orange-800 p-4 rounded-lg mb-4 relative">
              <el-icon style="right: -96%" class="absolute top-0 cursor-pointer" @click="handleRemoveNode(index)">
                <Delete />
              </el-icon>
              <el-icon style="margin-left: -12px" class="mb-3"><UserFilled /></el-icon>
              <el-input v-model="node.name" placeholder="节点名称" class="mb-2 w-full" />
              <el-select v-model="node.approver.type" placeholder="审批人类型" class="mb-2 w-full">
                <el-option label="指定成员" :value="1" />
                <el-option label="角色" :value="2" />
              </el-select>
              <el-select
                v-if="node.approver.type === 1"
                v-model="node.approver.uids"
                placeholder="审批人"
                class="mb-2 w-full"
                multiple
              >
                <el-option v-for="user in userOptions" :key="user.value" :label="user.label" :value="user.value" />
              </el-select>
              <el-select
                v-if="node.approver.type === 2"
                v-model="node.approver.role_id"
                placeholder="角色"
                class="mb-2 w-full"
                multiple
              >
                <el-option v-for="role in roleOptions" :key="role.value" :label="role.label" :value="role.value" />
              </el-select>

              <el-radio-group v-model="node.type" class="flex flex-col w-full">
                <el-radio :label="1">会签（该审批节点需所有审批人全部通过）</el-radio>
                <el-radio :label="2">或签（该审批节点需一人通过即可）</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="connector"></div>
          <div class="node end-node">
            <div class="node-content bg-gray-100 text-gray-800 p-4 rounded-lg">流程结束</div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handlePublish">
          <el-icon class="mr-1"><Document /></el-icon>
          发布
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useRoute } from 'vue-router'
import { Document } from '@element-plus/icons-vue'
import {
  getApprovalRangeList,
  createApprovalFlow,
  getUserList,
  getRoleList,
  getApprovalFlowInfo,
  editApprovalFlow
} from '@/api/system/user'
import { Plus, User, UserFilled, Delete } from '@element-plus/icons-vue'
import router from '@/router'

interface FormData {
  name: string
  scope: string
  ccUser: string
  description: string
}

const route = useRoute()
const id = route.query.id as string | undefined

const activeTab = ref('basic-design')
const isAdding = ref(false)
const formData = reactive<FormData>({
  name: '',
  scope: '',
  ccUser: '',
  description: ''
})

const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入审批流名称', trigger: 'blur' }]
  // scope: [{ required: true, message: '请选择适用范围', trigger: 'change' }],
  // ccUser: [{ required: true, message: '请选择抄送人', trigger: 'change' }]
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

const userOptions = ref<any[]>([])
const fetchUserList = async () => {
  const response = await getUserList()
  userOptions.value = response.data.list.map((item: any) => ({
    value: item.id,
    label: item.name
  }))
}

const roleOptions = ref<any[]>([])
const fetchRoleList = async () => {
  const response = await getRoleList()
  roleOptions.value = response.data.list.map((item: any) => ({
    value: item.id + '',
    label: item.name
  }))
  console.log('roleOptions', roleOptions)
}

const fetchApprovalFlowInfo = async (id: string) => {
  const response = await getApprovalFlowInfo({ id: Number(id) })
  const data = response.data
  console.log('%c [ data ]-224', 'font-size:13px; background:pink; color:#bf2c9f;', data)
  formData.name = data.name
  formData.description = data.info
  nodes.value = data.content.map((node: any) => ({
    ...node,
    approver: {
      ...node.approver,
      uids: node.approver.uids ? node.approver.uids.split(',') : [],
      role_id: node.approver.role_id ? node.approver.role_id.split(',') : []
    }
  }))
  console.log('nodes', nodes)
}

onMounted(() => {
  fetchApprovalRangeList()
  fetchUserList()
  fetchRoleList()
  if (id) {
    fetchApprovalFlowInfo(id)
  }
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

const tabs = [
  { key: 'basic-design', name: '基础设计' },
  { key: 'process-design', name: '流程设计' }
]

const nodes = ref([
  {
    name: '节点名称',
    type: 1,
    approver: {
      type: 1,
      uids: '1'
    }
  }
])

const handleAddNode = () => {
  nodes.value.push({
    name: '新节点',
    type: 1,
    approver: {
      type: 1, // 审批人来源类型，1：指定成员，2：角色
      uids: '1' //审批人ID，多个以逗号分隔。 type为1时传
    }
  })
}

const handleRemoveNode = (index: number) => {
  nodes.value.splice(index, 1)
}

const onTabClick = (key: string) => {
  activeTab.value = key
}

const handleNext = () => {
  formRef.value?.validate(valid => {
    if (valid) {
      activeTab.value = 'process-design'
    }
  })
}

const handlePublish = async () => {
  if (!formData.name) {
    ElMessage.warning('基础设计-审批流名称未填写')
    activeTab.value = 'basic-design'
    return
  }
  try {
    const payload = {
      name: formData.name,
      cc_user_id: 0,
      info: formData.description,
      type_id: 1,
      content: JSON.stringify(
        nodes.value.map(node => ({
          name: node.name,
          type: node.type, // 会签1、或签2
          approver: {
            type: node.approver.type, // 审批人来源类型，1：指定成员，2：角色
            uids: node.approver.uids?.join(',') || '', //审批人ID，多个以逗号分隔。 type为1时传
            role_id: node.approver.role_id?.join(',') || '' // 审批角色ID。 type为2时传
          }
        }))
      )
    }
    if (id) {
      await editApprovalFlow({ id: Number(id), ...payload })
      ElMessage.success('编辑成功')
    } else {
      await createApprovalFlow(payload)
      ElMessage.success('发布成功')
    }
    router.push('/system/approval-process')
  } catch (error) {
    ElMessage.error('操作失败')
  }
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
