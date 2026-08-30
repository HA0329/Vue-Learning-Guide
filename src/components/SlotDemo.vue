<!--
  插槽演示组件
  展示 Vue 3 的三种插槽：默认插槽、具名插槽、作用域插槽
-->
<template>
  <div class="demo-area">
    <div class="demo-label">子组件 - 插槽内容由父组件决定</div>
    
    <!-- 默认插槽 -->
    <div style="border: 2px solid #42b883; border-radius: 6px; padding: 12px; margin-bottom: 12px;">
      <strong>默认插槽：</strong>
      <slot>这是默认内容（父组件没传时显示）</slot>
    </div>
    
    <!-- 具名插槽 -->
    <div style="border: 2px solid #35495e; border-radius: 6px; padding: 12px; margin-bottom: 12px;">
      <strong>头部插槽 (header)：</strong>
      <slot name="header"></slot>
    </div>
    
    <div style="border: 2px solid #e67e22; border-radius: 6px; padding: 12px; margin-bottom: 12px;">
      <strong>底部插槽 (footer)：</strong>
      <slot name="footer"></slot>
    </div>
    
    <!-- 作用域插槽：子组件向父组件传递数据 -->
    <div style="border: 2px solid #9b59b6; border-radius: 6px; padding: 12px;">
      <strong>作用域插槽 (item)：</strong>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <!-- 把 item 和 index 传递给父组件 -->
          <slot name="item" :item="item" :index="index">
            {{ item }}（默认渲染）
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const list = ref(['苹果', '香蕉', '橙子'])
</script>
