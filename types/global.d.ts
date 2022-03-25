/**
 * Util type
 */
declare type Nullable<T> = T | null

declare type Recordable<T = any> = Record<string, T>

declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}

/**
 * Vite env
 */
declare interface ViteEnv {
  /**
   * 开发端口
   */
  VITE_PORT: number
  /**
   * 是否启用 Mokc
   */
  VITE_USE_MOCK: boolean
  /**
   * 是否启用 Pwa
   */
  VITE_USE_PWA: boolean
  /**
   * 公共基础路径
   */
  VITE_PUBLIC_PATH: string
  /**
   * 是否删除 console
   */
  VITE_DROP_CONSOLE: boolean
  /**
   * 是否启用压缩和压缩类型
   */
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  /**
   * 启用压缩时是否删除源文件
   */
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  /**
   * 兼容传统浏览器
   */
  VITE_LEGACY: boolean
  /**
   * 跨域代理配置
   */
  VITE_PROXY: [string, string][]
  /**
   * 应用名称
   */
  VITE_GLOB_APP_TITLE: string
  /**
   * 应用标识名称
   */
  VITE_GLOB_APP_SHORT_NAME: string
}

declare interface ImportMetaEnv extends ViteEnv {
  __: any
}
