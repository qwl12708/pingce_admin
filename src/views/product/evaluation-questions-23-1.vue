<template>
  <div class="question-container">
    <!-- 题目列表 -->
    <el-card v-for="(question, index) in questions" :key="question.id" class="question-card">
      <!-- 卡片头部 -->
      <template #header>
        <div class="card-header">
          <span class="question-number">Q{{ index + 1 }}</span>
          <el-input v-model="question.title" placeholder="请输入题干" class="question-title" />
          <el-select v-model="question.type" placeholder="选择题型" class="type-selector">
            <el-option v-for="item in questionTypes" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

          <!-- 右侧工具栏 -->
          <div class="toolbar">
            <el-upload action="#" :show-file-list="false" :on-change="handleUpload">
              <el-button type="primary" link icon="Upload">附件</el-button>
            </el-upload>
            <el-button link icon="Top"></el-button>
            <el-button link icon="CopyDocument"></el-button>
            <el-button link icon="Delete" @click="removeQuestion(index)"></el-button>
          </div>
        </div>
      </template>

      <!-- 通用配置 -->
      <div class="common-config">
        <el-switch v-model="question.required" active-text="必答" />
        <el-input v-model="question.analysis" placeholder="题目解析" type="textarea" />
      </div>

      <!-- 题型特定配置 -->
      <div class="specific-config">
        <!-- 单选题 -->
        <div v-if="question.type === 'single'">
          <div v-for="(option, oIndex) in question.options" :key="oIndex">
            <el-radio v-model="question.answer" :label="option.label">
              <el-input v-model="option.text" />
              <el-input-number v-model="option.score" :min="0" />
            </el-radio>
          </div>
          <el-button @click="addOption(question)">添加选项</el-button>
        </div>

        <!-- 多选题 -->
        <div v-if="question.type === 'multiple'">
          <div v-for="(option, oIndex) in question.options" :key="oIndex">
            <el-checkbox v-model="question.answer" :label="option.label">
              <el-input v-model="option.text" />
            </el-checkbox>
          </div>
          <div class="limit-config">
            <span>最少选择：</span>
            <el-input-number v-model="question.minSelect" />
            <span>最多选择：</span>
            <el-input-number v-model="question.maxSelect" />
          </div>
        </div>

        <!-- 其他题型配置类似... -->
      </div>

      <!-- 附件展示区 -->
      <div class="attachments">
        <div v-for="file in question.attachments" :key="file.name">
          <el-tag type="info">{{ file.name }}</el-tag>
        </div>
      </div>
    </el-card>

    <!-- 底部操作栏 -->
    <div class="footer">
      <el-button type="primary" @click="addQuestion">新增题目</el-button>
      <el-button>预览</el-button>
      <el-button type="success">保存</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// 题目类型选项
const questionTypes = [
  { value: 'single', label: '单选题' },
  { value: 'multiple', label: '多选题' },
  { value: 'judge', label: '判断题' }
  // 其他题型...
]

// 题目数据
const questions = reactive([
  {
    id: 1,
    type: 'single',
    title: '',
    required: true,
    analysis: '',
    options: [
      { label: 'A', text: '', score: 0 },
      { label: 'B', text: '', score: 0 }
    ],
    answer: '',
    attachments: []
  }
])

// 添加新题目
const addQuestion = () => {
  questions.push({
    id: Date.now(),
    type: 'single',
    title: '',
    required: true,
    analysis: '',
    options: [],
    answer: '',
    attachments: []
  })
}

// 删除题目
const removeQuestion = index => {
  questions.splice(index, 1)
}

// 添加选项
const addOption = question => {
  const label = String.fromCharCode(65 + question.options.length)
  question.options.push({ label, text: '', score: 0 })
}

// 处理文件上传
const handleUpload = file => {
  const currentQuestion = questions[questions.length - 1]
  currentQuestion.attachments.push({
    name: file.name,
    url: URL.createObjectURL(file.raw)
  })
}
</script>

<style scoped>
.question-container {
  padding: 20px;
  background: #f5f7fa;
}

.question-card {
  margin-bottom: 20px;
  background: white;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.question-title {
  flex: 1;
}

.toolbar {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

.common-config {
  margin: 15px 0;
  display: flex;
  gap: 20px;
}

.specific-config {
  border-top: 1px solid #ebeef5;
  padding-top: 15px;
}

.attachments {
  margin-top: 15px;
  border-top: 1px dashed #ddd;
  padding-top: 10px;
}

.footer {
  margin-top: 20px;
  text-align: center;
}

.limit-config {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.el-radio,
.el-checkbox {
  margin: 8px 0;
}
</style>
