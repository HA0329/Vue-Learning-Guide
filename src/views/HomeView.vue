<!--
  首页视图
  展示项目概览和学习路径导航
-->
<template>
  <div>
    <!-- Hero 区域 -->
    <div class="hero">
      <h1>Vue.js 3 详尽学习指南</h1>
      <p>通过交互式示例，从零开始掌握 Vue 3 的核心概念、组件化、路由、状态管理和进阶特性</p>
    </div>

    <!-- 学习路径卡片 -->
    <h2 style="margin-bottom: 20px; color: #35495e;">学习路径</h2>
    <div class="grid-3">
      <router-link to="/basics" class="feature-card">
        <div class="feature-icon">📘</div>
        <div class="feature-title">基础概念</div>
        <div class="feature-desc">响应式、模板语法、计算属性、侦听器、class与style绑定</div>
      </router-link>
      
      <router-link to="/components" class="feature-card">
        <div class="feature-icon">🧩</div>
        <div class="feature-title">组件化</div>
        <div class="feature-desc">Props、Emit、插槽、生命周期、Provide/Inject、v-model</div>
      </router-link>
      
      <router-link to="/composition" class="feature-card">
        <div class="feature-icon">⚡</div>
        <div class="feature-title">组合式 API</div>
        <div class="feature-desc">setup、ref、reactive、watch、生命周期、自定义组合函数</div>
      </router-link>
      
      <router-link to="/router" class="feature-card">
        <div class="feature-icon">🧭</div>
        <div class="feature-title">路由管理</div>
        <div class="feature-desc">Vue Router 基础、动态路由、嵌套路由、导航守卫、路由元信息</div>
      </router-link>
      
      <router-link to="/pinia" class="feature-card">
        <div class="feature-icon">🗄️</div>
        <div class="feature-title">状态管理</div>
        <div class="feature-desc">Pinia 核心概念、State/Getters/Actions、多 Store 协作、持久化</div>
      </router-link>
      
      <router-link to="/advanced" class="feature-card">
        <div class="feature-icon">🚀</div>
        <div class="feature-title">进阶特性</div>
        <div class="feature-desc">自定义指令、Teleport、Suspense、动态组件、keep-alive、过渡动画</div>
      </router-link>
    </div>

    <!-- Vue 简介 -->
    <div class="card" style="margin-top: 32px;">
      <h2 class="card-title">什么是 Vue.js？</h2>
      <p style="margin-bottom: 12px;">
        Vue.js 是一套用于构建用户界面的<strong>渐进式 JavaScript 框架</strong>。
        与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。
      </p>
      <p style="margin-bottom: 12px;">
        Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。
        另一方面，当与现代化的工具链以及各种支持类库结合使用时，
        Vue 也完全能够为复杂的单页应用提供驱动。
      </p>
      
      <h3 class="card-subtitle">Vue 3 的核心特性</h3>
      <ul style="padding-left: 20px; line-height: 2;">
        <li><strong>组合式 API (Composition API)</strong>：更灵活的逻辑组织和复用方式</li>
        <li><strong>性能提升</strong>：虚拟 DOM 重写、编译时优化、更小的打包体积</li>
        <li><strong>更好的 TypeScript 支持</strong>：原生 TS 编写，类型推断更准确</li>
        <li><strong>Teleport</strong>：将组件渲染到 DOM 树的其他位置</li>
        <li><strong>Fragments</strong>：组件支持多个根节点</li>
        <li><strong>Suspense</strong>：异步组件的加载状态管理</li>
        <li><strong>响应式系统升级</strong>：基于 Proxy 替代 Object.defineProperty</li>
      </ul>
    </div>

    <!-- 快速开始 -->
    <div class="card">
      <h2 class="card-title">快速开始</h2>
      <p style="margin-bottom: 12px;">本项目使用 Vite 构建，启动方式：</p>
      <div class="code-block">
        <span class="comment"># 安装依赖</span><br>
        npm install<br><br>
        <span class="comment"># 启动开发服务器</span><br>
        npm run dev<br><br>
        <span class="comment"># 构建生产版本</span><br>
        npm run build
      </div>
      <div class="tip-box">
        建议按照导航栏的顺序依次学习每个模块，每个模块都包含可交互的示例和详细的代码注释。
      </div>
    </div>
  </div>
</template>

<script setup>
// 首页不需要特殊逻辑
</script>
