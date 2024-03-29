import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
import { RoleEnum } from '@/enums/roleEnum'

const dashboard: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    title: '总览',
    roles: [RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'analysis',
      name: 'DashboardAnalysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        title: '分析页',
        roles: [RoleEnum.ADMIN],
      },
    },
    {
      path: 'workbench',
      name: 'DashboardWorkbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '工作台',
        roles: [RoleEnum.ADMIN],
      },
    },
  ],
}

export default dashboard
