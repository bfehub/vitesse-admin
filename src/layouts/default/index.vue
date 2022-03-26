<template>
  <div class="h-full flex flex-col">
    <LayoutHeader />
    <div class="flex flex-1">
      <LayoutMenu />
      <div class="flex flex-col flex-1">
        <LayoutContent />
        <LayoutFooter />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayoutHeader from './header/index.vue'
import LayoutMenu from './menu/index.vue'
import LayoutContent from './content/index.vue'
import LayoutFooter from './footer/index.vue'
</script>
