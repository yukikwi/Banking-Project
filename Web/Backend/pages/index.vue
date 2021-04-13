<template>
  <div class="child-center text-center container">
    <div>
      <button class="button" @click="$router.push('/login')">
        Sign in
      </button>
      <button class="mt-1 button" @click="$router.push('/register')">
        Sign up
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
  middleware: 'islogin',
  head () {
    return {
      title: 'Banking App'
    }
  },
  data () {
    return ({
      user: this.$auth.user
    })
  },
  mounted () {
    console.log(this.user)
  }
}
</script>

<style scoped>
.button {
  height: 60px;
  width: 240px;
  border-radius: 30px;
  background-color: #1D3557;
  color: #fff;
  font-size: 35px;
}
.button:focus {
  outline: none;
  box-shadow: none;
}
</style>
