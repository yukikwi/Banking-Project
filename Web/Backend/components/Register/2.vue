<template>
  <div>
    <a-alert v-if="alert != false" type="error" :message="alert" banner />
    <a-form :form="form" @submit="register">
      <a-form-item>
        <label><span class="text-red">*</span> Email Address</label>
        <a-input
          v-decorator="['email', { rules: [{ required: true, message: 'Please input your Email!' }] }]"
          placeholder="xxx@xxxxx.xx"
        />
      </a-form-item>

      <a-form-item>
        <label><span class="text-red">*</span> Password</label>
        <a-input-password
          v-decorator="['password', { rules: [{ required: true, message: 'Please input your Password!' }] }]"
          placeholder="Password"
        />
      </a-form-item>

      <a-form-item>
        <label><span class="text-red">*</span> Confirm Password</label>
        <a-input-password
          v-decorator="['cpassword', { rules: [{ required: true, message: 'Please confirm your Password!' }] }]"
          placeholder="Confirm Password"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" block>
          Finish
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'register' }),
      alert: false
    }
  },
  methods: {
    register (e) {
      this.alert = false
      console.log('HOOK')
      // Prevent form action
      e.preventDefault()
      // Validating Data
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (values.password !== values.cpassword) {
            this.alert = 'Password not match!'
          } else {
            // If pass
            console.log('Pass')
            this.$store.commit('register/addData', values)
            // Validate here but soon
            console.log(this.$store.state.register.form)
            const res = await this.$axios.post('api/user/signup', {
              address: this.$store.state.register.form.address,
              email: this.$store.state.register.form.email,
              password: this.$store.state.register.form.password,
              district: this.$store.state.register.form.district,
              fname: this.$store.state.register.form.fname,
              lname: this.$store.state.register.form.lname,
              national_id: this.$store.state.register.form.national_id,
              province: this.$store.state.register.form.province,
              subdistrict: this.$store.state.register.form.subdistrict,
              tel: this.$store.state.register.form.tel,
              zipcode: this.$store.state.register.form.zipcode
            })
            console.log('res :', res)
            // this.$router.replace('/home')
          }
        } else {
          console.log('Sth wrong')
        }
      })
    },
    dateofbirth (date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>
