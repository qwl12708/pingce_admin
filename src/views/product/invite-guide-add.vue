<template>
  <div class="main-content min-h-screen bg-white p-6">
    <h2 class="text-xl font-medium mb-8">新增/编辑邀请函模版</h2>

    <div class="space-y-6">
      <div class="form-item">
        <label class="required-label">模版名称</label>
        <el-input v-model="form.name" placeholder="请输入模版名称" class="input" />
      </div>

      <div class="form-item">
        <label class="required-label">模版内容</label>
        <WangEditor height="600px" v-model:value="form.content" />
      </div>

      <div class="flex justify-center gap-4 mt-8">
        <el-button type="primary" class="!rounded-button" @click="handleSubmit">确认</el-button>
        <el-button class="!rounded-button" @click="handleCancel">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'
import WangEditor from '@/components/WangEditor/index.vue'

const router = useRouter()

const form = reactive({
  name: '',
  // content: `<div><p>请将测评链接或二维码通过微信、邮箱、现场扫码等方式分享给受测者，并提醒其注意以下事项:</p><p>您好，感谢您参加【项目名称】测评项目，在正式开始测评前请了解以下内容：</p><p>1、请您做好充分的作答准备后，再开始本测评，包括不被打断的时间、不受干扰的空间、适合的身体和精神状态（避免疲劳、突然要上厕所、疾病干扰等）。另外，请检查您的手机、计算机设备是否符合要求、电源和网络是否稳定。</p><p>2、本测评具有时间限制，答题过程中请注意答题进度，整个测评共【测评提数】道题，请在【测评时长】分钟内完成。同时，测评一旦开始就不能中断，若您中途自行离开，系统将继续计时，没有作答的题目将不予统计。</p><p>3、本测评请在【测评起始时间】至【测评截止时间】间完成，超过截止时间将不能参加测评。</p><p>4、如果您已做好测评准备，并准备马上答题，请用微信扫描下方二维码，或点击下面网页链接进入测评页面。如果尚未准备好，也可在截止日期前其它方便的时间，通过以上方式登录系统进行测评。</p><p>答题登录页面链接：【测评链接】</p><p>二维码【二维码】</div>`
  content: `请将测评链接或二维码通过微信、邮箱、现场扫码等方式分享给受测者，并提醒其注意以下事项:
您好，感谢您参加【项目名称】测评项目，在正式开始测评前请了解以下内容：
1、请您做好充分的作答准备后，再开始本测评，包括不被打断的时间、不受干扰的空间、适合的身体和精神状态（避免疲劳、突然要上厕所、疾病干扰等）。另外，请检查您的手机、计算机设备是否符合要求、电源和网络是否稳定。
2、本测评具有时间限制，答题过程中请注意答题进度，整个测评共【测评提数】道题，请在【测评时长】分钟内完成。同时，测评一旦开始就不能中断，若您中途自行离开，系统将继续计时，没有作答的题目将不予统计。
3、本测评请在【测评起始时间】至【测评截止时间】间完成，超过截止时间将不能参加测评。
4、如果您已做好测评准备，并准备马上答题，请用微信扫描下方二维码，或点击下面网页链接进入测评页面。如果尚未准备好，也可在截止日期前其它方便的时间，通过以上方式登录系统进行测评。
答题登录页面链接：【测评链接】
二维码【二维码】




`
})

const handleSubmit = () => {
  // 处理表单提交
  console.log('提交表单', form)
  // 提交后跳转回列表页面
  router.push('/product/answer-guide')
}

const handleCancel = () => {
  // 处理返回操作
  router.push('/product/answer-guide')
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
