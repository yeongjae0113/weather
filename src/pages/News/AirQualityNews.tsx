import { useEffect, useState } from "react"
import { NewsResponse } from "../../api/news/newsType"
import { fetchNews } from "../../api/news/newsService"
import Header from "../../layout/header/Header"
import Footer from "../../layout/footer/Footer"
import SelectedButton from "../../components/News/SelectedButton"
import { Pagination } from "@mui/material"

const AirQualityNews = () => {
  const [newsData, setNewsData] = useState<NewsResponse | null>(null)
  const [language, setLanguage] = useState<string>('ko')
  const [category, setCategory] = useState<string>('fineDust')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const datas = newsData?.articles || []
  const articlesPage = 6

  const getNews = async() => {
    const data = await fetchNews(language, category)
    console.log('대기질 뉴스 데이터: ', data)

    setNewsData(data)
  }

  useEffect(() => {
    getNews()
    console.log('category: ', category)
  }, [language, category])

  const handlePageChange = (_: any, value: number) => {  // _ 는 매개변수 => 값은 필요없지만 있어야만 하는 자리이기 때문에 _ 로 처리
    setCurrentPage(value);                                                      // value 는 
  }

  const startIndex = (currentPage - 1) * articlesPage;
  const endIndex = startIndex + articlesPage;
  const currentArticles = newsData ? newsData.articles.slice(startIndex, endIndex) : [];

  return (
    <>
    <Header />
      <div style={{width: '80%', margin: '0 auto'}}>
        <SelectedButton
          language={language}
          setLanguage={setLanguage}
          setCategory={setCategory}
        />

        {datas ? (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: "space-between",
                margin: "1rem 3rem",
              }}
            >
              {currentArticles.map((article, index) => (
                <div
                  key={index}
                  onClick={() => window.open(article.url, "_blank")}
                  style={{
                    display: "flex",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    cursor: "pointer",
                    padding: "1rem",
                    width: "48%",
                    height: '15rem',
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{paddingRight: "1rem", flex: "1", maxWidth: "40%", height: '100%'}}>
                    {article.urlToImage && (
                      <img
                        src={article.urlToImage}
                        alt="뉴스 이미지"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                  <div style={{flex: "2", minWidth: "0", height: '100%'}}>
                    <h2
                      style={{
                        height: '14%',
                        marginTop: "0.3rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {article.title}
                    </h2>
                    <p style={{height: "42%", fontSize: '1rem', overflow: "hidden", textOverflow: "ellipsis", display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: "vertical"}}>
                      {article.description}
                    </p>
                    <p style={{marginBottom: '0rem', fontSize: '0.8rem'}}>
                      <strong>작성자:</strong> {article.author || "미정"}
                    </p>
                    <div style={{display: "flex", fontSize: '0.8rem'}}>
                      <p>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </p>
                      <p style={{marginLeft: "1rem"}}>
                        | &nbsp;&nbsp;&nbsp;{article.source.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <Pagination
            count={Math.ceil((newsData?.articles.length || 0) / articlesPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="secondary"
            size="large"
            style={{ margin: "1rem auto", display: "flex", justifyContent: "center" }}
          />
          </>
        ) : (
          <p>뉴스 데이터를 불러오는 중입니다...</p>
        )}
      </div>
    <Footer />
  </>
  )
}
export default AirQualityNews