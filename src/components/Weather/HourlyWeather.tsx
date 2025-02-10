import { useEffect, useState } from "react";
import { HourlyWeatherProps } from "../../api/weather/weatherTypes";

const HourlyWeather = ({ hourlyData }: HourlyWeatherProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [groupedDates, setGroupedDates] = useState<{ date: string; hours: any[] }[]>([])
  
  useEffect(() => {
    if (!hourlyData || !hourlyData.list) return
    
    const grouped = hourlyData.list.reduce<{ date: string; hours: any[] }[]>((acc, hour) => {
      const date = new Date(hour.dt * 1000).toLocaleDateString()
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

  const formatDate = (date: string) => {
    const formatDate = new Date(date).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric'
    })
    return formatDate
  }

  if (!hourlyData || !hourlyData.list || hourlyData.list.length === 0) return null

  return (
    <div>
      <h2 style={{marginTop: '2rem'}}>{hourlyData.city.name} 주간 예보</h2>
      <div style={{display: 'flex', gap: '1rem'}}>
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
              backgroundColor: selectedDate === dateGroup.date ? '#5f5f5f' : '#f5f5f5',
              color: selectedDate === dateGroup.date ? 'white' : 'black',
            }}
          >
            {dateGroup.date}
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
                        border: '2px solid #f5f5f5',
                        borderRadius: '10px',
                        flex: '1 1 7%',
                        boxSizing: 'border-box',
                      }}
                    >
                      <p>{hour.weather[0]?.description}</p>
                      <img
                        src={`https://openweathermap.org/img/wn/${hour.weather[0]?.icon}.png`}
                        alt='weather icon'
                      />
                      <p>
                        {new Date(hour.dt * 1000).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p style={{color: 'black'}}>
                        기온:{" "}
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