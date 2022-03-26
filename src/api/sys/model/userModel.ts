import { UserInfo } from '#/common'

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string
  password: string
}

/**
 * @description: Get user information return value
 */
export type UserInfoModel = UserInfo
