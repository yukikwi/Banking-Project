<template>
  <div class="background-main full-height">
    <Header :showlogo="false" class="text-white text-large width-100p text-right">
      <a-icon type="user" />
      <br>
      Hello, {{ $auth.user.User_FName }}
    </Header>
    <Nuxt />
    <Footer bg-color="white">
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :span="10">
          <button class="thspp-button w-100p">
            Credit
          </button>
        </a-col>
        <a-col :span="10">
          <button class="thspp-button w-100p">
            Debit
          </button>
        </a-col>
      </a-row>
    </Footer>
  </div>
</template>

<script>
export default {
  mounted () {
    document.body.classList = ''
  }
}
</script>

<style scoped>
.full-height{
  height: 100vh;
}
.w-100p{
  width: 100%;
}
.text-large{
  font-size: 25px;
}
</style>
