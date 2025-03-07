import axios from 'axios'
import { weatherConfig } from '../../config/ApiConfig'
import { HourlyResponse, WeatherMaps, WeatherResponse } from './weatherTypes'

const cityMap: {[key: string]: string} = {
  서울: 'seoul',
  부산: 'busan',
  인천: 'incheon',
  대구: 'daegu',
  대전: 'daejeon',
  광주: 'gwangju',
  울산: 'ulsan',
  수원: 'suwon',
  창원: 'changwon',
  고양: 'goyang',
  성남: 'seongnam',
  용인: 'yongin',
  제주: 'jeju',
  김해: 'gimhae',
  전주: 'jeonju',
  천안: 'cheonan',
  포항: 'pohang',
  안양: 'anyang',
  시흥: 'siheung',
  평택: 'pyeongtaek',
  남양주: 'namyangju',
  의정부: 'uijeongbu',
  광명: 'gwangmyeong',
  화성: 'hwaseong',
  포천: 'pocheon',
  여수: 'yeosu',
  원주: 'wonju',
  이천: 'icheon',
  양주: 'yangju',
  김포: 'gimpo',
  구미: 'gumi',
  순천: 'suncheon',
  파주: 'paju',
  서산: 'seosan',
  안성: 'anseong',
  홍성: 'hongseong',
  남해: 'namhae',
  철원: 'cheorwon',
  속초: 'sokcho',
  정읍: 'jeongeup',
  고흥: 'goheung',
  완도: 'wando',
  광양: 'gwangyang',
  청주: 'cheongju',
  세종: 'sejong',
  강릉: 'gangneung',
  안동: 'andong',
  충주: 'chungju',
  김천: 'gimcheon',
  여주: 'yeoju',
  동해: 'donghae-si',
  남원: 'namwon',
  하남: 'hanam',
  의령: 'uiryeong',
  밀양: 'miryang',
  진주: 'jinju',
  상주: 'sangju',
  영주: 'yeongju',
  상동: 'sangdong',
  군산: 'gunsan',
  보령: 'boryeong',
  부여: 'buyeo',
}



export const fetchWeatherData = async (city: string): Promise<WeatherResponse> => {
  try {
    const formatCity = cityMap[city] || city
    const response = await axios.get<WeatherResponse>(
      `/weather-api/data/2.5/weather?q=${formatCity}&appid=${weatherConfig.apiKey}&lang=kr&units=metric`
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
