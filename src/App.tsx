import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CityProvider } from "./context/CityContext";
import Weather from "./pages/Home/Weather";
import FineDust from "./pages/Fine-dust/FineDust";
import AirQualityNews from "./pages/News/AirQualityNews";
import WeatherNews from "./pages/News/WeatherNews";
import Login from "./pages/Login/login";
import FindPwd from "./pages/Login/FindPwd/findPwd";
import Join from "./pages/Join/join";
import ResetPwd from "./pages/Login/ResetPwd/resetPwd";
import AuthProvider from "./provider/AuthProvider";
import MyPage from "./pages/MyPage/myPage";

const App = () => {
  return (
    <AuthProvider>
      <CityProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Weather />} />
            <Route path="/fineDust" element={<FineDust />} />
            <Route path="/weatherNews" element={<WeatherNews />} />
            <Route path="/airQualityNews" element={<AirQualityNews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findPwd" element={<FindPwd />} />
            <Route path='resetPwd' element={<ResetPwd />} />
            <Route path="/join" element={<Join />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Router>
      </CityProvider>
    </AuthProvider>
  )
}

export default App;
