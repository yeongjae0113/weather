import { IconType } from 'react-icons';
import { FaRegSmile, FaRegMeh, FaRegFrown, FaSadTear } from 'react-icons/fa';
export const getFineDust = (pm10: number): {status: string, color: string, icon: IconType} => {
  if (pm10 <= 30) {
    return { 
      status: '좋음', 
      color: '#32A1FF', 
      icon: FaRegSmile
    };
  } else if (pm10 <= 80) {
    return {
      status: '보통',
      color: '#00C73C',
      icon: FaRegMeh
    }
  } else if (pm10 <= 150) {
    return {
      status: '나쁨',
      color: '#F36919',
      icon: FaRegFrown
    }
  } else {
    return {
      status: '매우 나쁨',
      color: '#F44336',
      icon: FaSadTear
    }
  }
}

export const getUltraFineDust = (pm2_5: number): {status: string, color: string, icon: IconType} => {
  if (pm2_5 <= 15) {
    return {
      status: '좋음', 
      color: '#32A1FF',
      icon: FaRegSmile
    }
  } else if (pm2_5 <= 35) {
    return {
      status: '보통', 
      color: '#00C73C',
      icon: FaRegMeh
    }
  } else if (pm2_5 <= 75) {
    return {
      status: '나쁨', 
      color: '#F36919',
      icon: FaRegFrown
    }
  } else {
    return {
      status: '매우 나쁨', 
      color: '#F44336',
      icon: FaSadTear
    }
  }
}

export const getAQI = (aqi: number) => {
  if (aqi <= 30) {
    return '좋음'
  } else if (aqi <= 80) {
    return '보통'
  } else if (aqi <= 150) { 
    return '나쁨'
  } else 
  return '매우 나쁨'
}

export const getO3 = (o3: number): {status: string, value: string} => {
  const o3InPpm = o3 / 1000
  const formatO3 = o3InPpm.toFixed(3)
  if (o3InPpm <= 0.03) {
    return {status: '좋음', value: formatO3}
  } else if (o3InPpm <= 0.09) {
    return {status: '보통', value: formatO3}
  } else if (o3InPpm <= 0.18) {
    return {status: '나쁨', value: formatO3}
  } else 
  return {status: '매우 나쁨', value: formatO3}
}

export const getCo = (co: number): {status: string, value: string} => {
  const coInPpm = co / 1000
  const formatCo = coInPpm.toFixed(1)
  if (coInPpm <= 0.1) { 
    return {status: '좋음', value: formatCo}
  } else if (coInPpm <= 0.3) { 
    return {status: '보통', value: formatCo}
  } else if (coInPpm <= 1.0) { 
    return {status: '나쁨', value: formatCo}
  } else 
  return {status: '매우 나쁨', value: formatCo}
}

export const getSo2 = (so2: number): {status: string, value: string} => {
  const so2InPpm = so2 / 10000
  const formatSo2 = so2InPpm.toFixed(3)
  if (so2InPpm <= 0.04) { 
    return {status: '좋음', value: formatSo2}
  } else if (so2InPpm <= 0.1) { 
    return {status: '보통', value: formatSo2}
  } else if (so2InPpm <= 0.2) { 
    return {status: '나쁨', value: formatSo2}
  } else 
  return {status: '매우 나쁨', value: formatSo2}
}

export const getNo2 = (no2: number): {status: string, value: string} => {
  const no2InPpm = no2 / 10000
  const formatNo2 = no2InPpm.toFixed(3)
  if (no2InPpm <= 0.05) {
    return {status: '좋음', value: formatNo2}
  } else if (no2InPpm <= 0.1) {
    return {status: '보통', value: formatNo2}
  } else if (no2InPpm <= 0.2) {
    return {status: '나쁨', value: formatNo2}
  } else 
  return {status: '매우 나쁨', value: formatNo2}
}

