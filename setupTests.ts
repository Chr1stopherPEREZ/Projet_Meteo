import "@testing-library/jest-dom";

jest.mock("@/config/config", () => ({
  API_KEY: "fake_api_key",
}));
