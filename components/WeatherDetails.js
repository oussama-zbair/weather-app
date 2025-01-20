import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { WiHumidity, WiCloudy, WiSunrise, WiSunset } from "react-icons/wi";
import { MdVisibility, MdSpeed } from "react-icons/md";

const WeatherDetails = ({ weatherData, forecastData }) => {
  if (!weatherData || !forecastData) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  };

  const forecastSummary = forecastData.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="p-6 border rounded-lg shadow-xl bg-gradient-to-br from-cyan-50 to-blue-100 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-blue-800">
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <img src={iconUrl} alt="Weather Icon" className="w-12 h-12 animate-pulse" />
      </div>
      <ul className="space-y-4">
        {[
          { label: "Temperature", value: `${weatherData.main.temp}°C`, icon: <FaTemperatureHigh className="text-red-500" /> },
          { label: "Feels Like", value: `${weatherData.main.feels_like}°C`, icon: <FaTemperatureHigh className="text-orange-500" /> },
          { label: "Humidity", value: `${weatherData.main.humidity}%`, icon: <WiHumidity className="text-blue-500" /> },
          { label: "Cloudiness", value: `${weatherData.clouds.all}%`, icon: <WiCloudy className="text-gray-500" /> },
          { label: "Wind Speed", value: `${weatherData.wind.speed} m/s`, icon: <FaWind className="text-gray-500" /> },
          { label: "Visibility", value: `${weatherData.visibility / 1000} km`, icon: <MdVisibility className="text-yellow-500" /> },
          { label: "Pressure", value: `${weatherData.main.pressure} hPa`, icon: <MdSpeed className="text-gray-500" /> },
          { label: "Sunrise", value: formatTime(weatherData.sys.sunrise), icon: <WiSunrise className="text-orange-500" /> },
          { label: "Sunset", value: formatTime(weatherData.sys.sunset), icon: <WiSunset className="text-red-500" /> },
        ].map(({ label, value, icon }, idx) => (
          <li key={idx} className="flex items-center text-lg text-gray-700">
            <div className="mr-3">{icon}</div>
            <span>{label}: <strong>{value}</strong></span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-blue-700 mb-4">5-Day Forecast</h3>
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {forecastSummary.map((item, index) => (
            <li
              key={index}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <p className="text-gray-600 font-medium">{formatDate(item.dt)}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="Forecast Icon"
                className="w-12 h-12 mx-auto"
              />
              <p className="text-lg text-gray-800 font-semibold">{item.main.temp}°C</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherDetails;
