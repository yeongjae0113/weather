import axios from 'axios'
import { weatherConfig } from '../../config/ApiConfig'
import { HourlyResponse, WeatherMaps, WeatherResponse } from './weatherTypes'

// 해외
export const fetchWeatherData = async (city: string): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(
      `/weather-api/data/2.5/weather?q=${city}&appid=${weatherConfig.apiKey}&lang=kr&units=metric`
    )
    return response.data
  } catch (error) {
    throw new Error('날씨 데이터를 가져오지 못함')
  }
}

export const fetchHourlyData = async (city: string): Promise<HourlyResponse> => {
  try {
    const response = await axios.get<HourlyResponse>(
      `/weather-api/data/2.5/forecast?q=${city}&appid=${weatherConfig.apiKey}&lang=kr&units=metric`
    )
    return response.data
  } catch (error) {
    throw new Error("시간별 날씨 데이터를 가져오지 못함")
  }
}

export const fetchWeatherMap = async (city: string): Promise<WeatherMaps> => {
  try {
    const response = await axios.get<WeatherMaps>(
      `/weather-api/data/2.5/weather?q=${city}&appid=${weatherConfig.apiKey}&units=metric`
    )
    return response.data
  } catch (error) {
    throw new Error('지도 정보를 가져오지 못함')
  }
}