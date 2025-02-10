export const getWindDirection = (UUU: string, VVV: string): string => {
  const uuu = parseFloat(UUU)   // 동서
  const vvv = parseFloat(VVV)   // 남북

  if (uuu > 0 && vvv > 0) {
    return '북동풍'
  } else if (uuu > 0 && vvv < 0) {
    return '남동풍'
  } else if (uuu < 0 && vvv > 0) {
    return '북서풍'
  } else if (uuu < 0 && vvv < 0) {
    return '남서풍'
  } else if (uuu === 0 && vvv > 0) {
    return '북풍'
  } else if (uuu === 0 && vvv < 0) {
    return '남풍'
  } else if (uuu > 0 && vvv === 0) {
    return '동풍'
  } else if (uuu < 0 && vvv === 0) {
    return '서풍'
  } else {
    return '바람 없음'
  }
}

export const skyDescription = (skyStatus: string) => {
  switch (skyStatus) {
    case '1':
      return '맑음'
    case '3':
      return '구름 많음'
    case '4':
      return '흐림'
    default:
      return '알 수 없음'
  }
}

export const ptyDescription = (ptyStatus: string) => {
  switch (ptyStatus) {
    case '0':
      return '없음'
    case '1':
      return '비'
    case '2':
      return '비/눈'
    case '3':
      return '눈'
    case '4':
      return '소나기'
  }
}