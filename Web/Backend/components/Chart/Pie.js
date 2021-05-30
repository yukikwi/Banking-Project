import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    text: {
      type: String,
      default: ''
    },
    l20: {
      type: Number,
      default: 0
    },
    f21t40: {
      type: Number,
      default: 0
    },
    f41t60: {
      type: Number,
      default: 0
    },
    m61: {
      type: Number,
      default: 0
    }
  },
  data () {
    return ({
      data: {
        datasets: [{
          data: [this.l20, this.f21t40, this.f41t60, this.m61],
          backgroundColor: [
            '#1D3557',
            '#457B9D',
            '#A8DADC',
            '#F1FAEE'
          ]
        }],
        labels: [
          '< 20',
          '21 - 40',
          '21 - 40',
          '> 61'
        ]
      },
      options: {
        responsive: true,
        aspectRatio: 1,
        maintainAspectRatio: true
      }
    })
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
