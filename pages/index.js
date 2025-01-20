import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import WeatherMap from "../components/WeatherMap";
import WeatherDetails from "../components/WeatherDetails";
import { fetchOpenWeatherData, fetchOpenWeatherForecast, fetchTomorrowWeather } from "../utils/fetchWeather";
import axios from "axios";

export default function Home() {
  const [openWeatherData, setOpenWeatherData] = useState(null);
  const [openWeatherForecast, setOpenWeatherForecast] = useState(null);
  const [tomorrowData, setTomorrowData] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchWeatherData = async (lat, lon) => {
    try {
      const openWeather = await fetchOpenWeatherData(lat, lon);
      const forecast = await fetchOpenWeatherForecast(lat, lon);
      const tomorrow = await fetchTomorrowWeather(lat, lon);
      
      setOpenWeatherData(openWeather);
      setOpenWeatherForecast(forecast);
      setTomorrowData(tomorrow);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeatherData(latitude, longitude);
      },
      () => console.error("Geolocation access denied or unavailable.")
    );
  }, []);

  const handleSearch = async () => {
    try {
      if (!searchQuery) {
        setError("Please enter a city name.");
        return;
      }

      const geocodeRes = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      

      if (!geocodeRes.data || geocodeRes.data.length === 0) {
        setError("City not found. Please check your spelling or try another city.");
        return;
      }

      const { lat, lon } = geocodeRes.data[0];
      await fetchWeatherData(lat, lon);
      setSearchQuery("");
      setError("");
    } catch (err) {
      console.error("API Request Error:", err);
      setError("Failed to fetch location data. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-center">🌤️ Real-Time Weather App</h1>
        <a
          href="https://github.com/oussama-zbair/weather-app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-3xl hover:text-gray-300 transition"
        >
          <FaGithub />
        </a>
      </header>

      <div className="flex-grow flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-2/3 h-[50vh] lg:h-full p-4">
          <WeatherMap weatherData={openWeatherData} onMapClick={fetchWeatherData} />
          <div className="absolute top-6 left-6 z-10 flex w-full lg:w-auto items-center space-x-2">
            <input
              type="text"
              placeholder="Enter a city..."
              className="p-3 flex-grow lg:flex-grow-0 lg:w-80 border border-gray-300 rounded-lg focus:outline-none placeholder-gray-400 text-black shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md"
            >
              Search
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/3 p-4 bg-white shadow-md rounded-lg">
          {openWeatherData && openWeatherForecast && tomorrowData ? (
            <WeatherDetails
              weatherData={openWeatherData}
              forecastData={openWeatherForecast}
              tomorrowData={tomorrowData}
            />
          ) : (
            <p className="text-gray-600 text-center">
              Search for a city or allow location access to see weather details.
            </p>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>
          🌟 Built with ❤️ by <a href="https://github.com/oussama-zbair" className="underline text-blue-400">Oussama Zbair</a> 🌟
        </p>
        <p>© 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
}
