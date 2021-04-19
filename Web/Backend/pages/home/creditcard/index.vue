<template>
  <div class="cc-container">
    <CreditcardV1 :c-no="creditcardNumber" @click.native="$router.push('/home/creditcard/'+creditcardNumber)" />
  </div>
</template>

<script>
export default {
  layout: 'User/creditcard',
  middleware: 'auth',
  data () {
    return ({
      creditcardNumber: 'xxxx xxxx xxxx xxxx'
    })
  }
}
</script>

<style scoped>
.cc-container{
  height: calc(100% - 250px);
  position: relative;
}
</style>
