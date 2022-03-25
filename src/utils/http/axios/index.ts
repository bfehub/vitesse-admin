/**
 * @description 可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
 */
import type { AxiosResponse } from 'axios'
import type { Result } from '#/axios'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'

import axios from 'axios'
import { clone, assign, merge } from 'lodash-es'
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { ApiMsgEnum } from '@/enums/messageEnum'
import { isString } from '@/utils/is'
import { getAppEnvConfig } from '@/utils/env'
import { getToken } from '@/utils/auth'
import { setObjToUrlParams } from '@/utils'
import { VAxios } from './Axios'
import { joinTimestamp } from './helper'
import { checkCode } from './checkCode'
import { checkStatus } from './checkStatus'

const globEnv = getAppEnvConfig()

/**
 * @description 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description 请求之前处理 config
   */
  beforeRequestHook: (config, options) => {
    const { apiUrl, urlPrefix, joinPrefix, joinParamsToUrl, joinTime = true } = options

    // 拼接前缀
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    // 拼接全路径
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }

    const params = config.params || {}
    const data = config.data || false

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容 restful 风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          // 非 get 请求如果没有提供 data，则将 params 视为 data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            assign({}, config.params, config.data)
          )
        }
      } else {
        // 兼容 restful 风格
        config.url = config.url + params
        config.params = undefined
      }
    }

    return config
  },

  /**
   * @description 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  afterRequestHook: (res: AxiosResponse<Result>, options) => {
    const { isTransformResponse, isReturnNativeResponse } = options

    // 是否返回原生响应头
    // 比如需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }

    // 不进行任何处理直接返回
    // 用于页面代码可能需要直接获取 code，data，message 这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }

    // 没有返回任何数据
    const { data } = res
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error(ApiMsgEnum.apiRequestFailed)
    }

    // 这里 code，result，message 为后台统一的字段
    // 需要在 types/axios.d.ts 内修改为项目自己的接口返回格式
    const { code, result, message } = data

    // 这里逻辑可以根据项目进行修改，达到成功的条件可返回数据
    if (code === ResultEnum.SUCCESS) {
      return result
    }

    // 在此处根据自己项目的实际情况对不同的 code 执行不同的操作
    // 如果不希望中断当前请求，请 return 数据，否则直接抛出异常即可
    checkCode(code, message, options)

    // 此处抛出错误将调用 catch 回调
    throw new Error(message || ApiMsgEnum.apiRequestFailed)
  },

  /**
   * @description 请求失败处理数据(拦截器已执行)
   */
  requestCatchHook(error: Error, options) {
    if (axios.isAxiosError(error)) {
      let { code, message } = error.toJSON() as Recordable

      if (code === 'ECONNABORTED' && message?.indexOf('timeout') !== -1) {
        message = ApiMsgEnum.apiTimeoutMessage
      }

      if (message?.includes('Network Error')) {
        message = ApiMsgEnum.networkExceptionMsg
      }

      checkStatus(code, message, options)
    }

    if (axios.isCancel(error)) {
      // todo cancel ...
    }

    return error
  },

  /**
   * @description 请求拦截器处理
   */
  requestInterceptors: (config) => {
    const token = getToken()
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      ;(config as Recordable).headers.Authorization = token
    }
    return config
  },

  /**
   * @description 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<Result>) => {
    return res
  },

  /**
   * @description 响应错误处理
   */
  requestInterceptorsCatch: (error: Error) => {
    return Promise.reject(error)
  },

  /**
   * @description 响应错误处理
   */
  responseInterceptorsCatch: (error: Error) => {
    return Promise.reject(error)
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    merge<CreateAxiosOptions, CreateAxiosOptions>(
      {
        // 超时时间
        timeout: 10 * 1000,

        // 请求格式类型
        headers: { 'Content-Type': ContentTypeEnum.JSON },

        // 处理钩子
        transform: clone(transform),

        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 非 get 请求的时候添加参数到 url 上
          joinParamsToUrl: false,

          // 需要对返回数据进行处理
          isTransformResponse: true,

          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,

          // 接口前缀
          urlPrefix: globEnv.VITE_GLOB_API_URL_PREFIX,

          // 是否拼接 prefix 到 url 上
          joinPrefix: true,

          // 错误时提示类型
          errorMessageMode: 'message',

          // 是否加入时间搓
          joinTime: true,

          // 是否取消重复请求
          isCancelToken: false,

          // 是否携带 token
          withToken: true,
        },
      },
      opt || {}
    )
  )
}

/**
 * 默认请求
 */
export const defHttp = createAxios({
  requestOptions: {
    apiUrl: globEnv.VITE_GLOB_API_URL,
  },
})

/**
 * 其他请求
 */
export const otherHttp = createAxios({
  requestOptions: {
    apiUrl: globEnv.VITE_GLOB_API_URL_OTHER,
  },
})
