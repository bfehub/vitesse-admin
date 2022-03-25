import { isDevMode } from '@/utils/env'

// 默认缓存时间
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

// AES加密密钥
export const cacheCipher = {
  iv: '@11111000001111_',
  key: '_11111000001111@',
}

// 是否使用 AES 加密
export const enableStorageEncryption = !isDevMode()
