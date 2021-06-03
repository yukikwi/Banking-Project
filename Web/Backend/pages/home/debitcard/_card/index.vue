<template>
  <div class="info-container">
    <Header :showlogo="false" class="text-white text-large width-100p animated mb-3">
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

    <DebitcardV1 :c-no="card_addr" rotate="landspace" size="small" :middle="false" class="center "  />

    <Footer class="animated" bg-color="white" >
      <InfoDebit />
    </Footer>
  </div>
</template>

<script>
export default {
  layout: 'User/creditcard',
  middleware: ['auth', 'is_member', 'isuserapprove', 'is_debitcard_exist'],
  data () {
    return ({
      card_addr: '',
      carddata: null
    })
  },
  async mounted () {
    const carddata = await this.$axios.post('api/user/debitcard/history', {
      card_id: this.$route.params.card
    })
    if (carddata.data.status === 200) {
      this.carddata = carddata.data.data
      // console.log('========== carddata =============')
      // console.log(this.carddata)
      this.card_addr = this.carddata.Account_ID
      // console.log(this.card_addr)
    }
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
