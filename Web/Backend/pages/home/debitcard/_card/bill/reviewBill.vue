<template>
  <div>
    <HomeHeader title="Review Bill" />

    <div class="rounded-m container background-white pb-80px mb-2">
      <h2 class="text-muted text-center">
        Please check transaction details
      </h2>
      <a-divider class="boder-main" />
      <a-row>
        <a-col :span="4">
          <span class="text-bold text-medium">From</span>
        </a-col>
        <a-col :span="3">
          <a-avatar
            :src="require(`~/assets/img/bank/brb.png`)"
          />
        </a-col>
        <a-col :span="17">
          <span class="text-muted">Account No</span>
          <h2 class="text-bold mb-0">
            {{ $route.params.card }}
          </h2>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="4">
          <span class="text-bold text-medium">To</span>
        </a-col>
        <a-col :span="3">
          <a-avatar
            :src="require(`~/assets/img/logo.jpg`)"
          />
        </a-col>
        <a-col :span="17">
          <span class="text-muted">Transaction ID</span>
          <h2 class="text-bold mb-0">
            {{ $store.state.bill.transaction_id }}
          </h2>
        </a-col>
      </a-row>

      <a-divider class="background-main" />

      <a-row>
        <a-col :span="7">
          <span class="text-bold text-medium">Amount</span>
        </a-col>
        <a-col class="text-right" :span="17">
          <span v-if="amount !== null" class="text-large text-bold">{{ amount }} THB</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="7">
          <span class="text-bold text-medium">Fee</span>
        </a-col>
        <a-col class="text-right" :span="17">
          <span class="text-large text-bold">{{ fee }} THB</span>
        </a-col>
      </a-row>

      <a-divider class="background-main" />
      <a-row>
        <a-col :span="7">
          <span class="text-bold text-medium">Note</span>
        </a-col>
      </a-row>
      <div class="note mt-1 p-1">
        {{ $store.state.bill.note }}
      </div>

      <button v-if="error === false" class="mt-1 v-center thspp-button" @click="submit">
        Confirm
      </button>
      <a-alert v-else class="mt-1" message="Target account not found" type="error" show-icon />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: ['auth', 'is_member', 'isuserapprove', 'is_debitcard_exist'],
  data () {
    return {
      carddata: {},
      bankdata: {},
      fee: 10,
      mode: '',
      error: false,
      amount: null
    }
  },
  async mounted () {
    const price = await this.$axios.post('api/user/billprice', {
      transaction_id: this.$store.state.bill.transaction_id
    })
    const debitdata = await this.$axios.post('api/user/debitcard/history', {
      card_id: this.$route.params.card
    })
    console.log('debitBara', debitdata.data.data.balance)
    // console.log('statusBara', price.data.status)
    if (price.data.status === true) {
      if (price.data.data[0].Bill_Price + this.fee <= debitdata.data.data.balance) {
        this.amount = price.data.data[0].Bill_Price
      } else {
        this.amount = debitdata.data.data.balance - this.fee
      }
    }
    // console.log('Amount', this.amount)
  },
  methods: {
    async submit () {
      this.$store.commit('bill/submit', { transaction_id: this.$store.state.bill.transaction_id, amount: this.amount, note: this.$store.state.bill.note })
      // // console.log('ytyutyu', this.form)
      // // console.log('bara', this.$store.state.bill)
      const result = await this.$axios.post('api/user/debitcard/billpay', {
        sender_addr: this.$route.params.card,
        target_addr: this.$store.state.bill.transaction_id,
        amount: this.$store.state.bill.amount,
        note: this.$store.state.bill.note
      })
      this.$router.push('/home/debitcard/' + this.$route.params.card + '/bill/' + result.data.data.insertId)
    }
  }
}
</script>

<style scoped>
.text-muted{
  color: #717171;
}
.spinner{
  width: fit-content;
  margin: auto;
}
.note{
  border: var(--main-color) 2px solid;
  border-radius: 10px;
  min-height: 250px;
}
.v-center{
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
