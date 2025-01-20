import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import WeatherMap from "../components/WeatherMap";
import WeatherDetails from "../components/WeatherDetails";
import { fetchWeatherData, fetchForecastData } from "../utils/fetchWeather";
import axios from "axios";

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
    try {
      const weather = await fetchWeatherData(lat, lon);
      const forecast = await fetchForecastData(lat, lon);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again later.");
      console.error(err);
    }
  };

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

      const { lat, lon } = geocodeRes.data[0];
      await fetchWeatherAndForecast(lat, lon);
      setSearchQuery("");
      setError("");
    } catch (err) {
      console.error("API Request Error:", err);
      setError("Failed to fetch location data. Please check your API key or try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md flex justify-between items-center px-6 lg:px-12">
        <h1 className="text-3xl lg:text-4xl font-bold flex items-center">
          🌤️ <span className="ml-2">Real-Time Weather App</span>
        </h1>
        <a
          href="https://github.com/oussama-zbair/weather-app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-3xl hover:text-gray-300 transition duration-200"
        >
          <FaGithub />
        </a>
      </header>

      {/* Content */}
      <main className="flex-grow flex flex-col lg:flex-row">
        {/* Map Section */}
        <section className="relative w-full lg:w-2/3 h-[50vh] lg:h-full p-4">
          <WeatherMap weatherData={weatherData} onMapClick={fetchWeatherAndForecast} />
          <div className="absolute top-6 left-6 z-10 flex w-full lg:w-auto items-center space-x-3">
            <input
              type="text"
              placeholder="Enter a city..."
              className="p-3 flex-grow lg:flex-grow-0 lg:w-80 border border-gray-300 rounded-lg focus:outline-none placeholder-gray-500 text-black shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md"
            >
              Search
            </button>
          </div>
        </section>

        {/* Weather Details Section */}
        <section className="w-full lg:w-1/3 p-6 bg-white shadow-lg rounded-lg">
          {weatherData && forecastData ? (
            <WeatherDetails weatherData={weatherData} forecastData={forecastData} />
          ) : (
            <p className="text-gray-600 text-center mt-12">
              🌍 Search for a city or allow location access to see weather details.
            </p>
          )}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm lg:text-base">
          🌟 Built with ❤️ by{" "}
          <a
            href="https://github.com/oussama-zbair"
            className="underline text-blue-400 hover:text-blue-300 transition duration-200"
          >
            Oussama Zbair
          </a>{" "}
          🌟
        </p>
        <p className="text-xs lg:text-sm mt-2">© 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
}
