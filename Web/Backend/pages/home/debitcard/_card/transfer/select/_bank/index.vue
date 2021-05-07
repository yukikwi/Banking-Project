<template>
  <div>
    <HomeHeader title="Transfer" />

    <div v-if="carddata !== null" class="rounded-m container background-white pb-80px mb-2">
      <h2 class="text-main">
        From
      </h2>

      <a-row type="flex">
        <a-col flex="auto">
          <a-avatar
            :src="require(`~/assets/img/bank/brb.png`)"
          />
        </a-col>
        <a-col :flex="18">
          <span class="text-muted">Saving account</span>
          <h2 class="text-bold mb-0">
            {{ $route.params.card }}
          </h2>
          <h2 class="mb-0">
            {{ carddata.data.balance }} ฿
          </h2>
        </a-col>
      </a-row>
    </div>

    <div v-if="bankdata !== null" class="rounded-m container background-white pb-80px full-height">
      <h2 class="text-main mb-0">
        To
      </h2>
      <a-row type="flex">
        <a-col flex="auto">
          <a-avatar
            :src="require(`~/assets/img/bank/${$route.params.bank.toLowerCase().trim()}.png`)"
          />
        </a-col>
        <a-col :flex="18">
          <span class="text-muted">{{ $route.params.bank }}</span>
          <h2 class="mb-0">
            {{ bankdata.title }}
          </h2>
        </a-col>
      </a-row>
      <a-divider class="mt-1 mb-1" />
      <a-input class="bara-input" placeholder="Account no" />
      <a-divider class="mt-1 mb-1" />
      <h2 class="text-main mb-0">
        Amount
      </h2>
      <a-row type="flex">
        <a-col flex="20">
          <a-input-number
            class="bara-input amount-input"
            size="large"
            :min="1"
            :max="carddata.data.balance"
          />
        </a-col>
        <a-col class="text-center" :flex="4">
          <span class="text-large"> THB </span>
        </a-col>
      </a-row>
      <a-divider class="mt-1 mb-1" />
      <h2 class="text-main mb-0">
        Note (Optional)
        <a-textarea
          v-model="value"
          placeholder="Enter note"
          :auto-size="{ minRows: 5, maxRows: 5 }"
          :maxLength="50"
        />
      </h2>
      <a-divider class="mt-1 mb-1" />
      <button class="mt-1 center thspp-button">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  data () {
    return {
      carddata: null,
      bankdata: null
    }
  },
  async mounted () {
    const carddata = await this.$axios.post('api/user/debitcard/info', {
      card_id: this.$route.params.card
    })
    if (carddata.data.status === 200) {
      this.carddata = carddata.data
    }

    if (this.$route.params.bank !== 'BRB') {
      const bankdata = await this.$axios.get('api/bank/info' + this.$route.params.bank)
      if (bankdata.data.status === 200) {
        this.bankdata = bankdata.data
      }
    } else {
      this.bankdata = {
        title: 'Bara Bank'
      }
    }
  }
}
</script>

<style scoped>
.text-bold{
  font-weight: bold;
}
.amount-input{
  width: 100%;
  text-align: right;
}
.bara-input{
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: var(--main-color) 1px solid;
}
.full-height{
  padding-bottom: 100px;
}
</style>

<style>
.amount-input input{
  text-align: right;
  font-size: 40px;
}
.amount-input .ant-input-number-handler-wrap{
  display: none;
}
.center{
  margin: auto;
  display: block;
}
</style>
