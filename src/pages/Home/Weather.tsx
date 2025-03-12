import { useEffect, useState } from "react"
import { HourlyResponse, WeatherResponse } from "../../api/weather/weatherTypes"
import { fetchWeatherData, fetchHourlyData } from "../../api/weather/weatherService"
import Header from "../../layout/header/Header"
import CurrentWeather from "../../components/Weather/CurrentWeather"
import HourlyWeather from "../../components/Weather/HourlyWeather"
import HourlyChart from "../../components/Chart/HourlyWeatherChart"
import Footer from "../../layout/footer/Footer"
import { useCity } from "../../context/CityContext"

const Weather = () => {
  const {city} = useCity()
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null)
  const [hourlyData, setHourlyData] = useState<HourlyResponse | null>(null)

  const getWeatherData = async () => {
    try {
      const data = await fetchWeatherData(city)
      setWeatherData(data)
    } catch (error) {
      console.error("현재 날씨 API 호출 실패:", error)
    }
    try {
      const data = await fetchHourlyData(city)
      setHourlyData(data)
    } catch (error) {
      console.error("시간별 날씨 API 호출 실패:", error)
    }
  }

  useEffect(() => {
    getWeatherData()
  }, [city])

  return (
    <>
      <Header />
      <div style={{width: '80%', margin: '0 auto'}}>
        {weatherData && weatherData.weather.length > 0 && (
          <CurrentWeather 
            weatherData={weatherData} 
            city={city}
          />
        )}
        <HourlyWeather
          hourlyData={hourlyData}
          city={city}
        />
        <HourlyChart />
      </div>
      <Footer />
    </>
  );
};

export default Weather;
