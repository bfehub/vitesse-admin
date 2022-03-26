/**
 * @description 注册全局指令
 */
import type { App } from 'vue'
import { setupPermissionDirective } from './permission'

export function registerGlobDirectives(app: App) {
  setupPermissionDirective(app)
}
