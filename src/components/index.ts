/**
 * @description 注册全局组件
 */
import type { App } from 'vue'
import { Button } from './Button'

export function registerGlobComponents(app: App) {
  app.use(Button)
}
