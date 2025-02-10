interface ImportMetaEnv {
  VITE_KWEATHER_API_KEY: string
  VITE_WEATHER_API_KEY: string
  VITE_NEWS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "leaflet/dist/leaflet.css";
declare module "*.css";