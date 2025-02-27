import request from '@/plugins/request'
const PRODUCT_PATH = '/platformApi/product'
const ANSWER_PATH = '/platformApi/answer'
const QUESTIONNAIRE_PATH = '/platformApi/questionnaire'
const INVITE_PATH = '/platformApi/invite'

// 添加产品套餐
export const addProduct = (data: {
  name?: string
  type?: number
  score?: number
  is_limit_area?: number
  limit_area?: string
  day?: number
  price?: number
  evaluation_type?: number
  evaluation_id?: number
}) =>
  request({
    url: PRODUCT_PATH + '/add',
    method: 'POST',
    data
  })

// 编辑产品套餐
export const editProduct = (data: {
  name?: string
  type?: number
  score?: number
  is_limit_area?: number
  limit_area?: string
  day?: number
  price?: number
  evaluation_type?: number
  evaluation_id?: number
  id?: number
}) =>
  request({
    url: PRODUCT_PATH + '/edit',
    method: 'POST',
    data
  })

// 删除产品套餐
export const deleteProduct = (data: { ids?: string }) =>
  request({
    url: PRODUCT_PATH + '/del',
    method: 'POST',
    data
  })

// 获取产品套餐
// [
//     {
//         "id": 1,
//         "product_no": "TCBH20250217093948629",
//         "name": "顶顶顶顶",
//         "type": 1,
//         "score": 1,
//         "is_limit_area": 1,
//         "limit_area": [
//             [
//                 1,
//                 2,
//                 3
//             ]
//         ],
//         "day": 1,
//         "price": "1.10",
//         "evaluation_type": 1,
//         "job_type_id": 1,
//         "evaluation_id": 1,
//         "status": 1,
//         "status_time": 0,
//         "creater": "admin",
//         "create_time": 1739756388,
//         "evaluation_name": ""
//     }
// ]
export const getProductList = (params: { page?: number; pageSize?: number }) =>
  request({
    url: PRODUCT_PATH + '/lst',
    method: 'GET',
    params
  })

// 获取产品套餐详情
export const getProductInfo = (params: { id?: number }) =>
  request({
    url: PRODUCT_PATH + '/info',
    method: 'GET',
    params
  })

// ------start

// 更新产品状态 TODO:
export const updateProductStatus = (data: { id?: number }) =>
  request({
    url: PRODUCT_PATH + '/status',
    method: 'POST',
    data
  })

// 获取评估报告列表
export const getEvaluationReportList = (params: { tab?: string; keyword?: string; page?: number; pageSize?: number }) =>
  request({
    url: PRODUCT_PATH + '/evaluation-report/list',
    method: 'GET',
    params
  })

// 导出报告
export const exportReport = () =>
  request({
    url: PRODUCT_PATH + '/evaluation-report/export',
    method: 'POST'
  })

// 下载结果
export const downloadResult = () =>
  request({
    url: PRODUCT_PATH + '/evaluation-report/download-result',
    method: 'POST'
  })

// 上传报告
export const uploadReport = () =>
  request({
    url: PRODUCT_PATH + '/evaluation-report/upload-report',
    method: 'POST'
  })

// 上传对比表
export const uploadComparison = () =>
  request({
    url: PRODUCT_PATH + '/evaluation-report/upload-comparison',
    method: 'POST'
  })

// ------end

// 添加作答指引模板
export const addAnswerTemplate = (data: { name?: string; content?: string }) =>
  request({
    url: ANSWER_PATH + '/template/add',
    method: 'POST',
    data
  })

// 编辑作答指引模板
export const editAnswerTemplate = (data: { name?: string; content?: string; id?: number }) =>
  request({
    url: ANSWER_PATH + '/template/edit',
    method: 'POST',
    data
  })

// 删除作答指引模板
export const deleteAnswerTemplate = (data: { ids?: string }) =>
  request({
    url: ANSWER_PATH + '/template/del',
    method: 'POST',
    data
  })

// 获取作答指引模板详情
export const getAnswerTemplateInfo = (params: { id?: string }) =>
  request({
    url: ANSWER_PATH + '/template/info',
    method: 'GET',
    params
  })

// 获取作答指引模板列表
export const getAnswerTemplateList = (params: { name?: string; page?: number; pageSize?: number }) =>
  request({
    url: ANSWER_PATH + '/template/lst',
    method: 'GET',
    params
  })

// 创建岗位类型
export const addJobType = (data: { name?: string }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/job/type/add',
    method: 'POST',
    data
  })

// 创建岗位
export const addJob = (data: { name?: string }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/job/add',
    method: 'POST',
    data
  })

// 获取岗位类型列表
export const getJobTypeList = () =>
  request({
    url: QUESTIONNAIRE_PATH + '/job/type/lst',
    method: 'GET'
  })

// 获取岗位列表
export const getJobList = () =>
  request({
    url: QUESTIONNAIRE_PATH + '/job/lst',
    method: 'GET'
  })

// 获取问卷调查列表
export const getQuestionnaireList = (params: { page?: number; pageSize?: number }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/lst',
    method: 'GET',
    params
  })

// 获取问卷调查详情
export const getQuestionnaireInfo = (params: { id?: number }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/info',
    method: 'GET',
    params
  })

// 添加问卷调查
export const addQuestionnaire = (data: {
  type?: number
  post_type_id?: number
  job_id?: number
  name?: string
  answer_time?: number
  score?: number
  is_rand?: number
  switching_screens_num?: number
  is_switching_screens?: number
  report_type?: number
  info?: string
  invite_id?: number
  answer_id?: number
  questionnaire_path?: string
  result_path?: string
  report_path?: string
  info_path?: string
}) =>
  request({
    url: QUESTIONNAIRE_PATH + '/add',
    method: 'POST',
    data
  })

// 编辑问卷调查
export const editQuestionnaire = (data: {
  type?: number
  post_type_id?: number
  job_id?: number
  name?: string
  answer_time?: number
  score?: number
  is_rand?: number
  switching_screens_num?: number
  is_switching_screens?: number
  report_type?: number
  info?: string
  invite_id?: number
  answer_id?: number
  questionnaire_path?: string
  result_path?: string
  report_path?: string
  info_path?: string
  id?: number
}) =>
  request({
    url: QUESTIONNAIRE_PATH + '/edit',
    method: 'POST',
    data
  })

// 删除问卷调查
export const deleteQuestionnaire = (data: { ids?: string }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/del',
    method: 'POST',
    data
  })

// 更新问卷调查状态
export const updateQuestionnaireStatus = (data: { id?: string }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/status',
    method: 'POST',
    data
  })

// 问卷调查-试题
export const handleQuestionnaireQuestion = (data: { content?: string; questionnaire_id?: number; del_id?: string }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/question/handle',
    method: 'POST',
    data
  })

// 问卷调查-试题获取
export const getQuestionnaireQuestionList = (params: { questionnaire_id?: number }) =>
  request({
    url: QUESTIONNAIRE_PATH + '/question/lst',
    method: 'GET',
    params
  })

// 添加邀请模板替换关键字
export const addInviteKey = (data: { name?: string; key?: string }) =>
  request({
    url: INVITE_PATH + '/key/add',
    method: 'POST',
    data
  })

// 添加邀请模板
export const addInviteTemplate = (data: {
  name?: string
  content?: string
  replace_content?: string
  intro?: string
}) =>
  request({
    url: INVITE_PATH + '/template/add',
    method: 'POST',
    data
  })

// 编辑邀请模板
export const editInviteTemplate = (data: {
  name?: string
  content?: string
  replace_content?: string
  intro?: string
  id?: number
}) =>
  request({
    url: INVITE_PATH + '/template/edit',
    method: 'POST',
    data
  })

// 删除邀请模板
export const deleteInviteTemplate = (data: { ids?: string }) =>
  request({
    url: INVITE_PATH + '/template/del',
    method: 'POST',
    data
  })

// 获取邀请模板详情
export const getInviteTemplateInfo = (params: { id?: string }) =>
  request({
    url: INVITE_PATH + '/template/info',
    method: 'GET',
    params
  })

// 获取邀请模板列表
export const getInviteTemplateList = (params: { name?: string; page?: number; pageSize?: number }) =>
  request({
    url: INVITE_PATH + '/template/lst',
    method: 'GET',
    params
  })

// 编辑邀请模板替换关键字
export const editInviteKey = (data: { name?: string; key?: string; id?: number }) =>
  request({
    url: INVITE_PATH + '/key/edit',
    method: 'POST',
    data
  })

// 删除邀请模板替换关键字
export const deleteInviteKey = (data: { ids?: string }) =>
  request({
    url: INVITE_PATH + '/key/del',
    method: 'POST',
    data
  })

// 获取邀请模板替换关键字详情
export const getInviteKeyInfo = (params: { id?: string }) =>
  request({
    url: INVITE_PATH + '/key/info',
    method: 'GET',
    params
  })

// 获取邀请模板替换关键字列表
export const getInviteKeyList = () =>
  request({
    url: INVITE_PATH + '/key/lst',
    method: 'GET'
  })
