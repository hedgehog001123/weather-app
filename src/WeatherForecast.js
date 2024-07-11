import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherForecast() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState({ latitude: 34.6551, longitude: 133.9195 }); // デフォルトで岡山市の座標


    useEffect(() => {
        const fetchWeather = async () => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;
          
            try {
              const response = await axios.get(url);
                setWeather(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
    
        fetchWeather();
      }, [location]);


    return (
        <div>
            <h1>天気予報</h1>
            <input
                type="number"
                value={location.latitude}
                onChange={(e) => setLocation(prev => ({ ...prev, latitude: e.target.value }))}
                placeholder="緯度"
            />
            <input
                type="number"
                value={location.longitude}
                onChange={(e) => setLocation(prev => ({ ...prev, longitude: e.target.value }))}
                placeholder="経度"
            />
            {weather && (
                <div>
                    <h2>現在の天気</h2>
                    <p>温度: {weather.current_weather.temperature}°C</p>
                    <p>風速: {weather.current_weather.windspeed} km/h</p>
                    <p>Weather Code: {weather.current_weather.weathercode}</p>
                </div>
            )}
        </div>
    );
}

export default WeatherForecast;