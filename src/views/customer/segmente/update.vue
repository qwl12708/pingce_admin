<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-2xl font-bold mb-6">编辑测评顾问执行区域</h2>

    <div style="width: 500px" class="bg-white rounded-lg shadow p-6">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="顾问名称" prop="name">
          <el-input v-model="form.name" disabled placeholder="请输入顾问名称" class="w-64" />
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" disabled placeholder="请输入手机号码" class="w-64" />
        </el-form-item>

        <el-form-item label="所属部门" prop="department">
          <el-input v-model="form.department" disabled placeholder="请输入所属部门" class="w-64" />
        </el-form-item>

        <el-form-item label="所属区域" prop="regions">
          <el-tree-select
            v-model="form.regions"
            :data="regionData"
            show-checkbox
            multiple
            node-key="id"
            :props="defaultProps"
            placeholder="请选择所属区域"
            class="w-full"
          />
        </el-form-item>

        <div class="flex justify-center space-x-4 mt-8">
          <el-button type="primary" class="!rounded-button" @click="handleSubmit">确认</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { bindUserArea, getAreas } from '@/api/customer'
import { getDepartmentList, getUserInfo } from '@/api/system/user'

const router = useRouter()
const route = useRoute()

interface FormState {
  name: string
  phone: string
  department: string
  regions: string[]
}

const formRef = ref()
const form = reactive<FormState>({
  name: '',
  phone: '',
  department: '',
  regions: []
})
const originalDataMap = ref({})
const rules = ref({
  regions: [{ required: true, message: '请选择所属区域', trigger: 'change' }]
})

const defaultProps = {
  children: 'children',
  label: 'label'
}

const regionData = ref([])
const departmentsMap = ref({})

onMounted(async () => {
  fetchAreas()
  await getDepartments()
  const { id } = route.query
  if (id) {
    const { data } = await getUserInfo({ id: Number(id) })
    form.name = data.name
    form.phone = data.phone
    form.department = departmentsMap.value[data.dept_id]
    form.regions = data.undertakeArea.map(item => item.city_id)
  }
})

const getDepartments = async () => {
  try {
    const { data } = await getDepartmentList()
    departmentsMap.value = data.reduce((acc, item) => {
      acc[item.id] = item.name
      return acc
    }, {})
  } catch (error) {
    console.error('获取顾问列表失败', error)
  }
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

const handleSubmit = async () => {
  console.log('form.regions', form.regions)
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    const area = form.regions
      .map(id => {
        const city = originalDataMap.value[id]
        return city ? [city.pid, city.id] : null
      })
      .filter(pair => pair !== null)

    await bindUserArea({ id: route.query.id, area: JSON.stringify(area) })
    ElMessage.success('提交成功')
  } catch (error) {
    ElMessage.error('提交失败')
  }
}
</script>

<style scoped>
.el-input {
  --el-input-border-color: #dcdfe6;
}

.el-tree-select {
  width: 100%;
}
</style>
