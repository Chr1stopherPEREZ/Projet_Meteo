import { WeatherData } from "../types/weather";

import { API_KEY } from "../config/config";
const CACHE_DURATION = 60 * 60 * 1000; /* 1 heure en millisecondes */

interface CacheItem {
  data: WeatherData;
  timestamp: number;
}

const cache = new Map<string, CacheItem>();

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  const now = Date.now();
  const cachedData = cache.get(city);

  if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  if (!API_KEY) {
    throw new Error("La clé API OpenWeather n'est pas configurée");
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},FR&units=metric&appid=${API_KEY}&lang=fr`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Ville non trouvée: ${city}`);
      }
      if (response.status === 401) {
        throw new Error("Clé API invalide");
      }
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    const weatherData: WeatherData = {
      city,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6) /* Conversion en km/h */,
      timestamp: now,
    };

    cache.set(city, { data: weatherData, timestamp: now });
    return weatherData;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erreur météo: ${error.message}`);
      throw error;
    }
    console.error(
      "Erreur inattendue lors de la récupération des données météo"
    );
    throw new Error(
      "Erreur inattendue lors de la récupération des données météo"
    );
  }
};

/* Utils | Weather.ts */
