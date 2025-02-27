import request from '@/plugins/request'
const INSTITUTION_PATH = '/platformApi/institution'
const USER_PATH = '/platformApi/user'

// 添加客户
export const addInstitution = (data: {
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
    data
  })

// 修改客户
export const editInstitution = (data: {
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
    data
  })

// 修改客户状态
export const updateInstitutionStatus = (data: { id?: number }) =>
  request({
    url: INSTITUTION_PATH + '/status',
    method: 'POST',
    data
  })

// 获取自助客户列表
export const getInstitutionList = (params: { page?: number; pageSize?: number }) =>
  request({
    url: INSTITUTION_PATH + '/self/lst',
    method: 'GET',
    params
  })

// 获取测评客户列表
export const getEvaluationList = (params: { page?: number; pageSize?: number }) =>
  request({
    url: INSTITUTION_PATH + '/evaluation/lst',
    method: 'GET',
    params
  })

// 获取客户详情
export const getInstitutionInfo = (params: { id: number }) =>
  request({
    url: INSTITUTION_PATH + '/info',
    method: 'GET',
    params
  })

// 用户绑定管理区域
export const bindUserArea = (data: { id?: number; area?: string }) =>
  request({
    url: USER_PATH + '/bind/area',
    method: 'POST',
    data
  })

// 获取评测顾问列表
export const getConsultantList = () =>
  request({
    url: USER_PATH + '/consultant/lst',
    method: 'GET'
  })

// 绑定评测顾问
export const bindConsultant = (data: { id?: number; consultant_id?: number }) =>
  request({
    url: INSTITUTION_PATH + '/bind/consultant',
    method: 'POST',
    data
  })

// 获取客户可使用积分和冻结积分
export const getScoreInfo = (params: { id: string[] }) =>
  request({
    url: INSTITUTION_PATH + '/score/info',
    method: 'GET',
    params
  })

// 获取客户点数到期时间
export const getExpireScore = (params: { id: number; page: number; pageSize: number }) =>
  request({
    url: INSTITUTION_PATH + '/expire/score',
    method: 'GET',
    params
  })

// 获取客户使用中的套餐
export const getUsedProduct = (params: { id: number; page: number; pageSize: number }) =>
  request({
    url: INSTITUTION_PATH + '/use/product',
    method: 'GET',
    params
  })

// 获取客户点数的套餐
export const getScoreProduct = (params: { id: number; page: number; pageSize: number }) =>
  request({
    url: INSTITUTION_PATH + '/score/product',
    method: 'GET',
    params
  })

// 获取客户所有的套餐
export const getAllProduct = (params: { id: number; page: number; pageSize: number }) =>
  request({
    url: INSTITUTION_PATH + '/all/product',
    method: 'GET',
    params
  })
