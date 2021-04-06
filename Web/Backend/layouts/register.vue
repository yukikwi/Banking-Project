<template>
  <div>
    <div class="mt-1 font-header">
      <a-icon type="left" />
      Create Account
    </div>
    <div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    document.body.classList.add('background-register')
  }
}
</script>
