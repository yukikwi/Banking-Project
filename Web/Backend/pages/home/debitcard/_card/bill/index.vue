<template>
  <div>
    <HomeHeader title="Bill" />

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
        <a-divider class="mt-1 mb-1" />
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          @submit="submit"
          @submit.native.prevent
        >
          <a-form-model-item ref="transaction_id" label="Transaction ID" prop="transaction_id">
            <a-input
              v-model="transaction_id"
              class="bara-input"
              placeholder="Transaction ID"
              @change="bill_check"
            />
          </a-form-model-item>
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
        transaction_id: null
      },
      rules: {
        transaction_id: [
          { pattern: '^[0-9.-]*$', message: 'Transaction ID. must be number', trigger: 'blur' },
          { required: true, message: 'Please input target Transaction ID.', trigger: 'blur' },
          { min: 10, max: 10, message: 'Length should be 10', trigger: 'blur' },
          { validator: this.bill_check, message: 'Transaction ID Not correct', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: 'Please input Transaction ID.', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted () {
    const carddata = await this.$axios.post('api/user/debitcard/history', {
      card_id: this.$route.params.card
    })
    if (carddata.data.status === 200) {
      this.carddata = carddata.data
    } else {
      this.$router.replace('/home')
    }
    this.loading = false
  },
  methods: {
    submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.commit('bill/submit', this.form)
          // console.log('ytyutyu', this.form)
          // console.log('bara', this.$store.state.bill)
          this.$router.push(this.$route.path + '/reviewBill')
        } else {
          return false
        }
      })
    },
    async bill_check (rule, value, callback) {
      const res = await this.$axios.post('api/user/tracsactionbill', {
        transaction_id: value
      })
      if (res.data.status === true) {
        return true
      }
      callback(new Error('error'))
      return false
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
