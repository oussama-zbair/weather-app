"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface HourlyForecastProps {
  data: Array<{
    dt: number;
    temp: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
  tempUnit: 'C' | 'F';
}

export default function HourlyForecast({ data, tempUnit }: HourlyForecastProps) {
  const chartData = data.map(hour => ({
    time: format(hour.dt * 1000, 'HH:mm'),
    temp: tempUnit === 'C' ? hour.temp : (hour.temp * 9/5) + 32,
    icon: hour.weather[0].icon,
  }));

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
      <h3 className="text-xl font-semibold mb-4">24-Hour Forecast</h3>
      <div className="h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 rounded-lg shadow-lg">
                      <p className="text-sm font-medium">{data.time}</p>
                      <p className="text-sm">{Math.round(data.temp)}°{tempUnit}</p>
                      <img
                        src={`https://openweathermap.org/img/wn/${data.icon}.png`}
                        alt="weather icon"
                        className="w-8 h-8"
                      />
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}