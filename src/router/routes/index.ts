import type { RouteRecordRaw } from 'vue-router'
import { PAGE_ROOT_ROUTE, PAGE_LOGIN_ROUTE, PAGE_NOT_FOUND_ROUTE } from './basic'

// 自动加载目录下的路由模块
const modules = import.meta.glob<any>('./modules/**/*.ts', { eager: true })
const routeModuleList: RouteRecordRaw[] = []

// 读取到模块内容合并一个集合中
// 读取的路由应并未立即注册，而是等权限认证完后通过 router.addRoutes 添加到路由实例实现过滤
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const asyncRoutes = routeModuleList

export const basicRoutes = [PAGE_ROOT_ROUTE, PAGE_LOGIN_ROUTE, PAGE_NOT_FOUND_ROUTE]
