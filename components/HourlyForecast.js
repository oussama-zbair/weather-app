import React from 'react';
import { FaTemperatureHigh } from 'react-icons/fa';

const HourlyForecast = ({ hourlyData }) => {
  return (
    <div className="overflow-x-auto flex space-x-4 p-4 bg-blue-50 rounded-lg shadow-md">
      {hourlyData.map((hour, index) => (
        <div key={index} className="flex flex-col items-center">
          <p className="text-sm text-gray-600">{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="Weather Icon" className="w-12 h-12" />
          <p className="text-sm text-gray-800">{hour.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
