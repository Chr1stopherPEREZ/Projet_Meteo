import React, { useState, useEffect } from "react";
import { Droplets, Wind } from "lucide-react";
import { useWeather } from "../hooks/useWeather";
import citiesConfig from "../config/cities.json";

export const WeatherDisplay: React.FC = () => {
  const [showCityModal, setShowCityModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { weather, error, loading, lastUpdate, setCity } = useWeather();
  const [animate, setAnimate] = useState(false); /* État pour déclencher l'animation */

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCityClick = () => {
    if (isMobile) {
      setShowCityModal(true);
    }
  };

  const handleCitySelect = (city: string) => {
    setAnimate(true); /* Active l'animation */
    setTimeout(() => setAnimate(false), 500);
    setCity(city);
    setShowCityModal(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <>
      <div className="weather-container">
        <div className="weather-card">
          <h1 className="title" onClick={handleCityClick}>
            {weather.city}
          </h1>

          <div className={`weather-info ${animate ? "fade-in" : ""}`}>
            <div className="temperature-display">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                alt={weather.description}
                className="weather-icon"
              />
              <div className="temperature">{weather.temperature}°C</div>
            </div>

            <p className="weather-description">{weather.description}</p>

            <div className="weather-details">
              <div className="weather-detail">
                <Droplets className="icon" />
                <div className="detail-info">
                  <p className="detail-label">Humidité</p>
                  <p className="detail-value">{weather.humidity}%</p>
                </div>
              </div>

              <div className="weather-detail">
                <Wind className="icon" />
                <div className="detail-info">
                  <p className="detail-label">Vent</p>
                  <p className="detail-value">{weather.windSpeed} km/h</p>
                </div>
              </div>
            </div>
          </div>

          <p className="last-update">Dernière mise à jour : {lastUpdate}</p>

        </div>
      </div>

      {showCityModal && (
        <div className="city-modal" onClick={() => setShowCityModal(false)}>
          <div className="city-modal-content" onClick={(e) => e.stopPropagation()}>
            <ul className="city-list">
              {citiesConfig.cities.map((city) => (
                <li
                  key={city}
                  className="city-item"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

/* WeatherDisplay.tsx */
