"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Droplets, Wind } from "lucide-react";

interface ForecastCardProps {
  date: number;
  minTemp: number;
  maxTemp: number;
  icon: string;
  description: string;
  index: number;
}

export default function ForecastCard({ date, minTemp, maxTemp, icon, description, index }: ForecastCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-4 text-center bg-gradient-to-br from-blue-500/5 to-purple-500/5 hover:from-blue-500/10 hover:to-purple-500/10 transition-colors">
        <p className="font-medium text-lg">{format(date * 1000, 'EEE')}</p>
        <p className="text-sm text-muted-foreground">{format(date * 1000, 'MMM d')}</p>
        <img 
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-16 h-16 mx-auto my-2"
        />
        <p className="text-sm text-muted-foreground capitalize mb-2">{description}</p>
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="text-blue-500">{Math.round(minTemp)}°</span>
          <span className="text-orange-500">{Math.round(maxTemp)}°</span>
        </div>
      </Card>
    </motion.div>
  );
}