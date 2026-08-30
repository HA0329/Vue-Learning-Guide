<!--
  生命周期演示组件
  展示 Vue 3 组合式 API 中的生命周期钩子
-->
<template>
  <div class="demo-area">
    <div class="demo-label">组件生命周期日志</div>
    <div style="background: #282c34; color: #98c379; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; max-height: 200px; overflow-y: auto;">
      <div v-for="(log, index) in logs" :key="index">
        [{{ log.time }}] {{ log.message }}
      </div>
    </div>
    <p style="margin-top: 8px; font-size: 13px; color: #666;">
      组件已运行 {{ seconds }} 秒（onMounted 启动的定时器，onUnmounted 清理）
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount } from 'vue'

const logs = ref([])
const seconds = ref(0)
let timer = null

function addLog(message) {
  logs.value.push({
    time: new Date().toLocaleTimeString(),
    message
  })
}

// 组件创建阶段（setup 本身就是创建阶段）
addLog('setup() - 组件初始化，beforeCreate 和 created 合并到这里')

// 挂载前：DOM 还未创建
onBeforeMount(() => {
  addLog('onBeforeMount - 组件挂载前，DOM 尚未渲染')
})

// 挂载后：DOM 已创建，可以访问 DOM 元素
onMounted(() => {
  addLog('onMounted - 组件已挂载，DOM 可用，适合发起请求、启动定时器')
  timer = setInterval(() => {
    seconds.value++
  }, 1000)
})

// 更新前：响应式数据变化，DOM 更新前
onBeforeUpdate(() => {
  addLog('onBeforeUpdate - 组件即将更新，DOM 还未重新渲染')
})

// 更新后：DOM 已更新
onUpdated(() => {
  addLog('onUpdated - 组件已更新，DOM 已重新渲染')
})

// 卸载前：组件即将销毁
onBeforeUnmount(() => {
  addLog('onBeforeUnmount - 组件即将卸载，清理工作在这里做')
})

// 卸载后：组件已销毁
onUnmounted(() => {
  // 这里不能再用 addLog，因为组件已经销毁
  console.log('onUnmounted - 组件已卸载')
  if (timer) clearInterval(timer)
})
</script>
