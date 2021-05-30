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
          <span class="text-large text-bold">{{ amount }} THB</span>
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
  middleware: ['auth', 'isuserapprove', 'is_debitcard_exist'],
  data () {
    return {
      carddata: {},
      bankdata: {},
      fee: 0,
      mode: '',
      error: false,
      amount: null
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
