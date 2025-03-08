const Layout = () => import('@/layout/index.vue')

let idCounter = 1

export const asyncRoutes: MenuType.MenuOptions[] = [
  // 客户管理
  {
    path: '/customer',
    name: 'customer',
    component: Layout,
    meta: {
      title: '客户管理',
      icon: 'user',
      roles: ['admin', 'visitor'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'self-service',
        component: () => import('@/views/customer/self-service/index.vue'),
        meta: {
          title: '自助客户',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'evaluate',
        component: () => import('@/views/customer/evaluate/index.vue'),
        meta: {
          title: '测评客户',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'segmente',
        component: () => import('@/views/customer/segmente/index.vue'),
        meta: {
          title: '客户划分',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'add',
        component: () => import('@/views/customer/self-service/add.vue'),
        meta: {
          title: '新增客户',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'use-record',
        component: () => import('@/views/customer/evaluate/use-record.vue'),
        meta: {
          title: '查看客户使用记录',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'admin-area-update',
        component: () => import('@/views/customer/segmente/update.vue'),
        meta: {
          title: '测评人负责区域更新',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      }
    ]
  },
  // 合同管理
  {
    path: '/contract',
    name: 'contract',
    component: Layout,
    meta: {
      title: '合同管理',
      icon: 'document',
      roles: ['admin', 'visitor'],
      isKeepAlive: true
    },
    show: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/contract/index.vue'),
        meta: {
          title: '合同列表',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'add',
        component: () => import('@/views/contract/add.vue'),
        meta: {
          title: '新增合同',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/contract/detail.vue'),
        meta: {
          title: '合同详情',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      }
    ]
  },
  // 产品管理
  {
    path: '/product',
    name: 'product',
    component: Layout,
    meta: {
      title: '产品管理',
      icon: 'product',
      roles: ['admin', 'visitor'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/product/index.vue'),
        meta: {
          title: '产品套餐设置',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'evaluation',
        component: () => import('@/views/product/evaluation.vue'),
        meta: {
          title: '测评问卷',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'answer-guide',
        component: () => import('@/views/product/answer-guide.vue'),
        meta: {
          title: '作答指引模版',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'invite-guide',
        component: () => import('@/views/product/invite-guide.vue'),
        meta: {
          title: '邀请函模版',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'evaluation-report',
        component: () => import('@/views/product/evaluation-report.vue'),
        meta: {
          title: '测评报告',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'add',
        component: () => import('@/views/product/add.vue'),
        meta: {
          title: '新增/编辑产品套餐',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'evaluation-add',
        component: () => import('@/views/product/evaluation-add.vue'),
        meta: {
          title: '新增测评问卷',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'answer-guide-add',
        component: () => import('@/views/product/answer-guide-add.vue'),
        meta: {
          title: '新增/编辑作答指引模版',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'invite-guide-add',
        component: () => import('@/views/product/invite-guide-add.vue'),
        meta: {
          title: '新增/编辑邀请函模版',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'evaluation-questions',
        component: () => import('@/views/product/evaluation-questions.vue'),
        meta: {
          title: '问卷题目设置',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      }
    ]
  },
  // 系统管理
  {
    path: '/system',
    name: 'system',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'system',
      roles: ['admin', 'visitor'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'userlist',
        component: () => import('@/views/system/userlist.vue'),
        meta: {
          title: '用户列表',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'department-management',
        component: () => import('@/views/system/department-management.vue'),
        meta: {
          title: '部门管理',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'approval-process',
        component: () => import('@/views/system/approval-process.vue'),
        meta: {
          title: '自定义审批流设置',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'permission',
        component: () => import('@/views/system/permission.vue'),
        meta: {
          title: '角色授权设置',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'log',
        component: () => import('@/views/system/log.vue'),
        meta: {
          title: '操作日志',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'log/detail',
        component: () => import('@/views/system/log-detail.vue'),
        meta: {
          title: '操作日志详情',
          icon: 'none',
          roles: ['admin', 'visitor'],
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'config',
        component: () => import('@/views/system/config.vue'),
        meta: {
          title: '系统配置',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'website-config',
        component: () => import('@/views/system/website-config.vue'),
        meta: {
          title: '网站配置',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'other-config',
        component: () => import('@/views/system/other-config.vue'),
        meta: {
          title: '其他配置',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'product-config',
        component: () => import('@/views/system/product-config.vue'),
        meta: {
          title: '产品配置',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'stats',
        component: () => import('@/views/system/stats.vue'),
        meta: {
          title: '数据统计',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'notice',
        component: () => import('@/views/system/notice.vue'),
        meta: {
          title: '通知公告',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'data-backup',
        component: () => import('@/views/system/data-backup.vue'),
        meta: {
          title: '数据备份',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'visitor-message',
        component: () => import('@/views/system/visitor-message.vue'),
        meta: {
          title: '访客留言',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'cooperation-message',
        component: () => import('@/views/system/cooperation-message.vue'),
        meta: {
          title: '代理合作留言',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },
      {
        path: 'profile',
        component: () => import('@/views/system/profile.vue'),
        meta: {
          title: '个人信息',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          id: idCounter++
        }
      },

      {
        path: 'approval-process-update',
        component: () => import('@/views/system/approval-process-update.vue'),
        meta: {
          title: '自定义审批流编辑',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'banner-add',
        component: () => import('@/views/system/banner-add.vue'),
        meta: {
          title: '新增banner',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'logo-add',
        component: () => import('@/views/system/logo-add.vue'),
        meta: {
          title: '新增LOGO',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'whychoose-update',
        component: () => import('@/views/system/whychoose-update.vue'),
        meta: {
          title: '为什么选择科验',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'solution-add',
        component: () => import('@/views/system/solution-add.vue'),
        meta: {
          title: '新增解决方案',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      },
      {
        path: 'notice-add',
        component: () => import('@/views/system/notice-add.vue'),
        meta: {
          title: '新增公告',
          icon: 'none',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true,
          id: idCounter++
        }
      }
    ]
  }
]
