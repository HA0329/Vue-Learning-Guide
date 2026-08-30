<!--
  Pinia 状态管理视图
  展示 Pinia 的核心概念：
  1. State - 状态
  2. Getters - 计算属性
  3. Actions - 方法（同步/异步）
  4. 多 Store 协作
  5. 状态重置与订阅
-->
<template>
  <div>
    <h1 style="margin-bottom: 24px; color: #35495e;">Pinia 状态管理</h1>

    <!-- Pinia 介绍 -->
    <div class="card">
      <h2 class="card-title">什么是 Pinia？</h2>
      <p style="margin-bottom: 12px;">
        Pinia 是 Vue 3 官方推荐的状态管理库，是 Vuex 的继任者。
        它提供了一种集中式存储管理应用所有组件状态的方式。
      </p>
      <div class="grid-3">
        <div class="demo-area" style="text-align: center;">
          <div style="font-size: 32px; margin-bottom: 8px;">📦</div>
          <strong>State</strong>
          <p style="font-size: 13px; color: #666; margin-top: 4px;">存储应用状态数据</p>
        </div>
        <div class="demo-area" style="text-align: center;">
          <div style="font-size: 32px; margin-bottom: 8px;">⚡</div>
          <strong>Getters</strong>
          <p style="font-size: 13px; color: #666; margin-top: 4px;">基于 state 的派生值，有缓存</p>
        </div>
        <div class="demo-area" style="text-align: center;">
          <div style="font-size: 32px; margin-bottom: 8px;">🔧</div>
          <strong>Actions</strong>
          <p style="font-size: 13px; color: #666; margin-top: 4px;">修改 state，支持同步和异步</p>
        </div>
      </div>
    </div>

    <!-- 计数器 Store 演示 -->
    <div class="card">
      <h2 class="card-title">1. 计数器 Store 演示</h2>
      
      <div class="grid-2">
        <div class="demo-area">
          <div class="demo-label">State & Getters</div>
          <div class="counter-display">{{ counterStore.count }}</div>
          <table class="demo-table">
            <tr><td>双倍值 (getter)</td><td><strong>{{ counterStore.doubleCount }}</strong></td></tr>
            <tr><td>是否偶数 (getter)</td><td>
              <span class="tag" :class="counterStore.isEven ? 'tag-green' : 'tag-orange'">
                {{ counterStore.isEven ? '偶数' : '奇数' }}
              </span>
            </td></tr>
            <tr><td>历史记录数 (getter)</td><td>{{ counterStore.historyCount }}</td></tr>
          </table>
        </div>

        <div class="demo-area">
          <div class="demo-label">Actions</div>
          <button class="btn btn-primary" @click="counterStore.increment()">increment()</button>
          <button class="btn btn-secondary" @click="counterStore.decrement()">decrement()</button>
          <button class="btn btn-secondary" @click="counterStore.incrementBy(5)">+5</button>
          <button class="btn btn-danger" @click="counterStore.reset()">reset()</button>
          
          <div style="margin-top: 16px;">
            <button 
              class="btn btn-primary" 
              @click="handleAsyncIncrement"
              :disabled="asyncInProgress"
            >
              异步 +3（1秒后执行）
            </button>
            <span v-if="asyncInProgress" style="margin-left: 8px; color: #42b883;">
              异步执行中...
            </span>
          </div>
        </div>
      </div>

      <!-- 变更历史 -->
      <div class="demo-area" style="margin-top: 16px;">
        <div class="demo-label">变更历史（最近 10 条）</div>
        <ul class="demo-list" style="background: white; border-radius: 6px; max-height: 200px; overflow-y: auto;">
          <li v-for="(record, index) in counterStore.history" :key="index">
            <span class="tag" :class="record.amount > 0 ? 'tag-green' : 'tag-red'">
              {{ record.type }}: {{ record.amount > 0 ? '+' : '' }}{{ record.amount }}
            </span>
            <span>结果：{{ record.newValue }}</span>
            <span style="color: #999; font-size: 12px;">{{ record.time }}</span>
          </li>
          <li v-if="counterStore.history.length === 0" style="text-align: center; color: #999;">
            暂无历史记录
          </li>
        </ul>
      </div>
    </div>

    <!-- Store 使用方式 -->
    <div class="card">
      <h2 class="card-title">2. Store 的三种使用方式</h2>
      
      <div class="demo-area">
        <h3 class="card-subtitle">方式一：直接使用 store 实例（推荐）</h3>
        <div class="code-block">
          <span class="keyword">const</span> counterStore = <span class="function">useCounterStore</span>()<br>
          <span class="comment">// 直接访问和修改</span><br>
          counterStore.count<br>
          counterStore.<span class="function">increment</span>()
        </div>

        <h3 class="card-subtitle">方式二：解构（需要 storeToRefs 保持响应式）</h3>
        <div class="code-block">
          <span class="keyword">import</span> { storeToRefs } <span class="keyword">from</span> <span class="string">'pinia'</span><br>
          <span class="keyword">const</span> { count, doubleCount } = <span class="function">storeToRefs</span>(counterStore)<br>
          <span class="keyword">const</span> { increment, reset } = counterStore  <span class="comment">// 方法直接解构</span>
        </div>
        <div class="warning-box">
          直接解构 state 会丢失响应式！必须用 storeToRefs 包裹。方法可以直接解构。
        </div>

        <h3 class="card-subtitle">方式三：$patch 批量修改</h3>
        <div class="code-block">
          <span class="comment">// 传入对象</span><br>
          counterStore.$patch({ count: <span class="string">100</span> })<br><br>
          <span class="comment">// 传入函数（适合修改数组）</span><br>
          counterStore.$patch(state => {<br>
          &nbsp;&nbsp;state.count += <span class="string">10</span><br>
          &nbsp;&nbsp;state.history.<span class="function">push</span>({...})<br>
          })
        </div>
      </div>
    </div>

    <!-- 用户 Store 演示 -->
    <div class="card">
      <h2 class="card-title">3. 用户 Store（异步 Action 与多 Store 协作）</h2>
      <p>演示更复杂的 store：模拟登录、异步 action、调用其他 store。</p>
      
      <div class="demo-area">
        <div v-if="!userStore.isLoggedIn">
          <div class="demo-label">登录表单（模拟，输入任意用户名密码）</div>
          <input 
            type="text" 
            class="input" 
            v-model="loginForm.username" 
            placeholder="用户名"
            style="margin-right: 8px;"
          >
          <input 
            type="password" 
            class="input" 
            v-model="loginForm.password" 
            placeholder="密码"
            style="margin-right: 8px;"
          >
          <button 
            class="btn btn-primary" 
            @click="handleLogin"
            :disabled="userStore.loading"
          >
            {{ userStore.loading ? '登录中...' : '登录' }}
          </button>
          <p v-if="userStore.error" style="color: #e74c3c; margin-top: 8px;">{{ userStore.error }}</p>
        </div>
        
        <div v-else style="padding: 16px; background: white; border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <img :src="userStore.userInfo.avatar" alt="avatar" style="width: 48px; height: 48px; border-radius: 50%; background: #f0f0f0;">
            <div>
              <p><strong>{{ userStore.userInfo.name }}</strong></p>
              <p style="font-size: 13px; color: #666;">{{ userStore.userInfo.email }} · {{ userStore.userInfo.role }}</p>
            </div>
            <button class="btn btn-danger" style="margin-left: auto;" @click="userStore.logout()">退出登录</button>
          </div>
          <div class="tip-box" style="margin-top: 12px;">
            登录成功后，计数器 Store 的 count 会 +1（用户 Store 调用了计数器 Store 的 action，演示多 Store 协作）。
            当前计数器值：<strong>{{ counterStore.count }}</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- 状态持久化 -->
    <div class="card">
      <h2 class="card-title">4. 状态持久化（插件扩展）</h2>
      <p>Pinia 可以通过插件扩展功能，最常用的是状态持久化插件（pinia-plugin-persistedstate）。</p>
      <div class="demo-area">
        <div class="code-block">
          <span class="comment">// 安装插件</span><br>
          <span class="keyword">import</span> piniaPluginPersistedstate <span class="keyword">from</span> <span class="string">'pinia-plugin-persistedstate'</span><br>
          pinia.<span class="function">use</span>(piniaPluginPersistedstate)<br><br>
          <span class="comment">// 在 store 中启用持久化</span><br>
          <span class="function">defineStore</span>(<span class="string">'user'</span>, () => {...}, {<br>
          &nbsp;&nbsp;<span class="attr">persist</span>: <span class="keyword">true</span>  <span class="comment">// 自动保存到 localStorage</span><br>
          })
        </div>
        <p style="margin-top: 12px; font-size: 13px; color: #666;">
          本项目的 user store 已手动实现 token 持久化（保存在 localStorage），刷新页面后登录状态保留。
        </p>
      </div>
    </div>

    <!-- Pinia vs Vuex -->
    <div class="card">
      <h2 class="card-title">5. Pinia vs Vuex</h2>
      <table class="demo-table">
        <thead>
          <tr><th>对比项</th><th>Vuex 4</th><th>Pinia</th></tr>
        </thead>
        <tbody>
          <tr><td>Vue 3 支持</td><td>支持</td><td>原生支持，官方推荐</td></tr>
          <tr><td>TypeScript</td><td>支持较弱</td><td>完整支持，类型推断优秀</td></tr>
          <tr><td>Mutations</td><td>必须（同步修改）</td><td>不需要，actions 直接修改</td></tr>
          <tr><td>模块化</td><td>嵌套模块，命名空间</td><td>多 store 平级，更灵活</td></tr>
          <tr><td>打包体积</td><td>较大</td><td>更小（~1KB）</td></tr>
          <tr><td>DevTools</td><td>支持</td><td>支持，时间旅行调试</td></tr>
          <tr><td>学习曲线</td><td>概念多（mutation/action/module）</td><td>简单（state/getter/action）</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useUserStore } from '@/stores/user'

// 使用计数器 store
const counterStore = useCounterStore()

// 使用用户 store
const userStore = useUserStore()

// 登录表单
const loginForm = ref({
  username: '',
  password: ''
})

// 记录异步操作是否进行中（用于禁用按钮和显示“异步执行中”提示）
const asyncInProgress = ref(false)

// 异步 +3（1 秒后执行）：执行期间禁用按钮并显示提示
async function handleAsyncIncrement() {
  if (asyncInProgress.value) return
  asyncInProgress.value = true
  try {
    await counterStore.incrementAsync(3, 1000)
  } finally {
    asyncInProgress.value = false
  }
}

async function handleLogin() {
  await userStore.login(loginForm.value.username, loginForm.value.password)
  if (userStore.isLoggedIn) {
    loginForm.value = { username: '', password: '' }
  }
}
</script>
