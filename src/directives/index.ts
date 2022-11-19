/**
 * @description 注册全局指令
 */
import type { App } from 'vue'
import { setupRoleDirective, setupPermissionDirective } from './permission'

export function registerGlobDirectives(app: App) {
  setupRoleDirective(app)
  setupPermissionDirective(app)
}
