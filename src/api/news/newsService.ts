import axios from "axios";
import { newsConfig } from "../../config/ApiConfig";
import { NewsResponse } from "./newsType";

export const queryMap: Record<string, Record<string, string>> = {
  'ko': {
    'weather': '날씨',
    'fineDust': '미세먼지'
  },
  'en': {
    'weather': 'weather',
    'fineDust': 'pm10'
  },
  'zh': {
    'weather': '天气',
    'fineDust': '空气质量'
  }
}


export const fetchNews = async (language: string, category: string): Promise<NewsResponse> => {
  try {
      const query = queryMap[language]?.[category] || queryMap['ko']['weather']
      const response = await axios.get<NewsResponse>(
      `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=${language}&apiKey=${newsConfig.apiKey}`
    )
    return response.data
  } catch (error) {
    throw new Error(`${language} 뉴스를 가져오지 못함`)
  }
}