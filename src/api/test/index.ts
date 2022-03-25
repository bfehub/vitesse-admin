import { defHttp } from '@/utils/http/axios'

enum Api {
  GetSuccess = '/success',
  GetCancel = '/cancel',
  GetError = '/error',
  GetError404 = '/error/404',
}

/**
 * @author your name
 * @date 2022-03-24 21:39:20
 * @description success
 */
export function getSuccess() {
  return defHttp.get<any>({ url: Api.GetSuccess })
}

/**
 * @author your name
 * @date 2022-03-24 21:39:20
 * @description cancel
 */
export function getCancel() {
  return defHttp.get<any>(
    {
      url: Api.GetCancel,
    },
    {
      isCancelToken: true,
    }
  )
}

/**
 * @author your name
 * @date 2022-03-24 21:39:20
 * @description error
 */
export function getError() {
  return defHttp.get<any>({ url: Api.GetError })
}

/**
 * @author your name
 * @date 2022-03-24 21:39:20
 * @description error
 */
export function getError404() {
  return defHttp.get<any>({ url: Api.GetError404 })
}
