import type { MenuItem } from '#/common'
import { RoleEnum } from '@/enums/roleEnum'

const admin: MenuItem[] = [
  {
    name: '总览',
    path: '/dashboard',
    icon: 'arrow-left',
    orderNo: 10,
    roles: [RoleEnum.ADMIN],
    children: [
      {
        name: '分析页',
        path: '/dashboard/analysis',
      },
      {
        name: '工作台',
        path: '/dashboard/workbench',
      },
    ],
  },
]

export default admin
