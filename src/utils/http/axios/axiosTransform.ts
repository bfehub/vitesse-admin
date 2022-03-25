/**
 * @description 数据处理类
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, Result } from '#/axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

export abstract class AxiosTransform {
  /**
   * @description 请求之前处理配置(拦截器未执行)
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  /**
   * @description 请求之后处理数据(拦截器已执行)
   */
  afterRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any

  /**
   * @description 请求失败处理数据(拦截器已执行)
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => any

  /**
   * @description 请求之前的拦截器(Axios Interceptors)
   */
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig

  /**
   * @description 请求之后的拦截器(Axios Interceptors)
   */
  responseInterceptors?: (res: AxiosResponse<Result>) => AxiosResponse<Result>

  /**
   * @description 请求之前的拦截器错误处理(Axios Interceptors)
   */
  requestInterceptorsCatch?: (error: Error) => Promise<any>

  /**
   * @description 请求之后的拦截器错误处理(Axios Interceptors)
   */
  responseInterceptorsCatch?: (error: Error) => Promise<any>
}
