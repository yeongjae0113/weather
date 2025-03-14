import { useEffect, useState } from "react"
import { HourlyResponse } from "../../api/weather/weatherTypes"

const TomorrowChart = ({hourlyData}: {hourlyData: HourlyResponse | null}) => {
  const [morningAvgTemp1, setMorningAvgTemp1] = useState<number | null>(null)
  const [afternoonAvgTemp1, setAfternoonAvgTemp1] = useState<number | null>(null)
  const [morningAvgTemp2, setMorningAvgTemp2] = useState<number | null>(null)
  const [afternoonAvgTemp2, setAfternoonAvgTemp2] = useState<number | null>(null)

  useEffect(() => {
    console.log('hourlyData: ', hourlyData)
    
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setUTCHours(0, 0, 0, 0)
    const startTomorrow = Math.floor(tomorrow.getTime() / 1000)

    tomorrow.setUTCHours(23, 59, 59, 999)
    const endTomorrow = Math.floor(tomorrow.getTime() / 1000)

    const timeData = hourlyData?.list?.filter((item) => {
      const timestamp = item.dt
      return timestamp >= startTomorrow && timestamp <= endTomorrow
    })
    console.log('내일 데이터: ', timeData)

    const morningData = timeData?.filter((item) => new Date(item.dt * 1000).getHours() < 12)
    const afternoonData = timeData?.filter((item) => new Date(item.dt * 1000).getHours() >= 12)

    console.log('오전 데이터: ', morningData)
    console.log('오후 데이터: ', afternoonData) 

    const morningTemp = morningData?.map((item) => item.main.temp)
    const afternoonTemp = afternoonData?.map((item) => item.main.temp)

    console.log('오전 온도: ', morningTemp)
    console.log('오후 온도: ', afternoonTemp)

    const morningAvg = morningTemp && morningTemp.length > 0 ?
      morningTemp.reduce((acc, temp) => acc + temp) / morningTemp.length : null
      console.log('오전 평균: ', morningAvg)
      setMorningAvgTemp1(morningAvg)
 
    const afternoonAvg = afternoonTemp ?
      afternoonTemp.reduce((acc, temp) => acc + temp) / afternoonTemp.length : null
      setAfternoonAvgTemp1(afternoonAvg)

// ↑ 내일 온도 평균 (오전 / 오후) --------------------------------------------------- ↓ 내일모레 온도 평균 (오전 / 오후)

  const afterTomorrow = new Date()
  afterTomorrow.setDate(afterTomorrow.getDate() + 2) 
  console.log('변경된 afterTomorrow: ', afterTomorrow)
  console.log('변경된 날짜: ', afterTomorrow.toDateString())

  afterTomorrow.setUTCHours(0, 0, 0, 0)
  const startATomorrow = Math.floor(afterTomorrow.getTime() / 1000)
  console.log('내일모레 시작: ', startATomorrow)

  afterTomorrow.setUTCHours(23, 59, 59, 999)
  const endATomorrow = Math.floor(afterTomorrow.getTime() / 1000)
  console.log('내일모레 끝: ', endATomorrow)

  const aData = hourlyData?.list.filter((item) => {
    item.dt
    return startATomorrow <= item.dt && endATomorrow >= item.dt
  })
  console.log('내일모레 데이터: ', aData)

  const aMorningData = aData?.filter((item) => new Date(item.dt * 1000).getHours() < 12)
  const aAfternoonData = aData?.filter((item) => new Date(item.dt * 1000).getHours() >= 12)

  const aMorningTemp = aMorningData?.map((item) => item.main.temp)
  const aAfternoonTemp = aAfternoonData?.map((item) => item.main.temp)
  console.log('내일모레 오전 온도 데이터: ', aMorningTemp) 
  console.log('내일모레 오후 온도 데이터: ', aAfternoonTemp) 

  const aMorningAvg = aMorningTemp && aMorningTemp.length > 0 ? 
    aMorningTemp.reduce((acc, temp) => acc + temp) / aMorningTemp.length : null
    setMorningAvgTemp2(aMorningAvg)

  const aAfternoonAvg = aAfternoonTemp && aAfternoonTemp.length > 0 ?
    aAfternoonTemp.reduce((acc, temp) => acc + temp) / aAfternoonTemp.length : null 
    setAfternoonAvgTemp2(aAfternoonAvg)

  console.log('내일모래 오전 온도 평균: ', morningAvgTemp2)
  console.log('내일모래 오후 온도 평균: ', afternoonAvgTemp2)

  }, [hourlyData])

  
  return (
    <>
      <div style={{
        width: '20%',
        height: '8rem',
        textAlign: 'center',
        border: '2px solid #cccccc',
        borderRadius: '10px'
      }}>
        <div style={{display: 'flex', alignItems: 'center', alignContent: 'center', width: '100%', height: '31%'}}>
          <p style={{flex: 1, color: '#555555', fontWeight: 'bold'}}>온도</p>
          <p style={{flex: 2, color: '#555555', fontWeight: 'bold'}}>오전</p>
          <p style={{flex: 2, color: '#555555', fontWeight: 'bold'}}>오후</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '31%', borderTop: '2px solid #cccccc'}}>
          <p style={{flex: 1, color: '#929292', fontWeight: 'bold'}}>내일</p>
          <div 
            style={{
              flex: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            {Math.floor(Number(morningAvgTemp1))}°C
          </div>
          <div 
            style={{
              flex: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            {Math.floor(Number(afternoonAvgTemp1))}°C
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '31%', borderTop: '2px solid #cccccc'}}>
          <p style={{flex: 1, color: '#929292', fontWeight: 'bold'}}>모래</p>
          <div 
            style={{
              flex: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: morningAvgTemp1 >= 0 ? 'red' : 'blue' 
            }}
          >
            {Math.floor(Number(morningAvgTemp2))}°C
          </div>
          <div 
            style={{
              flex: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            {Math.floor(Number(afternoonAvgTemp2))}°C
          </div>
        </div>
      </div>
    </>
  )
}

export default TomorrowChart