import React, { useState } from 'react';
import Swal from 'sweetalert2';
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  
  const fetchWeather = async () => 
  {
    if(!city)
    {
      Swal.fire({
        title: "Warning",
        text: "Input can\t be empty",
        icon: "warning"
      });
    }
    setWeather(null);
    try 
    {
        const apiKey = 'b1a7e3d4f84328c072f60a60d961c4c5'; 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        const data = await response.json();
        setWeather(data);
    } 
    catch (err)
    {
        console.error("error in fetching" ,err);
    } 
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>

        <div className="relative mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="block w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchWeather}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Search
          </button>
        </div>
        

        {weather && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{weather.name}, {weather.sys.country}</h2>
            <p className="text-4xl font-light">{Math.round(weather.main.temp)}°C</p>
            <p className="text-xl font-light">{weather.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="mx-auto mt-4"
            />
            <p className="mt-2">Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
          </div>
        )}
      
      </div>
    </div>
  );
}

export default App;
