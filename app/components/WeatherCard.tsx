"use client";

import { motion } from "framer-motion";
import { Cloud, Droplets, Wind, ThermometerSun, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  city: string;
  country: string;
  countryCode: string;
}

function getCountryFlagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

export default function WeatherCard({
  temperature,
  humidity,
  windSpeed,
  description,
  icon,
  city,
  country,
  countryCode,
}: WeatherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold flex items-center gap-2">
              <ThermometerSun className="text-orange-500" />
              {Math.round(temperature)}°C
            </h2>
            <p className="text-lg text-muted-foreground capitalize mt-1">{description}</p>

            {/* 🏳️ City + Country + Flag */}
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{city}, {country} {getCountryFlagEmoji(countryCode)}</span>
            </div>
          </div>
          
          <img 
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt={description}
            className="w-24 h-24"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
            <Droplets className="text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">{humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
            <Wind className="text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-medium">{windSpeed} m/s</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
            <Cloud className="text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Condition</p>
              <p className="font-medium capitalize">{description}</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
