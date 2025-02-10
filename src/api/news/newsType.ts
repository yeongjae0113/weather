export interface NewsSource {
  id: string | null;
  name: string;       // 뉴스 소스 이름
}

export interface Article {
  source: NewsSource;           // 뉴스 출처
  author: string | null;        // 작성자
  title: string;                // 기사 제목
  description: string | null;   // 기사 설명 
  url: string;                  // 기사 URL
  urlToImage: string | null;    // 기사 이미지 URL
  publishedAt: string;          // 기사 발행일 
  content: string | null;       // 기사 내용 
}

export interface NewsResponse {
  articles: Article[]
}
