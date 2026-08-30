<!--
  Props 演示组件
  展示父组件向子组件传递数据的各种方式
-->
<template>
  <div class="demo-area">
    <div class="demo-label">子组件接收的 Props</div>
    <table class="demo-table">
      <tr>
        <th>Prop 名</th>
        <th>类型</th>
        <th>值</th>
      </tr>
      <tr>
        <td>title</td>
        <td><span class="tag tag-blue">String</span></td>
        <td>{{ title }}</td>
      </tr>
      <tr>
        <td>count</td>
        <td><span class="tag tag-green">Number</span></td>
        <td>{{ count }}</td>
      </tr>
      <tr>
        <td>isActive</td>
        <td><span class="tag tag-orange">Boolean</span></td>
        <td>{{ isActive ? 'true' : 'false' }}</td>
      </tr>
      <tr>
        <td>items</td>
        <td><span class="tag tag-red">Array</span></td>
        <td>{{ items.join(', ') }}</td>
      </tr>
      <tr>
        <td>config</td>
        <td><span class="tag tag-blue">Object</span></td>
        <td>{{ JSON.stringify(config) }}</td>
      </tr>
    </table>

    <div class="tip-box" style="margin-top: 12px;">
      子组件不能直接修改 props（单向数据流）。需要修改时，应该 emit 事件通知父组件修改。
    </div>
  </div>
</template>

<script setup>
/**
 * defineProps 用于声明组件接收的 props
 * 两种写法：
 * 1. 数组语法（简单）：defineProps(['title', 'count'])
 * 2. 对象语法（推荐，带类型校验和默认值）
 */
const props = defineProps({
  // 基础类型检查
  title: String,
  
  // 带必填和默认值
  count: {
    type: Number,
    required: true,
    default: 0
  },
  
  // 布尔值默认 false
  isActive: {
    type: Boolean,
    default: false
  },
  
  // 数组/对象的默认值必须用函数返回
  items: {
    type: Array,
    default: () => []
  },
  
  // 多种类型
  config: {
    type: [Object, String],
    default: () => ({})
  },
  
  // 自定义校验器
  status: {
    type: String,
    validator: (value) => {
      return ['success', 'warning', 'error'].includes(value)
    }
  }
})

// 在 JS 中通过 props.xxx 访问
console.log('Props:', props)
</script>
