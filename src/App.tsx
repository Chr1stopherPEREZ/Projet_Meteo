import React from 'react';
import { WeatherDisplay } from "./components/WeatherDisplay";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  return (
    <div className="app-container">
      <main className="main-content">
        <WeatherDisplay />
      </main>
      <Footer />
    </div>
  );
};

export default App;

/* App.tsx */
