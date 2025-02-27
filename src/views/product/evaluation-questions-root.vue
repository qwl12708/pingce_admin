<template>
  <div class="main-content min-h-screen bg-white p-6">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div v-for="(question, index) in questions" :key="index" class="mb-8">
        <div class="flex items-start space-x-4">
          <div class="flex-1">
            <div class="flex items-center mb-4">
              <span class="text-lg font-medium">{{ index + 1 }}、</span>
              <div class="flex-1 ml-2">
                <el-input
                  v-model="question.title"
                  :placeholder="question.placeholder"
                  class="w-full border-none bg-gray-50 rounded-md"
                />
              </div>
              <div class="flex items-center space-x-2 ml-4">
                <span class="text-gray-600">{{ question.type }}</span>
                <div class="flex space-x-2">
                  <el-button size="small" circle>
                    <el-icon><Message /></el-icon>
                  </el-button>
                  <el-button size="small" circle>
                    <el-icon><Document /></el-icon>
                  </el-button>
                  <el-button size="small" circle>
                    <el-icon><Download /></el-icon>
                  </el-button>
                  <el-button size="small" circle>
                    <el-icon><Share /></el-icon>
                  </el-button>
                  <el-button size="small" circle>
                    <el-icon><Files /></el-icon>
                  </el-button>
                  <el-button size="small" circle type="danger">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </div>
            </div>
            <div class="pl-6">
              <div class="mb-4">
                <div class="flex items-center space-x-4 mb-2">
                  <span class="text-gray-600 w-20">计分方式</span>
                  <el-select v-model="question.scoreType" class="w-48">
                    <el-option
                      v-for="option in scoreOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                  <span class="text-gray-600 ml-4">总分</span>
                  <el-input-number v-model="question.totalScore" :min="0" :max="100" class="w-24" />
                  <span>分</span>
                </div>
              </div>
              <div class="space-y-4">
                <div v-if="question.type !== '简答题' && question.type !== '论述题'">
                  <div v-for="(option, optIndex) in question.options" :key="optIndex" class="flex items-center">
                    <span class="mr-4">{{ String.fromCharCode(65 + optIndex) }}</span>
                    <el-input
                      v-model="option.content"
                      :placeholder="question.type === '填空题' ? '请输入正确答案' : '请输入选项内容'"
                      class="flex-1 border-none bg-gray-50 rounded-md"
                    />
                    <div class="flex items-center ml-4 space-x-4">
                      <template v-if="question.type === '多选题'">
                        <el-checkbox v-model="option.isCorrect">
                          <span class="text-gray-600">{{ option.score }}</span>
                        </el-checkbox>
                      </template>
                      <template v-else-if="question.type !== '填空题'">
                        <el-radio v-model="question.correctAnswer" :label="optIndex">
                          <span class="text-gray-600">{{ option.score }}</span>
                        </el-radio>
                      </template>
                      <template v-else>
                        <span class="text-gray-600">{{ option.score }}</span>
                      </template>
                      <el-button
                        v-if="question.type !== '填空题'"
                        type="primary"
                        link
                        @click="removeOption(question, optIndex)"
                      >
                        <el-icon><CircleClose /></el-icon>
                      </el-button>
                    </div>
                  </div>
                </div>
                <div v-else class="mt-4">
                  <el-input type="textarea" :rows="4" placeholder="请输入参考答案" class="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center space-x-4 mt-8">
        <el-button type="primary" class="!rounded-button">暂存</el-button>
        <el-button class="!rounded-button">不保存</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Message, Document, Download, Share, Files, Delete, CircleClose } from '@element-plus/icons-vue'
interface Option {
  content: string
  score: string
  isCorrect?: boolean
}
interface Question {
  title: string
  placeholder: string
  type: string
  scoreType: string
  totalScore: number
  options: Option[]
  correctAnswer: number
}
const scoreOptions = [
  { value: 'manual', label: '每个选项分数单独设置' },
  { value: 'auto', label: '系统自动计分' },
  { value: 'equal', label: '答对得分答错不得分' }
]
const questions = ref<Question[]>([
  {
    title: '',
    placeholder: '请输入题目内容',
    type: '单选题',
    scoreType: 'manual',
    totalScore: 5,
    options: [
      { content: '', score: '5分' },
      { content: '', score: '0分' }
    ],
    correctAnswer: 0
  },
  {
    title: '',
    placeholder: '地球上最大的海洋是太平洋—说',
    type: '判断题',
    scoreType: 'equal',
    totalScore: 5,
    options: [
      { content: '正确', score: '5分' },
      { content: '错误', score: '0分' }
    ],
    correctAnswer: 0
  },
  {
    title: '',
    placeholder: '下列关于地球自然资源的说法，正确的是',
    type: '多选题',
    scoreType: 'equal',
    totalScore: 10,
    options: [
      { content: '可再生资源包括太阳能、风能等', score: '2.5分' },
      { content: '矿产资源属于非可再生资源', score: '2.5分' },
      { content: '水资源循环利用不会枯竭', score: '2.5分' },
      { content: '森林资源合理利用可持续发展', score: '2.5分' }
    ],
    correctAnswer: 0
  },
  {
    title: '',
    placeholder: '中国最长的河流是_____，全长约6300千米',
    type: '填空题',
    scoreType: 'manual',
    totalScore: 5,
    options: [{ content: '长江', score: '5分' }],
    correctAnswer: 0
  },
  {
    title: '',
    placeholder: '简述地球大气层的主要作用',
    type: '简答题',
    scoreType: 'manual',
    totalScore: 10,
    options: [],
    correctAnswer: 0
  },
  {
    title: '',
    placeholder: '论述全球变暖对地球生态环境的影响及应对措施',
    type: '论述题',
    scoreType: 'manual',
    totalScore: 20,
    options: [],
    correctAnswer: 0
  }
])
const removeOption = (question: Question, index: number) => {
  if (question.options.length > 2) {
    question.options.splice(index, 1)
  }
}
</script>
<style scoped>
.el-input-number :deep(.el-input__wrapper) {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
