/**
 * Pinia 状态管理 - 计数器 Store
 * 
 * Pinia 是 Vue 3 官方推荐的状态管理库，替代 Vuex
 * 核心概念：
 * - State: 状态（数据）
 * - Getters: 计算属性（基于 state 的派生值）
 * - Actions: 方法（修改 state，支持同步和异步）
 * 
 * 相比 Vuex 的优势：
 * 1. 完整的 TypeScript 支持
 * 2. 不需要 mutations，actions 可直接修改 state
 * 3. 更轻量，API 更简洁
 * 4. 支持多个 store，模块化更自然
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * 使用 Setup 语法定义 Store（推荐，与组合式 API 风格一致）
 * 
 * ref() 对应 state
 * computed() 对应 getters
 * function() 对应 actions
 */
export const useCounterStore = defineStore('counter', () => {
  // ========== State（状态）==========
  const count = ref(0)
  const history = ref([]) // 记录变更历史

  // ========== Getters（计算属性）==========
  // 双倍值
  const doubleCount = computed(() => count.value * 2)
  
  // 是否为偶数
  const isEven = computed(() => count.value % 2 === 0)
  
  // 历史记录总数
  const historyCount = computed(() => history.value.length)

  // ========== Actions（方法）==========
  // 增加
  function increment() {
    count.value++
    addHistory('increment', 1)
  }

  // 减少
  function decrement() {
    count.value--
    addHistory('decrement', -1)
  }

  // 增加指定数量
  function incrementBy(amount) {
    count.value += amount
    addHistory('incrementBy', amount)
  }

  // 重置
  function reset() {
    count.value = 0
    history.value = []
  }

  // 异步操作示例：模拟异步增加
  async function incrementAsync(amount = 1, delay = 1000) {
    await new Promise(resolve => setTimeout(resolve, delay))
    count.value += amount
    addHistory('incrementAsync', amount)
  }

  // 内部方法（不会暴露给外部，除非 return）
  function addHistory(type, amount) {
    history.value.unshift({
      type,
      amount,
      newValue: count.value,
      time: new Date().toLocaleTimeString()
    })
    // 只保留最近 10 条
    if (history.value.length > 10) {
      history.value.pop()
    }
  }

  // 必须 return 才能在组件中使用
  return {
    count,
    history,
    doubleCount,
    isEven,
    historyCount,
    increment,
    decrement,
    incrementBy,
    reset,
    incrementAsync
  }
})

/**
 * 也可以使用 Options 语法定义（类似 Vuex）
 * 
 * export const useCounterStore = defineStore('counter', {
 *   state: () => ({
 *     count: 0
 *   }),
 *   getters: {
 *     doubleCount: (state) => state.count * 2
 *   },
 *   actions: {
 *     increment() {
 *       this.count++
 *     }
 *   }
 * })
 */
