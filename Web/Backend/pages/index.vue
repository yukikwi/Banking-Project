<template>
  <div class="child-center text-center container">
    <div>
      <a-button type="primary" block @click="$router.push('/login')">
        Sign in
      </a-button>
      <a-button class="mt-1" block @click="$router.push('/register')">
        Sign up
      </a-button>
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
