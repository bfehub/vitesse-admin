import type { MenuItem } from '#/common'

const mine: MenuItem[] = [
  {
    name: '我的',
    path: '/mine',
    icon: 'arrow-left',
    orderNo: 20,
    children: [
      {
        name: '资料',
        path: '/mine/data',
      },
      {
        name: '关注',
        path: '/mine/follow',
      },
    ],
  },
]

export default mine
