<!--
  v-model 演示组件
  展示自定义组件的 v-model 用法
  Vue 3 中 v-model 默认使用 modelValue prop 和 update:modelValue 事件
-->
<template>
  <div class="demo-area">
    <div class="demo-label">自定义 v-model 组件</div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <button class="btn btn-secondary" @click="decrease">-</button>
      <span style="font-size: 24px; font-weight: bold; min-width: 60px; text-align: center;">{{ modelValue }}</span>
      <button class="btn btn-primary" @click="increase">+</button>
    </div>
    <p style="margin-top: 8px; font-size: 13px; color: #666;">
      这是一个自定义的数字输入组件，父组件用 v-model 绑定
    </p>
  </div>
</template>

<script setup>
/**
 * Vue 3 v-model 原理：
 * 父组件：<CustomInput v-model="value" />
 * 等价于：<CustomInput :modelValue="value" @update:modelValue="value = $event" />
 * 
 * 支持多个 v-model：
 * <UserForm v-model:name="userName" v-model:email="userEmail" />
 */

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])

function increase() {
  emit('update:modelValue', props.modelValue + 1)
}

function decrease() {
  emit('update:modelValue', props.modelValue - 1)
}
</script>
