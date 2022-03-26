/**
 * @description 配置路由守卫
 */
import { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router)
}
