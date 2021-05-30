<template>
  <div>
    <div class="container text-white text-large width-100p">
      <a-row>
        <a-col :span="6" @click.native="logout()">
          <a-icon type="logout" />
        </a-col>
        <a-col class="text-right" :span="18">
          <span>Hi, {{ $auth.user.User_FName }}</span>
          <a-icon type="user" />
        </a-col>
      </a-row>
      <div class="mt-2">
        <h2 class="mb-0 text-white balance">
          <div v-if="loading" class="spinner">
            <a-spin>
              <a-icon slot="indicator" type="loading" style="font-size: 36px" spin />
            </a-spin>
          </div>
          <div v-else-if="$store.state.animate.cc_menu !== 'new'">
            {{ (balance === null)? 0 : balance.toLocaleString() }} ฿
          </div>
        </h2>
        <span v-if="$store.state.animate.cc_menu !== 'new'" class="text-small display-block">Your balance</span>
      </div>
    </div>

    <div class="rounded-top-m container background-white pb-50px fit-height">
      <div v-if="loading" class="spinner">
        <a-spin>
          <a-icon slot="indicator" type="loading" style="font-size: 36px" spin />
        </a-spin>
      </div>

      <div v-else>
        <h2 class="text-black">
          Cards
        </h2>

        <flicking
          ref="cardslide"
          :options="{ gap: 10, autoResize: true, resizeOnContentsReady: true, defaultIndex: card_index}"
          :tag="'div'"
          :viewport-tag="'div'"
          :camera-tag="'div'"
          @change="cardchange"
        >
          <div v-for="(item, index) in card" :key="index">
            <DebitcardV1
              v-if="item.type == 'debit'"
              rotate="landspace"
              size="auto"
              :middle="false"
              :c-no="item.address"
              :status="item.Account_Status"
            />
            <CreditcardV1
              v-if="item.type == 'credit'"
              rotate="landspace"
              size="auto"
              :middle="false"
              :c-no="item.address"
              :status="item.Card_Status"
            />
            <NewCard v-if="item.type == 'new'" rotate="landspace" size="auto" :middle="false" />
          </div>
        </flicking>
        <client-only>
          <CardMenu :c-no="card_addr" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: ['auth', 'is_member', 'isuserapprove'],
  data () {
    return ({
      card: [],
      loading: true,
      balance: 0,
      card_addr: ''
    })
  },
  computed: {
    card_index () {
      return this.$store.state.animate.card_index
    }
  },
  async mounted () {
    console.log(this.card_index)
    const carddata = await this.$axios.get('api/user/list')
    if (carddata.data.status === 200) {
      this.card = carddata.data.data
      console.log('this card')
      console.log(this.card)
      this.$store.commit('animate/set', { stateName: 'cc_menu', value: this.card[this.card_index].type })
      this.$store.commit('set_select_card', { stateName: 'no', value: this.card[this.card_index].address })
      if (this.card[this.card_index].type === 'credit') {
        this.$store.commit('set_select_card', { stateName: 'status', value: this.card[this.card_index].Card_Status })
      }
      if (this.card[this.card_index].type === 'debit') {
        this.$store.commit('set_select_card', { stateName: 'status', value: this.card[this.card_index].Account_Status })
      }
      this.balance = this.card[this.card_index].balance
      this.card_addr = this.card[this.card_index].address
      this.loading = false
      this.card.push({
        type: 'new'
      })
    }
  },
  updated () {
    this.$refs.cardslide.resize()
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    },
    cardchange (e) {
      this.$store.commit('animate/set', { stateName: 'card_index', value: e.index })
      this.$store.commit('animate/set', { stateName: 'cc_menu', value: this.card[e.index].type })
      this.$store.commit('set_select_card', { stateName: 'no', value: this.card[e.index].address })
      if (this.card[e.index].type === 'credit') {
        this.$store.commit('set_select_card', { stateName: 'status', value: this.card[e.index].Card_Status })
      }
      if (this.card[e.index].type === 'debit') {
        this.$store.commit('set_select_card', { stateName: 'status', value: this.card[e.index].Account_Status })
      }
      this.card_addr = this.card[e.index].address
      this.balance = this.card[e.index].balance
    }
  }
}
</script>

<style scoped>
.display-block{
  display: block;
}
.balance{
  line-height: 1;
}
.fit-height{
  height: calc(100vh - 162px);
}
.spinner{
  width: fit-content;
  margin: auto;
}
</style>
