<template>
  <div :class="['footer', 'rounded-top-m', 'container', 'background-'+bgColor]">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: 'main'
    }
  }
}
</script>

<style scoped>
.footer{
    position: absolute;
    bottom: 0px;
    width: 100%;
}
</style>
