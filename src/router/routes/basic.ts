import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'

/**
 * @description root page
 */
export const PAGE_ROOT_ROUTE: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/mine',
  meta: {
    title: 'Root',
  },
}

/**
 * @description login page
 */
export const PAGE_LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/index.vue'),
  meta: {
    title: '登录',
  },
}

/**
 * @description 404 page
 */
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'NotFound',
  component: LAYOUT,
  meta: {
    title: '未找到页面',
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'NotFound',
      component: () => import('@/views/sys/404/index.vue'),
      meta: {
        title: '未找到页面',
      },
    },
  ],
}
