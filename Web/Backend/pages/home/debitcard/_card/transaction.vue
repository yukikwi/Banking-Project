<template>
  <div>
    <HomeHeader title="Transaction" />

    <div class="rounded-top-m container background-white pb-80px full-height">
      <div class="w-60p">
        <ChartDoughnut v-if="carddata !== null" :text="doughnuttext" :income="carddata.data.account_in" :outcome="carddata.data.account_out" />
      </div>
      <h2 class="text-bold">
        Transaction
      </h2>

      <div v-for="item in date" :key="item">
        <h3>
          {{ $moment(item).fromNow() }}
        </h3>
        <div v-for="card_data in carddata.transaction.filter(data => data.Date.match(item))" :key="card_data.Trans_ID">
          <TransactionCardDebit :transaction-data="card_data" :card-id="$route.params.card" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: ['auth', 'isuserapprove', 'is_debitcard_exist'],
  data () {
    return ({
      carddata: null,
      doughnuttext: '',
      date: []
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
      for (let i = 0; i < carddata.data.transaction.length; i++) {
        const item = carddata.data.transaction[i]
        if (this.date.includes(item.Date) === false) {
          this.date.push(item.Date)
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
.w-60p{
  width: 60%;
  height: fit-content;
  margin: auto;
}
.full-height{
  min-height: calc(100vh - 77px);
}
</style>
