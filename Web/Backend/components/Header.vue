<template>
  <div :class="[border? 'rounded-bottom-m' : '', 'container', 'background-'+bgColor]">
    <Logo v-if="showlogo" size="small" />
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
    showlogo: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.background-trans{
  background: none;
}
</style>
