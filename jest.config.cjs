module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1" /* Permet d'utiliser @ pour les imports */,
    "src/(.*)":
      "<rootDir>/src/$1" /* Assure que Jest trouve les fichiers dans src */,
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  roots: ["<rootDir>/tests"],
};
