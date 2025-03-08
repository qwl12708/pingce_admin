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
                <el-radio-group v-model="form.type" class="flex">
                  <el-radio :label="1">通用测评问问卷</el-radio>
                  <el-radio :label="2">岗位胜任力测评问卷</el-radio>
                  <el-radio :label="3">订制问卷</el-radio>
                  <el-radio :label="4">公益测评问卷</el-radio>
                </el-radio-group>
              </div>

              <div v-if="form.type == 2" class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">岗位类别：</span>
                <el-select v-model="form.post_type" allow-create filterable placeholder="选择岗位类别">
                  <el-option v-for="item in industryOptions" :key="item" :label="item" :value="item" />
                </el-select>
              </div>

              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">岗位名称：</span>
                <el-input v-model="form.job" placeholder="请输入岗位名称" class="flex-1" />
              </div>

              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">问卷名称：</span>
                <el-input v-model="form.name" placeholder="请输入问卷名称" class="flex-1" />
              </div>

              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">标准作答时间：</span>
                <el-input-number
                  v-model="form.answer_time"
                  :min="1"
                  :max="999"
                  controls-position="right"
                  class="w-40"
                />
                <span class="ml-2 text-gray-600">分钟</span>
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">标准点数：</span>
                <el-input-number v-model="form.score" :min="0" :max="100" controls-position="right" class="w-40" />
                <span class="ml-2 text-gray-600">分</span>
              </div>
            </div>
            <!-- 右列 -->
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">试题顺序：</span>
                <el-radio-group v-model="form.is_rand" class="flex items-center space-x-4">
                  <el-radio :label="1">固定顺序</el-radio>
                  <el-radio :label="2">随机顺序</el-radio>
                </el-radio-group>
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">切换屏幕：</span>
                <el-radio-group v-model="form.is_switching_screens" class="flex items-center space-x-4">
                  <el-radio :label="1">允许</el-radio>
                  <el-radio :label="2">禁止</el-radio>
                </el-radio-group>
                <el-input-number
                  v-if="form.is_switching_screens === 1"
                  v-model="form.switching_screens_num"
                  :min="1"
                  :max="999"
                  placeholder="请输入限制切屏次数"
                  class="ml-8"
                  style="width: 220px"
                />
              </div>
              <div class="flex items-center space-x-4">
                <span class="w-32 text-gray-600">测评报告类别：</span>
                <el-select v-model="form.report_type" placeholder="请选择报告生成类别" class="flex-1">
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
        <div>问卷简介：</div>
        <!-- 富文本编辑器 -->
        <WangEditor height="400px" v-model:value="editorRef" />

        <div>
          <div class="space-y-4 mb-4">
            <div class="flex items-center space-x-4">
              <span class="w-32 text-gray-600">邀请函模板：</span>
              <el-select v-model="form.invite_id" placeholder="请选择邀请函模板" class="flex-1">
                <el-option v-for="item in templateOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </div>
          <!-- 注意事项 -->
          <WangEditor height="400px" v-model:value="inviteTemplateContent" />
        </div>

        <!-- 左列文件上传 -->
        <div class="space-y-4">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-gray-700">测评问卷文件</span>
              <div class="flex items-center">
                <FileUploader v-model:value="form.questionnaire_path" />
                <div class="text-gray-400 text-sm mt-2 ml-2">支持.docx.doc.pdf格式，不超过5MB</div>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-gray-700">测评结果横向对比汇总表模板</span>
              <div class="flex items-center">
                <FileUploader v-model:value="form.result_path" />
                <div class="text-gray-400 text-sm mt-2 ml-2">支持.docx.doc.pdf格式，不超过5MB</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 作答指引模板 -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <span class="w-32 text-gray-600">作答指引模板：</span>
              <el-select v-model="form.answer_id" placeholder="请选择作答指引模板" class="flex-1">
                <el-option v-for="item in guideTemplates" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </div>
        </div>

        <!-- 右列文件上传 -->
        <div class="space-y-4">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-gray-700">测评报告模板文件</span>
              <div class="flex items-center">
                <FileUploader v-model:value="form.report_path" />
                <div class="text-gray-400 text-sm mt-2 ml-2">支持.docx.doc.pdf格式，不超过5MB</div>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-gray-700">说明或样本文件</span>
              <div class="flex items-center">
                <FileUploader v-model:value="form.info_path" />
                <div class="text-gray-400 text-sm mt-2 ml-2">支持.docx.doc.pdf格式，不超过5MB</div>
              </div>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  getQuestionnaireInfo,
  addQuestionnaire,
  editQuestionnaire,
  getJobTypeList,
  getInviteTemplateList,
  getAnswerTemplateList
} from '@/api/product'
import WangEditor from '@/components/WangEditor/index.vue'
import FileUploader from '@/components/FileUploader/index.vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const form = ref({
  type: 1,
  post_type: undefined,
  job: undefined,
  name: '',
  answer_time: 30,
  score: 100,
  is_rand: 1,
  switching_screens_num: 0,
  is_switching_screens: 1,
  report_type: 1,
  info: '',
  invite_id: '',
  answer_id: '',
  questionnaire_path: '',
  result_path: '',
  report_path: '',
  info_path: ''
})

const reportTypes = [
  { value: 1, label: '人工编制' },
  { value: 2, label: '系统生成' }
]
const problemTips = ref('请详细描述您遇到的问题，包含具体的操作步骤、错误提示等信息，以便我们更好地为您解决问题。')

const inviteTemplateContent = computed(() => templateOptions.value.find(e => e.id === form.value.invite_id)?.intro)

const guideTemplates = ref([])

const selectedProblem = ref('')
const contentLength = ref(0)
const editorRef = ref<HTMLElement | null>(null)
const industryOptions = ref([])
const templateOptions = ref([])

onMounted(async () => {
  if (route.query.id) {
    fetchProductDetail(Number(route.query.id))
  }

  const { data } = await getJobTypeList()
  industryOptions.value = data || []

  const res = await getInviteTemplateList({ page: 1, pageSize: 100 })
  templateOptions.value = res.data || []

  const guideOptionsRes = await getAnswerTemplateList({ page: 1, pageSize: 100 })
  guideTemplates.value = guideOptionsRes.data.list || []
})

const handleContentChange = () => {
  if (editorRef.value) {
    contentLength.value = editorRef.value.textContent?.length || 0
  }
}

const fetchProductDetail = async (id: number) => {
  const { data } = await getQuestionnaireInfo({ id })
  Object.assign(form.value, data)
}

const handleSubmit = async () => {
  const p = { ...form.value, info: editorRef.value, switching_screens_num: form.value.switching_screens_num || 0 }
  const action = route.query.id ? editQuestionnaire : addQuestionnaire
  try {
    await action(p)
    ElMessage.success('提交成功')
  } catch (error) {
    ElMessage.error('提交失败')
  }
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
