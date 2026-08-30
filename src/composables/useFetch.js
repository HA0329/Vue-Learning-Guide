/**
 * 组合式函数 - 数据请求
 * 
 * 演示：
 * 1. 异步操作封装
 * 2. loading / error / data 三态管理
 * 3. 支持立即执行和手动执行
 */

import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url, options = {}) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function fetchData() {
    // 重置状态
    error.value = null
    loading.value = true
    data.value = null

    // 同步读取 url，便于 watchEffect 追踪 url 变化（url 为 ref 时）
    const currentUrl = unref(url)

    try {
      // 模拟 API 请求（实际项目中使用 fetch 或 axios）
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // 模拟返回数据
      if (options.mockData) {
        data.value = options.mockData
      } else {
        // 真实请求示例：
        // const response = await fetch(currentUrl)
        // data.value = await response.json()
        data.value = { message: '这是模拟数据', url: currentUrl, time: new Date().toLocaleString() }
      }
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  // 如果 url 是 ref，url 变化时自动重新请求
  if (isRef(url)) {
    watchEffect(fetchData)
  } else if (options.immediate !== false) {
    // 默认立即执行
    fetchData()
  }

  return {
    data,
    error,
    loading,
    refetch: fetchData
  }
}
