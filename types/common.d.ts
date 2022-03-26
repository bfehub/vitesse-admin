import { RoleEnum } from '@/enums/roleEnum'

/**
 * @description 用户基本信息
 */
export interface RoleInfo {
  roleName: string
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
   * 用户头像
   */
  avatar: string
  /**
   * 用户描述
   */
  desc?: string
  /**
   * 用户权限
   */
  roles: RoleInfo[]
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
