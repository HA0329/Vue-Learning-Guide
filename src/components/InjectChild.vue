<!--
  Provide/Inject 演示的后代组件
  直接通过 inject 接收祖先组件提供的数据，不需要经过中间层
-->
<template>
  <div style="padding: 12px; background: white; border-radius: 6px;">
    <p><strong>后代组件通过 inject 接收：</strong></p>
    <p>主题：<span class="tag" :class="theme === 'light' ? 'tag-green' : 'tag-blue'">{{ theme }}</span></p>
    <p>用户名：{{ user.name }}</p>
    <p>角色：{{ user.role }}</p>
    <button class="btn btn-secondary" style="margin-top: 8px;" @click="callToggleTheme">
      调用祖先提供的方法切换主题
    </button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// inject 接收祖先组件 provide 的数据
// 第二个参数是默认值（当没有 provide 时使用）
const theme = inject('theme', 'default')
const user = inject('user', { name: '未知', role: 'guest' })
const toggleTheme = inject('toggleTheme', () => {})

function callToggleTheme() {
  toggleTheme()
}
</script>
