import type { ProjectConfig } from '#/config'
import { ThemeEnum } from '@/enums/appEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'

const setting: ProjectConfig = {
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
  weakMode: false,
  /**
   * 主题模式
   */
  themeMode: ThemeEnum.LIGHT,
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
