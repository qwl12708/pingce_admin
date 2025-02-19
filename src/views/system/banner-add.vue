<template>
  <div class="min-h-screen bg-white p-4">
    <div class="max-w-4xl bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-medium mb-6">
        {{ isDetailPage ? '查看 banner 图' : isEditPage ? '编辑 banner 图' : '新增 banner 图' }}
      </h2>

      <el-form ref="formRef" :model="form" label-width="120px" :disabled="isDetailPage">
        <div class="space-y-6">
          <!-- 类型选择 -->
          <el-form-item label="类型" prop="type" required>
            <div class="flex gap-6">
              <el-radio-group v-model="form.type">
                <el-radio :label="0">图文详情</el-radio>
                <el-radio :label="1">跳转链接</el-radio>
                <el-radio :label="2">跳转模块</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <!-- Banner图片上传 -->
          <el-form-item label="banner图片" prop="img" required>
            <ImageUploader v-model:value="form.img" />
            <div class="text-gray-400 text-xs mt-2">图片格式为jpg、jpeg、png，尺寸1920*366</div>
          </el-form-item>

          <!-- 排序 -->
          <el-form-item label="排序" prop="sort" required>
            <el-input v-model="form.sort" class="w-64" placeholder="请输入" />
          </el-form-item>

          <!-- 根据类型显示不同字段 -->
          <el-form-item v-if="form.type === 'image'" label="详情内容" prop="content" required>
            <el-input type="textarea" v-model="form.content" :rows="6" placeholder="请输入详情内容" />
          </el-form-item>

          <el-form-item v-if="form.type === 'link'" label="链接地址" prop="link" required>
            <el-input v-model="form.link" class="w-64" placeholder="请输入链接地址" />
          </el-form-item>

          <el-form-item v-if="form.type === 'module'" label="跳转模块" prop="module" required>
            <el-select v-model="form.module" class="w-64" placeholder="请选择">
              <el-option label="解决方案" value="solution" />
              <el-option label="公益测评" value="publicTest" />
              <el-option label="渠道合作" value="channel" />
              <el-option label="了解科1" value="about" />
              <el-option label="联系我们" value="contact" />
              <el-option label="注册页面" value="register" />
              <el-option label="登录页面" value="login" />
            </el-select>
          </el-form-item>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-center gap-4 mt-8">
          <el-button v-if="!isDetailPage" type="primary" class="!rounded-button" @click="handleSubmit(formRef)">
            保存并发布
          </el-button>
          <el-button class="!rounded-button" @click="handleCancel">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { getBannerInfo, createBanner, editBanner } from '@/api/website/banner'
import ImageUploader from '@/components/ImageUploader/index.vue'
import type { FormInstance } from 'element-plus'

const typeEnum = {
  1: 'image',
  2: 'link',
  3: 'module'
}

const route = useRoute()
const isDetailPage = ref(false)
const isEditPage = ref(false)

const formRef = ref<FormInstance>()
const form = ref({
  type: '',
  img: '',
  sort: '',
  content: '',
  link: '',
  module: ''
})

const fetchBannerInfo = async (id: string) => {
  try {
    const response = await getBannerInfo({ id })
    const data = response.data
    form.value.type = data.type
    form.value.img = data.img
    form.value.sort = data.sort
    form.value.content = data.content
    form.value.link = data.link
    form.value.module = data.module
  } catch (error) {
    console.error('获取Banner详情失败', error)
  }
}

onMounted(() => {
  if (route.query.type === 'detail') {
    isDetailPage.value = true
    const id = route.query.id as string
    fetchBannerInfo(id)
  } else if (route.query.type === 'edit') {
    isEditPage.value = true
    const id = route.query.id as string
    fetchBannerInfo(id)
  }
})

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    const r = await formEl.validate()
    console.log('%c [ form.value ]-167', 'font-size:13px; background:pink; color:#bf2c9f;', form.value)
    console.log('%c [ r ]-167', 'font-size:13px; background:pink; color:#bf2c9f;', r)

    if (route.query.type === 'edit') {
      await editBanner({ ...form.value, id: route.query.id })
    } else {
      await createBanner(form.value)
    }
    ElMessage.success('保存成功')
  } catch (error) {
    console.error('保存失败', error)
  }
}

const handleCancel = () => {
  history.back()
}
</script>

<style scoped>
.banner-uploader {
  width: 360px;
  height: 180px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.banner-uploader:hover {
  border-color: #409eff;
}

.upload-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8c939d;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.custom-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
