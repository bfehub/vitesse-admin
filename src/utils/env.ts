import type { GlobEnvConfig } from '#/config'

/**
 * @description 获取公共存储前缀
 */
export function getStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}__`.toUpperCase()
}

/**
 * @description 获取环境配置，仅提示项目配置相关的环境变量
 */
export function getAppEnvConfig() {
  return import.meta.env as unknown as GlobEnvConfig
}

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}
