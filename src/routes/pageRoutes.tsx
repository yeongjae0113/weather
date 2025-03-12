import { RouteObject } from "react-router-dom";
import Weather from "../pages/Home/Weather";
import FineDust from "../pages/Fine-dust/FineDust";
import WeatherNews from "../pages/News/WeatherNews";
import AirQualityNews from "../pages/News/AirQualityNews";

const pageRoutes: RouteObject[] = [
  { path: '/', element: <Weather /> },
  { path: '/fineDust', element: <FineDust /> },
  { path: '/weatherNews', element: <WeatherNews /> },
  { path: '/airQualityNews', element: <AirQualityNews /> },
]

export default pageRoutes