<template>
  <div class="">
    <h1>指令</h1>
    <va-button v-role="RoleEnum.ADMIN">角色权限: ADMIN 可见</va-button>
    <va-button v-role="[RoleEnum.ADMIN, RoleEnum.TEST]">角色权限: ADMIN/TEST 可见</va-button>
    <va-button v-permission="'10001'">细分权限: 10001 可见</va-button>
    <va-button v-permission="['10001', '10002']">细分权限: 10001/10002 可见</va-button>
    <va-button v-permission="'20001'">细分权限: 20001 可见</va-button>
    <va-button v-permission="['20001', '20002']">细分权限: 20001/20002 可见</va-button>
    <h1>函数</h1>
    <va-button v-if="hasRole(RoleEnum.ADMIN)">角色权限: ADMIN 可见</va-button>
    <va-button v-if="hasRole([RoleEnum.ADMIN, RoleEnum.TEST])">角色权限: ADMIN/TEST 可见</va-button>
    <va-button v-if="hasPermission('10001')">细分权限: 10001 可见</va-button>
    <va-button v-if="hasPermission(['10001', '10002'])">细分权限: 10001/10002 可见</va-button>
    <va-button v-if="hasPermission('20001')">细分权限: 20001 可见</va-button>
    <va-button v-if="hasPermission(['20001', '20002'])">细分权限: 20001/20002 可见</va-button>
  </div>
</template>

<script lang="ts" setup>
import { RoleEnum } from '@/enums/roleEnum'
import { usePermission } from '@/hooks/usePermission'
const { hasRole, hasPermission } = usePermission()
</script>
