import request from '@/utils/request'

// 平台/公共接口
export const uploadImage = (data: FormData) => {
  return request({
    url: '/platformApi/upload/image',
    method: 'post',
    data
  })
}

export const getUserList = (params: { name?: string; page?: number; pageSize?: number }) => {
  return request({
    url: '/platformApi/user/lst',
    method: 'get',
    params
  })
}

// 平台/用户角色
export const getRoleList = (params: { page?: number; pageSize?: number }) => {
  return request({
    url: '/platformApi/role/lst',
    method: 'get',
    params
  })
}

export const getRoleTypeList = () => {
  return request({
    url: '/platformApi/role/type/lst',
    method: 'get'
  })
}

export const createRoleType = (data: { name: string }) => {
  return request({
    url: '/platformApi/role/type/create',
    method: 'post',
    data
  })
}

export const editRoleType = (data: { id: number; name: string }) => {
  return request({
    url: '/platformApi/role/type/edit',
    method: 'post',
    data
  })
}

export const deleteRoleType = (params: { id: number }) => {
  return request({
    url: '/platformApi/role/type/del',
    method: 'post',
    params
  })
}

export const createRole = (data: { type_id: number; name: string; sort: number; status: number; rules: string }) => {
  return request({
    url: '/platformApi/role/create',
    method: 'post',
    data
  })
}

export const editRole = (data: {
  id: number
  type_id: number
  name: string
  sort: number
  status: number
  rules: string
}) => {
  return request({
    url: '/platformApi/role/edit',
    method: 'post',
    data
  })
}

export const deleteRole = (params: { ids: string }) => {
  return request({
    url: '/platformApi/role/del',
    method: 'post',
    params
  })
}

export const getRoleInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/role/info',
    method: 'get',
    params
  })
}

export const toggleRoleStatus = (params: { id: number }) => {
  return request({
    url: '/platformApi/role/status',
    method: 'post',
    params
  })
}

export const getRoleUsers = (params: { id: number; page?: number; pageSize?: number }) => {
  return request({
    url: '/platformApi/role/user',
    method: 'get',
    params
  })
}

// 平台/部门管理
export const createDepartment = (data: { name: string; pid: number; sort: number; director_id: number }) => {
  return request({
    url: '/platformApi/dept/create',
    method: 'post',
    data
  })
}

export const getDepartmentList = () => {
  return request({
    url: '/platformApi/dept/lst',
    method: 'get'
  })
}

export const deleteDepartment = (params: { id: number }) => {
  return request({
    url: '/platformApi/dept/del',
    method: 'post',
    params
  })
}

export const getDepartmentInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/dept/info',
    method: 'get',
    params
  })
}

export const editDepartment = (data: { id: number; name: string; pid: number; sort: number; director_id: number }) => {
  return request({
    url: '/platformApi/dept/edit',
    method: 'post',
    data
  })
}

// 平台/用户管理
export const createUser = (data: {
  name: string
  username: string
  phone: string
  role_id: number
  dept_id: number
  wechat_account: string
}) => {
  return request({
    url: '/platformApi/user/add',
    method: 'post',
    data
  })
}

export const deleteUser = (params: { ids: string }) => {
  return request({
    url: '/platformApi/user/del',
    method: 'post',
    params
  })
}

export const getUserInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/user/info',
    method: 'get',
    params
  })
}

export const editUser = (data: { avatar: string; nickname: string; dept_id: number }) => {
  return request({
    url: '/platformApi/user/edit',
    method: 'post',
    data
  })
}

export const unbindUserRole = (params: { role_id: number; user_id: number }) => {
  return request({
    url: '/platformApi/user/unbind/role',
    method: 'post',
    params
  })
}

export const bindUserRole = (data: { user_ids: string; role_id: number }) => {
  return request({
    url: '/platformApi/user/bind/role',
    method: 'post',
    data
  })
}

// 平台/自定义审批流程设置
export const addApprovalFlow = (data: { name: string; cc_user_id: number; info: string; type_id: number }) => {
  return request({
    url: '/platformApi/approval/flow/add',
    method: 'post',
    data
  })
}

export const getApprovalFlowInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/approval/flow/info',
    method: 'get',
    params
  })
}

export const editApprovalFlow = (data: {
  id: number
  name: string
  cc_user_id: number
  info: string
  type_id: number
}) => {
  return request({
    url: '/platformApi/approval/flow/edit',
    method: 'post',
    data
  })
}

export const deleteApprovalFlow = (params: { id: number }) => {
  return request({
    url: '/platformApi/approval/flow/del',
    method: 'post',
    params
  })
}

export const toggleApprovalFlowStatus = (params: { id: number }) => {
  return request({
    url: '/platformApi/approval/flow/status',
    method: 'post',
    params
  })
}

export const saveApprovalFlowContent = (data: { id: number; content: string }) => {
  return request({
    url: '/platformApi/approval/flow/content',
    method: 'post',
    data
  })
}

export const addApprovalType = (data: { name: string }) => {
  return request({
    url: '/platformApi/approval/type/add',
    method: 'post',
    data
  })
}

export const getApprovalTypeInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/approval/type/info',
    method: 'get',
    params
  })
}

export const editApprovalType = (data: { id: number; name: string }) => {
  return request({
    url: '/platformApi/approval/type/edit',
    method: 'post',
    data
  })
}

export const deleteApprovalType = (params: { id: number }) => {
  return request({
    url: '/platformApi/approval/type/del',
    method: 'post',
    params
  })
}

export const getApprovalTypeList = () => {
  return request({
    url: '/platformApi/approval/type/lst',
    method: 'get'
  })
}

export const addApprovalRange = (data: { name: string }) => {
  return request({
    url: '/platformApi/approval/rang/add',
    method: 'post',
    data
  })
}

export const editApprovalRange = (data: { id: number; name: string }) => {
  return request({
    url: '/platformApi/approval/rang/edit',
    method: 'post',
    data
  })
}

export const getApprovalRangeInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/approval/rang/info',
    method: 'get',
    params
  })
}

export const getApprovalRangeList = () => {
  return request({
    url: '/platformApi/approval/rang/lst',
    method: 'get'
  })
}

export const deleteApprovalRange = (params: { id: number }) => {
  return request({
    url: '/platformApi/approval/rang/del',
    method: 'post',
    params
  })
}

// 平台/系统配置
export const setSystemConfig = (data: {
  name: string
  logo: string
  self_service: number
  user_register_approval: number
  log_expire_time: number
}) => {
  return request({
    url: '/platformApi/config/system',
    method: 'post',
    data
  })
}

export const getSystemConfig = () => {
  return request({
    url: '/platformApi/config/system',
    method: 'get'
  })
}

export const setOtherConfig = (data: {
  service_protocol_name: string
  service_protocol_size: number
  service_protocol_file: string
  privacy_protocol_name: string
  privacy_protocol_size: number
  privacy_protocol_file: string
  client_use_name: string
  client_use_size: number
  client_use_file: string
  call_center_phone: string
  wechat_name: string
  wechat_size: number
  wechat_file: string
  job_evaluation_intro: string
  customized_evaluation_intro: string
  bottom_nav_content: string
  copyright_intro: string
  privacy_intro: string
}) => {
  return request({
    url: '/platformApi/config/other',
    method: 'post',
    data
  })
}

export const getOtherConfig = () => {
  return request({
    url: '/platformApi/config/other',
    method: 'get'
  })
}

export const setProductConfig = (data: { product_intro: string; product_info: string }) => {
  return request({
    url: '/platformApi/config/product',
    method: 'post',
    data
  })
}

export const getProductConfig = () => {
  return request({
    url: '/platformApi/config/product',
    method: 'get'
  })
}

export const setWelfareConfig = (data: { info: string }) => {
  return request({
    url: '/platformApi/config/welfare',
    method: 'post',
    data
  })
}

export const getWelfareConfig = () => {
  return request({
    url: '/platformApi/config/welfare',
    method: 'get'
  })
}

export const setCooperationConfig = (data: { info: string }) => {
  return request({
    url: '/platformApi/config/cooperation',
    method: 'post',
    data
  })
}

export const getCooperationConfig = () => {
  return request({
    url: '/platformApi/config/cooperation',
    method: 'get'
  })
}

export const setUnderstandConfig = (data: { info: string; is_show_feedback: number }) => {
  return request({
    url: '/platformApi/config/understand',
    method: 'post',
    data
  })
}

export const getUnderstandConfig = () => {
  return request({
    url: '/platformApi/config/understand',
    method: 'get'
  })
}

export const setContactConfig = (data: {
  info: string
  is_name_need: number
  is_phone_need: number
  is_feedback_need: number
}) => {
  return request({
    url: '/platformApi/config/contact',
    method: 'post',
    data
  })
}

export const getContactConfig = () => {
  return request({
    url: '/platformApi/config/contact',
    method: 'get'
  })
}

// 平台/通知公告
export const createNotice = (data: { title: string; img: string; content: string }) => {
  return request({
    url: '/platformApi/notice/add',
    method: 'post',
    data
  })
}

export const editNotice = (data: { id: number; title: string; img: string; content: string }) => {
  return request({
    url: '/platformApi/notice/edit',
    method: 'post',
    data
  })
}

export const deleteNotice = (params: { id: number }) => {
  return request({
    url: '/platformApi/notice/del',
    method: 'post',
    params
  })
}

export const getNoticeInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/notice/info',
    method: 'get',
    params
  })
}

export const getNoticeList = (params: { page?: number; pageSize?: number }) => {
  return request({
    url: '/platformApi/notice/lst',
    method: 'get',
    params
  })
}

// 平台/访客留言
export const getFeedbackList = (params: { page?: number; pageSize?: number }) => {
  return request({
    url: '/platformApi/feedback/lst',
    method: 'get',
    params
  })
}

export const getFeedbackInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/feedback/info',
    method: 'get',
    params
  })
}

export const replyFeedback = (data: { replay_content: string; replay_time: string; id: number }) => {
  return request({
    url: '/platformApi/feedback/reply',
    method: 'post',
    data
  })
}

// 平台/供应商留言
export const getSupplierFeedbackList = (params: { page?: number; pageSize?: number }) => {
  return request({
    url: '/platformApi/supplier/feedback/lst',
    method: 'get',
    params
  })
}

export const getSupplierFeedbackInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/supplier/feedback/info',
    method: 'get',
    params
  })
}

export const replySupplierFeedback = (data: { replay_content: string; replay_time: string; id: number }) => {
  return request({
    url: '/platformApi/supplier/feedback/reply',
    method: 'post',
    data
  })
}

// 平台/网站-banner
export const createBanner = (data: { type: number; sort: number; img: string; content: string }) => {
  return request({
    url: '/platformApi/banner/add',
    method: 'post',
    data
  })
}

export const editBanner = (data: { id: number; type: number; sort: number; img: string; content: string }) => {
  return request({
    url: '/platformApi/banner/edit',
    method: 'post',
    data
  })
}

export const deleteBanner = (params: { ids: string }) => {
  return request({
    url: '/platformApi/banner/del',
    method: 'post',
    params
  })
}

export const getBannerInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/banner/info',
    method: 'get',
    params
  })
}

export const getBannerList = (params: { page?: number; pageSize?: number }) => {
  return request({
    url: '/platformApi/banner/lst',
    method: 'get',
    params
  })
}

// 平台/网站-首页
export const addAdvantage = (data: { title: string; content: string; icon: string; sort: number }) => {
  return request({
    url: '/platformApi/advantage/add',
    method: 'post',
    data
  })
}

export const editAdvantage = (data: { id: number; title: string; content: string; icon: string; sort: number }) => {
  return request({
    url: '/platformApi/advantage/edit',
    method: 'post',
    data
  })
}

export const deleteAdvantage = (params: { ids: string }) => {
  return request({
    url: '/platformApi/advantage/del',
    method: 'post',
    params
  })
}

export const getAdvantageInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/advantage/info',
    method: 'get',
    params
  })
}

export const getAdvantageList = (params: { page?: number; pageSize?: number }) => {
  return request({
    url: '/platformApi/advantage/lst',
    method: 'get',
    params
  })
}

export const toggleAdvantageStatus = (params: { id: number }) => {
  return request({
    url: '/platformApi/advantage/status',
    method: 'post',
    params
  })
}

export const addCustomer = (data: { title: string; icon: string; sort: number }) => {
  return request({
    url: '/platformApi/customer/add',
    method: 'post',
    data
  })
}

export const editCustomer = (data: { id: number; title: string; icon: string; sort: number }) => {
  return request({
    url: '/platformApi/customer/edit',
    method: 'post',
    data
  })
}

export const deleteCustomer = (params: { ids: string }) => {
  return request({
    url: '/platformApi/customer/del',
    method: 'post',
    params
  })
}

export const getCustomerInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/customer/info',
    method: 'get',
    params
  })
}

export const getCustomerList = (params: { page?: number; pageSize?: number }) => {
  return request({
    url: '/platformApi/customer/lst',
    method: 'get',
    params
  })
}
