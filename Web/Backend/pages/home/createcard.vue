<template>
  <div>
    <HomeHeader title="Create" />

    <div class="rounded-top-m container background-white pb-80px full-height">
      <DebitcardV1 v-if="form.type == 'debit'" rotate="landspace" size="auto" :middle="true" />
      <CreditcardV1 v-else-if="form.type == 'credit'" rotate="landspace" size="auto" :middle="true" />
      <NewCard v-else rotate="landspace" size="auto" :middle="true" />

      <a-form-model
        ref="ruleForm"
        class="mt-1"
        :model="form"
        :label-col="{span: 8}"
        :wrapper-col="{span: 16}"
        :rules="rules"
        @submit="submit"
        @submit.native.prevent
      >
        <a-form-model-item ref="type" prop="type" label="Credit or Debit">
          <a-select v-model="form.type" required>
            <a-select-option value="debit">
              Debitcard
            </a-select-option>
            <a-select-option value="credit">
              CreditCard
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item ref="subtype" prop="subtype" label="Type">
          <a-select v-if="form.type === 'credit'" v-model="form.subtype" default-value="default" required>
            <a-select-option value="default">
              Default
            </a-select-option>
          </a-select>
          <a-select v-else-if="form.type === 'debit'" v-model="form.subtype" required>
            <a-select-option v-for="item in debitType" :key="item.Account_Type_ID" :value="item.Account_Type_ID">
              {{ item.Account_Type_Name }}
            </a-select-option>
          </a-select>
          <a-select v-else default-value="select" disabled>
            <a-select-option value="select">
              Select Debit or Credit first
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <button class="mt-1 thspp-button">
          Finish
        </button>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: ['auth', 'is_member', 'isuserapprove'],
  data () {
    return {
      form: {
        type: null,
        subtype: null
      },
      debitType: [],
      rules: {
        type: [
          { required: true, message: 'Please choose debit or credit', trigger: 'blur' }
        ],
        subtype: [
          { required: true, message: 'Please choose card type', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted () {
    this.debitType = (await this.$axios.get('/api/create/debittype')).data
  },
  methods: {
    submit () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const result = await this.$axios.post('/api/create/new', {
            type: this.form.type,
            subtype: this.form.subtype
          })
          if (result.data.status === 200) {
            this.$router.push('/home')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.thspp-button{
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
