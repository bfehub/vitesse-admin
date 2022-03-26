import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import '@/styles/index.scss'
import 'virtual:windi-utilities.css'
import 'virtual:svg-icons-register'

import App from './App.vue'
import { createApp } from 'vue'
import { setupStore } from '@/store'
import { initAppConfigStore } from '@/logics'
import { registerGlobComponents } from '@/components'
import { registerGlobDirectives } from '@/directives'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { setupErrorHandle } from '@/logics/error-handle'

async function bootstrap() {
  const app = createApp(App)

  // 初始化状态管理
  setupStore(app)

  // 初始化系统的配置、项目配置、样式主题、持久化缓存等等
  initAppConfigStore(app)

  // 注册全局组件
  registerGlobComponents(app)

  // 注册全局指令
  registerGlobDirectives(app)

  // 配置路由
  setupRouter(app)

  // 配置路由守卫、权限判断、初始化缓存数据
  setupRouterGuard(router)

  // 配置全局错误处理
  setupErrorHandle(app)

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  // 挂载容器
  app.mount('#app')
}

bootstrap()
