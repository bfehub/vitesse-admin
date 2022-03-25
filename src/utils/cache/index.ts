/**
 * @description 创建基础的存储封装
 */
import { getStoragePrefix } from '@/utils/env'
import { createStorage as create, CreateStorageParams } from './storageCache'

export type Options = Partial<CreateStorageParams>

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    storage,
    prefixKey: getStoragePrefix(),
    ...options,
  }
}

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options))
}

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, options)
}

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, options)
}
