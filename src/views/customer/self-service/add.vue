<template>
  <div class="min-h-screen bg-white">
    <div class="flex-1 p-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-xl font-medium mb-6">新增客户</h2>
        <div class="flex space-x-8 mb-6">
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">客户类别</span>
            <el-radio-group v-model="customerType">
              <el-radio label="auto">自助客户</el-radio>
              <el-radio label="test">测评客户</el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-form :model="form" label-width="160px">
          <div class="grid grid-cols-2 gap-x-8 gap-y-6">
            <el-form-item label="单位名称" required>
              <el-input v-model="form.companyName" placeholder="请输入" />
            </el-form-item>

            <el-form-item label="上传加盖公章的用户承诺或营业执照" required>
              <el-upload
                class="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500"
                action="#"
                :auto-upload="false"
                tip="只能上传jpg/png文件，且不超过500kb"
                extra="(要求：png、jpeg、pdf格式，大小在10M以内)"
              >
                <el-icon class="text-gray-400 text-xl mb-2"><Plus /></el-icon>
                <div class="text-gray-500">点击上传</div>
              </el-upload>
            </el-form-item>

            <el-form-item label="员工人数">
              <el-select v-model="form.employeeCount" placeholder="请选择">
                <el-option label="50人以下" value="lt50" />
                <el-option label="50-200人" value="50-200" />
                <el-option label="200人以上" value="gt200" />
              </el-select>
            </el-form-item>

            <el-form-item label="上传单位LOGO" required>
              <el-upload
                class="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500"
                action="#"
                :auto-upload="false"
                extra="(要求：png、jpeg、pdf格式，大小在10M以内)"
              >
                <el-icon class="text-gray-400 text-xl mb-2"><Plus /></el-icon>
                <div class="text-gray-500">点击上传</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="所属行业">
              <el-select v-model="form.industry" placeholder="请选择">
                <el-option label="互联网" value="internet" />
                <el-option label="金融" value="finance" />
                <el-option label="教育" value="education" />
              </el-select>
            </el-form-item>
            <el-form-item label="单位所在省/市/自治区" required>
              <el-select v-model="form.province" placeholder="请选择">
                <el-option label="北京市" value="beijing" />
                <el-option label="上海市" value="shanghai" />
                <el-option label="广东省" value="guangdong" />
              </el-select>
            </el-form-item>
            <el-form-item label="预留电子邮箱">
              <el-input v-model="form.email" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="市/州" required>
              <el-select v-model="form.province" placeholder="请选择">
                <el-option label="北京市" value="beijing" />
                <el-option label="上海市" value="shanghai" />
                <el-option label="广东省" value="guangdong" />
              </el-select>
            </el-form-item>
            <el-form-item label="管理员（联系人）" required>
              <el-input v-model="form.adminName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="预留其他使用手机号码">
              <el-input v-model="form.backupPhone" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="管理员手机号码" required>
              <el-input v-model="form.adminPhone" placeholder="请输入">
                <template #append>
                  <el-button type="primary" class="!rounded-button whitespace-nowrap">获取验证码</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="预留其他使用手机号码">
              <el-input v-model="form.otherPhone" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="验证码" required>
              <el-input v-model="form.verifyCode" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="客服顾问">
              <el-select v-model="form.consultant" placeholder="请选择">
                <el-option label="顾问A" value="a" />
                <el-option label="顾问B" value="b" />
              </el-select>
            </el-form-item>
          </div>
          <div class="flex justify-center space-x-4 mt-8">
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSubmit">确定</el-button>
            <el-button class="!rounded-button whitespace-nowrap" @click="handleCancel">返回</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const customerType = ref('auto')
const form = ref({
  companyName: '',
  employeeCount: '',
  industry: '',
  email: '',
  province: '',
  adminName: '',
  backupPhone: '',
  adminPhone: '',
  otherPhone: '',
  verifyCode: '',
  consultant: ''
})
const handleSubmit = () => {
  console.log('提交表单', form.value)
}
const handleCancel = () => {
  console.log('取消操作')
}
</script>
<style scoped>
.el-form-item :deep(.el-form-item__label) {
  font-size: 14px;
  color: #606266;
  padding-right: 12px;
  /* white-space: nowrap; */
}
.el-input :deep(.el-input__wrapper) {
  border-radius: 4px;
}
.el-select {
  width: 100%;
}
</style>
