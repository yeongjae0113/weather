import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { fetchHourlyData } from "../../api/weather/weatherService";
import { transformHourlyData } from "../../api/weather/chart";
import { Line } from "react-chartjs-2";
import { useCity } from "../../context/CityContext";

ChartJS.register(...registerables);

const HourlyWeatherChart = () => {
  const { city } = useCity()
  const [labels, setLabels] = useState<string[]>([]) // x축 라벨
  const [data, setData] = useState<number[]>([]) // y축 데이터

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hourlyResponse = await fetchHourlyData(city);
        const transformData = transformHourlyData(hourlyResponse);
        setLabels(transformData.labels);
        setData(transformData.data);
      } catch (error) {
        console.log("차트 에러: ", error);
      }
    };

    fetchData();
  }, [city]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "시간별 온도 (°C)",
        data,
        borderColor: "black",
        fill: true,
        tension: 0.4,
        borderWidth: 1,
        pointBackgroundColor: data.map((temp) => (temp >= 0 ? "red" : "blue")),
        pointBorderColor: data.map((temp) => (temp >= 0 ? "red" : "blue")),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
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
        },
      },
    },
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "30rem",
        margin: "3rem auto",
      }}
    >
      <Line data={chartData} options={chartOptions} height={20} width={65} />
    </div>
  );
};

export default HourlyWeatherChart;
