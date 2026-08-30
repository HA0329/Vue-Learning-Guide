/**
 * Vue Router 路由配置
 * 
 * Vue Router 是 Vue.js 官方的路由管理器，用于构建单页应用 (SPA)
 * 核心概念：
 * - 路由映射：URL 路径 -> 组件
 * - 嵌套路由：父子路由结构
 * - 动态路由：路径参数 (如 /user/:id)
 * - 路由守卫：导航前后的钩子函数
 * - 命名路由和命名视图
 */

import { createRouter, createWebHistory } from 'vue-router'

// 路由表：路径与组件的映射关系
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/basics',
    name: 'Basics',
    component: () => import('@/views/BasicsView.vue'),
    meta: { title: '基础概念' }
  },
  {
    path: '/components',
    name: 'Components',
    component: () => import('@/views/ComponentsView.vue'),
    meta: { title: '组件化' }
  },
  {
    path: '/composition',
    name: 'Composition',
    component: () => import('@/views/CompositionView.vue'),
    meta: { title: '组合式 API' }
  },
  {
    path: '/router',
    name: 'RouterDemo',
    component: () => import('@/views/RouterView.vue'),
    meta: { title: '路由详解' },
    // 嵌套路由示例
    children: [
      {
        path: 'detail/:id',
        name: 'RouterDetail',
        component: () => import('@/views/RouterDetailView.vue'),
        meta: { title: '路由详情' }
      }
    ]
  },
  {
    path: '/pinia',
    name: 'PiniaDemo',
    component: () => import('@/views/PiniaView.vue'),
    meta: { title: '状态管理' }
  },
  {
    path: '/advanced',
    name: 'Advanced',
    component: () => import('@/views/AdvancedView.vue'),
    meta: { title: '进阶特性' }
  },
  // 404 页面：匹配所有未定义的路径
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面未找到' }
  }
]

// 创建路由实例
const router = createRouter({
  // 使用 HTML5 History 模式（需要服务器配置支持）
  // 另一种是 createWebHashHistory()，URL 中带 # 号
  history: createWebHistory(),
  routes,
  // 滚动行为：切换路由时滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

/**
 * 全局前置守卫
 * 在每次导航前执行，可用于权限校验、登录检查等
 * 
 * 参数：
 * - to: 即将进入的目标路由对象
 * - from: 当前导航正要离开的路由对象
 * - next: 函数，调用 resolve 这个钩子
 *   - next() 继续导航
 *   - next(false) 中断导航
 *   - next('/path') 重定向到指定路径
 */
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - Vue 3 学习指南` : 'Vue 3 学习指南'
  
  // 示例：权限校验（实际项目中使用）
  // if (to.meta.requiresAuth && !isLoggedIn()) {
  //   next('/login')
  // } else {
  //   next()
  // }
  
  next()
})

/**
 * 全局后置钩子
 * 导航完成后执行，没有 next 函数，不会改变导航本身
 * 可用于分析、更改页面标题等
 */
router.afterEach((to, from) => {
  // console.log(`从 ${from.path} 导航到 ${to.path}`)
})

export default router
