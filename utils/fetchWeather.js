import axios from "axios";

const OPENWEATHER_API_KEY = "ba1cde8e30464afba59a25545d2ef3d6";
const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5";

export const fetchOpenWeatherData = async (lat, lon) => {
  if (!lat || !lon) throw new Error("Invalid coordinates for weather data.");
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

export const fetchOpenWeatherForecast = async (lat, lon) => {
  if (!lat || !lon) throw new Error("Invalid coordinates for forecast data.");
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
