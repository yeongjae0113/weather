import { useState, useEffect, Suspense } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { WeahterMapProps } from "../../api/weather/weatherTypes";
import { fetchWeatherMap } from "../../api/weather/weatherService";

const WeatherMap = ({city}: WeahterMapProps) => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    console.log("현재 좌표 상태:", coords);
  }, [coords])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherMap = await fetchWeatherMap(city)
        const weatherMaps = weatherMap
        setCoords({
          lat: weatherMaps.coord?.lat,
          lon: weatherMaps.coord?.lon
        })
      } catch (error) {
        console.log('지도 에러: ', error)
      }
    }

    fetchData()
  }, [city])

  const position: [number, number] | undefined = coords ? [coords.lat, coords.lon] : undefined

  return (
    <div>
      {coords && position && (
        <div style={{width: '98%', height: "400px"}}>
          <Suspense fallback={<div>로딩 중...</div>}>
            <MapContainer key={position.toString()} center={position} zoom={7} style={{width: '100%', height: '92%', margin: '1rem', borderRadius: '25px'}}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position}>
              </Marker>
            </MapContainer>
          </Suspense>
        </div>
      )}
    </div>
  )
}

export default WeatherMap
