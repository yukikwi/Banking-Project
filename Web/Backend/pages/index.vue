<template>
  <div class="child-center text-center container">
    <div>
      <button class="thspp-button" @click="$router.push('/login')">
        Sign in
      </button>
      <button class="mt-1 thspp-button" @click="$router.push('/register')">
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
  }
}
</script>
