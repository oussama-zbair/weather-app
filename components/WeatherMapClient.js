import { useEffect, useRef, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1Ijoib3Vzc2FtYXoiLCJhIjoiY201enZyZzVmMDdqazJqc2dmM2F0YW9veCJ9.L-Ap_sd2MTtxzeRWUdnnEQ";

const WeatherMapClient = ({ weatherData, onMapClick }) => {
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    latitude: 51.505,
    longitude: -0.09,
    zoom: 5,
  });

  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v11");

  useEffect(() => {
    if (weatherData) {
      setViewport({
        latitude: weatherData.coord.lat,
        longitude: weatherData.coord.lon,
        zoom: 8,
      });
    }
  }, [weatherData]);

  return (
    <div className="relative h-full w-full">
      <Map
        ref={mapRef}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={(event) => {
          const { lng, lat } = event.lngLat;
          onMapClick(lat, lng);
        }}
      >
        {weatherData && (
          <>
            <Marker
              latitude={weatherData.coord.lat}
              longitude={weatherData.coord.lon}
              anchor="bottom"
            >
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="w-12 h-12 animate-bounce"
              />
            </Marker>
            <Popup
              latitude={weatherData.coord.lat}
              longitude={weatherData.coord.lon}
              closeButton={true}
              closeOnClick={false}
              anchor="top"
            >
              <div>
                <h3 className="font-bold">{weatherData.name}</h3>
                <p>{weatherData.weather[0].description}</p>
                <p>Temp: {weatherData.main.temp}°C</p>
              </div>
            </Popup>
          </>
        )}
      </Map>
      {/* Map Style Toggle */}
      <div className="absolute top-6 right-6 bg-white rounded-lg shadow-lg p-2 z-50">
        <button
          className={`p-2 text-sm ${
            mapStyle === "mapbox://styles/mapbox/streets-v11"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setMapStyle("mapbox://styles/mapbox/streets-v11")}
        >
          Streets
        </button>
        <button
          className={`p-2 text-sm ml-2 ${
            mapStyle === "mapbox://styles/mapbox/satellite-v9"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setMapStyle("mapbox://styles/mapbox/satellite-v9")}
        >
          Satellite
        </button>
      </div>
    </div>
  );
};

export default WeatherMapClient;
