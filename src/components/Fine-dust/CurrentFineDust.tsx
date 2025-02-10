import { Icon } from "@mui/material"
import { getCo, getFineDust, getNo2, getO3, getSo2, getUltraFineDust } from "../../utils/WeatherUtils"
import FineDustChart from "../Chart/FineDustChart"
import UltraFineDustChart from "../../components/Fine-dust/UltraFineDustChart"
import { Icons, Pont1, Pont2, PontDiv } from "../../pages/Fine-dust/style"
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

  console.log('데이터: ', currentData)
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
      <div style={{display: 'flex', marginBottom: '2rem', width: '100%', height: '8rem', alignItems: 'center'}}>
        <div style={{width: '9%', marginRight: '1rem'}}>
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
        <div style={{width: '7%', marginRight: '5rem'}}>
          <FineDustChart data={fineDustData} />
        </div>
        <div style={{width: '9%', marginRight: '1rem'}}>
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
        <div style={{width: '7%'}}>
          <UltraFineDustChart data={fineDustData} />
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', width: '40%', justifyContent: 'center', marginRight: '2rem'}}>
          <PontDiv style={{ width: '22%', height: '1rem', marginBottom: '0.2rem', marginLeft: '2rem'}}>
            <Pont1>O3</Pont1>
            <Pont2>
              {getO3(fineDustData.list[0].components.o3).value} {getO3(fineDustData.list[0].components.o3).status}
            </Pont2>
          </PontDiv>
          <PontDiv style={{ width: '22%', height: '1rem', marginBottom: '0.2rem', marginLeft: '1rem'}}>
            <Pont1>CO</Pont1>
            <Pont2>
              {getCo(fineDustData.list[0].components.co).value} {getCo(fineDustData.list[0].components.co).status}
            </Pont2>
          </PontDiv>
          <PontDiv style={{ width: '22%', height: '1rem', marginBottom: '0.2rem', marginLeft: '2rem'}}>
            <Pont1>SO2</Pont1>
            <Pont2>
              {getSo2(fineDustData.list[0].components.so2).value} {getSo2(fineDustData.list[0].components.so2).status}
            </Pont2>
          </PontDiv>
          <PontDiv style={{ width: '22%', height: '1rem', marginBottom: '0.2rem', marginLeft: '1rem'}}>
            <Pont1>NO2</Pont1>
            <Pont2>
              {getNo2(fineDustData.list[0].components.no2).value} {getNo2(fineDustData.list[0].components.no2).status}
            </Pont2>
          </PontDiv>
        </div>

        <div 
          style={{
            width: '20%', 
            height: '100%', 
            textAlign: 'center', 
            border: '2px solid #cccccc',
            borderRadius: '10px', 
        }}>
          <div style={{display: 'flex', alignItems: 'center', width: '100%', height: '23%'}}>
            <p style={{flex: 1, color: '#555555', fontWeight: 'bold'}}>내일</p>
            <p style={{flex: 2, color: '#555555', fontWeight: 'bold'}}>미세먼지</p>
            <p style={{flex: 2, color: '#555555', fontWeight: 'bold'}}>초미세먼지</p>
          </div>

          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '28%', marginTop: '0.5rem', borderTop: '2px solid #cccccc'}}>
            <p style={{flex: 1, color: '#929292', fontWeight: 'bold'}}>오전</p>
            <div style={{flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Icons
                style={{
                  color: getFineDust(averageDust.morning.pm10).color, 
                }}
                as={getFineDust(averageDust.morning.pm10).icon}
              />
              <p style={{color: getFineDust(averageDust.morning.pm10).color, fontWeight: 'bold'}}>
                {getFineDust(averageDust.morning.pm10).status}
              </p>
            </div>
            <div style={{flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Icons
                style={{
                  color: getUltraFineDust(averageDust.morning.pm2_5).color, 
                }}
                as={getUltraFineDust(averageDust.morning.pm2_5).icon}
              />
              <p style={{color: getUltraFineDust(averageDust.morning.pm2_5).color, fontWeight: 'bold'}}>
                {getUltraFineDust(averageDust.morning.pm2_5).status}
              </p>
            </div>
          </div>
              
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '30%', marginTop: '0.5rem', borderTop: '2px solid #cccccc'}}>
            <p style={{flex: 1, color: '#929292', fontWeight: 'bold'}}>오후</p>
            <div style={{flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Icons
                style={{
                  color: getFineDust(averageDust.afternoon.pm10).color, 
                }}
                as={getFineDust(averageDust.afternoon.pm10).icon}
              />
              <p style={{color: getFineDust(averageDust.afternoon.pm10).color, fontWeight: 'bold'}}>
                {getFineDust(averageDust.afternoon.pm10).status}
              </p>
            </div>
            <div style={{flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Icons
                style={{
                  color: getUltraFineDust(averageDust.afternoon.pm2_5).color, 
                }}
                as={getUltraFineDust(averageDust.afternoon.pm2_5).icon}
              />
              <p style={{color: getUltraFineDust(averageDust.afternoon.pm2_5).color, fontWeight: 'bold'}}>
                {getUltraFineDust(averageDust.afternoon.pm2_5).status}
              </p>
            </div>
          </div>
        </div> 
      </div>
    </>
  )
}

export default CurrentFineDust;
