import type { MenuItem } from '#/common'

// 自动加载目录下的路由模块
const modules = import.meta.globEager('./modules/**/*.ts')
const menuModuleList: MenuItem[] = []

// 读取到模块内容合并一个集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  menuModuleList.push(...modList)
})

/**
 * 获取菜单并更具权限过滤菜单
 * 数据可以是任意的来源(前端手动配置、前端根据路由生成、调用后台接口)返回最终的菜单
 */
export const getMenus = async (): Promise<MenuItem[]> => {
  return Promise.resolve(menuModuleList)
}
