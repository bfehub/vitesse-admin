/**
 * 全局的权限指令，用于对组件权限进行细粒度控制
 * @example v-auth="RoleEnum.TEST"
 * @example v-auth="[RoleEnum.TEST]"
 */
import type { App, Directive, DirectiveBinding } from 'vue'
import { usePermission } from '@/hooks/usePermission'

function isAuth(el: Element, binding: any) {
  const { hasPermission } = usePermission()

  const value = binding.value
  if (!value) return
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el) // 移除真实的 DOM 元素
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding)
}

const authDirective: Directive = {
  mounted,
}

export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective)
}

export default authDirective
