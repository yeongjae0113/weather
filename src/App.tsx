import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CityProvider } from "./context/CityContext";
import Weather from "./pages/Home/Weather";
import FineDust from "./pages/Fine-dust/FineDust";
import AirQualityNews from "./pages/News/AirQualityNews";
import WeatherNews from "./pages/News/WeatherNews";

const App = () => {
  return (
    <CityProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/fineDust" element={<FineDust />} />
          <Route path="/weatherNews" element={<WeatherNews />} />
          <Route path="/airQualityNews" element={<AirQualityNews />} />
        </Routes>
      </Router>
    </CityProvider>
  )
}

export default App;
