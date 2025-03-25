export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    wind_speed: number;
    feels_like: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
    };
    humidity: number;
    wind_speed: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
  hourly?: Array<{
    dt: number;
    temp: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
  alerts?: Array<{
    event: string;
    description: string;
    start: number;
    end: number;
  }>;
  air_quality?: {
    aqi: number;
    components: {
      co: number;
      no2: number;
      o3: number;
      pm2_5: number;
      pm10: number;
    };
  };
}

export interface Location {
  lat: number;
  lon: number;
  name: string;
  country?: string;
  countryCode?: string;
}

export interface RecentSearch {
  name: string;
  lat: number;
  lon: number;
  timestamp: number;
}

export interface FavoriteLocation {
  name: string;
  lat: number;
  lon: number;
  country?: string;
  countryCode?: string;
}
