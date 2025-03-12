import axios from 'axios'
import { FineDustData, FineDustForecastData } from './fineDustType'
import { weatherConfig } from '../../config/apiConfig'

const getCityCoordinates = async (city: string) => {
  const geoResponse = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherConfig.apiKey}`
  );
  if (geoResponse.data.length === 0) {
    throw new Error("해당 도시를 찾을 수 없습니다.")
  }

  return {
    lat: geoResponse.data[0].lat,
    lon: geoResponse.data[0].lon,
  }
}

export const fetchFineDust = async (city: string): Promise<FineDustData> => {
  try {
    const { lat, lon } = await getCityCoordinates(city)
    const response = await axios.get<FineDustData>(
      `/weather-api/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${weatherConfig.apiKey}`
    )
    return response.data
  } catch (error) {
    throw new Error("미세먼지 정보를 가져오지 못함")
  }
}

export const fetchFineDustForecast = async (city: string): Promise<FineDustForecastData> => {
  const { lat, lon } = await getCityCoordinates(city)
  const response = await axios.get<FineDustForecastData>(
    `/weather-api/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${weatherConfig.apiKey}`
  )
  return response.data
}