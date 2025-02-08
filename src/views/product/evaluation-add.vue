<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="mx-auto max-w-7xl bg-white rounded-lg shadow-sm p-8">
      <div class="space-y-6">
        <!-- 问题类型选择 -->
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <!-- 左列 -->
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">问卷类别：</span>
                <el-radio-group v-model="questionType" class="flex items-center space-x-4">
                  <el-radio :label="1">单维度问卷</el-radio>
                  <el-radio :label="2">多维度问卷</el-radio>
                </el-radio-group>
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">问卷名称：</span>
                <el-input v-model="questionnaireName" placeholder="请输入问卷名称" class="flex-1" />
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">标准作答时间：</span>
                <el-input-number v-model="standardTime" :min="1" :max="999" controls-position="right" class="w-40" />
                <span class="ml-2 text-gray-600">分钟</span>
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">标准点数：</span>
                <el-input-number v-model="standardPoints" :min="0" :max="100" controls-position="right" class="w-40" />
                <span class="ml-2 text-gray-600">分</span>
              </div>
            </div>
            <!-- 右列 -->
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">试题顺序：</span>
                <el-radio-group v-model="questionOrder" class="flex items-center space-x-4">
                  <el-radio :label="1">固定顺序</el-radio>
                  <el-radio :label="2">随机顺序</el-radio>
                </el-radio-group>
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">切换屏幕：</span>
                <el-radio-group v-model="screenSwitch" class="flex items-center space-x-4">
                  <el-radio :label="1">允许</el-radio>
                  <el-radio :label="2">禁止</el-radio>
                </el-radio-group>
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">问题类型：</span>
                <el-select v-model="selectedProblem" placeholder="请选择具体问题类型" class="flex-1">
                  <el-option v-for="item in problemOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">测评报告：</span>
                <el-select v-model="reportType" placeholder="请选择报告生成类别" class="flex-1">
                  <el-option v-for="item in reportTypes" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <!-- 提示信息框 -->
        <div v-if="selectedProblem" class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div class="flex items-start">
            <el-icon class="text-blue-500 mt-1"><Warning /></el-icon>
            <p class="ml-2 text-gray-600">{{ problemTips }}</p>
          </div>
        </div>
        <!-- 富文本编辑器 -->
        <WangEditor height="400px" v-model:value="editorRef" />

        <!-- 邀请函和作答指引模板 -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <span class="w-32 text-gray-600">邀请函模板：</span>
              <el-select v-model="inviteTemplate" placeholder="请选择邀请函模板" class="flex-1">
                <el-option v-for="item in inviteTemplates" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <span class="w-32 text-gray-600">作答指引模板：</span>
              <el-select v-model="guideTemplate" placeholder="请选择作答指引模板" class="flex-1">
                <el-option v-for="item in guideTemplates" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
        </div>

        <!-- 文件上传区域 -->
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <!-- 左列文件上传 -->
            <div class="space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">测评问卷文件</span>
                  <el-upload action="#" :auto-upload="false" :limit="1">
                    <el-button type="primary" class="!rounded-button">上传文件</el-button>
                    <template #tip>
                      <div class="text-gray-400 text-sm mt-1">支持 .xlsx .xls 格式，大小不超过10MB</div>
                    </template>
                  </el-upload>
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">测评结果横向对比汇总表模板</span>
                  <el-upload action="#" :auto-upload="false" :limit="1">
                    <el-button type="primary" class="!rounded-button">上传文件</el-button>
                    <template #tip>
                      <div class="text-gray-400 text-sm mt-1">支持 .xlsx .xls 格式，大小不超过10MB</div>
                    </template>
                  </el-upload>
                </div>
              </div>
            </div>

            <!-- 右列文件上传 -->
            <div class="space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">测评报告模板文件</span>
                  <el-upload action="#" :auto-upload="false" :limit="1">
                    <el-button type="primary" class="!rounded-button">上传文件</el-button>
                    <template #tip>
                      <div class="text-gray-400 text-sm mt-1">支持 .docx .doc .pdf 格式</div>
                    </template>
                  </el-upload>
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">说明或样本文件</span>
                  <el-upload action="#" :auto-upload="false" :limit="5">
                    <el-button type="primary" class="!rounded-button">上传文件</el-button>
                    <template #tip>
                      <div class="text-gray-400 text-sm mt-1">支持多种格式文件，单个不超过50MB</div>
                    </template>
                  </el-upload>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 注意事项 -->
        <div class="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 class="font-medium">请注意以下事项：</h3>
          <ol class="list-inside space-y-2 text-gray-600">
            <li>您好，感谢您参加【项目名称】测评项目，在正式开始测评前请了解以下内容：</li>
            <li>
              1、请您做好充分的作答准备后，再开始本测评，包括不被打断的时间、不受干扰的空间、适合的身体和精神状态（避免疲劳、突然要上厕所、疾病干扰等）。另外，请检查您的手机、计算机设备是否符合要求、电源和网络是否稳定。
            </li>
            <li>
              2、本测评具有时间限制，答题过程中请注意答题进度，整个测评共【测评题数】道题，请在【测评时长】分钟内完成。同时，测评一旦开始就不能中断，若您中途自行离开，系统将继续计时，没有作答的题目将不予统计。
            </li>
            <li>3、本测评请在【测评起始时间】至【测评截止时间】间完成，超过截止时间将不能参加测评。</li>
            <li>
              4、如果您已做好测评准备，并准备马上答题，请用微信扫描下方二维码，或点击下面网页链接进入测评页面。如果尚未准备好，也可在截止日期前其它方便的时间，通过以上方式登录系统进行测评。
            </li>
          </ol>
          <div class="flex items-center justify-between mt-4">
            <div class="text-center">
              <img :src="qrCodeUrl" alt="联系我们" class="w-32 h-32 mx-auto" />
              <p class="text-sm text-gray-500 mt-2">扫码联系技术支持</p>
            </div>
          </div>
        </div>
        <!-- 操作按钮 -->
        <div class="flex items-center justify-center space-x-4 pt-4">
          <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSubmit">提交</el-button>
          <el-button class="!rounded-button whitespace-nowrap" @click="handleCancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import WangEditor from '@/components/WangEditor/index.vue'

const inviteTemplate = ref('')
const richContent = ref('')
const guideTemplate = ref('')

const inviteTemplates = [
  { value: '1', label: '标准邀请函模板' },
  { value: '2', label: '正式邀请函模板' },
  { value: '3', label: '简约邀请函模板' }
]

const guideTemplates = [
  { value: '1', label: '通用作答指引模板' },
  { value: '2', label: '详细作答指引模板' },
  { value: '3', label: '简易作答指引模板' }
]
const questionType = ref(1)
const questionnaireName = ref('')
const standardTime = ref(30)
const standardPoints = ref(100)
const questionOrder = ref(1)
const screenSwitch = ref(1)
const selectedProblem = ref('')
const reportType = ref('')
const contentLength = ref(0)
const editorRef = ref<HTMLElement | null>(null)
const handleContentChange = () => {
  if (editorRef.value) {
    contentLength.value = editorRef.value.textContent?.length || 0
  }
}

const qrCodeUrl = 'https://ai-public.mastergo.com/ai/img_res/76dfbf25ffcd75d149e24cd108e3d79f.jpg'
const problemOptions = [
  { value: '1', label: '职业性格测评' },
  { value: '2', label: '领导力测评' },
  { value: '3', label: '团队协作能力' },
  { value: '4', label: '压力应对能力' }
]
const reportTypes = [
  { value: '1', label: '标准报告' },
  { value: '2', label: '详细报告' },
  { value: '3', label: '专业报告' }
]
const problemTips = ref('请详细描述您遇到的问题，包含具体的操作步骤、错误提示等信息，以便我们更好地为您解决问题。')
const handleSubmit = () => {
  // 处理提交逻辑
}
const handleCancel = () => {
  // 处理取消逻辑
}
</script>
<style scoped>
.el-upload {
  width: auto;
}
.el-upload-list {
  margin-top: 8px;
}
.el-upload-list {
  margin-top: 8px;
}
.el-textarea__inner {
  border: none !important;
  box-shadow: none !important;
}
.upload-demo {
  width: 100%;
}
[contenteditable='true'] img {
  max-width: 100%;
  height: auto;
}
[contenteditable='true']:empty:before {
  content: '请详细描述问卷的目的、适用对象、注意事项等信息...';
  color: #999;
}
</style>
