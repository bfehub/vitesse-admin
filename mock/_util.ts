export interface requestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

/**
 * @description 请求成功基础结构
 */
export function resultSuccess<T = Recordable>(result: T, { code = 200, message = 'ok' } = {}) {
  return {
    code,
    result,
    message,
    type: 'success',
  }
}

/**
 * @description 请求成功分页结构
 */
export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return ret
}
export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {}
) {
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  }
}

/**
 * @description 请求失败结构
 */
export function resultError(message = 'Request failed', { code = -1, result = null } = {}) {
  return {
    code,
    result,
    message,
    type: 'error',
  }
}

/**
 * @description 本函数用于从 request 数据中获取 token，请根据项目的实际情况修改
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization
}
