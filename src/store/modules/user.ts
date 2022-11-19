import type { UserInfo } from '#/common'
import type { LoginParams } from '@/api/sys/model/userModel'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { router } from '@/router'
import { PageEnum } from '@/enums/pageEnum'
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { loginApi, getUserInfo, doLogout } from '@/api/sys/user'

interface UserState {
  token: Nullable<string>
  userInfo: Nullable<UserInfo>
  sessionTimeout: boolean
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: null,
    userInfo: null,
    sessionTimeout: false,
  }),
  getters: {
    getToken(): string {
      return this.token || getAuthCache(TOKEN_KEY)
    },
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache(USER_INFO_KEY) || {}
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getRoles(): string[] {
      return (this.getUserInfo.roles || []).map((role) => role.value)
    },
    getPermissions(): string[] {
      return this.getUserInfo.permissions || []
    },
  },
  actions: {
    setToken(info: string | null) {
      this.token = info || ''
      setAuthCache(TOKEN_KEY, info)
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
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

        // 3、登录成功后默认访问哪个页面
        router.replace(userInfo.homePath || PageEnum.BASE_HOME)

        return Promise.resolve(userInfo)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    /**
     * @description 退出登录
     */
    async logout(go?: string) {
      try {
        await doLogout()
      } catch {
        alert('注销 Token 失败')
      }

      this.setToken(null)
      this.setUserInfo(null)
      this.setSessionTimeout(false)
      router.push(go || PageEnum.BASE_LOGIN)
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
