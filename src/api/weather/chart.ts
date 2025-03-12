import { HourlyResponse } from "./weatherTypes";

export function transformHourlyData(hourlyData: HourlyResponse) {
  const labels: any = []
  const data: any = []

  hourlyData.list.map((item) => {
    // console.log('그래프: ', hourlyData.list)
    const date = new Date(item.dt * 1000)
    const hours = date.getHours()
    
    if (![0, 3, 9, 12, 15, 21,].includes(hours)) {
      const options: Intl.DateTimeFormatOptions = hours === 6
        ? { 
            month: '2-digit', 
            day: '2-digit', 
            // hour12: true
            hour: '2-digit', 
            // minute: '2-digit' 
          }
        : 
          { 
            // hour12: true
            hour: '2-digit', 
            // minute: '2-digit' 
          }

      let formattedDate = date.toLocaleString('ko-KR', options)
      formattedDate = formattedDate.replace(/0?(\d{1,2})\.\s0?(\d{1,2})\./, '$1/$2')
      console.log(formattedDate)
      labels.push(formattedDate)
      data.push(Math.floor(item.main.temp))   // 온도 데이터 추가
    }
  })

  return { labels, data }
}