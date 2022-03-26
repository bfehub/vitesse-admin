import type { ProjectConfig } from '#/config'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { ThemeEnum } from '@/enums/appEnum'

interface AppState {
  darkMode: Nullable<ThemeEnum>
  projectConfig: Nullable<ProjectConfig>
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: null,
    projectConfig: null,
  }),
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
