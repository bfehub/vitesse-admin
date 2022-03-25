/**
 * @description 权限相关的存储，默认加密存储
 */
import type { UserInfo } from '#/store'
import type { ProjectConfig } from '#/config'
import { createLocalStorage, createSessionStorage } from '@/utils/cache'
import projectSetting from '@/settings/projectSetting'
import {
  cacheCipher,
  enableStorageEncryption,
  DEFAULT_CACHE_TIME,
} from '@/settings/encryptionSetting'
import {
  TOKEN_KEY,
  USER_INFO_KEY,
  USER_ROLE_KEY,
  PROJECT_CONFIG_KEY,
  CacheTypeEnum,
} from '@/enums/cacheEnum'

interface BasicStore {
  [TOKEN_KEY]: string | number | null
  [USER_INFO_KEY]: UserInfo
  [USER_ROLE_KEY]: string[]
  [PROJECT_CONFIG_KEY]: ProjectConfig
}

const ls = createLocalStorage({
  iv: cacheCipher.iv,
  key: cacheCipher.key,
  hasEncrypt: enableStorageEncryption,
  timeout: DEFAULT_CACHE_TIME,
})

const ss = createSessionStorage({
  iv: cacheCipher.iv,
  key: cacheCipher.key,
  hasEncrypt: enableStorageEncryption,
  timeout: DEFAULT_CACHE_TIME,
})

const isLocal = projectSetting.permissionCacheType === CacheTypeEnum.LOCAL

export function getToken() {
  return getAuthCache(TOKEN_KEY)
}

export function getAuthCache<Key extends keyof BasicStore>(key: Key): Nullable<BasicStore[Key]> {
  return isLocal ? ls.get(key) : ss.get(key)
}

export function setAuthCache<Key extends keyof BasicStore>(key: Key, value: BasicStore[Key]) {
  return isLocal ? ls.set(key, value) : ss.set(key, value)
}

export function removeAuthCache<Key extends keyof BasicStore>(key: Key) {
  return isLocal ? ls.remove(key) : ss.remove(key)
}
