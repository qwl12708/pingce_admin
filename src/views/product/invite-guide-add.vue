<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-8">{{ form.id ? '编辑' : '新增' }}邀请函模版</h2>

    <div class="space-y-6">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="模版名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入模版名称" class="input" />
        </el-form-item>

        <el-form-item label="模版内容" prop="content">
          <WangEditor height="600px" v-model:value="form.content" />
        </el-form-item>

        <div class="flex justify-center gap-4 mt-8">
          <el-button type="primary" class="!rounded-button" @click="handleSubmit">保存</el-button>
          <el-button class="!rounded-button" @click="handleCancel">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { addInviteTemplate, editInviteTemplate, getInviteTemplateInfo } from '@/api/product'
import { ElMessage } from 'element-plus'
import WangEditor from '@/components/WangEditor/index.vue'

const router = useRouter()
const route = useRoute()
const formRef = ref()

const form = reactive({
  name: '',
  content: `请将测评链接或二维码通过微信、邮箱、现场扫码等方式分享给受测者，并提醒其注意以下事项:
您好，感谢您参加【项目名称】测评项目，在正式开始测评前请了解以下内容：
1、请您做好充分的作答准备后，再开始本测评，包括不被打断的时间、不受干扰的空间、适合的身体和精神状态（避免疲劳、突然要上厕所、疾病干扰等）。另外，请检查您的手机、计算机设备是否符合要求、电源和网络是否稳定。
2、本测评具有时间限制，答题过程中请注意答题进度，整个测评共【测评提数】道题，请在【测评时长】分钟内完成。同时，测评一旦开始就不能中断，若您中途自行离开，系统将继续计时，没有作答的题目将不予统计。
3、本测评请在【测评起始时间】至【测评截止时间】间完成，超过截止时间将不能参加测评。
4、如果您已做好测评准备，并准备马上答题，请用微信扫描下方二维码，或点击下面网页链接进入测评页面。如果尚未准备好，也可在截止日期前其它方便的时间，通过以上方式登录系统进行测评。
答题登录页面链接：【测评链接】
二维码【二维码】


`,
  id: null
})

const rules = ref({
  name: [{ required: true, message: '请输入模版名称', trigger: 'blur' }],
  content: [{ required: true, message: '请输入模版内容', trigger: 'blur' }]
})

onMounted(async () => {
  const id = route.query.id
  if (id) {
    form.id = Number(id)
    try {
      const { data } = await getInviteTemplateInfo({ id: form.id })
      Object.assign(form, data)
    } catch (error) {
      ElMessage.error('获取模版详情失败')
    }
  }
})

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    if (form.id) {
      await editInviteTemplate(form)
    } else {
      await addInviteTemplate(form)
    }
    ElMessage.success('提交成功')
    router.push('/product/invite-guide')
  } catch (error) {
    ElMessage.error('提交失败')
  }
}

const handleCancel = () => {
  router.push('/product/invite-guide')
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

.editor {
  width: 100%;
  height: 300px;
}

.required-label::before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}
</style>
