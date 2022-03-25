import type { EncryptionParams } from '@/utils/cipher'
import { AesEncryption } from '@/utils/cipher'
import { isNullOrUnDef } from '@/utils/is'

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string
  storage: Storage
  hasEncrypt: boolean
  timeout?: Nullable<number>
}

/**
 * @description 创建缓存存储
 * @param prefixKey 公共前缀
 * @param storage 存储方式 sessionStorage 或 localStorage
 * @param key DES key
 * @param iv DES iv
 * @param timeout 过期时间
 * @param hasEncrypt 是否使用加密
 */
export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = '',
  iv = '',
  timeout = null,
  hasEncrypt = false,
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!')
  }

  const encryption = new AesEncryption({ key, iv })

  /**
   * Cache class
   * Construction parameters can be passed into sessionStorage, localStorage
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    private storage: Storage
    private prefixKey?: string
    private encryption: AesEncryption
    private hasEncrypt: boolean

    /**
     *
     * @param {*} storage
     */
    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
      this.encryption = encryption
      this.hasEncrypt = hasEncrypt
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    /**
     * Set cache
     * @param {string} key
     * @param {*} value
     * @param {*} expire Expiration time in seconds
     * @memberof Cache
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
      })
      const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData
      this.storage.setItem(this.getKey(key), stringifyValue)
    }

    /**
     * Read cache
     * @param {string} key
     * @param {*} def
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key))
      if (!val) return def

      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val
        const data = JSON.parse(decVal)
        const { value, expire } = data
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value
        }
        this.remove(key)
      } catch (e) {
        return def
      }
    }

    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    /**
     * Delete all caches of this instance
     */
    clear(): void {
      this.storage.clear()
    }
  }

  return new WebStorage()
}
