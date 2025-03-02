import request from '@/plugins/request'

// 待处理任务
export const getTaskStats = () =>
  request({
    url: '/platformApi/index/task',
    method: 'GET'
  })

// 待处理合同
export const getContractStats = () =>
  request({
    url: '/platformApi/index/contract',
    method: 'GET'
  })

// 用户统计
export const getCustomerStats = () =>
  request({
    url: '/platformApi/index/customer',
    method: 'GET'
  })

// 产品套餐统计
export const getProductStats = () =>
  request({
    url: '/platformApi/index/product',
    method: 'GET'
  })

// 问卷统计
export const getQuestionnaire = () =>
  request({
    url: '/platformApi/index/questionnaire',
    method: 'GET'
  })
