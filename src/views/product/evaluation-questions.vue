<template>
  <div class="questionnaire-editor">
    <!-- 头部操作区域 -->
    <div class="header">
      <el-button type="primary" @click="addQuestion">添加题目</el-button>
      <el-button type="success" @click="validateAndSave">保存问卷</el-button>

      <!-- 分页控件 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 50]"
          :total="questions.length"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>

    <!-- 题目编辑区域 -->
    <el-form ref="formRef" :model="questions" :rules="rules">
      <draggable
        v-model="currentPageQuestions"
        item-key="id"
        handle=".drag-handle"
        :group="{ name: 'questions' }"
        ghost-class="draggable-ghost"
        chosen-class="draggable-chosen"
        @end="handleDragEnd"
      >
        <template #item="{ element: q }">
          <div class="question-item">
            <el-card>
              <!-- 题目头部 -->
              <div class="question-header">
                <el-icon class="drag-handle"><Menu /></el-icon>

                <!-- 题目内容 -->
                <div class="question-content">
                  <el-form-item
                    :prop="`${getQuestionIndex(q.id)}.title`"
                    :rules="[{ required: true, message: '请输入题目内容', trigger: 'blur' }]"
                  >
                    <el-input v-model="q.title" placeholder="请输入题目内容" class="question-title" />
                  </el-form-item>
                </div>

                <!-- 操作控件 -->
                <div class="question-controls">
                  <el-tooltip content="复制题目">
                    <el-button type="primary" icon="DocumentCopy" @click="copyQuestion(q)" />
                  </el-tooltip>
                  <el-select v-model="q.type" placeholder="选择题型" @change="handleTypeChange(q)">
                    <el-option
                      v-for="type in questionTypes"
                      :key="type.value"
                      :label="type.label"
                      :value="type.value"
                    />
                  </el-select>
                  <el-tooltip content="删除题目">
                    <el-button type="danger" icon="Delete" @click="removeQuestion(q.id)" />
                  </el-tooltip>
                </div>
              </div>

              <!-- 题目主体内容 -->
              <div class="question-body">
                <div class="flex items-center space-x-4 mb-2">
                  <span class="text-gray-600 w-20">计分方式</span>
                  <el-select v-model="q.scoreType" class="w-48">
                    <el-option
                      v-for="option in scoreOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                  <span class="text-gray-600 ml-4">总分</span>
                  <el-input-number v-model="q.totalScore" :min="0" :max="100" class="w-24" />
                  <span>分</span>
                </div>

                <!-- 选项类题目 -->
                <template v-if="['radio', 'checkbox', 'judge'].includes(q.type)">
                  <el-form-item
                    :prop="`${getQuestionIndex(q.id)}.options`"
                    :rules="[{ validator: validateOptions, trigger: 'blur' }]"
                  >
                    <div class="options-container">
                      <div v-for="(opt, idx) in q.options" :key="idx" class="option-item">
                        <el-input v-model="opt.label" :disabled="q.type === 'judge'" class="option-input" />
                        <el-input-number v-model="opt.score" :min="0" :step="1" controls-position="right" />
                        <div style="cursor: pointer" @click="onChangeRadio(q.type, q.id, idx)">
                          {{ opt.isAnswer === true ? '✅' : '❌' }}
                        </div>
                        <el-button
                          v-if="q.type !== 'judge'"
                          type="danger"
                          icon="Delete"
                          @click="removeOption(q, idx)"
                        />
                      </div>
                      <el-button v-if="q.type !== 'judge'" @click="addOption(q)"> 添加选项 </el-button>
                    </div>
                  </el-form-item>
                </template>

                <!-- 填空题 -->
                <template v-else-if="q.type === 'fill'">
                  <el-form-item
                    :prop="`${getQuestionIndex(q.id)}.options`"
                    :rules="[{ validator: validateFillOptions, trigger: 'blur' }]"
                  >
                    <div class="fill-container">
                      <div v-for="(opt, idx) in q.options" :key="idx" class="fill-item">
                        <el-input v-model="opt.label" placeholder="填空项内容" style="width: 200px" />
                        <el-input-number v-model="opt.score" :min="0" :step="1" controls-position="right" />
                        <el-button type="danger" icon="Delete" @click="removeOption(q, idx)" />
                      </div>
                      <el-button @click="addFillOption(q)"> 添加填空项 </el-button>
                    </div>
                  </el-form-item>
                </template>

                <!-- 文本类题目 -->
                <template v-else>
                  <el-form-item
                    :prop="`${getQuestionIndex(q.id)}.answer`"
                    :rules="[{ required: true, message: '请输入参考答案', trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="q.answer"
                      :rows="q.type === 'short' ? 3 : 5"
                      type="textarea"
                      placeholder="请输入参考答案"
                    />
                  </el-form-item>
                </template>

                <!-- 通用设置 -->

                <el-form-item label="附件">
                  <el-upload
                    v-model:file-list="q.attachments"
                    multiple
                    :limit="5"
                    :before-upload="beforeUpload"
                    :on-remove="handleRemoveFile"
                    :http-request="handleUpload"
                  >
                    <el-button type="primary">上传附件</el-button>
                    <template #tip>
                      <div class="upload-tip">支持图片、音频、视频文件，单个不超过100MB</div>
                    </template>
                  </el-upload>
                  <div v-if="q.attachments.length" class="attachment-list">
                    <div v-for="file in q.attachments" :key="file.uid" class="attachment-item">
                      <el-link :href="file.url" target="_blank">
                        {{ file.name }}
                      </el-link>
                      <el-icon @click="handleRemoveFile(file, q.attachments)">
                        <Close />
                      </el-icon>
                    </div>
                  </div>
                </el-form-item>
              </div>
            </el-card>
          </div>
        </template>
      </draggable>
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Menu, Close } from '@element-plus/icons-vue'
import draggable from 'vuedraggable'

// 生成唯一ID
let questionId = 0
const generateId = () => Date.now() + questionId++

// 题目数据
const questions = ref([])
const formRef = ref()
const currentPage = ref(1)
const pageSize = ref(10)
const rules = []
const scoreOptions = [
  { value: '1', label: '唯一正确答案得分' },
  { value: '2', label: '人工判分' },
  { value: '3', label: '每个选项对应不同分值' },

  { value: '4', label: '全部答对得分' },
  { value: '5', label: '答对x个得几分，答错不得分' },

  { value: '6', label: '答出全部关键词才得分' },
  { value: '5', label: '答对x个关键词得几分' }
]

const scoreStandard = [
  { value: '1', label: '与答案完全相同' },
  { value: '2', label: '包含关键词即可' }
]

// 题型选项
const questionTypes = [
  { label: '单选题', value: 'radio' },
  { label: '多选题', value: 'checkbox' },
  { label: '判断题', value: 'judge' },
  { label: '填空题', value: 'fill' },
  { label: '简答题', value: 'short' },
  { label: '论述题', value: 'essay' }
]

// 初始化题目模板
const createQuestion = type => ({
  id: generateId(),
  type, // 题目类型
  title: '', // 标题
  description: '', // 描述
  scoreType: 1, // 计分方式
  totalScore: 5, // 分值
  options:
    type === 'judge'
      ? [
          { label: '正确', score: 1, isAnswer: true },
          { label: '错误', score: 0, isAnswer: false }
        ]
      : type === 'radio'
      ? [
          { label: '答案1', score: 1, isAnswer: true },
          { label: '答案2', score: 0, isAnswer: false },
          { label: '答案3', score: 0, isAnswer: false },
          { label: '答案4', score: 0, isAnswer: false }
        ]
      : [
          { label: '答案1', score: 1, isAnswer: true },
          { label: '答案2', score: 0, isAnswer: true },
          { label: '答案3', score: 0, isAnswer: false },
          { label: '答案4', score: 0, isAnswer: false }
        ], // 题目选项
  answer: type === 'judge' ? '正确' : type === 'checkbox' ? [] : '',
  attachments: [], // 附件
  correctAnswers: [] // 正确答案
})

// 分页处理
const currentPageQuestions = computed({
  get() {
    const start = (currentPage.value - 1) * pageSize.value
    return questions.value.slice(start, start + pageSize.value)
  },
  set(value) {
    const start = (currentPage.value - 1) * pageSize.value
    questions.value.splice(start, pageSize.value, ...value)
  }
})

// 添加题目
const addQuestion = () => {
  questions.value.push(createQuestion('radio'))
  // 跳转到最后一页
  currentPage.value = Math.ceil(questions.value.length / pageSize.value)
}

// 删除题目
const removeQuestion = id => {
  const index = questions.value.findIndex(q => q.id === id)
  questions.value.splice(index, 1)

  // 处理分页边界
  if (currentPageQuestions.value.length === 0 && currentPage.value > 1) {
    currentPage.value--
  }
}

// 复制题目
const copyQuestion = original => {
  const copied = JSON.parse(JSON.stringify(original))
  copied.id = generateId()
  copied.title += ' (副本)'
  copied.attachments = copied.attachments.map(file => ({
    ...file,
    uid: Symbol('file').toString()
  }))

  const index = questions.value.findIndex(q => q.id === original.id)
  questions.value.splice(index + 1, 0, copied)

  // 跳转到新题目所在页
  const newPage = Math.ceil((index + 2) / pageSize.value)
  currentPage.value = newPage
}

// 拖拽处理
const handleDragEnd = ({ oldIndex, newIndex }) => {
  const start = (currentPage.value - 1) * pageSize.value
  const realOldIndex = start + oldIndex
  const realNewIndex = start + newIndex

  const [moved] = questions.value.splice(realOldIndex, 1)
  questions.value.splice(realNewIndex, 0, moved)
}

// 题型切换处理
const handleTypeChange = q => {
  if (q.type === 'judge') {
    q.options = [
      { label: '正确', score: 1 },
      { label: '错误', score: 0 }
    ]
    q.answer = '正确'
  } else {
    q.options = []
    q.answer = q.type === 'checkbox' ? [] : ''
  }
}

// 选项操作
const addOption = q => {
  q.options.push({ label: '', score: 0 })
}

const removeOption = (q, index) => {
  q.options.splice(index, 1)
}

const addFillOption = q => {
  q.options.push({ label: '', score: 1 })
}

// 验证逻辑
const validateOptions = (_, value, callback) => {
  if (value.length < 2) {
    callback(new Error('至少需要2个选项'))
  } else if (value.some(opt => !opt.label.trim())) {
    callback(new Error('选项内容不能为空'))
  } else {
    callback()
  }
}

const validateFillOptions = (_, value, callback) => {
  if (value.length === 0) {
    callback(new Error('至少需要1个填空项'))
  } else if (value.some(opt => !opt.label.trim())) {
    callback(new Error('填空项内容不能为空'))
  } else {
    callback()
  }
}

// 文件上传处理
const beforeUpload = file => {
  const isAllowedType = ['image', 'audio', 'video'].some(type => file.type.startsWith(type))
  const isLt100M = file.size / 1024 / 1024 < 100

  if (!isAllowedType) {
    ElMessage.error('仅支持图片、音频、视频文件')
    return false
  }
  if (!isLt100M) {
    ElMessage.error('文件大小不能超过100MB')
    return false
  }
  return true
}

const handleUpload = async ({ file }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        uid: file.uid,
        name: file.name,
        url: URL.createObjectURL(file),
        raw: file
      })
    }, 1000)
  })
}

const handleRemoveFile = file => {
  URL.revokeObjectURL(file.url)
}

// 保存处理
const validateAndSave = async () => {
  try {
    await formRef.value.validate()
    const data = questions.value.map(q => ({
      ...q,
      attachments: q.attachments.map(f => ({
        name: f.name,
        url: f.url,
        type: f.raw.type
      }))
    }))
    console.log('保存数据:', data)
    ElMessage.success('保存成功')
  } catch (err) {
    ElMessage.error('请检查表单填写是否正确')
  }
}

// 辅助方法
const getQuestionIndex = id => {
  return questions.value.findIndex(q => q.id === id)
}

const onChangeRadio = (qType, qId, idx) => {
  const options = questions.value.find(e => e.id === qId).options
  if (qType === 'checkbox') {
    options[idx].isAnswer = true
    return
  }
  options.forEach(e => {
    e.isAnswer = false
  })
  options[idx].isAnswer = true
  questions.value = [...questions.value]
}

const handleSizeChange = () => {}
const handlePageChange = () => {}
</script>

<style scoped>
.questionnaire-editor {
  max-width: 1200px;
  min-height: 100vh;
  margin: 20px auto;
  padding: 0 20px;
}

.header {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  align-items: center;
}

.pagination {
  margin-left: auto;
}

.question-item {
  margin-bottom: 20px;
}

.question-header {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  margin-bottom: 15px;
}

.drag-handle {
  cursor: move;
  color: #999;
  margin-top: 10px;
}

.question-content {
  flex: 1;
  min-width: 400px;
}

.question-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.options-container {
  margin: 15px 0;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.fill-item {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.question-settings {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.attachment-list {
  margin-top: 10px;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 5px 0;
}

.draggable-ghost {
  opacity: 0.5;
  background: #f5f7fa;
  border: 2px dashed #409eff;
}

.draggable-chosen {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: rotate(2deg);
}
</style>
