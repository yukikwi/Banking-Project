<template>
  <div>
    <NuxtLink to="/home/creditcard">
      Creditcard
    </NuxtLink>
    <button @click="logout()">
      Logout
    </button>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: 'auth',
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
