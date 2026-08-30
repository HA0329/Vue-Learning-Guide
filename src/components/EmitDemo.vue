<!--
  Emit 演示组件
  展示子组件向父组件发送事件
-->
<template>
  <div class="demo-area">
    <div class="demo-label">子组件 - 通过 emit 与父组件通信</div>
    <p>当前内部计数：{{ innerCount }}</p>
    
    <button class="btn btn-primary" @click="handleIncrement">+1（emit increment）</button>
    <button class="btn btn-secondary" @click="handleDecrement">-1（emit decrement）</button>
    <button class="btn btn-danger" @click="handleReset">重置（emit reset，带参数）</button>
    
    <div class="code-block" style="margin-top: 12px;">
      <span class="keyword">const</span> emit = <span class="function">defineEmits</span>([<span class="string">'increment'</span>, <span class="string">'decrement'</span>, <span class="string">'reset'</span>])<br><br>
      <span class="keyword">function</span> <span class="function">handleIncrement</span>() {<br>
      &nbsp;&nbsp;innerCount.value++<br>
      &nbsp;&nbsp;<span class="function">emit</span>(<span class="string">'increment'</span>, innerCount.value)<br>
      }
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/**
 * defineEmits 用于声明组件可以触发的事件
 * 数组语法：defineEmits(['increment', 'decrement'])
 * 对象语法（带校验）：defineEmits({
 *   increment: (value) => typeof value === 'number',
 *   decrement: null  // null 表示不校验
 * })
 */
const emit = defineEmits(['increment', 'decrement', 'reset'])

const innerCount = ref(0)

function handleIncrement() {
  innerCount.value++
  // 第一个参数是事件名，后面的参数都会传递给父组件的监听器
  emit('increment', innerCount.value)
}

function handleDecrement() {
  innerCount.value--
  emit('decrement', innerCount.value)
}

function handleReset() {
  innerCount.value = 0
  // 可以传递多个参数
  emit('reset', 0, '重置完成')
}
</script>
