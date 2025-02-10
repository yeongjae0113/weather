export interface FineDustData {
  coord: {
    lon: number   // 경도
    lat: number   // 위도
  }
  list: [
    {
      main: {
        aqi: number   // 미세먼지 농도
      }
      components: {
        pm2_5: number   // 초미세먼지
        pm10: number    // 미세먼지
        co: number      // 일산화탄소
        no2: number     // 이산화질소
        o3: number      // 오존
        so2: number     // 이황산가스
      }
      dt: number    // 시간
    }
  ]
}

export interface FineDustForecastData {
  list: FineDustData['list']
}

export interface FineDustChart {
  ingredient: string
  amount: number
}

export interface FineDustResponse {
  fineDustData: FineDustData
  forecastData: FineDustData
}

export interface HourlyFineDustResponse {
  forecastData: FineDustData
}