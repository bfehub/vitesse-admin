import type { ProjectConfig } from '#/config'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import { PermissionModeEnum } from '@/enums/appEnum'

const setting: ProjectConfig = {
  /**
   * 权限模式，默认前端角色权限模式
   */
  permissionMode: PermissionModeEnum.ROLE,
  /**
   * 权限缓存存放类型，默认 localStorage
   */
  permissionCacheType: CacheTypeEnum.LOCAL,
  /**
   * 灰色模式，用于可能悼念的日期开启
   */
  grayMode: false,
  /**
   * 色弱模式
   */
  colorWeak: false,
  /**
   * 是否使用全局错误捕获
   */
  useErrorHandle: false,
  /**
   * 是否开启回到顶部
   */
  useOpenBackTop: true,
}

export default setting
