import type { UserInfo } from '#/common'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { RoleEnum } from '@/enums/roleEnum'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0,
  }),
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
