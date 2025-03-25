"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface WeatherAlertsProps {
  alerts: Array<{
    event: string;
    description: string;
    start: number;
    end: number;
  }>;
}

export default function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 bg-red-500/10">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="text-red-500" />
          <h3 className="text-xl font-semibold">Weather Alerts</h3>
        </div>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium text-red-500">{alert.event}</h4>
              <p className="text-sm mt-2">{alert.description}</p>
              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                <p>From: {format(alert.start * 1000, 'PPp')}</p>
                <p>To: {format(alert.end * 1000, 'PPp')}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}