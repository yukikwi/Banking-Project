<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle">Name</span>
      <span slot="action">
        <a>Download</a>
        <a-divider type="vertical" />
        <a>Approve</a>
        <a-divider type="vertical" />
        <a>Reject</a>
      </span>
    </a-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: 'First Name',
          dataIndex: 'User_FName'
        },
        {
          title: 'Last Name',
          dataIndex: 'User_LName'
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: []
    }
  },
  async mounted () {
    this.data = (await this.$axios.get('/api/staff/list/unvalidate')).data.detail
  }
}
</script>
