import { intersection } from 'lodash-es'
import { useUserStore } from '@/store/modules/user'
import { RoleEnum } from '@/enums/roleEnum'
import { isArray } from '@/utils/is'

/**
 * @description 与用户权限相关的操作
 */
export function usePermission() {
  const userStore = useUserStore()

  /**
   * @description 角色权限判断
   */
  function hasRole(value?: string | string[], def = true): boolean {
    if (!value) {
      return def
    }

    if (!isArray(value)) {
      return userStore.getRoles.includes(value as RoleEnum)
    }

    return intersection(value, userStore.getRoles).length > 0
  }

  /**
   * @description 细分权限判断
   */
  function hasPermission(value?: string | string[], def = true): boolean {
    if (!value) {
      return def
    }

    if (!isArray(value)) {
      return userStore.getPermissions.includes(value as RoleEnum)
    }

    return intersection(value, userStore.getPermissions).length > 0
  }

  return { hasRole, hasPermission }
}
