<template>
  <div>
    <Nuxt />

    <a-button
      class="btn"
      type="primary"
      shape="circle"
      icon="logout"
      size="large"
      @click="logout"
    />
  </div>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>

<style scoped>
.btn{
    position: absolute;
    bottom: 20px;
    right: 20px;
}
</style>
