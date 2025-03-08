import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { asyncRoutes } from '@/router/modules/asyncRouter'

interface AuthState {
  routes: MenuType.MenuOptions[]
  addRoutes: MenuType.MenuOptions[]
}

export const useAuthStore = defineStore('auth', () => {
  const initData: AuthState = reactive({
    routes: [], // 保存整体路由，用于菜单整体展示
    addRoutes: [] // 需要添加的菜单权限列表, 留给退出登录时候清除路由使用
  })

  // 获取动态路由
  function generateAsyncRoutes(roles: string[], ids: number[]): any {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        // 日常项目中可以用admin当管理者，进行路由的直接赋值
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, ids)
      }
      initData.addRoutes = accessedRoutes
      resolve(accessedRoutes)
      //   * 判断ids是否包含id,若包含则将顶层item和包含项都显示；若一个都不包含，则既不显示顶层item，也不显示children
    })
  }

  /**
   *
   * @description 通过递归筛选异步路由表，返回ids中的id对应的路由。
   * 1、若顶层item.meta有id，则判断ids是否包含id，有则保留顶层item
   * 2、若顶层item.meta无id则必定有children，子孙中若ids包含，则显示
   * @param routes asyncRoutes 顶层item中的meta有无id取决于item有无children，有则无id
   * @param ids 菜单id的权限数组
   */
  function filterAsyncRoutes(routes: MenuType.MenuOptions[], ids: number[]): MenuType.MenuOptions[] {
    return routes
      .map(route => {
        if (route.meta?.id !== undefined) {
          return ids.includes(route.meta.id) ? { ...route } : null
        } else {
          const filteredChildren = filterAsyncRoutes(route.children || [], ids)
          return filteredChildren.length > 0 ? { ...route, children: filteredChildren } : null
        }
      })
      .filter((route): route is MenuType.MenuOptions => route !== null)
  }

  // 设置store中记录的整体路由
  function addAllRoutes(routes: any) {
    initData.routes = routes
  }

  return { ...toRefs(initData), generateAsyncRoutes, addAllRoutes }
})
