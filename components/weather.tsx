'use client'

import { useEffect, useState } from "react";
import styles from "../styles/weather.module.css";

interface WeatherData {
  weather: { main: string }[];
  main: { temp: number };
  name: string;
}

export async function fetchWeather(lat: number, lon: number) {
  const API_KEY = '7a923370a59929f6858d50f29c1ae4fe';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  console.log('Weather data:', data);
  return data;
}

export default function Weather() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      console.log('위치값 확인:', location);
      fetchWeather(location.lat, location.lon)
        .then((data) => {
          setWeatherData(data);  // 위치 기준으로 가져온 날씨 데이터를 상태에 저장
        })
        .catch((error) => {
          setError('날씨 데이터 가져오기 실패');
          console.error('Error:', error);
        });
    }
  }, [location]); // 위치 정보(location)가 업데이트 될 때마다 fetchWeather 호출

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {          
          console.log(position);
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log('Latitude:', lat, 'Longitude:', lon);
          setLocation({ lat, lon });
        },
        (error) => {
          setError('위치 검색에 실패');
          console.error('Error:', error);
          alert("Can't find you. No weather for you.");
        }
      );
    } else {
      setError('브라우저에서 지원하지 않음');
      console.error('Error:', error);
    }
  }, []);
  
  return (
    <div className={styles.weather}>
        {weatherData ? (
        <>
          <p>{weatherData.weather[0].main} / {weatherData.main.temp}°C</p>
          <p>{weatherData.name}</p>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  )
}