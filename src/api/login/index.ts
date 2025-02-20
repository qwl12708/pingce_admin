import request from '@/plugins/request'

export const login = (data: { phone?: string; pwd?: string }) =>
  request({
    url: '/platformApi/login',
    method: 'POST',
    data
  })

export const loginout = () =>
  request({
    url: '/platformApi/loginout',
    method: 'GET'
  })
