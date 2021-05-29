import { Doughnut } from 'vue-chartjs'
import Chart from 'chart.js'

export default {
  extends: Doughnut,
  props: {
    text: {
      type: String,
      default: ''
    },
    income: {
      type: Number,
      default: 0
    },
    outcome: {
      type: Number,
      default: 0
    }
  },
  data () {
    return ({
      data: {
        datasets: [{
          data: [this.income, this.outcome],
          backgroundColor: [
            '#A40000',
            '#26A400'
          ]
        }],
        labels: [
          'Income',
          'Outcome'
        ]
      },
      options: {
        responsive: true,
        aspectRatio: 1,
        maintainAspectRatio: true,
        legend: {
          display: false
        },
        cutoutPercentage: 80
      }
    })
  },
  mounted () {
    this.renderChart(this.data, this.options)
    this.textCenter(this.text)
    const m = new Date()
    const dateString = m.getUTCFullYear() + '-' + (m.getUTCMonth() + 1) + '-' + m.getUTCDate() + ' | ' + m.getUTCHours() + ':' + m.getUTCMinutes() + ':' + m.getUTCSeconds()
    console.log(dateString)
    this.textCenter2(dateString)
  },
  methods: {
    textCenter (val) {
      Chart.pluginService.register({
        beforeDraw (chart) {
          const width = chart.chart.width
          const height = chart.chart.height
          const ctx = chart.chart.ctx
          console.log(chart.chart.width)
          ctx.clearRect(0, 0, chart.chart.width, chart.chart.height)

          ctx.restore()
          const fontSize = 3
          ctx.font = fontSize + 'em Kanit sans-serif'
          ctx.textBaseline = 'middle'

          const text = val
          const textX = Math.round((width - ctx.measureText(text).width) / 2)
          const textY = (height / 2) - fontSize

          ctx.fillText(text, textX, textY)
          ctx.save()
        }
      })

      Chart.plugins.unregister(this.chartdata)
    },
    textCenter2 (val) {
      Chart.pluginService.register({
        beforeDraw (chart) {
          const width = chart.chart.width
          const height = chart.chart.height
          const ctx = chart.chart.ctx

          ctx.restore()
          const fontSize = 0.7
          ctx.font = fontSize + 'em Kanit sans-serif'
          ctx.textBaseline = 'middle'

          const text = val
          const textX = Math.round((width - ctx.measureText(text).width) / 2)
          const textY = Math.round((height + 50) / 2)

          ctx.fillText(text, textX, textY)
          ctx.save()
        }
      })

      Chart.plugins.unregister(this.chartdata)
    }
  }
}
