export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  timestamp: number;
}

export interface CityConfig {
  cities: string[];
}

/* Types | Weather.ts */
