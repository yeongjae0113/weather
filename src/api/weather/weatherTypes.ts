export interface WeatherData {
  temp: number // 현재 온도
  feels_like: number // 체감 온도
  temp_min: number // 최저 기온
  temp_max: number // 최고 기온
  humidity: number // 습도
}

export interface HourlyWeatherData {
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  weather: {
    description: string
    icon: string
  }[]
  dt: number
}

export interface WeatherResponse {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    description: string // 날씨 설명
    icon: string        // 날씨 아이콘
  }[]
  wind: {
    speed: number  // 풍속
    deg: number    // 풍향
  }
  sys: {
    sunrise: number // 일출
    sunset: number  // 일몰
  }
  main: WeatherData
  name: string   // 검색 지역명
  dt: number     // 현재 시간
}

export interface HourlyResponse {
  list: HourlyWeatherData[]
  city: {
    name: string
  }
}

export interface CurrentWeatherProps {
  weatherData: WeatherResponse
}

export interface HourlyWeatherProps {
  hourlyData: HourlyResponse | null
}

export interface HourlyChartProps {
  city: string
}


export interface WeatherMaps {
  coord: {
    lat: number,
    lon: number
  }
  main: {
    temp: number
  }
  weather: {
    description: string
  }[]
}

export interface WeahterMapProps {
  city: string
}
