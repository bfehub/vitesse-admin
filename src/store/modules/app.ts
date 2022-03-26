import type { ProjectConfig } from '#/config'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { ThemeEnum } from '@/enums/appEnum'

interface AppState {
  darkMode?: ThemeEnum
  projectConfig: ProjectConfig | null
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    projectConfig: null,
  }),
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
