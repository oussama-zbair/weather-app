import { useEffect, useRef, useState } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1Ijoib3Vzc2FtYXoiLCJhIjoiY201enZyZzVmMDdqazJqc2dmM2F0YW9veCJ9.L-Ap_sd2MTtxzeRWUdnnEQ"; 

const WeatherMapClient = ({ weatherData, onMapClick }) => {
  const mapRef = useRef(null); // Reference for the map instance
  const [viewport, setViewport] = useState({
    latitude: 51.505,
    longitude: -0.09,
    zoom: 5,
  });

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.resize(); 
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <Map
      ref={mapRef}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11" // Choose your desired map style
      mapboxAccessToken={MAPBOX_TOKEN}
      onClick={(event) => {
        const { lng, lat } = event.lngLat;
        onMapClick({ lat, lng });
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
              style={{ width: "40px", height: "40px" }}
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
              <h3>{weatherData.name}</h3>
              <p>{weatherData.weather[0].description}</p>
              <p>Temp: {weatherData.main.temp}°C</p>
            </div>
          </Popup>
        </>
      )}
    </Map>
  );
};

export default WeatherMapClient;
