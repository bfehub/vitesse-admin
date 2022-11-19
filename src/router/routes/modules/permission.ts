import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'

const permission: RouteRecordRaw = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/test',
  meta: {
    title: '权限',
  },
  children: [
    {
      path: 'test',
      name: 'permissionTest',
      component: () => import('@/views/permission/test/index.vue'),
      meta: {
        title: '测试',
      },
    },
  ],
}

export default permission
