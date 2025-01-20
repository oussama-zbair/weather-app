import axios from 'axios';

const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5';
const TOMORROW_URL = 'https://api.tomorrow.io/v4/weather';

export const fetchOpenWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${OPENWEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching OpenWeatherMap data:', error);
    throw error;
  }
};

export const fetchOpenWeatherForecast = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${OPENWEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching OpenWeatherMap forecast:', error);
    throw error;
  }
};

export const fetchTomorrowWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${TOMORROW_URL}/forecast?location=${lat},${lon}&apikey=${process.env.NEXT_PUBLIC_TOMORROW_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Tomorrow.io data:', error);
    throw error;
  }
};
