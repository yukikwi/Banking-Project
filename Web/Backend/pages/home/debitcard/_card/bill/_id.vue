<template>
 <div class="flex height-100vh">
    <div>
      <div class="rounded-m background-white slip">
        <div class="center background-main-lite p-1">
          <a-avatar
            :src="require(`~/assets/img/bank/brb.png`)"
          />
          <span class="ml-1 text-bold">Bara Bank</span>
        </div>
        <div class="text-center mt-2">
          <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" :style="{ fontSize: '50px' }" />
          <br>
          <span class="text-large text-bold">Transaction Successful</span>
          <br>
          <span class="text-medium text-muted">Barabara</span>
          <br>
          <br>
          <span class="text-large text-muted">Amount</span>
          <br>
          <span class="text-large text-bold">{{ $store.state.bill.amount }}</span>
          <span class="text-large">THB</span>
        </div>
        <a-divider class="background-main" />
        <div class="p-1">
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
              <span class="text-muted">Bara Bank</span>
              <h2 class="text-bold mb-0">
                {{ $route.params.card }}
              </h2>
            </a-col>
          </a-row>
          <a-row class="mt-1">
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
        </div>
        <a-divider class="background-main" />
        <div class="p-1">
          <a-row>
            <a-col :span="7">
              <span class="text-bold text-medium">Fee</span>
            </a-col>
            <a-col class="text-right" :span="17">
              <span class="text-large">{{ fee }} THB</span>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="7">
              <span class="text-bold text-medium">Note</span>
            </a-col>
            <a-col class="text-right" :span="17">
              <span class="text-large">{{ $store.state.bill.note }}</span>
            </a-col>
          </a-row>
        </div>
      </div>
      <button class="mt-1 thspp-button" @click="$router.push('/home')">
        Finish
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/creditcard',
  data () {
    return {
      slipdata: {},
      fee: 10
    }
  }
}
</script>

<style scoped>
.slip{
  width: 80%;
  margin: auto;
}
.center{
  width: 100%;
  text-align: center;
}
.flex{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.height-100vh{
  min-height: 100vh;
}
.spinner{
  width: fit-content;
  margin: auto;
}
.thspp-button {
    margin-left: auto;
    margin-right: auto;
    display: block;
}
</style>
