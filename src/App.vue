<!--
  根组件 App.vue
  
  这是整个应用的根组件，包含：
  1. 顶部导航栏（使用 router-link 进行路由跳转）
  2. 路由视图 <router-view>（根据当前路由渲染对应页面组件）
  
  Vue 单文件组件 (SFC) 由三部分组成：
  - <template>：HTML 模板，使用 Vue 模板语法
  - <script>：JavaScript 逻辑
  - <style>：样式（scoped 表示仅作用于当前组件）
-->
<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="nav-bar">
      <div class="nav-bar-inner">
        <span class="nav-logo">Vue 3 学习指南</span>
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/basics" class="nav-link">基础概念</router-link>
        <router-link to="/components" class="nav-link">组件化</router-link>
        <router-link to="/composition" class="nav-link">组合式API</router-link>
        <router-link to="/router" class="nav-link">路由</router-link>
        <router-link to="/pinia" class="nav-link">状态管理</router-link>
        <router-link to="/advanced" class="nav-link">进阶特性</router-link>
      </div>
    </nav>

    <!-- 路由视图：根据当前 URL 渲染对应页面 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <!-- 路由过渡动画 -->
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
/**
 * <script setup> 是 Vue 3 组合式 API 的语法糖
 * 在 setup 中定义的变量和函数可以直接在模板中使用
 * 不需要 return，代码更简洁
 */
</script>

<style scoped>
/* scoped 样式只作用于当前组件，不会污染全局 */
</style>
