<template>
  <div class="child-center container">
    <div class="rounded-m container background-white">
      <Register />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'register',
  transition: 'page',
  head () {
    return {
      title: 'Sign Up'
    }
  }
}
</script>
