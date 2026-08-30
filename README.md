# Vue.js 3 详尽学习指南

一个交互式的 Vue 3 学习项目，通过可运行的示例代码和详细注释，从零开始掌握 Vue.js 的核心概念和最佳实践。

## 目录

- [项目简介](#项目简介)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [学习路径](#学习路径)
- [核心知识详解](#核心知识详解)
  - [1. 响应式系统](#1-响应式系统)
  - [2. 模板语法](#2-模板语法)
  - [3. 计算属性与侦听器](#3-计算属性与侦听器)
  - [4. 组件化开发](#4-组件化开发)
  - [5. 组合式 API](#5-组合式-api)
  - [6. 路由管理](#6-路由管理)
  - [7. 状态管理](#7-状态管理)
  - [8. 进阶特性](#8-进阶特性)
- [常见问题](#常见问题)
- [学习资源推荐](#学习资源推荐)

---

## 项目简介

本项目基于 **Vue 3 + Vite + Vue Router + Pinia** 构建，包含 6 大学习模块，每个模块都有可交互的在线示例和详尽的代码注释。

### 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.4+ | 渐进式 JavaScript 框架 |
| Vite | 5.0+ | 下一代前端构建工具 |
| Vue Router | 4.2+ | 官方路由管理器 |
| Pinia | 2.1+ | 官方状态管理库 |

### 项目特点

- 交互式示例：每个概念都有可操作的 Demo
- 详尽注释：关键代码都有中文注释说明
- 对比总结：选项式 vs 组合式、Pinia vs Vuex 等对比
- 最佳实践：包含性能优化、代码组织等建议
- 可直接运行：`npm install && npm run dev` 即可启动

---

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0（或 pnpm / yarn）

### 安装与运行

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（默认 http://localhost:3000）
npm run dev

# 3. 构建生产版本
npm run build

# 4. 预览生产构建
npm run preview
```

### 推荐开发工具

- **VS Code** + **Volar** 扩展（Vue 3 官方推荐，替代 Vetur）
- **Vue DevTools** 浏览器扩展（调试组件、状态、路由）
- 开启 ESLint + Prettier 保持代码规范

---

## 项目结构

```
vue-learning-guide/
├── index.html                  # HTML 入口
├── package.json                # 项目依赖和脚本
├── vite.config.js              # Vite 配置
├── README.md                   # 本文档
└── src/
    ├── main.js                 # 应用入口（创建 app、安装插件）
    ├── App.vue                 # 根组件（导航栏 + 路由出口）
    ├── assets/
    │   └── main.css            # 全局样式
    ├── router/
    │   └── index.js            # 路由配置（含导航守卫）
    ├── stores/
    │   ├── counter.js          # 计数器 Store（Pinia）
    │   └── user.js             # 用户 Store（异步、多 Store 协作）
    ├── composables/            # 组合式函数（逻辑复用）
    │   ├── useCounter.js       # 计数器逻辑
    │   ├── useMouse.js         # 鼠标位置追踪
    │   └── useFetch.js         # 数据请求封装
    ├── components/             # 可复用组件
    │   ├── PropsDemo.vue       # Props 演示
    │   ├── EmitDemo.vue        # Emit 事件演示
    │   ├── SlotDemo.vue        # 插槽演示
    │   ├── LifecycleDemo.vue   # 生命周期演示
    │   ├── VModelDemo.vue      # 自定义 v-model 演示
    │   └── InjectChild.vue     # Provide/Inject 后代组件
    └── views/                  # 页面视图
        ├── HomeView.vue        # 首页
        ├── BasicsView.vue      # 基础概念
        ├── ComponentsView.vue  # 组件化
        ├── CompositionView.vue # 组合式 API
        ├── RouterView.vue      # 路由详解
        ├── RouterDetailView.vue# 路由详情（嵌套路由）
        ├── PiniaView.vue       # 状态管理
        ├── AdvancedView.vue    # 进阶特性
        └── NotFoundView.vue    # 404 页面
```

---

## 学习路径

建议按照以下顺序学习，循序渐进：

### 第一阶段：基础（1-2 天）
1. **首页** - 了解 Vue 是什么，能做什么
2. **基础概念** - 响应式、模板语法、计算属性、侦听器、条件/列表渲染、事件处理

### 第二阶段：组件化（2-3 天）
3. **组件化** - Props、Emit、插槽、生命周期、v-model、Provide/Inject
4. **组合式 API** - setup、ref/reactive、组合式函数、与选项式对比

### 第三阶段：工程化（2-3 天）
5. **路由管理** - Vue Router 基础、动态路由、嵌套路由、导航守卫
6. **状态管理** - Pinia 核心概念、多 Store 协作、持久化

### 第四阶段：进阶（按需学习）
7. **进阶特性** - 自定义指令、Teleport、动态组件、keep-alive、过渡动画、Suspense

---

## 核心知识详解

### 1. 响应式系统

Vue 3 的响应式系统基于 **ES6 Proxy** 实现，替代了 Vue 2 的 `Object.defineProperty`。

#### ref vs reactive

| 特性 | ref | reactive |
|------|-----|----------|
| 适用类型 | 基本类型 + 对象 | 对象/数组 |
| JS 中访问 | 需要 `.value` | 直接访问属性 |
| 模板中访问 | 自动解包 | 直接访问 |
| 重新赋值 | 可以（保持响应式） | 不能直接替换整个对象 |
| 解构 | 会丢失响应式 | 会丢失响应式（用 toRefs） |

```javascript
import { ref, reactive, toRefs } from 'vue'

// ref - 基本类型
const count = ref(0)
count.value++  // JS 中用 .value
// 模板中直接用 {{ count }}

// reactive - 对象
const state = reactive({ name: '张三', age: 25 })
state.age++  // 直接修改属性

// 解构 reactive 需要 toRefs
const { name, age } = toRefs(state)
```

#### 响应式原理简述

1. 组件渲染时，读取响应式数据 → 触发 **get 拦截** → 收集依赖（当前组件的渲染函数）
2. 数据修改时 → 触发 **set 拦截** → 通知所有依赖的组件重新渲染
3. Vue 内部使用 **Scheduler** 调度更新，同一事件循环内的多次修改会被合并（异步更新队列）

---

### 2. 模板语法

Vue 使用基于 HTML 的模板语法，允许声明式地将 DOM 绑定到组件实例的数据。

#### 插值

```html
<!-- 文本插值 -->
<p>{{ message }}</p>

<!-- JavaScript 表达式 -->
<p>{{ message.toUpperCase() }}</p>
<p>{{ isLogin ? '欢迎' : '请登录' }}</p>

<!-- 原始 HTML（注意 XSS 风险） -->
<p v-html="rawHtml"></p>

<!-- 单次插值，后续不更新 -->
<p v-once>{{ message }}</p>
```

#### 常用指令

| 指令 | 简写 | 作用 |
|------|------|------|
| `v-bind:href` | `:href` | 动态绑定属性 |
| `v-on:click` | `@click` | 监听事件 |
| `v-model` | - | 双向绑定（表单元素） |
| `v-if` / `v-else` | - | 条件渲染（销毁/重建） |
| `v-show` | - | 条件显示（切换 display） |
| `v-for` | - | 列表渲染 |
| `v-html` | - | 渲染原始 HTML |
| `v-once` | - | 单次渲染 |
| `v-pre` | - | 跳过编译，显示原始模板 |
| `v-memo` | - | 记忆化子树（性能优化） |

#### v-model 语法糖

```html
<input v-model="text">
<!-- 等价于 -->
<input :value="text" @input="text = $event.target.value">
```

---

### 3. 计算属性与侦听器

#### computed（计算属性）

- 基于响应式依赖**缓存**，依赖不变时多次访问只计算一次
- 必须是**纯函数**，不能有副作用
- 适合复杂的派生状态

```javascript
const firstName = ref('张')
const lastName = ref('三')

const fullName = computed(() => firstName.value + lastName.value)
```

**computed vs methods：**
- computed：有缓存，适合计算开销大的场景
- methods：每次渲染都执行，适合不需要缓存的操作

#### watch（侦听器）

- 在数据变化时执行**副作用**（异步请求、DOM 操作、日志等）
- 可以获取新旧值
- 默认惰性（初始化不执行）

```javascript
// 监听单个 ref
watch(count, (newVal, oldVal) => {
  console.log(`count: ${oldVal} -> ${newVal}`)
})

// 监听多个源
watch([a, b], ([newA, newB], [oldA, oldB]) => {})

// 监听对象属性（用 getter 函数）
watch(() => state.name, (newVal) => {})

// 深度监听 + 立即执行
watch(state, (newVal) => {}, { deep: true, immediate: true })
```

#### watchEffect

- 自动收集依赖，不需要指定监听源
- 立即执行一次
- 不能获取旧值

```javascript
watchEffect(() => {
  console.log(`count is: ${count.value}`)
  // count 变化时自动重新执行
})
```

**watch vs watchEffect 选择：**
- 需要明确知道哪个数据变化、需要旧值 → 用 `watch`
- 依赖多个数据、逻辑简单 → 用 `watchEffect`

---

### 4. 组件化开发

组件是 Vue 最强大的功能之一，允许将 UI 拆分为独立、可复用的小块。

#### 组件通信方式总结

| 场景 | 方式 | 说明 |
|------|------|------|
| 父 → 子 | Props | 单向数据流，子组件不能直接修改 |
| 子 → 父 | Emit 事件 | 子组件触发事件，父组件监听处理 |
| 父子双向 | v-model | 语法糖，本质是 props + emit |
| 祖先 → 后代 | Provide / Inject | 跨层级传递，不需要中间层转发 |
| 兄弟组件 | 共同父组件 / 状态管理 | 通过父组件中转，或用 Pinia |
| 任意组件 | Pinia / 事件总线 | 全局状态管理 |

#### Props 定义

```javascript
// 数组语法（简单）
defineProps(['title', 'count'])

// 对象语法（推荐，带类型校验）
defineProps({
  title: String,
  count: {
    type: Number,
    required: true,
    default: 0,
    validator: (val) => val >= 0
  },
  list: {
    type: Array,
    default: () => []  // 对象/数组默认值必须用函数
  }
})
```

#### Emit 事件

```javascript
const emit = defineEmits(['update', 'delete'])

// 触发事件，可传递多个参数
emit('update', newValue)
emit('delete', id, '额外参数')
```

#### 插槽

```html
<!-- 默认插槽 -->
<slot>默认内容</slot>

<!-- 具名插槽 -->
<slot name="header"></slot>

<!-- 作用域插槽（子传数据给父） -->
<slot name="item" :item="item" :index="index"></slot>
```

父组件使用：
```html
<MyComponent>
  <template #header>头部内容</template>
  <template #item="{ item, index }">
    {{ index }}: {{ item.name }}
  </template>
  默认内容
</MyComponent>
```

#### 生命周期

| 选项式 API | 组合式 API | 调用时机 |
|-----------|-----------|---------|
| beforeCreate | -（setup 替代） | 实例创建前 |
| created | -（setup 替代） | 实例创建后 |
| beforeMount | onBeforeMount | DOM 挂载前 |
| mounted | onMounted | DOM 挂载后（可访问 DOM） |
| beforeUpdate | onBeforeUpdate | 数据变化，DOM 更新前 |
| updated | onUpdated | DOM 更新后 |
| beforeUnmount | onBeforeUnmount | 组件销毁前（清理工作） |
| unmounted | onUnmounted | 组件销毁后 |

```javascript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)  // 必须清理！
})
```

---

### 5. 组合式 API

组合式 API 是 Vue 3 的核心特性，允许按**逻辑功能**组织代码，而不是按选项类型。

#### <script setup> 语法糖

推荐使用 `<script setup>`，代码更简洁：

```vue
<script setup>
import { ref, computed } from 'vue'

// 定义的变量和函数直接在模板中可用，不需要 return
const count = ref(0)
const double = computed(() => count.value * 2)
function inc() { count.value++ }
</script>

<template>
  <button @click="inc">{{ count }} ({{ double }})</button>
</template>
```

#### 组合式函数 (Composables)

组合式函数是复用逻辑的标准方式，命名以 `use` 开头：

```javascript
// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

使用：
```javascript
const { x, y } = useMouse()
```

**组合式函数 vs Mixins：**
- 数据来源清晰（显式导入，不是隐式合并）
- 没有命名冲突
- 可以传递参数，更灵活
- TypeScript 支持更好

---

### 6. 路由管理

Vue Router 是 Vue 官方的路由管理器，用于构建单页应用 (SPA)。

#### 基础配置

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user/:id', component: User },  // 动态路由
]

const router = createRouter({
  history: createWebHistory(),  // HTML5 History 模式
  routes
})
```

#### 路由跳转

```html
<!-- 声明式 -->
<router-link to="/about">关于</router-link>
<router-link :to="{ path: '/user', query: { id: 1 } }">用户</router-link>
```

```javascript
// 编程式
const router = useRouter()

router.push('/about')
router.push({ name: 'User', params: { id: 1 } })
router.replace('/home')  // 不留下历史记录
router.back()
router.go(-1)
```

#### 路由参数获取

```javascript
const route = useRoute()

route.params.id    // 动态参数 /user/:id
route.query.page   // 查询参数 ?page=1
route.meta.title   // 路由元信息
```

#### 导航守卫

```javascript
// 全局前置守卫（权限校验）
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})

// 全局后置钩子（页面标题、分析统计）
router.afterEach((to) => {
  document.title = to.meta.title
})
```

#### History 模式 vs Hash 模式

| 模式 | URL 形式 | 优点 | 缺点 |
|------|---------|------|------|
| createWebHistory | `/user/1` | URL 美观，符合规范 | 需要服务器配置回退 |
| createWebHashHistory | `/#/user/1` | 无需服务器配置 | URL 带 #，不美观 |

---

### 7. 状态管理

Pinia 是 Vue 3 官方推荐的状态管理库，替代 Vuex。

#### 核心概念

- **State**：存储状态数据
- **Getters**：基于 state 的计算属性（有缓存）
- **Actions**：修改 state 的方法（支持同步/异步）

#### 定义 Store

```javascript
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  
  // Getters
  const double = computed(() => count.value * 2)
  
  // Actions
  function increment() {
    count.value++
  }
  
  async function incrementAsync() {
    await new Promise(r => setTimeout(r, 1000))
    count.value++
  }

  return { count, double, increment, incrementAsync }
})
```

#### 在组件中使用

```javascript
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()

// 方式一：直接使用
store.count
store.increment()

// 方式二：解构（state 需要 storeToRefs）
const { count, double } = storeToRefs(store)
const { increment } = store
```

#### 批量修改

```javascript
// 对象形式
store.$patch({ count: 100 })

// 函数形式（适合修改数组）
store.$patch(state => {
  state.items.push({ id: 1 })
})
```

#### 状态持久化

使用 `pinia-plugin-persistedstate` 插件：

```bash
npm install pinia-plugin-persistedstate
```

```javascript
// main.js
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

// store 定义时启用
export const useUserStore = defineStore('user', () => {...}, {
  persist: true  // 自动保存到 localStorage
})
```

---

### 8. 进阶特性

#### 自定义指令

用于对 DOM 元素进行底层操作：

```javascript
const vFocus = {
  mounted(el) {
    el.focus()
  }
}
```

常用自定义指令：`v-focus`、`v-lazy`（图片懒加载）、`v-permission`（权限控制）、`v-click-outside`（点击外部）

#### Teleport

将组件渲染到 DOM 树的其他位置，适合模态框、通知、提示等：

```html
<Teleport to="body">
  <div class="modal">...</div>
</Teleport>
```

#### KeepAlive

缓存组件实例，避免重复渲染，保留组件状态：

```html
<KeepAlive>
  <component :is="currentComponent" />
</KeepAlive>
```

配合 `onActivated` / `onDeactivated` 生命周期钩子处理缓存组件的激活/停用。

#### 过渡动画

```html
<transition name="fade">
  <div v-if="show">内容</div>
</transition>
```

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
```

列表过渡用 `<transition-group>`。

#### 异步组件 + Suspense

```javascript
const AsyncComp = defineAsyncComponent(() => import('./AsyncComp.vue'))
```

```html
<Suspense>
  <template #default>
    <AsyncComp />
  </template>
  <template #fallback>
    加载中...
  </template>
</Suspense>
```

---

## 常见问题

### Q1: Vue 2 和 Vue 3 有什么区别？我应该学哪个？

**A:** 新项目直接学 Vue 3。主要区别：
- Vue 3 使用 Proxy 响应式，性能更好，支持数组/对象的完整拦截
- Vue 3 引入组合式 API，逻辑复用更灵活
- Vue 3 有更好的 TypeScript 支持
- Vue 3 支持 Teleport、Fragments、Suspense 等新特性
- Vue 2 已于 2023 年底停止维护

### Q2: 选项式 API 还是组合式 API？

**A:** 推荐组合式 API + `<script setup>`。
- 小型项目、简单组件：选项式也可以
- 中大型项目、需要逻辑复用：组合式 API
- 两者可以混用，但同一个组件内不建议混用

### Q3: Pinia 还需要学 Vuex 吗？

**A:** 不需要。Pinia 是 Vuex 的官方继任者，Vuex 4 仅为兼容 Vue 3 而存在，不再有新功能。新项目直接用 Pinia。

### Q4: ref 和 reactive 怎么选？

**A:** 推荐统一用 `ref`：
- 基本类型必须用 ref
- 对象也可以用 ref 包裹（`ref({...})`），替换整个对象更方便
- reactive 适合明确不需要替换的复杂对象
- 团队约定统一风格更重要

### Q5: 为什么修改 props 会报警告？

**A:** Vue 是单向数据流，子组件不能直接修改 props。需要修改时：
1. 用 `emit` 通知父组件修改
2. 或者用 `computed` 包装 props 做派生
3. 或者用 `v-model` 实现双向绑定

### Q6: v-for 为什么必须加 key？

**A:** key 帮助 Vue 识别每个节点的身份，在列表更新时高效地复用和移动 DOM 元素。
- 不要用 `index` 作为 key（列表排序、增删时会出问题）
- 用数据的唯一 ID 作为 key

### Q7: 组件卸载时需要清理什么？

**A:** 在 `onBeforeUnmount` / `onUnmounted` 中清理：
- 定时器 `clearInterval` / `clearTimeout`
- 事件监听 `removeEventListener`
- 订阅（WebSocket、EventSource 等）
- 取消未完成的请求（AbortController）

---

## 学习资源推荐

### 官方资源
- [Vue 3 官方文档](https://cn.vuejs.org/) - 最权威的学习资料
- [Vue 3 官方教程](https://cn.vuejs.org/tutorial/) - 交互式教程
- [Vue Router 文档](https://router.vuejs.org/zh/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [Vite 文档](https://cn.vitejs.dev/)

### 推荐书籍
- 《Vue.js 设计与实现》- 霍春阳（深入原理）
- 《深入浅出 Vue.js》- 刘博文（Vue 2 原理，基础概念通用）

### 视频课程
- Vue 官方免费教程
- B站搜索 "Vue 3 实战"

### 实战项目
- Vue 官方示例
- GitHub 上的 Vue 3 开源项目
- 自己动手做一个 TodoList、博客、管理后台

### 开发工具
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - VS Code Vue 3 扩展
- [Vue DevTools](https://devtools.vuejs.org/) - 浏览器调试工具
- [create-vue](https://github.com/vuejs/create-vue) - 官方项目脚手架

---

## 写在最后

学习 Vue 最好的方式是**动手实践**。本项目的每个示例都可以直接在浏览器中操作，建议：

1. 先运行项目，逐个点击导航栏的模块，体验每个示例
2. 阅读对应的源代码，理解注释说明
3. 尝试修改代码，观察变化（热更新会立即生效）
4. 自己动手实现一个小功能（如 TodoList、计数器、表单）

遇到问题时，优先查阅官方文档，其次是搜索引擎和社区。保持耐心，循序渐进，你一定能掌握 Vue.js！

---

**License:** MIT  
**最后更新:** 2026-08
