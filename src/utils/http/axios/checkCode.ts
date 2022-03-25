import type { RequestOptions } from '#/axios'
import { log } from '@/utils/log'

/**
 * @description 可以根据 code 做任何的业务逻辑，如权限状态等等
 */
export function checkCode(code: number, message: string, options: RequestOptions) {
  let errMessage = ''

  // 根据实际业务判断
  switch (code) {
    case -1:
      errMessage = `${message}`
      break
    default:
  }

  // 这里可以做一些公用的提示框
  if (errMessage) {
    log(errMessage)
  }
}
