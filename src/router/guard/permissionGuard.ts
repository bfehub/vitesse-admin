import type { Router } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { usePermission } from '@/hooks/usePermission'
import { PageEnum } from '@/enums/pageEnum'

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const { hasPermission } = usePermission()
  router.beforeEach(async (to, from, next) => {
    // 在路由配置了忽略权限
    if (to.meta.ignoreAuth) {
      next()
      return
    }

    // 如果 token 不存在重定向到登录
    if (!userStore.getToken) {
      next({
        path: PageEnum.BASE_LOGIN,
        replace: true,
        query: {
          redirect: to.path,
        },
      })
      return
    }

    // 检测是否有权限访问
    if (!hasPermission(to.meta.roles)) {
      const status = window.confirm('无权限访问，切换账号?')
      if (status) {
        next({
          path: PageEnum.BASE_LOGIN,
          replace: true,
          query: {
            redirect: from.path,
          },
        })
      } else {
        next({
          path: from.path,
          replace: true,
        })
      }
    }

    // 路由守卫校验通过
    next()
  })
}
