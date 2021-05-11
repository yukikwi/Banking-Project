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

        <div v-if="loading" class="spinner">
          <a-spin>
            <a-icon slot="indicator" type="loading" style="font-size: 36px" spin />
          </a-spin>
        </div>
        <div v-else>
          <div class="text-center mt-2">
            <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" :style="{ fontSize: '50px' }" />
            <br>
            <span class="text-large text-bold">Transaction Successful</span>
            <br>
            <span class="text-medium text-muted">{{ $moment(slipdata.data.Trans_DateTime).format('Do MMM YY, HH:mm') }}</span>
            <br>
            <br>
            <span class="text-large text-muted">Amount</span>
            <br>
            <span class="text-large text-bold">{{ slipdata.data.Trans_Amount.toLocaleString() }}</span>
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
                  v-if="slipdata.data.User_Sender_Internal_AccountID !== null"
                  :src="require(`~/assets/img/bank/brb.png`)"
                />
                <a-avatar
                  v-else-if="slipdata.data.User_Sender_External_AccountID !== null"
                  :src="require(`~/assets/img/bank/${slipdata.data.External_BankShortName}.png`)"
                />
                <a-avatar v-else>
                  Unknow
                </a-avatar>
              </a-col>
              <a-col :span="17">
                <span v-if="slipdata.data.User_Sender_Internal_AccountID !== null" class="text-muted">Bara Bank</span>
                <span v-else-if="slipdata.data.User_Sender_External_AccountID !== null" class="text-muted">{{ slipdata.data.Account_Type_Name }}</span>
                <h2 v-if="slipdata.data.User_Sender_Internal_AccountID !== null" class="text-bold mb-0">
                  {{ slipdata.data.User_Sender_Internal_AccountID }}
                </h2>
                <h2 v-else-if="slipdata.data.User_Sender_External_AccountID !== null" class="text-bold mb-0">
                  {{ slipdata.data.User_Sender_External_AccountID }}
                </h2>
                <h2 v-else class="text-bold mb-0">
                  Unknow
                </h2>
              </a-col>
            </a-row>
            <a-row class="mt-1">
              <a-col :span="4">
                <span class="text-bold text-medium">To</span>
              </a-col>
              <a-col :span="3">
                <a-avatar
                  v-if="slipdata.data.User_Target_Internal_AccountID !== null"
                  :src="require(`~/assets/img/bank/brb.png`)"
                />
                <a-avatar
                  v-else-if="slipdata.data.User_Target_External_AccountID !== null"
                  :src="require(`~/assets/img/bank/${slipdata.data.External_BankShortName.toLowerCase()}.png`)"
                />
                <a-avatar v-else>
                  Unknow
                </a-avatar>
              </a-col>
              <a-col :span="17">
                <span v-if="slipdata.data.User_Target_Internal_AccountID !== null" class="text-muted">Bara Bank</span>
                <span v-else-if="slipdata.data.User_Target_External_AccountID !== null" class="text-muted">{{ slipdata.data.External_BankName }}</span>
                <h2 v-if="slipdata.data.User_Target_Internal_AccountID !== null" class="text-bold mb-0">
                  {{ slipdata.data.User_Target_Internal_AccountID }}
                </h2>
                <h2 v-else-if="slipdata.data.User_Target_External_AccountID !== null" class="text-bold mb-0">
                  {{ slipdata.data.User_Target_External_AccountID }}
                </h2>
                <h2 v-else class="text-bold mb-0">
                  Unknow
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
                <span class="text-large">{{ slipdata.data.Trans_Fee }} THB</span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="7">
                <span class="text-bold text-medium">Note</span>
              </a-col>
              <a-col class="text-right" :span="17">
                <span class="text-large">{{ slipdata.data.Trans_Note }}</span>
              </a-col>
            </a-row>
          </div>
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
  middleware: ['auth', 'isuserapprove', 'is_debitcard_exist'],
  data () {
    return {
      slipdata: {},
      loading: true
    }
  },
  async mounted () {
    const slipdata = await this.$axios.post('api/user/debitcard/slip', {
      transaction: this.$route.params.id
    })
    if (slipdata.data.status === 200) {
      this.slipdata = slipdata.data
      this.loading = false
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
