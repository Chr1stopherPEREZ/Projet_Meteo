import React from "react";
import { render, screen } from "@testing-library/react";
import { WeatherDisplay } from "../../src/components/WeatherDisplay";
import { useWeather } from "../../src/hooks/useWeather";

jest.mock("../../src/hooks/useWeather");

describe("WeatherDisplay Component", () => {
    it("affiche les données météo", () => {
        (useWeather as jest.Mock).mockReturnValue({
            weather: { temperature: 22, description: "Nuageux" },
            loading: false,
            error: null,
        });

        render(<WeatherDisplay />);
        expect(screen.getByText("22°C")).toBeInTheDocument();
        expect(screen.getByText("Nuageux")).toBeInTheDocument();
    });

    it("affiche un message d'erreur si l'API échoue", () => {
        (useWeather as jest.Mock).mockReturnValue({
            weather: null,
            loading: false,
            error: "Impossible de récupérer les données météo",
        });

        render(<WeatherDisplay />);
        expect(screen.getByText("Impossible de récupérer les données météo")).toBeInTheDocument();
    });
});

/* WeatherDisplay.test.tsx */