<template>
  <div class="main-content min-h-screen bg-white p-6">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="140px" class="space-y-10">
      <el-form-item
        label="公告标题"
        prop="title"
        :rules="[{ required: true, message: '请输入公告标题', trigger: 'blur' }]"
      >
        <el-input v-model="form.title" placeholder="请输入公告标题" clearable />
      </el-form-item>

      <el-form-item
        label="公告图片"
        prop="img"
        :rules="[{ required: true, message: '请上传公告图片', trigger: 'blur' }]"
      >
        <ImageUploader v-model:value="form.img" />
      </el-form-item>

      <el-form-item
        label="公告内容"
        prop="content"
        :rules="[{ required: true, message: '请输入公告内容', trigger: 'blur' }]"
      >
        <WangEditor height="300px" v-model:value="form.content" class="w-full border rounded-md" />
      </el-form-item>
    </el-form>

    <div class="flex justify-center gap-4 mt-8">
      <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="onSubmit"> 保存并发布 </el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createNotice, editNotice, getNoticeInfo } from '@/api/system/user'
import WangEditor from '@/components/WangEditor/index.vue'
import ImageUploader from '@/components/ImageUploader/index.vue'

const route = useRoute()
const router = useRouter()
const formRef = ref()

const form = reactive({
  id: null,
  title: '',
  img: '',
  content: ''
})

const rules = {
  title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
  img: [{ required: true, message: '请上传公告图片', trigger: 'blur' }],
  content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }]
}

const onSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (valid) {
      if (form.id) {
        await editNotice(form)
      } else {
        await createNotice(form)
      }
      router.push('/system/notice')
    }
  })
}

const fetchNoticeInfo = async id => {
  const { data } = await getNoticeInfo({ id })
  Object.assign(form, data)
}

onMounted(() => {
  const id = route.query.id
  console.log('%c [ id ]-81', 'font-size:13px; background:pink; color:#bf2c9f;', id)
  if (id) {
    form.id = id
    fetchNoticeInfo(id)
  }
})
</script>

<style scoped>
.el-input-number :deep(.el-input__inner) {
  text-align: left;
}
</style>
