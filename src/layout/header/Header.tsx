import { useCity } from "../../context/CityContext"
import CityInput from "../../components/Weather/CityInput"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const Header = () => {
  const movePage = useNavigate()
  const {setCity} = useCity()
  
  const [selectedPage, setSelectedPage] = useState<string>('home')

  useEffect(() => {
    if (window.location.pathname === '/') {
      setSelectedPage('home')
    } if (window.location.pathname === '/fineDust') {
      setSelectedPage('finrDust')
    } if (window.location.pathname === '/weatherNews') {
      setSelectedPage('weatherNews') 
    } if (window.location.pathname === '/airQualityNews') {
      setSelectedPage('airQualityNews') 
    } if (window.location.pathname === '/kWeather') {
      setSelectedPage('kWeather')
    }
  }, [window.location.pathname])

  const handleNavigation = (page: string, path: string) => {
    setSelectedPage(page)
    movePage(path)
  }

  return (
    <>
      <div 
        style={{ 
          width: '95%', 
          padding: '0 1rem', 
          paddingBottom: '0.5rem',
          textAlign: 'center', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem'}}> 
          <div 
            onClick={() => handleNavigation('home', '/')}
            style={{display: 'flex', cursor: 'pointer'}}>
            <img
              src="/img/weather.png"
              alt="날씨 아이콘"
              style={{ width: '40px'}}
            />
            <div style={{fontWeight: 'bold', fontSize: '1.4rem', textAlign:'center', alignContent: 'center'}}>Weather</div>
          </div>
          <div 
            onClick={() => handleNavigation('home', '/')}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              borderBottom: selectedPage === 'home' ? '2px solid black' : 'none',
              color: selectedPage === 'home' ? 'black' : '#888', 
            }}
          >
            홈
          </div>
          <div
            onClick={() => handleNavigation('fineDust', '/fineDust')}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              borderBottom: selectedPage === 'fineDust' ? '2px solid black' : 'none',
              color: selectedPage === 'fineDust' ? 'black' : '#888'
            }}
          >
            미세먼지
          </div>
          <div
            onClick={() => handleNavigation('weatherNews', '/weatherNews')}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              borderBottom: selectedPage === 'weatherNews' ? '2px solid black' : 'none',
              color: selectedPage === 'weatherNews' ? 'black' : '#888', 
            }}
          >
            기상뉴스
          </div>
          <div
            onClick={() => handleNavigation('airQualityNews', '/airQualityNews')}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              borderBottom: selectedPage === 'airQualityNews' ? '2px solid black' : 'none',
              color: selectedPage === 'airQualityNews' ? 'black' : '#888'
            }}
          >
            대기질뉴스
          </div>
          <div
            onClick={() => handleNavigation('kWeather', '/kWeather')}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              borderBottom: selectedPage === 'kWeather' ? '2px solid black' : 'none',
              color: selectedPage === 'kWeather' ? 'black' : '#888'
            }}
          >
            한국 날씨
          </div>
        </div>
      
        <CityInput setCity={setCity} />
      </div>
      <div style={{ width: '100%', borderBottom: '1px solid #ddd' }} />
    </>
  );
};

export default Header;
