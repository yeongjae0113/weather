import CityInput from "../../components/Weather/CityInput"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useCity } from "../../contexts/CityContext";
import { AuthContext } from "../../contexts/AuthContext";


const Header = () => {
  const movePage = useNavigate()
  const { setCity } = useCity()
  const [selectedPage, setSelectedPage] = useState<string>('home')
  const [isDropdown, setIsDropdown] = useState<boolean>(false)
  const userDetail = useContext(AuthContext)

  useEffect(() => {
    if (window.location.pathname === '/') {
      setSelectedPage('home')
    } else if (window.location.pathname === '/fineDust') {
      setSelectedPage('fineDust')
    } else if (window.location.pathname === '/weatherNews') {
      setSelectedPage('weatherNews') 
    } else if (window.location.pathname === '/airQualityNews') {
      setSelectedPage('airQualityNews') 
    } else if (window.location.pathname === '/kWeather') {
      setSelectedPage('kWeather')
    } else if (window.location.pathname === '/login') {
      setSelectedPage('login')
    } else if (window.location.pathname === '/join') {
      setSelectedPage('join')
    }
  }, [window.location.pathname])

  const toggleDropdown = () => {
    setIsDropdown(prev => !prev)
    console.log(isDropdown)
  }

  const handleNavigation = (page: string, path: string) => {
    setSelectedPage(page)
    movePage(path)
  }

  const handleMyPage = () => {
    movePage('/mypage')
  }

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      try {
        await signOut(auth)
        alert('로그아웃 되었습니다.')
        movePage('/')
      } catch (error) {
        console.error('로그아웃 오류:', error)
      }
    }
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
            <div 
              style={{
                fontWeight: 'bold', 
                fontSize: '1.4rem', 
                textAlign:'center', 
                alignContent: 'center'
              }}
            >
              Weather
            </div>
          </div>
          <div 
            onClick={() => handleNavigation('home', '/')}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.2rem',
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
              fontSize: '1.2rem',
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
              fontSize: '1.2rem',
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
              fontSize: '1.2rem',
              color: selectedPage === 'airQualityNews' ? 'black' : '#888'
            }}
          >
            대기질뉴스
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '1rem' }}>
            <CityInput setCity={setCity} />
          </div>

          {!userDetail?.user ? (
            <>
              <div
                onClick={() => handleNavigation('login', '/login')}
                style={{
                  marginLeft: '2rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: selectedPage === 'login' ? 'black' : '#888',
                }}
              >
                로그인
              </div>
              <div
                onClick={() => handleNavigation('join', '/join')}
                style={{
                  marginLeft: '2rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: selectedPage === 'join' ? 'black' : '#888',
                }}
              >
                회원가입
              </div>
            </>
          ) : (
            <>
              <div 
                onClick={toggleDropdown} 
                style={{
                  height: '1.5rem',
                  fontWeight: 'bold',
                  backgroundColor: 'rgb(169 169 169)',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {userDetail.user?.email}
              </div>

              {isDropdown && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '5.2%',
                    right: '2.9%',
                    backgroundColor: 'rgb(169 169 169)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '0 0 0.5rem 0.5rem',
                    width: '10rem',
                    zIndex: 1000,
                  }}
                >
                  <div 
                    onClick={handleMyPage} 
                    style={{
                      padding: '0.5rem',
                      cursor: 'pointer',
                      borderBottom: '1px solid #ddd',
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    마이페이지
                  </div>
                  <div 
                    onClick={handleLogout} 
                    style={{
                      padding: '0.5rem',
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    로그아웃
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div style={{ width: '100%', borderBottom: '1px solid #ddd' }} />
    </>
  )
}

export default Header
