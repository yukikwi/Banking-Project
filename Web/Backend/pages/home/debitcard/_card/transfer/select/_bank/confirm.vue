<template>
  <div>
    <HomeHeader title="Review Transfer" />

    <div class="rounded-m container background-white pb-80px mb-2">
      <h2 class="text-muted text-center">
        Please check transaction details
      </h2>
      <a-divider class="boder-main" />

      <div v-if="loading" class="spinner">
        <a-spin>
          <a-icon slot="indicator" type="loading" style="font-size: 36px" spin />
        </a-spin>
      </div>
      <div v-else>
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
            <span class="text-muted">{{ carddata.data.Account_Type_Name }}</span>
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
              :src="require(`~/assets/img/bank/${$route.params.bank.toLowerCase().trim()}.png`)"
            />
          </a-col>
          <a-col :span="17">
            <span class="text-muted">{{ bankdata.title }}</span>
            <h2 class="text-bold mb-0">
              {{ $store.state.transaction.account_no }}
            </h2>
          </a-col>
        </a-row>

        <a-divider class="background-main" />

        <a-row>
          <a-col :span="7">
            <span class="text-bold text-medium">Amount</span>
          </a-col>
          <a-col class="text-right" :span="17">
            <span class="text-large text-bold">{{ $store.state.transaction.amount.toLocaleString() }} THB</span>
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
          {{ $store.state.transaction.note }}
        </div>

        <button v-if="error === false" class="mt-1 v-center thspp-button" @click="submit">
          Confirm
        </button>
        <a-alert v-else class="mt-1" message="Target account not found" type="error" show-icon />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: ['auth', 'isuserapprove', 'is_debitcard_exist', 'validate_transaction'],
  data () {
    return {
      loading: true,
      carddata: {},
      bankdata: {},
      fee: 0,
      mode: '',
      error: false
    }
  },
  async mounted () {
    if (this.$route.params.bank === 'BRB') {
      console.log('DOGE')
      const internalTargetExist = await this.$axios.post('api/transfer/debit/exist', {
        card_id: this.$store.state.transaction.account_no
      })
      this.error = (internalTargetExist.data.status === 404)
    }
    const carddata = await this.$axios.post('api/user/debitcard/history', {
      card_id: this.$route.params.card
    })
    if (carddata.data.status === 200) {
      this.carddata = carddata.data
      this.fee = this.$store.state.transaction.amount * (this.carddata.data.Interest_Rate / 100)
      this.loading = false
    } else {
      this.$router.replace('/home')
    }

    if (this.$route.params.bank !== 'BRB') {
      const bankdata = await this.$axios.get('api/bank/info/' + this.$route.params.bank)
      if (bankdata.data.status === 200) {
        this.bankdata = bankdata.data
        this.mode = 'external'
      } else {
        this.$router.replace('/home/debitcard/' + this.$route.params.card + '/transfer/select/' + this.$route.params.bank)
      }
    } else {
      this.bankdata = {
        title: 'Bara Bank'
      }
      this.mode = 'internal'
    }
  },
  methods: {
    async submit () {
      // API
      const result = await this.$axios.post('api/user/debitcard/transfer', {
        mode: this.mode,
        sender_addr: this.$route.params.card,
        target_addr: this.$store.state.transaction.account_no,
        amount: this.$store.state.transaction.amount,
        note: this.$store.state.transaction.note,
        target_bank: (this.mode === 'internal') ? null : this.bankdata.data.id
      })
      if (result.data.status === 200) {
        this.$router.push('/home/debitcard/' + this.$route.params.card + '/transfer/slip/' + result.data.data.insertId)
      } else if (result.data.status === 404) {
        this.$router.push('/police')
      } else {
        this.$router.push('/contact/sql_err')
      }
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
