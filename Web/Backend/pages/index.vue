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
  head () {
    return {
      title: 'Banking App'
    }
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
</style>
