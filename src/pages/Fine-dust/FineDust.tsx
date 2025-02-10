import { useState, useEffect } from 'react'
import { fetchFineDust, fetchFineDustForecast } from '../../api/fine-dust/findDustService'
import Header from '../../layout/header/Header'
import { useCity } from '../../context/CityContext'
import CurrentFineDust from "../../components/Fine-dust/CurrentFineDust"
import HourlyFineDust from '../../components/Fine-dust/HourlyFineDust'
import Footer from '../../layout/footer/Footer'

const FineDust = () => {
  const { city } = useCity();
  const [fineDustData, setFineDustData] = useState<any>(null)
  const [forecastData, setForecastData] = useState<any>(null)

  useEffect(() => {
    const getFineDustData = async () => {
      if (!city) return;

      try {
        const dustData = await fetchFineDust(city)
        const forecast = await fetchFineDustForecast(city)

        setFineDustData(dustData);
        setForecastData(forecast);
      } catch (error) {
        console.error("미세먼지 정보 가져오지 못함", error)
      }
    }

    getFineDustData()
  }, [city])

  return (
    <>
      <Header />
      <div style={{width: "80%", margin: "0 auto"}}>
        <h2>{city}</h2>
        {fineDustData && forecastData &&
          <CurrentFineDust
            fineDustData={fineDustData}
            forecastData={forecastData}
          />
        }
        {forecastData && <HourlyFineDust forecastData={forecastData} />}
      </div>
      <Footer />
    </>
  )
}

export default FineDust