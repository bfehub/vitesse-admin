<template>
  <div class="login">
    <input v-model="formData.account" type="text" placeholder="账号" />
    <input v-model="formData.password" type="password" placeholder="密码" />
    <va-button v-if="!loading" type="success" @click="handleLogin">登录</va-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/modules/user'

const loading = ref(false)
const userStore = useUserStore()

const formData = reactive({
  account: 'admin',
  password: '123456',
})

const handleLogin = async () => {
  if (!formData.account || !formData.password) {
    return false
  }

  try {
    loading.value = true

    const userInfo = await userStore.login({
      password: formData.password,
      username: formData.account,
    })

    if (userInfo) {
      alert(`登录成功：${userInfo.username}`)
    }
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  input {
    padding: 10px;
    margin: 20px;
    border: 1px solid #333;
  }
}
</style>
