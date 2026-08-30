/**
 * 组合式函数 (Composables) - 计数器逻辑复用
 * 
 * 组合式函数是 Vue 3 中复用状态逻辑的标准方式
 * 命名约定：以 use 开头，如 useCounter、useMouse、useFetch
 * 
 * 与 mixins 的区别：
 * 1. 数据来源清晰（不会像 mixins 那样隐式合并）
 * 2. 不会有命名冲突
 * 3. 可以传递参数，更灵活
 * 4. TypeScript 支持更好
 */

import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  // 状态
  const count = ref(initialValue)
  
  // 计算属性
  const double = computed(() => count.value * 2)
  const isZero = computed(() => count.value === 0)
  
  // 方法
  function inc() {
    count.value++
  }
  
  function dec() {
    count.value--
  }
  
  function reset() {
    count.value = initialValue
  }
  
  function set(value) {
    count.value = value
  }

  // 返回响应式状态和方法
  return {
    count,
    double,
    isZero,
    inc,
    dec,
    reset,
    set
  }
}
