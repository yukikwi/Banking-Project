<template>
  <div class="background-main full-height">
    <Header :class="[($store.state.animate.cc_animate === true)? 'animated': '']" :showlogo="false" class="text-white text-large width-100p text-right">
      <a-icon type="user" />
      <br>
      Hello, {{ $auth.user.User_FName }}
    </Header>

    <div class="cc-container">
      <CreditcardV1 :c-no="creditcardNumber" @click.native="ccClick()" />
    </div>

    <Footer :class="[($store.state.animate.cc_animate === true)? 'animated': '']" bg-color="white">
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :span="10">
          <button class="thspp-button w-100p">
            Credit
          </button>
        </a-col>
        <a-col :span="10">
          <button class="thspp-button w-100p">
            Debit
          </button>
        </a-col>
      </a-row>
    </Footer>
  </div>
</template>

<script>
export default {
  layout: 'User/creditcard',
  middleware: ['auth', 'isuserapprove'],
  data () {
    return ({
      creditcardNumber: 'xxxx xxxx xxxx xxxx'
    })
  },
  async mounted () {
    console.log('Home mounted')
    const res = await this.$axios.get('api/user/cc/list')
    console.log(res.data)
  },
  methods: {
    ccClick () {
      this.$store.commit('animate/trigger', 'cc_animate')
      this.$router.push('/home/creditcard/' + this.creditcardNumber)
    }
  }
}
</script>

<style scoped>
.cc-container{
  height: calc(100% - 250px);
  position: relative;
}
.full-height{
  height: 100vh;
}
.w-100p{
  width: 100%;
}
.text-large{
  font-size: 25px;
}
.small{
  font-size: 14px;
}
.animated{
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-name: opacity;
  animation-fill-mode: forwards;
}

@keyframes opacity {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
