import { useEffect, useState } from "react";
import { HourlyProps, HourlyWeatherProps } from "../../api/weather/weatherTypes";
import { formatDate, formatDate2, formatTime2 } from "../../utils/WeatherUtils";

const HourlyWeather = ({ hourlyData, city }: HourlyProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [groupedDates, setGroupedDates] = useState<{ date: string, hours: any[] }[]>([])
  
  useEffect(() => {
    if (!hourlyData || !hourlyData.list) return
    
    const grouped = hourlyData.list.reduce<{ date: string, hours: any[] }[]>((acc, hour) => {
      const date = new Date(hour.dt * 1000).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      console.log(date)
      const existingGroup = acc.find((group) => group.date === date)

      if (existingGroup) {
        existingGroup.hours.push(hour)
      } else {
        acc.push({ date, hours: [hour] })
      }
      return acc
    }, [])

    setGroupedDates(grouped)
    if (grouped.length > 0 && !selectedDate) {
      setSelectedDate(grouped[0].date) // 첫 번째 날짜 자동 선택
    }
  }, [hourlyData, selectedDate])

  const handleSelectedDate = (date: string) => {
    setSelectedDate(date)
  }

  // const formatDate2 = (date: string) => {
  //   let formattedDate = date.replace(/\./g, '/')
  //   formattedDate = formattedDate.replace(/\//g, ' /')
  //   if (formattedDate.endsWith('/')) {
  //     formattedDate = formattedDate.slice(0, -1)
  //   }
  //   return formattedDate
  // }

  if (!hourlyData || !hourlyData.list || hourlyData.list.length === 0) return null

  return (
    <div>
      <h2 style={{marginTop: '2rem'}}>{city} 주간 예보</h2>
      <div style={{display: 'flex', gap: '0.9rem'}}>
        {groupedDates.map((dateGroup) => (
          <button
            key={dateGroup.date}
            onClick={() => handleSelectedDate(dateGroup.date)}
            style={{
              fontSize: '0.9rem',
              fontWeight: 'bold',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: selectedDate === dateGroup.date ? 'black' : 'rgb(215 215 215)',
              color: selectedDate === dateGroup.date ? 'white' : 'black',
            }}
          >
            {formatDate2(dateGroup.date)}
          </button>
        ))}
      </div>

      {selectedDate &&
        groupedDates.map((dateGroup) => {
          if (dateGroup.date === selectedDate) {
            return (
              <div key={dateGroup.date} style={{marginTop: '2rem'}}>
                <h3>{formatDate(dateGroup.date)}</h3>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  {dateGroup.hours.map((hour, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: '1rem',
                        padding: '1rem',
                        border: '2px solid rgb(215 215 215)',
                        borderRadius: '10px',
                        flex: '1 1 7%',
                        boxSizing: 'border-box',
                      }}
                    >
                      <p>{hour.weather[0]?.description}{console.log(hour.weather)}</p>
                      
                      <img
                        src={`https://openweathermap.org/img/wn/${hour.weather[0]?.icon}.png`}
                        alt='weather icon'
                      />
                      <p>
                        {formatTime2(hour.dt)}
                      </p>
                      <p style={{color: 'black'}}>
                        기온:&nbsp;
                        <span
                          style={{
                            color: hour.main.temp > 0 ? '#DC0100' : '#2A74F8',
                          }}
                        >
                          {Math.floor(hour.main.temp)}°C
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        })}
    </div>
  )
}

export default HourlyWeather