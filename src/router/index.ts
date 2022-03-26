/**
 * @description 配置路由
 */
import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { asyncRoutes, basicRoutes } from './routes/index'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [...asyncRoutes, ...basicRoutes],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}
