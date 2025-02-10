import { Icon } from "@mui/material"
import { getCo, getFineDust, getNo2, getO3, getSo2, getUltraFineDust } from "../../utils/WeatherUtils"
import FineDustChart from "../Chart/FineDustChart"
import UltraFineDustChart from "../../components/Fine-dust/UltraFineDustChart"
import { Pont1, Pont2, PontDiv } from "../../pages/Fine-dust/style"
import { FineDustResponse } from "../../api/fine-dust/fineDustType"
import { useEffect, useState } from "react"

const CurrentFineDust = ({ fineDustData, forecastData }: FineDustResponse) => {
  const currentData = fineDustData.list[0].components
  const [averageDust, setAverageDust] = useState<{ 
    morning: {pm10: number, pm2_5: number}, 
    afternoon: {pm10: number, pm2_5: number}
  }>({
    morning: {pm10: 0, pm2_5: 0},
    afternoon: {pm10: 0, pm2_5: 0}
  })

  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const startTomorrow = Math.floor(tomorrow.getTime() / 1000)   // 유닉스 타임스탬프 변환

    tomorrow.setHours(23, 59, 59, 999)
    const endTomorrow = Math.floor(tomorrow.getTime() / 1000)

    console.log('내일 시작 시간: ', startTomorrow)
    console.log('내일 마지막 시간: ', endTomorrow)

    const tomorrowData = forecastData.list.filter((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000) 
      const forecastDated = Math.floor(forecastDate.getTime() / 1000) 

      return forecastDated >= startTomorrow && forecastDated <= endTomorrow
    })

    console.log('내일 데이터: ', tomorrowData)

    const morningData = tomorrowData.filter((forecastData) => new Date(forecastData.dt * 1000).getHours() < 12)
    const afternoonData = tomorrowData.filter((forecastData) => new Date(forecastData.dt * 1000).getHours() >= 12)
    console.log('오전 데이터: ', morningData)
    console.log('오후 데이터: ', afternoonData)

    const calculateAverage = (data: any[]) => {
      const totalPm10 = data.reduce((acc, forecast) => acc + forecast.components.pm10, 0)
      const totalPm2_5 = data.reduce((acc, forecast) => acc + forecast.components.pm2_5, 0)
      const totalCount = data.length
      console.log('미세먼지 합: ', totalPm10)
      console.log('초미세먼지 합: ', totalPm2_5)

      return {
        pm10: totalPm10 / totalCount,
        pm2_5: totalPm2_5 / totalCount
      }
    }
    const morningAverage = calculateAverage(morningData)
    const afternoonAverage = calculateAverage(afternoonData)

    setAverageDust({
      morning: {
        pm10: Math.floor(morningAverage.pm10), 
        pm2_5: Math.floor(morningAverage.pm2_5)
      },
      afternoon: {
        pm10: Math.floor(afternoonAverage.pm10), 
        pm2_5: Math.floor(afternoonAverage.pm2_5)
      }
    })

    console.log('오전 평균: ', morningAverage)
    console.log('오후 평균: ', afternoonAverage)

  }, [forecastData])

  
  return (
    <>
      <div style={{display: 'flex', marginBottom: '1rem'}}>
        <div>
          <div>
            오전 미세먼지 평균: {averageDust.morning.pm10}  
            오전 초미세먼지 평균: {averageDust.morning.pm2_5}  
          </div>
          <div>
            오후 미세먼지 평균: {averageDust.afternoon.pm10}  
            오후 미세먼지 평균: {averageDust.afternoon.pm2_5}  
          </div>
          <div style={{marginRight: '1rem'}}>
            <div>
              <p
                style={{
                  fontWeight: 'bold',
                  marginBottom: '-0.3rem',
                }}
              >
                현재 미세먼지
              </p>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Icon
                  style={{
                    fontSize: '23px',
                    marginRight: '0.5rem',
                    color: getFineDust(currentData.pm10).color,
                  }}
                  component={getFineDust(currentData.pm10).icon}
                />
                <p style={{color: getFineDust(currentData.pm10).color, fontWeight: 'bold'}}>
                  {getFineDust(currentData.pm10).status}
                </p>
              </div>
              <p style={{fontSize: '0.9rem', marginTop: '-0.4rem'}}>
                <span style={{fontWeight: "bold"}}>WHO</span> 권고치 이내
              </p>
            </div>
          </div>
          <div style={{marginRight: '5rem'}}>
            <FineDustChart data={fineDustData} />
          </div>
          <div style={{marginRight: '1rem'}}>
            <div>
              <p
                style={{
                  fontWeight: 'bold',
                  marginBottom: '-0.3rem',
                }}
              >
                현재 초미세먼지
              </p>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Icon
                  style={{
                    fontSize: '23px',
                    marginRight: '0.5rem',
                    color: getUltraFineDust(currentData.pm2_5).color,
                  }}
                  component={getUltraFineDust(currentData.pm2_5).icon}
                />
                <p style={{color: getUltraFineDust(currentData.pm2_5).color, fontWeight: 'bold'}}>
                  {getUltraFineDust(currentData.pm2_5).status}
                </p>
              </div>
              <p style={{fontSize: '0.9rem', marginTop: '-0.4rem'}}>
                <span style={{fontWeight: 'bold'}}>WHO</span> 권고치 이내
              </p>
            </div>
          </div>
          <UltraFineDustChart data={fineDustData} />
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', width: '70%', height: '4.5rem', margin: '0 auto'}}>
        <PontDiv>
          <Pont1>
            O3
          </Pont1> 
          <Pont2>
            {getO3(fineDustData.list[0].components.o3).value} {getO3(fineDustData.list[0].components.o3).status}
          </Pont2>
        </PontDiv>
        <PontDiv>
          <Pont1>
            CO
          </Pont1>
          <Pont2>
            {getCo(fineDustData.list[0].components.co).value} {getCo(fineDustData.list[0].components.co).status}
          </Pont2>
        </PontDiv>
        <PontDiv>
          <Pont1>
            SO2
          </Pont1>
          <Pont2>
            {getSo2(fineDustData.list[0].components.so2).value} {getSo2(fineDustData.list[0].components.so2).status}
          </Pont2>
        </PontDiv>
        <PontDiv>
          <Pont1>
            NO2
          </Pont1> 
          <Pont2>
            {getNo2(fineDustData.list[0].components.no2).value} {getNo2(fineDustData.list[0].components.no2).status}
          </Pont2>
        </PontDiv>
      </div>
    </>
  )
}

export default CurrentFineDust;
