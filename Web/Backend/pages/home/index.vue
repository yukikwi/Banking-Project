<template>
  <div>
    <div class="container text-white text-large width-100p">
      <a-row>
        <a-col :span="6" @click.native="logout()">
          <a-icon type="logout" />
        </a-col>
        <a-col class="text-right" :span="18">
          <span>Hi, Capybara</span>
          <a-icon type="user" />
        </a-col>
      </a-row>
      <div class="mt-2">
        <h2 class="mb-0 text-white balance">
          1,000.00 ฿
        </h2>
        <span class="text-small display-block">Your balance</span>
      </div>
    </div>

    <div class="rounded-top-m container background-white pb-50px fit-height">
      <h2 class="text-black">
        Cards
      </h2>

      <flicking
        :options="{ gap: 10, autoResize: true, resizeOnContentsReady: true}"
        :tag="'div'"
        :viewport-tag="'div'"
        :camera-tag="'div'"
        @change="cardchange"
      >
        <div v-for="(item, index) in card" :key="index">
          <DebitcardV1 v-if="item.type == 'debit'" rotate="landspace" size="auto" :middle="false" />
          <CreditcardV1 v-if="item.type == 'credit'" rotate="landspace" size="auto" :middle="false" />
        </div>
      </flicking>

      <client-only>
        <CardMenu />
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: ['auth', 'isuserapprove'],
  data () {
    return ({
      card: [
        {
          type: 'debit'
        },
        {
          type: 'credit'
        }
      ]
    })
  },
  mounted () {
    this.$store.commit('animate/set', { stateName: 'cc_menu', value: this.card[0].type })
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    },
    cardchange (e) {
      this.$store.commit('animate/set', { stateName: 'cc_menu', value: this.card[e.index].type })
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
</style>
