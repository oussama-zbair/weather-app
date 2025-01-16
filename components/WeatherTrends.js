import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeatherTrends = ({ hourlyData }) => {
  const chartData = hourlyData.map((hour) => ({
    time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: hour.temp,
    humidity: hour.humidity,
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Tendances météorologiques</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" name="Température" />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidité" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherTrends;
