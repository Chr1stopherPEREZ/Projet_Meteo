import { getWeatherData } from "../../src/utils/weather";

jest.mock("../../src/utils/weather", () => ({
  getWeatherData: jest.fn(),
}));

describe("Tests sur getWeatherData", () => {
  it("devrait retourner des données météo valides", async () => {
    (getWeatherData as jest.Mock).mockResolvedValue({
      temperature: 20,
      humidity: 50,
      description: "Ensoleillé",
    });

    const data = await getWeatherData("Paris");
    expect(data.temperature).toBe(20);
    expect(data.humidity).toBe(50);
    expect(data.description).toBe("Ensoleillé");
  });

  it("devrait gérer une erreur API", async () => {
    (getWeatherData as jest.Mock).mockRejectedValue(new Error("Erreur API"));

    await expect(getWeatherData("Paris")).rejects.toThrow("Erreur API");
  });
});

/* Weather.test.js */
