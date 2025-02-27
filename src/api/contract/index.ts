import request from '@/plugins/request'

// 新增合同
export const addContract = (data: { title: string; icon: string; sort: number }) => {
  return request({
    url: '/platformApi/contract/add',
    method: 'post',
    data
  })
}

// 合同编辑
export const editContract = (data: { id: number; title: string; icon: string; sort: number }) => {
  return request({
    url: '/platformApi/contract/edit',
    method: 'post',
    data
  })
}

// 合同审批
export const approvalContract = (params: { ids: string }) => {
  return request({
    url: '/platformApi/contract/approve',
    method: 'post',
    params
  })
}

// 合同详情
/**
 *
 * @param params
 *
 * @returns
 *
 * {
    "id": 1,
    "contract_no": "TCBH20250219084035592",
    "name": "222",
    "customer_id": 1,
    "buy_time": 11,
    "contract_content": [
        {
            "id": 1,
            "real_money": 100,
            "open_time": "2025-01-02"
        }
    ],
    "money": "1.00",
    "real_money": "100.00",
    "status": 0,
    "approve_id": 3,
    "approve_type": 0,
    "approve_status": 0,
    "approve_time": 0,
    "approve_info": "",
    "approve_step": 0,
    "approve_user_current": "",
    "approve_user": null,
    "creater": "admin",
    "create_time": 1739925635,
    "updater": "",
    "update_time": 0
}
 */
export const getContractInfo = (params: { id: number }) => {
  return request({
    url: '/platformApi/contract/info',
    method: 'get',
    params
  })
}

// 合同列表
/**
 *
 * @param params
 * @returns
 * {
 *    code: 200,
 *    data: {
    "list": [
        {
            "id": 1,
            "contract_no": "TCBH20250219084035592",
            "name": "222",
            "customer_id": 1,
            "buy_time": 11,
            "money": "1.00",
            "real_money": "100.00",
            "status": 0,
            "approve_id": 3,
            "approve_type": 0,
            "approve_status": 0,
            "approve_time": 0,
            "approve_info": "",
            "approve_step": 0,
            "approve_user_current": "",
            "approve_user": null,
            "creater": "admin",
            "create_time": 1739925635,
            "customer_name": "测试机构22"
        }
    ],
    "total": 1,
    "back_count": 0,
    "pass_count": 0,
    "pending_count": 0
}
 * }
 */
export const getContractList = (params: { page?: number; pageSize?: number }) => {
  return request({
    url: '/platformApi/contract/lst',
    method: 'get',
    params
  })
}
