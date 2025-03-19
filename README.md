# 🏬 Weather - 날씨 정보 서비스
> **개발 기간 : 2025.01 ~ 2025.02**

<div align="center">
<!-- <img width="100%" height="60%" src="https://github.com/user-attachments/assets/f6be51d4-5653-4998-902f-11f191c7962c" alt="스크린샷"> -->
<img width="500" src="https://github.com/user-attachments/assets/f6be51d4-5653-4998-902f-11f191c7962c" alt="스크린샷">
</div>
<br/>

## 🚀 프로젝트 소개
Weather 서비스는 실시간 날씨와 미세먼지 정보를 제공하는 React 애플리케이션입니다. OpenWeatherMap API를 사용하여 날씨와 미세먼지 정보를 받아와 시각화합니다. <br/>
OpenWeatherMap API 와 News API에서 받아온 다양한 기상 데이터를 구조화하여 분류하였으며 이를 통해 사용자가 원하는 정보를 직관적으로 확인할 수 있도록 UI/UX를 개선하였습니다.
<br/>

## 🛠️ 기술 스택

### Development  
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge) 
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=for-the-badge)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=fff&style=for-the-badge)

## 🙋‍♂️ 주요 기능
| 🙋‍♂️ 기능 설명 |
|--------------|
| - 💾 **현재 날씨 및 시간별 날씨 정보 제공** <br>- 🛡️ **현재 및 시간별 미세먼지, 초미세먼지 정보 제공** <br>- 🧪 **즐겨찾기 CRUD 구현** <br>- 🪪 **도시 검색** <br>- 📊 **날씨 API 통합** <br>- 🎨 **Chart.js를 활용한 날씨 그래프 구현** <br>- 🗃️ **Leaflet을 활용한 지도 구현** <br>- 🚀 **Doughnut chart를 활용한 미세먼지 도넛 그래프 구현** |

## 📊 ERD (Entity-Relationship Diagram)
<img width="100%" alt="ERD" src="https://github.com/user-attachments/assets/d9ea4022-ffeb-4c60-a0e7-56ff794abeed"/>

**프로젝트의 데이터베이스는 위와 같은 ERD를 기반으로 설계되었습니다.**

- `user 테이블` : 사용자 정보를 저장하는 테이블입니다.
- `favorite 테이블` : 즐겨찾기 정보를 저장하는 테이블입니다.

## 📺 페이지 구성

| <h4> 날씨 페이지 </h4> |
| :-------------------------------------------: |
| <img width="49%" src="https://github.com/user-attachments/assets/a049be4f-8dc0-4e1d-b903-d8a09be13047" alt="날씨 페이지 1" /> <img width="49%" src="https://github.com/user-attachments/assets/a36ae9ce-c27c-4fbf-a931-5de5f4a244aa" alt="날씨 페이지 2" /> |
| <img width="100%" alt="메인" src="https://github.com/user-attachments/assets/2e501300-58a6-4831-b4e5-0c1379f58007" /> |
| <div align="left"> **1. 검색 지역의 현재 날씨와 주간 예보 정보를 열람할 수 있습니다.** <br/> **2. 지도를 통해 사용자가 검색한 지역의 위치를 지도로 나타내줍니다.** <br/> **3. 각 날짜 버튼을 눌러 사용자가 원하는 날짜의 날씨 정보를 열람할 수 있습니다.** <br/> **4. 라인 그래프를 통해 사용자가 날씨 정보를 한 눈에 볼 수 있습니다.** <br/> **6.즐겨찾기 기능을 통해 로그인한 유저는 손쉽게 해당 지역의 날씨를 열람할 수 있습니다.** </div> |

<br />

| <h4> 미세먼지 페이지 </h4> |
| :-------------------------------------------: |
| <img width="100%" alt="미세먼지 페이지" src="https://github.com/user-attachments/assets/3b6a28b2-f561-4bb5-8748-34b834bd33ce" /> |
| <div align="left"> **1. 검색 지역의 현재 미세먼지 및 초미세먼지 정보와 주간 예보 정보를 열람할 수 있습니다.** <br/> **2. 각 버튼을 눌러 사용자가 원하는 날짜의 미세먼지 정보를 열람할 수 있습니다.** <br/> **3. 도넛 그래프를 통해 사용자가 더 쉽게 정보를 얻을 수 있습니다** </div> |

<br />

| <h4> 기상 뉴스 페이지 </h4> |
| :-------------------------------------------: |
| <img width="100%" alt="기상 뉴스 페이지" src="https://github.com/user-attachments/assets/8936c06f-efb2-4591-bcc4-1ac7003eb80b" /> |
| <div align="left"> **한국, 중국, 해외 총 세 가지의 카테고리로 나누어 기상 관련 뉴스를 열람할 수 있습니다.** </div> |

<br />

| <h4> 대기질 뉴스 페이지 </h4> |
| :-------------------------------------------: |
| <img width="100%" alt="대기질 뉴스 페이지" src="https://github.com/user-attachments/assets/8224ce68-fb35-42d6-bb23-854d55d1f7de" /> |
| <div align="left"> **기상 뉴스 페이지와 같이 한국, 중국, 해외 총 세 가지의 카테고리로 나누어 대기질 관련 뉴스를 열람할 수 있습니다.** </div> |

<br />

| <h4> 회원탈퇴 페이지 </h4> |
| :-------------------------------------------: |
| <img width="100%" alt="대기질 뉴스 페이지" src="https://github.com/user-attachments/assets/d84e43f5-c429-4de5-b8a7-9219691191dc" /> |
| <div align="left"> **1. 서비스를 더이상 이용하고 싶지 않을 때 이용하는 회원탈퇴를 할 수 있는 페이지입니다.** <br/> **2."회원탈퇴" 를 정확히 입력해야 회원탈퇴 버튼이 활성화됩니다.** </div> |
