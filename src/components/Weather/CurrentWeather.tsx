import { useEffect } from "react";
import { CurrentWeatherProps } from "../../api/weather/weatherTypes";
import WeatherMap from "./WeatherMap";

const CurrentWeather = ({ weatherData }: CurrentWeatherProps) => {
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
    navigator.geolocation.getCurrentPosition((position) => {
      doSomething(position.coords.latitude, position.coords.longitude)
    }, (error) => {
      console.error('위치 정보 오류: ', error)
    })
  }, [])

  const doSomething = (latitude: number, longtitude: number) => {
    console.log('위도: ', latitude, '경도: ', longtitude)
  }

  function getWindDirection(deg: number): string {
    if (deg >= 0 && deg < 45) return "북풍"
    if (deg >= 45 && deg < 135) return "동풍"
    if (deg >= 135 && deg < 225) return "남풍"
    if (deg >= 225 && deg < 315) return "서풍"
    return "North";
  }

  const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  console.log('일출: ', sunrise)
  console.log('일몰: ', sunset)

  return (
    <div style={{alignContent: 'center'}}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <h2 style={{textAlign: 'center'}}>{weatherData.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}.png`}
          alt="weather icon"
          style={{width: '5%', marginTop: '-1.7rem'}}
        />
      </div>
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
  );
};

export default CurrentWeather;
