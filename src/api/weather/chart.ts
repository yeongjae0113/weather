import { Chart } from "chart.js";
import { HourlyResponse } from "./weatherTypes";

export function transformHourlyData(hourlyData: HourlyResponse) {
  const labels = hourlyData.list.map(item => {
    const date = new Date(item.dt * 1000);
    const hours = date.getHours();
    
    const options: Intl.DateTimeFormatOptions = hours === 0
    ? { 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }
    : { 
        hour: '2-digit', 
        minute: '2-digit' 
      };
    
    return date.toLocaleString('ko-KR', options);
  });

  const data = hourlyData.list.map(item => Math.floor(item.main.temp));  // 온도 데이터

  return { labels, data };
}


// 차트를 생성 함수
export function createHourlyChart(labels: string[], data: number[]) {
  const ctx = document.getElementById("hourlyChart") as HTMLCanvasElement;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "시간별 온도 (°C)",
          data: data,
          borderColor: 'black',
          backgroundColor: 'black',
          fill: true,
          tension: 0.4, 
          pointBackgroundColor: 'black',
          pointBorderColor: 'black',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "온도 (°C)",
          },
        },
        x: {
          title: {
            display: true,
            // text: "시간",
          },
        },
      },
    },
  });
}