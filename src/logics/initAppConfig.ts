/**
 * @description 初始化项目配置
 */
import type { App } from 'vue'
import { merge } from 'lodash-es'
import { useAppStore } from '@/store/modules/app'
import { getAuthCache } from '@/utils/auth'
import { PROJECT_CONFIG_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'

/**
 * @description 初始化项目配置
 */
export function initAppConfigStore(app: App) {
  const appStore = useAppStore()

  // 合并默认配置和缓存的配置设置新的缓存配置
  const cacheConfig = getAuthCache(PROJECT_CONFIG_KEY)
  const projectConfig = merge(projectSetting, cacheConfig || {})
  appStore.setProjectConfig(projectConfig)

  // 初始化默认配置的主题
  appStore.setGrayMode(projectConfig.grayMode)
  appStore.setWeakMode(projectConfig.weakMode)
  appStore.setThemeMode(projectConfig.themeMode)
}
