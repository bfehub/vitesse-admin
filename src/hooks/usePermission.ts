import { intersection } from 'lodash-es'
import { useUserStore } from '@/store/modules/user'
import { RoleEnum } from '@/enums/roleEnum'
import { isArray } from '@/utils/is'

/**
 * @description 与用户权限相关的操作
 * @returns {boolean}
 */
export function usePermission() {
  const userStore = useUserStore()

  /**
   * @description 确定是否有权限
   */
  function hasPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    if (!value) {
      return def
    }

    if (!isArray(value)) {
      return userStore.getRoleList.includes(value as RoleEnum)
    }

    return (intersection(value, userStore.getRoleList) as RoleEnum[]).length > 0
  }

  return { hasPermission }
}
