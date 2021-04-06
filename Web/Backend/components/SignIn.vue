<template>
  <a-form class="text-left" :form="form" @submit="formSubmit">
    <a-input
      v-model="username"
      v-decorator="[
        'userName',
        { rules: [{ required: true, message: 'Please input your username!' }] },
      ]"
      placeholder="Username"
    >
      <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
    </a-input>

    <a-input
      v-model="password"
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

    <a-button type="primary" html-type="submit" block class="mt-2">
      Log in
    </a-button>
    <div class="text-center mt-1">
      <a class="text-white" href="#forget">
        Forgot password
      </a>
      <br>
      <a class="text-white" @click="$router.replace('/register')">
        Register
      </a>
    </div>
  </a-form>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'signin' }),
      username: null,
      password: null
    }
  },
  methods: {
    formSubmit (e) {
      console.log('HOOK')
      // Prevent form action
      e.preventDefault()
      // Validating Data
      this.form.validateFields((err) => {
        if (!err) {
          // If pass
          console.log('Pass')
          // Validate here but soon
          this.$router.replace('/home/')
        } else {
          console.log('Sth wrong')
        }
      })
    }
  }
}
</script>
