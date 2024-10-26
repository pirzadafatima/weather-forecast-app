import React from 'react';
import { motion } from 'framer-motion';
import { cloudAnimation, sunAnimation, hazeAnimation, thunderAnimation} from '../Animations';

const WeatherProfile = ({ city, weatherData, forecast }) => {
  const { main, weather } = weatherData;
  console.log(forecast);

  const getWeatherAnimation = (description) => {
    if (description.includes('cloud')) return cloudAnimation;
    if (description.includes('clear') || description.includes('sun')) return sunAnimation;
    if (description.includes('haze') || description.includes('mist') || description.includes('smoke') || description.includes('dust') || description.includes('sand')) return hazeAnimation;
    if (description.includes('rain') || description.includes('thunderstorm') || description.includes('drizzle') || description.includes('snow')) return thunderAnimation;
    
    return {}; 
  };

  const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="max-w-screen-md lg:max-w-screen-lg mx-auto mt-16 lg:mt-24 bg-white bg-opacity-50 p-6 lg:p-10 rounded-lg shadow-lg justify-center text-center w-11/12 lg:w-3/4">
      <div className="flex items-center justify-center lg:flex lg:items-start lg:justify-start">
      <motion.div
          {...getWeatherAnimation(weather[0].description)}
          className="mr-6 sm:mr-16 lg:ml-20 lg:mr-16"
        >
          <motion.img
            src={getIconUrl(weather[0].icon)}
            alt={weather[0].description}
            className="w-36 h-36 mt-3"
          />
        </motion.div>
        <div className="items-end justify-end text-left py-2">
          <p className="text-xl md:text-2xl">Today</p>
          <h1 className="text-3xl py-1 md:text-4xl font-bold">{city}</h1>
          <p className="text-2xl md:text-3xl">{main.temp} °C</p>
          <p className="text-lg text-gray-500">{weather[0].description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:mt-8">
        {forecast.map((day, index) => (
          <motion.div
          key={index}
          className="flex flex-col items-center p-4 border rounded-3xl bg-white bg-opacity-20 shadow-md"
        >
          <p className="font-bold py-1">
            {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}
          </p>
          <motion.img
            src={getIconUrl(day.weather[0].icon)}
            alt={day.weather[0].description}
            className="w-16 h-16"
            {...getWeatherAnimation(day.weather[0].description)}
          />
          <p className="py-2">{day.main.temp} °C</p>
        </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeatherProfile;
