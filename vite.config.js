import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Vite 配置文件
// 文档：https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 使用完整版 Vue（包含模板编译器），
      // 以支持在组件中直接用 template 字符串定义组件（如 AdvancedView 中的动态组件、异步组件）
      'vue': 'vue/dist/vue.esm-bundler.js',
      // 使用 @ 指向 src 目录，方便导入
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    // Vue 3 编译期特性开关（完整版构建需要显式声明，否则会有控制台警告）
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
  },
  server: {
    port: 3000,
    open: true
  }
})
