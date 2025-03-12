import CityInput from "../../components/Weather/CityInput"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useCity } from "../../context/CityContext";
import { AuthContext } from "../../context/AuthContext";


const Header = () => {
  const movePage = useNavigate()
  const {setCity} = useCity()
  const [selectedPage, setSelectedPage] = useState<string>('home')
  const userDetail = useContext(AuthContext)
  console.log('Header = userDetail: ', userDetail)

  useEffect(() => {
    if (window.location.pathname === '/') {
      setSelectedPage('home')
    } if (window.location.pathname === '/fineDust') {
      setSelectedPage('fineDust')
    } if (window.location.pathname === '/weatherNews') {
      setSelectedPage('weatherNews') 
    } if (window.location.pathname === '/airQualityNews') {
      setSelectedPage('airQualityNews') 
    } if (window.location.pathname === '/kWeather') {
      setSelectedPage('kWeather')
    } if (window.location.pathname === '/login') {
      setSelectedPage('login')
    } if (window.location.pathname === '/join') {
      setSelectedPage('join')
    }
  }, [window.location.pathname, userDetail])

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
        console.error
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
        </div>


        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: '1rem'}}>
            <CityInput setCity={setCity} />
          </div>
          {!userDetail?.user ? (
            <>
              <div
                onClick={() => handleNavigation('login', '/login')}
                style={{
                  marginLeft: '2rem',
                  alignContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  borderBottom: selectedPage === 'login' ? '2px solid black' : 'none',
                  color: selectedPage === 'login' ? 'black' : '#888'
                }}
              >
                로그인
              </div>
              <div
                onClick={() => handleNavigation('login', '/join')}
                style={{
                  marginLeft: '2rem',
                  alignContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  borderBottom: selectedPage === 'join' ? '2px solid black' : 'none',
                  color: selectedPage === 'join' ? 'black' : '#888'
                }}
              >
                회원가입
              </div>
            </>
          ) : (
            <>
              <div
                onClick={handleMyPage}
                style={{
                  height: '1.5rem',
                  fontWeight: 'bold',
                  alignContent: 'center',
                  backgroundColor: '#888',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                {userDetail.user?.email}
              </div>
              <div
                onClick={handleLogout}
                style={{
                  marginLeft: '2rem',
                  alignContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  color: '#888'
                }}
              >
                로그아웃
              </div>
            </>
          )
        }
        </div>

      </div>
      <div style={{ width: '100%', borderBottom: '1px solid #ddd' }} />
    </>
  );
};

export default Header;
