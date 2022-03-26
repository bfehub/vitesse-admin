interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
}

/**
 * @description 合并配置
 */
const getConfig = (config: Partial<TreeHelperConfig>) => {
  return Object.assign({}, DEFAULT_CONFIG, config)
}

/**
 * @description 过滤树结构
 */
export function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  config = getConfig(config)
  const children = config.children as string
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children])
        return func(node)
      })
  }
  return listFilter(tree)
}
