<template>
  <div class="main-content min-h-screen bg-white">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 py-4 border-b">
        <h1 class="text-xl font-medium">其它配置</h1>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="saveConfig">保存</el-button>
      </div>
      <el-form :model="form" label-width="200px">
        <div class="space-y-8">
          <!-- 服务协议 -->
          <el-form-item label="服务协议" class="w-[400px]">
            <FileUploader v-model:value="form.service_protocol_file" />
          </el-form-item>
          <!-- 隐私政策 -->
          <el-form-item label="隐私政策">
            <FileUploader v-model:value="form.privacy_protocol_file" />
          </el-form-item>
          <!-- 客户端管理使用说明文件 -->
          <el-form-item label="客户端管理使用说明文件">
            <FileUploader v-model:value="form.client_use_file" />
          </el-form-item>
          <!-- 首页"微信咨询"链接二维码上传 -->
          <el-form-item label="首页微信咨询二维码">
            <div>
              <ImageUploader v-model:value="form.wechat_file" />
              <p class="text-gray-400 text-xs mt-2 text-center">推荐图片格式为jpg、jpeg、png，图片大小不能超过 10MB</p>
            </div>
          </el-form-item>
          <!-- 客服电话 -->
          <el-form-item label="客服电话">
            <el-input v-model="form.call_center_phone" placeholder="请输入客服电话" class="!w-[300px]" />
          </el-form-item>

          <!-- 岗位胜任力测评产品介绍 -->
          <el-form-item label="岗位胜任力测评产品介绍">
            <WangEditor height="300px" v-model:value="form.job_evaluation_intro" />
          </el-form-item>
          <!-- 订制测评产品介绍 -->
          <el-form-item label="订制测评产品介绍">
            <WangEditor height="300px" v-model:value="form.customized_evaluation_intro" />
          </el-form-item>
          <!-- 底部导航配置 -->
          <el-form-item label="底部导航配置">
            <WangEditor height="300px" v-model:value="form.bottom_nav_content" />
          </el-form-item>
          <!-- 底部备案号内容 -->
          <el-form-item label="底部备案号内容">
            <el-input
              v-model="form.bottom_record_content"
              placeholder="请输入底部备案号内容"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getOtherConfig, setOtherConfig } from '@/api/system/user'
import WangEditor from '@/components/WangEditor/index.vue'
import FileUploader from '@/components/FileUploader/index.vue'
import ImageUploader from '@/components/ImageUploader/index.vue'

const form = ref({
  service_protocol_file: '',
  privacy_protocol_file: '',
  client_use_file: '',
  wechat_file: '',
  call_center_phone: '',
  job_evaluation_intro: '',
  customized_evaluation_intro: '',
  bottom_nav_content: '',
  bottom_record_content: ''
})

const saveConfig = async () => {
  await setOtherConfig(form.value)
}

const fetchConfig = async () => {
  const { data } = await getOtherConfig()
  Object.assign(form.value, data)
}

onMounted(() => {
  fetchConfig()
})
</script>

<style scoped>
.el-textarea :deep(.el-textarea__inner) {
  min-height: 120px !important;
  resize: none;
}
.el-upload-list__item :deep {
  width: 200px !important;
}
</style>
