import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import type { RequestOptions, Result, UploadFileParams } from '#/axios'
import type { CreateAxiosOptions } from './axiosTransform'
import qs from 'qs'
import axios from 'axios'
import { cloneDeep, assign } from 'lodash-es'
import { AxiosCanceler } from './axiosCancel'
import { isFunction } from '@/utils/is'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'

/**
 * @description 封装 axios 模块
 */
export class VAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  /**
   * @description 获取 axios 实例
   */
  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * @description 设置请求头
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    assign(this.axiosInstance.defaults.headers, headers)
  }

  /**
   * @description 获取处理钩子
   */
  private getTransform() {
    return this.options.transform
  }

  /**
   * @description 处理 form-data 类型
   */
  private supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    }
  }

  /**
   * @description 初始化拦截器
   */
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform

    const axiosCanceler = new AxiosCanceler()

    /**
     * @description 添加请求之前拦截器(成功)
     */
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig & Recordable) => {
      // 是否开启取消重复请求，接口的配置高于默认配置
      const isCancelToken = config.requestOptions?.isCancelToken
      const isCancelTokenDefault = this.options.requestOptions?.isCancelToken
      const isCancel = isCancelToken !== undefined ? isCancelToken : isCancelTokenDefault

      // 添加请求到缓存中
      isCancel && axiosCanceler.addPending(config)

      // 如果配置添加拦截器
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config)
      }

      return config
    }, undefined)

    /**
     * @description 添加请求之前拦截器(错误)
     */
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    /**
     * @description 添加响应拦截器(成功)
     */
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      // 从缓存中删除请求
      res && axiosCanceler.removePending(res.config)

      // 如果配置添加拦截器
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }

      return res
    }, undefined)

    /**
     * @description 添加响应拦截器(错误)
     */
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  /**
   * @description 上传文件
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData()
    const customFilename = params.name || 'file'

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename)
    } else {
      formData.append(customFilename, params.file)
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data![key])
      })
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    })
  }

  /**
   * @description get
   */
  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.GET }, options)
  }

  /**
   * @description post
   */
  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.POST }, options)
  }

  /**
   * @description put
   */
  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.PUT }, options)
  }

  /**
   * @description delete
   */
  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.DELETE }, options)
  }

  /**
   * @description request
   */
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    const { beforeRequestHook, afterRequestHook, requestCatchHook } = this.getTransform() || {}

    // 深度克隆一份配置，避免后续的更改影响用户传入的数据
    let conf: CreateAxiosOptions = cloneDeep(config)

    // 合并默认配置和接口请求配置
    const { requestOptions } = this.options
    const opt: RequestOptions = assign({}, requestOptions, options)

    // 请求之前处理钩子
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }

    // 更新合并后的配置
    conf.requestOptions = opt

    // 处理 form-data 类型
    conf = this.supportFormData(conf)

    // 用 Promise 包装请求控制成功和失败
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          // 请求之后处理钩子
          if (afterRequestHook && isFunction(afterRequestHook)) {
            try {
              // 如果返回的格式不符合要求抛出错误
              const ret = afterRequestHook(res, opt)
              resolve(ret)
            } catch (err) {
              // 如果不符合格式让此次失败
              reject(err || new Error('request error!'))
            }
            return
          }
          // 没有配置钩子直接返回
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          // 请求失败处理钩子
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          // 没有配置钩子直接返回
          reject(e)
        })
    })
  }
}
