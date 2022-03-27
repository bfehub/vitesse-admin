import type { ProjectConfig } from '#/config'
import { defineStore } from 'pinia'
import { merge } from 'lodash-es'
import { store } from '@/store'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { PROJECT_CONFIG_KEY } from '@/enums/cacheEnum'
import { ThemeEnum } from '@/enums/appEnum'
import { updateGrayMode, updateWeakMode, updateThemeMode } from '@/logics/theme'

interface AppState {
  projectConfig: ProjectConfig
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    projectConfig: getAuthCache(PROJECT_CONFIG_KEY),
  }),
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || getAuthCache(PROJECT_CONFIG_KEY)
    },
  },
  actions: {
    setGrayMode(mode: boolean): void {
      this.projectConfig.grayMode = mode
      updateGrayMode(mode)
      setAuthCache(PROJECT_CONFIG_KEY, this.projectConfig)
    },

    setWeakMode(mode: boolean): void {
      this.projectConfig.weakMode = mode
      updateWeakMode(mode)
      setAuthCache(PROJECT_CONFIG_KEY, this.projectConfig)
    },

    setThemeMode(mode: ThemeEnum): void {
      this.projectConfig.themeMode = mode
      updateThemeMode(mode)
      setAuthCache(PROJECT_CONFIG_KEY, this.projectConfig)
    },

    setProjectConfig(config: Partial<ProjectConfig>): void {
      this.projectConfig = merge(this.projectConfig || {}, config)
      setAuthCache(PROJECT_CONFIG_KEY, this.projectConfig)
    },
  },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
