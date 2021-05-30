<template>
  <div class="container">
    <h1>Report</h1>
    <ChartPie :l20="4" :f21t40="5" :f41t60="2" :m61="1" />
    <a-table class="mt-1" :columns="columns" :data-source="data" />
  </div>
</template>

<script>
export default {
  layout: 'Staff/nav',
  data () {
    return {
      columns: [
        {
          title: 'Mode',
          dataIndex: 'mode'
        },
        {
          title: 'Age',
          dataIndex: 'data'
        }
      ],
      data: []
    }
  },
  async mounted () {
    const mean = await this.$axios.get('/api/staff/age/mean')
    const min = await this.$axios.get('/api/staff/age/min')
    const max = await this.$axios.get('/api/staff/age/max')
    console.log(mean)
    console.log(min)
    console.log(max)
    this.data = [
      {
        mode: 'Mean',
        data: mean.data.data
      },
      {
        mode: 'Min',
        data: min.data.data
      },
      {
        mode: 'Max',
        data: max.data.data
      }
    ]
  }
}
</script>
