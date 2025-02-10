import { useEffect } from "react"

const SelectedButton = ({language, setLanguage, setCategory} : {language: string, setLanguage: (lang: string) => void, setCategory: (cate: string) => void}) => {

  const clickNews = ((language: string) => {
    setLanguage(language)
  })

  useEffect(() => {
    if (window.location.pathname === '/WeatherNews') {
      setCategory('weather')
    } if (window.location.pathname === '/AirQualityNews') {
      setCategory('fineDust')
    }
  }, [setCategory])

  return (
    <>
      <div style={{display: 'flex', gap: '3rem', margin: '1rem 0 0 3rem'}}>
        <div
          onClick={() => clickNews('ko')}
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            color: language === 'ko' ? 'black' : '#888',
          }}
        >
          한국 뉴스
        </div>
        <div
          // onClick={() => clickNews('zh', category)}
          onClick={() => clickNews('zh')}
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            color: language === 'zh' ? 'black' : '#888',
          }}
        >
          중국 뉴스
        </div>
        <div
          onClick={() => clickNews('en')}
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            color: language === 'en' ? 'black' : '#888',
          }}
        >
          해외 뉴스
        </div>
      </div>
    </>
  )
}
export default SelectedButton