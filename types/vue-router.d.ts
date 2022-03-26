import { RoleEnum } from '@/enums/roleEnum'

/**
 * @description 扩展 vue-router 的 meta 类型
 */
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /**
     * 标题
     */
    title: string
    /**
     * 图标
     */
    icon?: string
    /**
     * 排序
     */
    orderNo?: number
    /**
     * 忽略权限
     */
    ignoreAuth?: boolean
    /**
     * 角色权限
     */
    roles?: RoleEnum[]
  }
}
