import { useEffect, useState } from "react";
import { CurrentWeatherProps, Props } from "../../api/weather/weatherTypes";
import WeatherMap from "./WeatherMap";
import Favorites from "./Favorites";
import { formatTime, getRegion, getWindDirection } from "../../utils/WeatherUtils";

const CurrentWeather = ({ weatherData, city }: Props) => {
  const [isFavorites, setIsFavorites] = useState<boolean>(false)
  const [isDialog, setIsDialog] = useState<boolean>(false)

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
    getRegion()
  }, [])

  const sunrise = formatTime(weatherData.sys.sunrise * 1000)
  const sunset = formatTime(weatherData.sys.sunset * 1000)

  const handleFavorites = () => {
    setIsFavorites(true)
    alert('즐겨찾기 등록 완료')
  }

  const handleNotFavorites = () => {
    setIsFavorites(false)
    alert('즐겨찾기 취소')
  }

  const handleOpenDialog = () => {
    setIsDialog(true)
  }

  const handleCloseDialog = () => {
    setIsDialog(false)
    console.log(isDialog)
  }

  return (
    <div style={{alignContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', marginTop: '2rem'}}>

        {!isFavorites ? (
          <button
            onClick={handleFavorites}
            style={{
              width: '4rem',
              border: 'none',
              background: 'none',
            }}
          >
            <img src="/img/star2.png" alt="즐겨찾기 등록안됨" 
              style={{width: '2rem', height: '3rem', objectFit: 'contain'}}
            />
          </button>
          ) : (
          <button
            onClick={handleNotFavorites}
            style={{
              width: '4rem',
              border: 'none',
              background: 'none',
            }}
          >
            <img src="/img/star.png" alt="즐겨찾기 등록됨" 
              style={{width: '3rem', height: '3rem', objectFit: 'contain'}}
            />
          </button>
        )}

        <button 
          onClick={handleOpenDialog}
          style={{
            border: 'none',
            borderRadius: '0.3rem',
            // background: 'none',
            fontWeight: 'bold',
            padding: '0.4rem',
            cursor: 'pointer',
          }}
        >
          즐겨찾기 목록
        </button>

        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', flex: 0.88, alignItems: 'center'}}>
          <h2 style={{textAlign: 'center', margin: '0'}}>{city}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
            alt="weather icon"
            style={{width: '7%'}}
          />
        </div>
      </div>
      <Favorites 
        isDialog={isDialog}
        handleCloseDialog={handleCloseDialog}
      />
      
      <div style={{display: 'flex', justifyContent: 'center', width: '100%', borderBottom: '2px solid #d9d9d9'}}>
        <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
          <div style={{flex: '1', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
              <div style={{flex: '1', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flex: '1'}}>
                  <p style={{...styles.pont, backgroundColor: '#FFF5E6', color: '#FDA60E'}}>
                    {weatherData.weather[0]?.description}
                  </p>
                  <p style={{...styles.pont, backgroundColor: '#FFF5E6', color: '#FDA60E'}}>
                    습도: {weatherData.main.humidity}%
                  </p>
                </div>
                <div style={{display: 'flex', flex: '1'}}>
                  <p style={{...styles.pont, backgroundColor: '#E6F9EE', color: '#00C73C'}}>
                    현재 온도: {Math.floor(weatherData.main.temp)}°C
                  </p>
                  <p style={{...styles.pont, backgroundColor: '#E6F9EE', color: '#00C73C'}}>
                    체감 온도: {Math.floor(weatherData.main.feels_like)}°C
                  </p>
                </div>
                <div style={{display: 'flex', flex: '1'}}>
                  <p style={{...styles.pont, backgroundColor: '#EAF3FF', color: '#34A0FF'}}>
                    최저 기온: {Math.floor(weatherData.main.temp_min)}°C
                  </p>
                  <p style={{...styles.pont, backgroundColor: '#EAF3FF', color: '#34A0FF'}}>
                    최고 기온: {Math.floor(weatherData.main.temp_max)}°C
                  </p>
                </div>
                <div style={{ display: 'flex', flex: '1'}}>
                  <p style={{ ...styles.pont, backgroundColor: 'rgba(217, 248, 250, 0.7)', color: '#5BA9B4'}}>
                    풍속: {Math.floor(weatherData.wind.speed)}m/s
                  </p>
                  <p style={{ ...styles.pont, backgroundColor: 'rgba(217, 248, 250, 0.7)', color: '#5BA9B4'}}>
                    풍향: {getWindDirection(weatherData.wind.deg)}
                  </p>
                </div>
                <div style={{ display: 'flex', flex: '1'}}>
                  <p style={{ ...styles.pont, backgroundColor: 'rgb(252, 221, 219)', color: '#C77D7D'}}>
                    일출: {sunrise}
                  </p>
                  <p style={{ ...styles.pont, backgroundColor: 'rgb(252, 221, 219)', color: '#C77D7D'}}>
                    일몰: {sunset}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{flex: '1'}}>
            <WeatherMap city={weatherData.name} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
