import { useState } from "react";
import { FaGithub } from "react-icons/fa"; // Importing GitHub icon
import WeatherMap from "../components/WeatherMap";
import WeatherDetails from "../components/WeatherDetails";
import SearchHistory from "../components/SearchHistory";
import { fetchWeatherData } from "../utils/fetchWeather";
import axios from "axios";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    try {
      if (!searchQuery) {
        setError("Please enter a city name.");
        return;
      }

      const geocodeRes = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=ba1cde8e30464afba59a25545d2ef3d6`
      );

      if (!geocodeRes.data || geocodeRes.data.length === 0) {
        setError("City not found. Please check your spelling or try another city.");
        return;
      }

      const { lat, lon, name, country } = geocodeRes.data[0];
      const weather = await fetchWeatherData(lat, lon);

      setWeatherData({ ...weather, name, country });
      setSearchHistory((prev) => [...new Set([`${name}, ${country}`, ...prev])]);
      setError("");
    } catch (err) {
      console.error("API Request Error:", err);
      setError("Failed to fetch location data. Please check your API key or try again later.");
    }
  };

  const handleMapClick = async ({ lat, lng }) => {
    try {
      const weather = await fetchWeatherData(lat, lng);
      setWeatherData(weather);
      setError("");
    } catch (err) {
      setError("Failed to fetch weather data.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
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

      {/* Content */}
      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Map Section */}
        <div className="relative w-full lg:w-2/3 h-[50vh] lg:h-full p-4">
          <WeatherMap weatherData={weatherData} onMapClick={handleMapClick} />
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
          {weatherData ? (
            <WeatherDetails weatherData={weatherData} />
          ) : (
            <p className="text-gray-600 text-center">
              Search for a city or tap on the map for weather details.
            </p>
          )}
          {/* Search History */}
          {searchHistory.length > 0 && (
            <SearchHistory history={searchHistory} onSelect={(city) => setSearchQuery(city)} />
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
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
