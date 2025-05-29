<template>
  <div class="min-h-screen bg-white">
    <div class="flex-1 p-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-xl font-medium mb-6">
          {{ isEdit ? '编辑客户信息' : '新增客户信息' }}
        </h2>
        <div class="flex space-x-8 mb-6">
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">客户类别</span>
            <el-radio-group v-model="customerType">
              <el-radio :label="1">自助客户</el-radio>
              <el-radio :label="2">测评客户</el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="170px" label-position="right">
          <div class="grid [grid-template-columns:3fr_7fr] gap-x-8 gap-y-6 text-left">
            <el-form-item required label="单位名称" prop="org_name" class="flex items-center">
              <el-input v-model="form.org_name" placeholder="请输入" />
            </el-form-item>

            <el-form-item required class="relative" label="上传加盖公章的用户承诺或营业执照" prop="org_voucher">
              <a
                class="text-blue-500"
                style="position: absolute; bottom: 14px; left: -160px; cursor: pointer"
                href="http://hzcpcs.qifudaren.net/admin/用户承诺模板.docx"
                target="_blank"
              >
                下载《用户承诺》模版
              </a>
              <ImageUploader v-model:value="form.org_voucher" />
              <div class="text-gray-400 text-sm mt-1">
                要求：png、jpeg、pdf格式，大小在10M以内
                <span style="opacity: 0; user-select: none; display: inline-block">
                  这是一段隐形的文字，没啥卵用，仅仅为了占位搞样式。不要问为啥不换种写法，懒得换。
                </span>
              </div>
            </el-form-item>

            <el-form-item label="员工人数" prop="employees_num" class="flex items-center">
              <el-input v-model="form.employees_num" placeholder="请输入" />
            </el-form-item>

            <el-form-item label="上传单位LOGO" prop="org_logo" required class="flex items-center">
              <ImageUploader v-model:value="form.org_logo" />
              <div class="text-gray-400 text-sm mt-1">
                当logo图片出现在左侧方框中，可以点击拖动，使logo图案完全进入方框并处于方框中央后，点击“保存”按钮即可。（要求：png、jpeg、pdf格式，大小在5M以内，160x160px）
              </div>
            </el-form-item>
            <el-form-item label="所属行业" prop="industry_id">
              <el-select v-model="form.industry_id" placeholder="请选择">
                <el-option v-for="item in industryOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="单位所在省/市/自治区" prop="area_ids" required>
              <el-cascader
                style="width: 230px"
                v-model="form.area_ids"
                :options="regionData"
                :props="cascaderProps"
                placeholder="请选择省/市"
              />
            </el-form-item>
            <el-form-item label="预留电子邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="管理员（联系人）" prop="contacts" required>
              <el-input v-model="form.contacts" style="width: 230px" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="预留其他者使用手机号码" prop="phone1">
              <el-input v-model="form.phone1" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="管理员手机号码" prop="phone" required>
              <el-input v-model="form.phone" style="width: 230px" placeholder="请输入">
                <template #append>
                  <el-button
                    type="primary"
                    class="!rounded-button whitespace-nowrap"
                    @click="sendSmsCode"
                    :disabled="isSendingCode || countdown > 0"
                  >
                    <span :style="{ color: isSendingCode || countdown > 0 ? '#A8ABB2' : '#409EFF' }">
                      {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                    </span>
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="预留其他使用者手机号码" prop="phone2">
              <el-input v-model="form.phone2" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="验证码" prop="code" required>
              <el-input v-model="form.code" style="width: 230px" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="客服顾问" prop="counsellor_id">
              <el-select v-model="form.counsellor_id" placeholder="请选择">
                <el-option
                  v-for="item in consultantOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="flex space-x-4 mt-8" style="margin-left: 30%">
            <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSubmit">确定</el-button>
            <el-button class="!rounded-button whitespace-nowrap" @click="handleCancel">返回</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  addInstitution,
  editInstitution,
  getInstitutionInfo,
  createSms,
  getAreas,
  getConsultantList,
  getIndustries
} from '@/api/customer'
import { ElMessage } from 'element-plus'
import ImageUploader from '@/components/ImageUploader/index.vue'

const formRef = ref()
const router = useRouter()
const customerType = ref(1) // 1: 自助客户, 2: 测评客户
const isEdit = ref(false)
const form = reactive({
  org_name: '',
  employees_num: '',
  industry_id: '',
  email: '',
  area_ids: [],
  contacts: '',
  phone1: '',
  phone: '',
  phone2: '',
  code: '',
  counsellor_id: '',
  org_logo: '',
  org_voucher: ''
})
const rules = ref({
  type: [{ required: true, message: '请选择客户类型', trigger: 'blur' }],
  org_name: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
  area_ids: [{ required: true, message: '请选择单位所在省/市', trigger: 'change' }],
  contacts: [{ required: true, message: '请输入管理员姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入管理员手机号码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  org_logo: [{ required: true, message: '请上传单位LOGO', trigger: 'change' }],
  org_voucher: [{ required: true, message: '请上传加盖公章的用户承诺或营业执照', trigger: 'change' }]
})
// 级联选择器配置
const cascaderProps = {
  value: 'id',
  label: 'name',
  children: 'children'
  // checkStrictly: true // 允许选择任意一级
}

const isSendingCode = ref(false)
const countdown = ref(0)
const regionData = ref([])
const consultantOptions = ref([])
const industryOptions = ref([])

const sendSmsCode = async () => {
  if (!form.phone) {
    ElMessage.error('请输入管理员手机号码')
    return
  }
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(form.phone)) {
    ElMessage.error('请输入有效的手机号码')
    return
  }
  isSendingCode.value = true
  countdown.value = 60
  try {
    await createSms({ phone: form.phone })
    ElMessage.success('验证码已发送')
    const timer = setInterval(() => {
      countdown.value -= 1
      if (countdown.value <= 0) {
        clearInterval(timer)
        isSendingCode.value = false
      }
    }, 1000)
  } catch (error) {
    ElMessage.error('发送验证码失败')
    isSendingCode.value = false
  }
}

onMounted(async () => {
  console.log('页面初始化', router)
  fetchConsultantList()
  fetchAreas()
  fetchIndustries()
  const type = router.currentRoute.value.query?.type
  const id = router.currentRoute.value.query?.id
  customerType.value = Number(type)
  if (id) {
    isEdit.value = true
    try {
      const { data } = await getInstitutionInfo({ id: Number(id) })
      Object.assign(form, data, { area_ids: [data.province_id, data.city_id] })
    } catch (error) {
      ElMessage.error('获取客户详情失败')
    }
  }
})

// 添加获取行业列表的方法
const fetchIndustries = async () => {
  try {
    const { data } = await getIndustries()
    industryOptions.value = data.map(item => ({
      value: item.id,
      label: item.name
    }))
  } catch (error) {
    console.error('获取行业列表失败', error)
  }
}

const fetchConsultantList = async () => {
  try {
    const { data } = await getConsultantList()
    consultantOptions.value = data.map(item => ({ value: item.id, label: item.name }))
  } catch (error) {
    console.error('获取测评顾问列表失败', error)
  }
}

const fetchAreas = async () => {
  try {
    const { data } = await getAreas()
    regionData.value = transformToTree(data)
  } catch (error) {
    console.error('获取区域失败', error)
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
  if (!formRef.value) return

  // 校验预留电子邮箱
  if (form.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      ElMessage.error('请输入有效的电子邮箱地址')
      return
    }
  }

  // 校验预留手机号码
  const phoneRegex = /^1[3-9]\d{9}$/
  if (form.phone && !phoneRegex.test(form.phone)) {
    ElMessage.error('请输入有效的管理员手机号码')
    return
  }
  if (form.phone1 && !phoneRegex.test(form.phone1)) {
    ElMessage.error('请输入有效的预留其他使用者手机号码')
    return
  }
  if (form.phone2 && !phoneRegex.test(form.phone2)) {
    ElMessage.error('请输入有效的预留其他使用者手机号码')
    return
  }

  const valid = await formRef.value.validate()
  if (valid) {
    const p = { ...form, type: customerType.value, province_id: form.area_ids[0], city_id: form.area_ids[1] }
    if (isEdit.value) {
      await editInstitution(p)
    } else {
      await addInstitution(p)
    }
    ElMessage.success('提交成功')
    handleCancel()
  }
}

const handleCancel = () => {
  router.back()
}
</script>
<style scoped>
.el-form-item :deep(.el-form-item__label) {
  font-size: 14px;
  color: #606266;
  padding-right: 12px;
  /* white-space: nowrap; */
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 90px;
  height: 90px;
}

:deep(.el-upload--picture-card) {
  --el-upload-picture-card-size: 90px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item-thumbnail) {
  width: 90px;
  height: 90px;
}

:deep(.el-upload-list__item) {
  margin-bottom: 0;
}

.el-input :deep(.el-input__wrapper) {
  border-radius: 4px;
}
.el-select {
  width: 100%;
}
</style>
