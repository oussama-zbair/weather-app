import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { WiHumidity, WiCloudy, WiSunrise, WiSunset } from "react-icons/wi";
import { MdVisibility, MdSpeed } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const WeatherDetails = ({ weatherData }) => {
  if (!weatherData) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        {weatherData.name}, {weatherData.country}
      </h2>

      {/* Weather Icon and Description */}
      <div className="flex items-center mb-6">
        <img src={iconUrl} alt="Weather Icon" className="w-20 h-20" />
        <p className="text-gray-700 ml-6 text-xl capitalize">{weatherData.weather[0].description}</p>
      </div>

      {/* Weather Details */}
      <ul className="space-y-4">
        <li className="flex items-center text-gray-700 text-lg">
          <FaTemperatureHigh className="text-red-500 mr-3" />
          <span>Temperature : {weatherData.main.temp}°C</span>
        </li>
        <li className="flex items-center text-gray-700 text-lg">
          <FaTemperatureHigh className="text-orange-500 mr-3" />
          <span>Feel : {weatherData.main.feels_like}°C</span>
        </li>
        <li className="flex items-center text-gray-700 text-lg">
          <WiHumidity className="text-blue-500 mr-3" />
          <span>Humidity : {weatherData.main.humidity}%</span>
        </li>
        <li className="flex items-center text-gray-700 text-lg">
          <WiCloudy className="text-gray-500 mr-3" />
          <span>Clouds : {weatherData.clouds.all}%</span>
        </li>
        <li className="flex items-center text-gray-700 text-lg">
          <FaWind className="text-gray-500 mr-3" />
          <span>Wind : {weatherData.wind.speed} m/s</span>
        </li>
        <li className="flex items-center text-gray-700 text-lg">
          <MdVisibility className="text-yellow-500 mr-3" />
          <span>Visibility : {weatherData.visibility / 1000} km</span>
        </li>
        <li className="flex items-center text-gray-700 text-lg">
          <MdSpeed className="text-gray-500 mr-3" />
          <span>Pressure : {weatherData.main.pressure} hPa</span>
        </li>
        <li className="flex items-center text-gray-700 text-lg">
          <WiSunrise className="text-orange-500 mr-3" />
          <span>Sunrise : {formatTime(weatherData.sys.sunrise)}</span>
        </li>
        <li className="flex items-center text-gray-700 text-lg">
          <WiSunset className="text-red-500 mr-3" />
          <span>Sunset: {formatTime(weatherData.sys.sunset)}</span>
        </li>
      </ul>

      {/* Tooltip for better explanations */}
      <Tooltip place="top" type="dark" effect="solid" />
    </div>
  );
};

export default WeatherDetails;
