import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 读取所有的模块获取配置
const modules = import.meta.globEager('./**/*.ts')
const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return
  }
  mockModules.push(...modules[key].default)
})

// 在生产环境使用需要手动导入所有的模块，这里采用的是动态注入的方式(build/vite/plugin/mock.ts)
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
