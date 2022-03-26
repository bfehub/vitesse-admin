import { defHttp } from '@/utils/http/axios'
import { LoginParams, UserInfoModel } from './model/userModel'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
}

/**
 * @author your name
 * @date 2022-03-24 21:39:20
 * @description user login api
 */
export function loginApi(params: LoginParams) {
  return defHttp.post<UserInfoModel>({
    url: Api.Login,
    params,
  })
}

/**
 * @author your name
 * @date 2022-03-24 21:39:20
 * @description getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<UserInfoModel>({
    url: Api.GetUserInfo,
  })
}

/**
 * @author your name
 * @date 2022-03-24 21:39:20
 * @description doLogout
 */
export function doLogout() {
  return defHttp.get({
    url: Api.Logout,
  })
}
