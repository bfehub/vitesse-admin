<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { SvgIcon } from '@/components/Icon'
import { getError, getSuccess, getError404, getCancel } from '@/api/test'
getError()
getSuccess()
getError404()
getCancel()
getCancel()
getCancel()
</script>

<template>
  <SvgIcon name="arrow-up" />
  <SvgIcon name="arrow-right" />
  <SvgIcon name="arrow-down" />
  <SvgIcon name="arrow-left" />
  <va-button>默认按钮</va-button>
  <va-button type="success">成功按钮</va-button>
  <va-button type="warning">警告按钮</va-button>
  <va-button type="danger">危险按钮</va-button>
  <h1 class="text-center bg-red-500">Windi</h1>
  <img alt="Vue logo" src="./assets/images/logo.png" />
</template>

<style>
#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
