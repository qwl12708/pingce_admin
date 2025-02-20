import request from '@/plugins/request'

const ADVANTAGE_PATH = '/platformApi/advantage'
const CUSTOMER_PATH = '/platformApi/customer'
const SOLUTION_PATH = '/platformApi/solution'
const CONFIG_PATH = '/platformApi/config'

// 添加选择科懿内容
export const addAdvantage = (data: { title?: string; content?: string; icon?: string; sort?: number }) =>
  request({
    url: ADVANTAGE_PATH + '/add',
    method: 'POST',
    data
  })

// 编辑选择科懿内容
export const editAdvantage = (data: { title?: string; content?: string; icon?: string; sort?: number; id?: number }) =>
  request({
    url: ADVANTAGE_PATH + '/edit',
    method: 'POST',
    data
  })

// 删除选择科懿内容
export const deleteAdvantage = (data: { ids?: string }) =>
  request({
    url: ADVANTAGE_PATH + '/del',
    method: 'POST',
    data
  })

// 获取选择科懿内容详情
export const getAdvantageInfo = (params: { id?: number }) =>
  request({
    url: ADVANTAGE_PATH + '/info',
    method: 'GET',
    params
  })

// 获取选择科懿内容列表
export const getAdvantageList = () =>
  request({
    url: ADVANTAGE_PATH + '/lst',
    method: 'GET'
  })

// 更新选择科懿内容状态
export const updateAdvantageStatus = (data: { id?: number }) =>
  request({
    url: ADVANTAGE_PATH + '/status',
    method: 'POST',
    data
  })

// 更新合作客户状态
export const updateCustomerStatus = (data: { id?: number }) =>
  request({
    url: CUSTOMER_PATH + '/status',
    method: 'POST',
    data
  })

// 更新解决方案状态
export const updateSolutionStatus = (data: { id?: number }) =>
  request({
    url: SOLUTION_PATH + '/status',
    method: 'POST',
    data
  })

// 创建合作客户
export const addCustomer = (data: { title?: string; icon?: string; sort?: number }) =>
  request({
    url: CUSTOMER_PATH + '/add',
    method: 'POST',
    data
  })

// 创建解决方案
export const addSolution = (data: { title?: string; content?: string; sort?: number }) =>
  request({
    url: SOLUTION_PATH + '/add',
    method: 'POST',
    data
  })

// 编辑解决方案
export const editSolution = (data: { title?: string; content?: string; sort?: number; id?: number }) =>
  request({
    url: SOLUTION_PATH + '/edit',
    method: 'POST',
    data
  })

// 删除解决方案
export const deleteSolution = (data: { ids?: string }) =>
  request({
    url: SOLUTION_PATH + '/del',
    method: 'POST',
    data
  })

// 获取解决方案列表
export const getSolutionList = () =>
  request({
    url: SOLUTION_PATH + '/lst',
    method: 'GET'
  })

// 编辑合作客户
export const editCustomer = (data: { title?: string; icon?: string; sort?: number; id?: number }) =>
  request({
    url: CUSTOMER_PATH + '/edit',
    method: 'POST',
    data
  })

// 删除合作客户
export const deleteCustomer = (data: { ids?: string }) =>
  request({
    url: CUSTOMER_PATH + '/del',
    method: 'POST',
    data
  })

// 获取合作客户详情
export const getCustomerInfo = (params: { id?: string }) =>
  request({
    url: CUSTOMER_PATH + '/info',
    method: 'GET',
    params
  })

// 获取解决方案详情
export const getSolutionInfo = (params: { id?: number }) =>
  request({
    url: SOLUTION_PATH + '/info',
    method: 'GET',
    params
  })

// 获取合作客户列表
export const getCustomerList = () =>
  request({
    url: CUSTOMER_PATH + '/lst',
    method: 'GET'
  })

// 平台/系统配置 - 设置产品展示区
export const setProductDisplay = (data: { product_intro?: string; product_info?: string }) =>
  request({
    url: CONFIG_PATH + '/product',
    method: 'POST',
    data
  })

// 平台/系统配置 - 获取产品展示配置
export const getProductDisplay = () =>
  request({
    url: CONFIG_PATH + '/product',
    method: 'GET'
  })

// 平台/系统配置 - 设置公益测评
export const setWelfareEvaluation = (data: { info?: string }) =>
  request({
    url: CONFIG_PATH + '/welfare',
    method: 'POST',
    data
  })

// 平台/系统配置 - 获取公益测评
export const getWelfareEvaluation = () =>
  request({
    url: CONFIG_PATH + '/welfare',
    method: 'GET'
  })

// 平台/系统配置 - 设置渠道合作
export const setCooperation = (data: { info?: string }) =>
  request({
    url: CONFIG_PATH + '/cooperation',
    method: 'POST',
    data
  })

// 平台/系统配置 - 获取渠道合作
export const getCooperation = () =>
  request({
    url: CONFIG_PATH + '/cooperation',
    method: 'GET'
  })

// 平台/系统配置 - 设置了解科懿
export const setUnderstand = (data: { info?: string; is_show_feedback?: number }) =>
  request({
    url: CONFIG_PATH + '/understand',
    method: 'POST',
    data
  })

// 平台/系统配置 - 获取了解科懿详情
export const getUnderstand = () =>
  request({
    url: CONFIG_PATH + '/understand',
    method: 'GET'
  })

// 平台/系统配置 - 设置联系我们
export const setContact = (data: {
  info?: string
  is_name_need?: number
  is_phone_need?: number
  is_feedback_need?: number
}) =>
  request({
    url: CONFIG_PATH + '/contact',
    method: 'POST',
    data
  })

// 平台/系统配置 - 获取联系我们
export const getContact = () =>
  request({
    url: CONFIG_PATH + '/contact',
    method: 'GET'
  })
