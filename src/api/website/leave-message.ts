import request from '@/plugins/request'
const PATH = '/platformApi/feedback'

// 客户留言
export const getVisitorLeaveMessages = (params: { page: Number; pageSize: Number }) =>
  request({
    url: PATH + '/list',
    method: 'GET',
    params
  })

// 回复访客留言
export const replyVisitorLeaveMessage = (data: { id: Number; replyContent: String; replay_time: Number }) =>
  request({
    url: PATH + '/reply',
    method: 'POST',
    data
  })

// 获取访客留言详情
export const getVisitorLeaveMessageDetail = (id: Number) =>
  request({
    url: PATH + '/detail',
    method: 'GET',
    params: { id }
  })
