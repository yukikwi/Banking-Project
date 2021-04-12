<template>
  <a-form class="text-left" :form="form" @submit="formSubmit">
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
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
      <a class="text-white" @click="$router.replace('/register')">
        Sign up
      </a>
    </div>
  </a-form>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'signin' })
    }
  },
  methods: {
    formSubmit (e) {
      console.log('HOOK')
      // Prevent form action
      e.preventDefault()
      // Validating Data
      this.form.validateFields((err, values) => {
        if (!err) {
          // If pass
          console.log('Pass')
          // Validate here but soon
          const payload = {
            data: {
              username: values.username,
              password: values.password
            }
          }
          this.$auth.loginWith('local', payload)
        } else {
          console.log('Sth wrong')
        }
      })
    }
  }
}
</script>
