import React from 'react';

const WeeklyForecast = ({ dailyData }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg shadow-md">
      {dailyData.map((day, index) => (
        <div key={index} className="flex items-center justify-between">
          <p className="text-sm text-gray-600">{new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}</p>
          <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="Weather Icon" className="w-8 h-8" />
          <p className="text-sm text-gray-800">{day.temp.day}°C</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
