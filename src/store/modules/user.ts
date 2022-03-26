import type { UserInfo } from '#/common'
import type { LoginParams } from '@/api/sys/model/userModel'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { router } from '@/router'
import { RoleEnum } from '@/enums/roleEnum'
import { TOKEN_KEY, USER_INFO_KEY, USER_ROLE_KEY } from '@/enums/cacheEnum'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { loginApi, getUserInfo, doLogout } from '@/api/sys/user'

interface UserState {
  userInfo: Nullable<UserInfo>
  token: Nullable<string>
  roleList: RoleEnum[]
  sessionTimeout: boolean
  lastUpdateTime: number
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: null,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache(TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache(USER_ROLE_KEY)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(info: string | null) {
      this.token = info || ''
      setAuthCache(TOKEN_KEY, info)
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(USER_ROLE_KEY, roleList)
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },

    /**
     * @description 用户登录
     */
    async login(params: LoginParams): Promise<UserInfo | null> {
      try {
        // 1、调用登录接口获取 token
        const token = await loginApi(params)
        this.setToken(token.token)

        // 2、获取到用户详细信息
        const userInfo = await getUserInfo()
        this.setUserInfo(userInfo)
        this.setRoleList(userInfo.roles.map((item) => item.value) as RoleEnum[])

        // 3、登录成功后默认访问哪个页面
        router.replace(userInfo.homePath)

        return Promise.resolve(userInfo)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    /**
     * @description 退出登录
     */
    async logout(go = '/login') {
      try {
        await doLogout()
      } catch {
        alert('注销 Token 失败')
      }

      this.setToken(null)
      this.setUserInfo(null)
      this.setSessionTimeout(false)
      router.push(go)
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
