import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin'
import { OUTPUT_DIR } from './build/constant'

// https://cn.vitejs.dev/config/#config-file
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  // 加载对应模式的环境变量
  const env = loadEnv(mode, root)

  // 解析环境配置的类型，如 'true' 处理为 true
  const viteEnv = wrapperEnv(env)

  // 解构环境变量
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  // 是否打包模式
  const isBuild = command === 'build'

  return {
    // 项目根目录
    root,

    // 开发或生产环境服务的公共基础路径
    base: VITE_PUBLIC_PATH,

    // 资源解析选项
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: `${resolve(root, 'src')}/`,
        },
        {
          // #/xxxx => types/xxxx
          find: /#\//,
          replacement: `${resolve(root, 'types')}/`,
        },
      ],
    },

    // 开发服务器选项
    server: {
      host: true,
      https: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },

    // 构建选项
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      chunkSizeWarningLimit: 2000,
    },

    // 继承 esbuild 转换选项
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },

    // 插件会很多单独提取出来便于管理
    plugins: createVitePlugins(viteEnv, isBuild),
  }
}
