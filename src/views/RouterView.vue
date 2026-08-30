<!--
  路由演示视图
  展示 Vue Router 的核心功能：
  1. 路由跳转（router-link / useRouter）
  2. 路由参数（useRoute）
  3. 嵌套路由
  4. 路由元信息
  5. 编程式导航
-->
<template>
  <div>
    <h1 style="margin-bottom: 24px; color: #35495e;">Vue Router 路由详解</h1>

    <!-- 路由信息展示 -->
    <div class="card">
      <h2 class="card-title">1. 当前路由信息</h2>
      <p>通过 <code>useRoute()</code> 获取当前路由对象：</p>
      <div class="demo-area">
        <table class="demo-table">
          <tr><th>属性</th><th>值</th></tr>
          <tr><td>path</td><td><code>{{ route.path }}</code></td></tr>
          <tr><td>name</td><td><code>{{ route.name }}</code></td></tr>
          <tr><td>fullPath</td><td><code>{{ route.fullPath }}</code></td></tr>
          <tr><td>meta.title</td><td>{{ route.meta.title }}</td></tr>
          <tr><td>query</td><td><code>{{ JSON.stringify(route.query) }}</code></td></tr>
          <tr><td>params</td><td><code>{{ JSON.stringify(route.params) }}</code></td></tr>
        </table>
      </div>
    </div>

    <!-- 路由跳转方式 -->
    <div class="card">
      <h2 class="card-title">2. 路由跳转方式</h2>
      
      <h3 class="card-subtitle">方式一：声明式导航 (router-link)</h3>
      <div class="demo-area">
        <router-link to="/" class="btn btn-primary">回首页</router-link>
        <router-link to="/basics" class="btn btn-secondary">去基础概念页</router-link>
        <router-link :to="{ path: '/components', query: { from: 'router-demo' } }" class="btn btn-secondary">
          带 query 参数跳转
        </router-link>
      </div>

      <h3 class="card-subtitle">方式二：编程式导航 (useRouter)</h3>
      <div class="demo-area">
        <button class="btn btn-primary" @click="goHome">router.push('/')</button>
        <button class="btn btn-secondary" @click="goBack">router.back() 返回</button>
        <button class="btn btn-secondary" @click="goForward">router.forward() 前进</button>
        <button class="btn btn-danger" @click="replaceHome">router.replace() 不留下历史记录</button>
        
        <div class="code-block" style="margin-top: 12px;">
          <span class="keyword">const</span> router = <span class="function">useRouter</span>()<br><br>
          <span class="comment">// 字符串路径</span><br>
          router.<span class="function">push</span>(<span class="string">'/home'</span>)<br><br>
          <span class="comment">// 对象形式</span><br>
          router.<span class="function">push</span>({ <span class="attr">path</span>: <span class="string">'/user'</span>, <span class="attr">query</span>: { id: <span class="string">1</span> } })<br><br>
          <span class="comment">// 命名路由 + 参数</span><br>
          router.<span class="function">push</span>({ <span class="attr">name</span>: <span class="string">'User'</span>, <span class="attr">params</span>: { id: <span class="string">1</span> } })
        </div>
      </div>
    </div>

    <!-- 动态路由与嵌套路由 -->
    <div class="card">
      <h2 class="card-title">3. 动态路由与嵌套路由</h2>
      <p>点击下方链接查看动态路由参数和嵌套路由效果：</p>
      
      <div class="demo-area">
        <div class="demo-label">文章列表（点击查看详情，使用动态路由 :id）</div>
        <ul class="demo-list" style="background: white; border-radius: 6px;">
          <li v-for="article in articles" :key="article.id">
            <router-link 
              :to="`/router/detail/${article.id}`" 
              style="color: #42b883; text-decoration: none;"
            >
              {{ article.id }}. {{ article.title }}
            </router-link>
            <span class="tag tag-blue">{{ article.category }}</span>
          </li>
        </ul>
        
        <!-- 嵌套路由出口 -->
        <div style="margin-top: 16px; padding: 16px; border: 2px dashed #ddd; border-radius: 6px;">
          <p style="font-size: 13px; color: #666; margin-bottom: 8px;">
            嵌套路由出口（点击文章后在这里显示详情）：
          </p>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" v-if="Component" />
              <p v-else style="color: #999; text-align: center;">暂无选中文章</p>
            </transition>
          </router-view>
        </div>
      </div>

      <div class="code-block">
        <span class="comment">// 路由配置</span><br>
        {<br>
        &nbsp;&nbsp;<span class="attr">path</span>: <span class="string">'/router'</span>,<br>
        &nbsp;&nbsp;<span class="attr">component</span>: RouterView,<br>
        &nbsp;&nbsp;<span class="attr">children</span>: [<br>
        &nbsp;&nbsp;&nbsp;&nbsp;{<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="attr">path</span>: <span class="string">'detail/:id'</span>,  <span class="comment">// 动态参数</span><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="attr">name</span>: <span class="string">'RouterDetail'</span>,<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="attr">component</span>: RouterDetailView<br>
        &nbsp;&nbsp;&nbsp;&nbsp;}<br>
        &nbsp;&nbsp;]<br>
        }
      </div>
    </div>

    <!-- 路由元信息与守卫 -->
    <div class="card">
      <h2 class="card-title">4. 路由元信息与导航守卫</h2>
      
      <div class="demo-area">
        <p><strong>路由元信息 (meta)：</strong>可以在路由配置中附加自定义信息，如标题、权限要求等。</p>
        <p>当前页面 meta：<code>{{ JSON.stringify(route.meta) }}</code></p>
        
        <p style="margin-top: 16px;"><strong>全局前置守卫：</strong>在 router/index.js 中配置，每次导航前执行。</p>
        <div class="code-block">
          router.<span class="function">beforeEach</span>((to, from, next) => {<br>
          &nbsp;&nbsp;<span class="comment">// 权限校验示例</span><br>
          &nbsp;&nbsp;<span class="keyword">if</span> (to.meta.requiresAuth && !isLoggedIn()) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="function">next</span>(<span class="string">'/login'</span>)<br>
          &nbsp;&nbsp;} <span class="keyword">else</span> {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="function">next</span>()<br>
          &nbsp;&nbsp;}<br>
          })
        </div>
      </div>

      <div class="tip-box">
        <strong>守卫执行顺序：</strong>
        全局 beforeEach → 路由 beforeEnter → 组件 beforeRouteEnter → 全局 beforeResolve → 全局 afterEach
      </div>
    </div>

    <!-- 404 演示 -->
    <div class="card">
      <h2 class="card-title">5. 404 页面</h2>
      <p>使用通配符路由匹配所有未定义的路径：</p>
      <div class="demo-area">
        <router-link to="/this-page-does-not-exist" class="btn btn-danger">
          访问一个不存在的页面
        </router-link>
        <div class="code-block" style="margin-top: 12px;">
          {<br>
          &nbsp;&nbsp;<span class="attr">path</span>: <span class="string">'/:pathMatch(.*)*'</span>,<br>
          &nbsp;&nbsp;<span class="attr">name</span>: <span class="string">'NotFound'</span>,<br>
          &nbsp;&nbsp;<span class="attr">component</span>: NotFoundView<br>
          }
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 获取当前路由对象（只读）
const route = useRoute()

// 获取路由实例，用于编程式导航
const router = useRouter()

// 模拟文章数据
const articles = ref([
  { id: 1, title: 'Vue 3 响应式原理详解', category: '原理', content: 'Vue 3 使用 Proxy 实现响应式...' },
  { id: 2, title: '组合式 API 最佳实践', category: '实践', content: '如何组织组合式 API 代码...' },
  { id: 3, title: 'Pinia 状态管理入门', category: '状态管理', content: 'Pinia 是 Vue 3 官方推荐的状态管理库...' }
])

// 编程式导航方法
function goHome() {
  router.push('/')
}

function goBack() {
  router.back()
}

function goForward() {
  router.forward()
}

function replaceHome() {
  router.replace('/')
}
</script>
