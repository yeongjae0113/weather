import { Doughnut } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { FC } from 'react'
import { generatePM25ChartData, fineDustChartOptions } from '../../api/fine-dust/chart'
import { FineDustData } from '../../api/fine-dust/fineDustType'

const UltraFineDustChart: FC<{ data: FineDustData }> = ({ data }) => {
  const pm2_5 = (data.list[0].components.pm2_5)

  const pm25ChartData = generatePM25ChartData(pm2_5)

  return (
    <div style={{ display: 'flex', marginTop: '20px' }}>
      <div style={{ width: '5.5rem' }}>
        <Doughnut data={pm25ChartData} options={fineDustChartOptions} plugins={[ChartDataLabels]} />
      </div>
    </div>
  )
}

export default UltraFineDustChart
