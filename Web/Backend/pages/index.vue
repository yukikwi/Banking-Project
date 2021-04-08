<template>
  <div class="child-center text-center container">
    <div>
      <button class="sign-in-butt" @click="$router.push('/login')">
        Sign in
      </button>
      <button class="mt-1 sign-in-butt" @click="$router.push('/register')">
        Sign up
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
  head () {
    return {
      title: 'Banking App'
    }
  }
}
</script>

<style scoped>
.sign-in-butt {
  height: 60px;
  width: 240px;
  border-radius: 30px;
  background-color: #1D3557;
}
</style>
