<template>
  <div class="child-center container">
    <div class="rounded-m container background-white">
      <Register1 v-if="$route.params.step == 1" />
      <Register2 v-if="$route.params.step == 2" />
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
