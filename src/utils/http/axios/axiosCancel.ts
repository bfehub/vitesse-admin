import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'
import { isFunction } from '@/utils/is'

// 存储请求的标识用于取消请求
let pendingMap = new Map<string, Canceler>()

// 获取重复请求的条件(method + url)
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')

export class AxiosCanceler {
  /**
   * 添加请求
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    // 先检测是否有重复的请求，如果有应该取消请求
    this.removePending(config)

    // https://axios-http.com/zh/docs/cancellation
    // 如果用户配置了 cancelToken 使用用户配置的，否则创建一个新的 cancelToken 并把取消函数 cancel 存储起来
    const url = getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel)
        }
      })
  }

  /**
   * @description 取消缓存中所有的请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  /**
   * 取消请求
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)

    // 如果缓存中有当前请求标识，需要取消并删除当前请求
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }

  /**
   * @description 重置缓存
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
