const Layout = () => import('@/layout/index.vue')

export const asyncRoutes: MenuType.MenuOptions[] = [
  {
    path: '/customer',
    name: 'menuNest',
    component: Layout,
    meta: {
      title: '客户管理',
      icon: 'menu-nest',
      roles: ['admin', 'visitor'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/menuNest/self-service/add.vue'),
        meta: {
          title: '新增客户',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'self-service',
        component: () => import('@/views/menuNest/self-service/index.vue'),
        meta: {
          title: '自助客户',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'evaluate',
        component: () => import('@/views/menuNest/evaluate/index.vue'),
        meta: {
          title: '测评客户',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'segmente',
        component: () => import('@/views/menuNest/segmente/index.vue'),
        meta: {
          title: '客户划分',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'customer-use-history',
        component: () => import('@/views/menuNest/evaluate/use-record.vue'),
        meta: {
          title: '查看客户使用记录',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'admin-area-update',
        component: () => import('@/views/menuNest/segmente/update.vue'),
        meta: {
          title: '测评人负责区域更新',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      }
    ]
  },
  // 合同管理
  {
    path: '/hetong',
    name: 'hetong',
    component: Layout,
    meta: {
      title: '合同管理',
      icon: 'menu-nest',
      roles: ['admin', 'visitor'],
      isKeepAlive: true
    },
    show: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/hetong/index.vue'),
        meta: {
          title: '合同列表',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'add',
        component: () => import('@/views/hetong/add.vue'),
        meta: {
          title: '新增合同',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/hetong/detail.vue'),
        meta: {
          title: '合同详情',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
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
      icon: 'menu-nest',
      roles: ['admin', 'visitor'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/product/index.vue'),
        meta: {
          title: '产品套餐设置',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'evaluation',
        component: () => import('@/views/product/evaluation.vue'),
        meta: {
          title: '测评问卷',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'answer-guide',
        component: () => import('@/views/product/answer-guide.vue'),
        meta: {
          title: '作答指引模版',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'invite-guide',
        component: () => import('@/views/product/invite-guide.vue'),
        meta: {
          title: '邀请函模版',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'evaluation-report',
        component: () => import('@/views/product/evaluation-report.vue'),
        meta: {
          title: '测评报告',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'add',
        component: () => import('@/views/product/add.vue'),
        meta: {
          title: '新增产品套餐',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'evaluation-add',
        component: () => import('@/views/product/evaluation-add.vue'),
        meta: {
          title: '新增测评问卷',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'answer-guide-add',
        component: () => import('@/views/product/answer-guide-add.vue'),
        meta: {
          title: '新增/编辑作答指引模版',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'invite-guide-add',
        component: () => import('@/views/product/invite-guide-add.vue'),
        meta: {
          title: '新增/编辑邀请函模版',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'evaluation-questions',
        component: () => import('@/views/product/evaluation-questions.vue'),
        meta: {
          title: '问卷题目设置',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
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
      icon: 'menu-nest',
      roles: ['admin', 'visitor'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/system/user.vue'),
        meta: {
          title: '用户列表',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'department-management',
        component: () => import('@/views/system/department-management.vue'),
        meta: {
          title: '部门管理',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'approval-process',
        component: () => import('@/views/system/approval-process.vue'),
        meta: {
          title: '自定义审批流设置',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'permission',
        component: () => import('@/views/system/permission.vue'),
        meta: {
          title: '角色授权设置',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'log',
        component: () => import('@/views/system/log.vue'),
        meta: {
          title: '操作日志',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },

      {
        path: 'config',
        component: () => import('@/views/system/config.vue'),
        meta: {
          title: '系统配置',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'website-config',
        component: () => import('@/views/system/website-config.vue'),
        meta: {
          title: '网站配置',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'other-config',
        component: () => import('@/views/system/other-config.vue'),
        meta: {
          title: '其他配置',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'product-config',
        component: () => import('@/views/system/product-config.vue'),
        meta: {
          title: '产品配置',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'stats',
        component: () => import('@/views/system/stats.vue'),
        meta: {
          title: '数据统计',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'notice',
        component: () => import('@/views/system/notice.vue'),
        meta: {
          title: '通知公告',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'data-backup',
        component: () => import('@/views/system/data-backup.vue'),
        meta: {
          title: '数据备份',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'visitor-message',
        component: () => import('@/views/system/visitor-message.vue'),
        meta: {
          title: '访客留言',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'cooperation-message',
        component: () => import('@/views/system/cooperation-message.vue'),
        meta: {
          title: '代理合作留言',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'profile',
        component: () => import('@/views/system/profile.vue'),
        meta: {
          title: '个人信息',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },

      {
        path: 'approval-process-update',
        component: () => import('@/views/system/approval-process-update.vue'),
        meta: {
          title: '自定义审批流编辑',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'banner-add',
        component: () => import('@/views/system/banner-add.vue'),
        meta: {
          title: '新增banner',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'logo-add',
        component: () => import('@/views/system/logo-add.vue'),
        meta: {
          title: '新增LOGO',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'whychoose-update',
        component: () => import('@/views/system/whychoose-update.vue'),
        meta: {
          title: '为什么选择科验',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'solution-add',
        component: () => import('@/views/system/solution-add.vue'),
        meta: {
          title: '新增解决方案',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'notice-add',
        component: () => import('@/views/system/notice-add.vue'),
        meta: {
          title: '新增公告',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      }
    ]
  }
]
