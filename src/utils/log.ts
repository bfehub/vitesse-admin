import { getAppEnvConfig } from '@/utils/env'

const { VITE_GLOB_APP_TITLE } = getAppEnvConfig()

export function log(message: string) {
  console.log(`[${VITE_GLOB_APP_TITLE} log]:${message}`)
}

export function warn(message: string) {
  console.warn(`[${VITE_GLOB_APP_TITLE} warn]:${message}`)
}

export function error(message: string) {
  throw new Error(`[${VITE_GLOB_APP_TITLE} error]:${message}`)
}
