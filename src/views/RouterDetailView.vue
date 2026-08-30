<!--
  路由详情视图（嵌套路由 + 动态参数）
  演示如何通过 useRoute 获取动态路由参数 :id
-->
<template>
  <div style="padding: 16px; background: #f8f9fa; border-radius: 6px;">
    <h3 style="color: #35495e; margin-bottom: 8px;">
      文章 #{{ route.params.id }}：{{ article?.title || '加载中...' }}
    </h3>
    <span class="tag tag-green" v-if="article">{{ article.category }}</span>
    <p style="margin-top: 12px; color: #555;">{{ article?.content }}</p>
    <p style="margin-top: 12px; font-size: 13px; color: #999;">
      路由参数 id = <code>{{ route.params.id }}</code>
    </p>
    <button class="btn btn-secondary" style="margin-top: 8px;" @click="$router.back()">返回列表</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 模拟根据 id 获取文章
const articles = {
  1: { id: 1, title: 'Vue 3 响应式原理详解', category: '原理', content: 'Vue 3 使用 Proxy 替代 Object.defineProperty 实现响应式系统，支持数组索引、属性添加/删除等场景，性能更好。' },
  2: { id: 2, title: '组合式 API 最佳实践', category: '实践', content: '使用组合式 API 时，建议按逻辑功能组织代码，将相关的状态和方法封装到组合式函数中，提高可复用性和可维护性。' },
  3: { id: 3, title: 'Pinia 状态管理入门', category: '状态管理', content: 'Pinia 是 Vue 3 官方推荐的状态管理库，API 简洁，支持 TypeScript，不需要 mutations，actions 中可以直接修改 state。' }
}

const article = computed(() => articles[route.params.id])
</script>
