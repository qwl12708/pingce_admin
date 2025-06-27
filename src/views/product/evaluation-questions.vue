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
        <template #item="{ element: q, index }">
          <div class="question-item">
            <el-card>
              <!-- 题目头部 -->
              <div class="question-header">
                <el-icon class="drag-handle"><Menu /></el-icon>
                <span class="question-order">{{ index + 1 }}</span>

                <!-- 题目内容 -->
                <div class="question-content">
                  <el-form-item
                    :prop="`${getQuestionIndex(q.id)}.name`"
                    :rules="[{ required: true, message: '请输入题目内容', trigger: 'blur' }]"
                  >
                    <el-input v-model="q.name" placeholder="请输入题目内容" class="question-name" />
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
                  <span class="text-gray-600 w-20">计分方式：</span>
                  <el-select v-model="q.check_content.scoring_type" class="w-48">
                    <el-option
                      v-for="option in optionsMap[q.type]"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                  <template v-if="q.check_content.scoring_type === 7">
                    <span class="text-gray-600 ml-4">答对</span>
                    <el-input-number v-model="q.check_content.num" :min="0" :max="100" class="w-24" />
                    <span class="text-gray-600">个</span>
                  </template>
                  <span class="text-gray-600 ml-4">分值：</span>
                  <el-input-number v-model="q.score" :min="0" :max="100" class="w-24" />

                  <!-- 仅简答题和论述题显示评判标准单选框 -->
                  <template v-if="['short', 'essay'].includes(q.type)">
                    <span class="ml-4 text-gray-500">评判标准:</span>

                    <el-radio-group v-model="q.check_content.check_standard" class="ml-2">
                      <el-radio v-for="item in scoreStandard" :key="item.value" :label="item.value">
                        {{ item.label }}
                      </el-radio>
                    </el-radio-group>
                  </template>
                </div>

                <!-- 选项类题目 -->
                <template v-if="['radio', 'checkbox', 'judge'].includes(q.type)">
                  <el-form-item
                    :prop="`${getQuestionIndex(q.id)}.options`"
                    :rules="[{ validator: validateOptions, trigger: 'blur' }]"
                  >
                    <div class="options-container">
                      <el-button v-if="q.type !== 'judge'" @click="addOption(q)"> 添加选项 </el-button>

                      <div v-for="(opt, idx) in q.options" :key="idx" class="option-item">
                        <el-input v-model="opt.title" :disabled="q.type === 'judge'" class="option-input" />
                        <el-input-number v-model="opt.score" :min="0" :step="1" controls-position="right" />
                        <div style="cursor: pointer" @click="onChangeRadio(q, idx)">
                          {{ opt.answer === 1 ? '✅' : '❌' }}
                        </div>
                        <el-button
                          v-if="q.type !== 'judge'"
                          type="danger"
                          icon="Delete"
                          @click="removeOption(q, idx)"
                        />
                      </div>
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
                      <el-button @click="addFillOption(q)"> 添加填空项 </el-button>
                      <div v-for="(opt, idx) in q.options" :key="idx" class="fill-item">
                        <el-input v-model="opt.title" placeholder="请填入答案" style="width: 200px" />
                        <el-input-number v-model="opt.score" :min="0" :step="1" controls-position="right" />
                        <el-button type="danger" icon="Delete" @click="removeOption(q, idx)" />
                      </div>
                    </div>
                  </el-form-item>
                </template>

                <!-- 文本类题目 -->
                <template v-else>
                  <el-form-item
                    :prop="`${getQuestionIndex(q.id)}._content`"
                    :rules="[{ required: true, message: '请输入答案', trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="q._content"
                      :rows="q.type === 'short' ? 3 : 5"
                      type="textarea"
                      placeholder="多个关键词之间请用中文分号；隔开。 "
                    />
                  </el-form-item>
                </template>

                <!-- 通用设置 -->
                <el-form-item label="附件" prop="attachments">
                  <ImageUploader v-model="q.attachments" multiple tip="支持图片、音频、视频文件，单个不超过10MB" />
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Menu } from '@element-plus/icons-vue'
import draggable from 'vuedraggable'
import ImageUploader from '@/components/ImageUploader/new.vue'
import { getQuestionnaireQuestionList as getQuestionnaireQuestion, handleQuestionnaireQuestion } from '@/api/product'
import router from '@/router'

// 生成唯一ID
let questionId = 0
const generateId = () => Date.now() + questionId++

const questionnaire_id = ref('')
const del_id = ref('')
const originalQuestionIds = ref([])

// 题目数据
const questions = ref([])
const formRef = ref()
const currentPage = ref(1)
const pageSize = ref(10)
const rules = []

const radioOptions = [
  { value: 1, label: '唯一正确答案得分' },
  { value: 2, label: '人工判分' },
  { value: 3, label: '每个选项对应不同分值' }
]

const checkboxOptions = [
  { value: 2, label: '人工判分' },
  { value: 3, label: '每个选项对应不同分值' },
  { value: 4, label: '全部答对得分' },
  { value: 7, label: '答对__个得几分，答错不得分' }
]

const judgeOptions = [
  { value: 1, label: '唯一正确答案得分' },
  { value: 2, label: '人工判分' },
  { value: 3, label: '每个选项对应不同分值' }
]
const fillOptions = [
  { value: 2, label: '人工判分' },
  { value: 3, label: '每个选项对应不同分值' },
  { value: 4, label: '全部答对得分' },
  { value: 7, label: '答对__个得几分，答错不得分' }
]
const shortOptions = [
  { value: 2, label: '人工判分' },
  { value: 6, label: '答出全部关键词才得分' },
  { value: 7, label: '答对__个关键词得几分' }
]

const scoreStandard = [
  { value: 1, label: '与答案完全相同' },
  { value: 2, label: '包含关键词即可' }
]
const optionsMap = {
  radio: radioOptions,
  checkbox: checkboxOptions,
  judge: judgeOptions,
  fill: fillOptions,
  short: shortOptions,
  essay: shortOptions
}
// 题型选项
const questionTypes = [
  { label: '单选题', value: 'radio' },
  { label: '多选题', value: 'checkbox' },
  { label: '判断题', value: 'judge' },
  { label: '填空题', value: 'fill' },
  { label: '简答题', value: 'short' },
  { label: '论述题', value: 'essay' }
]

const route = useRoute()

onMounted(async () => {
  const questionnaireId = route.query.id
  if (questionnaireId) {
    questionnaire_id.value = questionnaireId
    // 编辑页面，获取问卷调查试题内容
    const { data } = await getQuestionnaireQuestion({ questionnaire_id: questionnaireId })
    questions.value = data.map(q => ({
      ...q,
      type: convertType(q.type),
      check_content: {
        ...q.check_content,
        scoring_type: convertScoringType(q.check_content.scoring_type)
      },
      _content: typeof q.content[0] === 'string' ? q.content.join('；') : '',
      options: q.content,
      attachments: (q.attachments || []).map(f => ({
        name: f.name,
        url: f.url,
        type: f.type,
        uid: Symbol('file').toString()
      }))
    }))
    originalQuestionIds.value = questions.value.map(q => q.id)
  }
})

// 初始化题目模板
const createQuestion = (type = 'radio') => ({
  id: generateId(),
  type, // 题目类型
  name: '', // 标题
  score: 5, // 分值
  check_content: {
    scoring_type: 2, // 计分方式
    num: 1, // 答出多少个关键词，得num分
    check_standard: 1 // 评判标准  1: 与答案完全相同，2：包含答案即可
  },
  _content: '',
  options:
    type === 'judge'
      ? [
          { title: '正确', score: 1, answer: 1 },
          { title: '错误', score: 0, answer: 0 }
        ]
      : type === 'radio'
      ? [
          { title: '选项A', score: 1, answer: 1 },
          { title: '选项B', score: 0, answer: 0 },
          { title: '选项C', score: 0, answer: 0 },
          { title: '选项D', score: 0, answer: 0 }
        ]
      : [
          { title: '选项A', score: 1, answer: 1 },
          { title: '选项B', score: 0, answer: 1 },
          { title: '选项C', score: 0, answer: 0 },
          { title: '选项D', score: 0, answer: 0 }
        ], // 题目选项
  attachments: [] // 附件
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
  // 若是编辑页
  if (questionnaire_id.value) {
    del_id.value += `,${id}`
  }

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
  copied.name += ' (副本)'
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
      { title: '正确', score: 1 },
      { title: '错误', score: 0 }
    ]
  } else {
    q.options = []
  }
}

// 选项操作
const addOption = q => {
  q.options.push({ title: '', score: 0 })
}

const removeOption = (q, index) => {
  q.options.splice(index, 1)
}

const addFillOption = q => {
  q.options.push({ title: '', score: 1 })
}

// 验证逻辑
const validateOptions = (_, value, callback) => {
  if (value.length < 2) {
    callback(new Error('至少需要2个选项'))
  } else if (value.some(opt => !opt.title.trim())) {
    callback(new Error('选项内容不能为空'))
  } else {
    callback()
  }
}

const validateFillOptions = (_, value, callback) => {
  if (value.length === 0) {
    callback(new Error('至少需要1个填空项'))
  } else if (value.some(opt => !opt.title.trim())) {
    callback(new Error('填空项内容不能为空'))
  } else {
    callback()
  }
}

const getParams = () => {
  const params = { questionnaire_id: questionnaire_id.value, del_id: del_id.value }
  const _questions = questions.value.map(item => {
    const { options, attachments, type, _content, ...rest } = item
    const _attachments = attachments.map(e => e.url)
    const _type = getType(type)
    let content = questionnaire_id.value ? options : options.map(({ id, ...rest }) => ({ ...rest }))

    // 新增题目时不传id
    let _rest = { ...rest }
    if (!originalQuestionIds.value.includes(item.id)) {
      _rest = { ...rest, id: null }
    }

    if (['short', 'essay'].includes(type) && typeof _content === 'string') {
      content = _content.split('；')
    } // fill type => { title, answer, score }

    return { ..._rest, content, type: _type, attachments: _attachments }
  })
  params.content = _questions

  return params
}

const getType = type => questionTypes.findIndex(e => e.value === type) + 1

// 保存处理
const validateAndSave = async () => {
  console.log('questions', questions.value)

  try {
    await formRef.value.validate()

    const p = getParams()
    const { content, ...rest } = p
    console.log('保存数据', p)
    // console.log('保存数据', { ...rest, content: JSON.stringify(content) })
    await handleQuestionnaireQuestion({ ...rest, content: JSON.stringify(content) })
    ElMessage.success('保存成功')
    router.push('/product/evaluation')
  } catch (err) {
    console.error('err', err)
    ElMessage.error('请检查表单填写是否正确')
  }
}

// 辅助方法
const getQuestionIndex = id => {
  return questions.value.findIndex(q => q.id === id)
}

const onChangeRadio = ({ type: qType, score, id: qId }, idx) => {
  const options = questions.value.find(e => e.id === qId).options
  if (qType === 'checkbox') {
    options[idx].answer = options[idx].answer === 1 ? 0 : 1
    return
  }
  options.forEach(e => {
    e.answer = 0
    e.score = 0
  })
  options[idx].answer = 1
  options[idx].score = score
  questions.value = [...questions.value]
}

const handleSizeChange = () => {}
const handlePageChange = () => {}

const convertType = type => {
  const typeMap = ['radio', 'checkbox', 'judge', 'fill', 'short', 'essay']
  return typeMap[type - 1] || 'radio'
}

const convertScoringType = scoringType => {
  const scoringTypeMap = [1, 2, 3, 4, 5, 6, 7]
  return scoringTypeMap[scoringType - 1] || 2
}
</script>

<style scoped>
.questionnaire-editor {
  min-height: 100vh;
  margin: 20px auto;
  padding: 0 20px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 20px;
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

.question-order {
  margin-top: 5px;
  font-weight: bold;
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
