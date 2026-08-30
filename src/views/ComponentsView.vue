<!--
  组件化视图
  涵盖 Vue 组件化开发的核心概念：
  1. Props - 父传子
  2. Emit - 子传父
  3. 插槽 - 内容分发
  4. 生命周期
  5. v-model - 自定义组件双向绑定
  6. Provide / Inject - 跨层级通信
-->
<template>
  <div>
    <h1 style="margin-bottom: 24px; color: #35495e;">组件化开发</h1>

    <!-- ========== 1. Props ========== -->
    <div class="card">
      <h2 class="card-title">1. Props（父传子）</h2>
      <p>Props 是父组件向子组件传递数据的主要方式，遵循单向数据流：父组件更新 props，子组件接收使用。</p>
      
      <div class="demo-area">
        <div class="demo-label">父组件控制区</div>
        <input type="text" class="input" v-model="parentTitle" placeholder="标题" style="margin-right: 8px;">
        <input type="number" class="input" v-model.number="parentCount" placeholder="数字" style="margin-right: 8px;">
        <label><input type="checkbox" v-model="parentActive"> 激活状态</label>
      </div>
      
      <PropsDemo 
        :title="parentTitle" 
        :count="parentCount" 
        :is-active="parentActive"
        :items="['Vue', 'React', 'Angular']"
        :config="{ theme: 'dark', lang: 'zh-CN' }"
        status="success"
      />
    </div>

    <!-- ========== 2. Emit ========== -->
    <div class="card">
      <h2 class="card-title">2. Emit（子传父）</h2>
      <p>子组件通过 emit 触发事件，父组件监听事件并响应。这是子组件向父组件通信的标准方式。</p>
      
      <div class="demo-area">
        <div class="demo-label">父组件接收的数据</div>
        <p>最后事件：{{ lastEvent }}</p>
        <p>父组件维护的计数：{{ parentEmitCount }}</p>
      </div>
      
      <EmitDemo 
        @increment="handleIncrement" 
        @decrement="handleDecrement" 
        @reset="handleReset"
      />
    </div>

    <!-- ========== 3. 插槽 ========== -->
    <div class="card">
      <h2 class="card-title">3. 插槽（内容分发）</h2>
      <p>插槽允许父组件向子组件传递 HTML 内容，是组件复用和灵活布局的重要机制。</p>
      
      <SlotDemo>
        <!-- 默认插槽内容 -->
        <p style="color: #42b883; margin: 0;">这是父组件传入的<strong>默认插槽</strong>内容</p>
        
        <!-- 具名插槽 -->
        <template #header>
          <span class="tag tag-green">头部内容</span>
        </template>
        
        <template #footer>
          <button class="btn btn-secondary" style="margin: 0;">底部按钮</button>
        </template>
        
        <!-- 作用域插槽：接收子组件传递的数据 -->
        <template #item="{ item, index }">
          <span style="color: #9b59b6;">
            #{{ index + 1 }} 自定义渲染：{{ item }}
          </span>
        </template>
      </SlotDemo>

      <div class="code-block">
        <span class="comment">&lt;!-- 默认插槽 --&gt;</span><br>
        <span class="tag">&lt;slot&gt;</span>默认内容<span class="tag">&lt;/slot&gt;</span><br><br>
        <span class="comment">&lt;!-- 具名插槽 --&gt;</span><br>
        <span class="tag">&lt;slot</span> <span class="attr">name</span>=<span class="string">"header"</span><span class="tag">&gt;&lt;/slot&gt;</span><br><br>
        <span class="comment">&lt;!-- 作用域插槽（子传数据给父） --&gt;</span><br>
        <span class="tag">&lt;slot</span> <span class="attr">name</span>=<span class="string">"item"</span> <span class="attr">:item</span>=<span class="string">"item"</span> <span class="attr">:index</span>=<span class="string">"index"</span><span class="tag">&gt;&lt;/slot&gt;</span>
      </div>
    </div>

    <!-- ========== 4. 生命周期 ========== -->
    <div class="card">
      <h2 class="card-title">4. 生命周期钩子</h2>
      <p>Vue 组件从创建到销毁会经历一系列阶段，每个阶段都有对应的钩子函数。</p>
      
      <div style="margin-bottom: 12px;">
        <button class="btn btn-primary" @click="showLifecycle = !showLifecycle">
          {{ showLifecycle ? '销毁组件' : '创建组件' }}
        </button>
        <span style="margin-left: 12px; font-size: 13px; color: #666;">
          切换组件可以观察 onMounted / onUnmounted 的执行
        </span>
      </div>
      
      <LifecycleDemo v-if="showLifecycle" />
      <div v-else class="demo-area" style="text-align: center; color: #999;">
        组件已销毁，点击上方按钮重新创建
      </div>

      <div class="tip-box">
        <strong>生命周期顺序：</strong>setup → onBeforeMount → onMounted → (onBeforeUpdate → onUpdated) → onBeforeUnmount → onUnmounted
        <br>注意：Vue 3 中 beforeCreate 和 created 被 setup 替代，不再需要单独使用。
      </div>
    </div>

    <!-- ========== 5. v-model ========== -->
    <div class="card">
      <h2 class="card-title">5. 自定义组件 v-model</h2>
      <p>Vue 3 中 v-model 是 :modelValue 和 @update:modelValue 的语法糖，支持在自定义组件上使用。</p>
      
      <div class="demo-area">
        <div class="demo-label">父组件中的值</div>
        <p style="font-size: 24px; font-weight: bold; color: #42b883;">{{ vModelValue }}</p>
        <button class="btn btn-secondary" @click="vModelValue = 0">父组件重置为 0</button>
      </div>
      
      <VModelDemo v-model="vModelValue" />

      <div class="code-block">
        <span class="comment">&lt;!-- 父组件 --&gt;</span><br>
        <span class="tag">&lt;VModelDemo</span> <span class="attr">v-model</span>=<span class="string">"value"</span> <span class="tag">/&gt;</span><br><br>
        <span class="comment">&lt;!-- 等价于 --&gt;</span><br>
        <span class="tag">&lt;VModelDemo</span> <span class="attr">:modelValue</span>=<span class="string">"value"</span> <span class="attr">@update:modelValue</span>=<span class="string">"value = $event"</span> <span class="tag">/&gt;</span>
      </div>
    </div>

    <!-- ========== 6. Provide / Inject ========== -->
    <div class="card">
      <h2 class="card-title">6. Provide / Inject（跨层级通信）</h2>
      <p>当组件层级很深时，逐层传递 props 很繁琐。Provide/Inject 允许祖先组件向所有后代组件提供数据。</p>
      
      <div class="demo-area">
        <div class="demo-label">祖先组件（当前页面）提供的数据</div>
        <p>主题：<strong>{{ theme }}</strong></p>
        <p>用户：<strong>{{ provideUser.name }}</strong></p>
        <button class="btn btn-primary" @click="toggleTheme">切换主题</button>
        <button class="btn btn-secondary" @click="provideUser.name = provideUser.name === '张三' ? '李四' : '张三'">修改用户名</button>
        
        <div style="margin-top: 16px; padding: 16px; border: 2px dashed #ddd; border-radius: 6px;">
          <p style="font-size: 13px; color: #666; margin-bottom: 8px;">↓ 后代组件（通过 inject 接收，不需要中间层传递）</p>
          <InjectChild />
        </div>
      </div>

      <div class="code-block">
        <span class="comment">// 祖先组件</span><br>
        <span class="function">provide</span>(<span class="string">'theme'</span>, theme)<br>
        <span class="function">provide</span>(<span class="string">'user'</span>, user)<br><br>
        <span class="comment">// 后代组件（任意层级）</span><br>
        <span class="keyword">const</span> theme = <span class="function">inject</span>(<span class="string">'theme'</span>)<br>
        <span class="keyword">const</span> user = <span class="function">inject</span>(<span class="string">'user'</span>)
      </div>

      <div class="warning-box">
        注意：provide 的数据默认不是响应式的，需要传递 ref/reactive 对象才能保持响应式。
        建议配合 readonly 使用，防止后代组件直接修改祖先数据。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, provide, readonly } from 'vue'
import PropsDemo from '@/components/PropsDemo.vue'
import EmitDemo from '@/components/EmitDemo.vue'
import SlotDemo from '@/components/SlotDemo.vue'
import LifecycleDemo from '@/components/LifecycleDemo.vue'
import VModelDemo from '@/components/VModelDemo.vue'
import InjectChild from '@/components/InjectChild.vue'

// ========== Props 演示 ==========
const parentTitle = ref('我是标题')
const parentCount = ref(42)
const parentActive = ref(true)

// ========== Emit 演示 ==========
const lastEvent = ref('暂无事件')
const parentEmitCount = ref(0)

function handleIncrement(value) {
  lastEvent.value = `increment，值为 ${value}`
  parentEmitCount.value = value
}

function handleDecrement(value) {
  lastEvent.value = `decrement，值为 ${value}`
  parentEmitCount.value = value
}

function handleReset(value, message) {
  lastEvent.value = `reset，值为 ${value}，消息：${message}`
  parentEmitCount.value = value
}

// ========== 生命周期演示 ==========
const showLifecycle = ref(true)

// ========== v-model 演示 ==========
const vModelValue = ref(10)

// ========== Provide / Inject 演示 ==========
const theme = ref('light')
const provideUser = reactive({ name: '张三', role: 'admin' })

// provide 提供数据，用 readonly 保护不被子组件直接修改
provide('theme', readonly(theme))
provide('user', provideUser)
// 也可以提供方法
provide('toggleTheme', () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
})

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
