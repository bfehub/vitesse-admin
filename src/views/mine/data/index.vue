<template>
  <div class="">
    <span></span>
    <va-button v-auth="RoleEnum.TEST">细粒度权限1</va-button>
    <va-button v-auth="[RoleEnum.SUPER, RoleEnum.TEST]">细粒度权限2</va-button>
  </div>
</template>

<script lang="ts" setup>
import { RoleEnum } from '@/enums/roleEnum'
</script>
