/**
 * 应用入口文件
 * 
 * Vue 3 应用创建流程：
 * 1. 从 vue 导入 createApp 函数
 * 2. 导入根组件 App.vue
 * 3. 创建应用实例
 * 4. 安装插件（路由、状态管理等）
 * 5. 挂载到 DOM 元素上
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// 创建 Vue 应用实例
const app = createApp(App)

// 安装 Pinia 状态管理
app.use(createPinia())

// 安装 Vue Router 路由
app.use(router)

// 全局注册组件（可选）
// app.component('GlobalComponent', GlobalComponent)

// 全局注册自定义指令（可选）
// app.directive('focus', {
//   mounted(el) {
//     el.focus()
//   }
// })

// 全局属性（可选，替代 Vue 2 的 Vue.prototype）
// app.config.globalProperties.$api = apiClient

// 挂载应用到 #app 元素
app.mount('#app')
