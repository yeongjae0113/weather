import { ChartData, ChartOptions } from 'chart.js'

export const generatePM10ChartData = (pm10: number): ChartData<'doughnut'> => {
  return {
    labels: ['미세먼지'],
    datasets: [
      {
        // label: '미세먼지 수치',
        data: [pm10, 200 - pm10],
        backgroundColor: ['#F36919', '#E0E0E0'],
        borderWidth: 1,
      }
    ]
  }
}

export const generatePM25ChartData = (pm2_5: number): ChartData<'doughnut'> => {
  return {
    labels: ['초미세먼지'],
    datasets: [
      {
        // label: '초미세먼지 수치',
        data: [pm2_5, 100 - pm2_5],
        backgroundColor: ['#32A1FF', '#E0E0E0'],
        borderWidth: 1
      }
    ]
  }
}

// 차트 옵션 (공통)
export const fineDustChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  events: [],
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
    },
  },
  animation: {
    onComplete: (chartInstance) => {
      const chart = chartInstance.chart
      const ctx = chart.ctx
      const { width, height } = chart.chartArea

      // ctx.save()
      ctx.font= 'bold 24px Arial'
      ctx.fillStyle= '#000'
      ctx.textAlign= 'center'
      ctx.textBaseline= 'middle'

      const value = Math.floor(chart.data.datasets[0].data[0] as number)
      ctx.fillText(`${value}`, width / 2, height / 2)
      ctx.restore();
    },
  },
};
