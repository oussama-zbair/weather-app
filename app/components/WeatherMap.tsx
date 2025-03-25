"use client";

import { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface WeatherMapProps {
  latitude: number;
  longitude: number;
  city?: string;
  countryCode?: string;
  temperature?: number;
  weatherIcon?: string;
  onMapClick?: (lat: number, lon: number) => void;
}

function getCountryFlagEmoji(code: string = ''): string {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

export default function WeatherMap({
  latitude,
  longitude,
  city,
  countryCode,
  temperature,
  weatherIcon,
  onMapClick,
}: WeatherMapProps) {
  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom: 9,
  });

  useEffect(() => {
    setViewState((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);

  const handleClick = (event: any) => {
    if (onMapClick) {
      const { lat, lng } = event.lngLat;
      onMapClick(lat, lng);
    }
  };

  return (
    <div className="h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onClick={handleClick}
      >
        <NavigationControl position="top-right" />

        <Marker latitude={latitude} longitude={longitude} anchor="bottom">
          <MapPin className="text-red-500 w-8 h-8 animate-bounce" />
        </Marker>

        {city && countryCode && (
          <Popup
            latitude={latitude}
            longitude={longitude}
            closeButton={false}
            closeOnClick={false}
            anchor="top"
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 shadow-md border border-gray-300 dark:border-gray-700 text-center text-sm text-gray-900 dark:text-white min-w-[130px] animate-fade-in"
              style={{
                animation: 'fadeInScale 0.3s ease-out',
              }}
            >
              <div className="text-lg mb-1">{getCountryFlagEmoji(countryCode)}</div>
              <div className="font-bold text-base">{city}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {countryCode?.toUpperCase()}
              </div>

              {weatherIcon && (
                <div className="flex justify-center items-center gap-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                    alt="Weather icon"
                    className="w-8 h-8"
                  />
                  {temperature !== undefined && (
                    <span className="font-semibold text-sm">
                      {Math.round(temperature)}°C
                    </span>
                  )}
                </div>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
