"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Cloud, ThermometerSun, Settings2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import WeatherMap from './components/WeatherMap';
import HourlyForecast from './components/HourlyForecast';
import WeatherAlerts from './components/WeatherAlerts';
import AirQuality from './components/AirQuality';
import RecentSearches from './components/RecentSearches';
import type { WeatherData, Location, RecentSearch, FavoriteLocation } from './types/weather';

const MAX_RECENT_SEARCHES = 5;

export default function Home() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  const fetchWeather = async (lat: number, lon: number) => {
    setError(null);
    try {
      const [currentRes, forecastRes, airQualityRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`)
      ]);

      if (!currentRes.ok || !forecastRes.ok || !airQualityRes.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const [currentData, forecastData, airQualityData] = await Promise.all([
        currentRes.json(),
        forecastRes.json(),
        airQualityRes.json()
      ]);

      if (!currentData.main || !forecastData.list) {
        throw new Error('Invalid weather data format');
      }

      const transformedData: WeatherData = {
        current: {
          temp: currentData.main.temp,
          humidity: currentData.main.humidity,
          wind_speed: currentData.wind.speed,
          weather: currentData.weather,
          feels_like: currentData.main.feels_like,
          pressure: currentData.main.pressure,
          sunrise: currentData.sys.sunrise,
          sunset: currentData.sys.sunset,
        },
        daily: forecastData.list
          .filter((item: any, index: number) => index % 8 === 0)
          .map((item: any) => ({
            dt: item.dt,
            temp: {
              day: item.main.temp,
              min: item.main.temp_min,
              max: item.main.temp_max,
            },
            weather: item.weather,
            humidity: item.main.humidity,
            wind_speed: item.wind.speed,
          })),
        hourly: forecastData.list.slice(0, 8).map((item: any) => ({
          dt: item.dt,
          temp: item.main.temp,
          weather: item.weather,
        })),
        air_quality: {
          aqi: airQualityData.list[0].main.aqi,
          components: airQualityData.list[0].components,
        },
      };

      setWeather(transformedData);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  const handleSearch = async () => {
    if (!search) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      
      if (!res.ok) {
        throw new Error('Failed to find location');
      }

      const data = await res.json();
      
      if (!data || data.length === 0) {
        throw new Error('Location not found');
      }

      const { lat, lon, name } = data[0];
      setLocation({ lat, lon, name });
      await fetchWeather(lat, lon);
      
      // Add to recent searches
      const newSearch: RecentSearch = {
        name,
        lat,
        lon,
        timestamp: Date.now(),
      };
      
      setRecentSearches(prev => {
        const filtered = prev.filter(s => s.name !== name);
        return [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      });
    } catch (err) {
      console.error('Error searching location:', err);
      setError('Location not found. Please try a different search term.');
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      
      if (!res.ok) {
        throw new Error('Failed to get location information');
      }

      const data = await res.json();
      
      if (!data || data.length === 0) {
        throw new Error('Location information not available');
      }

      const { name } = data[0];
      setLocation({ lat, lon, name });
      await fetchWeather(lat, lon);
    } catch (err) {
      console.error('Error getting location from coordinates:', err);
      setError('Failed to get weather for this location. Please try another spot.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (location: FavoriteLocation) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.name === location.name);
      if (exists) {
        return prev.filter(fav => fav.name !== location.name);
      }
      return [...prev, location];
    });
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || !process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      setError('API keys not configured. Please add them to your .env.local file.');
      return;
    }

    // Load saved preferences
    const savedUnit = localStorage.getItem('tempUnit') as 'C' | 'F';
    if (savedUnit) setTempUnit(savedUnit);

    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) setRecentSearches(JSON.parse(savedSearches));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude, name: 'Current Location' });
        await fetchWeather(latitude, longitude);
      },
      (err) => {
        console.error('Error getting location:', err);
        setError('Unable to get your location. Please search for a city instead.');
      }
    );
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('tempUnit', tempUnit);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [tempUnit, favorites, recentSearches]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for a city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                />
                <Button onClick={handleSearch} disabled={loading}>
                  <Search className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{loading ? 'Searching...' : 'Search'}</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">°C</span>
                <Switch
                  checked={tempUnit === 'F'}
                  onCheckedChange={(checked) => setTempUnit(checked ? 'F' : 'C')}
                />
                <span className="text-sm">°F</span>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        <RecentSearches
          searches={recentSearches}
          favorites={favorites}
          onSearchSelect={handleMapClick}
          onToggleFavorite={handleToggleFavorite}
        />

        {location && weather && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <motion.h1 className="text-4xl font-bold flex items-center gap-2">
              <MapPin className="w-8 h-8 text-blue-500" />
              Weather in {location.name}
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <WeatherCard
                  temperature={tempUnit === 'C' ? weather.current.temp : (weather.current.temp * 9/5) + 32}
                  humidity={weather.current.humidity}
                  windSpeed={weather.current.wind_speed}
                  description={weather.current.weather[0].description}
                  icon={weather.current.weather[0].icon}
                />

                {weather.air_quality && (
                  <AirQuality
                    aqi={weather.air_quality.aqi}
                    components={weather.air_quality.components}
                  />
                )}

                {weather.alerts && weather.alerts.length > 0 && (
                  <WeatherAlerts alerts={weather.alerts} />
                )}
              </div>

              <WeatherMap
                latitude={location.lat}
                longitude={location.lon}
                onMapClick={handleMapClick}
              />
            </div>

            {weather.hourly && (
              <HourlyForecast
                data={weather.hourly}
                tempUnit={tempUnit}
              />
            )}

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Cloud className="w-6 h-6 text-blue-500" />
                5-Day Forecast
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weather.daily.slice(0, 5).map((day, index) => (
                  <ForecastCard
                    key={day.dt}
                    date={day.dt}
                    minTemp={tempUnit === 'C' ? day.temp.min : (day.temp.min * 9/5) + 32}
                    maxTemp={tempUnit === 'C' ? day.temp.max : (day.temp.max * 9/5) + 32}
                    icon={day.weather[0].icon}
                    description={day.weather[0].description}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <Footer />
      </div>
    </div>
  );
}