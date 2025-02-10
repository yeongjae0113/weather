import { Doughnut } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { FC } from 'react'
import { generatePM10ChartData, fineDustChartOptions } from '../../api/fine-dust/chart'
import { FineDustData } from '../../api/fine-dust/fineDustType'

const FineDustChart: FC<{ data: FineDustData }> = ({ data }) => {
  const pm10 = data.list[0].components.pm10

  const pm10ChartData = generatePM10ChartData(pm10)

  return (
    <div style={{ display: 'flex', marginTop: '20px' }}>
      <div style={{ width: '5.5rem' }}>
        <Doughnut data={pm10ChartData} options={fineDustChartOptions} plugins={[ChartDataLabels]} />
      </div>
    </div>
  )
}

export default FineDustChart
