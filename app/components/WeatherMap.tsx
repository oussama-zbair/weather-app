"use client";

import { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface WeatherMapProps {
  latitude: number;
  longitude: number;
  onMapClick?: (lat: number, lon: number) => void;
}

export default function WeatherMap({ latitude, longitude, onMapClick }: WeatherMapProps) {
  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom: 9
  });

  useEffect(() => {
    setViewState(prev => ({
      ...prev,
      latitude,
      longitude
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
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onClick={handleClick}
      >
        <Marker
          latitude={latitude}
          longitude={longitude}
          anchor="bottom"
        >
          <MapPin className="text-red-500 w-8 h-8 animate-bounce" />
        </Marker>
      </Map>
    </div>
  );
}
