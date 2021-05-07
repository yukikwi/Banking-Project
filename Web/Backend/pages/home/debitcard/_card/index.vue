<template>
  <div class="info-container">
    <Header :showlogo="false" class="text-white text-large width-100p animated">
      <a-row>
        <a-col :span="12">
          <a-icon type="left" @click.native="$router.back()" />
        </a-col>
        <a-col class="text-right" :span="12">
          <span class="small">Credit limit</span>
          <br>
          ฿{{ Number(25000).toLocaleString() }}
        </a-col>
      </a-row>
    </Header>

    <DebitcardV1 rotate="landspace" size="small" :middle="false" class="center" />

    <Footer class="animated" bg-color="white">
      <InfoCard />
    </Footer>
  </div>
</template>

<script>
export default {
  layout: 'User/creditcard',
  middleware: ['auth', 'isuserapprove'],
  transition (to, from) {
    if (from.name === 'home-creditcard') {
      return 'delay'
    } else {
      return 'page'
    }
  },
  beforeMount () {
    this.$store.commit('animate/disable', 'cc_animate')
  }
}
</script>

<style scoped>
.info-container{
  position: absolute;
  width: 100%;
  height: 100vh;
}
.center{
  margin: auto;
  width: fit-content;
}
.cc-container{
  height: calc(100% - 250px);
  position: relative;
}
.full-height{
  height: 100vh;
}
.w-100p{
  width: 100%;
}
.text-large{
  font-size: 25px;
}
.small{
  font-size: 14px;
}
.animated{
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-name: opacity;
  animation-fill-mode: forwards;
}

@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
