import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import WeatherMap from "../components/WeatherMap";
import WeatherDetails from "../components/WeatherDetails";
import { fetchOpenWeatherData, fetchOpenWeatherForecast } from "../utils/fetchWeather";
import axios from "axios";

const OPENWEATHER_API_KEY = "ba1cde8e30464afba59a25545d2ef3d6";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeatherAndForecast(latitude, longitude);
      },
      () => {
        console.error("Geolocation access denied or unavailable.");
      }
    );
  }, []);

  const fetchWeatherAndForecast = async (lat, lon) => {
    console.log("Fetching data for:", { lat, lon });
    if (!lat || !lon) {
      showError("Invalid coordinates. Please try again.");
      return;
    }

    try {
      const weather = await fetchOpenWeatherData(lat, lon);
      const forecast = await fetchOpenWeatherForecast(lat, lon);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      showError("Failed to fetch weather data. Please try again later.");
      console.error(err);
    }
  };

  const handleSearch = async () => {
    try {
      if (!searchQuery) {
        showError("Please enter a city name.");
        return;
      }

      const geocodeRes = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=${OPENWEATHER_API_KEY}`
      );

      if (!geocodeRes.data || geocodeRes.data.length === 0) {
        showError("City not found. Please check your spelling or try another city.");
        return;
      }

      const { lat, lon } = geocodeRes.data[0];
      await fetchWeatherAndForecast(lat, lon);
      setSearchQuery("");
    } catch (err) {
      console.error("API Request Error:", err.response?.data || err.message);
      showError("Failed to fetch location data. Please check your API key or try again later.");
    }
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 3000); // Auto-hide error after 3 seconds
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative">
      {/* Header */}
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

      {/* Error Notification */}
      {error && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-md z-50 transition-all duration-300">
          {error}
        </div>
      )}

        <div className="flex-grow flex flex-col lg:flex-row">
          {/* Map Section */}
          <div className="relative w-full lg:w-2/3 h-[60vh] lg:h-full p-4">
            <WeatherMap weatherData={weatherData} onMapClick={fetchWeatherAndForecast} />
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

        {/* Weather Details Section */}
        <div className="w-full lg:w-1/3 p-4 bg-white shadow-md rounded-lg">
          {weatherData && forecastData ? (
            <WeatherDetails weatherData={weatherData} forecastData={forecastData} />
          ) : (
            <p className="text-gray-600 text-center">
              Search for a city or allow location access to see weather details.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>
          🌟 Built with ❤️ by <a href="https://github.com/oussama-zbair" className="underline text-blue-400">Oussama Zbair</a> 🌟
        </p>
        <p>© 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
}
