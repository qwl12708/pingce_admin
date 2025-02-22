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

// 获取客户列表
/**
 *
 * @param params
 * @returns {
    "code": 0,
    "data": {
        "list": [
            {
                "id": 0,
                "org_name": "string",
                "email": "string",
                "phone": "string",
                "phone1": "string",
                "phone2": "string",
                "contacts": "string",
                "approve_status": 0,
                "approval_info": "string",
                "status": 0,
                "project_num": 0,
                "answer_num": 0,
                "create_time": 0,
                "industry_name": "string",
                "counsellor_name": "string",
                "counsellor_phone": "string",
                "province_name": "string",
                "city_name": "string"
            }
        ],
        "total": 0,
        "week_total": 0
    },
    "msg": "string"
}
 */
export const getInstitutionList = (params: { page?: string[]; pageSize?: string }) =>
  request({
    url: INSTITUTION_PATH + '/lst',
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
