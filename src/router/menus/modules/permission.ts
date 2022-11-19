import type { MenuItem } from '#/common'

const permission: MenuItem[] = [
  {
    name: '权限',
    path: '/permission',
    icon: 'arrow-left',
    orderNo: 30,
    children: [
      {
        name: '测试',
        path: '/permission/test',
      },
    ],
  },
]

export default permission
