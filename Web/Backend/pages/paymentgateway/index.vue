<template>
  <div>
    <Loading />
    <div class="main">
      <CreditcardV1 class="card" rotate="landspace" size="normal" :shadow="true" :c-no="form.cc" />
      <a-card class="pay-container">
        <a-alert
          v-if="error !== false"
          class="mt-1 mb-1"
          message="Error"
          :description="error"
          type="error"
          show-icon
        />
        <a-alert
          v-if="success !== false"
          class="mt-1 mb-1"
          message="Success"
          :description="success"
          type="success"
          show-icon
        />
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
              placeholder="XXXX-XXXX-XXXX-XXXX"
              required
              @change="cardNumber"
            />
          </a-form-item>

          <a-form-item
            label="Shop"
            :label-col="{span: 9}"
            :wrapper-col="{span: 15}"
          >
            <a-select :default-value="shopList[0]" @change="setShopID" style="width: 120px" >
              <a-select-option v-for="data in shopList" :key="data.Target_ID" :value="data.Target_ID">
                {{ data.Target_Name }}
              </a-select-option>
            </a-select>
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
    // console.log(v)
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
        price: 0,
        shop: null
      },
      cNo: 'xxxxxxxxxxxxxxxx',
      error: false,
      success: false,
      shopList: []
    })
  },
  async mounted () {
    const shopList = await this.$axios.get('api/gateway/target/list')
    if (shopList.data.status === 200) {
      this.shopList = shopList.data.list
    } else {
      this.error = 'Payment gateway not found any shop'
    }
  },
  methods: {
    async handleSubmit (e) {
      // Clean
      this.success = false
      this.error = false
      // Prevent form action
      e.preventDefault()
      // Show loading
      this.$store.commit('trigger', 'loading')
      // Validate card
      const validatestatus = await this.$axios.post('api/gateway/validate', {
        cardNumber: this.form.cc,
        expire: this.form.expire,
        fname: this.form.fname,
        lname: this.form.lname
      })
      if (validatestatus.data.status === 200) {
        // Create transaction
        // console.log(this.form.shop)
        const checkout = await this.$axios.post('api/gateway/pay', {
          cardNumber: this.form.cc,
          expire: this.form.expire,
          fname: this.form.fname,
          lname: this.form.lname,
          amount: Number(this.form.price),
          target: this.form.shop
        })
        if (checkout.data.status === 200) {
          this.success = 'Transaction Success'
        }
        if (checkout.data.status === 403) {
          this.error = 'Your credit is not enough'
        }
        if (checkout.data.status === 404) {
          this.error = 'Please check your creditcard info'
        }
        if (checkout.data.status === 500) {
          this.error = 'Database error'
        }
        // console.log(checkout)
      } else {
        // Show result
        this.error = 'Please check your creditcard info'
      }
      this.$store.commit('trigger', 'loading')
    },
    cardNumber () {
      // CC format
      const temp = ccformat(this.form.cc)
      if (temp !== this.form.cc) {
        this.form.cc = temp
      }
    },
    setShopID (value) {
      // console.log(value)
      this.form.shop = value
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
