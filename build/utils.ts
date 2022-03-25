/**
 * 是否生成包信息分析
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true'
}

/**
 * 解析环境配置的类型，如 'true' 处理为 true
 * @param envConf
 * @returns ViteEnv
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')

    // 转化布尔值
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    // 转化端口配置
    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }

    // 转化代理配置
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      } catch (error) {}
    }

    ret[envName] = realName
  }

  return ret
}
