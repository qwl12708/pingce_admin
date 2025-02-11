<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->
<template>
  <div class="main-content min-h-screen bg-white">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 py-4 border-b">
        <h1 class="text-xl font-medium">其它配置</h1>
        <el-button type="primary" class="!rounded-button whitespace-nowrap">保存</el-button>
      </div>
      <div class="space-y-8">
        <!-- 服务协议 -->
        <div class="border-b pb-6">
          <h2 class="text-base font-medium mb-4">服务协议</h2>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-2">
              <el-icon><Document /></el-icon>
              <span class="text-gray-600">文件名称.pdf</span>
              <span class="text-gray-400 text-sm">3MB</span>
            </div>
            <div class="flex items-center gap-4">
              <el-button type="primary" plain class="!rounded-button whitespace-nowrap">
                <el-icon class="mr-1"><Upload /></el-icon>上传
              </el-button>
              <div class="flex gap-3">
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><View /></el-icon>
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><Download /></el-icon>
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><Delete /></el-icon>
              </div>
            </div>
          </div>
        </div>
        <!-- 隐私政策 -->
        <div class="border-b pb-6">
          <h2 class="text-base font-medium mb-4">隐私政策</h2>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-2">
              <el-icon><Document /></el-icon>
              <span class="text-gray-600">隐私政策.pdf</span>
              <span class="text-gray-400 text-sm">3MB</span>
            </div>
            <div class="flex items-center gap-4">
              <el-button type="primary" plain class="!rounded-button whitespace-nowrap">
                <el-icon class="mr-1"><Upload /></el-icon>上传
              </el-button>
              <div class="flex gap-3">
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><View /></el-icon>
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><Download /></el-icon>
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><Delete /></el-icon>
              </div>
            </div>
          </div>
        </div>
        <!-- 客户端管理使用说明文件 -->
        <div class="border-b pb-6">
          <h2 class="text-base font-medium mb-4">客户端管理使用说明文件</h2>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-2">
              <el-icon><Document /></el-icon>
              <span class="text-gray-600">使用说明.pdf</span>
              <span class="text-gray-400 text-sm">3MB</span>
            </div>
            <div class="flex items-center gap-4">
              <el-button type="primary" plain class="!rounded-button whitespace-nowrap">
                <el-icon class="mr-1"><Upload /></el-icon>上传
              </el-button>
              <div class="flex gap-3">
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><View /></el-icon>
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><Download /></el-icon>
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><Delete /></el-icon>
              </div>
            </div>
          </div>
        </div>
        <!-- 首页"微信咨询"链接二维码上传 -->
        <div class="border-b pb-6">
          <h2 class="text-base font-medium mb-4">首页"微信咨询"链接二维码上传</h2>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-2">
              <el-icon><Picture /></el-icon>
              <span class="text-gray-600">微信二维码.png</span>
              <span class="text-gray-400 text-sm">3MB</span>
            </div>
            <div class="flex items-center gap-4">
              <el-button type="primary" plain class="!rounded-button whitespace-nowrap">
                <el-icon class="mr-1"><Upload /></el-icon>上传
              </el-button>
              <div class="flex gap-3">
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><View /></el-icon>
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><Download /></el-icon>
                <el-icon class="cursor-pointer text-gray-400 hover:text-gray-600"><Delete /></el-icon>
              </div>
            </div>
          </div>
        </div>
        <!-- 客服电话 -->
        <div class="pb-6">
          <h2 class="text-base font-medium mb-4">客服电话</h2>
          <el-input v-model="servicePhone" placeholder="请输入客服电话" class="!w-[300px]" />
        </div>

        <!-- 网位展任务测评产品介绍 -->
        <div class="border-b pb-6">
          <h2 class="text-base font-medium mb-4">网位展任务测评产品介绍</h2>
          <WangEditor height="300px" v-model:value="networkEvaluation" />
        </div>
        <!-- 订制测评产品介绍 -->
        <div class="border-b pb-6">
          <h2 class="text-base font-medium mb-4">订制测评产品介绍</h2>
          <WangEditor height="300px" v-model:value="customEvaluation" />
        </div>
        <!-- 底部导航配置 -->
        <div class="pb-6">
          <h2 class="text-base font-medium mb-4">底部导航配置</h2>
          <WangEditor height="300px" v-model:value="footerNav" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Document, Picture, Upload, View, Download, Delete } from '@element-plus/icons-vue'
import WangEditor from '@/components/WangEditor/index.vue'

const networkEvaluation = ref('')
const customEvaluation = ref('')
const footerNav = ref('')
const servicePhone = ref('')
</script>
<style scoped>
.el-textarea :deep(.el-textarea__inner) {
  min-height: 120px !important;
  resize: none;
}
</style>
