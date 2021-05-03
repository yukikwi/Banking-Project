import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data () {
    return ({
      data: {
        labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7'],
        datasets: [{
          label: '',
          borderRadius: 5,
          data: [10, 20, 30, 40, 50, 40, 20],
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
        }
      }
    })
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
