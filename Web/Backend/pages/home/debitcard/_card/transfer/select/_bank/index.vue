<template>
  <div>
    <HomeHeader title="Transfer" />

    <div class="rounded-m container background-white pb-80px mb-2">
      <h2 class="text-main">
        From
      </h2>
      <div v-if="loading" class="spinner">
        <a-spin>
          <a-icon slot="indicator" type="loading" style="font-size: 36px" spin />
        </a-spin>
      </div>
      <div v-else>
        <a-row type="flex">
          <a-col flex="auto">
            <a-avatar
              :src="require(`~/assets/img/bank/brb.png`)"
            />
          </a-col>
          <a-col :flex="18">
            <span class="text-muted">{{ carddata.data.Account_Type_Name }}</span>
            <h2 class="text-bold mb-0">
              {{ $route.params.card }}
            </h2>
            <h2 class="mb-0">
              {{ carddata.data.balance.toLocaleString() }} ฿
            </h2>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="rounded-m container background-white pb-80px full-height">
      <h2 class="text-main mb-0">
        To
      </h2>
      <div v-if="loading" class="spinner">
        <a-spin>
          <a-icon slot="indicator" type="loading" style="font-size: 36px" spin />
        </a-spin>
      </div>
      <div v-else>
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
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          @submit="submit"
          @submit.native.prevent
        >
          <a-form-model-item ref="account_no" label="Account no" prop="account_no">
            <a-input
              v-model="form.account_no"
              class="bara-input"
              placeholder="Account no"
              @change="account_no"
            />
          </a-form-model-item>
          <a-divider class="mt-1 mb-1" />
          <h2 class="text-main mb-0">
            Amount
          </h2>
          <a-row type="flex">
            <a-col flex="20">
              <a-form-model-item ref="amount" prop="amount">
                <a-input-number
                  v-model="form.amount"
                  class="bara-input amount-input"
                  size="large"
                  :min="1"
                  :max="carddata.data.balance"
                />
              </a-form-model-item>
            </a-col>
            <a-col class="text-center" :flex="4">
              <span class="text-large"> THB </span>
            </a-col>
          </a-row>
          <a-divider class="mt-1 mb-1" />
          <h2 class="text-main mb-0">
            Note (Optional)
            <a-form-model-item ref="note" prop="note">
              <a-textarea
                v-model="form.note"
                placeholder="Enter note"
                :auto-size="{ minRows: 5, maxRows: 5 }"
                :max-length="50"
              />
            </a-form-model-item>
          </h2>
          <a-divider class="mt-1 mb-1" />
          <button class="mt-1 center thspp-button" @click="submit">
            Next
          </button>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: ['auth', 'isuserapprove', 'is_debitcard_exist'],
  data () {
    return {
      carddata: null,
      bankdata: null,
      loading: true,
      form: {
        note: '',
        amount: null,
        account_no: null
      },
      rules: {
        account_no: [
          { pattern: '^[0-9.-]*$', message: 'Account no. must be number', trigger: 'blur' },
          { required: true, message: 'Please input target account no.', trigger: 'blur' },
          { min: 13, max: 13, message: 'Length should be 10', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: 'Please input target account no.', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted () {
    const carddata = await this.$axios.post('api/user/debitcard/info', {
      card_id: this.$route.params.card
    })
    if (carddata.data.status === 200) {
      this.carddata = carddata.data
    } else {
      this.$router.replace('/home')
    }

    if (this.$route.params.bank !== 'BRB') {
      const bankdata = await this.$axios.get('api/bank/info/' + this.$route.params.bank)
      if (bankdata.data.status === 200) {
        this.bankdata = bankdata.data
      } else {
        this.$router.replace('/home/debitcard/' + this.$route.params.card + '/transfer/select/' + this.$route.params.bank)
      }
    } else {
      this.bankdata = {
        title: 'Bara Bank'
      }
    }
    this.loading = false
  },
  methods: {
    submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.commit('transaction/submit', this.form)
          this.$router.push({
            path: this.$route.path + '/confirm'
          })
        } else {
          return false
        }
      })
    },
    account_no () {
      this.form.account_no = this.form.account_no.replace(/(\d{3})(\d{1})(\d{5})(\d{1})/, '$1-$2-$3-$4')
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
.spinner{
  width: fit-content;
  margin: auto;
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
