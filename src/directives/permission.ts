import type { App, DirectiveBinding } from 'vue'
import { usePermission } from '@/hooks/usePermission'

/**
 * 角色权限判断
 * @example v-role="admin"
 * @example v-role="['admin', 'test']"
 */
export function setupRoleDirective(app: App) {
  app.directive('role', {
    mounted(el: Element, binding: DirectiveBinding<any>) {
      const { hasRole } = usePermission()
      if (!binding.value) return
      if (!hasRole(binding.value)) {
        el.parentNode?.removeChild(el)
      }
    },
  })
}

/**
 * 细分权限判断
 * @example v-permission="10001"
 * @example v-permission="[10001, 10002]"
 */
export function setupPermissionDirective(app: App) {
  app.directive('permission', {
    mounted(el: Element, binding: DirectiveBinding<any>) {
      const { hasPermission } = usePermission()
      if (!binding.value) return
      if (!hasPermission(binding.value)) {
        el.parentNode?.removeChild(el)
      }
    },
  })
}
