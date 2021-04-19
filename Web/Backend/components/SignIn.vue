<template>
  <div>
    <a-alert v-if="error == 'wrong_credential'" type="error" message="Email / Password ไม่ถูกต้อง" banner />
    <a-alert v-if="error == 'error_api'" type="error" message="เกิดข้อผิดพลาดจากฐานข้อมูล" banner />
    <a-alert v-if="error == 'error_unknow'" type="error" message="เกิดข้อผิดพลาดที่ไม่ทราบ" banner />
    <a-form class="mt-1 text-left" :form="form" @submit="formSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            { rules: [{ required: true, message: 'Please input your email!' }] },
          ]"
          placeholder="Email"
        >
          <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Please input your Password!' }] },
          ]"
          type="password"
          placeholder="Password"
          class="mt-1"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-button type="primary" html-type="submit" block class="mt-2">
        Sign in
      </a-button>
      <div class="text-center mt-1">
        <a class="text-white" href="#forget">
          Forgot password
        </a>
        <br>
        <a class="text-white" @click="$router.push('/register')">
          Sign up
        </a>
      </div>
    </a-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'signin' }),
      error: ''
    }
  },
  methods: {
    formSubmit (e) {
      // Clear old error
      this.error = ''
      // Prevent form action
      e.preventDefault()
      // Validating Data
      this.form.validateFields(async (err, values) => {
        if (!err) {
          // Validate credential
          const payload = {
            data: {
              username: values.username,
              password: values.password
            }
          }
          const response = await this.$auth.loginWith('local', payload)
          if (response.data.status === 200) {
            this.$router.push('/home')
          } else if (response.data.status === 404) {
            // Wrong Credential
            this.error = 'wrong_credential'
          } else if (response.data.status === 500) {
            // Server API error
            this.error = 'error_api'
          } else {
            // Unknow response
            this.error = 'error_unknow'
          }
        } else {
          console.log('Sth wrong')
        }
      })
    }
  }
}
</script>
