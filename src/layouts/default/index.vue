<template>
  <div class="layout">
    <LayoutHeader />
    <LayoutMenu />
    <LayoutContent />
    <LayoutFooter />
  </div>
</template>

<script lang="ts" setup>
import LayoutHeader from './header/index.vue'
import LayoutMenu from './menu/index.vue'
import LayoutContent from './content/index.vue'
import LayoutFooter from './footer/index.vue'
</script>
