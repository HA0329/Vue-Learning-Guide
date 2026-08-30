<!--
  基础概念视图
  涵盖 Vue 3 最核心的基础概念：
  1. 响应式数据 (ref / reactive)
  2. 模板语法 (插值、指令)
  3. 计算属性 (computed)
  4. 侦听器 (watch / watchEffect)
  5. Class 与 Style 绑定
  6. 条件渲染 (v-if / v-show)
  7. 列表渲染 (v-for)
  8. 事件处理
-->
<template>
  <div>
    <h1 style="margin-bottom: 24px; color: #35495e;">基础概念</h1>

    <!-- ========== 1. 响应式数据 ========== -->
    <div class="card">
      <h2 class="card-title">1. 响应式数据</h2>
      <p>Vue 3 提供两种创建响应式数据的方式：<code>ref</code>（用于基本类型）和 <code>reactive</code>（用于对象/数组）。</p>
      
      <div class="grid-2">
        <div class="demo-area">
          <div class="demo-label">ref - 基本类型响应式</div>
          <div class="counter-display">{{ refCount }}</div>
          <div style="text-align: center;">
            <button class="btn btn-primary" @click="refCount++">+1</button>
            <button class="btn btn-secondary" @click="refCount--">-1</button>
            <button class="btn btn-danger" @click="refCount = 0">重置</button>
          </div>
          <div class="code-block" style="margin-top: 12px;">
            <span class="keyword">const</span> refCount = <span class="function">ref</span>(<span class="string">0</span>)<br>
            <span class="comment">// 模板中自动解包，直接用 refCount</span><br>
            <span class="comment">// JS 中需要用 .value 访问：refCount.value++</span>
          </div>
        </div>

        <div class="demo-area">
          <div class="demo-label">reactive - 对象类型响应式</div>
          <div style="padding: 12px; background: white; border-radius: 6px; margin-bottom: 12px;">
            <p>姓名：{{ reactiveObj.name }}</p>
            <p>年龄：{{ reactiveObj.age }} 岁</p>
            <p>城市：{{ reactiveObj.city }}</p>
          </div>
          <button class="btn btn-primary" @click="reactiveObj.age++">年龄+1</button>
          <button class="btn btn-secondary" @click="reactiveObj.city = reactiveObj.city === '北京' ? '上海' : '北京'">切换城市</button>
          <div class="code-block" style="margin-top: 12px;">
            <span class="keyword">const</span> reactiveObj = <span class="function">reactive</span>({<br>
            &nbsp;&nbsp;name: <span class="string">'张三'</span>,<br>
            &nbsp;&nbsp;age: <span class="string">25</span>,<br>
            &nbsp;&nbsp;city: <span class="string">'北京'</span><br>
            })<br>
            <span class="comment">// 直接修改属性即可触发更新</span>
          </div>
        </div>
      </div>

      <div class="tip-box">
        <strong>ref vs reactive：</strong>ref 适用于基本类型（字符串、数字、布尔值），在 JS 中需要 .value 访问；
        reactive 适用于对象和数组，直接访问属性。Vue 3.3+ 推荐统一使用 ref，对象也可以用 ref 包裹。
      </div>
    </div>

    <!-- ========== 2. 模板语法 ========== -->
    <div class="card">
      <h2 class="card-title">2. 模板语法</h2>
      
      <h3 class="card-subtitle">2.1 文本插值</h3>
      <div class="demo-area">
        <p>普通插值：{{ message }}</p>
        <p>JavaScript 表达式：{{ message.toUpperCase() }}</p>
        <p>三元运算：{{ refCount > 5 ? '大于5' : '小于等于5' }}</p>
        <p v-once>单次插值（不会更新）：{{ onceMessage }}</p>
        <button class="btn btn-primary" @click="onceMessage = '已修改'">尝试修改单次插值</button>
      </div>

      <h3 class="card-subtitle">2.2 原始 HTML (v-html)</h3>
      <div class="demo-area">
        <p>文本插值（会转义）：{{ rawHtml }}</p>
        <p>v-html 渲染：<span v-html="rawHtml"></span></p>
        <div class="warning-box">
          注意：v-html 可能导致 XSS 攻击，只对可信内容使用，永远不要对用户提供的内容使用 v-html。
        </div>
      </div>

      <h3 class="card-subtitle">2.3 常用指令</h3>
      <div class="demo-area">
        <p><strong>v-bind</strong>（简写 :）- 动态绑定属性：</p>
        <input type="text" class="input" v-model="inputValue" placeholder="输入内容会同步到下面的链接" style="margin: 8px 0;">
        <a :href="'https://' + inputValue" target="_blank" style="color: #42b883;">{{ inputValue || '请输入网址' }}</a>
        
        <p style="margin-top: 16px;"><strong>v-model</strong> - 双向数据绑定：</p>
        <input type="text" class="input" v-model="inputValue" placeholder="输入试试">
        <span style="margin-left: 12px;">当前值：{{ inputValue }}</span>
      </div>
    </div>

    <!-- ========== 3. 计算属性 ========== -->
    <div class="card">
      <h2 class="card-title">3. 计算属性 (computed)</h2>
      <p>计算属性基于响应式依赖进行缓存，只有依赖变化时才会重新计算。适合复杂的派生状态。</p>
      
      <div class="demo-area">
        <div class="demo-label">姓名反转示例</div>
        <input type="text" class="input" v-model="firstName" placeholder="姓" style="margin-right: 8px;">
        <input type="text" class="input" v-model="lastName" placeholder="名">
        <p style="margin-top: 12px;">全名（计算属性）：<strong>{{ fullName }}</strong></p>
        <p>反转（计算属性嵌套）：<strong>{{ reversedName }}</strong></p>
        
        <div class="code-block" style="margin-top: 12px;">
          <span class="keyword">const</span> fullName = <span class="function">computed</span>(() => {<br>
          &nbsp;&nbsp;<span class="keyword">return</span> firstName.value + lastName.value<br>
          })<br><br>
          <span class="keyword">const</span> reversedName = <span class="function">computed</span>(() => {<br>
          &nbsp;&nbsp;<span class="keyword">return</span> fullName.value.<span class="function">split</span>(<span class="string">''</span>).<span class="function">reverse</span>().<span class="function">join</span>(<span class="string">''</span>)<br>
          })
        </div>
      </div>

      <div class="tip-box">
        <strong>computed vs methods：</strong>计算属性有缓存，多次访问只计算一次；methods 每次调用都会执行。
        计算属性不能有副作用（不能修改其他状态），应该是纯函数。
      </div>
    </div>

    <!-- ========== 4. 侦听器 ========== -->
    <div class="card">
      <h2 class="card-title">4. 侦听器 (watch / watchEffect)</h2>
      <p>侦听器用于在响应式状态变化时执行副作用（如异步请求、DOM操作、日志记录）。</p>
      
      <div class="grid-2">
        <div class="demo-area">
          <div class="demo-label">watch - 监听特定数据源</div>
          <input type="text" class="input" v-model="watchTarget" placeholder="输入内容触发 watch">
          <p style="margin-top: 8px;">变化次数：{{ watchCount }}</p>
          <p>旧值：{{ watchOldValue }}</p>
          <p>新值：{{ watchNewValue }}</p>
          <div class="code-block">
            <span class="function">watch</span>(watchTarget, (newVal, oldVal) => {<br>
            &nbsp;&nbsp;watchCount.value++<br>
            &nbsp;&nbsp;watchOldValue.value = oldVal<br>
            &nbsp;&nbsp;watchNewValue.value = newVal<br>
            })
          </div>
        </div>

        <div class="demo-area">
          <div class="demo-label">watchEffect - 自动收集依赖</div>
          <input type="number" class="input" v-model.number="effectA" placeholder="A">
          <input type="number" class="input" v-model.number="effectB" placeholder="B" style="margin-left: 8px;">
          <p style="margin-top: 8px;">A+B 结果（自动追踪）：{{ effectSum }}</p>
          <p>执行次数：{{ effectCount }}</p>
          <div class="code-block">
            <span class="function">watchEffect</span>(() => {<br>
            &nbsp;&nbsp;effectSum.value = effectA.value + effectB.value<br>
            &nbsp;&nbsp;effectCount.value++<br>
            })
          </div>
        </div>
      </div>

      <div class="tip-box">
        <strong>watch vs watchEffect：</strong>watch 需要明确指定监听源，能获取新旧值，默认惰性（初始化不执行）；
        watchEffect 自动收集依赖，立即执行，不能获取旧值。大多数场景用 watchEffect 更简洁。
      </div>
    </div>

    <!-- ========== 5. Class 与 Style 绑定 ========== -->
    <div class="card">
      <h2 class="card-title">5. Class 与 Style 绑定</h2>
      
      <div class="demo-area">
        <div class="demo-label">动态 Class 绑定</div>
        <div 
          :class="{ active: isActive, 'text-large': isLarge, 'text-red': isRed }"
          style="padding: 16px; background: #f0f0f0; border-radius: 6px; margin: 12px 0; transition: all 0.3s;"
        >
          这是一个动态样式的文本
        </div>
        <label style="margin-right: 16px;">
          <input type="checkbox" v-model="isActive"> 激活（绿色背景）
        </label>
        <label style="margin-right: 16px;">
          <input type="checkbox" v-model="isLarge"> 大字体
        </label>
        <label>
          <input type="checkbox" v-model="isRed"> 红色文字
        </label>

        <div class="demo-label" style="margin-top: 20px;">动态 Style 绑定</div>
        <div 
          :style="{ fontSize: fontSize + 'px', color: fontColor, backgroundColor: bgColor }"
          style="padding: 16px; border-radius: 6px; margin: 12px 0;"
        >
          动态内联样式
        </div>
        <input type="range" v-model.number="fontSize" min="12" max="32"> 字号：{{ fontSize }}px
        <input type="color" v-model="fontColor" style="margin-left: 16px;"> 文字颜色
        <input type="color" v-model="bgColor" style="margin-left: 16px;"> 背景颜色
      </div>
    </div>

    <!-- ========== 6. 条件渲染 ========== -->
    <div class="card">
      <h2 class="card-title">6. 条件渲染 (v-if / v-show)</h2>
      
      <div class="demo-area">
        <button class="btn btn-primary" @click="showContent = !showContent">
          {{ showContent ? '隐藏' : '显示' }}内容
        </button>
        
        <div style="margin-top: 16px; display: flex; gap: 20px;">
          <div style="flex: 1;">
            <h4>v-if（真正的条件渲染）</h4>
            <div v-if="showContent" style="padding: 16px; background: #e8f5e9; border-radius: 6px;">
              v-if: 我是通过 v-if 控制的，不显示时 DOM 中不存在
            </div>
            <div v-else style="padding: 16px; background: #ffebee; border-radius: 6px;">
              v-else: 内容已隐藏
            </div>
          </div>
          
          <div style="flex: 1;">
            <h4>v-show（仅切换 display）</h4>
            <div v-show="showContent" style="padding: 16px; background: #e3f2fd; border-radius: 6px;">
              v-show: 我是通过 v-show 控制的，DOM 始终存在，只是 display:none
            </div>
          </div>
        </div>
      </div>

      <div class="tip-box">
        <strong>v-if vs v-show：</strong>v-if 是真正的条件渲染，切换时会销毁/重建组件，有更高的切换开销；
        v-show 只是切换 CSS display，初始渲染开销大。频繁切换用 v-show，条件很少改变用 v-if。
      </div>
    </div>

    <!-- ========== 7. 列表渲染 ========== -->
    <div class="card">
      <h2 class="card-title">7. 列表渲染 (v-for)</h2>
      
      <div class="demo-area">
        <div class="demo-label">基础列表渲染（带 key）</div>
        <input type="text" class="input" v-model="newItem" placeholder="输入新事项" @keyup.enter="addTodo">
        <button class="btn btn-primary" @click="addTodo">添加</button>
        
        <ul class="demo-list" style="margin-top: 12px; background: white; border-radius: 6px;">
          <li v-for="(item, index) in todoList" :key="item.id">
            <span>
              <input type="checkbox" v-model="item.done" style="margin-right: 8px;">
              <span :style="{ textDecoration: item.done ? 'line-through' : 'none' }">
                {{ index + 1 }}. {{ item.text }}
              </span>
            </span>
            <button class="btn btn-danger" style="padding: 4px 10px; font-size: 12px;" @click="removeTodo(item.id)">删除</button>
          </li>
        </ul>
        <p v-if="todoList.length === 0" style="text-align: center; color: #999; padding: 20px;">列表为空</p>

        <div class="demo-label" style="margin-top: 20px;">对象遍历</div>
        <ul class="demo-list" style="background: white; border-radius: 6px;">
          <li v-for="(value, key) in userObject" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </div>

      <div class="warning-box">
        <strong>key 的重要性：</strong>v-for 必须提供唯一的 key，帮助 Vue 识别每个节点的身份，
        在列表更新时进行高效的 DOM 复用。不要用 index 作为 key（列表顺序变化时会出问题）。
      </div>
    </div>

    <!-- ========== 8. 事件处理 ========== -->
    <div class="card">
      <h2 class="card-title">8. 事件处理</h2>
      
      <div class="demo-area">
        <div class="demo-label">基础事件与事件对象</div>
        <button class="btn btn-primary" @click="handleClick">点击我（查看控制台）</button>
        <button class="btn btn-secondary" @click="handleClickWithArg('参数A', $event)">带参数点击</button>
        
        <div class="demo-label" style="margin-top: 20px;">事件修饰符</div>
        <div @click="outerClick" style="padding: 20px; background: #e8f5e9; border-radius: 6px;">
          <p>外层 div（点击会触发 outerClick）</p>
          <button class="btn btn-secondary" @click.stop="innerClick">.stop 阻止冒泡</button>
          <button class="btn btn-secondary" @click.once="onceClick">.once 只触发一次</button>
        </div>

        <div class="demo-label" style="margin-top: 20px;">按键修饰符</div>
        <input 
          type="text" 
          class="input" 
          placeholder="按 Enter 提交" 
          @keyup.enter="handleEnter"
          @keyup.esc="handleEsc"
        >
        <p style="margin-top: 8px;">按键事件：{{ keyEventLog }}</p>
      </div>

      <div class="code-block">
        <span class="comment">&lt;!-- 事件修饰符 --&gt;</span><br>
        @click.stop = <span class="function">阻止冒泡</span><br>
        @click.prevent = <span class="function">阻止默认行为</span><br>
        @click.once = <span class="function">只触发一次</span><br>
        @click.capture = <span class="function">捕获模式</span><br>
        @click.self = <span class="function">只有 event.target 是自身时触发</span><br><br>
        <span class="comment">&lt;!-- 按键修饰符 --&gt;</span><br>
        @keyup.enter = <span class="function">回车键</span><br>
        @keyup.esc = <span class="function">ESC键</span><br>
        @keyup.space = <span class="function">空格键</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'

// ========== 1. 响应式数据 ==========
const refCount = ref(0)
const reactiveObj = reactive({
  name: '张三',
  age: 25,
  city: '北京'
})

// ========== 2. 模板语法 ==========
const message = ref('Hello Vue 3!')
const onceMessage = ref('这是初始值')
const rawHtml = ref('<span style="color: green; font-weight: bold;">这是绿色加粗文字</span>')
const inputValue = ref('')

// ========== 3. 计算属性 ==========
const firstName = ref('张')
const lastName = ref('三')
const fullName = computed(() => firstName.value + lastName.value)
const reversedName = computed(() => fullName.value.split('').reverse().join(''))

// ========== 4. 侦听器 ==========
const watchTarget = ref('')
const watchCount = ref(0)
const watchOldValue = ref('')
const watchNewValue = ref('')

watch(watchTarget, (newVal, oldVal) => {
  watchCount.value++
  watchOldValue.value = oldVal || '(空)'
  watchNewValue.value = newVal
})

const effectA = ref(1)
const effectB = ref(2)
const effectSum = ref(0)
const effectCount = ref(0)

watchEffect(() => {
  effectSum.value = effectA.value + effectB.value
  effectCount.value++
})

// ========== 5. Class 与 Style ==========
const isActive = ref(false)
const isLarge = ref(false)
const isRed = ref(false)
const fontSize = ref(16)
const fontColor = ref('#2c3e50')
const bgColor = ref('#ffffff')

// ========== 6. 条件渲染 ==========
const showContent = ref(true)

// ========== 7. 列表渲染 ==========
const newItem = ref('')
const todoList = ref([
  { id: 1, text: '学习 Vue 3 基础', done: true },
  { id: 2, text: '掌握组件化开发', done: false },
  { id: 3, text: '学习路由和状态管理', done: false }
])
let nextId = 4

function addTodo() {
  if (newItem.value.trim()) {
    todoList.value.push({
      id: nextId++,
      text: newItem.value.trim(),
      done: false
    })
    newItem.value = ''
  }
}

function removeTodo(id) {
  todoList.value = todoList.value.filter(item => item.id !== id)
}

const userObject = reactive({
  姓名: '李四',
  年龄: 28,
  职业: '前端工程师',
  城市: '深圳'
})

// ========== 8. 事件处理 ==========
const keyEventLog = ref('等待按键...')

function handleClick(event) {
  console.log('点击事件:', event)
  alert('点击了按钮！事件对象已输出到控制台')
}

function handleClickWithArg(arg, event) {
  console.log('参数:', arg, '事件:', event)
  alert(`参数: ${arg}`)
}

function outerClick() {
  alert('触发了外层 div 的点击事件')
}

function innerClick() {
  alert('触发了按钮点击，但不会冒泡到外层（.stop 生效）')
}

function onceClick() {
  alert('这个按钮只能点击一次！')
}

function handleEnter() {
  keyEventLog.value = '按下了 Enter 键！'
}

function handleEsc() {
  keyEventLog.value = '按下了 ESC 键！'
}
</script>

<style scoped>
.active {
  background-color: #42b883 !important;
  color: white;
}
.text-large {
  font-size: 24px;
}
.text-red {
  color: #e74c3c;
}
</style>
