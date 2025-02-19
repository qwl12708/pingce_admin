

<template>
  <div class="main-content min-h-screen bg-white p-6">
    <!-- 头部筛选区域 -->
    <div class="bg-white p-4 rounded-lg mb-4 flex items-center justify-between">
      <div class="flex gap-4">
        <el-select v-model="province" placeholder="省市区" class="w-48">
          <el-option v-for="item in provinceOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="customer" placeholder="客户" class="w-48">
          <el-option v-for="item in customerOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="handleSearch">查询</el-button>
      </div>
      <div class="flex gap-4">
        <el-button type="primary" class="!rounded-button whitespace-nowrap" @click="showDialog = true">
          <el-icon class="mr-1"><UserFilled /></el-icon>
          分配/变更测评顾问
        </el-button>
        <el-button @click="onUpdate" type="primary" class="!rounded-button whitespace-nowrap">
          <el-icon class="mr-1"><Setting /></el-icon>
          测评部门负责区域设置
        </el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="bg-white p-4 rounded-lg">
      <div class="text-xl font-medium mb-4">客户划分</div>
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column type="selection" fixed="left" />
        <el-table-column label="序号" type="index" fixed="left" />
        <el-table-column prop="code" label="客户编号" fixed="left" />
        <el-table-column prop="name" label="客户名称" sortable />
        <el-table-column prop="location" label="单位所在省/市/自治区" sortable />
        <el-table-column prop="address" label="详细地址" />
        <el-table-column prop="createTime" label="创建时间" sortable />
        <el-table-column prop="projectCount" label="累计项目数" sortable />
        <el-table-column prop="amount" label="累计合同金额（元）" sortable />
        <el-table-column prop="type" label="类别" sortable />
        <el-table-column prop="consultant" label="联系人" sortable />
        <el-table-column prop="tel" label="联系人手机号码" sortable />
        <el-table-column prop="consultant" label="联系人" sortable />
        <el-table-column prop="employeeCount" label="员工人数" sortable />
        <el-table-column prop="department" label="所属行业" />
        <el-table-column prop="email" label="预留电子邮箱" sortable />
        <el-table-column prop="evaluator" label="测评顾问" sortable />
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-between items-center mt-4">
        <span class="text-gray-500">共 999 条</span>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="999"
          layout="sizes, prev, pager, next"
        />
      </div>
    </div>

    <!-- 弹窗 -->
    <el-dialog title="分配/变更测评顾问" v-model.value:visible="showDialog">
      <el-form :model="dialogForm" label-width="120px">
        <el-form-item label="分配测评顾问">
          <el-select v-model="dialogForm.consultant" placeholder="请选择">
            <el-option label="顾问A" value="a" />
            <el-option label="顾问B" value="b" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="flex justify-end pt-4">
        <el-button class="ml-4" @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UserFilled, Setting } from '@element-plus/icons-vue'
import router from '@/router'

const showDialog = ref(false)
const dialogForm = ref({
  consultant: ''
})

const province = ref('')
const customer = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const provinceOptions = [
  { value: '1', label: '河南省' },
  { value: '2', label: '北京市' },
  { value: '3', label: '上海市' }
]

const customerOptions = [
  { value: '1', label: '科技有限公司' },
  { value: '2', label: '软件科技公司' },
  { value: '3', label: '网络科技公司' }
]

const tableData = [
  {
    code: 'KH001',
    name: '智慧科技有限公司',
    location: '河南省郑州市',
    address: '高新区科技园区A座1001室',
    createTime: '2024-04-12 13:00',
    projectCount: 6,
    amount: 30000.0,
    type: '自动',
    consultant: '张三',
    tel: '13888888888',
    employeeCount: 12,
    department: '技术部',
    email: '1@2.com',
    evaluator: '李四'
  },
  {
    code: 'KH002',
    name: '创新软件科技公司',
    location: '河南省郑州市',
    address: '金水区商务中心B座2002室',
    createTime: '2024-04-12 13:00',
    projectCount: 8,
    amount: 45000.0,
    type: '自动',
    consultant: '李四',
    tel: '13888888888',
    employeeCount: 15,
    department: '技术部',
    email: '2@1.com',
    evaluator: '张三'
  }
]

const handleSearch = () => {
  console.log('Searching...')
}

const onUpdate = () => {
  console.log('Update...')
  router.push('/customer/admin-area-update')
}

const handleDialogSubmit = () => {
  console.log('分配测评顾问', dialogForm.value)
  showDialog.value = false
}
</script>

<style scoped>
.el-table {
  --el-table-header-bg-color: #f5f7fa;
}

.el-table th {
  font-weight: 500;
  color: #606266;
}

.el-pagination {
  justify-content: flex-end;
}
</style>
