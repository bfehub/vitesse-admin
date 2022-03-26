import { CacheTypeEnum } from '@/enums/cacheEnum'

/**
 * 项目环境变量
 */
export interface GlobEnvConfig {
  /**
   * 应用名称
   */
  VITE_GLOB_APP_TITLE: string
  /**
   * 应用标识名称
   */
  VITE_GLOB_APP_SHORT_NAME: string
  /**
   * 基础请求
   */
  VITE_GLOB_API_URL: string
  /**
   * 基础请求前缀
   */
  VITE_GLOB_API_URL_PREFIX: string
  /**
   * 其他请求示例
   */
  VITE_GLOB_API_URL_OTHER: string
}

/**
 * 项目配置
 */
export interface ProjectConfig {
  /**
   * 权限缓存存放类型，默认 localStorage
   */
  permissionCacheType: CacheTypeEnum
  /**
   * 灰色模式，用于可能悼念的日期开启
   */
  grayMode: boolean
  /**
   * 色弱模式
   */
  colorWeak: boolean
  /**
   * 是否使用全局错误捕获
   */
  useErrorHandle: boolean
  /**
   * 是否开启回到顶部
   */
  useOpenBackTop: boolean
}
