import { useEffect, useState, useContext } from "react"
import { fetchKWeatherData } from "../../../api/weather/Korea/weatherService"
import { KWeatherData, KWeatherResponse, WeatherCategory } from "../../../api/weather/Korea/weatherTypes"
import Header from "../../../layout/header/Header"
import { getWindDirection, ptyDescription, skyDescription } from "../../../utils/WindUtils"
import { useCity } from "../../../context/CityContext"  // 전역 상태 불러오기
import axios from "axios"

const KWeather = () => {
  const [weatherData, setWeatherData] = useState<KWeatherData[]>([])
  const [error, setError] = useState<string | null>(null)

  const { city } = useCity()

  const [coordinates, setCoordinates] = useState<{ nx: string, ny: string }>({ nx: "61", ny: "126" })

  const styles = {
    pont: {
      width: '50%',
      height: '1.8rem',
      margin: '1rem 1rem 0 1rem',
      padding: '1rem',
      borderRadius: '10px',
      textAlign: 'center' as 'center',
      alignContent: 'center',
    }
  }

  useEffect(() => {
    if (city) {
      fetchGeoCoord(city)
    }
  }, [city])

  const fetchGeoCoord = async (city: string) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=AIzaSyC8HRtQodzLeC6ITgKcvip1nXh0OPQ_Njs`);
      const data = response.data;
  
      if (data && data.results && data.results[0]) {
        const location = data.results[0].geometry.location;
        setCoordinates({ nx: location.lng.toString(), ny: location.lat.toString() });
        console.log("위도:", location.lat, "경도:", location.lng);
      } else {
        console.error("지오코딩 결과 없음");
      }
    } catch (error) {
      console.error("지오코딩 요청 오류:", error);
    }
  };
  

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response: KWeatherResponse = await fetchKWeatherData(coordinates.nx, coordinates.ny)
        setWeatherData(response.response.body.items.item)
        console.log("데이터 구조: ", response)
      } catch (err) {
        setError("날씨 데이터를 가져오는 데 실패했습니다.")
      }
    }

    if (coordinates.nx && coordinates.ny) {
      fetchWeather()
    }
  }, [coordinates])

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>
  }

  const getCategory = (category: WeatherCategory) => {
    const found = weatherData.find((data) => data.category === category)
    return found ? found.fcstValue : '데이터 없음'
  }

  const windDirection = getWindDirection(getCategory('UUU'), getCategory('VVV'))
  const skyStatus = skyDescription(getCategory('SKY'))
  const ptyStatus = ptyDescription(getCategory('PTY'))

  return (
    <>
      <Header />
      <div style={{ width: '80%', margin: '0 auto' }}>
        <h2>현재 날씨 정보</h2>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', borderBottom: '2px solid #d9d9d9' }}>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <div style={{ flex: '1', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', flex: '1' }}>
                    <p style={{ ...styles.pont, backgroundColor: '#FFF5E6', color: '#FDA60E' }}>
                      현재 온도: {getCategory('TMP')}%
                    </p>
                    <p style={{ ...styles.pont, backgroundColor: '#FFF5E6', color: '#FDA60E' }}>
                      습도: {getCategory('REH')}%
                    </p>
                  </div>
                  <div style={{ display: 'flex', flex: '1' }}>
                    <p style={{ ...styles.pont, backgroundColor: '#E6F9EE', color: '#00C73C' }}>
                      최저 온도: {getCategory('TMN')}°C
                    </p>
                    <p style={{ ...styles.pont, backgroundColor: '#E6F9EE', color: '#00C73C' }}>
                      최고 온도: {getCategory('TMX')}°C
                    </p>
                  </div>
                  <div style={{ display: 'flex', flex: '1' }}>
                    <p style={{ ...styles.pont, backgroundColor: '#EAF3FF', color: '#34A0FF' }}>
                      풍속: {getCategory('WSD')}m/s
                    </p>
                    <p style={{ ...styles.pont, backgroundColor: '#EAF3FF', color: '#34A0FF' }}>
                      풍향: {windDirection}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flex: '1' }}>
                    <p style={{ ...styles.pont, backgroundColor: 'rgba(217, 248, 250, 0.7)', color: '#5BA9B4' }}>
                      강수 확률: {getCategory('POP')}%
                    </p>
                    <p style={{ ...styles.pont, backgroundColor: 'rgba(217, 248, 250, 0.7)', color: '#5BA9B4' }}>
                      강수 형태: {ptyStatus}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flex: '1' }}>
                    <p style={{ ...styles.pont, backgroundColor: 'rgb(252, 221, 219)', color: '#C77D7D' }}>
                      하늘 상태: {skyStatus}
                    </p>
                    <p style={{ ...styles.pont, backgroundColor: 'rgb(252, 221, 219)', color: '#C77D7D' }}>
                      적설량: {getCategory('SNO')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>   
      </div>
    </>
  )
}

export default KWeather
