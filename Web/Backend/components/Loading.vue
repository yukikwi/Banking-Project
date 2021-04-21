<template>
  <div>
    <div class="loading-state" v-if="showLoading">
      <a-spin class="loading-icon">
        <a-icon slot="indicator" type="loading" style="font-size: 50px" spin />
      </a-spin>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showLoading () {
      return this.$store.state.loading
    }
  }
}
</script>

<style scoped>
.loading-state{
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
}
.loading-icon{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
