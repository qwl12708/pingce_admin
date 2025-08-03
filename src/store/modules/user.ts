import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { resetRouter } from '@/router'
import { removeToken } from '@/utils/auth'
import { getCurrentUserInfo } from '@/api/system/user'

export const useUserStore = defineStore('user', () => {
  const initData: UserState = reactive({
    token: '',
    name: '',
    avatar: '', // 头像
    roles: [], // 角色
    menuIds: [] // 菜单id
  })

  // Set Token
  function setToken(token: string) {
    initData.token = token
  }
  // remove token
  function resetToken() {
    initData.token = ''
    removeToken() // 清除cookie中token
  }
  function setName(val: string) {
    initData.name = val
  }
  function setAvatar(val: string) {
    initData.avatar = val
  }
  function setIntroduction(val: string) {
    initData.introduction = val
  }
  function setRoles(val: string[]) {
    initData.roles = val
  }
  function setMenuIds(val: string[]) {
    initData.menuIds = val
  }

  function getInfo() {
    return new Promise<any>(async (resolve): any => {
      try {
        const { data } = await getCurrentUserInfo()
        console.log('%c [ data ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        const { role_type, nickname, name, avatar } = data
        setName(nickname)
        setAvatar(avatar)
        setIntroduction(name)
        setRoles(role_type)
        // 通过map方法将rules中的值转换为数字类型, 且值都为真
        const rules = data.rules.map(e => Number(e)).filter(Boolean)
        console.log('%c [ rules ]-53', 'font-size:13px; background:pink; color:#bf2c9f;', rules)
        setMenuIds(rules)

        resolve({ ...data, roles: role_type, menuIds: rules })
      } catch (error) {
        console.log('获取用户信息失败', error)
      }
    })
  }

  // 退出登录
  function logout() {
    resetToken()
    setName('')
    setAvatar('')
    setIntroduction('')
    setRoles([])
    resetRouter()
  }

  return {
    ...toRefs(initData),
    setToken,
    resetToken,
    setName,
    setAvatar,
    setIntroduction,
    setRoles,
    getInfo,
    logout
  }
})
