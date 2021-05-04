<template>
  <div>
    <HomeHeader title="Transfer" />

    <div class="rounded-top-m container background-white pb-80px full-height">
      <h2 class="text-bold">Select Bank</h2>

      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
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
  data () {
    return {
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
    }
  }
}
</script>

<style scoped>
.text-bold{
  font-weight: bold;
}
</style>
