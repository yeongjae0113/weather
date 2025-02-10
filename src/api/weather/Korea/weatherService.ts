import axios from "axios";
import { KWeatherResponse } from "./weatherTypes";
import { kWeatherConfig } from "../../../config/ApiConfig";

// Base Time 계산 (현재 시간 기준으로 가장 근접한 시간 반환)
const calculateBaseTime = (): string => {
  const currentHour = new Date().getHours()
  const availableTimes = ['0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300']

  const closestTime = availableTimes.reduce((prev, curr) => {
    return Math.abs(currentHour - parseInt(curr.slice(0, 2))) < Math.abs(currentHour - parseInt(prev.slice(0, 2)))
      ? curr
      : prev
  })

  return closestTime
}

// Base Date 계산 (baseTime이 0200일 경우 전날 날짜로 설정)
const calculateBaseDate = (baseTime: string): string => {
  const date = new Date()
  if (baseTime === '0200') {
    date.setDate(date.getDate() - 1)
  }
  return date.toISOString().slice(0, 10).replace(/-/g, '')
}

// API URL 생성 함수
const createKWeatherUrl = (nx: string, ny: string, baseDate: string, baseTime: string): string => {
  return `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${kWeatherConfig.apiKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
}

// 국내 날씨 데이터 요청 함수
export const fetchKWeatherData = async (nx: string, ny: string): Promise<KWeatherResponse> => {
  try {
    const baseTime = calculateBaseTime()
    const baseDate = calculateBaseDate(baseTime)
    const url = createKWeatherUrl(nx, ny, baseDate, baseTime)

    const response = await axios.get<KWeatherResponse>(url)
    return response.data
  } catch (error: any) {
    console.error('API 요청 실패:', error.response?.data || error.message)
    throw new Error('한국 날씨 정보를 가져오는 데 실패했습니다.')
  }
}
