<template>
  <div class="container">
    <div class="flex align-center">
      <div class="!w-[120px]">模板名称：</div>
      <el-input v-model="form.name" placeholder="请输入模版名称" class="input" />
    </div>

    <!-- 关键词区域 -->
    <div class="keywords">
      <el-tag
        v-for="(item, index) in keywords"
        :key="index"
        class="keyword-tag"
        draggable="true"
        @dragstart="handleDragStart($event, item)"
      >
        {{ item.name }}
      </el-tag>
    </div>

    <!-- 富文本编辑器 -->
    <div class="editor-wrapper">
      <Toolbar :editor="editorInstance" :defaultConfig="toolbarConfig" class="editor-toolbar" />

      <Editor
        v-model="form.content"
        :defaultConfig="editorConfig"
        mode="default"
        style="height: 800px"
        @on-created="handleEditorCreated"
      />
    </div>

    <div class="flex justify-center gap-4 mt-8">
      <el-button type="primary" class="!rounded-button" @click="handleSubmit">保存</el-button>
      <el-button class="!rounded-button" @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElTag, ElMessage } from 'element-plus'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { useRouter, useRoute } from 'vue-router'
import { addInviteTemplate, editInviteTemplate, getInviteTemplateInfo, getInviteKeyList } from '@/api/product'

const router = useRouter()
const route = useRoute()
const keywords = ref([])
// 编辑器相关
let editorInstance = null
// 工具栏配置
const toolbarConfig = ref({
  excludeKeys: [
    // 'uploadImage',
    // 'uploadVideo',
    // 'insertImage',
    // 'codeBlock'
  ]
})

// 编辑器配置
const editorConfig = ref({
  placeholder: '请将关键词拖拽到此区域...',
  scroll: true,
  MENU_CONF: {
    uploadImage: {
      server: '/platformApi/upload/image',
      fieldName: 'file',
      maxFileSize: 3 * 1024 * 1024, // 3M
      allowedFileTypes: ['image/*']
    }
  }
})
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

  const res = await getInviteKeyList()
  keywords.value = res.data
})

const handleSubmit = async () => {
  if (!form.name) {
    return ElMessage.warning('请填写模板名称')
  }
  if (!form.content) {
    return ElMessage.warning('请填写模板内容')
  }

  // 添加单词边界（精确匹配）
  const replaceKeywords = findMatchedKeywords(
    form.content,
    keywords.value.map(e => e.value),
    { caseSensitive: true }
  )

  let replace_content = {}
  if (replaceKeywords.length) {
    keywords.value.forEach(e => {
      if (replaceKeywords.includes(e.value)) {
        replace_content[e.value] = e.name
      }
    })
  }
  try {
    if (form.id) {
      await editInviteTemplate({ ...form, replace_content: JSON.stringify(replace_content), intro: '' })
    } else {
      await addInviteTemplate({ ...form, replace_content: JSON.stringify(replace_content), intro: '' })
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

// 编辑器创建回调
const handleEditorCreated = editor => {
  editorInstance = editor
  addEditorDropHandler()
}

// 添加编辑器拖拽处理
const addEditorDropHandler = () => {
  const editContainer = editorInstance.getEditableContainer()
  if (!editContainer) return

  editContainer.addEventListener('dragover', handleDragOver)
  editContainer.addEventListener('drop', handleDrop)
}

// 拖拽开始处理
const handleDragStart = (e, word) => {
  e.dataTransfer.setData('text/plain', word.value)
}

// 拖拽悬停处理
const handleDragOver = e => {
  e.preventDefault()
}

// 拖拽释放处理
const handleDrop = e => {
  e.preventDefault()
  // const keyword = e.dataTransfer.getData('text/plain')
  // if (keyword && editorInstance) {
  // 使用编辑器API插入内容
  // editorInstance.insertText(keyword)
  // 如果需要更复杂的插入方式，可以使用：
  // const html = `<span style="color: #1890ff;">${keyword}</span>`
  // editorInstance.dangerouslyInsertHtml(html)
  // }
}

/**
 * 查找字符串中匹配关键词数组的所有项
 * @param {string} text - 要搜索的文本
 * @param {string[]} keywords - 关键词数组
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.exactMatch=false] - 是否启用精确单词匹配
 * @param {boolean} [options.caseSensitive=false] - 是否区分大小写
 * @returns {string[]} 匹配的关键词数组（保持原数组顺序且去重）
 */
function findMatchedKeywords(text, keywords, options = {}) {
  // 参数校验
  if (typeof text !== 'string') return []
  if (!Array.isArray(keywords)) return []

  // 过滤无效关键词并去重
  const validKeywords = [...new Set(keywords.filter(kw => typeof kw === 'string' && kw.trim() !== ''))]
  if (validKeywords.length === 0) return []

  // 构建正则表达式
  const flags = options.caseSensitive ? 'g' : 'gi'
  const escapedKeywords = validKeywords
    .map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // 转义特殊字符
    .map(kw => (options.exactMatch ? `\\b${kw}\\b` : kw)) // 添加单词边界

  const regex = new RegExp(escapedKeywords.join('|'), flags)

  // 执行匹配并去重
  const matches = text.match(regex) || []
  const matchedSet = new Set(matches.map(m => (options.caseSensitive ? m : m.toLowerCase())))

  // 按原数组顺序返回结果
  return validKeywords.filter(kw => {
    const compareKey = options.caseSensitive ? kw : kw.toLowerCase()
    return matchedSet.has(compareKey)
  })
}
</script>

<style scoped>
.container {
  padding: 20px;
  margin: 0 auto;
}

.keywords {
  margin-bottom: 20px;
}

.keyword-tag {
  margin-right: 10px;
  cursor: move;
  user-select: none;
  transition: all 0.3s;
}

.keyword-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.editor-wrapper {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

/* 深度样式覆盖 */
:deep(.w-e-text-container) {
  min-height: 350px !important;
}

:deep(.w-e-toolbar) {
  border-bottom: 1px solid #eee !important;
  background-color: #f8f9fa !important;
}
</style>
