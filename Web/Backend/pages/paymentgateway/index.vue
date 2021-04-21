<template>
  <div>
    <Loading />
    <div class="main">
      <CreditcardV1 class="card" rotate="landspace" size="normal" :shadow="true" :c-no="form.cc" />
      <a-card class="pay-container">
        <a-form-model
          :model="form"
          class="mt-1"
          @submit="handleSubmit"
        >
          <a-form-item
            label="Firstname"
            :label-col="{span: 9}"
            :wrapper-col="{span: 15}"
          >
            <a-input
              v-model="form.fname"
              required
            />
          </a-form-item>
          <a-form-item
            label="Lastname"
            :label-col="{span: 9}"
            :wrapper-col="{span: 15}"
          >
            <a-input
              v-model="form.lname"
              required
            />
          </a-form-item>
          <a-form-item
            label="CreditCard ID"
            :label-col="{span: 9}"
            :wrapper-col="{span: 15}"
          >
            <a-input
              v-model="form.cc"
              :max-length="20"
              style="width: 100%;"
              @change="cardNumber"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              required
            />
          </a-form-item>

          <a-form-item
            label="Expire"
            :label-col="{span: 9}"
            :wrapper-col="{span: 15}"
          >
            <a-month-picker
              v-model="form.expire"
              format="MM/YYYY"
              style="width: 100%;"
              required
            />
          </a-form-item>

          <a-form-item
            label="Price"
            :label-col="{span: 9}"
            :wrapper-col="{span: 15}"
          >
            <a-input
              v-model="form.price"
              style="width: 100%;"
              required
            />
          </a-form-item>

          <a-button class="w-100p" html-type="submit" type="primary">
            Submit
          </a-button>
        </a-form-model>
      </a-card>
    </div>
  </div>
</template>

<script>
function ccformat (value) {
  let v = value.match(/\d+/g)
  if (v === null) {
    console.log(v)
    return ''
  } else {
    v = v.join('')
  }
  v = v.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ''
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join('-')
  } else {
    return value
  }
}

export default {
  data () {
    return ({
      form: {
        fname: '',
        lname: '',
        cc: '',
        expire: '',
        price: 0
      },
      cNo: 'xxxxxxxxxxxxxxxx'
    })
  },
  methods: {
    handleSubmit (e) {
      // Prevent form action
      e.preventDefault()
      // Show loading
      this.$store.commit('trigger', 'loading')
      // Validate card
      // Update card balance
      // Show result
    },
    cardNumber () {
      // CC format
      const temp = ccformat(this.form.cc)
      if (temp !== this.form.cc) {
        this.form.cc = temp
      }
    }
  }
}
</script>

<style scoped>
.pay-container{
  width: 100%;
}
.main{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.card{
  position: relative;
  transform: scale(0.8);
  top: 50px;
  z-index: 1;
}
.w-100p{
  width: 100%;
}
</style>
