<template>
  <div>
    <HomeHeader title="Card Invoice" />

    <div class="rounded-top-m container background-white pb-80px full-height">
      Bara
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: ['auth', 'is_member', 'isuserapprove', 'is_creditcard_exist'],
  mounted () {
    this.$axios.get('/api/user/creditcard/invoice/' + this.$route.params.card)
  }
}
</script>
