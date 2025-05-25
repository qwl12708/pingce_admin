<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-8">{{ isEdit ? '编辑' : '新增' }}产品套餐</h2>

    <el-form :model="form" ref="formRef" label-width="120px">
      <!-- 基础信息 -->
      <el-form-item label="套餐名称" prop="name" required>
        <el-input class="!w-[500px]" v-model="form.name" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="套餐类别" prop="type" required>
        <el-radio-group v-model="form.type">
          <el-radio :label="1">包年/月</el-radio>
          <el-radio :label="2">点数</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.type === 2" label="点数" prop="score" required>
        <el-input class="!w-[195px]" v-model="form.score" placeholder="请输入点数" />
      </el-form-item>

      <el-form-item label="限售地区" prop="is_limit_area" required>
        <el-radio-group v-model="form.is_limit_area">
          <el-radio :label="0">不限</el-radio>
          <el-radio :label="1">仅限</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="form.is_limit_area === 1" label="选择地区" prop="limit_area" required>
        <el-tree-select
          v-model="form.limit_area"
          :data="regionData"
          show-checkbox
          multiple
          node-key="id"
          :props="defaultProps"
          placeholder="请选择所属区域"
          class="w-full"
        />
      </el-form-item>

      <el-form-item label="使用期限" prop="day" required>
        <el-select v-model="form.day" filterable allow-create placeholder="请选择">
          <el-option v-for="item in durationOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="产品价格" prop="price" required>
        <el-input class="!w-[195px]" v-model="form.price" placeholder="请输入">
          <template #append>元</template>
        </el-input>
      </el-form-item>

      <!-- 测评问卷配置 -->
      <el-form-item label="问卷类别" prop="evaluation_type" required>
        <el-radio-group v-model="form.evaluation_type">
          <el-radio v-for="item in questionnaireTypeOptions" :key="item.value" :label="item.value">{{
            item.label
          }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="form.evaluation_type !== 1" label="问卷名称" prop="evaluation_id" required>
        <el-select v-model="form.evaluation_id" placeholder="选择测评问卷">
          <el-option v-for="item in questionnaireOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.evaluation_type === 3" label="选择岗位类别" prop="job_type" required>
        <el-select v-model="form.job_type" placeholder="选择岗位类别">
          <el-option v-for="item in industryOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <!-- 操作按钮 -->
      <div class="flex justify-center gap-4 mt-8">
        <el-button type="primary" @click="handleSubmit">确认</el-button>
        <el-button @click="handleCancel">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { addProduct, editProduct, getJobTypeList, getProductInfo, getQuestionnaireList } from '@/api/product'
import { getAreas } from '@/api/customer'

const router = useRouter()
const route = useRoute()
const formRef = ref(null)
const isEdit = ref(false)

const form = reactive({
  name: '',
  type: 1,
  is_limit_area: 0,
  limit_area: [],
  day: '',
  price: '',
  evaluation_type: 1,
  evaluation_id: 0,
  job_type: '',
  score: '' // 新增字段
})

const regionData = ref([])
const originalDataMap = ref({})

const defaultProps = {
  children: 'children',
  label: 'label'
}

const durationOptions = [
  { value: 3, label: '3天' },
  { value: 7, label: '7天' },
  { value: 15, label: '15天' },
  { value: 30, label: '30天' },
  { value: 90, label: '90天' },
  { value: 180, label: '180天' },
  { value: 365, label: '365天' },
  { value: 720, label: '720天' },
  { value: 1095, label: '1095天' }
]

const questionnaireTypeOptions = [
  { value: 1, label: '所有问卷（不含定制）' },
  { value: 2, label: '通用测评问卷' },
  { value: 3, label: '岗位胜任力测评问卷' },
  { value: 4, label: '定制问卷' }
]
const questionnaireOptions = ref([])

const industryOptions = ref([])

onMounted(async () => {
  fetchAreas()
  const { id } = route.query
  if (id) {
    isEdit.value = true
    const { data } = await getProductInfo({ id: Number(id) })
    const limit_area_ids = data.limit_area.map(pair => pair[1])
    data.limit_area = limit_area_ids
    Object.assign(form, data)
  }

  const { data } = await getJobTypeList()
  industryOptions.value = data || []

  const res = await getQuestionnaireList({ page: 1, pageSize: 100 })
  questionnaireOptions.value = res.data.list.map(({ name, id }) => ({
    label: name,
    value: id
  }))
})

const handleSubmit = async () => {
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const limit_area = form.limit_area
        .map(id => {
          const city = originalDataMap.value[id]
          return city ? [city.pid, city.id] : null
        })
        .filter(pair => pair !== null)

      form.limit_area = JSON.stringify(limit_area)
      const p = form.evaluation_type == 1 ? { ...form, evaluation_id: 0 } : form

      if (isEdit.value) {
        await editProduct(p)
      } else {
        await addProduct(p)
      }
      router.push('/product/list')
    }
  })
}

const handleCancel = () => {
  router.push('/product')
}

const fetchAreas = async () => {
  try {
    const { data } = await getAreas()
    originalDataMap.value = data.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
    regionData.value = transformToTree(data)
  } catch (error) {
    console.error('获取地区列表失败', error)
  }
}

const transformToTree = data => {
  const tree = []
  const map = {}

  data.forEach(item => {
    map[item.id] = { ...item, label: item.name, children: [] }
  })

  data.forEach(item => {
    if (item.pid === 0) {
      tree.push(map[item.id])
    } else {
      if (map[item.pid]) {
        map[item.pid].children.push(map[item.id])
      }
    }
  })

  return tree
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
