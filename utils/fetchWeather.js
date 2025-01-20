import axios from 'axios';

const API_KEY = 'ba1cde8e30464afba59a25545d2ef3d6';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

/**
 * Fetch current weather data for a specific latitude and longitude.
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Promise<Object>} Current weather data.
 */
export const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Fetch 5-day forecast data (3-hour intervals) for a specific latitude and longitude.
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Promise<Object>} Forecast data.
 */
export const fetchForecastData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
