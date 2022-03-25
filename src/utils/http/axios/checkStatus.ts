import type { RequestOptions } from '#/axios'
import { log } from '@/utils/log'
import { ApiMsgEnum } from '@/enums/messageEnum'

/**
 * @description 可以根据 status 做任何的业务逻辑，如权限状态等等
 */
export function checkStatus(status: number, message: string, options: RequestOptions) {
  let errMessage = ''

  // 根据实际业务判断
  switch (status) {
    case 400:
      errMessage = `${message}`
      break
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      // userStore.setToken(undefined)
      errMessage = ApiMsgEnum.errMsg401
      // if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
      //   userStore.setSessionTimeout(true)
      // } else {
      //   userStore.logout(true)
      // }
      break
    case 403:
      errMessage = ApiMsgEnum.errMsg403
      break
    case 404:
      errMessage = ApiMsgEnum.errMsg404
      break
    case 405:
      errMessage = ApiMsgEnum.errMsg405
      break
    case 408:
      errMessage = ApiMsgEnum.errMsg408
      break
    case 500:
      errMessage = ApiMsgEnum.errMsg500
      break
    case 501:
      errMessage = ApiMsgEnum.errMsg501
      break
    case 502:
      errMessage = ApiMsgEnum.errMsg502
      break
    case 503:
      errMessage = ApiMsgEnum.errMsg503
      break
    case 504:
      errMessage = ApiMsgEnum.errMsg504
      break
    case 505:
      errMessage = ApiMsgEnum.errMsg505
      break
    default:
      errMessage = `${message}`
  }

  // 这里可以做一些公用的提示框
  if (errMessage) {
    log(errMessage)
  }
}
