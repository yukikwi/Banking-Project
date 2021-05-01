<template>
  <div>
    <div class="container text-white text-large width-100p">
      <a-row>
        <a-col :span="12" @click.native="$router.back()">
          <a-icon type="left" />
        </a-col>
        <a-col class="text-right" :span="12">
          Transaction
        </a-col>
      </a-row>
    </div>

    <div class="rounded-top-m container background-white pb-80px">
      <div class="w-60p">
        <ChartDoughnut :text="doughnuttext" />
      </div>
      <h2>Transaction</h2>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  data () {
    return ({
      carddata: {},
      doughnuttext: ''
    })
  },
  async mounted () {
    console.log(this.$route.params.card)
    const carddata = await this.$axios.post('api/user/debitcard/info', {
      card_id: this.$route.params.card
    })
    if (carddata.data.status === 200) {
      this.carddata = carddata.data
      this.doughnuttext = this.carddata.data.balance + '฿'
      console.log(this.doughnuttext)
    }
  }
}
</script>

<style scoped>
.w-60p{
  width: 60%;
  height: fit-content;
  margin: auto;
}
</style>
