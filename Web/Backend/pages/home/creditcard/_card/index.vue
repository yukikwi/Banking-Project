<template>
  <div>
    <CreditcardV1 rotate="landspace" size="small" :middle="false" class="center" />
    <a-row class="mt-1" type="flex" justify="space-around" align="middle">
      <a-col :span="10">
        <button class="thspp-button-white w-100p">
          Overview
        </button>
      </a-col>
      <a-col :span="10">
        <button class="thspp-button-white w-100p">
          Overdue Balance
        </button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  layout: 'User/creditcardInfo',
  middleware: 'auth',
  mounted () {
    console.log(this.$auth.user)
  }
}
</script>

<style scoped>
.center{
  margin: auto;
}
</style>
