<template>
  <div class="menu">
    <ul>
      <li v-for="item of menus" :key="item.name" class="bg-blue-100">
        <router-link :to="item.path">{{ item.name }}</router-link>
        <ul>
          <li v-for="child of item.children" :key="child.name" class="bg-red-200">
            <router-link :to="child.path">{{ child.name }}</router-link>
          </li>
        </ul>
      </li>
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

<style lang="scss" scoped>
.menu {
  width: 120px;

  li {
    padding: 10px;
    border-bottom: 1px solid #ccc;

    a {
      color: blue;
      text-decoration: underline;
    }
  }
}
</style>
