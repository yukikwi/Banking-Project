<template>
  <div class="container">
    <h1>Staff Log</h1>
    <a-list item-layout="horizontal" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta
          :description="item.Log_DateTime"
        >
          <a slot="title">
            Staff {{ item.Staff_FName }} {{ item.Staff_LName }} Edit User {{ item.User_FName }} {{ item.User_LName }} set status to {{ item.Approve_Status }}
          </a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  layout: 'Staff/nav',
  middleware: ['auth', 'is_staff'],
  data () {
    return {
      data: []
    }
  },
  async mounted () {
    this.data = (await this.$axios.get('/api/staff/list/log')).data.data
    // console.log(this.data)
  }
}
</script>
