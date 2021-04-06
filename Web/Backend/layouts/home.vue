<template>
  <div class="verticle-middle text-center">
    <Logo size="large" class="child-center" />
    <div class="mt-2">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    document.body.classList.add('background-main')
  }
}
</script>
