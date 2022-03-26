<template>
  <div class="menu">
    <ul>
      <li v-for="item of menus" :key="item.name">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { MenuItem } from '#/common'
import { getMenus } from '@/router/menus'
const menus = ref<MenuItem[]>([])
onMounted(async () => {
  menus.value = await getMenus()
})
</script>
