<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-4xl px-1 py-1">
      <div class="bg-white rounded-lg shadow-sm p-8">
        <!-- 头像区域 -->
        <div class="flex flex-col items-center mb-8">
          <div class="relative">
            <img :src="userInfo.avatar" class="w-20 h-20 rounded-full object-cover" alt="用户头像" />
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button type="primary" class="mt-4 !rounded-button whitespace-nowrap"> 修改头像 </el-button>
            </el-upload>
          </div>
          <h2 class="text-lg font-medium mt-4">{{ userInfo.name }}</h2>
          <p class="text-gray-500">{{ userInfo.phone }}</p>
          <p class="text-sm text-gray-400 mt-2">支持图片格式: JPG/GIF/PNG/GPEG，文件大小小于2M，尺寸建议320x320以上</p>
        </div>
        <!-- 基本信息区域 -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-gray-600">花名</span>
              <span class="ml-8">{{ userInfo.nickname }}</span>
            </div>
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleEdit('nickname')">
              修改
            </el-button>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <span class="text-gray-600">所属部门</span>
              <span class="ml-8">{{ userInfo.department }}</span>
            </div>
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleEdit('department')">
              修改
            </el-button>
          </div>
        </div>
        <!-- 快捷功能区域 -->
        <div class="flex items-center space-x-6 mt-12">
          <button class="flex items-center text-gray-600 hover:text-blue-500" @click="handlePasswordChange">
            <el-icon class="mr-2"><Lock /></el-icon>
            <span>修改密码</span>
          </button>
          <button class="flex items-center text-gray-600 hover:text-blue-500" @click="handlePasswordReset">
            <el-icon class="mr-2"><Refresh /></el-icon>
            <span>密码重置</span>
          </button>
        </div>
      </div>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <el-form :model="editForm">
        <el-form-item :label="dialogLabel">
          <el-input v-model="editForm.value" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog v-model="passwordDialogVisible" title="修改密码" width="30%">
      <el-form :model="passwordForm" :rules="passwordRules">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPasswordChange">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 重置密码确认对话框 -->
    <el-dialog v-model="resetDialogVisible" title="密码重置" width="30%">
      <p class="text-gray-600">确定要重置密码吗？重置后密码将变为系统默认密码。</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPasswordReset">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Lock, Refresh } from '@element-plus/icons-vue'
import type { UploadProps, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getCurrentUserInfo, editCurrentUserInfo } from '@/api/system/user'
// TODO: 修改花名、部门、头像、密码重置等接口

const userInfo = ref({
  name: '李思琪',
  phone: '15232632632',
  nickname: '小美爱吃糖',
  department: '销售部'
})

const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogLabel = ref('')
const editType = ref('')
const editForm = ref({
  value: ''
})

onMounted(() => {
  fetchUserInfo()
})

const fetchUserInfo = async () => {
  try {
    const response = await getCurrentUserInfo()
    userInfo.value = response.data
  } catch (error) {
    ElMessage.error('获取用户信息失败')
  }
}

const handleEdit = (type: string) => {
  editType.value = type
  if (type === 'nickname') {
    dialogTitle.value = '修改花名'
    dialogLabel.value = '花名'
    editForm.value.value = userInfo.value.nickname
  } else {
    dialogTitle.value = '修改部门'
    dialogLabel.value = '所属部门'
    editForm.value.value = userInfo.value.department
  }
  dialogVisible.value = true
}
const handleSave = () => {
  if (editType.value === 'nickname') {
    userInfo.value.nickname = editForm.value.value
  } else {
    userInfo.value.department = editForm.value.value
  }
  dialogVisible.value = false
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // 处理头像上传成功
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = file => {
  const isValidFormat = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isValidFormat) {
    ElMessage.error('头像图片只能是 JPG/PNG/GIF 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('头像图片大小不能超过 2MB!')
  }
  return isValidFormat && isLt2M
}
const passwordDialogVisible = ref(false)
const resetDialogVisible = ref(false)

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordRules = {
  oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
} as FormRules

const handlePasswordChange = () => {
  passwordDialogVisible.value = true
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

const submitPasswordChange = () => {
  ElMessage.success('密码修改成功')
  passwordDialogVisible.value = false
}

const handlePasswordReset = () => {
  resetDialogVisible.value = true
}

const submitPasswordReset = () => {
  ElMessage.success('密码已重置')
  resetDialogVisible.value = false
}
</script>
<style scoped>
.avatar-uploader {
  display: flex;
  justify-content: center;
}
</style>
