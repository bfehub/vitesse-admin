import { defHttp } from '@/utils/http/axios'

/**
 * @author your name
 * @date 2022-03-24 21:39:20
 * @description success
 */
export function getSuccess() {
  return defHttp.get<any>({
    url: '/success',
  })
}

/**
 * @author your name
 * @date 2022-03-24 21:39:20
 * @description cancel
 */
export function getCancel() {
  return defHttp.get<any>(
    {
      url: '/cancel',
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
  return defHttp.get<any>({
    url: '/error',
  })
}

/**
 * @author your name
 * @date 2022-03-24 21:39:20
 * @description error
 */
export function getError404() {
  return defHttp.get<any>({
    url: '/error/404',
  })
}
