<template>
  <div class="min-h-screen bg-white p-4">
    <div class="max-w-4xl bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-medium mb-6">
        {{ isDetailPage ? '查看产品配置 banner 图' : isEditPage ? '编辑产品配置 banner 图' : '新增产品配置banner 图' }}
      </h2>

      <el-form ref="formRef" :model="form" label-width="120px" :disabled="isDetailPage">
        <div class="space-y-6">
          <!-- 类型选择 -->
          <el-form-item label="类型" prop="type" required>
            <div class="flex gap-6">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">图文详情</el-radio>
                <el-radio :label="2">跳转链接</el-radio>
                <el-radio :label="3">跳转模块</el-radio>
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
          <el-form-item v-if="form.type === 1" label="详情内容" prop="content" required>
            <WangEditor height="400px" v-model:value="form.content" />
          </el-form-item>

          <el-form-item v-if="form.type === 2" label="链接地址" prop="link" required>
            <el-input v-model="form.link" class="w-64" placeholder="请输入链接地址" />
          </el-form-item>

          <el-form-item v-if="form.type === 3" label="跳转模块" prop="moduleName" required>
            <el-radio-group v-model="form.moduleName">
              <el-radio :label="1">解决方案</el-radio>
              <el-radio :label="2">公益测评</el-radio>
              <el-radio :label="3">渠道合作</el-radio>
              <el-radio :label="4">了解科懿</el-radio>
              <el-radio :label="5">联系我们</el-radio>
              <el-radio :label="6">注册页面</el-radio>
              <el-radio :label="7">登录页面</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-center gap-4 mt-8">
          <el-button v-if="!isDetailPage" type="primary" class="!rounded-button" @click="handleSubmit(formRef)">
            保存并发布
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { getProductInfo, addProduct, editProduct } from '@/api/website/index'
import ImageUploader from '@/components/ImageUploader/index.vue'
import WangEditor from '@/components/WangEditor/index.vue'
import type { FormInstance } from 'element-plus'
import router from '@/router'

const route = useRoute()
const isDetailPage = ref(false)
const isEditPage = ref(false)

const formRef = ref<FormInstance>()
const form = ref({
  type: 1,
  img: '',
  sort: '',
  content: '',
  link: '',
  module: '',
  moduleName: '' // 新增字段
})

const fetchBannerInfo = async (id: string) => {
  try {
    const response = await getProductInfo({ id })
    const data = response.data
    console.log('%c [ data ]-93', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    form.value.type = data.type
    form.value.img = data.img
    form.value.sort = data.sort
    form.value.content = data.content
    form.value.link = data.link
    form.value.module = data.module
    form.value.moduleName = data.moduleName // 新增字段赋值
    console.log('%c [ form ]-101', 'font-size:13px; background:pink; color:#bf2c9f;', form)
  } catch (error) {
    console.error('获取Banner详情失败', error)
  }
}

onMounted(() => {
  console.log('Initial form.img:', form.value.img) // 调试日志
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
    await formEl.validate()

    if (route.query.type === 'edit') {
      await editProduct({ ...form.value, id: route.query.id })
    } else {
      await addProduct(form.value)
    }
    ElMessage.success('保存成功')
    router.push('/system/product-config')
  } catch (error) {
    console.error('保存失败', error)
  }
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
