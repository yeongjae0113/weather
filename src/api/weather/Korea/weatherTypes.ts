// 단기 예보
export type WeatherCategory =     // ---> | 는 유니온 타입, 타입스크립트에서 여러 값 중 하나만 가질 수 있다는 뜻
| 'TMP'   // 기온
| 'TMN'   // 최저 기온
| 'TMX'   // 최고 기온
| 'UUU'   // 동서 바람 성분
| 'VVV'   // 남북 바람 성분
| 'VEC'   // 바람 방향
| 'WSD'   // 바람 속도
| 'SKY'   // 하늘 상태
| 'PTY'   // 강수 형태
| 'POP'   // 강수 확률
| 'PCP'   // 강수량
| 'REH'   // 습도
| 'SNO'   // 눈의 양

export interface KWeatherData {
  baseDate: string    // 데이터 제공 날짜
  baseTime: string    // 데이터 제공 시간
  category: WeatherCategory   // 카테고리
  fcstDate: string    // 예보 날짜
  fcstTime: string    // 예보 시간
  fcstValue: string   // 카테고리 예보 값
  nx: number    // 위도
  ny: number    // 경도
}

export interface KWeatherResponse {
  response: {
    header: {
      resultCode: string
      resultMsg: string
    }
    body: {
      dataType: string
      items: {
        item: KWeatherData[] 
      }
    }
  }
}

export interface KWeatherProps {
  weatherData: KWeatherData
}