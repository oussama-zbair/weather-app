import axios from "axios";

const OPENWEATHER_API_KEY = "ba1cde8e30464afba59a25545d2ef3d6"; 
const TOMORROW_API_KEY = "VwBffyHdFrlx031acEtTgVR3EBnJnfmG"; 

const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5";
const TOMORROW_URL = "https://api.tomorrow.io/v4/weather";

/**
 * Fetch current weather data from OpenWeatherMap
 */
export const fetchOpenWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${OPENWEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching OpenWeatherMap data:", error);
    throw error;
  }
};

/**
 * Fetch 5-day forecast from OpenWeatherMap
 */
export const fetchOpenWeatherForecast = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${OPENWEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching OpenWeatherMap forecast:", error);
    throw error;
  }
};

/**
 * Fetch forecast from Tomorrow.io
 */
export const fetchTomorrowWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${TOMORROW_URL}/forecast?location=${lat},${lon}&apikey=${TOMORROW_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Tomorrow.io data:", error);
    throw error;
  }
};
