import { useEffect, useState } from "react"
import { HourlyFineDustResponse } from "../../api/fine-dust/fineDustType"
import { getFineDust, getUltraFineDust } from "../../utils/WeatherUtils"
import { Icon } from "@mui/material"
import { useCity } from "../../context/CityContext";

const HourlyFineDust = ({ forecastData }: HourlyFineDustResponse) => {
  const {city} = useCity()
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [groupedData, setGroupedData] = useState<{ [date: string]: { morning: any[]; afternoon: any[] } }>({})

  useEffect(() => {
    const grouped = forecastData.list.reduce((acc: any, forecast: any) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString()
      const hour = new Date(forecast.dt * 1000).getHours()

      if (!acc[date]) acc[date] = { morning: [], afternoon: [] }
      if (hour < 12) {
        acc[date].morning.push(forecast)
      } else {
        acc[date].afternoon.push(forecast)
      }
      return acc
    }, {})
    setGroupedData(grouped);
    
    if (Object.keys(grouped).length > 0) {
      setSelectedDate(Object.keys(grouped)[0])  // 첫 번째 날짜로 초기화
    }
    console.log('asjkldh: ', forecastData)
  }, [forecastData])
  
  return (
    <>
      {forecastData && (
        <div style={{marginBottom: '3.1rem', borderTop: '2px solid #d9d9d9'}}>
          <h2 style={{marginTop: '2rem'}}>{city} 주간예보</h2>
          <div style={{display: "flex", gap: "1rem", marginBottom: '2rem'}}>
            {Object.keys(groupedData).map((date, index) => (
              <button
                key={index}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: "bold",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: selectedDate === date ? "black" : "#f5f5f5",
                  color: selectedDate === date ? "white" : "black",

                }}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </button>
            ))}
          </div>

          {selectedDate && groupedData[selectedDate] && (
            <>
              <h3>오전 미세먼지</h3>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  justifyContent: 'center',
                  marginTop: '1rem',
                }}
              >
                {groupedData[selectedDate].morning.length > 0 ? (
                  groupedData[selectedDate].morning.map((forecast: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        flex: '1 1 6%',
                        boxSizing: 'border-box',
                        padding: '0.5rem 1rem 1rem 1rem',
                        border: '2px solid #f5f5f5',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <p style={{fontWeight: 'bold'}}>{new Date(forecast.dt * 1000).toLocaleTimeString([], {hour: '2-digit', hour12: false})}</p>
                        <p style={{color: getFineDust(forecast.components.pm10).color, display: 'flex', alignItems: 'center', fontSize: '15px'}}>
                        {getFineDust(forecast.components.pm10).status}
                        <Icon
                          style={{
                            fontSize: "23px",
                            marginLeft: "0.5rem",
                            color: getFineDust(forecast.components.pm10).color,
                          }}
                          component={getFineDust(forecast.components.pm10).icon}  
                        />
                      </p>
                      <p style={{color: getUltraFineDust(forecast.components.pm2_5).color, display: 'flex', alignItems: 'center', fontSize: '15px'}}>
                        {getUltraFineDust(forecast.components.pm2_5).status}
                        <Icon
                          style={{
                            fontSize: "23px",
                            marginLeft: "0.5rem",
                            color: getUltraFineDust(forecast.components.pm2_5).color,
                          }}
                          component={getUltraFineDust(forecast.components.pm2_5).icon}  
                        />
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{fontWeight: 'bold'}}>오전 정보가 없습니다.</p>
                )}
              </div>

              <h3 style={{marginTop: '2rem'}}>오후 미세먼지</h3>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  justifyContent: 'center',
                  marginTop: '1rem',
                }}
              >
                {groupedData[selectedDate].afternoon.length > 0 ? (
                  groupedData[selectedDate].afternoon.map((forecast: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        flex: '1 1 6%',
                        boxSizing: 'border-box',
                        padding: '0.5rem 1rem 1rem 1rem',
                        border: '2px solid #f5f5f5',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <p style={{fontWeight: 'bold', marginBottom: '0.1rem'}}>{new Date(forecast.dt * 1000).toLocaleTimeString([], {hour: '2-digit', hour12: false})}</p>
                      <p style={{color: getFineDust(forecast.components.pm10).color, display: 'flex', alignItems: 'center', fontSize: '15px'}}>
                        {getFineDust(forecast.components.pm10).status}
                        <Icon
                          style={{
                            fontSize: '23px',
                            marginLeft: '0.5rem',
                            color: getFineDust(forecast.components.pm10).color,
                          }}
                          component={getFineDust(forecast.components.pm10).icon}  
                        />
                      </p>
                      <p style={{color: getUltraFineDust(forecast.components.pm2_5).color, display: 'flex', alignItems: 'center', fontSize: '15px'}}>
                        {getUltraFineDust(forecast.components.pm2_5).status}
                        <Icon
                          style={{
                            fontSize: '23px',
                            marginLeft: '0.5rem',
                            color: getUltraFineDust(forecast.components.pm2_5).color,
                          }}
                          component={getUltraFineDust(forecast.components.pm2_5).icon}  
                        />
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{fontWeight: 'bold'}}>오후 정보가 없습니다.</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HourlyFineDust;
