import request from '@/plugins/request'

// 平台/公共接口 - 图片上传
export const uploadImage = (data: { file: File }) =>
  request({
    url: '/platformApi/upload/image',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

// 平台/公共接口 - 获取用户列表
export const getUserList = (params: { name?: string; page?: number; pageSize?: number }) =>
  request({
    url: '/platformApi/user/lst',
    method: 'GET',
    params
  })

// 平台/用户角色 - 获取角色列表
export const getRoleList = (params: { page?: number; pageSize?: number }) =>
  request({
    url: '/platformApi/role/lst',
    method: 'GET',
    params
  })

// 平台/用户角色 - 获取角色类型列表
export const getRoleTypeList = () =>
  request({
    url: '/platformApi/role/type/lst',
    method: 'GET'
  })

// 平台/用户角色 - 创建角色类型
export const createRoleType = (data: { name: string }) =>
  request({
    url: '/platformApi/role/type/create',
    method: 'POST',
    data
  })

// 平台/用户角色 - 编辑角色类型
export const editRoleType = (data: { id: number; name: string }) =>
  request({
    url: '/platformApi/role/type/edit',
    method: 'POST',
    data
  })

// 平台/用户角色 - 删除角色类型
export const deleteRoleType = (params: { id: string }) =>
  request({
    url: '/platformApi/role/type/del',
    method: 'POST',
    params
  })

// 平台/用户角色 - 创建角色
export const createRole = (params: { type_id: number; name: string; sort: number; status: number; rules: string }) =>
  request({
    url: '/platformApi/role/create',
    method: 'POST',
    params
  })

// 平台/用户角色 - 编辑角色
export const editRole = (params: {
  id?: number
  type_id?: number
  name?: string
  sort?: number
  status?: number
  rules?: string
}) =>
  request({
    url: '/platformApi/role/edit',
    method: 'POST',
    params
  })

// 平台/用户角色 - 获取角色详情
export const getRoleInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/role/info',
    method: 'GET',
    params
  })

// 平台/用户角色 - 角色开启/关闭
export const toggleRoleStatus = (params: { id?: number }) =>
  request({
    url: '/platformApi/role/status',
    method: 'POST',
    params
  })

// 平台/用户角色 - 获取绑定用户列表
export const getBoundUserList = (params: { id?: number; page?: number; pageSize?: number }) =>
  request({
    url: '/platformApi/role/user',
    method: 'GET',
    params
  })

// 平台/部门管理 - 创建部门
export const createDepartment = (params: { name?: string; pid?: number; sort?: number; director_id?: number }) =>
  request({
    url: '/platformApi/dept/create',
    method: 'POST',
    params
  })

// 平台/部门管理 - 获取部门列表
export const getDepartmentList = () =>
  request({
    url: '/platformApi/dept/lst',
    method: 'GET'
  })

// 平台/部门管理 - 删除部门
export const deleteDepartment = (params: { id?: number }) =>
  request({
    url: '/platformApi/dept/del',
    method: 'POST',
    params
  })

// 平台/部门管理 - 获取部门详情
export const getDepartmentInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/dept/info',
    method: 'GET',
    params
  })

// 平台/部门管理 - 编辑部门
export const editDepartment = (params: {
  id?: number
  name?: string
  pid?: number
  sort?: number
  director_id?: number
}) =>
  request({
    url: '/platformApi/dept/edit',
    method: 'POST',
    params
  })

// 平台/用户管理 - 创建平台账号
export const createPlatformUser = (params: {
  name?: string
  username?: string
  phone?: string
  role_id?: number
  dept_id?: number
  wechat_account?: string
}) =>
  request({
    url: '/platformApi/user/add',
    method: 'POST',
    params
  })

// 平台/用户管理 - 批量删除用户
export const deleteUsers = (params: { ids: string }) =>
  request({
    url: '/platformApi/user/del',
    method: 'POST',
    params
  })

// 平台/用户管理 - 获取用户详情
export const getUserInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/user/info',
    method: 'GET',
    params
  })

// 平台/用户管理 - 编辑用户信息
export const editUserInfo = (params: { avatar?: string; nickname?: string; dept_id?: number }) =>
  request({
    url: '/platformApi/user/edit',
    method: 'POST',
    params
  })

// 平台/自定义审批流程设置 - 新增审批流程
export const createApprovalFlow = (params: { name?: string; cc_user_id?: number; info?: string; type_id?: number }) =>
  request({
    url: '/platformApi/approval/flow/add',
    method: 'POST',
    params
  })

// 平台/自定义审批流程设置 - 获取流程详情
export const getApprovalFlowInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/approval/flow/info',
    method: 'GET',
    params
  })

// 平台/自定义审批流程设置 - 编辑审批流程
export const editApprovalFlow = (params: {
  id?: number
  name?: string
  cc_user_id?: number
  info?: string
  type_id?: number
}) =>
  request({
    url: '/platformApi/approval/flow/edit',
    method: 'POST',
    params
  })

// 平台/自定义审批流程设置 - 删除审批流程
export const deleteApprovalFlow = (params: { id?: number }) =>
  request({
    url: '/platformApi/approval/flow/del',
    method: 'POST',
    params
  })

// 平台/自定义审批流程设置 - 审批流程状态修改
export const toggleApprovalFlowStatus = (params: { id?: number }) =>
  request({
    url: '/platformApi/approval/flow/status',
    method: 'POST',
    params
  })

// 平台/自定义审批流程设置 - 保存流程审批规则
export const saveApprovalFlowContent = (params: { id?: number; content?: string }) =>
  request({
    url: '/platformApi/approval/flow/content',
    method: 'POST',
    params
  })

// 平台/自定义审批流程设置 - 添加审批流程分类
export const createApprovalType = (params: { name: string }) =>
  request({
    url: '/platformApi/approval/type/add',
    method: 'POST',
    params
  })

// 平台/自定义审批流程设置 - 获取审批流程分类
export const getApprovalTypeInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/approval/type/info',
    method: 'GET',
    params
  })

// 平台/自定义审批流程设置 - 编辑审批流程分类
export const editApprovalType = (params: { id?: number; name?: string }) =>
  request({
    url: '/platformApi/approval/type/edit',
    method: 'POST',
    params
  })

// 平台/自定义审批流程设置 - 获取审批流程分类列表
export const getApprovalTypeList = () =>
  request({
    url: '/platformApi/approval/type/lst',
    method: 'GET'
  })

// 平台/自定义审批流程设置 - 删除审批流程分类
export const deleteApprovalType = (params: { id?: number }) =>
  request({
    url: '/platformApi/approval/type/del',
    method: 'POST',
    params
  })

// 平台/自定义审批流程设置 - 创建审批流程适用范围
export const createApprovalRange = (params: { name: string }) =>
  request({
    url: '/platformApi/approval/rang/add',
    method: 'POST',
    params
  })

// 平台/自定义审批流程设置 - 编辑审批流程适用范围
export const editApprovalRange = (params: { id?: number; name?: string }) =>
  request({
    url: '/platformApi/approval/rang/edit',
    method: 'POST',
    params
  })

// 平台/自定义审批流程设置 - 获取审批流程详情
export const getApprovalRangeInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/approval/rang/info',
    method: 'GET',
    params
  })

// 平台/自定义审批流程设置 - 获取审批适用范围列表
export const getApprovalRangeList = () =>
  request({
    url: '/platformApi/approval/rang/lst',
    method: 'GET'
  })

// 平台/自定义审批流程设置 - 删除审批适用范围
export const deleteApprovalRange = (params: { id?: number }) =>
  request({
    url: '/platformApi/approval/rang/del',
    method: 'POST',
    params
  })

// 平台/系统配置 - 设置系统配置
export const setSystemConfig = (params: {
  name?: string
  logo?: string
  self_service?: number
  user_register_approval?: number
  log_expire_time?: number
}) =>
  request({
    url: '/platformApi/config/system',
    method: 'POST',
    params
  })

// 平台/系统配置 - 获取系统配置信息
export const getSystemConfig = () =>
  request({
    url: '/platformApi/config/system',
    method: 'GET'
  })

// 平台/系统配置 - 设置其他配置设置
export const setOtherConfig = (params: {
  service_protocol_name?: string
  service_protocol_size?: number
  service_protocol_file?: string
  privacy_protocol_name?: string
  privacy_protocol_size?: string
  privacy_protocol_file?: string
  client_use_name?: string
  client_use_size?: number
  client_use_file?: string
  call_center_phone?: string
  wechat_name?: string
  wechat_size?: number
  wechat_file?: string
  job_evaluation_intro?: string
  customized_evaluation_intro?: string
  bottom_nav_content?: string
  copyright_intro?: string
  privacy_intro?: string
}) =>
  request({
    url: '/platformApi/config/other',
    method: 'POST',
    params
  })

// 平台/系统配置 - 获取其他配置设置
export const getOtherConfig = () =>
  request({
    url: '/platformApi/config/other',
    method: 'GET'
  })

// 平台/通知公告 - 创建通知公告
export const createNotice = (params: { title?: string; img?: string; content?: string }) =>
  request({
    url: '/platformApi/notice/add',
    method: 'POST',
    params
  })

// 平台/通知公告 - 编辑通知公告
export const editNotice = (params: { id?: number; title?: string; img?: string; content?: string }) =>
  request({
    url: '/platformApi/notice/edit',
    method: 'POST',
    params
  })

// 平台/通知公告 - 删除通知公告
export const deleteNotice = (params: { id?: number }) =>
  request({
    url: '/platformApi/notice/del',
    method: 'POST',
    params
  })

// 平台/通知公告 - 获取通知详情
export const getNoticeInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/notice/info',
    method: 'GET',
    params
  })

// 平台/通知公告 - 获取通知列表
export const getNoticeList = (params: { page?: number; pageSize?: number }) =>
  request({
    url: '/platformApi/notice/lst',
    method: 'GET',
    params
  })

// 平台/访客留言 - 获取访客列表
export const getVisitorMessages = (params: { page?: number; pageSize?: number }) =>
  request({
    url: '/platformApi/feedback/lst',
    method: 'GET',
    params
  })

// 平台/访客留言 - 获取访客留言详情
export const getVisitorMessageInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/feedback/info',
    method: 'GET',
    params
  })

// 平台/访客留言 - 回复访客留言
export const replyVisitorMessage = (params: { replay_content?: string; replay_time?: string; id: number }) =>
  request({
    url: '/platformApi/feedback/reply',
    method: 'POST',
    params
  })

// 平台/供应商留言 - 获取供应商留言列表
export const getSupplierMessages = (params: { page?: number; pageSize?: number }) =>
  request({
    url: '/platformApi/supplier/feedback/lst',
    method: 'GET',
    params
  })

// 平台/供应商留言 - 获取供应商留言详情
export const getSupplierMessageInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/supplier/feedback/info',
    method: 'GET',
    params
  })

// 平台/供应商留言 - 回复供应商留言
export const replySupplierMessage = (params: { replay_content?: string; replay_time?: string; id: number }) =>
  request({
    url: '/platformApi/supplier/feedback/reply',
    method: 'POST',
    params
  })

// -------
// 平台/网站-首页

const INDUSTRY_PATH = '/platformApi/industry'
const INSTITUTION_PATH = '/platformApi/institution'
const USER_PATH = '/platformApi/user'
const INVITE_PATH = '/platformApi/invite'
const ANSWER_PATH = '/platformApi/answer'
const QUESTIONNAIRE_PATH = '/platformApi/questionnaire'
const PRODUCT_PATH = '/platformApi/product'

// 添加岗位
export const addIndustry = (params: { name?: string }) =>
  request({
    url: INDUSTRY_PATH + '/add',
    method: 'POST',
    params
  })

// 编辑岗位
export const editIndustry = (params: { name?: string; id?: number }) =>
  request({
    url: INDUSTRY_PATH + '/edit',
    method: 'POST',
    params
  })

// 删除岗位
export const deleteIndustry = (params: { ids?: string }) =>
  request({
    url: INDUSTRY_PATH + '/del',
    method: 'POST',
    params
  })

// 获取岗位详情
export const getIndustryInfo = (params: { id?: string }) =>
  request({
    url: INDUSTRY_PATH + '/info',
    method: 'GET',
    params
  })

// 获取岗位列表
export const getIndustryList = (params: { id?: string }) =>
  request({
    url: INDUSTRY_PATH + '/lst',
    method: 'GET',
    params
  })

// 添加客户
export const addInstitution = (params: {
  type?: number
  org_name?: string
  employees_num?: number
  industry_id?: string
  email?: string
  org_logo?: string
  org_voucher?: string
  phone?: string
  name?: string
  contacts?: string
  province_id?: string
  city_id?: string
  phone1?: string
  phone2?: string
  counsellor_id?: number
}) =>
  request({
    url: INSTITUTION_PATH + '/add',
    method: 'POST',
    params
  })

// 修改客户
export const editInstitution = (params: {
  type?: number
  org_name?: string
  employees_num?: number
  industry_id?: string
  email?: string
  org_logo?: string
  org_voucher?: string
  phone?: string
  name?: string
  contacts?: string
  province_id?: string
  city_id?: string
  phone1?: string
  phone2?: string
  counsellor_id?: number
  id?: number
}) =>
  request({
    url: INSTITUTION_PATH + '/edit',
    method: 'POST',
    params
  })

// 修改客户状态
export const updateInstitutionStatus = (params: { id?: number }) =>
  request({
    url: INSTITUTION_PATH + '/status',
    method: 'POST',
    params
  })

// 获取客户列表
export const getInstitutionList = (params: { page?: string[]; pageSize?: string }) =>
  request({
    url: INSTITUTION_PATH + '/lst',
    method: 'GET',
    params
  })

// 获取客户详情
export const getInstitutionInfo = (params: { id?: number }) =>
  request({
    url: INSTITUTION_PATH + '/info',
    method: 'GET',
    params
  })

// 用户绑定管理区域
export const bindUserArea = (params: { id?: number; area?: string }) =>
  request({
    url: USER_PATH + '/bind/area',
    method: 'POST',
    params
  })

// 获取评测顾问列表
export const getConsultantList = () =>
  request({
    url: USER_PATH + '/consultant/lst',
    method: 'GET'
  })

// 绑定评测顾问
export const bindConsultant = (params: { id?: number; consultant_id?: number }) =>
  request({
    url: INSTITUTION_PATH + '/bind/consultant',
    method: 'POST',
    params
  })

// 添加邀请模板替换关键字
export const addInviteKey = (params: { name?: string; key?: string }) =>
  request({
    url: INVITE_PATH + '/key/add',
    method: 'POST',
    params
  })

// 添加邀请模板
export const addInviteTemplate = (params: {
  name?: string
  content?: string
  replace_content?: string
  intro?: string
}) =>
  request({
    url: INVITE_PATH + '/template/add',
    method: 'POST',
    params
  })

// 编辑邀请模板
export const editInviteTemplate = (params: {
  name?: string
  content?: string
  replace_content?: string
  intro?: string
  id?: number
}) =>
  request({
    url: INVITE_PATH + '/template/edit',
    method: 'POST',
    params
  })

// 删除邀请模板
export const deleteInviteTemplate = (params: { ids?: string }) =>
  request({
    url: INVITE_PATH + '/template/del',
    method: 'POST',
    params
  })

// 获取邀请模板详情
export const getInviteTemplateInfo = (params: { id?: string }) =>
  request({
    url: INVITE_PATH + '/template/info',
    method: 'GET',
    params
  })

// 获取邀请模板列表
export const getInviteTemplateList = () =>
  request({
    url: INVITE_PATH + '/template/lst',
    method: 'GET'
  })

// 编辑邀请模板替换关键字
export const editInviteKey = (params: { name?: string; key?: string; id?: number }) =>
  request({
    url: INVITE_PATH + '/key/edit',
    method: 'POST',
    params
  })

// 删除邀请模板替换关键字
export const deleteInviteKey = (params: { ids?: string }) =>
  request({
    url: INVITE_PATH + '/key/del',
    method: 'POST',
    params
  })

// 获取邀请模板替换关键字详情
export const getInviteKeyInfo = (params: { id?: string }) =>
  request({
    url: INVITE_PATH + '/key/info',
    method: 'GET',
    params
  })

// 获取邀请模板替换关键字列表
export const getInviteKeyList = () =>
  request({
    url: INVITE_PATH + '/key/lst',
    method: 'GET'
  })

// 添加作答指引模板
export const addAnswerTemplate = (params: { name?: string; content?: string }) =>
  request({
    url: ANSWER_PATH + '/template/add',
    method: 'POST',
    params
  })

// 编辑作答指引模板
export const editAnswerTemplate = (params: { name?: string; content?: string; id?: number }) =>
  request({
    url: ANSWER_PATH + '/template/edit',
    method: 'POST',
    params
  })

// 删除作答指引模板
export const deleteAnswerTemplate = (params: { ids?: string }) =>
  request({
    url: ANSWER_PATH + '/template/del',
    method: 'POST',
    params
  })

// 获取作答指引模板详情
export const getAnswerTemplateInfo = (params: { id?: string }) =>
  request({
    url: ANSWER_PATH + '/template/info',
    method: 'GET',
    params
  })

// 获取作答指引模板列表
export const getAnswerTemplateList = () =>
  request({
    url: ANSWER_PATH + '/template/lst',
    method: 'GET'
  })

// 创建岗位类型
export const addJobType = (params: { name?: string }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/job/type/add',
    method: 'POST',
    params
  })

// 创建岗位
export const addJob = (params: { name?: string }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/job/add',
    method: 'POST',
    params
  })

// 获取岗位类型列表
export const getJobTypeList = () =>
  request({
    url: QUESTIONNAIRE_PATH + '/job/type/lst',
    method: 'GET'
  })

// 获取岗位列表
export const getJobList = () =>
  request({
    url: QUESTIONNAIRE_PATH + '/job/lst',
    method: 'GET'
  })

// 获取问卷调查列表
export const getQuestionnaireList = (params: { page?: number; pageSize?: number }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/lst',
    method: 'GET',
    params
  })

// 获取问卷调查详情
export const getQuestionnaireInfo = (params: { id?: number }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/info',
    method: 'GET',
    params
  })

// 添加问卷调查
export const addQuestionnaire = (params: {
  type?: number
  post_type_id?: number
  job_id?: number
  name?: string
  answer_time?: number
  score?: number
  is_rand?: number
  switching_screens_num?: number
  is_switching_screens?: number
  report_type?: number
  info?: string
  invite_id?: number
  answer_id?: number
  questionnaire_path?: string
  result_path?: string
  report_path?: string
  info_path?: string
}) =>
  request({
    url: QUESTIONNAIRE_PATH + '/add',
    method: 'POST',
    params
  })

// 编辑问卷调查
export const editQuestionnaire = (params: {
  type?: number
  post_type_id?: number
  job_id?: number
  name?: string
  answer_time?: number
  score?: number
  is_rand?: number
  switching_screens_num?: number
  is_switching_screens?: number
  report_type?: number
  info?: string
  invite_id?: number
  answer_id?: number
  questionnaire_path?: string
  result_path?: string
  report_path?: string
  info_path?: string
  id?: number
}) =>
  request({
    url: QUESTIONNAIRE_PATH + '/edit',
    method: 'POST',
    params
  })

// 删除问卷调查
export const deleteQuestionnaire = (params: { ids?: string }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/del',
    method: 'POST',
    params
  })

// 更新问卷调查状态
export const updateQuestionnaireStatus = (params: { id?: string }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/status',
    method: 'POST',
    params
  })

// 问卷调查-试题
export const handleQuestionnaireQuestion = (params: { content?: string; questionnaire_id?: number; del_id?: string }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/question/handle',
    method: 'POST',
    params
  })

// 问卷调查-试题获取
export const getQuestionnaireQuestionList = (params: { questionnaire_id?: number }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/question/lst',
    method: 'GET',
    params
  })

// 添加产品套餐
export const addProduct = (params: {
  name?: string
  type?: number
  score?: number
  is_limit_area?: number
  limit_area?: string
  day?: number
  price?: number
  evaluation_type?: number
  evaluation_id?: number
}) =>
  request({
    url: PRODUCT_PATH + '/add',
    method: 'POST',
    params
  })

// 编辑产品套餐
export const editProduct = (params: {
  name?: string
  type?: number
  score?: number
  is_limit_area?: number
  limit_area?: string
  day?: number
  price?: number
  evaluation_type?: number
  evaluation_id?: number
  id?: number
}) =>
  request({
    url: PRODUCT_PATH + '/edit',
    method: 'POST',
    params
  })

// 删除产品套餐
export const deleteProduct = (params: { ids?: string }) =>
  request({
    url: PRODUCT_PATH + '/del',
    method: 'POST',
    params
  })

// 获取产品套餐
export const getProductList = (params: { page?: number; pageSize?: number }) =>
  request({
    url: PRODUCT_PATH + '/lst',
    method: 'GET',
    params
  })

// 获取产品套餐详情
export const getProductInfo = (params: { id?: number }) =>
  request({
    url: PRODUCT_PATH + '/info',
    method: 'GET',
    params
  })
