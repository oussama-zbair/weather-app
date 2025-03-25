"use client";

import { motion } from "framer-motion";
import { Wind } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AirQualityProps {
  aqi: number;
  components: {
    co: number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
  };
}

export default function AirQuality({ aqi, components }: AirQualityProps) {
  const getAQIColor = (aqi: number) => {
    const colors = ['bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-purple-500'];
    return colors[aqi - 1] || colors[0];
  };

  const getAQILabel = (aqi: number) => {
    const labels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    return labels[aqi - 1] || 'Unknown';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 bg-gradient-to-br from-green-500/5 to-blue-500/5">
        <div className="flex items-center gap-2 mb-4">
          <Wind className="text-blue-500" />
          <h3 className="text-xl font-semibold">Air Quality</h3>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-full ${getAQIColor(aqi)} bg-opacity-20 flex items-center justify-center`}>
            <span className="text-2xl font-bold">{aqi}</span>
          </div>
          <div>
            <p className="text-lg font-medium">{getAQILabel(aqi)}</p>
            <p className="text-sm text-muted-foreground">Air Quality Index</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-sm text-muted-foreground">PM2.5</p>
            <p className="font-medium">{components.pm2_5.toFixed(1)} µg/m³</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-sm text-muted-foreground">PM10</p>
            <p className="font-medium">{components.pm10.toFixed(1)} µg/m³</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-sm text-muted-foreground">O₃</p>
            <p className="font-medium">{components.o3.toFixed(1)} µg/m³</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-sm text-muted-foreground">NO₂</p>
            <p className="font-medium">{components.no2.toFixed(1)} µg/m³</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}