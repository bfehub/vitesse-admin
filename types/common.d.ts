import { RoleEnum } from '@/enums/roleEnum'

/**
 * @description 用户基本信息
 */
export interface RoleInfo {
  name: string
  value: string
}

export interface UserInfo {
  /**
   * 用户标识
   */
  userId: string | number
  /**
   * 用户昵称
   */
  username: string
  /**
   * 用户真实姓名
   */
  realName: string
  /**
   * 默认访问路径
   */
  homePath: string
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 用户描述
   */
  desc: string
  /**
   * 用户Token
   */
  token: string
  /**
   * 角色权限
   */
  roles: RoleInfo[]
  /**
   * 细分权限
   */
  permissions: string[]
}

/**
 * @description 菜单基本信息
 */
export interface MenuItem {
  /**
   * 名称
   */
  name: string
  /**
   * 路由路径
   */
  path: string
  /**
   * 图标
   */
  icon?: string
  /**
   * 子菜单
   */
  children?: MenuItem[]
  /**
   * 排序
   */
  orderNo?: number
  /**
   * 角色权限
   */
  roles?: RoleEnum[]
}
