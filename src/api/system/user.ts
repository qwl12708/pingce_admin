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
export const getRoleList = (params: { name?: string; page?: number; pageSize?: number }) =>
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
export const deleteRoleType = (data: { id: string }) =>
  request({
    url: '/platformApi/role/type/del',
    method: 'POST',
    data
  })

// 平台/用户角色 - 创建角色
export const createRole = (data: { role_type: string; name: string; sort: number; status: number; rules: string }) =>
  request({
    url: '/platformApi/role/create',
    method: 'POST',
    data
  })

// 平台/用户角色 - 编辑角色
export const editRole = (data: {
  id?: number
  role_type?: string
  name?: string
  sort?: number
  status?: number
  rules?: string
}) =>
  request({
    url: '/platformApi/role/edit',
    method: 'POST',
    data
  })

// 平台/用户角色 - 获取角色详情
export const getRoleInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/role/info',
    method: 'GET',
    params
  })

// 平台/用户角色 - 角色开启/关闭
export const toggleRoleStatus = (data: { id?: number }) =>
  request({
    url: '/platformApi/role/status',
    method: 'POST',
    data
  })

// 平台/用户角色 - 获取绑定用户列表
export const getBoundUserList = (params: { id?: number; page?: number; pageSize?: number }) =>
  request({
    url: '/platformApi/role/user',
    method: 'GET',
    params
  })

// 平台/用户角色 - 解绑用户角色
export const unbindUserRole = (data: { role_id?: number; user_id: number }) =>
  request({
    url: '/platformApi/user/unbind/role',
    method: 'POST',
    data
  })

// 平台/用户角色 - 绑定用户角色
export const bindUserRole = (data: { role_id?: number; user_ids: string }) =>
  request({
    url: '/platformApi/user/bind/role',
    method: 'POST',
    data
  })

// 平台/部门管理 - 创建部门
export const createDepartment = (data: { name?: string; pid?: number; sort?: number; director_id?: number }) =>
  request({
    url: '/platformApi/dept/create',
    method: 'POST',
    data
  })

// 平台/部门管理 - 获取部门列表
export const getDepartmentList = (params: { name?: string }) =>
  request({
    url: '/platformApi/dept/lst',
    method: 'GET',
    params
  })

// 平台/部门管理 - 删除部门
export const deleteDepartment = (data: { id?: number }) =>
  request({
    url: '/platformApi/dept/del',
    method: 'POST',
    data
  })

// 平台/部门管理 - 获取部门详情
export const getDepartmentInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/dept/info',
    method: 'GET',
    params
  })

// 平台/部门管理 - 编辑部门
export const editDepartment = (data: {
  id?: number
  name?: string
  pid?: number
  sort?: number
  director_id?: number
}) =>
  request({
    url: '/platformApi/dept/edit',
    method: 'POST',
    data
  })

// 平台/用户管理 - 创建平台账号
export const createPlatformUser = (data: {
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
    data
  })

// 平台/用户管理 - 批量删除用户
export const deleteUsers = (data: { ids: string }) =>
  request({
    url: '/platformApi/user/del',
    method: 'POST',
    data
  })

// 平台/用户管理 - 获取用户详情
export const getUserInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/user/info',
    method: 'GET',
    params
  })

// 平台/用户管理 - 编辑用户信息
export const editUserInfo = (data: { avatar?: string; nickname?: string; dept_id?: number }) =>
  request({
    url: '/platformApi/user/edit',
    method: 'POST',
    data
  })

// 平台/自定义审批流程设置 - 新增审批流程
export const createApprovalFlow = (data: {
  name?: string
  cc_user_id?: number
  info?: string
  type_id?: number
  contents?: Array<{ name: string; type: number; uids?: string; role_id?: string }>
}) =>
  request({
    url: '/platformApi/approval/flow/add',
    method: 'POST',
    data
  })

// 平台/自定义审批流程设置 - 获取流程详情
export const getApprovalFlowInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/approval/flow/info',
    method: 'GET',
    params
  })

// 平台/自定义审批流程设置 - 获取流程列表
export const getApprovalFlowList = (params: { page: number; pageSize: number }) =>
  request({
    url: '/platformApi/approval/flow/lst',
    method: 'GET',
    params
  })

// 平台/自定义审批流程设置 - 编辑审批流程
export const editApprovalFlow = (data: {
  id?: number
  name?: string
  cc_user_id?: number
  info?: string
  type_id?: number
  contents?: Array<{ name: string; type: number; uids?: string; role_id?: string }>
}) =>
  request({
    url: '/platformApi/approval/flow/edit',
    method: 'POST',
    data
  })

// 平台/自定义审批流程设置 - 删除审批流程
export const deleteApprovalFlow = (data: { id?: number }) =>
  request({
    url: '/platformApi/approval/flow/del',
    method: 'POST',
    data
  })

// 平台/自定义审批流程设置 - 审批流程状态修改
export const toggleApprovalFlowStatus = (data: { id?: number }) =>
  request({
    url: '/platformApi/approval/flow/status',
    method: 'POST',
    data
  })

// 平台/自定义审批流程设置 - 保存流程审批规则
export const saveApprovalFlowContent = (data: { id?: number; content?: string }) =>
  request({
    url: '/platformApi/approval/flow/content',
    method: 'POST',
    data
  })

// 平台/自定义审批流程设置 - 添加审批流程分类
export const createApprovalType = (data: { name: string }) =>
  request({
    url: '/platformApi/approval/type/add',
    method: 'POST',
    data
  })

// 平台/自定义审批流程设置 - 获取审批流程分类
export const getApprovalTypeInfo = (params: { id?: number }) =>
  request({
    url: '/platformApi/approval/type/info',
    method: 'GET',
    params
  })

// 平台/自定义审批流程设置 - 编辑审批流程分类
export const editApprovalType = (data: { id?: number; name?: string }) =>
  request({
    url: '/platformApi/approval/type/edit',
    method: 'POST',
    data
  })

// 平台/自定义审批流程设置 - 获取审批流程分类列表
export const getApprovalTypeList = () =>
  request({
    url: '/platformApi/approval/type/lst',
    method: 'GET'
  })

// 平台/自定义审批流程设置 - 删除审批流程分类
export const deleteApprovalType = (data: { id?: number }) =>
  request({
    url: '/platformApi/approval/type/del',
    method: 'POST',
    data
  })

// 平台/自定义审批流程设置 - 创建审批流程适用范围
export const createApprovalRange = (data: { name: string }) =>
  request({
    url: '/platformApi/approval/rang/add',
    method: 'POST',
    data
  })

// 平台/自定义审批流程设置 - 编辑审批流程适用范围
export const editApprovalRange = (data: { id?: number; name?: string }) =>
  request({
    url: '/platformApi/approval/rang/edit',
    method: 'POST',
    data
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
export const deleteApprovalRange = (data: { id?: number }) =>
  request({
    url: '/platformApi/approval/rang/del',
    method: 'POST',
    data
  })

// 平台/系统配置 - 设置系统配置
export const setSystemConfig = (data: {
  name?: string
  logo?: string
  self_service?: number
  user_register_approval?: number
  log_expire_time?: number
}) =>
  request({
    url: '/platformApi/config/system',
    method: 'POST',
    data
  })

// 平台/系统配置 - 获取系统配置信息
export const getSystemConfig = () =>
  request({
    url: '/platformApi/config/system',
    method: 'GET'
  })

// 平台/系统配置 - 设置其他配置设置
export const setOtherConfig = (data: {
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
    data
  })

// 平台/系统配置 - 获取其他配置设置
export const getOtherConfig = () =>
  request({
    url: '/platformApi/config/other',
    method: 'GET'
  })

// 平台/通知公告 - 创建通知公告
export const createNotice = (data: { title?: string; img?: string; content?: string }) =>
  request({
    url: '/platformApi/notice/add',
    method: 'POST',
    data
  })

// 平台/通知公告 - 编辑通知公告
export const editNotice = (data: { id?: number; title?: string; img?: string; content?: string }) =>
  request({
    url: '/platformApi/notice/edit',
    method: 'POST',
    data
  })

// 平台/通知公告 - 删除通知公告
export const deleteNotice = (data: { id?: number }) =>
  request({
    url: '/platformApi/notice/del',
    method: 'POST',
    data
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
export const replyVisitorMessage = (data: { replay_content?: string; replay_time?: string; id: number }) =>
  request({
    url: '/platformApi/feedback/reply',
    method: 'POST',
    data
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
export const replySupplierMessage = (data: { replay_content?: string; replay_time?: string; id: number }) =>
  request({
    url: '/platformApi/supplier/feedback/reply',
    method: 'POST',
    data
  })

// -------
// 平台/网站-首页
const INDUSTRY_PATH = '/platformApi/industry'

// 添加岗位
export const addIndustry = (data: { name?: string }) =>
  request({
    url: INDUSTRY_PATH + '/add',
    method: 'POST',
    data
  })

// 编辑岗位
export const editIndustry = (data: { name?: string; id?: number }) =>
  request({
    url: INDUSTRY_PATH + '/edit',
    method: 'POST',
    data
  })

// 删除岗位
export const deleteIndustry = (data: { ids?: string }) =>
  request({
    url: INDUSTRY_PATH + '/del',
    method: 'POST',
    data
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

// 获取日志列表
export const getLoglist = (params: { page: number; pageSize: number }) =>
  request({
    url: '/platformApi/log/lst',
    method: 'GET',
    params
  })

// 获取日志详情
export const getLogInfo = (params: { id: number }) =>
  request({
    url: '/platformApi/log/info',
    method: 'GET',
    params
  })

// 数据统计/测评问卷统计
export const getEvaluationTotal = (params: { page: number; pageSize: number }) =>
  request({
    url: '/platformApi/user/evaluation/total',
    method: 'GET',
    params
  })

// 数据统计/自助问卷统计
export const getSelfTotal = (params: { page: number; pageSize: number }) =>
  request({
    url: '/platformApi/user/self/total',
    method: 'GET',
    params
  })

// 备份配置获取
export const getBackupConfig = () =>
  request({
    url: '/platformApi/backup/config',
    method: 'GET'
  })

// 备份配置设置
export const setBackupConfig = (data: { content: string }) =>
  request({
    url: '/platformApi/backup/config/set',
    method: 'POST',
    data
  })

// 获取当前登录用户的信息
export const getCurrentUserInfo = () =>
  request({
    url: '/platformApi/user/person/info',
    method: 'GET'
  })

// 修改当前登录用户的信息
export const editCurrentUserInfo = (data: { avatar?: string; nickname?: string; dept_id?: number }) =>
  request({
    url: '/platformApi/user/person/edit',
    method: 'POST',
    data
  })

// 修改当前登录用户的密码
export const editCurrentUserPassword = (data: { pwd?: string; repwd?: string }) =>
  request({
    url: '/platformApi/user/person/pwd',
    method: 'POST',
    data
  })
