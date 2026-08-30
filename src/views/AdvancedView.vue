<!--
  进阶特性视图
  展示 Vue 3 的进阶特性：
  1. 自定义指令
  2. Teleport（传送门）
  3. 动态组件
  4. keep-alive（缓存组件）
  5. 过渡动画
  6. 自定义 v-model
-->
<template>
  <div>
    <h1 style="margin-bottom: 24px; color: #35495e;">进阶特性</h1>

    <!-- ========== 1. 自定义指令 ========== -->
    <div class="card">
      <h2 class="card-title">1. 自定义指令</h2>
      <p>除了 Vue 内置的指令（v-model、v-if 等），还可以注册自定义指令，用于对普通 DOM 元素进行底层操作。</p>
      
      <div class="demo-area">
        <div class="demo-label">v-focus - 自动聚焦</div>
        <input type="text" class="input" v-focus placeholder="页面加载后自动聚焦">
        
        <div class="demo-label" style="margin-top: 16px;">v-highlight - 关键词高亮</div>
        <p v-highlight:yellow="'Vue'">学习 Vue 3 的自定义指令，Vue 让 DOM 操作更简单。Vue 真好用！</p>
        
        <div class="demo-label" style="margin-top: 16px;">v-click-outside - 点击外部关闭</div>
        <div v-click-outside="closeDropdown" style="position: relative; display: inline-block;">
          <button class="btn btn-primary" @click="dropdownOpen = !dropdownOpen">
            {{ dropdownOpen ? '关闭' : '打开' }}下拉菜单
          </button>
          <div v-if="dropdownOpen" style="position: absolute; top: 100%; left: 0; margin-top: 8px; background: white; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); padding: 8px 0; min-width: 150px; z-index: 10;">
            <div style="padding: 8px 16px; cursor: pointer;" @click="dropdownOpen = false">选项一</div>
            <div style="padding: 8px 16px; cursor: pointer;" @click="dropdownOpen = false">选项二</div>
            <div style="padding: 8px 16px; cursor: pointer;" @click="dropdownOpen = false">选项三</div>
          </div>
        </div>
        <p style="margin-top: 60px; font-size: 13px; color: #666;">点击菜单外部区域可关闭下拉框</p>
      </div>

      <div class="code-block">
        <span class="comment">// 自定义指令的生命周期钩子</span><br>
        <span class="keyword">const</span> myDirective = {<br>
        &nbsp;&nbsp;<span class="function">mounted</span>(el, binding) {},  <span class="comment">// 元素挂载后</span><br>
        &nbsp;&nbsp;<span class="function">updated</span>(el, binding) {},  <span class="comment">// 组件更新后</span><br>
        &nbsp;&nbsp;<span class="function">unmounted</span>(el, binding) {} <span class="comment">// 元素卸载前</span><br>
        }<br><br>
        <span class="comment">// 全局注册</span><br>
        app.<span class="function">directive</span>(<span class="string">'focus'</span>, myDirective)<br><br>
        <span class="comment">// 局部注册（在组件中）</span><br>
        <span class="keyword">const</span> vFocus = { <span class="function">mounted</span>: (el) => el.<span class="function">focus</span>() }
      </div>
    </div>

    <!-- ========== 2. Teleport ========== -->
    <div class="card">
      <h2 class="card-title">2. Teleport（传送门）</h2>
      <p>Teleport 允许将组件的 DOM 渲染到页面的其他位置（如 body），不受父组件样式约束，常用于模态框、通知等。</p>
      
      <div class="demo-area">
        <button class="btn btn-primary" @click="modalOpen = true">打开模态框（Teleport 到 body）</button>
        
        <!-- Teleport 将内容渲染到 body 末尾 -->
        <Teleport to="body">
          <div v-if="modalOpen" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
            <div style="background: white; border-radius: 12px; padding: 32px; max-width: 400px; width: 90%;">
              <h3 style="margin-bottom: 12px; color: #35495e;">模态框标题</h3>
              <p style="color: #666; margin-bottom: 20px;">
                这个模态框通过 Teleport 渲染到了 body 元素下，
                即使它在组件的深层嵌套中，也不会受父组件的 overflow、z-index 等样式影响。
              </p>
              <button class="btn btn-primary" @click="modalOpen = false">关闭</button>
            </div>
          </div>
        </Teleport>

        <div class="code-block" style="margin-top: 16px;">
          <span class="tag">&lt;Teleport</span> <span class="attr">to</span>=<span class="string">"body"</span><span class="tag">&gt;</span><br>
          &nbsp;&nbsp;<span class="tag">&lt;div</span> <span class="attr">class</span>=<span class="string">"modal"</span><span class="tag">&gt;</span>...<span class="tag">&lt;/div&gt;</span><br>
          <span class="tag">&lt;/Teleport&gt;</span>
        </div>
      </div>
    </div>

    <!-- ========== 3. 动态组件 ========== -->
    <div class="card">
      <h2 class="card-title">3. 动态组件</h2>
      <p>使用 <code>&lt;component :is="..."&gt;</code> 在多个组件之间动态切换，适合标签页、向导等场景。</p>
      
      <div class="demo-area">
        <div style="margin-bottom: 16px;">
          <button 
            class="btn" 
            :class="currentTab === 'tab1' ? 'btn-primary' : 'btn-secondary'"
            @click="currentTab = 'tab1'"
          >标签一</button>
          <button 
            class="btn" 
            :class="currentTab === 'tab2' ? 'btn-primary' : 'btn-secondary'"
            @click="currentTab = 'tab2'"
          >标签二</button>
          <button 
            class="btn" 
            :class="currentTab === 'tab3' ? 'btn-primary' : 'btn-secondary'"
            @click="currentTab = 'tab3'"
          >标签三</button>
        </div>
        
        <!-- 动态组件 + keep-alive 缓存 -->
        <div style="background: white; border-radius: 6px; padding: 20px; min-height: 120px;">
          <KeepAlive>
            <component :is="currentTabComponent" />
          </KeepAlive>
        </div>
        <p style="margin-top: 8px; font-size: 13px; color: #666;">
          使用了 KeepAlive 缓存组件状态，切换标签后输入的内容不会丢失。
        </p>
      </div>

      <div class="code-block">
        <span class="tag">&lt;KeepAlive&gt;</span><br>
        &nbsp;&nbsp;<span class="tag">&lt;component</span> <span class="attr">:is</span>=<span class="string">"currentTabComponent"</span> <span class="tag">/&gt;</span><br>
        <span class="tag">&lt;/KeepAlive&gt;</span>
      </div>
    </div>

    <!-- ========== 4. 过渡动画 ========== -->
    <div class="card">
      <h2 class="card-title">4. 过渡动画</h2>
      <p>Vue 提供了 <code>&lt;transition&gt;</code> 组件，在元素进入/离开时自动添加 CSS 类名，实现过渡效果。</p>
      
      <div class="demo-area">
        <button class="btn btn-primary" @click="showTransition = !showTransition">
          {{ showTransition ? '隐藏' : '显示' }}元素
        </button>
        
        <div style="margin-top: 16px; display: flex; gap: 20px;">
          <div style="flex: 1; text-align: center;">
            <p style="font-size: 13px; color: #666; margin-bottom: 8px;">fade 淡入淡出</p>
            <transition name="fade">
              <div v-if="showTransition" style="padding: 24px; background: #42b883; color: white; border-radius: 8px;">
                Fade 效果
              </div>
            </transition>
          </div>
          
          <div style="flex: 1; text-align: center;">
            <p style="font-size: 13px; color: #666; margin-bottom: 8px;">slide 滑动</p>
            <transition name="slide">
              <div v-if="showTransition" style="padding: 24px; background: #35495e; color: white; border-radius: 8px;">
                Slide 效果
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="code-block">
        <span class="comment">&lt;!-- 过渡类名 --&gt;</span><br>
        .fade-enter-active, .fade-leave-active { <span class="function">transition</span>: opacity .3s }<br>
        .fade-enter-from, .fade-leave-to { opacity: <span class="string">0</span> }<br><br>
        <span class="tag">&lt;transition</span> <span class="attr">name</span>=<span class="string">"fade"</span><span class="tag">&gt;</span><br>
        &nbsp;&nbsp;<span class="tag">&lt;div</span> <span class="attr">v-if</span>=<span class="string">"show"</span><span class="tag">&gt;</span>内容<span class="tag">&lt;/div&gt;</span><br>
        <span class="tag">&lt;/transition&gt;</span>
      </div>
    </div>

    <!-- ========== 5. 异步组件与 Suspense ========== -->
    <div class="card">
      <h2 class="card-title">5. 异步组件与 Suspense</h2>
      <p>异步组件在需要时才加载（代码分割），Suspense 用于在异步组件加载时显示兜底内容。</p>
      
      <div class="demo-area">
        <button class="btn btn-primary" @click="loadAsyncComponent = !loadAsyncComponent">
          {{ loadAsyncComponent ? '卸载' : '加载' }}异步组件
        </button>
        
        <div style="margin-top: 16px;">
          <Suspense v-if="loadAsyncComponent">
            <template #default>
              <AsyncComp />
            </template>
            <template #fallback>
              <div style="padding: 24px; text-align: center; color: #666;">
                组件加载中...（模拟 1.5 秒延迟）
              </div>
            </template>
          </Suspense>
        </div>
      </div>

      <div class="code-block">
        <span class="keyword">import</span> { defineAsyncComponent } <span class="keyword">from</span> <span class="string">'vue'</span><br><br>
        <span class="keyword">const</span> AsyncComp = <span class="function">defineAsyncComponent</span>(() => <span class="function">import</span>(<span class="string">'./AsyncComp.vue'</span>))<br><br>
        <span class="tag">&lt;Suspense&gt;</span><br>
        &nbsp;&nbsp;<span class="tag">&lt;template</span> <span class="attr">#default</span><span class="tag">&gt;</span><br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span class="tag">&lt;AsyncComp</span> <span class="tag">/&gt;</span><br>
        &nbsp;&nbsp;<span class="tag">&lt;/template&gt;</span><br>
        &nbsp;&nbsp;<span class="tag">&lt;template</span> <span class="attr">#fallback</span><span class="tag">&gt;</span><br>
        &nbsp;&nbsp;&nbsp;&nbsp;加载中...<br>
        &nbsp;&nbsp;<span class="tag">&lt;/template&gt;</span><br>
        <span class="tag">&lt;/Suspense&gt;</span>
      </div>
    </div>

    <!-- ========== 6. 响应式 API 进阶 ========== -->
    <div class="card">
      <h2 class="card-title">6. 响应式 API 进阶</h2>
      
      <div class="grid-2">
        <div class="demo-area">
          <div class="demo-label">readonly - 只读响应式</div>
          <p>原值：{{ original.count }}</p>
          <p>只读副本：{{ readonlyCopy.count }}</p>
          <button class="btn btn-primary" @click="original.count++">修改原值</button>
          <button class="btn btn-secondary" @click="tryModifyReadonly">尝试修改只读（控制台报错）</button>
        </div>

        <div class="demo-area">
          <div class="demo-label">shallowRef - 浅层响应式</div>
          <p>值：{{ shallowObj.value?.nested?.count }}</p>
          <button class="btn btn-primary" @click="modifyShallow">修改深层属性（不触发更新）</button>
          <button class="btn btn-secondary" @click="replaceShallow">替换整个对象（触发更新）</button>
        </div>
      </div>

      <div class="tip-box">
        <strong>其他响应式 API：</strong>
        shallowReactive（浅层 reactive）、markRaw（标记为不可转为代理）、
        toRaw（获取原始对象）、isRef / isReactive / isReadonly（类型判断）。
        这些高级 API 用于性能优化场景，日常开发用 ref 和 reactive 即可。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, readonly, shallowRef, defineAsyncComponent, markRaw, watch } from 'vue'

// ========== 自定义指令（局部注册）==========
// v-focus: 自动聚焦
const vFocus = {
  mounted(el) {
    el.focus()
  }
}

// v-highlight: 关键词高亮，参数是颜色
const vHighlight = {
  mounted(el, binding) {
    highlightText(el, binding)
  },
  updated(el, binding) {
    highlightText(el, binding)
  }
}

function highlightText(el, binding) {
  const keyword = binding.value
  const color = binding.arg || 'yellow'
  if (keyword && el.textContent.includes(keyword)) {
    const regex = new RegExp(`(${keyword})`, 'g')
    el.innerHTML = el.textContent.replace(regex, `<span style="background: ${color}; padding: 2px 4px; border-radius: 3px;">$1</span>`)
  }
}

// v-click-outside: 点击外部触发
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  }
}

// ========== Teleport ==========
const modalOpen = ref(false)

// ========== 动态组件 ==========
const currentTab = ref('tab1')

// 用 markRaw 标记组件对象，避免被转为响应式代理
const tab1 = markRaw({
  template: `
    <div>
      <h4 style="color: #42b883; margin-bottom: 8px;">标签一内容</h4>
      <p>这是第一个标签页的内容。</p>
      <input type="text" class="input" placeholder="输入内容测试 keep-alive 缓存" style="margin-top: 8px;">
    </div>
  `
})
const tab2 = markRaw({
  template: `
    <div>
      <h4 style="color: #35495e; margin-bottom: 8px;">标签二内容</h4>
      <p>这是第二个标签页的内容。</p>
      <input type="text" class="input" placeholder="输入内容测试 keep-alive 缓存" style="margin-top: 8px;">
    </div>
  `
})
const tab3 = markRaw({
  template: `
    <div>
      <h4 style="color: #e67e22; margin-bottom: 8px;">标签三内容</h4>
      <p>这是第三个标签页的内容。</p>
      <input type="text" class="input" placeholder="输入内容测试 keep-alive 缓存" style="margin-top: 8px;">
    </div>
  `
})

const tabComponents = { tab1, tab2, tab3 }
const currentTabComponent = ref(tab1)

// 监听 currentTab 变化，切换组件
watch(currentTab, (newVal) => {
  currentTabComponent.value = tabComponents[newVal]
})

// ========== 下拉菜单 ==========
const dropdownOpen = ref(false)
function closeDropdown() {
  dropdownOpen.value = false
}

// ========== 过渡动画 ==========
const showTransition = ref(true)

// ========== 异步组件 ==========
const loadAsyncComponent = ref(false)
const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        template: `
          <div style="padding: 24px; background: #e8f5e9; border-radius: 8px; text-align: center;">
            <h4 style="color: #2e7d32; margin-bottom: 8px;">异步组件加载完成！</h4>
            <p style="color: #666;">这个组件是通过 defineAsyncComponent 异步加载的。</p>
          </div>
        `
      })
    }, 1500)
  })
})

// ========== 响应式进阶 ==========
const original = reactive({ count: 0 })
const readonlyCopy = readonly(original)

function tryModifyReadonly() {
  // 这会在控制台输出警告，不会真正修改
  readonlyCopy.count++
}

const shallowObj = shallowRef({ nested: { count: 0 } })

function modifyShallow() {
  // shallowRef 只追踪 .value 的替换，深层属性变化不触发更新
  shallowObj.value.nested.count++
  console.log('深层值已修改为:', shallowObj.value.nested.count, '但视图不会更新')
}

function replaceShallow() {
  // 替换整个对象会触发更新
  shallowObj.value = { nested: { count: Math.floor(Math.random() * 100) } }
}
</script>
