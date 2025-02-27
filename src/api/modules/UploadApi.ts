import request from '@/plugins/request'

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadImg = (data: FormData) =>
  request({
    url: '/platformApi/upload/image',
    method: 'POST',
    data,
    _headers: { 'Content-Type': 'multipart/form-data' }
  })

// 文件上传
export const uploadFile = (data: FormData) =>
  request({
    url: '/platformApi/upload/file',
    method: 'POST',
    data,
    _headers: { 'Content-Type': 'multipart/form-data' }
  })
