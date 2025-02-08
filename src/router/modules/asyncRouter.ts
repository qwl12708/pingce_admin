const Layout = () => import('@/layout/index.vue')

export const asyncRoutes: MenuType.MenuOptions[] = [
  {
    path: '/project',
    name: 'project',
    component: Layout,
    meta: {
      title: '项目列表',
      icon: 'menu-project',
      roles: ['zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'project-test',
        component: () => import('@/views/project/index.vue'),
        name: 'ProjectTest',
        meta: {
          title: '项目测试',
          icon: 'menu-project',
          roles: ['zjh'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/assembly',
    name: 'assembly',
    component: Layout,
    meta: {
      title: '常用组件',
      icon: 'menu-components',
      roles: ['admin', 'zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'retrieve-input',
        component: () => import('@/views/assembly/retrieveInput/index.vue'),
        name: 'RetrieveInput',
        meta: {
          title: '检索输入框',
          icon: 'menu-component',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'draggable-sort',
        component: () => import('@/views/assembly/draggableSort/index.vue'),
        name: 'DraggableSort',
        meta: {
          title: '拖拽排序九宫格',
          icon: 'menu-component',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'draggable-draw',
        component: () => import('@/views/assembly/draggableDraw/index.vue'),
        name: 'DraggableDraw',
        meta: {
          title: '拖拽拉伸',
          icon: 'menu-component',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'wang-editor',
        component: () => import('@/views/assembly/wangEditor/index.vue'),
        name: 'WangEditor',
        meta: {
          title: '富文本编辑器',
          icon: 'menu-component',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      }
    ]
  },
  // 视觉动效
  {
    path: '/visual-dynamic',
    name: 'visualDynamic',
    component: Layout,
    meta: {
      title: '视觉动效',
      icon: 'menu-components',
      roles: ['admin', 'zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'dynamic-btns',
        component: () => import('@/views/visualDynamic/dynamicBtns/index.vue'),
        name: 'DynamicBtns',
        meta: {
          title: '动效按钮',
          icon: 'menu-dynamic',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'visual-design',
        component: () => import('@/views/visualDynamic/visualDesign/index.vue'),
        name: 'VisualDesign',
        meta: {
          title: '视觉设计',
          icon: 'menu-dynamic',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'rich-dynamic-effect',
        component: () => import('@/views/visualDynamic/richDynamicEffect/index.vue'),
        name: 'RichDynamicEffect',
        meta: {
          title: '丰富动效',
          icon: 'menu-dynamic',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      }
    ]
  },
  // 菜单嵌套
  {
    path: '/menu-nest',
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
        path: 'menu-nest0',
        component: () => import('@/views/menuNest/Nest1/add.vue'),
        meta: {
          title: '新增客户',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true,
          hidden: true
        }
      },
      {
        path: 'menu-nest1',
        component: () => import('@/views/menuNest/Nest1/index.vue'),
        meta: {
          title: '自助客户',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'menu-nest2',
        component: () => import('@/views/menuNest/Nest2/index.vue'),
        meta: {
          title: '测评客户',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'menu-nest3',
        component: () => import('@/views/menuNest/Nest3/index.vue'),
        meta: {
          title: '客户划分',
          icon: 'menu-nest',
          roles: ['admin', 'visitor'],
          isKeepAlive: true
        }
      },
      {
        path: 'menu-nest4',
        component: () => import('@/views/menuNest/Nest2/use-record.vue'),
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
        component: () => import('@/views/menuNest/Nest3/update.vue'),
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

  // 表单
  {
    path: '/form',
    name: 'form',
    component: Layout,
    meta: {
      title: '表单 Form',
      icon: 'menu-form',
      roles: ['admin', 'zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'basic-form',
        name: 'BasicForm',
        component: () => import('@/views/form/basicForm/index.vue'),
        meta: {
          title: '基础表单',
          icon: 'menu-form',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'validate-form',
        name: 'ValidateForm',
        component: () => import('@/views/form/validateForm/index.vue'),
        meta: {
          title: '校验表单',
          icon: 'menu-form',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      }
    ]
  },
  // echarts图表
  {
    path: '/echarts',
    name: 'echarts',
    component: Layout,
    meta: {
      title: 'ECharts',
      icon: 'menu-echarts',
      roles: ['admin', 'zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'column-chart',
        component: () => import('@/views/echarts/columnChart/index.vue'),
        name: 'ColumnChart',
        meta: {
          title: '柱状图',
          icon: 'menu-echarts',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'line-chart',
        component: () => import('@/views/echarts/lineChart/index.vue'),
        name: 'LineChart',
        meta: {
          title: '折线图',
          icon: 'menu-echarts',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'nested-chart',
        component: () => import('@/views/echarts/NestedChart/index.vue'),
        name: 'NestedChart',
        meta: {
          title: '嵌套环形图',
          icon: 'menu-echarts',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'pie-chart',
        component: () => import('@/views/echarts/pieChart/index.vue'),
        name: 'PieChart',
        meta: {
          title: '饼图',
          icon: 'menu-echarts',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'radar-chart',
        component: () => import('@/views/echarts/radarChart/index.vue'),
        name: 'RadarChart',
        meta: {
          title: '雷达图',
          icon: 'menu-echarts',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'water-chart',
        component: () => import('@/views/echarts/waterChart/index.vue'),
        name: 'WaterChart',
        meta: {
          title: '水型图',
          icon: 'menu-echarts',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      }
    ]
  },
  // 指令
  {
    path: '/directives',
    name: 'Directives',
    component: Layout,
    meta: {
      title: '指令',
      icon: 'menu-direct',
      roles: ['admin', 'zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'debounce-direct',
        component: () => import('@/views/directives/debounceDirect/index.vue'),
        name: 'DebounceDirect',
        meta: {
          title: '防抖指令',
          icon: 'menu-direct',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'throttle-direct',
        component: () => import('@/views/directives/throttleDirect/index.vue'),
        name: 'ThrottleDirect',
        meta: {
          title: '节流指令',
          icon: 'menu-direct',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'Watermark-direct',
        component: () => import('@/views/directives/watermarkDirect/index.vue'),
        name: 'WatermarkDirect',
        meta: {
          title: '水印指令',
          icon: 'menu-direct',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      }
    ]
  },
  // 有 isLinkUrl 属于外部链接
  {
    path: '/link',
    name: 'Link',
    meta: {
      title: '外部链接',
      icon: 'menu-link',
      roles: ['admin', 'zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'vue',
        name: 'Vue',
        meta: {
          icon: 'menu-link',
          title: 'Vue 官网',
          isLinkUrl: 'https://cn.vuejs.org/guide/introduction.html',
          roles: ['admin', 'zjh'],
          isKeepAlive: false
        }
      },
      {
        path: 'vite',
        name: 'Vite',
        meta: {
          icon: 'menu-link',
          title: 'Vite 官网',
          isLinkUrl: 'https://cn.vitejs.dev/guide/',
          roles: ['admin', 'zjh'],
          isKeepAlive: false
        }
      },
      {
        path: 'juejin',
        name: 'Juejin',
        meta: {
          icon: 'menu-link',
          title: '掘金',
          isLinkUrl: 'https://juejin.cn/',
          roles: ['admin', 'zjh'],
          isKeepAlive: false
        }
      },
      {
        path: 'vue-i18n',
        name: 'VueI18n',
        meta: {
          icon: 'menu-link',
          title: 'Vue-i18n 文档',
          isLinkUrl: 'https://kazupon.github.io/vue-i18n/zh/installation.html',
          roles: ['admin', 'zjh'],
          isKeepAlive: false
        }
      },
      {
        path: 'element-plus',
        name: 'ElementPlus',
        meta: {
          icon: 'menu-link',
          title: 'ElementPlus 官网',
          isLinkUrl: 'https://element-plus.gitee.io/zh-CN/',
          roles: ['admin', 'zjh'],
          isKeepAlive: false
        }
      }
    ]
  }
]
