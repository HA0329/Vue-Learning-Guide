/**
 * 组合式函数 - 鼠标位置追踪
 * 
 * 演示：
 * 1. 使用生命周期钩子（onMounted / onUnmounted）
 * 2. 事件监听的注册与清理
 * 3. 响应式状态的封装
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 组件挂载时添加事件监听
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  // 组件卸载时移除事件监听（防止内存泄漏）
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
