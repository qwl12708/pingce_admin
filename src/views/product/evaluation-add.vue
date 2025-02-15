<template>
  <div class="main-content min-h-screen bg-white p-6">
    <el-form :model="form" label-width="120px">
      <div class="space-y-6">
        <!-- 问题类型选择 -->
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <!-- 左列 -->
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">问卷类别：</span>
                <el-radio-group v-model="form.questionType" class="flex">
                  <el-radio :label="1">通用测评问问卷</el-radio>
                  <el-radio :label="2">岗位胜任力测评问卷</el-radio>
                  <el-radio :label="3">订制问卷</el-radio>
                  <el-radio :label="4">公益测评问卷</el-radio>
                </el-radio-group>
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">问卷名称：</span>
                <el-input v-model="form.questionnaireName" placeholder="请输入问卷名称" class="flex-1" />
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">标准作答时间：</span>
                <el-input-number
                  v-model="form.standardTime"
                  :min="1"
                  :max="999"
                  controls-position="right"
                  class="w-40"
                />
                <span class="ml-2 text-gray-600">分钟</span>
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">标准点数：</span>
                <el-input-number
                  v-model="form.standardPoints"
                  :min="0"
                  :max="100"
                  controls-position="right"
                  class="w-40"
                />
                <span class="ml-2 text-gray-600">分</span>
              </div>
            </div>
            <!-- 右列 -->
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">试题顺序：</span>
                <el-radio-group v-model="form.questionOrder" class="flex items-center space-x-4">
                  <el-radio :label="1">固定顺序</el-radio>
                  <el-radio :label="2">随机顺序</el-radio>
                </el-radio-group>
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">切换屏幕：</span>
                <el-radio-group v-model="form.screenSwitch" class="flex items-center space-x-4">
                  <el-radio :label="1">允许</el-radio>
                  <el-radio :label="2">禁止</el-radio>
                </el-radio-group>
                <el-input-number
                  v-if="form.screenSwitch === 1"
                  v-model="form.screenSwitchLimit"
                  :min="1"
                  :max="999"
                  placeholder="请输入限制切屏次数"
                  class="ml-8"
                  style="width: 220px"
                />
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">测评报告：</span>
                <el-select v-model="form.reportType" placeholder="请选择报告生成类别" class="flex-1">
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

        <div>
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <span class="w-32 text-gray-600">邀请函模板：</span>
              <el-select v-model="form.inviteTemplate" placeholder="请选择邀请函模板" class="flex-1">
                <el-option v-for="item in inviteTemplates" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
        </div>

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

        <!-- 邀请函和作答指引模板 -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <span class="w-32 text-gray-600">作答指引模板：</span>
              <el-select v-model="form.guideTemplate" placeholder="请选择作答指引模板" class="flex-1">
                <el-option v-for="item in guideTemplates" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
        </div>

        <!-- 右列文件上传 -->
        <div class="space-y-4">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-gray-700">测评报告模板文件</span>
              <el-upload action="#" :auto-upload="false" :limit="5">
                <el-button type="primary" class="!rounded-button">上传文件</el-button>
                <template #tip>
                  <div class="text-gray-400 text-sm mt-1">支持.docx.doc.pdf格式，不超过5MB</div>
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
                  <div class="text-gray-400 text-sm mt-1">支持多种格式文件，单个不超过5MB</div>
                </template>
              </el-upload>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex items-center justify-center space-x-4 pt-4">
          <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSubmit">提交</el-button>
          <el-button class="!rounded-button whitespace-nowrap" @click="handleCancel">取消</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import WangEditor from '@/components/WangEditor/index.vue'

const form = ref({
  inviteTemplate: '',
  richContent: '',
  guideTemplate: '',
  questionType: 1,
  questionnaireName: '',
  standardTime: 30,
  standardPoints: 100,
  questionOrder: 1,
  screenSwitch: 1,
  screenSwitchLimit: undefined,
  reportType: ''
})

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

const selectedProblem = ref('')
const contentLength = ref(0)
const editorRef = ref<HTMLElement | null>(null)
const handleContentChange = () => {
  if (editorRef.value) {
    contentLength.value = editorRef.value.textContent?.length || 0
  }
}

const qrCodeUrl = ''
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
