<template>
  <div>
    <HomeHeader title="Transaction" />

    <div class="rounded-top-m container background-white pb-80px full-height">
      <a-row v-if="carddata !== null">
        <a-col :span="12">
          <span>Highest</span>
          <br>
          <span class="text-large text-bold">
            {{ carddata.data.highest }}
          </span>
        </a-col>
        <a-col class="text-right" :span="12">
          <span>Lowest</span>
          <br>
          <span class="text-large text-bold">
            {{ carddata.data.lowest }}
          </span>
        </a-col>
      </a-row>
      <div class="w-60p">
        <ChartBar />
      </div>
      <h2 class="text-bold">Transaction</h2>

      <div v-for="item in date" :key="item">
        <h3>{{ $moment(item).fromNow() }}</h3>
        <div v-for="data in carddata.transaction.filter(data => data.date.match(item))" :key="data.CardHistory_ID">
          <TransactionCardCredit :transaction-data="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  data () {
    return ({
      carddata: null,
      doughnuttext: '',
      date: []
    })
  },
  async mounted () {
    const carddata = await this.$axios.post('api/user/creditcard/info', {
      card_id: this.$route.params.card
    })
    if (carddata.data.status === 200) {
      this.carddata = carddata.data
      for (let i = 0; i < carddata.data.transaction.length; i++) {
        const item = carddata.data.transaction[i]
        if (this.date.includes(item.date) === false) {
          this.date.push(item.date)
        }
      }
      console.log(this.date)
    }
  }
}
</script>

<style scoped>
.text-bold{
  font-weight: bold;
}
.full-height{
  min-height: calc(100vh - 77px);
}
</style>
