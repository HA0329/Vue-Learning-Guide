<!--
  组合式 API 视图
  展示 Vue 3 组合式 API 的核心概念：
  1. setup 函数与 <script setup> 语法糖
  2. ref 与 reactive 深入
  3. computed 与 watch
  4. 组合式函数 (Composables)
  5. 与选项式 API 对比
-->
<template>
  <div>
    <h1 style="margin-bottom: 24px; color: #35495e;">组合式 API</h1>

    <!-- 介绍 -->
    <div class="card">
      <h2 class="card-title">什么是组合式 API？</h2>
      <p style="margin-bottom: 12px;">
        组合式 API (Composition API) 是 Vue 3 引入的新的代码组织方式。
        与选项式 API (Options API) 不同，组合式 API 允许我们按照<strong>逻辑功能</strong>组织代码，
        而不是按照选项类型 (data、methods、computed) 组织。
      </p>
      
      <div class="grid-2">
        <div>
          <h3 class="card-subtitle">选项式 API（Vue 2 风格）</h3>
          <div class="code-block">
            <span class="keyword">export default</span> {<br>
            &nbsp;&nbsp;<span class="function">data</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">return</span> { count: <span class="string">0</span> }<br>
            &nbsp;&nbsp;},<br>
            &nbsp;&nbsp;<span class="function">computed</span>: {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="function">double</span>() { <span class="keyword">return</span> <span class="keyword">this</span>.count * <span class="string">2</span> }<br>
            &nbsp;&nbsp;},<br>
            &nbsp;&nbsp;<span class="function">methods</span>: {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="function">inc</span>() { <span class="keyword">this</span>.count++ }<br>
            &nbsp;&nbsp;}<br>
            }
          </div>
        </div>
        <div>
          <h3 class="card-subtitle">组合式 API（Vue 3 推荐）</h3>
          <div class="code-block">
            <span class="tag">&lt;script setup&gt;</span><br>
            <span class="keyword">const</span> count = <span class="function">ref</span>(<span class="string">0</span>)<br>
            <span class="keyword">const</span> double = <span class="function">computed</span>(() => count.value * <span class="string">2</span>)<br>
            <span class="keyword">function</span> <span class="function">inc</span>() { count.value++ }<br>
            <span class="tag">&lt;/script&gt;</span>
          </div>
        </div>
      </div>

      <div class="tip-box">
        <strong>组合式 API 的优势：</strong>
        1) 逻辑可以按功能聚合，相关代码在一起；
        2) 逻辑可以通过组合式函数复用，比 mixins 更清晰；
        3) 更好的 TypeScript 类型推断；
        4) 更小的生产打包体积（tree-shaking 更好）。
      </div>
    </div>

    <!-- ========== 1. ref 深入 ========== -->
    <div class="card">
      <h2 class="card-title">1. ref 深入</h2>
      <p>ref 可以包裹任何类型的值，在 JS 中通过 .value 访问，模板中自动解包。</p>
      
      <div class="demo-area">
        <div class="demo-label">ref 包裹对象（推荐方式）</div>
        <p>姓名：{{ userRef.name }}，年龄：{{ userRef.age }}</p>
        <button class="btn btn-primary" @click="userRef.age++">年龄+1</button>
        <button class="btn btn-secondary" @click="userRef = { name: '新用户', age: 18 }">替换整个对象</button>
        
        <div class="code-block" style="margin-top: 12px;">
          <span class="comment">// ref 可以包裹对象，替换整个对象也能保持响应式</span><br>
          <span class="keyword">const</span> userRef = <span class="function">ref</span>({ name: <span class="string">'张三'</span>, age: <span class="string">25</span> })<br>
          <span class="comment">// JS 中：userRef.value.age++</span><br>
          <span class="comment">// 模板中自动解包：userRef.age</span>
        </div>
      </div>

      <div class="demo-area">
        <div class="demo-label">toRef / toRefs - 解构响应式对象</div>
        <p>直接解构 reactive 对象会丢失响应式，需要用 toRefs：</p>
        <p>解构后：name = {{ name }}, age = {{ age }}</p>
        <button class="btn btn-primary" @click="age++">通过解构变量修改 age</button>
        
        <div class="code-block">
          <span class="keyword">const</span> state = <span class="function">reactive</span>({ name: <span class="string">'李四'</span>, age: <span class="string">30</span> })<br>
          <span class="comment">// 错误：const { name, age } = state  // 丢失响应式</span><br>
          <span class="keyword">const</span> { name, age } = <span class="function">toRefs</span>(state)  <span class="comment">// 正确</span>
        </div>
      </div>
    </div>

    <!-- ========== 2. watch 进阶 ========== -->
    <div class="card">
      <h2 class="card-title">2. watch 进阶用法</h2>
      
      <div class="demo-area">
        <div class="demo-label">监听多个数据源</div>
        <input type="number" class="input" v-model.number="watchA" placeholder="A">
        <input type="number" class="input" v-model.number="watchB" placeholder="B" style="margin-left: 8px;">
        <p style="margin-top: 8px;">变化日志：{{ multiWatchLog }}</p>
        
        <div class="code-block">
          <span class="function">watch</span>([watchA, watchB], ([newA, newB], [oldA, oldB]) => {<br>
          &nbsp;&nbsp;console.log(<span class="string">`A: ${oldA} -> ${newA}, B: ${oldB} -> ${newB}`</span>)<br>
          })
        </div>
      </div>

      <div class="demo-area">
        <div class="demo-label">深度监听 (deep: true) 与立即执行 (immediate: true)</div>
        <input type="text" class="input" v-model="deepObj.user.name" placeholder="用户名">
        <input type="text" class="input" v-model="deepObj.user.email" placeholder="邮箱" style="margin-left: 8px;">
        <p style="margin-top: 8px;">深度监听触发次数：{{ deepWatchCount }}</p>
        
        <div class="code-block">
          <span class="function">watch</span>(() => deepObj.user, (newVal) => {<br>
          &nbsp;&nbsp;deepWatchCount.value++<br>
          }, { <span class="attr">deep</span>: <span class="keyword">true</span>, <span class="attr">immediate</span>: <span class="keyword">true</span> })
        </div>
      </div>
    </div>

    <!-- ========== 3. 组合式函数 ========== -->
    <div class="card">
      <h2 class="card-title">3. 组合式函数 (Composables)</h2>
      <p>组合式函数是复用逻辑的标准方式，以 use 开头命名。下面演示三个实用的组合式函数。</p>
      
      <div class="grid-2">
        <div class="demo-area">
          <div class="demo-label">useCounter - 计数器逻辑复用</div>
          <p>计数器 A：{{ counterA.count }}（双倍：{{ counterA.double }}）</p>
          <button class="btn btn-primary" @click="counterA.inc()">A+1</button>
          <button class="btn btn-secondary" @click="counterA.dec()">A-1</button>
          
          <p style="margin-top: 12px;">计数器 B（初始值 10）：{{ counterB.count }}</p>
          <button class="btn btn-primary" @click="counterB.inc()">B+1</button>
          <button class="btn btn-secondary" @click="counterB.reset()">B 重置</button>
        </div>

        <div class="demo-area">
          <div class="demo-label">useMouse - 鼠标位置追踪</div>
          <p>鼠标 X：{{ mouse.x }}</p>
          <p>鼠标 Y：{{ mouse.y }}</p>
          <p style="font-size: 12px; color: #999;">移动鼠标查看变化（组件卸载时自动清理事件监听）</p>
        </div>
      </div>

      <div class="demo-area">
        <div class="demo-label">useFetch - 数据请求封装</div>
        <button class="btn btn-primary" @click="fetchData.refetch()" :disabled="fetchData.loading">
          {{ fetchData.loading ? '加载中...' : '重新请求' }}
        </button>
        <div v-if="fetchData.loading" style="margin-top: 8px; color: #666;">正在加载数据...</div>
        <div v-else-if="fetchData.error" style="margin-top: 8px; color: #e74c3c;">错误：{{ fetchData.error }}</div>
        <div v-else style="margin-top: 8px; padding: 12px; background: white; border-radius: 6px;">
          <p><strong>返回数据：</strong></p>
          <pre style="font-size: 12px;">{{ JSON.stringify(fetchData.data, null, 2) }}</pre>
        </div>
      </div>

      <div class="tip-box">
        <strong>组合式函数的约定：</strong>
        1) 命名以 use 开头；
        2) 返回响应式状态和方法；
        3) 在 setup 中同步调用；
        4) 副作用（事件监听、定时器）要在 onUnmounted 中清理。
      </div>
    </div>

    <!-- ========== 4. 对比总结 ========== -->
    <div class="card">
      <h2 class="card-title">4. 选项式 vs 组合式 对比</h2>
      <table class="demo-table">
        <thead>
          <tr>
            <th>对比项</th>
            <th>选项式 API</th>
            <th>组合式 API</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>代码组织</td>
            <td>按选项类型分（data/methods/computed）</td>
            <td>按逻辑功能分，相关代码聚合</td>
          </tr>
          <tr>
            <td>逻辑复用</td>
            <td>mixins（有命名冲突、来源不清晰问题）</td>
            <td>组合式函数（清晰、无冲突、可传参）</td>
          </tr>
          <tr>
            <td>TypeScript</td>
            <td>需要额外装饰器，类型推断弱</td>
            <td>原生支持，类型推断优秀</td>
          </tr>
          <tr>
            <td>打包体积</td>
            <td>较大（this 上下文难以 tree-shake）</td>
            <td>更小（函数式可 tree-shake）</td>
          </tr>
          <tr>
            <td>学习曲线</td>
            <td>平缓，概念分离清晰</td>
            <td>需要理解响应式原理，但更灵活</td>
          </tr>
          <tr>
            <td>适用场景</td>
            <td>小型项目、简单组件</td>
            <td>中大型项目、复杂组件、逻辑复用</td>
          </tr>
          <tr>
            <td>this 指向</td>
            <td>使用 this 访问实例</td>
            <td>没有 this，直接使用变量</td>
          </tr>
        </tbody>
      </table>
      
      <div class="tip-box">
        <strong>建议：</strong>新项目推荐使用组合式 API + &lt;script setup&gt; 语法糖。
        两种 API 可以在同一个项目中混用，但同一个组件内不建议混用。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, toRefs } from 'vue'
import { useCounter } from '@/composables/useCounter'
import { useMouse } from '@/composables/useMouse'
import { useFetch } from '@/composables/useFetch'

// ========== 1. ref 深入 ==========
const userRef = ref({ name: '张三', age: 25 })

// toRefs 演示
const state = reactive({ name: '李四', age: 30 })
const { name, age } = toRefs(state)

// ========== 2. watch 进阶 ==========
const watchA = ref(1)
const watchB = ref(2)
const multiWatchLog = ref('等待变化...')

watch([watchA, watchB], ([newA, newB], [oldA, oldB]) => {
  multiWatchLog.value = `A: ${oldA} -> ${newA}, B: ${oldB} -> ${newB}`
})

const deepObj = reactive({
  user: {
    name: '王五',
    email: 'wangwu@example.com'
  }
})
const deepWatchCount = ref(0)

watch(() => deepObj.user, () => {
  deepWatchCount.value++
}, { deep: true, immediate: true })

// ========== 3. 组合式函数 ==========
const counterA = useCounter(0)
const counterB = useCounter(10)
const mouse = useMouse()
const fetchData = useFetch('/api/example', {
  mockData: { id: 1, title: '模拟文章标题', content: '这是 useFetch 返回的模拟数据', views: 1024 }
})
</script>
