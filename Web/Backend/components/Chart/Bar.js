import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Array,
      default: []
    },
    label: {
      type: Array,
      default: []
    }
  },
  data () {
    return ({
      data: {
        labels: this.label,
        datasets: [{
          label: '',
          borderRadius: 5,
          data: this.chartdata,
          fill: false,
          backgroundColor: '#457B9D'
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              drawBorder: false,
              color: 'rgba(0, 0, 0, 0)'
            },
            ticks: {
              display: false,
              beginAtZero: true
            }
          }]
        },
        tooltips: {
          callbacks: {
            label (tooltipItem, data) {
              let value = data.datasets[0].data[tooltipItem.index]
              value = value.toString()
              value = value.split(/(?=(?:...)*$)/)
              value = value.join(',')
              return value
            }
          }
        }
      }
    })
  },
  mounted () {
    this.renderChart(this.data, this.options)
    console.log(this.label)
  }
}
