import request from '@/plugins/request'

// 新增合同
export const addContract = ({
  /**
   * 审批ID
   */
  approve_id,
  /**
   * 购买时间
   */
  buy_time,
  /**
   * 合同包含套餐
   */
  contract_content,
  /**
   * 客户id
   */
  customer_id,
  /**
   * 合同名称
   */
  name
  /**
   * 0：草稿，1：审批中，2：审批通过，3：驳回，4：撤回
   */
  // status?: number
}) => {
  return request({
    url: '/platformApi/contract/add',
    method: 'POST',
    data: {
      approve_id,
      buy_time,
      contract_content,
      customer_id,
      name
    }
  })
}

// 合同编辑
export const editContract = (data: {
  /**
   * 审批ID
   */
  approve_id?: number
  /**
   * 购买时间
   */
  buy_time?: number
  /**
   * 合同包含套餐
   */
  contract_content?: string
  /**
   * 客户id
   */
  customer_id?: number
  /**
   * 合同ID
   */
  id?: number
  /**
   * 合同名称
   */
  name?: string
  /**
   * 0：草稿，1：审批中，2：审批通过，3：驳回，4：撤回
   */
  status?: number
}) => {
  return request({
    url: '/platformApi/contract/edit',
    method: 'POST',
    data
  })
}

// 合同审批
export const approvalContract = (data: { id: number; type: string; comment?: string }) => {
  return request({
    url: '/platformApi/contract/approve',
    method: 'POST',
    data
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
    method: 'GET',
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
    method: 'GET',
    params
  })
}

// 改变合同状态
export const readContract = (data: { id: number }) => {
  return request({
    url: '/platformApi/contract/read',
    method: 'POST',
    data
  })
}
