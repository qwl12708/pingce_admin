import request from '@/plugins/request'

const PATH = '/platformApi/banner'

// 平台/网站-banner - 创建banner
export const createBanner = (data: { type?: number; sort?: number; img?: string; content?: string }) =>
  request({
    url: PATH + '/add',
    method: 'POST',
    data
  })

// 平台/网站-banner - 编辑banner
export const editBanner = (data: { type?: number; sort?: number; img?: string; content?: string; id?: number }) =>
  request({
    url: PATH + '/edit',
    method: 'POST',
    data
  })

// 平台/网站-banner - 删除banner
export const deleteBanner = (data: { ids: string }) =>
  request({
    url: PATH + '/del',
    method: 'POST',
    data
  })

// 平台/网站-banner - 获取banner详情
export const getBannerInfo = (params: { id?: string }) =>
  request({
    url: PATH + '/info',
    method: 'GET',
    params
  })

// 平台/网站-banner - 获取banner列表
export const getBannerList = () =>
  request({
    url: PATH + '/lst',
    method: 'GET'
  })
