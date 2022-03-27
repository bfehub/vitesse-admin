import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import windicss from 'vite-plugin-windicss'
import mkcert from 'vite-plugin-mkcert'
import { configVisualizerPlugin } from './visualizer'
import { configSvgIconsPlugin } from './svgSprite'
import { configCompressPlugin } from './compress'
import { configMockPlugin } from './mock'
import { configPwaPlugin } from './pwa'
import { configHtmlPlugin } from './html'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_LEGACY,
    VITE_USE_PWA,
    VITE_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // @vitejs/plugin-vue
    vue(),
    // @vitejs/plugin-vue-jsx
    vueJsx(),
  ]

  // vite-plugin-mkcert
  vitePlugins.push(mkcert({ source: 'coding' }))

  // vite-plugin-windicss
  vitePlugins.push(windicss())

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerPlugin())

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // The following plugins only work in the production environment
  if (isBuild) {
    // @vitejs/plugin-legacy
    VITE_LEGACY && vitePlugins.push(legacy())

    // vite-plugin-compression
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    )

    // vite-plugin-pwa
    VITE_USE_PWA && vitePlugins.push(configPwaPlugin(viteEnv))
  }

  return vitePlugins
}
