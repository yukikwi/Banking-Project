<template>
  <div>
    <div v-if="$store.state.select_card.status === '01' || card_type === 'new'" class="mt-2">
      <transition name="slide-bottom">
        <a-row v-if="card_type === 'debit'" type="flex" justify="center" align="middle" class="text-center">
          <a-col :span="12">
            <NuxtLink :to="'/home/debitcard/'+cNo+'/transfer/select'">
              <div class="btn-rounded">
                <a-icon type="swap" />
              </div>
              <span class="text-black">Transfer</span>
            </NuxtLink>
          </a-col>
          <a-col :span="12">
            <NuxtLink :to="'/home/debitcard/'+cNo+'/bill'">
              <div class="btn-rounded">
                <a-icon type="wallet" />
              </div>
              <span class="text-black">Bill</span>
            </NuxtLink>
          </a-col>
        </a-row>
      </transition>
      <a-row v-if="card_type !== 'new'" type="flex" justify="center" align="middle" class="text-center">
        <a-col class="mt-2" :span="12">
          <NuxtLink :to="(card_type === 'debit')? '/home/debitcard/'+cNo+'/transaction' : '/home/creditcard/'+cNo+'/transaction'">
            <div class="btn-rounded">
              <a-icon type="file-text" />
            </div>
            <span class="text-black">Transaction</span>
          </NuxtLink>
        </a-col>
        <a-col class="mt-2" :span="12">
          <NuxtLink :to="(card_type === 'debit')? '/home/debitcard/'+cNo : '/home/creditcard/'+cNo">
            <div class="btn-rounded">
              <a-icon type="setting" />
            </div>
            <span class="text-black">Setting</span>
          </NuxtLink>
        </a-col>
      </a-row>

      <button v-else class="mt-1 thspp-button" @click="$router.push('/home/createcard')">
        Create
      </button>
    </div>
    <div v-else-if="$store.state.select_card.status === '00'" class="mt-2">
      <a-row v-if="card_type !== 'new'" type="flex" justify="center" align="middle" class="text-center">
        <a-col class="mt-2" :span="24">
          <NuxtLink :to="(card_type === 'debit')? '/home/debitcard/'+cNo : '/home/creditcard/'+cNo">
            <div class="btn-rounded">
              <a-icon type="setting" />
            </div>
            <span class="text-black">Setting</span>
          </NuxtLink>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cNo: {
      type: String,
      default: ''
    }
  },
  computed: {
    card_type () {
      // console.log(this.$store.state.animate.cc_menu)
      return this.$store.state.animate.cc_menu
    },
    status () {
      return this.$store.state.select_card.status
    }
  },
  watch: {
    status () {
      // console.log(status)
    }
  },
  mounted () {
    // console.log(this.$store.state.select_card)
  }
}
</script>

<style scoped>
.btn-rounded{
  border: #aaa 1px solid;
  border-radius: 50%;
  padding: 10px;
  font-size: 40px;
  width: 80px;
  height: 80px;
  display: block;
  line-height: 60px;
  text-align: center;
  margin: auto;
  color: #000;
}
.thspp-button{
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
