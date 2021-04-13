<template>
  <div class="child-center container">
    <div>
      <SignIn />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
  middleware: 'islogin',
  transition: 'page',
  head () {
    return {
      title: 'Sign in'
    }
  }
}
</script>
