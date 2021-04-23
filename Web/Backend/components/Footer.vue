<template>
  <div :class="['footer', sticky? 'sticky':'', rounded? 'rounded-top-m':'', container? 'container':'', 'background-'+bgColor]">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: 'main'
    },
    border: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: true
    },
    container: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: false
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
.sticky{
  position: fixed;
}
</style>
