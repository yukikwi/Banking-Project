<template>
  <div>
    <img v-if="size == 'small'" class="img-fluid img-rounded size-50-50" src="~/assets/img/logo.jpg">
    <img v-if="size == 'normal'" class="img-fluid img-rounded size-100-100" src="~/assets/img/logo.jpg">
    <img v-if="size == 'large'" class="img-fluid img-rounded size-150-150" src="~/assets/img/logo.jpg">
  </div>
</template>

<script>

export default ({
  props: {
    size: {
      type: String,
      default: 'normal'
    }
  }
})
</script>
