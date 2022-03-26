import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'

const mine: RouteRecordRaw = {
  path: '/mine',
  name: 'Mine',
  component: LAYOUT,
  redirect: '/mine/data',
  meta: {
    title: '我的',
  },
  children: [
    {
      path: 'data',
      name: 'MineData',
      component: () => import('@/views/mine/data/index.vue'),
      meta: {
        title: '资料',
      },
    },
    {
      path: 'follow',
      name: 'MineFollow',
      component: () => import('@/views/mine/follow/index.vue'),
      meta: {
        title: '关注',
      },
    },
  ],
}

export default mine
