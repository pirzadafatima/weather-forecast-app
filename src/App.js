import React, { useState } from 'react';
import WeatherProfile from './components/WeatherProfile.js';
import './App.css';

function App() {
  const [searchCity, setSearchCity] = useState('');
  const [displayedCity, setDisplayedCity] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(''); 
  const [isFirstLoad, setIsFirstLoad] = useState(true); 

  const api = {
    key: 'fc93e325717dd9a772de20fc414105a4',
    base: 'http://api.openweathermap.org/data/2.5/'
  };

  const handleSearch = () => {
    if (!searchCity) return; 
    
    setError(''); 
    setIsFirstLoad(false); 

    fetch(`${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) throw new Error('City not found');
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setWeather(result);
        setDisplayedCity(searchCity);
      })
      .catch(() => setError('City not found. Please enter a valid city name.'));

    fetch(`${api.base}forecast?q=${searchCity}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) throw new Error('City not found');
        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (result.list) { 
          const dailyForecast = result.list.filter((reading) => {
            const readingDate = new Date(reading.dt_txt).getDate();
            return reading.dt_txt.includes("12:00:00") && readingDate !== new Date().getDate();
          });
          setForecast(dailyForecast.slice(0, 4));
        } else {
          setForecast([]);
        }
      })
      .catch(() => setError('City not found. Please enter a valid city name.'));
  };

  return (
    <div className="app-container bg-cover bg-center min-h-screen border-4 border-white" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="flex justify-center p-10 w-full">
        <div className="flex w-full sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/2">
          <input
            type="text"
            placeholder="Enter a city..."
            className="border border-gray-300 rounded-l-full p-2 text-center w-full flex-grow text-base sm:text-lg md:text-xl"
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-pink-500 text-white rounded-r-full text-sm sm:text-sm md:text-xl flex-shrink-0">
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg text-center mx-auto mb-6 max-w-screen-md">
          {error}
        </div>
      )}

      {isFirstLoad && (
        <div className="text-center text-2xl lg:text-3xl font-semibold text-gray-800 mt-16">
          <p>Welcome to <span className="text-pink-600">Weatherly</span>!</p>
          <p className="text-lg mt-2 text-gray-600">Enter your city to see the latest weather forecast and details.</p>
        </div>
      )}

      {weather.main && !isFirstLoad && (
        <WeatherProfile city={displayedCity} weatherData={weather} forecast={forecast} />
      )}
    </div>
  );
}

export default App;
