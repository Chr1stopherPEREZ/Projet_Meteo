import { useState, useEffect } from "react";
import { WeatherData } from "../types/weather";
import { getWeatherData } from "../utils/weather";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("Grenoble");
  const [lastUpdate, setLastUpdate] = useState<string | null>(
    null
  ); /* Ajout du timestamp */

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getWeatherData(selectedCity);
        setWeather(data);
        setError(null);
        setLastUpdate(
          new Date().toLocaleTimeString()
        ); /* Stocke l'heure actuelle */
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des données météo :",
          err
        );
        setError("Impossible de récupérer les données météo");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(
      fetchWeather,
      60 * 60 * 1000
    ); /* Mise à jour toutes les heures */

    return () => clearInterval(interval);
  }, [selectedCity]);

  return {
    weather,
    error,
    loading,
    lastUpdate,
    setCity: setSelectedCity,
  };
};

/* UseWeather.ts */
