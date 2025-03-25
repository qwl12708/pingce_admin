<template>
  <div class="min-h-screen bg-white">
    <div class="flex-1 p-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-xl font-medium mb-6">新增客户</h2>
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
          <div class="grid grid-cols-2 gap-x-8 gap-y-6 text-left">
            <el-form-item required label="单位名称" prop="org_name" class="flex items-center">
              <el-input v-model="form.org_name" placeholder="请输入" />
            </el-form-item>

            <el-form-item required class="relative" label="上传加盖公章的用户承诺或营业执照" prop="org_voucher">
              <a class="text-blue-500" style="position: absolute; bottom: -10px; left: -160px; cursor: pointer">
                下载《用户承诺》模版
              </a>
              <ImageUploader v-model:value="form.org_voucher" />
              <div class="text-gray-400 text-sm mt-1">要求：png、jpeg、pdf格式，大小在10M以内</div>
            </el-form-item>

            <el-form-item label="员工人数" prop="employees_num" class="flex items-center">
              <el-select v-model="form.employees_num" placeholder="请选择">
                <el-option label="50人以下" value="lt50" />
                <el-option label="50-200人" value="50-200" />
                <el-option label="200人以上" value="gt200" />
              </el-select>
            </el-form-item>

            <el-form-item label="上传单位LOGO" prop="org_logo" required class="flex items-center">
              <ImageUploader v-model:value="form.org_logo" />
              <div class="text-gray-400 text-sm mt-1">要求：png、jpeg、pdf格式，大小在10M以内</div>
            </el-form-item>
            <el-form-item label="所属行业" prop="industry_id">
              <el-select v-model="form.industry_id" placeholder="请选择">
                <el-option label="互联网" value="internet" />
                <el-option label="金融" value="finance" />
                <el-option label="教育" value="education" />
              </el-select>
            </el-form-item>
            <el-form-item label="单位所在省/市/自治区" prop="area_ids" required>
              <el-cascader
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
              <el-input v-model="form.contacts" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="预留其他者使用手机号码" prop="phone1">
              <el-input v-model="form.phone1" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="管理员手机号码" prop="phone" required>
              <el-input v-model="form.phone" placeholder="请输入">
                <template #append>
                  <el-button
                    type="primary"
                    class="!rounded-button whitespace-nowrap"
                    @click="sendSmsCode"
                    :disabled="isSendingCode || countdown > 0"
                  >
                    {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="预留其他使用者手机号码" prop="phone2">
              <el-input v-model="form.phone2" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="验证码" prop="code" required>
              <el-input v-model="form.code" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="客服顾问" prop="counsellor_id">
              <el-select v-model="form.counsellor_id" placeholder="请选择">
                <el-option label="顾问A" value="a" />
                <el-option label="顾问B" value="b" />
              </el-select>
            </el-form-item>
          </div>
          <div class="flex justify-center space-x-4 mt-8">
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
import { addInstitution, editInstitution, getInstitutionInfo, createSms, getAreas } from '@/api/customer'
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
  fetchAreas()
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

  const valid = await formRef.value.validate()
  if (valid) {
    const p = { ...form, type: customerType.value, province_id: form.area_ids[0], city_id: form.area_ids[1] }
    if (isEdit.value) {
      await editInstitution(p)
    } else {
      await addInstitution(p)
    }
    ElMessage.success('提交成功')
    router.push('/customer/self-service')
  }
}

const handleCancel = () => {
  console.log('取消操作')
  router.push('/customer/self-service')
}
</script>
<style scoped>
.el-form-item :deep(.el-form-item__label) {
  font-size: 14px;
  color: #606266;
  padding-right: 12px;
  /* white-space: nowrap; */
}
.el-input :deep(.el-input__wrapper) {
  border-radius: 4px;
}
.el-select {
  width: 100%;
}
</style>
