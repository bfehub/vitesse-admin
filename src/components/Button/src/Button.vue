<template>
  <div class="button" :class="$props.type">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type Type = 'default' | 'success' | 'warning' | 'danger'

export default defineComponent({
  name: 'VaButton',
  props: {
    type: {
      type: String as PropType<Type>,
      default: 'default',
    },
  },
})
</script>

<style lang="scss">
.button {
  box-sizing: border-box;
  display: inline-block;
  padding: 12px 20px;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #606266;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  transition: 0.1s;
  appearance: none;

  &.success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }

  &.warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
  }

  &.danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
  }
}
</style>
