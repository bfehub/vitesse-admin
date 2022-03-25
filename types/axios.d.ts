/**
 * @description 错误时提示类型
 */
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

/**
 * @description 重试机制配置
 */
export interface RetryRequest {
  /**
   * 是否开启重试
   * @default true
   */
  isOpenRetry: boolean
  /**
   * 重试次数
   * @default 5
   */
  count: number
  /**
   * 重试等待时间
   * @default 100ms
   */
  waitTime: number
}

/**
 * @description 请求配置，具体接口可覆盖默认配置
 */
export interface RequestOptions {
  /**
   * 非 get 请求的时候添加参数到 url 上
   * @default false
   */
  joinParamsToUrl?: boolean
  /**
   * 需要对返回数据进行处理
   * @default true
   */
  isTransformResponse?: boolean
  /**
   * 是否返回原生响应头 比如：需要获取响应头时使用该属性
   * @default false
   */
  isReturnNativeResponse?: boolean
  /**
   * 接口地址
   * @default ''
   */
  apiUrl?: string
  /**
   * 接口前缀
   * @default ''
   */
  urlPrefix?: string
  /**
   * 是否拼接 prefix 到 url 上
   * @default true
   */
  joinPrefix?: boolean
  /**
   * 错误时提示类型
   * @default 'message'
   */
  errorMessageMode?: ErrorMessageMode
  /**
   * 是否加入时间搓
   * @default true
   */
  joinTime?: boolean
  /**
   * 是否取消重复请求
   * @default false
   */
  isCancelToken?: boolean
  /**
   * 是否携带 token
   * @default true
   */
  withToken?: boolean
  /**
   * 重试机制
   * @default true
   */
  retryRequest?: RetryRequest
}

/**
 * @description 请求响应数据结构
 */
export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}

/**
 * @description 上传文件参数
 */
export interface UploadFileParams {
  /**
   * 自定义上传参数
   */
  data?: Recordable
  /**
   * 文件存储的名称
   * @default 'file'
   */
  name?: string
  /**
   * 文件内容
   */
  file: File | Blob
  /**
   * 文件名称
   */
  filename?: string
  /**
   * 自定义上传参数
   */
  [key: string]: any
}
