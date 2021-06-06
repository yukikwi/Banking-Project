<template>
  <div class="vh100 background-register">
    <div class="mt-1 font-header">
      <a-icon type="left" @click="$router.replace('/')" />
      Create Account
    </div>
    <div>
      <Nuxt />
    </div>
  </div>
</template>

<style scoped>
.vh100{
  min-height: 100vh;
}
</style>
