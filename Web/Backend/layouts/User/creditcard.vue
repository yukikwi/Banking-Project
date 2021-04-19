<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted () {
    document.body.classList = ''
    document.body.classList.add('background-main')
  }
}
</script>
