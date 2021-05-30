<template>
  <div class="container">
    <h1>ตรวจสอบเอกสาร</h1>
    <a-table class="mt-1" :columns="columns" :data-source="data">
      <span slot="action" slot-scope="record">
        <a @click="fileDownload(record.User_Validate_File)">Download</a>
        <a-divider type="vertical" />
        <a @click="approve(record.User_ID)">Approve</a>
        <a-divider type="vertical" />
        <a @click="decline(record.User_ID)">Reject</a>
      </span>
    </a-table>
  </div>
</template>

<script>
export default {
  layout: 'Staff/nav',
  middleware: ['auth', 'is_staff'],
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
  },
  methods: {
    fileDownload (file) {
      this.$axios({
        url: '/api/staff/download/identity/' + file,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]))
        const fileLink = document.createElement('a')

        fileLink.href = fileURL
        fileLink.setAttribute('download', file)
        document.body.appendChild(fileLink)

        fileLink.click()
      })
    },
    async approve (id) {
      const response = await this.$axios.get('/api/staff/validate/' + id + '/approve')
      if (response.data.status === 200) {
        this.data = (await this.$axios.get('/api/staff/list/unvalidate')).data.detail
      }
    },
    async decline (id) {
      const response = await this.$axios.get('/api/staff/validate/' + id + '/decline')
      if (response.data.status === 200) {
        this.data = (await this.$axios.get('/api/staff/list/unvalidate')).data.detail
      }
    }
  }
}
</script>
