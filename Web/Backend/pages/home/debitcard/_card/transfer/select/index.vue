<template>
  <div>
    <HomeHeader title="Transfer" />

    <div class="rounded-top-m container background-white pb-80px full-height">
      <h2 class="text-bold">
        Select Bank
      </h2>
      <div v-if="loading" class="spinner">
        <a-spin>
          <a-icon slot="indicator" type="loading" style="font-size: 36px" spin />
        </a-spin>
      </div>
      <a-list v-else item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item" @click="$router.push('select/'+item.shortname)">
          <a-list-item-meta
            :description="item.title"
          >
            <a slot="title">{{ item.shortname }}</a>
            <a-avatar
              slot="avatar"
              :src="require(`~/assets/img/bank/${item.shortname.toLowerCase().trim()}.png`)"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: ['auth', 'is_member', 'isuserapprove', 'is_debitcard_exist'],
  data () {
    return {
      loading: true,
      data: [
        {
          shortname: 'BRB',
          title: 'Bara Bank'
        }
      ]
    }
  },
  async mounted () {
    const bankdata = await this.$axios.get('api/bank/list')
    if (bankdata.data.status === 200) {
      this.data = this.data.concat(bankdata.data.data)
      this.loading = false
    }
  }
}
</script>

<style scoped>
.text-bold{
  font-weight: bold;
}
.spinner{
  width: fit-content;
  margin: auto;
}
</style>
