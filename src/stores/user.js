/**
 * Pinia 状态管理 - 用户 Store
 * 
 * 演示更复杂的 store 用法：
 * - 多个 store 之间的相互调用
 * - 异步 action（模拟 API 请求）
 * - $patch 批量修改 state
 * - $subscribe 订阅 state 变化
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCounterStore } from './counter'

export const useUserStore = defineStore('user', () => {
  // ========== State ==========
  const userInfo = ref(null)
  const token = ref(localStorage.getItem('token') || '')
  const loading = ref(false)
  const error = ref(null)

  // ========== Getters ==========
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => userInfo.value?.name || '未登录')

  // ========== Actions ==========
  // 模拟登录
  async function login(username, password) {
    loading.value = true
    error.value = null
    
    try {
      // 模拟 API 请求延迟
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username && password) {
            resolve()
          } else {
            reject(new Error('用户名和密码不能为空'))
          }
        }, 800)
      })

      // 模拟登录成功
      const mockToken = 'mock_token_' + Date.now()
      token.value = mockToken
      userInfo.value = {
        id: 1,
        name: username,
        email: `${username}@example.com`,
        role: 'admin',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
      }
      
      localStorage.setItem('token', mockToken)
      
      // 调用其他 store 的 action
      const counterStore = useCounterStore()
      counterStore.increment()
      
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      loading.value = false
    }
  }

  // 登出
  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  // 使用 $patch 批量修改
  function updateUserInfo(partial) {
    // 方式1：传入对象
    // userInfo.value = { ...userInfo.value, ...partial }
    
    // 方式2：使用 $patch（Pinia 内置，会合并到 state）
    // this.$patch({ userInfo: { ...userInfo.value, ...partial } })
    
    if (userInfo.value) {
      Object.assign(userInfo.value, partial)
    }
  }

  return {
    userInfo,
    token,
    loading,
    error,
    isLoggedIn,
    userName,
    login,
    logout,
    updateUserInfo
  }
})
