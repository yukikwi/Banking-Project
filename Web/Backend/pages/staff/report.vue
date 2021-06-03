<template>
  <div class="container">
    <h1>Report</h1>
    <ChartPie v-if="chart !== null" :l20="chart.l20" :f21t40="chart.f21t40" :f41t60="chart.f41t60" :m61="chart.m61" />
    <a-table class="mt-1" :columns="columns" :data-source="data" />
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
          title: 'Mode',
          dataIndex: 'mode'
        },
        {
          title: 'Age',
          dataIndex: 'data'
        }
      ],
      data: [],
      chart: null
    }
  },
  async mounted () {
    const mean = await this.$axios.get('/api/staff/age/mean')
    const min = await this.$axios.get('/api/staff/age/min')
    const max = await this.$axios.get('/api/staff/age/max')
    const chartdata = await this.$axios.get('/api/staff/age/summary')
    this.chart = {
      l20: chartdata.data.data.l20,
      f21t40: chartdata.data.data.f21t40,
      f41t60: chartdata.data.data.f41t60,
      m61: chartdata.data.data.m61
    }
    // console.log(mean)
    // console.log(min)
    // console.log(max)
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
