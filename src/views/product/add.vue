<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-8">新增/编辑产品套餐</h2>

    <div class="space-y-6">
      <!-- 基础信息 -->
      <div class="grid gap-6">
        <div class="form-item">
          <label class="required-label">套餐名称</label>
          <el-input v-model="form.name" placeholder="请输入" class="input" />
        </div>

        <div class="form-item">
          <label class="required-label">套餐类别</label>
          <div class="flex items-center gap-8">
            <el-radio-group v-model="form.type">
              <el-radio label="package">包年/月</el-radio>
              <el-radio label="points">点数</el-radio>
            </el-radio-group>
            <el-input
              v-show="form.type === 'points'"
              v-model="form.points"
              placeholder="请输入点数"
              class="input-176px"
            />
          </div>
        </div>

        <div class="form-item">
          <label class="required-label">限售地区</label>
          <div class="flex items-center gap-8">
            <el-radio-group v-model="form.areaType">
              <el-radio label="unlimited">不限</el-radio>
              <el-radio label="limited">仅限</el-radio>
            </el-radio-group>
            <el-select
              v-show="form.areaType === 'limited'"
              v-model="form.areas"
              multiple
              placeholder="请选择地区(可多选)"
              class="input-176px"
            >
              <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>

        <div class="form-item">
          <label class="required-label">使用期限</label>
          <el-select v-model="form.duration" placeholder="请选择" class="w-[480px]">
            <el-option v-for="item in durationOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>

        <div class="form-item">
          <label class="required-label">产品价格</label>
          <div class="flex items-center gap-2">
            <el-input v-model="form.price" placeholder="请输入" class="w-[480px]" />
            <span class="text-gray-600">元</span>
          </div>
        </div>
      </div>

      <!-- 测评问卷配置 -->
      <div class="space-y-4">
        <div class="form-item">
          <label class="required-label">选择测评问卷</label>
          <el-radio-group v-model="form.questionnaireType">
            <el-radio label="all">所有问卷（不含订制）</el-radio>
          </el-radio-group>
        </div>

        <div class="pl-6 space-y-4">
          <div class="form-item">
            <el-radio v-model="form.questionnaire" label="general" checked> 通用测评问卷 </el-radio>
            <el-select v-model="form.generalQuestionnaire" placeholder="请选择问卷" class="ml-4 w-[360px]">
              <el-option
                v-for="item in questionnaireOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div class="form-item opacity-50">
            <el-radio disabled label="job">岗位胜任力测评问卷</el-radio>
            <el-select disabled placeholder="请选择问卷" class="ml-4 w-[360px]" />
          </div>

          <div class="form-item opacity-50">
            <el-radio disabled label="personality">性格测评问卷</el-radio>
            <el-select disabled placeholder="请选择问卷" class="ml-4 w-[360px]" />
          </div>

          <div class="form-item opacity-50">
            <el-radio disabled label="custom">订制问卷</el-radio>
            <el-select disabled placeholder="请选择问卷" class="ml-4 w-[360px]" />
          </div>
        </div>
      </div>

      <!-- 数据展示表格 -->
      <el-table style="width: 75%" :data="tableData" border class="mt-8">
        <el-table-column prop="code" label="套餐编号" />
        <el-table-column prop="name" label="套餐名称" />
        <el-table-column prop="type" label="类别" />
        <el-table-column prop="questionnaire" label="可使用问卷" />
        <el-table-column prop="area" label="限售地区" />
        <el-table-column prop="price" label="产品价格(元)" />
        <el-table-column prop="duration" label="使用期限" />
      </el-table>

      <!-- 操作按钮 -->
      <div class="flex justify-center gap-4 mt-8">
        <el-button type="primary" class="!rounded-button" @click="handleSubmit">确认</el-button>
        <el-button class="!rounded-button" @click="handleCancel">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const form = reactive({
  name: '',
  type: 'package',
  points: '',
  areaType: 'unlimited',
  areas: [],
  duration: '',
  price: '',
  questionnaireType: 'all',
  questionnaire: 'general',
  generalQuestionnaire: ''
})

const areaOptions = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' }
]

const durationOptions = [
  { value: '7', label: '7天' },
  { value: '30', label: '30天' },
  { value: '90', label: '90天' },
  { value: '365', label: '365天' }
]

const questionnaireOptions = [
  { value: 'general1', label: '通用测评问卷A' },
  { value: 'general2', label: '通用测评问卷B' },
  { value: 'general3', label: '通用测评问卷C' }
]

const tableData = ref([
  {
    code: 'TCBH-001',
    name: '不限问卷包年',
    type: '包年/月',
    questionnaire: '所有问卷（不含订制）',
    area: '不限',
    price: '5000.00',
    duration: '365天'
  }
])

onMounted(() => {
  const { query } = router.currentRoute.value
  if (query?.id) {
    // 根据 id 查询数据
    console.log('根据 id 查询数据', query.id)
  }
})

const handleSubmit = () => {
  // 处理表单提交
  console.log('提交表单', form)
}

const handleCancel = () => {
  // 处理返回操作
  console.log('返回操作')
}
</script>

<style scoped>
.form-item {
  display: flex;
  align-items: center;
}

.form-item label {
  width: 120px;
  font-size: 14px;
  color: #333;
}

.input {
  width: 480px;
}

.input-176px {
  width: 176px;
}

.required-label::before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}

/* 移除 input number 的箭头 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
